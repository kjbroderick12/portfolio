import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowUpRight,
  Briefcase,
  Code2,
  Compass,
  Database,
  FileText,
  GraduationCap,
  Headphones,
  Lightbulb,
  Terminal,
  Workflow,
} from "lucide-react";

import { FaGithub, FaLinkedinIn } from "react-icons/fa";

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
    badge: "Foundation",
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
    badge: "Current Focus",
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
    description: "Building application features across the frontend and backend.",
    stack: ["C#", ".NET", "ASP.NET MVC", "React", "Next.js"],
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

const SOCIAL_LINKS = [
  {
    label: "GitHub",
    href: "https://github.com/kjbroderick12",
    icon: FaGithub,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/kaitlynn-broderick",
    icon: FaLinkedinIn,
  },
];

export default function AboutPage() {
  return (
    <main className="relative min-h-screen w-full bg-[#080d12] text-white selection:bg-[#6fbd68]/20 selection:text-[#83ce7b]">
      {/* Ambient background glow */}
      <div
        className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
        aria-hidden="true"
      >
        <div className="absolute -top-40 right-4 h-70 w-70 rounded-full bg-[#6fbd68]/4 blur-[100px] sm:right-1/4 sm:h-125 sm:w-125 sm:blur-[150px]" />
        <div className="absolute bottom-0 left-4 h-62.5 w-62.5 rounded-full bg-[#6fbd68]/3 blur-[90px] sm:left-10 sm:h-100 sm:w-100 sm:blur-[140px]" />
      </div>

      <div className="relative z-10 mx-auto min-w-0 max-w-7xl px-4 pb-20 pt-28 sm:px-10 sm:pb-28 sm:pt-36 lg:px-16">
        <div className="grid min-w-0 grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-14">
          {/* LEFT COLUMN: Sidebar */}
          <aside className="w-full min-w-0 lg:sticky lg:top-28 lg:col-span-4 lg:self-start">
            <div className="rounded-2xl border border-white/8 bg-[#0b1117]/95 p-5 shadow-2xl backdrop-blur-sm sm:p-7">
              <ScrollReveal variant="up">
                {/* Status Indicator */}
                <div className="inline-flex items-center gap-2 rounded-full border border-[#6fbd68]/25 bg-[#6fbd68]/8 px-3 py-1 text-[11px] font-medium text-[#6fbd68]">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#6fbd68] opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-[#6fbd68]" />
                  </span>
                  Building &amp; Collaborating
                </div>

                {/* Core Statement */}
                <h1 className="mt-4 font-(family-name:--font-bricolage) text-2xl font-semibold leading-[1.15] tracking-[-0.04em] sm:mt-5 sm:text-3xl">
                  Making complicated things{" "}
                  <span className="text-[#6fbd68]">feel clear.</span>
                </h1>

                <p className="mt-3 text-sm leading-relaxed text-white/55 sm:mt-4">
                  Software developer focused on backend development with C# and
                  .NET, while building practical applications across the full
                  stack.
                </p>

                {/* Quick Snapshot Metadata */}
                <div className="mt-5 space-y-3 border-y border-white/[0.07] py-4 text-xs sm:mt-6 sm:space-y-3.5 sm:py-5">
                  <div className="flex min-w-0 items-start justify-between gap-3">
                    <span className="flex shrink-0 items-center gap-2 text-white/40">
                      <Briefcase size={14} className="text-[#6fbd68]" />
                      Current Role
                    </span>
                    <span className="min-w-0 wrap-break-word text-right font-medium text-white/80">
                      Full-Stack Dev (Volunteer)
                    </span>
                  </div>

                  <div className="flex min-w-0 items-start justify-between gap-3">
                    <span className="flex shrink-0 items-center gap-2 text-white/40">
                      <GraduationCap size={14} className="text-[#6fbd68]" />
                      Education
                    </span>
                    <span className="min-w-0 wrap-break-word text-right font-medium text-white/80">
                      B.S. IT (4.0 GPA)
                    </span>
                  </div>

                  <div className="flex min-w-0 items-start justify-between gap-3">
                    <span className="flex shrink-0 items-center gap-2 text-white/40">
                      <Terminal size={14} className="text-[#6fbd68]" />
                      Primary Stack
                    </span>
                    <span className="min-w-0 wrap-break-word text-right font-medium text-white/80">
                      C# · .NET · Next.js
                    </span>
                  </div>

                  <div className="flex min-w-0 items-start justify-between gap-3">
                    <span className="flex shrink-0 items-center gap-2 text-white/40">
                      <Headphones size={14} className="text-[#6fbd68]" />
                      Offline
                    </span>
                    <span className="min-w-0 wrap-break-word text-right font-medium text-white/80">
                      Music · Gaming · Outdoors
                    </span>
                  </div>
                </div>

                {/* Resume */}
                <div className="mt-5 sm:mt-6">
                  <a
                    href="/resume.pdf"
                    download="KaitlynnBroderickResume.pdf"
                    className="group inline-flex w-full items-center justify-between rounded-xl bg-[#6fbd68] px-4 py-3 text-xs font-semibold text-[#081009] transition-all hover:bg-[#82cf7a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6fbd68]/70"
                  >
                    <span className="inline-flex items-center gap-2">
                      <FileText size={15} />
                      Download Resume
                    </span>
                    <ArrowUpRight
                      size={16}
                      className="shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </a>
                </div>

                {/* Main Navigation Links */}
                <div className="mt-2.5 flex flex-col gap-2.5">
                  <Link
                    href="/projects"
                    className="group inline-flex w-full items-center justify-between rounded-xl border border-white/10 bg-white/2 px-4 py-3 text-xs font-medium text-white/75 transition-all hover:border-white/25 hover:bg-white/5 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6fbd68]/60"
                  >
                    <span>Explore selected projects</span>
                    <ArrowUpRight
                      size={16}
                      className="shrink-0 text-white/40 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white"
                    />
                  </Link>

                  <Link
                    href="/contact"
                    className="group inline-flex w-full items-center justify-between rounded-xl border border-white/10 bg-white/2 px-4 py-3 text-xs font-medium text-white/75 transition-all hover:border-white/25 hover:bg-white/5 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6fbd68]/60"
                  >
                    <span>Start a conversation</span>
                    <ArrowUpRight
                      size={16}
                      className="shrink-0 text-white/40 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white"
                    />
                  </Link>
                </div>

                {/* Professional Profiles */}
                <div className="mt-4 flex gap-2 border-t border-white/[0.07] pt-4">
                  {SOCIAL_LINKS.map((link) => {
                    const Icon = link.icon;

                    return (
                      <a
                        key={link.label}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Visit my ${link.label} profile`}
                        className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg border border-white/8 bg-white/2 px-3 py-2.5 text-xs font-medium text-white/55 transition hover:border-[#6fbd68]/35 hover:bg-[#6fbd68]/5 hover:text-[#83ce7b] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6fbd68]/60"
                      >
                        <Icon size={15} />
                        {link.label}
                        <ArrowUpRight size={12} className="opacity-50" />
                      </a>
                    );
                  })}
                </div>
              </ScrollReveal>
            </div>
          </aside>

          {/* RIGHT COLUMN: Narrative Stream & Bento Modules */}
          <div className="min-w-0 space-y-10 lg:col-span-8 sm:space-y-14">
            {/* Narrative Intro */}
            <ScrollReveal variant="up">
              <section className="space-y-4">
                <p className="text-base leading-7 text-white/80 sm:text-xl sm:leading-9">
                  I’m a software developer who enjoys solving problems,
                  learning how systems fit together, and building practical
                  applications that people actually want to use.
                </p>
                <p className="text-sm leading-7 text-white/50 sm:text-base">
                  My path into software wasn’t a straight line—and that’s
                  exactly what shapes how I write code today. Years of helping
                  people navigate complex choices taught me to listen first,
                  diagnose the real issue, and keep solutions straightforward.
                </p>
              </section>
            </ScrollReveal>

            {/* Interactive Career Chapters */}
            <ScrollReveal variant="up">
              <section id="my-story">
                <AboutChapters experiences={EXPERIENCE} />
              </section>
            </ScrollReveal>

            {/* Engineering Principles */}
            <ScrollReveal variant="up">
              <section>
                <div className="mb-5 sm:mb-6">
                  <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#6fbd68]">
                    Engineering Philosophy
                  </span>
                  <h2 className="mt-2 font-(family-name:--font-bricolage) text-2xl font-semibold tracking-[-0.04em] sm:text-3xl">
                    It’s not just about getting it to work.
                  </h2>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  {PRINCIPLES.map((principle) => {
                    const Icon = principle.icon;

                    return (
                      <article
                        key={principle.title}
                        className="flex flex-col justify-between rounded-2xl border border-white/8 bg-[#0b1117]/60 p-5 transition-colors hover:border-white/20"
                      >
                        <div>
                          <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/2 text-[#6fbd68]">
                            <Icon size={17} strokeWidth={1.6} />
                          </div>

                          <h3 className="mt-4 font-(family-name:--font-bricolage) text-base font-medium tracking-[-0.02em] text-white sm:mt-5">
                            {principle.title}
                          </h3>

                          <p className="mt-2 text-xs leading-6 text-white/45 sm:mt-2.5">
                            {principle.description}
                          </p>
                        </div>
                      </article>
                    );
                  })}
                </div>
              </section>
            </ScrollReveal>

            {/* Technical Capabilities & Stack */}
            <ScrollReveal variant="up">
              <section className="rounded-2xl border border-white/8 bg-[#0b1117]/70 p-5 sm:p-8">
                <div className="mb-6 sm:mb-7">
                  <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#6fbd68]">
                    Technical Stack
                  </span>
                  <h2 className="mt-2 font-(family-name:--font-bricolage) text-2xl font-semibold tracking-[-0.04em] sm:text-3xl">
                    What I’m building with.
                  </h2>
                  <p className="mt-2 text-sm leading-7 text-white/50">
                    My primary focus is backend development with C# and .NET,
                    while continuing to build across the full stack—from
                    relational schemas to responsive interfaces.
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  {TECHNICAL_AREAS.map((area) => {
                    const Icon = area.icon;

                    return (
                      <div
                        key={area.title}
                        className="rounded-xl border border-white/6 bg-white/1.5 p-4"
                      >
                        <div className="flex items-center gap-2.5 text-white/90">
                          <Icon size={16} className="shrink-0 text-[#6fbd68]" />
                          <h3 className="text-sm font-medium">{area.title}</h3>
                        </div>
                        <p className="mt-2 text-xs leading-relaxed text-white/45">
                          {area.description}
                        </p>
                        <div className="mt-3 flex min-w-0 flex-wrap gap-1.5">
                          {area.stack.map((tech) => (
                            <span
                              key={tech}
                              className="rounded bg-white/4 px-2 py-0.5 font-mono text-[10px] text-white/65"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Full Toolkit */}
                <div className="mt-6 border-t border-white/[0.07] pt-5 sm:mt-7 sm:pt-6">
                  <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.2em] text-white/35">
                    Core Toolkit &amp; Ecosystem
                  </p>
                  <div className="flex min-w-0 flex-wrap gap-1.5 sm:gap-2">
                    {ALL_TECHNOLOGIES.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-lg border border-white/8 bg-white/2 px-2.5 py-1 text-xs text-white/60 transition-colors hover:border-[#6fbd68]/40 hover:text-white sm:px-3 sm:py-1.5"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </section>
            </ScrollReveal>

            {/* Outside the Code */}
            <ScrollReveal variant="up">
              <section className="rounded-2xl border border-white/8 bg-linear-to-br from-[#0b1117] to-[#080d12] p-5 sm:p-8">
                <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
                  <div className="max-w-xl">
                    <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#6fbd68]">
                      Outside the Code
                    </span>
                    <h2 className="mt-2 font-(family-name:--font-bricolage) text-xl font-semibold tracking-[-0.03em] sm:text-2xl">
                      A little more human.
                    </h2>
                    <p className="mt-3 text-sm leading-7 text-white/55">
                      Technology is a big part of what I enjoy, but it’s not the
                      only thing that makes me who I am. Outside of writing
                      code, I spend my time with music, gaming, getting
                      outdoors, and being with the people closest to me.
                      Stepping away from the screen helps me recharge and
                      bring a fresh perspective back to every project.
                    </p>
                  </div>

                  <Link
                    href="/contact"
                    className="group inline-flex w-full shrink-0 items-center justify-center gap-2 rounded-xl border border-[#6fbd68]/30 bg-[#6fbd68]/10 px-5 py-3 text-xs font-semibold text-[#83ce7b] transition-all hover:bg-[#6fbd68] hover:text-[#081009] sm:w-auto sm:self-center"
                  >
                    Say hello
                    <ArrowUpRight
                      size={15}
                      className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </Link>
                </div>
              </section>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </main>
  );
}
