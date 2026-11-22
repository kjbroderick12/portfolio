"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Code2, Globe } from "lucide-react";
import type { Project } from "@/features/projects/types/project";

export default function ProjectsGrid({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState("All");

  const categories = [
    "All",
    ...Array.from(new Set(projects.map((project) => project.category))),
  ];

  const filteredProjects = projects.filter(
    (project) => filter === "All" || project.category === filter
  );

  return (
    <div>
      {/* Category Filters */}
      {categories.length > 2 && (
        <div
          className="mb-10 flex flex-wrap items-center gap-2 sm:mb-12"
          aria-label="Filter projects by category"
        >
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setFilter(category)}
              aria-pressed={filter === category}
              className={`rounded-lg px-3.5 py-2 text-xs font-medium transition-all duration-200 ${
                filter === category
                  ? "bg-[#6fbd68] text-[#081009] shadow-sm shadow-[#6fbd68]/20"
                  : "border border-white/8 bg-white/2 text-white/60 hover:border-white/25 hover:text-white"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      )}

      {/* Project Cards */}
      <div className="grid auto-rows-fr grid-cols-1 gap-5 md:grid-cols-2 md:gap-6 lg:gap-8">
        {filteredProjects.map((project) => {
          const ExternalIcon =
            project.externalType === "github" ? Code2 : Globe;

          return (
            <article
              key={project.slug}
              className="group flex h-full flex-col rounded-2xl border border-white/8 bg-[#0b1117]/80 p-5 transition-all duration-300 hover:border-[#6fbd68]/40 hover:bg-[#0b1117] sm:p-8"
            >
              {/* Case Study Link */}
              <Link
                href={`/projects/${project.slug}`}
                scroll={true}
                aria-label={`View ${project.name} project details`}
                className="group/link flex flex-1 flex-col rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#6fbd68]"
              >
                {/* Category and Project Type */}
                <div className="flex items-center justify-between gap-3">
                  <span className="text-[11px] font-medium uppercase tracking-[0.13em] text-[#6fbd68] sm:text-xs sm:tracking-[0.15em]">
                    {project.category}
                  </span>

                  <span className="rounded-md border border-white/10 bg-white/3 px-2.5 py-1 text-[10px] font-medium text-white/50 sm:text-[11px]">
                    {project.type}
                  </span>
                </div>

                {/* Title and Description */}
                <div className="mt-4 sm:mt-5">
                  <div className="flex items-center justify-between gap-3 sm:gap-4">
                    <h2 className="text-xl font-semibold tracking-tight text-white transition-colors duration-300 group-hover/link:text-[#6fbd68] sm:text-3xl">
                      {project.name}
                    </h2>

                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/2 text-white/40 transition-all duration-300 group-hover/link:border-[#6fbd68]/40 group-hover/link:bg-[#6fbd68]/10 group-hover/link:text-[#6fbd68] sm:h-9 sm:w-9">
                      <ArrowUpRight size={16} aria-hidden="true" />
                    </div>
                  </div>

                  <p className="mt-3 line-clamp-3 text-sm leading-6 text-white/60 sm:leading-relaxed">
                    {project.description}
                  </p>
                </div>

                {/* Technologies */}
                <div className="mt-auto flex flex-wrap items-center gap-1.5 pt-6 sm:pt-8">
                  {project.technologies.slice(0, 3).map((technology) => (
                    <span
                      key={technology}
                      className="rounded-md border border-white/[0.07] bg-white/3 px-2 py-1 text-[11px] text-white/65 sm:px-2.5 sm:text-xs"
                    >
                      {technology}
                    </span>
                  ))}

                  {project.technologies.length > 3 && (
                    <span className="px-1 text-[11px] text-white/40 sm:text-xs">
                      +{project.technologies.length - 3}
                    </span>
                  )}
                </div>
              </Link>

              {/* External Project Link */}
              {project.externalUrl && (
                <div className="mt-4 flex justify-end border-t border-white/6 pt-3 sm:mt-5 sm:pt-4">
                  <a
                    href={project.externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${project.externalLabel || "Visit"} for ${project.name} (opens in a new tab)`}
                    className="inline-flex items-center gap-1.5 rounded-sm text-xs font-medium text-white/50 transition-colors hover:text-[#6fbd68] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#6fbd68]"
                  >
                    <ExternalIcon size={14} aria-hidden="true" />
                    <span>{project.externalLabel || "Visit"}</span>
                  </a>
                </div>
              )}
            </article>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredProjects.length === 0 && (
        <div className="rounded-2xl border border-white/8 bg-[#0b1117]/80 px-6 py-12 text-center">
          <p className="text-sm text-white/60">
            No projects found in this category.
          </p>
        </div>
      )}
    </div>
  );
}
