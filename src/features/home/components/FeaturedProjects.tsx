
"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, GitBranch } from "lucide-react";
import { Bricolage_Grotesque } from "next/font/google";
import ScrollReveal from "@/shared/components/ScrollReveal";

const sansFont = Bricolage_Grotesque({
  subsets: ["latin"],
  display: "swap",
});

interface Project {
  number: string;
  title: string;
  category: string;
  description: string;
  highlights: string[];
  tags: string[];
  image: string;
  imageAlt: string;
  liveUrl?: string;
  githubUrl?: string;
  actionLabel: string;
}

const projects: Project[] = [
  {
    number: "01",
    title: "Teffie's Smoky BBQ",
    category: "Full-Stack Web Application",
    description:
      "A custom website built for a BBQ catering business to showcase its offerings, connect with customers, and manage online inquiries. The platform combines a responsive public-facing experience with an administrative dashboard for managing website content.",
    highlights: [
      "Dynamic menu, events, and gallery management",
      "Administrative dashboard with content CRUD operations",
      "Customer support and catering inquiry forms",
    ],
    tags: [
      "Next.js",
      "TypeScript",
      "React",
      "MongoDB",
      "Tailwind CSS",
    ],
    image: "/images/projects/teffiessmokybbq.png",
    imageAlt: "Teffie's Smoky BBQ website preview",
    liveUrl: "https://teffiesmokybbq.com/",
    actionLabel: "Visit Live Website",
  },
  {
    number: "02",
    title: "Azure DevOps Point Sync",
    category: "Internal Application / Proof of Concept",
    description:
      "A .NET application designed to simplify monthly development-point reporting by retrieving completed work items directly from Azure DevOps and synchronizing them with a centralized reporting dashboard.",
    highlights: [
      "Azure DevOps API integration and automated work-item synchronization",
      "Database-backed tracking with Entity Framework Core",
      "Manual entry and fallback workflows for reporting flexibility",
    ],
    tags: [
      "C#",
      ".NET 8",
      "ASP.NET Core MVC",
      "Entity Framework Core",
      "MySQL",
      "Azure DevOps API",
    ],
    image: "/images/projects/pointsync.png",
    imageAlt: "Azure DevOps Point Sync dashboard preview",
    githubUrl: "https://github.com/kjbroderick12/PointSyncPOC",
    actionLabel: "View on GitHub",
  },
];

interface FeaturedProjectsProps {
  projects?: Project[];
}

export default function FeaturedProjects({
  projects: projectList = projects,
}: FeaturedProjectsProps) {
  return (
    <section
      id="projects"
      className={`${sansFont.className} relative isolate w-full overflow-hidden bg-[#030405] px-6 pb-10 pt-10 text-white sm:px-10 sm:pb-12 sm:pt-14 lg:px-16`}
    >
      {/* Ambient Lighting */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-48 top-40 z-0 h-125 w-125 rounded-full bg-[#6fbd68]/[0.035] blur-[140px]"
      />

      {/* Transition into About */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-64 bg-linear-to-b from-transparent via-[#080d12]/70 to-[#080d12]"
      />

      <div className="relative z-10 mx-auto w-full max-w-7xl">
        {/* Section Header */}
        <div className="mb-10 flex flex-col gap-7 pb-6 md:mb-12 md:flex-row md:items-end md:justify-between md:gap-12">
          <div>
            <div className="mb-5 inline-flex items-center gap-3 text-[10px] font-medium uppercase tracking-[0.24em] text-[#6fbd68] sm:text-[11px]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#6fbd68] shadow-[0_0_10px_rgba(111,189,104,0.4)]" />
              Selected Work
            </div>

            <h2 className="text-[clamp(2.5rem,5vw,4.25rem)] font-semibold leading-[0.95] tracking-[-0.055em]">
              Featured Projects
            </h2>
          </div>

          <p className="max-w-102.5 text-sm leading-[1.9] text-white/50 sm:text-base md:pb-1">
            A selection of applications built with an emphasis on thoughtful
            architecture, practical solutions, and quality execution.
          </p>
        </div>

        {/* Projects */}
        <div className="flex flex-col gap-12 sm:gap-10 lg:gap-12">
          {projectList.map((project) => (
            <ScrollReveal
              key={project.title}
              variant="up"
              threshold={0.1}
              duration={850}
            >
              <article className="group grid gap-8 rounded-2xl border border-white/6 bg-white/1.5 p-5 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:border-[#6fbd68]/20 hover:bg-white/2.5 sm:p-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start lg:gap-10 lg:p-9">
                {/* Project Information */}
                <div className="flex min-w-0 flex-col">
                  <div className="mb-5 flex items-center gap-3">
                    <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#6fbd68]">
                      {project.category}
                    </span>
                  </div>

                  <h3 className="mb-4 text-2xl font-semibold tracking-[-0.045em] text-white transition-colors duration-300 group-hover:text-[#6fbd68] sm:text-3xl">
                    {project.title}
                  </h3>

                  <p className="mb-6 max-w-145 text-sm leading-[1.9] text-white/55 sm:text-base">
                    {project.description}
                  </p>

                  {/* Highlights */}
                  <ul className="mb-7 flex flex-col gap-3">
                    {project.highlights.map((highlight) => (
                      <li
                        key={highlight}
                        className="flex items-start gap-3 text-sm leading-[1.7] text-white/65"
                      >
                        <span className="mt-2.25 h-1 w-1 shrink-0 rounded-full bg-[#6fbd68]" />
                        {highlight}
                      </li>
                    ))}
                  </ul>

                  {/* Technology Tags */}
                  <div className="mb-8 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-white/[0.07] bg-black/20 px-3 py-1.5 text-[11px] font-medium text-white/50 transition-colors duration-300 group-hover:border-white/12 group-hover:text-white/65"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap items-center gap-3">
                    {project.githubUrl && (
                      <Link
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/github inline-flex h-12 items-center justify-center gap-2.5 rounded-full border border-[#6fbd68]/30 bg-[#6fbd68]/[0.07] px-6 text-sm font-semibold text-[#6fbd68] transition-all duration-300 hover:border-[#6fbd68]/60 hover:bg-[#6fbd68]/[0.14] hover:shadow-[0_0_20px_rgba(111,189,104,0.08)] active:scale-[0.97]"
                      >
                        <GitBranch
                          size={17}
                          strokeWidth={1.8}
                          className="transition-transform duration-300 group-hover/github:scale-110"
                        />
                        View on GitHub
                        <ArrowUpRight
                          size={15}
                          strokeWidth={2}
                          className="transition-transform duration-300 group-hover/github:translate-x-0.5 group-hover/github:-translate-y-0.5"
                        />
                      </Link>
                    )}

                    {project.liveUrl && (
                      <Link
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/btn inline-flex h-12 items-center justify-center gap-2.5 rounded-full border border-[#6fbd68]/30 bg-[#6fbd68] px-6 text-sm font-semibold text-[#030405] transition-all duration-300 hover:scale-[1.02] hover:bg-[#83ce7c] active:scale-[0.97]"
                      >
                        {project.actionLabel}
                        <ArrowUpRight
                          size={15}
                          strokeWidth={2.5}
                          className="transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
                        />
                      </Link>
                    )}
                  </div>
                </div>

                {/* Browser Preview */}
                <div className="order-last min-w-0 w-full overflow-hidden rounded-xl border border-white/8 bg-[#080d12] lg:order-0">
                  {/* Browser Header */}
                  <div className="flex h-10 items-center gap-2 border-b border-white/[0.07] bg-[#0b1016] px-4">
                    <span className="h-2 w-2 rounded-full bg-white/20" />
                    <span className="h-2 w-2 rounded-full bg-white/20" />
                    <span className="h-2 w-2 rounded-full bg-white/20" />

                    <div className="ml-3 flex h-5 min-w-0 flex-1 items-center rounded-md border border-white/6 bg-black/20 px-3">
                      <span className="truncate text-[9px] tracking-wide text-white/25">
                        {project.liveUrl
                          ? project.liveUrl.replace("https://", "")
                          : "github.com"}
                      </span>
                    </div>
                  </div>

                  {/* Screenshot */}
                  <div className="relative w-full overflow-hidden bg-[#080d12]">
                    <Image
                      src={project.image}
                      alt={project.imageAlt}
                      width={1600}
                      height={1000}
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="block h-auto w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.015]"
                    />
                  </div>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>

        {/* Explore All Projects */}
        <div className="mt-14 flex justify-center">
          <Link
            href="/projects"
            className="group inline-flex h-12 items-center justify-center gap-3 rounded-full border border-white/10 bg-white/3 px-7 text-sm font-medium text-white/75 transition-all duration-300 hover:border-[#6fbd68]/40 hover:bg-[#6fbd68]/[0.07] hover:text-[#6fbd68] active:scale-[0.97]"
          >
            Explore All Projects
            <ArrowUpRight
              size={16}
              strokeWidth={1.8}
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
