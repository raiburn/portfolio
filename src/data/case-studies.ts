// Long-form project write-ups, rendered at /projects/[slug].
// Wrap text in **double asterisks** to highlight it.

export type CaseStudySection = {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
  steps?: string[];
  image?: { src: string; alt: string; caption?: string };
};

export type CaseStudy = {
  slug: string;
  name: string;
  summary: string;
  role: string;
  period: string;
  stack: string[];
  live?: string;
  hero: { src: string; alt: string };
  stats: { value: string; label: string }[];
  sections: CaseStudySection[];
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "buildmyrig",
    name: "BuildMyRig AI",
    summary:
      "An AI PC builder that turns a budget and a list of games into a compatible, priced gaming PC. The LLM proposes the build; the database decides whether it's real.",
    role: "Solo: product, design, frontend, backend, AI and deployment",
    period: "2025 — Present",
    stack: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "pgvector", "OpenAI API", "Vercel"],
    live: "https://buildmyrig.dev",
    hero: { src: "/projects/buildmyrig/home.jpg", alt: "BuildMyRig AI homepage" },
    stats: [
      { value: "3 checks", label: "between the model and the user: structural, semantic, factual" },
      { value: "358", label: "automated tests across 27 suites" },
      { value: "95%", label: "MRR on a hand-curated retrieval eval" },
      { value: "≈ $0.001", label: "OpenAI cost per generated build, measured in testing" },
    ],
    sections: [
      {
        heading: "The problem",
        paragraphs: [
          "Picking PC parts means juggling CPU sockets, RAM generations, power supply wattage and how to split a budget between them. Users just want to say **“$1,500, Cyberpunk at 1440p, black case”** and get something they can buy.",
          "My first version did what most AI builders do: one prompt with the parts catalog in context. It mostly worked, but sometimes it returned part IDs that didn't exist, paired an AM5 CPU with an LGA1700 motherboard, or went over budget. Each of those failures cost an OpenAI call and, worse, the user's trust.",
          "The business depends on that trust: every recommended part carries an Amazon affiliate link, so a build that doesn't work is cost with no revenue.",
        ],
      },
      {
        heading: "The key decision: the LLM proposes, the code decides",
        paragraphs: [
          "The catalog already fit in the prompt, so missing knowledge wasn't the bottleneck. The model had no **ground truth for combinatorial rules**. So I made Postgres the source of truth and put three independent checks between the model and the user:",
        ],
        bullets: [
          "**Structural:** every part ID must exist in the database and match its slot. The model can't invent hardware; an invalid answer is rejected and retried with the exact error.",
          "**Semantic:** deterministic compatibility rules (socket, RAM type, PSU wattage, budget) run after validation. A mismatch triggers a retry that names the exact CPU and motherboard at fault.",
          "**Factual:** when the model cites benchmark or game data, every cited source must be one it was actually given. Invented citations get one retry with feedback.",
        ],
      },
      {
        heading: "How a build gets generated",
        steps: [
          "The request is validated with Zod and rate-limited per IP.",
          "A cache key is computed from the request; a fresh cached result is returned immediately.",
          "On a miss, relevant game descriptions, benchmarks and component specs are retrieved from pgvector and added to the prompt.",
          "OpenAI generates the build in JSON mode, wrapped in a tracer that records tokens, cost, latency and retrieved sources.",
          "A validator checks the result against Postgres. Retry budgets are separate for structural and citation errors, so the worst case is capped at four model calls.",
          "The valid build is cached with a per-type expiry and returned with Amazon links and FPS estimates.",
        ],
        image: {
          src: "/projects/buildmyrig/builder.jpg",
          alt: "BuildMyRig AI builder: budget slider and resolution picker",
          caption: "The builder: budget, games and preferences in four steps.",
        },
      },
      {
        heading: "Grounding with RAG, on Postgres",
        paragraphs: [
          "Retrieval has a narrower job: grounding the model's **reasoning** about games and performance, not picking parts. The knowledge base is about 120 chunks, one per game description, benchmark row or component spec, because each record is already a single, self-contained fact.",
          "I used **pgvector** instead of a separate vector database: no new infrastructure, deleting a game removes its chunks in the same transaction, and a filtered similarity search (“top 5 benchmarks for Cyberpunk 2077”) is a single SQL query.",
        ],
        image: {
          src: "/projects/buildmyrig/game-build.jpg",
          alt: "Recommended Cyberpunk 2077 build at 1440p with price and FPS estimate",
          caption: "A generated build: $1,487, about 63 FPS in Cyberpunk 2077 at 1440p High.",
        },
      },
      {
        heading: "Measuring it honestly",
        paragraphs: [
          "Every OpenAI call is traced to the database with tokens, USD cost, latency, retries and validation results, and an admin dashboard shows p50/p95 latency, daily cost and error rate per endpoint. Tracing can never take the app down: if writing a trace fails, the request still succeeds.",
          "My first retrieval eval scored a perfect 100%, and that was the problem: its answer key had been generated from the retriever's own top results, so it could never fail. I rebuilt it with **10 hand-written queries whose correct answers came straight from SQL**. The new score was lower, **95% MRR and 100% hit rate in the top 5**, and that drop meant the eval could finally catch regressions.",
          "It also surfaced a real failure: “physics puzzle game with portals and GLaDOS” ranked **Portal** above **Portal 2**. The fix is query expansion with release year and studio, then a re-ranker at larger scale.",
        ],
      },
      {
        heading: "Refine chat: a bounded agent",
        paragraphs: [
          "On any saved build, users can chat to adjust it (“make it $200 cheaper without losing Cyberpunk performance”). It's a single agent with four tools that wrap code I already trusted: swap a component, check compatibility, estimate FPS and explain a choice. Tools never throw; errors come back as data the model can reason about.",
          "It runs on hard limits: **5 tool calls, 20k tokens, 30 seconds and a $0.50 cost cap** per conversation, with one history-compaction step when the context grows. I chose one agent over several because the workflow is linear; extra agents would add cost and fragility without adding anything.",
        ],
      },
      {
        heading: "Cost and reliability",
        bullets: [
          "**gpt-4o-mini** for generation at roughly a tenth of a cent per build; embeddings with text-embedding-3-small.",
          "A database cache with per-type expiry. I found the cache had been serving stale responses: the docs promised a 6-hour TTL the code never checked. I added real expiry plus a cron cleanup every 6 hours.",
          "**Bounded retries:** structural and citation errors have separate retry budgets, so one request can never make more than four model calls.",
        ],
      },
      {
        heading: "What I'd do differently",
        paragraphs: [
          "I'd build the evals first. Adding them after the generator worked meant I was inferring quality from smoke tests instead of measuring it while tuning prompts. Next up: evals for recommendation quality (right parts, but is it a good build?), query expansion for ambiguous titles, and streaming responses for the chat.",
        ],
      },
    ],
  },
];

export function getCaseStudy(slug: string) {
  return caseStudies.find((c) => c.slug === slug);
}
