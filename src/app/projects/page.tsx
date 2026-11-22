import { projects } from "@/features/projects/data/projects";
import ScrollReveal from "@/shared/components/ScrollReveal";
import ProjectsGrid from "@/features/projects/components/ProjectsGrid";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Explore software development projects by Kaitlynn Broderick, featuring real-world applications, technical challenges, and solutions built across frontend and backend development.",
  alternates: {
    canonical: "/projects",
  },
};

export default function ProjectsPage() {
  return (
    <main className="min-h-screen w-full overflow-x-hidden bg-[#080d12] text-white selection:bg-[#6fbd68]/20 selection:text-[#83ce7b]">
      {/* Mobile-safe ambient glow */}
      <div
        className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
        aria-hidden="true"
      >
        <div className="absolute -top-40 right-0 h-75 w-75 rounded-full bg-[#6fbd68]/4 blur-[110px] sm:right-1/4 sm:h-112.5 sm:w-112.5 sm:blur-[140px]" />
      </div>

      <section className="relative z-10 mx-auto max-w-7xl px-4 pb-20 pt-28 sm:px-10 sm:pt-36 lg:px-16 lg:pb-28">
        <ScrollReveal variant="up">
          <div className="mb-10 max-w-2xl sm:mb-12">

            <h1 className="text-3xl font-semibold tracking-tight sm:text-5xl">
              Projects
            </h1>

            <p className="mt-3 max-w-xl text-sm leading-7 text-white/60 sm:mt-4 sm:text-base">
              A collection of applications I&apos;ve built, problems I&apos;ve
              explored, and ideas I&apos;ve brought to life. Select any project
              for the full technical breakdown.
            </p>
          </div>
        </ScrollReveal>

        <ProjectsGrid projects={projects} />
      </section>
    </main>
  );
}