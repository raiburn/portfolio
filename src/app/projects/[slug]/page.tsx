import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { caseStudies, getCaseStudy } from "@/data/case-studies";
import { profile } from "@/data/site";
import { RichText } from "@/components/RichText";
import { Spotlight } from "@/components/Spotlight";
import { ArrowUpRightIcon } from "@/components/icons";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const study = getCaseStudy((await params).slug);
  if (!study) return {};
  const title = `${study.name} case study · ${profile.name}`;
  return {
    title,
    description: study.summary,
    alternates: { canonical: `/projects/${study.slug}` },
    openGraph: { type: "article", url: `/projects/${study.slug}`, title, description: study.summary },
    twitter: { card: "summary_large_image", title, description: study.summary },
  };
}

function BackLink() {
  return (
    <Link href="/#projects" className="group inline-flex items-center font-semibold leading-tight text-teal-300">
      <span className="mr-1 transition-transform group-hover:-translate-x-1 motion-reduce:transition-none">←</span>
      {profile.name}
    </Link>
  );
}

function Figure({ src, alt, caption, priority }: { src: string; alt: string; caption?: string; priority?: boolean }) {
  return (
    <figure className="mt-8">
      <Image
        src={src}
        alt={alt}
        width={1440}
        height={795}
        priority={priority}
        sizes="(min-width: 768px) 768px, 100vw"
        className="rounded-md border-2 border-slate-200/10"
      />
      {caption && <figcaption className="mt-2 text-sm text-slate-500">{caption}</figcaption>}
    </figure>
  );
}

export default async function CaseStudyPage({ params }: Props) {
  const study = getCaseStudy((await params).slug);
  if (!study) notFound();

  return (
    <div className="relative">
      <Spotlight />
      <main className="mx-auto min-h-screen max-w-3xl px-6 py-12 font-sans leading-relaxed md:px-12 md:py-20 lg:py-24">
        <BackLink />

        <header className="mt-10">
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">Case study</p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight text-slate-200 sm:text-5xl">{study.name}</h1>
          <p className="mt-4 text-lg leading-normal">{study.summary}</p>
          <dl className="mt-8 grid gap-6 text-sm sm:grid-cols-3">
            <div>
              <dt className="font-semibold text-slate-200">Role</dt>
              <dd className="mt-1">{study.role}</dd>
            </div>
            <div>
              <dt className="font-semibold text-slate-200">Timeline</dt>
              <dd className="mt-1">{study.period}</dd>
            </div>
            {study.live && (
              <div>
                <dt className="font-semibold text-slate-200">Live</dt>
                <dd className="mt-1">
                  <a
                    href={study.live}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="group inline-flex items-baseline text-teal-300 hover:text-teal-200"
                  >
                    {new URL(study.live).host}
                    <ArrowUpRightIcon className="ml-1 inline-block size-4 shrink-0 translate-y-px transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 motion-reduce:transition-none" />
                  </a>
                </dd>
              </div>
            )}
            {study.repo && (
              <div>
                <dt className="font-semibold text-slate-200">Code</dt>
                <dd className="mt-1">
                  <a
                    href={study.repo}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="group inline-flex items-baseline text-teal-300 hover:text-teal-200"
                  >
                    GitHub
                    <ArrowUpRightIcon className="ml-1 inline-block size-4 shrink-0 translate-y-px transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 motion-reduce:transition-none" />
                  </a>
                </dd>
              </div>
            )}
          </dl>
          <ul className="mt-6 flex flex-wrap" aria-label="Technologies used">
            {study.stack.map((item) => (
              <li key={item} className="mr-1.5 mt-2">
                <span className="flex items-center rounded-full bg-teal-400/10 px-3 py-1 text-xs font-medium leading-5 text-teal-300">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </header>

        <Figure src={study.hero.src} alt={study.hero.alt} priority />

        <ul className="mt-12 grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4" aria-label="Key numbers">
          {study.stats.map((s) => (
            <li key={s.label}>
              <p className="text-2xl font-bold tracking-tight text-slate-200">{s.value}</p>
              <p className="mt-1 text-sm leading-snug text-slate-500">{s.label}</p>
            </li>
          ))}
        </ul>

        {study.sections.map((section) => (
          <section key={section.heading} className="mt-16">
            <h2 className="text-xl font-semibold tracking-tight text-slate-200 sm:text-2xl">{section.heading}</h2>
            <div className="mt-4 space-y-4">
              {section.paragraphs?.map((p) => (
                <p key={p}>
                  <RichText text={p} />
                </p>
              ))}
            </div>
            {section.bullets && (
              <ul className="mt-4 list-disc space-y-3 pl-5 marker:text-teal-300">
                {section.bullets.map((b) => (
                  <li key={b}>
                    <RichText text={b} />
                  </li>
                ))}
              </ul>
            )}
            {section.steps && (
              <ol className="mt-4 space-y-3">
                {section.steps.map((step, i) => (
                  <li key={step} className="flex gap-4">
                    <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-teal-400/10 text-xs font-semibold text-teal-300">
                      {i + 1}
                    </span>
                    <span className="pt-0.5">{step}</span>
                  </li>
                ))}
              </ol>
            )}
            {section.image && <Figure {...section.image} />}
          </section>
        ))}

        <footer className="mt-20 flex flex-wrap items-center justify-between gap-4 border-t border-slate-800 pt-8">
          <BackLink />
          {(study.live || study.repo) && (
            <a
              href={study.live ?? study.repo}
              target="_blank"
              rel="noreferrer noopener"
              className="group inline-flex items-baseline font-semibold text-slate-200 hover:text-teal-300"
            >
              {study.live ? `Try ${study.name}` : "View the code"}
              <ArrowUpRightIcon className="ml-1 inline-block size-4 shrink-0 translate-y-px transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 motion-reduce:transition-none" />
            </a>
          )}
        </footer>
      </main>
    </div>
  );
}
