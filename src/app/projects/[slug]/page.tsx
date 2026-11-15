
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Code2, Globe } from "lucide-react";
import { notFound } from "next/navigation";

import { projects } from "@/features/projects/data/projects";
import ScrollReveal from "@/shared/components/ScrollReveal";

type ProjectPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export default async function ProjectDetailPage({
  params,
}: ProjectPageProps) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);

  if (!project) {
    notFound();
  }

  const ExternalIcon =
    project.externalType === "github" ? Code2 : Globe;

  return (
    <main className="min-h-screen bg-[#080d12] text-white">
      <section className="mx-auto max-w-7xl px-6 pb-24 pt-32 sm:px-10 sm:pt-40 lg:px-16">
        <ScrollReveal variant="up">
          <Link
            href="/projects"
            className="mb-12 inline-flex items-center gap-2 text-sm text-white/50 transition-colors hover:text-[#6fbd68]"
          >
            <ArrowLeft size={16} />
            Back to Projects
          </Link>

          <div className="max-w-3xl">
            <div className="mb-5 flex flex-wrap items-center gap-3 text-xs font-medium uppercase tracking-[0.15em]">
              <span className="text-[#6fbd68]">{project.number}</span>
              <span className="text-white/25">/</span>
              <span className="text-white/50">{project.category}</span>
              <span className="text-white/25">/</span>
              <span className="text-white/40">{project.type}</span>
            </div>

            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
              {project.name}
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-white/60 sm:text-lg">
              {project.description}
            </p>

            <div className="mt-8 flex flex-wrap gap-5">
              <a
                href={project.externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium text-[#6fbd68] transition-colors hover:text-white"
              >
                <ExternalIcon size={16} />
                {project.externalLabel}
                <ArrowUpRight size={15} />
              </a>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal variant="up" delay={0.1}>
            <div className="mt-14 w-full overflow-hidden rounded-xl border border-white/10 sm:mt-16">
                <Image
                src={project.image}
                alt={project.imageAlt}
                width={1600}
                height={1000}
                priority
                sizes="(max-width: 768px) 100vw, 1200px"
                className="h-auto w-full"
                />
            </div>
        </ScrollReveal>

        <div className="mt-20 grid gap-16 lg:grid-cols-[minmax(0,1fr)_280px] lg:gap-24">
          <div className="space-y-14">
            <ScrollReveal variant="up">
              <section>
                <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-[#6fbd68]">
                  Overview
                </p>
                <p className="text-base leading-8 text-white/65">
                  {project.overview}
                </p>
              </section>
            </ScrollReveal>

            <ScrollReveal variant="up">
              <section>
                <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-[#6fbd68]">
                  The Challenge
                </p>
                <p className="text-base leading-8 text-white/65">
                  {project.challenge}
                </p>
              </section>
            </ScrollReveal>

            <ScrollReveal variant="up">
              <section>
                <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-[#6fbd68]">
                  The Approach
                </p>
                <p className="text-base leading-8 text-white/65">
                  {project.solution}
                </p>
              </section>
            </ScrollReveal>

            <ScrollReveal variant="up">
              <section>
                <p className="mb-6 text-xs font-semibold uppercase tracking-[0.18em] text-[#6fbd68]">
                  Key Features & Contributions
                </p>

                <ul className="space-y-4">
                  {project.highlights.map((highlight) => (
                    <li
                      key={highlight}
                      className="flex gap-3 text-sm leading-7 text-white/65"
                    >
                      <span className="mt-2.75 h-1.5 w-1.5 shrink-0 rounded-full bg-[#6fbd68]" />
                      {highlight}
                    </li>
                  ))}
                </ul>
              </section>
            </ScrollReveal>
          </div>

          <aside className="h-fit border-t border-white/10 pt-8 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
            <ScrollReveal variant="up">
              <p className="mb-5 text-xs font-semibold uppercase tracking-[0.18em] text-[#6fbd68]">
                Technologies
              </p>

              <div className="flex flex-wrap gap-2 lg:flex-col lg:items-start">
                {project.technologies.map((technology) => (
                  <span
                    key={technology}
                    className="rounded-full border border-white/10 bg-white/3 px-3 py-2 text-xs text-white/60"
                  >
                    {technology}
                  </span>
                ))}
              </div>
            </ScrollReveal>
          </aside>
        </div>

        <div className="mt-24 border-t border-white/10 pt-8">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm text-white/55 transition-colors hover:text-[#6fbd68]"
          >
            <ArrowLeft size={16} />
            All Projects
          </Link>
        </div>
      </section>
    </main>
  );
}
