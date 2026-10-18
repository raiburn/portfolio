import Image from "next/image";
import { about, experience, profile, projects } from "@/data/site";
import { AskOscar } from "@/components/AskOscar";
import { RichText } from "@/components/RichText";
import { SectionNav } from "@/components/SectionNav";
import { Spotlight } from "@/components/Spotlight";
import { ArrowUpRightIcon, GitHubIcon, LinkedInIcon, MailIcon } from "@/components/icons";

function SectionHeading({ children }: { children: React.ReactNode }) {
  // Sticky label on small screens; hidden visually on large screens where the left nav takes over.
  return (
    <div className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-slate-900/75 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
      <h2 className="text-sm font-bold uppercase tracking-widest text-slate-200 lg:sr-only">{children}</h2>
    </div>
  );
}

function Tags({ items }: { items: string[] }) {
  return (
    <ul className="mt-3 flex flex-wrap" aria-label="Technologies used">
      {items.map((item) => (
        <li key={item} className="mr-1.5 mt-2">
          <span className="flex items-center rounded-full bg-teal-400/10 px-3 py-1 text-xs font-medium leading-5 text-teal-300">
            {item}
          </span>
        </li>
      ))}
    </ul>
  );
}

// Shared hover treatment: the hovered card lights up while its siblings dim.
const cardClass =
  "group relative grid pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4 lg:group-hover/list:opacity-50 lg:hover:opacity-100!";
const cardBackdrop =
  "absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-slate-800/50 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg";

function CardTitle({ href, children }: { href?: string; children: React.ReactNode }) {
  const inner = (
    <>
      <span className="absolute -inset-x-4 -inset-y-2.5 hidden rounded md:-inset-x-6 md:-inset-y-4 lg:block" />
      <span>
        {children}
        {href && (
          <ArrowUpRightIcon className="ml-1 inline-block size-4 shrink-0 translate-y-px transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 motion-reduce:transition-none" />
        )}
      </span>
    </>
  );
  return href ? (
    <a
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      className="inline-flex items-baseline font-medium leading-tight text-slate-200 hover:text-teal-300 focus-visible:text-teal-300 group-hover:text-teal-300"
    >
      {inner}
    </a>
  ) : (
    <span className="inline-flex items-baseline font-medium leading-tight text-slate-200 group-hover:text-teal-300">
      {inner}
    </span>
  );
}

export default function Home() {
  const { links } = profile;
  const socials = [
    { href: links.github, label: "GitHub", Icon: GitHubIcon },
    { href: links.linkedin, label: "LinkedIn", Icon: LinkedInIcon },
    { href: `mailto:${links.email}`, label: "Email", Icon: MailIcon },
  ];

  return (
    <div id="top" className="relative">
      <Spotlight />
      <div className="mx-auto min-h-screen max-w-screen-xl px-6 py-12 font-sans leading-relaxed md:px-12 md:py-20 lg:px-24 lg:py-0">
        <a
          href="#content"
          className="absolute left-0 top-0 block -translate-x-full rounded bg-teal-300 px-4 py-3 text-sm font-bold uppercase tracking-widest text-slate-900 focus-visible:translate-x-0"
        >
          Skip to content
        </a>

        <div className="lg:flex lg:justify-between lg:gap-4">
          {/* Left column */}
          <header className="lg:sticky lg:top-0 lg:flex lg:max-h-screen lg:w-[48%] lg:flex-col lg:justify-between lg:py-24">
            <div>
              <Image
                src={profile.photo}
                alt={profile.fullName}
                width={80}
                height={80}
                priority
                className="mb-6 size-20 rounded-full border-2 border-slate-700 object-cover"
              />
              <h1 className="text-4xl font-bold tracking-tight text-slate-200 sm:text-5xl">
                <a href="#top">{profile.name}</a>
              </h1>
              <h2 className="mt-3 text-lg font-medium tracking-tight text-slate-200 sm:text-xl">
                {profile.role}
              </h2>
              <p className="mt-4 max-w-xs leading-normal">{profile.tagline}</p>
              <SectionNav />
            </div>

            <ul className="ml-1 mt-8 flex items-center" aria-label="Social media">
              {socials.map(({ href, label, Icon }) => (
                <li key={label} className="mr-5 shrink-0 text-xs">
                  <a
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel="noreferrer noopener"
                    aria-label={`${label} (opens in a new tab)`}
                    title={label}
                    className="-m-2.5 block p-2.5 hover:text-slate-200"
                  >
                    <span className="sr-only">{label}</span>
                    <Icon className="size-6" />
                  </a>
                </li>
              ))}
            </ul>
          </header>

          {/* Right column */}
          <main id="content" className="pt-24 lg:w-[52%] lg:py-24">
            <section id="about" aria-label="About me" className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24">
              <SectionHeading>About</SectionHeading>
              <div className="space-y-4">
                {about.map((p) => (
                  <p key={p}>
                    <RichText text={p} />
                  </p>
                ))}
              </div>
            </section>

            <section id="ask" aria-label="Ask about me" className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24">
              <SectionHeading>Ask AI</SectionHeading>
              <AskOscar email={links.email} />
            </section>

            <section id="experience" aria-label="Work experience" className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24">
              <SectionHeading>Experience</SectionHeading>
              <ol className="group/list space-y-12">
                {experience.map((role) => (
                  <li key={role.company}>
                    <div className={cardClass}>
                      <div className={cardBackdrop} />
                      <header
                        className="z-10 mb-2 mt-1 text-xs font-semibold uppercase tracking-wide text-slate-500 sm:col-span-2"
                        aria-label={role.period}
                      >
                        {role.period}
                      </header>
                      <div className="z-10 sm:col-span-6">
                        <h3>
                          <CardTitle href={role.href}>
                            {role.title} · {role.company}
                          </CardTitle>
                        </h3>
                        {role.clients && (
                          <p className="mt-1 text-sm text-slate-500">
                            Clients:{" "}
                            {role.clients.map((c, i) => (
                              <span key={c.name}>
                                {i > 0 && " · "}
                                {c.href ? (
                                  <a
                                    href={c.href}
                                    target="_blank"
                                    rel="noreferrer noopener"
                                    className="relative z-20 text-slate-400 hover:text-teal-300 focus-visible:text-teal-300"
                                  >
                                    {c.name}
                                  </a>
                                ) : (
                                  c.name
                                )}
                              </span>
                            ))}
                          </p>
                        )}
                        <ul className="mt-2 space-y-2 text-sm leading-normal">
                          {role.highlights.map((h) => (
                            <li key={h}>{h}</li>
                          ))}
                        </ul>
                        <Tags items={role.stack} />
                      </div>
                    </div>
                  </li>
                ))}
              </ol>
              <div className="mt-12">
                <a
                  href={links.resume}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="group inline-flex items-baseline font-semibold leading-tight text-slate-200"
                >
                  <span className="border-b border-transparent pb-px transition group-hover:border-teal-300 motion-reduce:transition-none">
                    View Full Résumé
                  </span>
                  <ArrowUpRightIcon className="ml-1 inline-block size-4 shrink-0 translate-y-px transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 motion-reduce:transition-none" />
                </a>
              </div>
            </section>

            <section id="projects" aria-label="Selected projects" className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24">
              <SectionHeading>Projects</SectionHeading>
              <ul className="group/list space-y-12">
                {projects.map((project) => (
                  <li key={project.name}>
                    <div className={cardClass}>
                      <div className={cardBackdrop} />
                      <div className={`z-10 ${project.image ? "sm:order-2 sm:col-span-6" : "sm:col-span-8"}`}>
                        <h3>
                          <CardTitle href={project.href}>{project.name}</CardTitle>
                          {project.status && (
                            <span className="ml-2 align-middle text-xs font-medium text-slate-500">
                              · {project.status}
                            </span>
                          )}
                        </h3>
                        <p className="mt-2 text-sm leading-normal">{project.description}</p>
                        <Tags items={project.stack} />
                      </div>
                      {project.image && (
                        <Image
                          src={project.image}
                          alt=""
                          width={200}
                          height={88}
                          className="z-10 rounded border-2 border-slate-200/10 transition group-hover:border-slate-200/30 sm:order-1 sm:col-span-2 sm:translate-y-1"
                        />
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </section>

            <footer className="max-w-md pb-16 text-sm text-slate-500 sm:pb-0">
              <p>
                Built with Next.js and Tailwind CSS, deployed on Vercel. Layout inspired by{" "}
                <a
                  href="https://brittanychiang.com"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="font-medium text-slate-400 hover:text-teal-300"
                >
                  Brittany Chiang
                </a>
                .
              </p>
            </footer>
          </main>
        </div>
      </div>
    </div>
  );
}
