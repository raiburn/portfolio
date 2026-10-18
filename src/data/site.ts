// All portfolio content lives here. Edit this file to update the site.

export const profile = {
  name: "Oscar Ruiz",
  fullName: "Oscar Eduardo Ruiz Plascencia",
  role: "Senior Software Engineer",
  location: "Hermosillo, Mexico · Remote",
  photo: "/profile.jpg",
  headline: "I build enterprise frontends, e-commerce experiences and AI-powered products.",
  summary:
    "5+ years with React, Next.js and TypeScript across enterprise healthcare platforms, high-traffic e-commerce, internal SaaS tools and AI products. I turn complex requirements into maintainable systems and pick the simplest solution with the biggest product impact.",
  workAuth: "Mexican citizen, TN-eligible under USMCA",
  links: {
    email: "oeruizplascencia@gmail.com",
    github: "https://github.com/raiburn",
    linkedin: "https://www.linkedin.com/in/oscar-ruiz-415099199/",
    resume: "/Oscar_Ruiz_CV.pdf",
  },
};

export type Project = {
  name: string;
  tagline: string;
  description: string;
  highlights: string[];
  stack: string[];
  href?: string;
  repo?: string;
  status?: string;
};

export type Role = {
  company: string;
  title: string;
  period: string;
  clients?: string;
  highlights: string[];
};

export const experience: Role[] = [
  {
    company: "Apex Systems",
    title: "Software Engineer",
    period: "2022 – 2026",
    clients: "HC1 Healthcare · Duluth Trading Company",
    highlights: [
      "Joined a greenfield healthcare platform from day one and helped build its frontend architecture with React, TypeScript, Material UI, React Context and custom hooks.",
      "Shaped architecture decisions: folder structure, reusable component design, shared state management, library selection and implementation standards.",
      "Introduced Cypress after the first development phase, built the initial E2E testing approach and helped the team expand coverage for demos and regression confidence.",
      "Shipped customer-facing e-commerce features for Duluth Trading across Home, Search, PLP, PDP, Cart, Checkout, Account/Login, Navigation and Promotions.",
      "Improved production performance and UX through lazy loading, rendering optimization and reusable components.",
    ],
  },
  {
    company: "Enroute Systems",
    title: "Front End Developer",
    period: "2021 – 2022",
    clients: "8x8 Cloud Communications",
    highlights: [
      "Built internal marketing tools and a form builder with React, GraphQL and Node.js, so marketing teams could create and manage campaign landing pages themselves.",
      "Created reusable components and integration flows that made internal tools more consistent and sped up delivery of new marketing features.",
      "Delivered maintainable interfaces and API integrations for non-technical users alongside distributed engineering and product teams.",
    ],
  },
];

export const aiProjects: Project[] = [
  {
    name: "BuildMyRig AI",
    tagline: "AI-powered PC builder SaaS",
    description:
      "An independent SaaS product I designed and built from scratch: describe your budget and games, get a compatible PC build with FPS estimates, plus server-rendered SEO pages for organic acquisition.",
    highlights: [
      "AI Build Generator, FPS Estimator, auth, user dashboard, admin panel and Amazon affiliate integration",
      "Prisma/PostgreSQL model for component compatibility rules, game pages and saved builds",
      "28,780 lines across 198 files, built and maintained solo",
    ],
    stack: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "OpenAI API", "Tailwind CSS"],
    href: "https://buildmyrig.dev",
    status: "2025 – Present",
  },
  {
    name: "ECommerce ChatBot",
    tagline: "RAG-powered shopping assistant",
    description:
      "A shopping assistant that answers questions about a real product catalog. Products are embedded into Supabase pgvector; each question is matched by cosine similarity and the top results go into the prompt, so answers stay grounded in what's actually for sale.",
    highlights: [
      "Retrieval pipeline: OpenAI embeddings → pgvector similarity search → grounded prompt",
      "Token-by-token streaming UI on the Edge runtime with the Vercel AI SDK",
      "Cheap to run with gpt-4o-mini and text-embedding-3-small",
    ],
    stack: ["Next.js 14", "Vercel AI SDK", "OpenAI", "Supabase", "pgvector", "TypeScript"],
  },
];

export const sideProjects: Project[] = [
  {
    name: "Cambio Radar",
    tagline: "USD/MXN rate comparator & alerts",
    description:
      "A personal finance dashboard that compares bank exchange rates against Banxico's FIX and the market price, tracks a BMV/US stock watchlist, and sends email alerts when targets hit. It doesn't predict prices; it shows where to exchange for less.",
    highlights: [
      "Compares guaranteed-return options (CETES, accounts, term deposits) after tax and inflation",
      "Only recommends rates verified in the last 30 days and covered by deposit insurance",
    ],
    stack: ["Next.js", "TypeScript", "Email alerts"],
  },
  {
    name: "ContratosRentaMX",
    tagline: "Rental contract generator",
    description:
      "An invite-only app that turns a form into a Mexican house-rental contract, previewed in the browser and exported to PDF.",
    highlights: ["Form → HTML preview → PDF", "Admin-managed users, no public sign-up"],
    stack: ["Ruby on Rails", "PostgreSQL", "Docker"],
  },
  {
    name: "BoardQuest",
    tagline: "Board game × JRPG",
    description:
      "A Dokapon-style board game and JRPG hybrid: roll, move, fight, get rich. It has a world map with chapters and zones, d20 combat, boss fights and AI opponents.",
    highlights: ["Campaign mode with chapters and zones", "AI opponents and d20 combat system"],
    stack: ["Godot 4.5", "GDScript"],
    status: "In progress",
  },
];

export const skills: { group: string; items: string[] }[] = [
  {
    group: "Frontend",
    items: ["React", "Next.js", "TypeScript", "JavaScript", "React Context", "Redux", "Tailwind CSS", "Material UI"],
  },
  {
    group: "Backend",
    items: ["Node.js", "Express.js", "GraphQL", "REST APIs", "Prisma", "PostgreSQL", "Supabase"],
  },
  {
    group: "AI / LLM",
    items: ["OpenAI API", "RAG", "pgvector", "Vercel AI SDK", "Claude", "Cursor", "AI-assisted development"],
  },
  {
    group: "Quality & tools",
    items: ["Cypress", "Jest", "Git", "Vercel", "Code reviews", "Agile", "Performance optimization"],
  },
];
