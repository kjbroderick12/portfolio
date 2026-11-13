"use client";

import { Lightbulb, Layers3, TrendingUp } from "lucide-react";
import { Bricolage_Grotesque } from "next/font/google";
import ScrollReveal from "@/shared/components/ScrollReveal";

const sansFont = Bricolage_Grotesque({
  subsets: ["latin"],
  display: "swap",
});

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
      className={`${sansFont.className} relative isolate w-full overflow-hidden bg-[#080d12] px-6 pb-10 pt-10 text-white sm:px-10 sm:pb-12 sm:pt-14 lg:px-16 lg:pt-20`}
    >
      {/* Ambient Lighting */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-48 top-40 z-0 h-125 w-125 rounded-full bg-[#6fbd68]/[0.035] blur-[150px]"
      />

      <div className="relative z-10 mx-auto w-full max-w-7xl">
        {/* About Introduction */}
        <ScrollReveal variant="up" threshold={0.1} duration={800}>
          <div className="mb-14 grid gap-8 border-b border-white/8 pb-10 md:mb-16 md:grid-cols-[1.1fr_0.9fr] md:items-center md:gap-16 md:pb-12">
            <div>
              <div className="mb-5 inline-flex items-center gap-3 text-[10px] font-medium uppercase tracking-[0.24em] text-[#6fbd68] sm:text-[11px]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#6fbd68] shadow-[0_0_10px_rgba(111,189,104,0.4)]" />
                About Me
              </div>

              <h2 className="max-w-2xl text-[clamp(2.5rem,5vw,4.25rem)] font-semibold leading-[0.98] tracking-[-0.055em]">
                More than just
                <span className="block text-[#6fbd68]">
                  writing code.
                </span>
              </h2>
            </div>

            <div className="max-w-xl md:pb-1">
              <p className="text-sm leading-[1.9] text-white/65 sm:text-base">
                My path into software development wasn't exactly
                straightforward. Before getting into development, I spent
                years working in the optical industry. That experience taught
                me a lot about problem-solving, working with people, and
                paying attention to the details.
              </p>
              
              <p className="mt-4 text-sm leading-[1.9] text-white/65 sm:text-base">
                Eventually, I decided to turn my interest in technology into
                a career. Since then, I've been learning, building projects,
                and getting hands-on experience with different technologies.
                I'm excited to keep growing and see where it takes me.
              </p>
            </div>
          </div>
        </ScrollReveal>

        {/* Professional Journey */}
        <div className="mb-16 grid gap-10 lg:mb-18 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <ScrollReveal variant="up" threshold={0.1} duration={800}>
            <div className="lg:sticky lg:top-28 lg:self-start">
              <span className="mb-4 block text-[10px] font-medium uppercase tracking-[0.24em] text-[#6fbd68]">
                The Journey
              </span>

              <h3 className="max-w-md text-3xl font-semibold leading-tight tracking-[-0.045em] sm:text-4xl">
                A little about how I got here.
              </h3>

              <p className="mt-5 max-w-sm text-sm leading-[1.9] text-white/45 sm:text-base">
                My background might be a little different from most
                developers, but each step has helped me get to where I am
                today. I'm bringing those experiences with me as I continue
                building my career in software development.
              </p>

              {/* Current Focus */}
              <div className="mt-8 border-t border-white/8 pt-6">
                <span className="mb-3 block text-[10px] font-semibold uppercase tracking-[0.22em] text-[#6fbd68]">
                  What I'm Working With
                </span>

                <p className="max-w-sm text-sm leading-[1.85] text-white/55">
                  I'm especially interested in backend development, but I
                  enjoy working across the stack and seeing how everything
                  comes together.
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {currentFocus.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-white/8 bg-white/2.5 px-3 py-1.5 text-[10px] font-medium tracking-wide text-white/55"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Timeline */}
          <div className="relative">
            <div
              aria-hidden="true"
              className="absolute bottom-8 left-1.25 top-2 w-px bg-white/10"
            />

            <div
              aria-hidden="true"
              className="absolute left-1.25 top-2 h-1/3 w-px bg-linear-to-b from-[#6fbd68] via-[#6fbd68]/50 to-transparent shadow-[0_0_12px_rgba(111,189,104,0.45)]"
            />

            <div className="flex flex-col gap-8 sm:gap-9">
              {journey.map((item, index) => (
                <ScrollReveal
                  key={item.title}
                  variant="up"
                  threshold={0.1}
                  duration={800}
                >
                  <article className="relative pl-9">
                    <span
                      className={`absolute left-0 top-1.5 h-2.75 w-2.75 rounded-full border ${
                        index === journey.length - 1
                          ? "border-[#6fbd68] bg-[#6fbd68] shadow-[0_0_12px_rgba(111,189,104,0.5)]"
                          : "border-white/30 bg-[#080d12]"
                      }`}
                    />

                    <div className="mb-3 flex flex-wrap items-center gap-x-4 gap-y-2">
                      <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#6fbd68]">
                        {item.period}
                      </span>

                      <span className="text-[10px] text-white/30">
                        {item.status}
                      </span>
                    </div>

                    <h4 className="mb-3 text-xl font-semibold tracking-[-0.035em] text-white sm:text-2xl">
                      {item.title}
                    </h4>

                    <p className="max-w-xl text-sm leading-[1.9] text-white/50 sm:text-base">
                      {item.description}
                    </p>
                  </article>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>

        {/* Engineering Principles */}
        <div>
          <ScrollReveal variant="up" threshold={0.1} duration={800}>
            <div className="mb-8 border-b border-white/8 pb-7 sm:mb-10 sm:flex sm:items-end sm:justify-between sm:gap-8">
              <div>
                <span className="mb-4 block text-[10px] font-medium uppercase tracking-[0.24em] text-[#6fbd68]">
                  How I Work
                </span>

                <h3 className="text-3xl font-semibold tracking-[-0.045em] sm:text-4xl">
                  What matters to me.
                </h3>
              </div>

              <p className="mt-4 max-w-md text-sm leading-[1.9] text-white/45 sm:mt-0 sm:text-base">
                A few things I try to keep in mind whenever I'm working on
                something new.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid gap-4 md:grid-cols-3">
            {principles.map((principle, index) => {
              const Icon = principle.icon;

              return (
                <ScrollReveal
                  key={principle.title}
                  variant="up"
                  threshold={0.1}
                  duration={800}
                  delay={index * 100}
                >
                  <article className="group h-full rounded-2xl border border-white/[0.07] bg-white/1.5 p-5 transition-all duration-300 hover:border-[#6fbd68]/20 hover:bg-white/3 sm:p-6">
                    <div className="mb-6 flex h-11 w-11 items-center justify-center rounded-xl border border-[#6fbd68]/20 bg-[#6fbd68]/[0.07] text-[#6fbd68] transition-colors duration-300 group-hover:bg-[#6fbd68]/12">
                      <Icon size={20} strokeWidth={1.7} />
                    </div>

                    <h4 className="mb-3 text-lg font-semibold tracking-tight text-white">
                      {principle.title}
                    </h4>

                    <p className="text-sm leading-[1.9] text-white/45">
                      {principle.description}
                    </p>
                  </article>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
