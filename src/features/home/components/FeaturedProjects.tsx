
"use client";

import { useId, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  Check,
  ChevronDown,
  FolderGit2,
  Globe,
} from "lucide-react";

import { projects } from "@/features/projects/data/projects";
import type { Project } from "@/features/projects/types/project";
import ScrollReveal from "@/shared/components/ScrollReveal";

interface FeaturedProjectsProps {
  projects?: Project[];
}

export default function FeaturedProjects({
  projects: projectList = projects,
}: FeaturedProjectsProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const rowRefs = useRef<(HTMLElement | null)[]>([]);
  const panelId = useId();

  const handleToggle = (index: number) => {
    const isAlreadyOpen = index === openIndex;

    setOpenIndex(isAlreadyOpen ? null : index);

    if (!isAlreadyOpen) {
      requestAnimationFrame(() => {
        rowRefs.current[index]?.scrollIntoView({
          behavior: window.matchMedia("(prefers-reduced-motion: reduce)")
            .matches
            ? "auto"
            : "smooth",
          block: "nearest",
        });
      });
    }
  };

  return (
    <section
      id="projects"
      className="relative isolate w-full overflow-x-clip bg-[#080d12] px-4 py-12 text-white sm:px-10 sm:py-16 lg:px-16 lg:py-20"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 top-24 z-0 h-90 w-90 rounded-full bg-[#6fbd68]/4 blur-[130px] sm:h-120 sm:w-120 sm:blur-[150px]"
      />

      <div className="relative z-10 mx-auto w-full max-w-7xl">
        <ScrollReveal variant="up">
          <div className="mb-8 flex flex-col gap-4 border-b border-white/8 pb-7 md:mb-10 md:flex-row md:items-end md:justify-between md:gap-12">
            <div>
              <h2 className="text-3xl font-semibold leading-[0.98] tracking-[-0.04em] text-white sm:text-5xl">
                Featured Projects
              </h2>
            </div>

            <div className="flex flex-col items-start gap-2.5 md:items-end">
              <p className="max-w-md text-sm leading-7 text-white/55 md:text-right">
                A selection of applications built with thoughtful architecture,
                practical solutions, and clean execution.
              </p>

              <Link
                href="/projects"
                className="group inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.16em] text-[#6fbd68] transition-colors hover:text-[#82cf7a]"
              >
                <span>View all projects</span>
                <ArrowUpRight
                  size={14}
                  className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </Link>
            </div>
          </div>
        </ScrollReveal>

        <div className="space-y-4">
          {projectList.map((project, index) => {
            const isOpen = index === openIndex;
            const currentPanelId = `${panelId}-project-${index}`;
            const visibleHighlights = project.highlights.slice(0, 3);
            const visibleTechnologies = project.technologies.slice(0, 5);
            const remainingTechnologies =
              project.technologies.length - visibleTechnologies.length;

            const isGithub = project.externalType === "github";
            const ExternalIcon = isGithub ? FolderGit2 : Globe;

            const isPointSync = project.name
              .toLowerCase()
              .includes("pointsync");

            return (
              <ScrollReveal
                key={project.slug}
                variant="up"
                delay={index * 50}
              >
                <article
                  ref={(el) => {
                    rowRefs.current[index] = el;
                  }}
                  className={`scroll-mt-24 overflow-hidden rounded-2xl border transition-all duration-300 ${
                    isOpen
                      ? "border-[#6fbd68]/40 bg-[#0b1117]"
                      : isPointSync
                        ? "border-[#6fbd68]/25 bg-[#0b1117]/75 hover:border-[#6fbd68]/40"
                        : "border-white/8 bg-[#0b1117]/50 hover:border-white/20 hover:bg-[#0b1117]/80"
                  }`}
                >
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={currentPanelId}
                    onClick={() => handleToggle(index)}
                    className="flex min-h-20 w-full items-center justify-between gap-3 px-4 py-4 text-left transition-colors hover:bg-white/2 sm:gap-4 sm:px-7 sm:py-5"
                  >
                    <div className="flex min-w-0 flex-col gap-1.5 sm:flex-row sm:items-baseline sm:gap-4">
                      <h3
                        className={`truncate text-lg font-semibold tracking-tight transition-colors sm:text-2xl ${
                          isOpen ? "text-white" : "text-white/75"
                        }`}
                      >
                        {project.name}
                      </h3>

                      <div className="flex min-w-0 flex-wrap items-center gap-2">
                        <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#6fbd68] sm:text-[11px] sm:tracking-[0.16em]">
                          {project.category}
                        </span>

                        <span className="hidden text-white/20 sm:inline">
                          /
                        </span>

                        <span className="hidden font-mono text-[11px] text-white/35 sm:inline">
                          {project.type}
                        </span>
                      </div>
                    </div>

                    <div
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border transition-colors ${
                        isOpen
                          ? "border-[#6fbd68]/30 bg-[#6fbd68]/10 text-[#6fbd68]"
                          : "border-white/10 bg-white/2 text-white/45"
                      }`}
                    >
                      <ChevronDown
                        size={16}
                        className={`transition-transform duration-200 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </div>
                  </button>

                  {isOpen && (
                    <div
                      id={currentPanelId}
                      className="border-t border-white/8 p-4 sm:p-7"
                    >
                      <div className="grid grid-cols-1 gap-7 lg:grid-cols-12 lg:items-center lg:gap-8">
                        <div className="lg:col-span-5">
                          <Link
                            href={`/projects/${project.slug}`}
                            aria-label={`Open ${project.name} case study`}
                            className="group block overflow-hidden rounded-xl border border-white/8 bg-[#06090d]"
                          >
                            <div className="flex h-7 items-center gap-1.5 border-b border-white/6 bg-white/2 px-3">
                              <span className="h-2 w-2 rounded-full bg-white/15" />
                              <span className="h-2 w-2 rounded-full bg-white/15" />
                              <span className="h-2 w-2 rounded-full bg-white/15" />

                              <span className="ml-1.5 truncate font-mono text-[10px] text-white/35">
                                {project.externalType === "live"
                                  ? project.externalUrl.replace("https://", "")
                                  : project.slug}
                              </span>
                            </div>

                            <div className="w-full overflow-hidden bg-[#06090d]">
                              <Image
                                src={project.image}
                                alt={project.imageAlt}
                                width={1600}
                                height={1000}
                                sizes="(max-width: 1024px) 100vw, 480px"
                                className="block h-auto w-full object-contain transition-transform duration-500 ease-out group-hover:scale-[1.015]"
                              />
                            </div>
                          </Link>
                        </div>

                        <div className="flex flex-col justify-between lg:col-span-7">
                          <div>
                            {isPointSync && (
                              <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.16em] text-[#6fbd68]">
                                Workflow automation
                              </p>
                            )}

                            <p className="text-sm leading-7 text-white/65">
                              {project.description}
                            </p>

                            <ul className="mt-5 space-y-3">
                              {visibleHighlights.map((highlight) => (
                                <li
                                  key={highlight}
                                  className="flex items-start gap-2.5 text-xs leading-6 text-white/75 sm:text-sm"
                                >
                                  <Check
                                    size={15}
                                    className="mt-1 shrink-0 text-[#6fbd68]"
                                  />
                                  <span>{highlight}</span>
                                </li>
                              ))}
                            </ul>

                            <div className="mt-5 flex flex-wrap gap-2">
                              {visibleTechnologies.map((technology) => (
                                <span
                                  key={technology}
                                  className="rounded-md border border-white/8 bg-white/3 px-2.5 py-1.5 font-mono text-[10px] text-white/65 sm:text-[11px]"
                                >
                                  {technology}
                                </span>
                              ))}

                              {remainingTechnologies > 0 && (
                                <span className="rounded-md border border-white/8 bg-white/3 px-2.5 py-1.5 font-mono text-[10px] text-white/40 sm:text-[11px]">
                                  +{remainingTechnologies} more
                                </span>
                              )}
                            </div>
                          </div>

                          <div className="mt-7 flex flex-col gap-3 border-t border-white/[0.07] pt-5 sm:flex-row sm:flex-wrap sm:items-center">
                            <Link
                              href={`/projects/${project.slug}`}
                              className="group inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#6fbd68] px-5 text-xs font-semibold text-[#081009] transition-colors hover:bg-[#82cf7a] sm:w-auto"
                            >
                              <span>Case Study</span>
                              <ArrowUpRight
                                size={15}
                                className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                              />
                            </Link>

                            <a
                              href={project.externalUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="group inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl border border-white/12 bg-white/3 px-5 text-xs font-medium text-white/85 transition-colors hover:border-[#6fbd68]/45 hover:bg-[#6fbd68]/8 hover:text-[#6fbd68] sm:w-auto"
                            >
                              <ExternalIcon size={14} />
                              <span>{project.externalLabel}</span>
                              <ArrowUpRight
                                size={14}
                                className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                              />
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </article>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
