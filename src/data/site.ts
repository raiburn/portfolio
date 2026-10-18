// All portfolio content lives here. Edit this file to update the site.

export const siteUrl = "https://www.oscarruiz.dev";

export const profile = {
  name: "Oscar Ruiz",
  fullName: "Oscar Eduardo Ruiz Plascencia",
  role: "Senior Software Engineer",
  tagline: "I build enterprise frontends, e-commerce experiences and AI-powered products.",
  photo: "/profile.jpg",
  links: {
    email: "oeruizplascencia@gmail.com",
    github: "https://github.com/raiburn",
    linkedin: "https://www.linkedin.com/in/oscar-ruiz-415099199/",
    resume: "/Oscar_Ruiz_CV.pdf",
  },
};

// Paragraphs for the About section. Wrap text in **double asterisks** to highlight it.
export const about = [
  "I'm a software engineer from **Hermosillo, Mexico** with 5+ years building with React, Next.js and TypeScript, from a greenfield **enterprise healthcare platform** to the storefront of a **national retail brand**. I like turning complex requirements into maintainable systems and picking the simplest solution with the biggest product impact.",
  "At Apex Systems I helped shape the frontend architecture of HC1 Healthcare's platform from day one, introduced Cypress end-to-end testing to the team, and shipped customer-facing features across Duluth Trading's entire shopping flow, from search to checkout.",
  "Lately I've been building AI products end to end. **BuildMyRig AI** is a SaaS I designed and built solo, and I've built retrieval-augmented chat on top of pgvector. I work with Claude, Cursor and ChatGPT every day.",
  "I'm a Mexican citizen and **TN-eligible under USMCA**, open to remote roles with US teams.",
];

export type Role = {
  company: string;
  title: string;
  period: string;
  clients?: { name: string; href?: string }[];
  href?: string;
  highlights: string[];
  stack: string[];
};

export const experience: Role[] = [
  {
    company: "BuildMyRig AI",
    title: "Independent Full Stack Engineer",
    period: "2025 — Present",
    href: "https://buildmyrig.dev",
    highlights: [
      "Designed and built an AI-powered PC builder SaaS from scratch: AI Build Generator, FPS Estimator, auth, user dashboard, admin panel and Amazon affiliate integration.",
      "Modeled component compatibility rules, game pages and saved builds in Prisma/PostgreSQL, and built server-rendered programmatic SEO pages for organic growth.",
    ],
    stack: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "OpenAI API", "Tailwind CSS"],
  },
  {
    company: "Apex Systems",
    title: "Software Engineer",
    period: "2022 — 2026",
    clients: [
      { name: "HC1 Healthcare", href: "https://hc1.com" },
      { name: "Duluth Trading Company", href: "https://www.duluthtrading.com" },
    ],
    highlights: [
      "Joined a greenfield healthcare platform from day one and helped define its frontend architecture: folder structure, reusable components, custom hooks, shared state and library selection.",
      "Introduced Cypress after the first development phase, built the initial E2E testing approach and helped the team grow coverage for demos and regression confidence.",
      "Shipped customer-facing e-commerce features for Duluth Trading across Home, Search, PLP, PDP, Cart, Checkout, Account and Promotions, improving performance with lazy loading and rendering optimization.",
    ],
    stack: ["React", "TypeScript", "JavaScript", "Material UI", "React Context", "Cypress", "Jest"],
  },
  {
    company: "Enroute Systems",
    title: "Front End Developer",
    period: "2021 — 2022",
    clients: [{ name: "8x8 Cloud Communications", href: "https://www.8x8.com" }],
    highlights: [
      "Built internal marketing tools and a form builder that let 8x8's marketing teams create and manage campaign landing pages without engineering help.",
      "Created reusable components and integration flows that made internal tools more consistent and sped up delivery of new features.",
    ],
    stack: ["React", "GraphQL", "Node.js", "JavaScript"],
  },
];

export type Project = {
  name: string;
  description: string;
  stack: string[];
  href?: string;
  image?: string; // e.g. "/projects/buildmyrig.png" (drop the file in /public)
  status?: string;
};

export const projects: Project[] = [
  {
    name: "BuildMyRig AI",
    description:
      "Tell it your budget and the games you play, and it generates a compatible PC build with FPS estimates. 28,780 lines across 198 files, built and maintained solo.",
    stack: ["Next.js", "Prisma", "PostgreSQL", "OpenAI API"],
    href: "https://buildmyrig.dev",
    image: "/projects/buildmyrig.jpg",
  },
  {
    name: "ECommerce ChatBot",
    description:
      "A RAG shopping assistant: catalog products are embedded into Supabase pgvector, each question is matched by similarity, and answers stream back grounded in what's actually for sale.",
    stack: ["Next.js", "Vercel AI SDK", "OpenAI", "pgvector"],
  },
  {
    name: "Cambio Radar",
    description:
      "Compares bank USD/MXN rates against Banxico's FIX, ranks guaranteed-return options after tax and inflation, tracks a stock watchlist and emails alerts. It shows where to exchange for less; it doesn't predict prices.",
    stack: ["Next.js", "TypeScript"],
  },
  {
    name: "ContratosRentaMX",
    description:
      "An invite-only app that turns a form into a Mexican house-rental contract, previewed in the browser and exported to PDF.",
    stack: ["Ruby on Rails", "PostgreSQL", "Docker"],
  },
  {
    name: "BoardQuest",
    description:
      "A Dokapon-style board game and JRPG hybrid with a chaptered world map, d20 combat, boss fights and AI opponents.",
    stack: ["Godot 4.5", "GDScript"],
    status: "In progress",
  },
];
