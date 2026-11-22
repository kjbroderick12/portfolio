import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Code2,
  Globe,
} from "lucide-react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { projects } from "@/features/projects/data/projects";
import ScrollReveal from "@/shared/components/ScrollReveal";

type ProjectPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  return {
    title: project.name,
    description: project.description,
    alternates: {
      canonical: `/projects/${slug}`,
    },
    openGraph: {
      title: `${project.name} | Kaitlynn Broderick`,
      description: project.description,
      url: `https://kaitlynnbroderick.dev/projects/${slug}`,
      type: "article",
      images: [
        {
          url: project.image,
          alt: project.imageAlt,
        },
      ],
    },
  };
}

export function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export default async function ProjectDetailPage({
  params,
}: ProjectPageProps) {
  const { slug } = await params;
  const projectIndex = projects.findIndex((item) => item.slug === slug);

  if (projectIndex === -1) {
    notFound();
  }

  const project = projects[projectIndex];
  const prevProject = projectIndex > 0 ? projects[projectIndex - 1] : null;
  const nextProject =
    projectIndex < projects.length - 1 ? projects[projectIndex + 1] : null;

  const ExternalIcon = project.externalType === "github" ? Code2 : Globe;

  return (
    <main className="relative min-h-screen w-full overflow-x-clip bg-[#080d12] text-white selection:bg-[#6fbd68]/30 selection:text-white">
      {/* Ambient Background */}
      <div
        className="pointer-events-none fixed -top-48 left-1/2 z-0 h-112.5 w-175 -translate-x-1/2 rounded-full bg-[#6fbd68]/[0.035] blur-[150px]"
        aria-hidden="true"
      />

      <article className="relative z-10 mx-auto max-w-5xl px-5 pb-20 pt-28 sm:px-8 sm:pb-24 sm:pt-32 lg:px-10">
        {/* Back Navigation */}
        <ScrollReveal variant="up">
          <Link
            href="/projects"
            className="group inline-flex items-center gap-2 rounded-sm text-sm text-white/45 transition-colors hover:text-[#6fbd68] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#6fbd68]"
          >
            <ArrowLeft
              size={15}
              className="transition-transform group-hover:-translate-x-1"
            />
            Back to projects
          </Link>
        </ScrollReveal>

        {/* Project Introduction */}
        <section className="mt-8 border-b border-white/9 pb-8 sm:mt-12 sm:pb-10">
          <ScrollReveal variant="up">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-[10px] font-medium uppercase tracking-[0.13em] text-[#6fbd68] sm:text-[11px]">
              <span>{project.category}</span>
              <span className="text-white/20">/</span>
              <span className="text-white/45">{project.type}</span>
            </div>

            <h1 className="mt-4 max-w-3xl text-3xl font-semibold leading-tight tracking-tight sm:text-4xl lg:text-[2.75rem]">
              {project.name}
            </h1>

            <div className="mt-4 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
              <p className="max-w-2xl text-sm leading-7 text-white/60 sm:text-[15px]">
                {project.description}
              </p>

              {project.externalUrl && (
                <a
                  href={project.externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${project.externalLabel || "View project"} (opens in a new tab)`}
                  className="group inline-flex w-fit shrink-0 items-center gap-2 rounded-md border border-[#6fbd68]/30 bg-[#6fbd68]/8 px-3.5 py-2.5 text-xs font-medium text-[#83ce7b] transition-colors hover:border-[#6fbd68]/60 hover:bg-[#6fbd68]/[0.14] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#6fbd68]"
                >
                  <ExternalIcon size={14} />
                  {project.externalLabel || "View project"}
                  <ArrowUpRight
                    size={13}
                    className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </a>
              )}
            </div>
          </ScrollReveal>
        </section>

        {/* Project Screenshot */}
        <ScrollReveal variant="up" delay={80}>
          <figure className="mt-7 overflow-hidden rounded-lg border border-white/9 bg-[#0a0f15] sm:mt-10">
            <div className="relative w-full overflow-hidden bg-[#080c11]">
              <Image
                src={project.image}
                alt={project.imageAlt}
                width={1600}
                height={1000}
                priority
                sizes="(max-width: 1024px) 100vw, 900px"
                className="h-auto w-full object-contain"
              />
            </div>

            <figcaption className="border-t border-white/[0.07] px-3 py-2 text-[10px] text-white/40 sm:px-4 sm:text-[11px]">
              {project.imageAlt}
            </figcaption>
          </figure>
        </ScrollReveal>

        {/* Project Information */}
        <div className="mt-10 grid grid-cols-1 gap-10 sm:mt-14 sm:gap-12 lg:grid-cols-[minmax(0,1fr)_220px] lg:gap-14">
          {/* Main Content */}
          <div className="min-w-0 space-y-9 sm:space-y-12">
            {/* Overview */}
            <ScrollReveal variant="up">
              <section>
                <h2 className="text-lg font-semibold tracking-tight text-white sm:text-xl">
                  Overview
                </h2>

                <p className="mt-3 text-sm leading-7 text-white/65">
                  {project.overview}
                </p>
              </section>
            </ScrollReveal>

            {/* Challenge */}
            <ScrollReveal variant="up">
              <section className="border-t border-white/8 pt-6 sm:pt-7">
                <h2 className="text-lg font-semibold tracking-tight text-white sm:text-xl">
                  The Challenge
                </h2>

                <p className="mt-3 text-sm leading-7 text-white/65">
                  {project.challenge}
                </p>
              </section>
            </ScrollReveal>

            {/* Approach */}
            <ScrollReveal variant="up">
              <section className="border-t border-white/8 pt-6 sm:pt-7">
                <h2 className="text-lg font-semibold tracking-tight text-white sm:text-xl">
                  The Approach
                </h2>

                <p className="mt-3 text-sm leading-7 text-white/65">
                  {project.solution}
                </p>
              </section>
            </ScrollReveal>

            {/* Highlights */}
            <ScrollReveal variant="up">
              <section className="border-t border-white/8 pt-6 sm:pt-7">
                <h2 className="text-lg font-semibold tracking-tight text-white sm:text-xl">
                  Key Features &amp; Implementation
                </h2>

                <ul className="mt-4 divide-y divide-white/[0.07]">
                  {project.highlights.map((highlight) => (
                    <li
                      key={highlight}
                      className="flex gap-3 py-3.5 text-sm leading-6 text-white/65"
                    >
                      <span className="mt-2.25 h-1.5 w-1.5 shrink-0 rounded-full bg-[#6fbd68]" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </section>
            </ScrollReveal>
          </div>

          {/* Project Details */}
          <aside className="min-w-0">
            <ScrollReveal variant="up" delay={100}>
              <div className="border-t border-white/8 pt-5 lg:sticky lg:top-28">
                <h2 className="text-xs font-semibold uppercase tracking-[0.12em] text-white/75">
                  Project Details
                </h2>

                <dl className="mt-5 space-y-5">
                  <div>
                    <dt className="text-[11px] text-white/40">Category</dt>
                    <dd className="mt-1 text-sm text-white/80">
                      {project.category}
                    </dd>
                  </div>

                  <div>
                    <dt className="text-[11px] text-white/40">Project type</dt>
                    <dd className="mt-1 text-sm text-white/80">
                      {project.type}
                    </dd>
                  </div>

                  <div>
                    <dt className="text-[11px] text-white/40">Technologies</dt>
                    <dd className="mt-2 flex flex-wrap gap-1.5">
                      {project.technologies.map((technology) => (
                        <span
                          key={technology}
                          className="rounded border border-white/9 bg-white/2.5 px-2 py-1 text-[11px] text-white/65"
                        >
                          {technology}
                        </span>
                      ))}
                    </dd>
                  </div>
                </dl>
              </div>
            </ScrollReveal>
          </aside>
        </div>

        {/* Project Navigation */}
        <footer className="mt-12 border-t border-white/9 pt-6 sm:mt-16">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            {prevProject ? (
              <Link
                href={`/projects/${prevProject.slug}`}
                className="group flex items-center gap-2 rounded-sm text-sm text-white/50 transition-colors hover:text-[#6fbd68] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#6fbd68]"
              >
                <ArrowLeft
                  size={15}
                  className="transition-transform group-hover:-translate-x-1"
                />
                <span>Previous: {prevProject.name}</span>
              </Link>
            ) : (
              <span />
            )}

            {nextProject && (
              <Link
                href={`/projects/${nextProject.slug}`}
                className="group flex items-center gap-2 rounded-sm text-sm text-white/50 transition-colors hover:text-[#6fbd68] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#6fbd68] sm:justify-end"
              >
                <span>Next: {nextProject.name}</span>
                <ArrowRight
                  size={15}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>
            )}
          </div>

          {/* Return to Projects */}
          <div className="mt-8 border-t border-white/6 pt-6">
            <Link
              href="/projects"
              className="group inline-flex items-center gap-2 rounded-sm text-sm font-medium text-[#83ce7b] transition-colors hover:text-[#a0e49a] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#6fbd68]"
            >
              <ArrowLeft
                size={15}
                className="transition-transform group-hover:-translate-x-1"
              />
              Explore all projects
            </Link>
          </div>
        </footer>
      </article>
    </main>
  );
}
