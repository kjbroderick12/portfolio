import Link from "next/link";
import {
  ArrowUpRight,
  Check,
  Code2,
  Database,
  GitBranch,
  Globe,
  Layers3,
  Lightbulb,
  Monitor,
  Search,
  Server,
  Sparkles,
  Workflow,
  Wrench,
} from "lucide-react";
import { Bricolage_Grotesque } from "next/font/google";
import ScrollReveal from "@/shared/components/ScrollReveal";
import ServicesFaq from "@/features/services/components/ServicesFaq";
import type { Metadata } from "next";

const ENGAGEMENT_TYPES = [
  {
    title: "Project-Based Development",
    detail: "Websites, applications, and tools built around a defined goal.",
  },
  {
    title: "Features & Improvements",
    detail: "New functionality, UI improvements, and updates to existing projects.",
  },
  {
    title: "Collaborative Development",
    detail: "Full-stack development support for teams and businesses.",
  },
];

const SERVICES = [
  {
    icon: Code2,
    tag: "Applications",
    title: "Custom Software & Applications",
    description:
      "Need something that doesn't quite exist yet? I build custom applications around your workflow, goals, and requirements, with the flexibility to grow as your needs change.",
    details: [
      "Custom web applications",
      "Frontend and backend development",
      "Database design",
      "API development",
    ],
  },
  {
    icon: Globe,
    tag: "Websites",
    title: "Website Development",
    description:
      "A good website should be easy to use, look intentional, and make a strong impression. I build modern, responsive websites that help businesses establish their online presence.",
    details: [
      "Business websites",
      "Portfolio websites",
      "Responsive design",
      "User experience and accessibility",
    ],
  },
  {
    icon: Workflow,
    tag: "Automation",
    title: "Automation & Integrations",
    description:
      "Repetitive tasks and disconnected systems can slow things down. I develop tools and integrations that simplify workflows, reduce manual work, and help things run more efficiently.",
    details: [
      "Workflow automation",
      "API integrations",
      "System connectivity",
      "Data synchronization",
    ],
  },
  {
    icon: Wrench,
    tag: "Ongoing Development",
    title: "Updates & Improvements",
    description:
      "Whether you have an existing application that needs attention or a project that has outgrown its original functionality, I can help improve, maintain, and build on what you already have.",
    details: [
      "Bug fixes and troubleshooting",
      "New features",
      "Code refactoring",
      "Interface improvements",
    ],
  },
];

const PROCESS_STEPS = [
  {
    icon: Search,
    title: "Understand",
    description:
      "We start with the problem, your goals, and what you need the solution to accomplish.",
  },
  {
    icon: Lightbulb,
    title: "Plan",
    description:
      "I explore the options and outline an approach that fits your requirements, priorities, and budget.",
  },
  {
    icon: Layers3,
    title: "Build",
    description:
      "Development begins. I focus on functionality, thoughtful implementation, and keeping you informed along the way.",
  },
  {
    icon: Sparkles,
    title: "Refine",
    description:
      "We test, review, and make adjustments to ensure the finished product works as intended.",
  },
];

const TECHNOLOGY_GROUPS = [
  {
    icon: Monitor,
    title: "Frontend",
    technologies: ["React", "Next.js", "TypeScript", "JavaScript", "Tailwind CSS"],
  },
  {
    icon: Server,
    title: "Backend",
    technologies: ["C#", ".NET", "ASP.NET MVC", "REST APIs"],
  },
  {
    icon: Database,
    title: "Data & Storage",
    technologies: ["MySQL", "MongoDB", "SQL", "Entity Framework"],
  },
  {
    icon: GitBranch,
    title: "Development Tools",
    technologies: ["Git", "GitHub", "Azure DevOps", "CI/CD"],
  },
];

export const metadata: Metadata = {
  title: "Software Development Services",
  description:
    "Custom software, website development, workflow automation, API integrations, and ongoing application improvements tailored to your business needs.",
  alternates: {
    canonical: "/services",
  },
};

export default function ServicesPage() {
  return (
    <main
      className="relative min-h-screen w-full overflow-x-clip bg-[#080d12] text-white selection:bg-[#6fbd68]/20 selection:text-[#83ce7b]"
    >
      {/* Background */}
      <div
        className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
        aria-hidden="true"
      >
        <div className="absolute -top-40 right-0 h-80 w-[320px] rounded-full bg-[#6fbd68]/5 blur-[110px] sm:right-1/4 sm:h-130 sm:w-130 sm:blur-[150px]" />
        <div className="absolute bottom-0 left-0 h-65 w-65 rounded-full bg-[#6fbd68]/3 blur-[100px] sm:left-10 sm:h-100 sm:w-100 sm:blur-[140px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-5 pb-24 pt-28 sm:px-10 sm:pb-28 sm:pt-36 lg:px-16">
        {/* Hero */}
        <ScrollReveal variant="up">
          <section className="grid grid-cols-1 gap-12 border-b border-white/8 pb-14 lg:grid-cols-12 lg:items-end lg:gap-14 lg:pb-20">
            <div className="lg:col-span-7">

              <h1 className="font-(family-name:--font-bricolage) text-4xl leading-[1.08] font-semibold tracking-[-0.045em] sm:text-6xl lg:text-7xl">
                Software that makes
                <span className="text-[#6fbd68]"> things easier.</span>
              </h1>

              <p className="mt-6 max-w-xl text-sm leading-7 text-white/60 sm:text-base sm:leading-8">
                From websites and custom applications to automation and ongoing
                development, I build practical solutions to real-world problems.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Link
                  href="/contact"
                  className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#6fbd68] px-6 py-3.5 text-sm font-semibold text-[#081009] transition-colors hover:bg-[#82cf7a] sm:w-auto"
                >
                  Discuss your project
                  <ArrowUpRight
                    size={16}
                    className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </Link>

                <Link
                  href="/projects"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/2 px-6 py-3.5 text-sm font-medium text-white/75 transition-colors hover:border-white/25 hover:bg-white/5 hover:text-white sm:w-auto"
                >
                  Explore my work
                </Link>
              </div>
            </div>

            {/* Ways to work together */}
            <div className="lg:col-span-5 lg:border-l lg:border-white/8 lg:pl-10">
              <p className="mb-5 text-xs font-medium tracking-[0.16em] text-white/35 uppercase">
                Ways to work together
              </p>

              <div className="divide-y divide-white/[0.07]">
                {ENGAGEMENT_TYPES.map((item) => (
                  <div key={item.title} className="py-4 first:pt-0 last:pb-0">
                    <h2 className="text-sm font-medium text-white/85">
                      {item.title}
                    </h2>
                    <p className="mt-1.5 text-sm leading-6 text-white/45">
                      {item.detail}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </ScrollReveal>

        {/* Services */}
        <section className="mt-20 sm:mt-28">
          <ScrollReveal variant="up">
            <div className="mb-10 grid gap-6 lg:grid-cols-[1fr_1.15fr] lg:items-end">
              <div>
                <span className="text-xs font-medium tracking-[0.18em] text-[#6fbd68] uppercase">
                  What I offer
                </span>
                <h2 className="mt-3 font-(family-name:--font-bricolage) text-3xl font-semibold tracking-[-0.04em] sm:text-5xl">
                  Built around what you need.
                </h2>
              </div>

              <p className="max-w-xl text-sm leading-7 text-white/55 lg:justify-self-end sm:text-base sm:leading-8">
                No two projects are exactly alike. Whether you're starting with an
                idea or improving something you've already built, we'll find an
                approach that makes sense.
              </p>
            </div>
          </ScrollReveal>

          <div className="divide-y divide-white/8 border-y border-white/8">
            {SERVICES.map((service, index) => {
              const Icon = service.icon;

              return (
                <ScrollReveal
                  key={service.title}
                  variant="up"
                  delay={index * 50}
                >
                  <article className="group grid grid-cols-1 gap-6 py-8 sm:py-10 lg:grid-cols-12 lg:gap-12">
                    <div className="lg:col-span-5">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/3 text-white/60 transition-colors group-hover:border-[#6fbd68]/35 group-hover:bg-[#6fbd68]/8 group-hover:text-[#6fbd68]">
                          <Icon size={18} strokeWidth={1.7} />
                        </div>

                        <span className="text-xs font-medium tracking-[0.16em] text-[#6fbd68] uppercase">
                          {service.tag}
                        </span>
                      </div>

                      <h3 className="mt-4 font-(family-name:--font-bricolage) text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                        {service.title}
                      </h3>
                    </div>

                    <div className="lg:col-span-7">
                      <p className="text-sm leading-7 text-white/60 sm:text-base sm:leading-8">
                        {service.description}
                      </p>

                      <ul className="mt-6 grid grid-cols-1 gap-3 border-t border-white/6 pt-5 sm:grid-cols-2">
                        {service.details.map((detail) => (
                          <li
                            key={detail}
                            className="flex items-center gap-2.5 text-sm text-white/70"
                          >
                            <Check
                              size={15}
                              className="shrink-0 text-[#6fbd68]"
                            />
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </article>
                </ScrollReveal>
              );
            })}
          </div>
        </section>

        {/* Process */}
        <section className="mt-20 sm:mt-28">
          <ScrollReveal variant="up">
            <div className="mb-10 max-w-2xl">
              <span className="text-xs font-medium tracking-[0.18em] text-[#6fbd68] uppercase">
                How I work
              </span>
              <h2 className="mt-3 font-(family-name:--font-bricolage) text-3xl font-semibold tracking-[-0.04em] sm:text-5xl">
                From idea to implementation.
              </h2>
              <p className="mt-5 text-sm leading-7 text-white/55 sm:text-base sm:leading-8">
                A straightforward process with room to collaborate, ask questions,
                and make adjustments along the way.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {PROCESS_STEPS.map((step, index) => {
              const Icon = step.icon;

              return (
                <ScrollReveal key={step.title} variant="up" delay={index * 60}>
                  <article className="group flex h-full flex-col rounded-2xl border border-white/8 bg-[#0b1117]/80 p-6 transition-colors duration-300 hover:border-[#6fbd68]/35 hover:bg-[#0b1117] sm:p-7">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs tracking-wider text-white/30">
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/3 text-white/50 transition-colors group-hover:border-[#6fbd68]/30 group-hover:text-[#6fbd68]">
                        <Icon size={18} strokeWidth={1.7} />
                      </div>
                    </div>

                    <h3 className="mt-7 font-(family-name:--font-bricolage) text-xl font-semibold tracking-tight text-white">
                      {step.title}
                    </h3>

                    <p className="mt-3 text-sm leading-7 text-white/55">
                      {step.description}
                    </p>
                  </article>
                </ScrollReveal>
              );
            })}
          </div>
        </section>

        {/* Technology */}
        <section className="mt-20 sm:mt-28">
          <ScrollReveal variant="up">
            <div className="mb-10 max-w-2xl">
              <span className="text-xs font-medium tracking-[0.18em] text-[#6fbd68] uppercase">
                My toolkit
              </span>
              <h2 className="mt-3 font-(family-name:--font-bricolage) text-3xl font-semibold tracking-[-0.04em] sm:text-5xl">
                Familiar tools.
                <br className="hidden sm:block" />
                Thoughtful implementation.
              </h2>
              <p className="mt-5 text-sm leading-7 text-white/55 sm:text-base sm:leading-8">
                I work across the stack, building interfaces, developing backend
                functionality, and connecting data. My tools vary with the project,
                but these are the technologies I work with most.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal variant="up" delay={60}>
            <div className="grid grid-cols-1 gap-8 border-t border-white/8 pt-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">
              {TECHNOLOGY_GROUPS.map((group) => {
                const Icon = group.icon;

                return (
                  <div key={group.title}>
                    <div className="flex items-center gap-2.5">
                      <Icon size={17} className="text-[#6fbd68]" />
                      <h3 className="text-xs font-medium tracking-[0.14em] text-white/80 uppercase">
                        {group.title}
                      </h3>
                    </div>

                    <div className="mt-5 flex flex-wrap gap-2">
                      {group.technologies.map((technology) => (
                        <span
                          key={technology}
                          className="rounded-lg border border-white/8 bg-[#0b1117]/70 px-3 py-1.5 text-xs text-white/60 transition-colors hover:border-[#6fbd68]/35 hover:text-white/85"
                        >
                          {technology}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </ScrollReveal>
        </section>

        {/* FAQ */}
        <section className="mt-20 sm:mt-28">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-12">
            <ScrollReveal variant="up">
              <div>
                <span className="text-xs font-medium tracking-[0.18em] text-[#6fbd68] uppercase">
                  Good to know
                </span>

                <h2 className="mt-3 font-(family-name:--font-bricolage) text-3xl font-semibold tracking-[-0.04em] sm:text-5xl">
                  Before we get started.
                </h2>

                <p className="mt-5 max-w-sm text-sm leading-7 text-white/55">
                  Have questions about working together? Here's a little more about
                  what to expect.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal variant="up" delay={60}>
              <div className="lg:pt-1">
                <ServicesFaq />
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* CTA */}
        <ScrollReveal variant="up">
          <section className="relative mt-20 overflow-hidden rounded-2xl border border-white/8 bg-linear-to-br from-[#0b1117] via-[#0b1117] to-[#6fbd68]/[0.07] p-7 sm:mt-28 sm:p-12">
            <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-[#6fbd68]/8 blur-[100px]" />

            <div className="relative flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl">
                <span className="text-xs font-medium tracking-[0.18em] text-[#6fbd68] uppercase">
                  Have something in mind?
                </span>

                <h2 className="mt-3 font-(family-name:--font-bricolage) text-3xl font-semibold tracking-[-0.04em] sm:text-5xl">
                  Let&apos;s make it happen.
                </h2>

                <p className="mt-5 max-w-lg text-sm leading-7 text-white/60 sm:text-base sm:leading-8">
                  Whether you have a clear plan or just an idea, let's talk about
                  what you need and how we can bring it to life.
                </p>
              </div>

              <Link
                href="/contact"
                className="group inline-flex w-full shrink-0 items-center justify-center gap-2.5 rounded-xl bg-[#6fbd68] px-6 py-4 text-sm font-semibold text-[#081009] transition-colors hover:bg-[#82cf7a] sm:w-auto"
              >
                Start a conversation
                <ArrowUpRight
                  size={17}
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