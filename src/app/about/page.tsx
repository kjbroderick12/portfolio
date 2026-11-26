import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowDown,
  ArrowUpRight,
  Code2,
  Compass,
  Database,
  FileText,
  Headphones,
  Lightbulb,
  Workflow,
} from "lucide-react";

import ScrollReveal from "@/shared/components/ScrollReveal";
import AboutChapters from "@/features/about/components/AboutChapters";

export const metadata: Metadata = {
  title: "About Me",
  description:
    "Learn about Kaitlynn Broderick, a software developer focused on C#, .NET, backend development, and building practical, maintainable applications.",
  alternates: {
    canonical: "/about",
  },
};

const EXPERIENCE = [
  {
    period: "2018 — PRESENT",
    role: "Optical Industry",
    badge: "The foundation",
    title: "Learning to understand the problem first.",
    description: [
      "Working in the optical industry has given me years of experience helping people find solutions that fit their needs. It taught me the importance of attention to detail, communication, patience, and taking the time to understand a problem before trying to solve it.",
      "Those are skills I continue to carry directly into software development and system design.",
    ],
    highlights: ["Problem-solving", "Communication", "Attention to detail"],
  },
  {
    period: "2024",
    role: "B.S. Information Technology",
    badge: "Education",
    title: "Building a foundation in software development.",
    description: [
      "I graduated with a bachelor's degree in Information Technology, concentrating in Programming and Software Development.",
      "My education gave me a strong foundation in programming logic and helped turn my interest in technology into a clear career direction.",
    ],
    highlights: ["GPA 4.0", "Programming & Software Development"],
  },
  {
    period: "2025 — PRESENT",
    role: "Full-Stack Developer · Web Surfing Studios",
    badge: "Current focus",
    title: "Learning by building real software.",
    description: [
      "I began volunteering with Web Surfing Studios, contributing to real projects and collaborating with other developers.",
      "I've gained hands-on experience building backend features, working with databases and APIs, and improving existing applications.",
    ],
    highlights: ["C#", ".NET", "ASP.NET Core MVC", "Entity Framework"],
  },
];

const PRINCIPLES = [
  {
    icon: Lightbulb,
    title: "Understand before building",
    description:
      "I like to understand why something needs to work a certain way before jumping into a solution. Taking that time upfront makes a difference in the end result.",
  },
  {
    icon: Code2,
    title: "Make it easy to work with",
    description:
      "Readable, organized code matters. I want what I build to be understandable, maintainable, and something another developer can confidently work with.",
  },
  {
    icon: Compass,
    title: "Stay curious",
    description:
      "There's always something new to learn. I enjoy exploring different approaches, improving my skills, and figuring out how to make something work better.",
  },
];

const TECHNICAL_AREAS = [
  {
    icon: Code2,
    title: "Development",
    description:
      "Building application features across the frontend and backend.",
    stack: ["C#", ".NET", "ASP.NET Core MVC", "React", "Next.js"],
  },
  {
    icon: Database,
    title: "Data & APIs",
    description:
      "Connecting systems, working with data, and building reliable application functionality.",
    stack: ["Entity Framework", "MySQL", "SQL", "REST APIs"],
  },
  {
    icon: Workflow,
    title: "Tools & Workflow",
    description:
      "Collaborating on projects, managing changes, and improving the development process.",
    stack: ["Git", "Azure DevOps", "CI/CD", "TypeScript"],
  },
];

const ALL_TECHNOLOGIES = [
  "C#",
  ".NET",
  "ASP.NET Core MVC",
  "Entity Framework",
  "SQL",
  "MySQL",
  "JavaScript",
  "TypeScript",
  "React",
  "Next.js",
  "REST APIs",
  "Git",
  "Azure DevOps",
];

export default function AboutPage() {
  return (
    <main className="relative min-h-screen w-full overflow-x-clip bg-[#080d12] text-white selection:bg-[#6fbd68]/20 selection:text-[#83ce7b]">
      {/* Ambient background */}
      <div
        className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
        aria-hidden="true"
      >
        <div className="absolute -top-40 right-0 h-72 w-72 rounded-full bg-[#6fbd68]/5 blur-[110px] sm:right-1/4 sm:h-125 sm:w-125 sm:blur-[150px]" />
        <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-[#6fbd68]/3 blur-[100px] sm:left-10 sm:h-100 sm:w-100 sm:blur-[140px]" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-5xl px-5 pb-12 pt-28 sm:px-8 sm:pb-16 sm:pt-32 lg:px-10 lg:pb-20 lg:pt-36">
        {/* Introduction */}
        <ScrollReveal variant="up">
          <section className="border-b border-white/10 pb-10 sm:pb-12 lg:pb-14">
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-xs text-white/35">
                Software Developer · Utah
              </span>
            </div>

            <h1 className="mt-6 max-w-4xl font-(family-name:--font-bricolage) text-[2.65rem] leading-[1.05] font-semibold tracking-[-0.055em] sm:mt-8 sm:text-6xl lg:text-7xl">
              Making complicated things{" "}
              <span className="text-[#6fbd68]">feel clear.</span>
            </h1>

            <div className="mt-6 grid gap-5 sm:mt-8 sm:grid-cols-[1.2fr_0.8fr] sm:gap-8 lg:gap-10">
              <p className="text-base leading-7 text-white/75 sm:text-lg sm:leading-8">
                I’m a software developer who enjoys solving problems,
                learning how systems fit together, and building practical
                applications that people actually want to use.
              </p>

              <div className="space-y-3">
                <p className="text-sm leading-7 text-white/50">
                  My path into software wasn’t a straight line—and that’s
                  exactly what shapes how I write code today. Years of helping
                  people navigate complex choices taught me to listen first,
                  diagnose the real issue, and keep solutions straightforward.
                </p>

                <div className="flex flex-wrap gap-3 pt-1">
                  <a
                    href="/resume.pdf"
                    download="KaitlynnBroderickResume.pdf"
                    className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-[#6fbd68] px-4 py-2.5 text-xs font-semibold text-[#081009] transition-colors hover:bg-[#82cf7a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6fbd68]/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#080d12]"
                  >
                    <FileText size={15} />
                    Download resume
                    <ArrowUpRight size={14} />
                  </a>

                  <Link
                    href="/projects"
                    className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-white/10 px-4 py-2.5 text-xs font-medium text-white/65 transition-colors hover:border-white/25 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6fbd68]/60"
                  >
                    Explore projects
                    <ArrowUpRight size={14} />
                  </Link>
                </div>
              </div>
            </div>

            <a
              href="#my-story"
              className="mt-8 inline-flex items-center gap-2 text-xs text-white/35 transition-colors hover:text-[#83ce7b] sm:mt-10"
            >
              A little more about my journey
              <ArrowDown size={14} />
            </a>
          </section>
        </ScrollReveal>

        {/* Career journey */}
        <ScrollReveal variant="up">
          <section id="my-story" className="scroll-mt-28 py-10 sm:py-12 lg:py-14">
            <div className="mb-7 max-w-2xl sm:mb-9">
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#6fbd68]">
                The journey so far
              </span>

              <h2 className="mt-3 font-(family-name:--font-bricolage) text-3xl font-semibold tracking-[-0.045em] sm:text-5xl">
                A different path into tech.
              </h2>

              <p className="mt-3 text-sm leading-7 text-white/50 sm:mt-4 sm:text-base sm:leading-8">
                Each step has shaped how I approach problems, work with others,
                and build software today.
              </p>
            </div>

            <AboutChapters experiences={EXPERIENCE} />
          </section>
        </ScrollReveal>

        {/* Engineering philosophy */}
        <ScrollReveal variant="up">
          <section className="py-10 sm:py-12 lg:py-14">
            <div className="mb-7 max-w-2xl sm:mb-9">
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#6fbd68]">
                Engineering philosophy
              </span>

              <h2 className="mt-3 font-(family-name:--font-bricolage) text-3xl font-semibold tracking-[-0.045em] sm:text-5xl">
                It’s not just about getting it to work.
              </h2>
            </div>

            <div className="divide-y divide-white/10">
              {PRINCIPLES.map((principle) => {
                const Icon = principle.icon;

                return (
                  <article
                    key={principle.title}
                    className="grid gap-3 py-5 sm:grid-cols-[48px_0.8fr_1.2fr] sm:items-start sm:gap-5 sm:py-6 lg:gap-6"
                  >
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-[#6fbd68]">
                      <Icon size={17} strokeWidth={1.6} />
                    </div>

                    <h3 className="font-(family-name:--font-bricolage) text-lg font-medium tracking-tight text-white sm:pt-1">
                      {principle.title}
                    </h3>

                    <p className="max-w-xl text-sm leading-7 text-white/50 sm:pt-1">
                      {principle.description}
                    </p>
                  </article>
                );
              })}
            </div>
          </section>
        </ScrollReveal>

        {/* Technical experience */}
        <ScrollReveal variant="up">
          <section className="py-10 sm:py-12 lg:py-14">
            <div className="mb-7 max-w-2xl sm:mb-9">
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#6fbd68]">
                Technical experience
              </span>

              <h2 className="mt-3 font-(family-name:--font-bricolage) text-3xl font-semibold tracking-[-0.045em] sm:text-5xl">
                What I’m building with.
              </h2>

              <p className="mt-3 text-sm leading-7 text-white/50 sm:mt-4 sm:text-base sm:leading-8">
                My primary focus is backend development with C# and .NET,
                while continuing to build across the full stack—from
                relational schemas to responsive interfaces.
              </p>
            </div>

            <div className="grid gap-7 sm:grid-cols-2 sm:gap-x-10 sm:gap-y-8 lg:grid-cols-3">
              {TECHNICAL_AREAS.map((area) => {
                const Icon = area.icon;

                return (
                  <div key={area.title}>
                    <div className="flex items-center gap-2.5">
                      <Icon size={17} className="text-[#6fbd68]" />
                      <h3 className="text-sm font-semibold text-white/85">
                        {area.title}
                      </h3>
                    </div>

                    <p className="mt-2.5 text-xs leading-6 text-white/45">
                      {area.description}
                    </p>

                    <div className="mt-3 flex flex-wrap gap-2">
                      {area.stack.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-md border border-white/8 bg-white/2.5 px-2.5 py-1.5 font-mono text-[10px] text-white/65"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-8 border-t border-white/10 pt-6 sm:mt-10 sm:pt-7">
              <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.2em] text-white/35">
                Core toolkit &amp; ecosystem
              </p>

              <div className="flex flex-wrap gap-2">
                {ALL_TECHNOLOGIES.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-lg border border-white/8 px-3 py-2 text-xs text-white/55 transition-colors hover:border-[#6fbd68]/35 hover:text-white/85"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </section>
        </ScrollReveal>

        {/* Outside the code */}
        <ScrollReveal variant="up">
          <section className="py-10 sm:py-12 lg:py-14">
            <div className="grid gap-5 sm:grid-cols-[1fr_auto] sm:items-end sm:gap-8 lg:gap-10">
              <div className="max-w-2xl">
                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#6fbd68]">
                  Outside the code
                </span>

                <h2 className="mt-3 font-(family-name:--font-bricolage) text-3xl font-semibold tracking-[-0.045em] sm:text-5xl">
                  A little more human.
                </h2>

                <p className="mt-4 text-sm leading-7 text-white/55 sm:mt-5 sm:text-base sm:leading-8">
                  Technology is a big part of what I enjoy, but it’s not the
                  only thing that makes me who I am. Outside of writing code,
                  I spend my time with music, gaming, getting outdoors, and
                  being with the people closest to me. Stepping away from the
                  screen helps me recharge and bring a fresh perspective back
                  to every project.
                </p>
              </div>

              <div className="flex flex-wrap gap-2 text-xs text-white/45 sm:justify-end">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-2">
                  <Headphones size={14} className="text-[#6fbd68]" />
                  Music
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-2">
                  <Code2 size={14} className="text-[#6fbd68]" />
                  Gaming
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-2">
                  <Compass size={14} className="text-[#6fbd68]" />
                  Outdoors
                </span>
              </div>
            </div>

            <div className="mt-7 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-5 sm:mt-8 sm:pt-6">
              <p className="text-sm text-white/45">
                Interested in working together?
              </p>

              <Link
                href="/contact"
                className="group inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-[#83ce7b] transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6fbd68]/60"
              >
                Let’s talk
                <ArrowUpRight
                  size={16}
                  className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </Link>
            </div>
          </section>
        </ScrollReveal>
      </div>
    </main>
  );
}
