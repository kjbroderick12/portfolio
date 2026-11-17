
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Code2, Globe } from "lucide-react";

import { projects } from "@/features/projects/data/projects";
import ScrollReveal from "@/shared/components/ScrollReveal";

export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-[#080d12] text-white">
      <section className="mx-auto max-w-7xl px-6 pb-20 pt-36 sm:px-10 lg:px-16 lg:pb-28 lg:pt-44">
        <ScrollReveal variant="up">
          <div className="mb-16 max-w-2xl sm:mb-20">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#6fbd68]">
              Portfolio / Selected Work
            </p>

            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
              Projects
            </h1>

            <p className="mt-5 max-w-xl text-base leading-7 text-white/60 sm:text-lg">
              A collection of applications I've built, problems I've explored,
              and ideas I've brought to life.
            </p>
          </div>
        </ScrollReveal>

        <div className="space-y-24 sm:space-y-32">
          {projects.map((project, index) => {
            const ExternalIcon =
              project.externalType === "github" ? Code2 : Globe;

            return (
              <ScrollReveal
                key={project.slug}
                variant="up"
                delay={index * 80}
              >
                <article className="group relative">
                  {/* Full project card link */}
                  <Link
                    href={`/projects/${project.slug}`}
                    scroll={true}
                    aria-label={`View ${project.name} case study`}
                    className="absolute inset-0 z-0 rounded-xl focus-visible:outline focus-visible:outline-offset-4 focus-visible:outline-[#6fbd68]"
                  />

                  <div className="relative z-10 pointer-events-none">
                    <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-medium tabular-nums text-[#6fbd68]">
                          {project.number}
                        </span>

                        <span className="h-px w-7 bg-white/20" />

                        <span className="text-xs font-medium uppercase tracking-[0.15em] text-white/55">
                          {project.category}
                        </span>
                      </div>

                      <span className="text-xs text-white/40">
                        {project.type}
                      </span>
                    </div>

                    <Link
                      href={`/projects/${project.slug}`}
                      scroll={true}
                      aria-label={`View ${project.name} case study`}
                      className="group/image pointer-events-auto relative block overflow-hidden rounded-xl border border-white/10 focus-visible:outline focus-visible:outline-offset-4 focus-visible:outline-[#6fbd68]"
                    >
                      <Image
                        src={project.image}
                        alt={project.imageAlt}
                        width={1600}
                        height={1000}
                        sizes="(max-width: 768px) 100vw, 1200px"
                        className="h-auto w-full transition-transform duration-700 ease-out group-hover/image:scale-[1.015]"
                      />

                      <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover/image:bg-black/10" />

                      <div className="absolute bottom-5 right-5 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-[#080d12]/80 text-white opacity-0 backdrop-blur-sm transition-all duration-300 group-hover/image:opacity-100">
                        <ArrowUpRight size={19} />
                      </div>
                    </Link>

                    <div className="mt-7 grid gap-7 lg:grid-cols-[1fr_auto] lg:items-start lg:gap-12">
                      <div className="max-w-2xl">
                        <Link
                          href={`/projects/${project.slug}`}
                          scroll={true}
                          className="group/title pointer-events-auto inline-flex items-center gap-2"
                        >
                          <h2 className="text-2xl font-semibold tracking-tight transition-colors duration-200 group-hover/title:text-[#6fbd68] sm:text-3xl">
                            {project.name}
                          </h2>

                          <ArrowUpRight
                            size={19}
                            className="text-[#6fbd68] transition-transform duration-200 group-hover/title:translate-x-1 group-hover/title:-translate-y-1"
                          />
                        </Link>

                        <p className="mt-3 text-sm leading-7 text-white/60 sm:text-base">
                          {project.description}
                        </p>

                        <div className="mt-5 flex flex-wrap gap-2">
                          {project.technologies.map((technology) => (
                            <span
                              key={technology}
                              className="rounded-full border border-white/10 bg-white/3 px-3 py-1.5 text-xs text-white/55"
                            >
                              {technology}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-5 lg:flex-col lg:items-end">
                        <Link
                          href={`/projects/${project.slug}`}
                          scroll={true}
                          className="pointer-events-auto inline-flex items-center gap-2 text-sm font-medium text-white transition-colors hover:text-[#6fbd68]"
                        >
                          View Case Study
                          <ArrowUpRight size={16} />
                        </Link>

                        <a
                          href={project.externalUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="pointer-events-auto inline-flex items-center gap-2 text-sm text-white/50 transition-colors hover:text-[#6fbd68]"
                        >
                          <ExternalIcon size={15} />
                          {project.externalLabel}
                        </a>
                      </div>
                    </div>
                  </div>
                </article>
              </ScrollReveal>
            );
          })}
        </div>
      </section>
    </main>
  );
}
