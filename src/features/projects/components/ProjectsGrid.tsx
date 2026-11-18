"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Code2, Globe } from "lucide-react";

export interface ProjectItem {
  slug: string;
  name: string;
  category: string;
  type: string;
  description: string;
  technologies: string[];
  externalUrl?: string;
  externalLabel?: string;
  externalType?: "github" | "live" | string;
}

export default function ProjectsGrid({ projects }: { projects: ProjectItem[] }) {
  const [filter, setFilter] = useState<string>("All");

  const categories = [
    "All",
    ...Array.from(new Set(projects.map((p) => p.category))),
  ];

  const filteredProjects = projects.filter((project) => {
    if (filter === "All") return true;
    return project.category === filter;
  });

  return (
    <div>
      {/* Category Filter Pills */}
      {categories.length > 2 && (
        <div className="mb-12 flex flex-wrap items-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`rounded-lg px-3.5 py-1.5 text-xs font-medium transition-all duration-200 ${
                filter === cat
                  ? "bg-[#6fbd68] text-[#081009] shadow-sm shadow-[#6fbd68]/20"
                  : "border border-white/8 bg-white/2 text-white/60 hover:border-white/25 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {/* 2-Column Text-First Bento Card Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8">
        {filteredProjects.map((project) => {
          const ExternalIcon =
            project.externalType === "github" ? Code2 : Globe;

          return (
            <article
              key={project.slug}
              className="group relative flex flex-col justify-between rounded-2xl border border-white/8 bg-[#0b1117]/80 p-6 transition-all duration-300 hover:border-[#6fbd68]/40 hover:bg-[#0b1117] sm:p-8"
            >
              {/* Primary Card Link -> Case Study Slug */}
              <Link
                href={`/projects/${project.slug}`}
                scroll={true}
                aria-label={`View ${project.name} case study`}
                className="absolute inset-0 z-10 rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#6fbd68]"
              />

              <div>
                {/* Top Meta Bar (Number removed, showing category & type cleanly) */}
                <div className="flex items-center justify-between gap-3">
                  <span className="text-xs font-medium uppercase tracking-[0.15em] text-[#6fbd68]">
                    {project.category}
                  </span>

                  <span className="rounded-md border border-white/10 bg-white/3 px-2.5 py-1 text-[11px] font-medium text-white/50">
                    {project.type}
                  </span>
                </div>

                {/* Title & Description */}
                <div className="mt-5">
                  <div className="flex items-center justify-between gap-4">
                    <h2 className="text-2xl font-semibold tracking-tight text-white transition-colors group-hover:text-[#6fbd68] sm:text-3xl">
                      {project.name}
                    </h2>
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/2 text-white/40 transition-all duration-300 group-hover:border-[#6fbd68]/40 group-hover:bg-[#6fbd68]/10 group-hover:text-[#6fbd68]">
                      <ArrowUpRight size={17} />
                    </div>
                  </div>

                  <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-white/60">
                    {project.description}
                  </p>
                </div>
              </div>

              {/* Bottom Footer: Tech Stack + External Link */}
              <div className="mt-8 border-t border-white/6 pt-5">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex flex-wrap items-center gap-1.5">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="rounded-md border border-white/[0.07] bg-white/3 px-2.5 py-1 text-xs text-white/65"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="px-1 text-xs text-white/40">
                        +{project.technologies.length - 3}
                      </span>
                    )}
                  </div>

                  {project.externalUrl && (
                    <a
                      href={project.externalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative z-20 inline-flex items-center gap-1.5 text-xs font-medium text-white/50 transition-colors hover:text-[#6fbd68]"
                    >
                      <ExternalIcon size={14} />
                      <span>{project.externalLabel || "Visit"}</span>
                    </a>
                  )}
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}