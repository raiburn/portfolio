import type { NextRequest } from "next/server";
import { systemPrompt } from "@/lib/assistant";

const MODEL = "gpt-4o-mini";
const MAX_INPUT_CHARS = 500; // per visitor message
const MAX_HISTORY = 10; // messages sent to the model
const MAX_USER_TURNS = 15; // questions per conversation
const RATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_MAX = 20; // requests per IP per window

// Best-effort per-instance rate limit. Serverless instances don't share memory,
// so pair this with a monthly spend limit in the OpenAI dashboard.
const hits = new Map<string, number[]>();

function isRateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > RATE_MAX;
}

type Message = { role: "user" | "assistant"; content: string };

function isValidMessages(value: unknown): value is Message[] {
  return (
    Array.isArray(value) &&
    value.length > 0 &&
    value.every(
      (m) =>
        m &&
        (m.role === "user" || m.role === "assistant") &&
        typeof m.content === "string",
    )
  );
}

const reply = (text: string, status: number) =>
  new Response(text, { status, headers: { "Content-Type": "text/plain; charset=utf-8" } });

export async function POST(req: NextRequest) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return reply("The assistant isn't configured yet.", 503);

  // Only accept requests coming from this site.
  const origin = req.headers.get("origin");
  if (!origin || new URL(origin).host !== req.headers.get("host")) {
    return reply("Forbidden.", 403);
  }

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() || "unknown";
  if (isRateLimited(ip)) {
    return reply("You're sending messages too quickly. Please try again in a few minutes.", 429);
  }

  let messages: unknown;
  try {
    ({ messages } = await req.json());
  } catch {
    return reply("Invalid request.", 400);
  }
  if (!isValidMessages(messages)) return reply("Invalid request.", 400);

  const last = messages[messages.length - 1];
  if (last.role !== "user" || !last.content.trim()) return reply("Invalid request.", 400);
  if (last.content.length > MAX_INPUT_CHARS) {
    return reply(`Please keep questions under ${MAX_INPUT_CHARS} characters.`, 400);
  }
  if (messages.filter((m) => m.role === "user").length > MAX_USER_TURNS) {
    return reply(
      "That's the question limit for this chat. For anything else, email Oscar directly. He'd be happy to hear from you.",
      429,
    );
  }

  const upstream = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      model: MODEL,
      stream: true,
      temperature: 0.3,
      max_tokens: 300,
      messages: [
        { role: "system", content: systemPrompt },
        ...messages.slice(-MAX_HISTORY).map((m) => ({ role: m.role, content: m.content.slice(0, 2000) })),
      ],
    }),
  });

  if (!upstream.ok || !upstream.body) {
    console.error("OpenAI error", upstream.status, await upstream.text().catch(() => ""));
    return reply("The assistant is unavailable right now. Please try again later.", 502);
  }

  // Convert OpenAI's server-sent events into a plain text stream.
  const decoder = new TextDecoder();
  const encoder = new TextEncoder();
  let buffer = "";
  const stream = upstream.body.pipeThrough(
    new TransformStream<Uint8Array, Uint8Array>({
      transform(chunk, controller) {
        buffer += decoder.decode(chunk, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() ?? "";
        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;
          const data = line.slice(6).trim();
          if (data === "[DONE]") continue;
          try {
            const text = JSON.parse(data).choices?.[0]?.delta?.content;
            if (text) controller.enqueue(encoder.encode(text));
          } catch {
            // ignore keep-alive or partial lines
          }
        }
      },
    }),
  );

  return new Response(stream, {
    headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store" },
  });
}
