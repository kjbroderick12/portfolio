import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import Hero from "@/features/home/components/Hero";
import FeaturedProjects from "@/features/home/components/FeaturedProjects";
import AboutJourney from "@/features/home/components/AboutJourney";
import ScrollReveal from "@/shared/components/ScrollReveal";

export default function Home() {
  return (
    <main className="relative min-h-screen w-full overflow-x-clip bg-[#080d12] font-(family-name:--font-bricolage) text-white selection:bg-[#6fbd68]/20 selection:text-[#83ce7b]">
      <Hero />
      <FeaturedProjects />
      <AboutJourney />

      {/* Contact CTA */}
      <section
        id="contact"
        className="relative isolate w-full overflow-x-clip bg-[#080d12] px-5 py-20 text-white sm:px-10 sm:py-24 lg:px-16 lg:py-16"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-32 right-0 z-0 h-80 w-80 rounded-full bg-[#6fbd68]/6 blur-[120px] sm:h-120 sm:w-120 sm:blur-[160px]"
        />

        <div className="relative z-10 mx-auto w-full max-w-7xl">
          <ScrollReveal variant="up">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-end lg:gap-12">
              <div className="lg:col-span-8">
                <p className="mb-5 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-[#6fbd68]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#6fbd68] shadow-[0_0_10px_rgba(111,189,104,0.7)]" />
                  Let's connect
                </p>

                <h2 className="max-w-3xl text-4xl font-semibold leading-[1.02] tracking-[-0.045em] text-white sm:text-5xl lg:text-7xl">
                  Have a project{" "}
                  <span className="text-[#6fbd68]">in mind?</span>
                </h2>

                <p className="mt-5 max-w-xl text-sm leading-7 text-white/60 sm:text-base sm:leading-8">
                  I&apos;m open to software development opportunities,
                  freelance projects, and conversations with people building
                  useful things. Whether you have a role, a project, or an
                  idea you&apos;d like to discuss, I&apos;d love to hear from
                  you.
                </p>
              </div>

              <div className="flex flex-col items-start gap-3 lg:col-span-4 lg:items-end">
                <Link
                  href="/contact"
                  className="group inline-flex min-h-13 w-full items-center justify-center gap-2.5 rounded-full bg-[#6fbd68] px-8 text-sm font-semibold text-[#081009] transition-all duration-300 hover:scale-[1.02] hover:bg-[#82cf7a] hover:shadow-[0_0_32px_rgba(111,189,104,0.2)] active:scale-[0.98] sm:w-auto"
                >
                  <span>Get in touch</span>
                  <ArrowUpRight
                    size={17}
                    className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </Link>

                <p className="text-xs text-white/35">
                  I&apos;d love to hear what you&apos;re working on.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
}
