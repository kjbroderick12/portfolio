import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowUpRight,
  Code2,
  Database,
  GitBranch,
  Globe,
  Lightbulb,
  Monitor,
  Search,
  Server,
  Workflow,
  Wrench,
} from "lucide-react";

import ScrollReveal from "@/shared/components/ScrollReveal";
import ServicesFaq from "@/features/services/components/ServicesFaq";

export const metadata: Metadata = {
  title: "Software Development Services",
  description:
    "Custom software development, website development, workflow automation, API integrations, and improvements to existing applications.",
  alternates: {
    canonical: "/services",
  },
};

const ENGAGEMENT_TYPES = [
  {
    title: "Project-Based Development",
    description:
      "A defined project with a clear goal, scope, and deliverable.",
  },
  {
    title: "Features & Improvements",
    description:
      "Enhancing an existing website or application with new functionality.",
  },
  {
    title: "Collaborative Development",
    description:
      "Working alongside your team to contribute to an existing project.",
  },
];

const SERVICES = [
  {
    title: "Custom Software & Applications",
    description:
      "Purpose-built applications designed around the way your business operates. From the initial idea to the underlying functionality, the focus is on creating something practical, maintainable, and useful.",
    includes: [
      "Custom web applications",
      "Frontend and backend development",
      "Database design and integration",
      "API development and integrations",
    ],
    icon: Code2,
  },
  {
    title: "Website Development",
    description:
      "Websites that give your business a professional presence while making it easy for visitors to find information, understand what you offer, and take action.",
    includes: [
      "Business and portfolio websites",
      "Responsive layouts and interfaces",
      "User experience improvements",
      "Accessibility and performance considerations",
    ],
    icon: Globe,
  },
  {
    title: "Automation & Integrations",
    description:
      "Reduce repetitive work by connecting systems and improving the way information moves between them. I can help identify opportunities to simplify workflows and build practical solutions.",
    includes: [
      "Workflow automation",
      "Third-party API integrations",
      "System-to-system communication",
      "Data synchronization",
    ],
    icon: Workflow,
  },
  {
    title: "Updates & Improvements",
    description:
      "Software doesn't have to be rebuilt to become better. I can work with existing applications to resolve problems, improve functionality, and make things easier to maintain.",
    includes: [
      "Bug fixes and troubleshooting",
      "New features and functionality",
      "Code refactoring and cleanup",
      "Interface and usability improvements",
    ],
    icon: Wrench,
  },
];

const PROCESS_STEPS = [
  {
    number: "01",
    title: "Understand",
    description:
      "Start with the problem, your goals, and what you want the solution to accomplish.",
    icon: Search,
  },
  {
    number: "02",
    title: "Plan",
    description:
      "Determine the right approach, establish priorities, and define the scope.",
    icon: Lightbulb,
  },
  {
    number: "03",
    title: "Build",
    description:
      "Develop the solution with an emphasis on functionality, maintainability, and usability.",
    icon: Code2,
  },
  {
    number: "04",
    title: "Refine",
    description:
      "Test, address feedback, and make improvements before wrapping things up.",
    icon: GitBranch,
  },
];

const TECHNOLOGY_GROUPS = [
  {
    title: "Frontend",
    icon: Monitor,
    technologies: [
      "React",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "Tailwind CSS",
    ],
  },
  {
    title: "Backend",
    icon: Server,
    technologies: ["C#", ".NET", "ASP.NET MVC", "REST APIs"],
  },
  {
    title: "Data & Storage",
    icon: Database,
    technologies: ["MySQL", "MongoDB", "SQL", "Entity Framework"],
  },
  {
    title: "Development Tools",
    icon: GitBranch,
    technologies: ["Git", "GitHub", "Azure DevOps", "CI/CD"],
  },
];

export default function ServicesPage() {
  return (
    <main className="relative min-h-screen bg-[#080d12] text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(111,189,104,0.07),transparent_42%)]" />

      <div className="relative mx-auto grid w-full max-w-7xl items-start gap-14 px-5 pb-24 pt-28 sm:px-8 lg:grid-cols-[300px_minmax(0,1fr)] lg:gap-20 lg:px-12 lg:pb-32 lg:pt-36">
        {/* Sticky sidebar */}
        <aside className="self-start lg:sticky lg:top-28">
          <div className="rounded-2xl border border-white/10 bg-[#0d141b]/90 p-6 shadow-[0_12px_40px_rgba(0,0,0,0.18)] sm:p-7">
            <div className="flex flex-col">
              <div className="mb-6 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#6fbd68]" />
                <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#6fbd68]">
                  Services
                </span>
              </div>

              <h1 className="max-w-sm font-(family-name:--font-bricolage) text-3xl font-semibold leading-[1.08] tracking-tight sm:text-4xl">
                Thoughtful development.{" "}
                <span className="text-[#6fbd68]">Practical solutions.</span>
              </h1>

              <p className="mt-4 text-[13px] leading-6 text-white/55">
                Whether you're starting with an idea or improving something
                that already exists, I can help turn technical challenges into
                solutions that make sense.
              </p>

              <div className="mt-7 border-t border-white/10 pt-5">
                <p className="mb-4 text-[10px] font-medium uppercase tracking-[0.18em] text-white/35">
                  Ways to work together
                </p>

                <div className="space-y-3">
                  {ENGAGEMENT_TYPES.map((item) => (
                    <div key={item.title}>
                      <h2 className="text-[13px] font-medium text-white/85">
                        {item.title}
                      </h2>
                      <p className="mt-0.5 text-[11px] leading-5 text-white/45">
                        {item.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 flex flex-col gap-2 border-t border-white/10 pt-5">
                <Link
                  href="/contact"
                  className="group inline-flex min-h-11 items-center justify-between gap-4 rounded-lg bg-[#6fbd68] px-4 text-[13px] font-semibold text-[#080d12] transition-colors hover:bg-[#83ce7c]"
                >
                  Discuss a project
                  <ArrowUpRight
                    size={16}
                    className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </Link>

                <Link
                  href="/projects"
                  className="group inline-flex min-h-10 items-center justify-between gap-4 px-1 text-[13px] text-white/55 transition-colors hover:text-white"
                >
                  Explore my work
                  <ArrowUpRight
                    size={15}
                    className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </Link>
              </div>
            </div>
          </div>
        </aside>

        {/* Main content */}
        <div className="min-w-0">
          {/* Introduction */}
          <ScrollReveal variant="up">
            <section className="border-b border-white/10 pb-12 sm:pb-16">
              <p className="mb-4 text-xs font-medium uppercase tracking-[0.18em] text-[#6fbd68]">
                What I can help with
              </p>

              <h2 className="max-w-2xl font-(family-name:--font-bricolage) text-2xl font-semibold leading-tight tracking-tight sm:text-3xl">
                Development that starts with understanding the problem.
              </h2>

              <p className="mt-5 max-w-2xl text-sm leading-7 text-white/55 sm:text-[15px]">
                Every project has different needs. My approach is to understand
                what you're trying to accomplish first, then find a solution
                that fits the problem rather than forcing the problem into a
                predefined solution.
              </p>
            </section>
          </ScrollReveal>

          {/* Services */}
          <section
            id="services"
            className="scroll-mt-24 border-b border-white/10 py-12 sm:py-16"
          >
            <ScrollReveal variant="up">
              <div className="mb-9">
                <p className="mb-3 text-xs font-medium uppercase tracking-[0.18em] text-[#6fbd68]">
                  Areas of focus
                </p>
                <h2 className="font-(family-name:--font-bricolage) text-2xl font-semibold tracking-tight sm:text-3xl">
                  How I can help
                </h2>
              </div>
            </ScrollReveal>

            <div className="divide-y divide-white/10">
              {SERVICES.map((service) => {
                const Icon = service.icon;

                return (
                  <article
                    key={service.title}
                    className="py-8 first:pt-0 last:pb-0 sm:py-10"
                  >
                    <ScrollReveal variant="up">
                      <div className="flex items-start gap-4 sm:gap-6">
                        <div className="mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/2.5 text-[#6fbd68]">
                          <Icon size={20} strokeWidth={1.7} />
                        </div>

                        <div className="min-w-0 flex-1">
                          <h3 className="font-(family-name:--font-bricolage) text-lg font-semibold tracking-tight sm:text-xl">
                            {service.title}
                          </h3>

                          <p className="mt-3 max-w-2xl text-sm leading-7 text-white/55">
                            {service.description}
                          </p>

                          <ul className="mt-5 grid gap-x-6 gap-y-3 sm:grid-cols-2">
                            {service.includes.map((item) => (
                              <li
                                key={item}
                                className="flex items-start gap-2.5 text-xs leading-6 text-white/65"
                              >
                                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[#6fbd68]" />
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </ScrollReveal>
                  </article>
                );
              })}
            </div>
          </section>

          {/* Process */}
          <section className="border-b border-white/10 py-12 sm:py-16">
            <ScrollReveal variant="up">
              <div className="mb-9">
                <p className="mb-3 text-xs font-medium uppercase tracking-[0.18em] text-[#6fbd68]">
                  My approach
                </p>
                <h2 className="font-(family-name:--font-bricolage) text-2xl font-semibold tracking-tight sm:text-3xl">
                  From idea to implementation.
                </h2>
                <p className="mt-4 max-w-xl text-sm leading-7 text-white/50">
                  A straightforward process keeps the work focused while
                  leaving room to adapt as a project takes shape.
                </p>
              </div>
            </ScrollReveal>

            <div className="relative grid gap-8 sm:grid-cols-2">
              {PROCESS_STEPS.map((step) => {
                const Icon = step.icon;

                return (
                  <ScrollReveal key={step.number} variant="up">
                    <div className="relative">
                      <div className="mb-4 flex items-center gap-3">
                        <span className="text-xs font-medium text-[#6fbd68]">
                          {step.number}
                        </span>
                        <div className="h-px flex-1 bg-white/10" />
                        <Icon
                          size={17}
                          strokeWidth={1.6}
                          className="text-white/40"
                        />
                      </div>

                      <h3 className="font-(family-name:--font-bricolage) text-lg font-semibold">
                        {step.title}
                      </h3>
                      <p className="mt-2 text-sm leading-7 text-white/50">
                        {step.description}
                      </p>
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>
          </section>

          {/* Technologies */}
          <section className="border-b border-white/10 py-12 sm:py-16">
            <ScrollReveal variant="up">
              <div className="mb-9">
                <p className="mb-3 text-xs font-medium uppercase tracking-[0.18em] text-[#6fbd68]">
                  Technical capabilities
                </p>
                <h2 className="font-(family-name:--font-bricolage) text-2xl font-semibold tracking-tight sm:text-3xl">
                  The tools behind the work.
                </h2>
                <p className="mt-4 max-w-xl text-sm leading-7 text-white/50">
                  My experience spans frontend and backend development,
                  databases, and the tools used to build and maintain software.
                </p>
              </div>
            </ScrollReveal>

            <div className="space-y-7">
              {TECHNOLOGY_GROUPS.map((group) => {
                const Icon = group.icon;

                return (
                  <ScrollReveal key={group.title} variant="up">
                    <div className="grid gap-3 sm:grid-cols-[170px_minmax(0,1fr)] sm:gap-6">
                      <div className="flex items-center gap-2.5">
                        <Icon
                          size={16}
                          strokeWidth={1.7}
                          className="text-[#6fbd68]"
                        />
                        <h3 className="text-sm font-medium text-white/80">
                          {group.title}
                        </h3>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {group.technologies.map((technology) => (
                          <span
                            key={technology}
                            className="rounded-md border border-white/10 bg-white/2.5 px-3 py-1.5 text-xs text-white/55"
                          >
                            {technology}
                          </span>
                        ))}
                      </div>
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>
          </section>

          {/* FAQ */}
          <ScrollReveal variant="up">
            <section className="border-b border-white/10 py-12 sm:py-16">
              <div className="mb-8">
                <p className="mb-3 text-xs font-medium uppercase tracking-[0.18em] text-[#6fbd68]">
                  A few details
                </p>
                <h2 className="font-(family-name:--font-bricolage) text-2xl font-semibold tracking-tight sm:text-3xl">
                  Frequently asked questions
                </h2>
                <p className="mt-4 max-w-xl text-sm leading-7 text-white/50">
                  A little more about working together, project expectations,
                  and getting started.
                </p>
              </div>

              <ServicesFaq />
            </section>
          </ScrollReveal>

          {/* CTA */}
          <ScrollReveal variant="up">
            <section className="pt-12 sm:pt-16">
              <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
                <div className="max-w-xl">
                  <p className="mb-3 text-xs font-medium uppercase tracking-[0.18em] text-[#6fbd68]">
                    Have something in mind?
                  </p>
                  <h2 className="font-(family-name:--font-bricolage) text-2xl font-semibold leading-tight tracking-tight sm:text-3xl">
                    Let's figure out what's possible.
                  </h2>
                  <p className="mt-4 text-sm leading-7 text-white/50">
                    You don't need a complete plan to get started. Tell me
                    what you're working on, and we can take it from there.
                  </p>
                </div>

                <Link
                  href="/contact"
                  className="group inline-flex min-h-12 shrink-0 items-center justify-between gap-5 rounded-lg border border-[#6fbd68]/40 px-5 text-sm font-medium text-white transition-colors hover:border-[#6fbd68] hover:bg-[#6fbd68]/10"
                >
                  Get in touch
                  <ArrowUpRight
                    size={17}
                    className="text-[#6fbd68] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </Link>
              </div>
            </section>
          </ScrollReveal>
        </div>
      </div>
    </main>
  );
}
