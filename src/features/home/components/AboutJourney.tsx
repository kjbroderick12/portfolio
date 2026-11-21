"use client";

import Link from "next/link";
import { ArrowUpRight, Layers3, Lightbulb, TrendingUp } from "lucide-react";
import ScrollReveal from "@/shared/components/ScrollReveal";

const journey = [
  {
    period: "2018 — Present",
    title: "Optical Industry",
    description:
      "I've spent several years working in the optical industry, helping people find the right solutions for their vision needs. It's taught me to pay attention to details, think through problems, and understand that sometimes the smallest things make the biggest difference.",
    status: "Where it started",
  },
  {
    period: "2024",
    title: "B.S. in Information Technology",
    description:
      "I graduated with a 4.0 GPA and a concentration in Programming and Software Development. My degree gave me a solid foundation in programming and helped me turn my interest in technology into something I wanted to pursue as a career.",
    status: "A new direction",
  },
  {
    period: "2025 — Present",
    title: "Full-Stack Developer — Web Surfing Studios",
    description:
      "I've been volunteering with Web Surfing Studios, where I get to work on real projects and continue building my development skills. Most of my work has involved C# and .NET, ASP.NET Core MVC, Entity Framework, and MySQL. I've also worked on API integrations, backend features, and improvements to existing applications. It's given me the opportunity to take what I've learned and put it into practice while learning from other developers.",
    status: "Where I am now",
  },
];

const principles = [
  {
    icon: Lightbulb,
    title: "Think it through",
    description:
      "I like to understand what a problem actually needs before jumping into a solution. Taking the time to think things through usually leads to better results.",
  },
  {
    icon: Layers3,
    title: "Keep it maintainable",
    description:
      "I value code that's organized, easy to follow, and makes sense to the next person who works on it. Getting something working is important, but so is making it easier to maintain.",
  },
  {
    icon: TrendingUp,
    title: "Keep learning",
    description:
      "There's always something new to learn in development. I enjoy figuring things out, trying new approaches, and getting better with every project.",
  },
];

const currentFocus = ["C# / .NET", "Next.js / React", "APIs & Databases"];

export default function AboutJourney() {
  return (
    <section
      id="about"
      className="relative isolate w-full overflow-x-clip bg-[#080d12] px-5 py-12 text-white sm:px-10 sm:py-16 lg:px-16 lg:py-20"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-36 z-0 h-90 w-90 rounded-full bg-[#6fbd68]/4 blur-[120px] sm:h-125 sm:w-125 sm:blur-[150px]"
      />

      <div className="relative z-10 mx-auto w-full max-w-7xl">
        {/* Sticky Chapter Intro + Timeline Ledger */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-start lg:gap-14">
          <div className="lg:sticky lg:top-28 lg:col-span-5">
            <ScrollReveal variant="up" threshold={0.1}>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#6fbd68]/25 bg-[#6fbd68]/8 px-3.5 py-1 text-xs font-medium text-[#6fbd68]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#6fbd68]" />
                <span>About Me</span>
              </div>

              <h2 className="text-3xl font-semibold leading-[0.98] tracking-[-0.04em] text-white sm:text-5xl lg:text-6xl">
                More than just{" "}
                <span className="block text-[#6fbd68]">writing code.</span>
              </h2>

              <p className="mt-5 text-sm leading-7 text-white/65 sm:text-base sm:leading-8">
                My path into software development wasn&apos;t straight-line.
                Years in the optical industry trained me to catch small
                details, solve practical problems, and listen carefully to what
                people need.
              </p>

              <div className="mt-5 flex flex-wrap items-center gap-2">
                {currentFocus.map((item) => (
                  <span
                    key={item}
                    className="rounded-lg border border-white/8 bg-[#0b1117]/80 px-3 py-1 font-mono text-xs text-[#6fbd68]"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </ScrollReveal>
          </div>

          <div className="divide-y divide-white/8 border-y border-white/8 lg:col-span-7">
            {journey.map((item, index) => (
              <ScrollReveal key={item.title} variant="up" delay={index * 60}>
                <article className="py-8 first:pt-8 last:pb-8 sm:py-10">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="font-mono text-xs uppercase tracking-[0.18em] text-[#6fbd68]">
                      {item.period}
                    </span>
                    <span className="font-mono text-[11px] text-white/40">
                      {item.status}
                    </span>
                  </div>

                  <h3 className="mt-2.5 text-xl font-semibold tracking-tight text-white sm:text-2xl">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-white/60 sm:text-base sm:leading-8">
                    {item.description}
                  </p>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* Principles */}
        <div className="mt-14 grid grid-cols-1 gap-5 sm:mt-16 md:grid-cols-3 md:gap-6">
          {principles.map((principle, index) => {
            const Icon = principle.icon;
            return (
              <ScrollReveal
                key={principle.title}
                variant="up"
                delay={index * 60}
              >
                <div className="group flex h-full flex-col justify-between rounded-2xl border border-white/8 bg-[#0b1117]/80 p-6 transition-all duration-300 hover:border-[#6fbd68]/35 hover:bg-[#0b1117]">
                  <div>
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/3 text-[#6fbd68]">
                      <Icon size={18} strokeWidth={1.7} />
                    </div>
                    <h3 className="mt-5 text-lg font-semibold tracking-tight text-white sm:text-xl">
                      {principle.title}
                    </h3>
                    <p className="mt-2.5 text-sm leading-7 text-white/55">
                      {principle.description}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

        <div className="mt-10 flex justify-end">
          <Link
            href="/about"
            className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.16em] text-[#6fbd68] transition-colors hover:text-[#82cf7a]"
          >
            <span>More about me</span>
            <ArrowUpRight
              size={15}
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}