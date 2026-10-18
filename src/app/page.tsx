import Image from "next/image";
import { aiProjects, experience, profile, sideProjects, skills, type Project } from "@/data/site";

const nav = [
  { href: "#experience", label: "Experience" },
  { href: "#ai", label: "AI work" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

function Section({
  id,
  eyebrow,
  title,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24 border-t border-border py-16 sm:py-20">
      <p className="font-mono text-xs uppercase tracking-widest text-accent">{eyebrow}</p>
      <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">{title}</h2>
      <div className="mt-10">{children}</div>
    </section>
  );
}

function Tags({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {items.map((item) => (
        <li
          key={item}
          className="rounded-full border border-border px-2.5 py-0.5 font-mono text-xs text-muted"
        >
          {item}
        </li>
      ))}
    </ul>
  );
}

function ProjectCard({ project, featured = false }: { project: Project; featured?: boolean }) {
  return (
    <article
      className={`flex flex-col rounded-2xl border border-border bg-surface p-6 transition-colors hover:border-accent/50 ${
        featured ? "sm:p-8" : ""
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className={`font-semibold tracking-tight ${featured ? "text-xl" : "text-lg"}`}>
            {project.name}
          </h3>
          <p className="mt-0.5 text-sm text-accent">{project.tagline}</p>
        </div>
        {project.status && (
          <span className="shrink-0 rounded-full bg-accent-soft px-2.5 py-0.5 text-xs font-medium text-accent">
            {project.status}
          </span>
        )}
      </div>
      <p className="mt-4 leading-relaxed text-muted">{project.description}</p>
      <ul className="mt-4 space-y-1.5 text-sm">
        {project.highlights.map((h) => (
          <li key={h} className="flex gap-2">
            <span aria-hidden className="mt-2 size-1 shrink-0 rounded-full bg-accent" />
            <span>{h}</span>
          </li>
        ))}
      </ul>
      <div className="mt-auto pt-6">
        <Tags items={project.stack} />
        {(project.href || project.repo) && (
          <div className="mt-4 flex gap-4 text-sm font-medium">
            {project.href && (
              <a href={project.href} className="text-accent hover:underline">
                Live ↗
              </a>
            )}
            {project.repo && (
              <a href={project.repo} className="text-accent hover:underline">
                Code ↗
              </a>
            )}
          </div>
        )}
      </div>
    </article>
  );
}

export default function Home() {
  const { links } = profile;

  return (
    <>
      <header className="sticky top-0 z-10 border-b border-border bg-background/80 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4 sm:px-6">
          <a href="#top" className="font-semibold tracking-tight">
            {profile.name}
          </a>
          <nav className="hidden gap-6 text-sm text-muted sm:flex">
            {nav.map((n) => (
              <a key={n.href} href={n.href} className="hover:text-foreground">
                {n.label}
              </a>
            ))}
          </nav>
        </div>
      </header>

      <main id="top" className="mx-auto max-w-5xl px-4 sm:px-6">
        {/* Hero */}
        <section className="grid items-center gap-10 py-16 sm:py-24 md:grid-cols-[1fr_auto]">
          <div>
            <p className="font-mono text-sm text-accent">
              {profile.role} · {profile.location}
            </p>
            <h1 className="mt-4 max-w-2xl text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
              {profile.headline}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">{profile.summary}</p>
            <p className="mt-4 text-sm text-muted">{profile.workAuth}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#contact"
                className="rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background hover:opacity-90"
              >
                Get in touch
              </a>
              <a
                href="#experience"
                className="rounded-full border border-border px-5 py-2.5 text-sm font-medium hover:border-foreground"
              >
                See my work
              </a>
              {links.resume && (
                <a
                  href={links.resume}
                  className="rounded-full border border-border px-5 py-2.5 text-sm font-medium hover:border-foreground"
                >
                  Résumé
                </a>
              )}
            </div>
          </div>
          <Image
            src={profile.photo}
            alt={profile.fullName}
            width={224}
            height={224}
            priority
            className="size-40 rounded-full border border-border object-cover sm:size-56"
          />
        </section>

        <Section id="experience" eyebrow="Experience" title="Where I've shipped">
          <ol className="space-y-12">
            {experience.map((role) => (
              <li key={role.company} className="grid gap-2 sm:grid-cols-[12rem_1fr] sm:gap-8">
                <div>
                  <h3 className="font-semibold">{role.company}</h3>
                  <p className="font-mono text-xs text-muted">{role.period}</p>
                </div>
                <div>
                  <p className="font-medium">{role.title}</p>
                  {role.clients && <p className="text-sm text-accent">Clients: {role.clients}</p>}
                  <ul className="mt-3 space-y-1.5 text-sm">
                    {role.highlights.map((h) => (
                      <li key={h} className="flex gap-2">
                        <span aria-hidden className="mt-2 size-1 shrink-0 rounded-full bg-accent" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ol>
        </Section>

        <Section id="ai" eyebrow="AI products" title="What I've built on my own">
          <div className="grid gap-6 md:grid-cols-2">
            {aiProjects.map((p) => (
              <ProjectCard key={p.name} project={p} featured />
            ))}
          </div>
        </Section>

        <Section id="projects" eyebrow="Projects" title="Other builds">
          <div className="grid gap-6 md:grid-cols-2">
            {sideProjects.map((p) => (
              <ProjectCard key={p.name} project={p} />
            ))}
          </div>
        </Section>

        <Section id="skills" eyebrow="Toolbox" title="Skills">
          <div className="grid gap-8 sm:grid-cols-2">
            {skills.map((s) => (
              <div key={s.group}>
                <h3 className="mb-3 text-sm font-semibold">{s.group}</h3>
                <Tags items={s.items} />
              </div>
            ))}
          </div>
        </Section>

        <Section id="contact" eyebrow="Contact" title="Let's work together">
          <p className="max-w-xl text-lg leading-relaxed text-muted">
            I&apos;m open to remote frontend and AI-integration roles and contract work. The fastest
            way to reach me is email.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={`mailto:${links.email}`}
              className="rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background hover:opacity-90"
            >
              {links.email}
            </a>
            <a
              href={links.github}
              className="rounded-full border border-border px-5 py-2.5 text-sm font-medium hover:border-foreground"
            >
              GitHub ↗
            </a>
            <a
              href={links.linkedin}
              className="rounded-full border border-border px-5 py-2.5 text-sm font-medium hover:border-foreground"
            >
              LinkedIn ↗
            </a>
          </div>
        </Section>
      </main>

      <footer className="border-t border-border py-8">
        <p className="mx-auto max-w-5xl px-4 text-sm text-muted sm:px-6">
          © {new Date().getFullYear()} {profile.fullName}. Built with Next.js and Tailwind CSS.
        </p>
      </footer>
    </>
  );
}
