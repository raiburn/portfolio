"use client";

import { useEffect, useRef, useState } from "react";

type Message = { role: "user" | "assistant"; content: string };

const MAX_CHARS = 500;
const suggestions = [
  "What's his experience with React?",
  "Has he worked on e-commerce?",
  "Is he TN-eligible?",
  "What AI products has he built?",
];

export function AskOscar({ email }: { email: string }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [enabled, setEnabled] = useState(true);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("/api/chat")
      .then((res) => res.json())
      .then((status: { enabled: boolean }) => setEnabled(status.enabled))
      .catch(() => {});
  }, []);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight });
  }, [messages]);

  if (!enabled) {
    return (
      <div className="rounded-lg border border-slate-800 bg-slate-800/30 p-4 text-sm sm:p-5">
        <p>The AI assistant is offline right now.</p>
        <p className="mt-2">
          Have a question? Email me at{" "}
          <a href={`mailto:${email}`} className="font-medium text-teal-300 hover:underline">
            {email}
          </a>{" "}
          or check out my résumé below.
        </p>
      </div>
    );
  }

  async function send(text: string) {
    const question = text.trim();
    if (!question || loading) return;

    const history: Message[] = [...messages, { role: "user", content: question }];
    setMessages([...history, { role: "assistant", content: "" }]);
    setInput("");
    setLoading(true);

    const setAnswer = (content: string) =>
      setMessages((prev) => [...prev.slice(0, -1), { role: "assistant", content }]);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history }),
      });
      if (res.status === 503) {
        setEnabled(false);
        return;
      }
      if (!res.ok || !res.body) {
        setAnswer(await res.text());
        return;
      }
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let answer = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        answer += decoder.decode(value, { stream: true });
        setAnswer(answer);
      }
    } catch {
      setAnswer("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-lg border border-slate-800 bg-slate-800/30 p-4 sm:p-5">
      {messages.length === 0 ? (
        <div>
          <p className="text-sm">
            Ask an AI assistant about my experience, skills and projects. It only answers questions about my
            professional background.
          </p>
          <ul className="mt-4 flex flex-wrap gap-2">
            {suggestions.map((s) => (
              <li key={s}>
                <button
                  type="button"
                  onClick={() => send(s)}
                  className="rounded-full border border-slate-700 px-3 py-1 text-xs text-slate-300 transition hover:border-teal-300 hover:text-teal-300"
                >
                  {s}
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div ref={listRef} className="max-h-96 space-y-4 overflow-y-auto pr-1" aria-live="polite">
          {messages.map((m, i) => (
            <div key={i} className={m.role === "user" ? "flex justify-end" : ""}>
              <p
                className={`whitespace-pre-wrap text-sm leading-relaxed ${
                  m.role === "user"
                    ? "max-w-[85%] rounded-2xl rounded-br-sm bg-teal-400/10 px-3.5 py-2 text-teal-200"
                    : "text-slate-300"
                }`}
              >
                {m.content || <span className="animate-pulse text-slate-500">Thinking…</span>}
              </p>
            </div>
          ))}
        </div>
      )}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          send(input);
        }}
        className="mt-4 flex gap-2"
      >
        <label htmlFor="ask-input" className="sr-only">
          Ask about Oscar
        </label>
        <input
          id="ask-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          maxLength={MAX_CHARS}
          placeholder="Ask about my experience…"
          autoComplete="off"
          className="min-w-0 flex-1 rounded-md border border-slate-700 bg-slate-900/60 px-3 py-2 text-sm text-slate-200 placeholder:text-slate-500 focus:border-teal-300 focus:outline-none"
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          className="rounded-md bg-teal-400/10 px-4 py-2 text-sm font-medium text-teal-300 transition hover:bg-teal-400/20 disabled:opacity-40"
        >
          Ask
        </button>
      </form>
      <p className="mt-2 text-xs text-slate-500">AI answers can be imperfect. My résumé has the definitive details.</p>
    </div>
  );
}
