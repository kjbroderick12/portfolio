import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import Hero from "@/features/home/components/Hero";
import FeaturedProjects from "@/features/home/components/FeaturedProjects";
import AboutJourney from "@/features/home/components/AboutJourney";
import ScrollReveal from "@/shared/components/ScrollReveal";


export default function Home() {
  return (
    <main
      className="relative min-h-screen w-full overflow-x-clip bg-[#080d12] font-(family-name:--font-bricolage) text-white selection:bg-[#6fbd68]/20 selection:text-[#83ce7b]"
    >
      <Hero />
      <FeaturedProjects />
      <AboutJourney />

      {/* Contact CTA */}
      <section
        id="contact"
        className="relative isolate w-full overflow-x-clip bg-[#080d12] px-5 pb-14 pt-10 text-white sm:px-10 sm:pb-18 sm:pt-14 lg:px-16 lg:pb-20"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-24 right-0 z-0 h-90 w-90 rounded-full bg-[#6fbd68]/5 blur-[130px] sm:h-130 sm:w-130 sm:blur-[160px]"
        />

        <div className="relative z-10 mx-auto w-full max-w-7xl">
          <ScrollReveal variant="up">
            <div className="grid grid-cols-1 gap-8 rounded-2xl border border-white/8 bg-linear-to-br from-[#0b1117] via-[#0b1117] to-[#6fbd68]/6 p-6 sm:p-10 lg:grid-cols-12 lg:items-end lg:gap-12 lg:p-14">
              <div className="lg:col-span-8">

                <h2 className="text-3xl font-semibold leading-[1.02] tracking-[-0.04em] text-white sm:text-5xl lg:text-6xl">
                  Have a project{" "}
                  <span className="text-[#6fbd68]">in mind?</span>
                </h2>

                <p className="mt-4 max-w-xl text-sm leading-7 text-white/60 sm:mt-5 sm:text-base sm:leading-8">
                  I&apos;m always interested in new opportunities, interesting
                  projects, and connecting with other people in tech. Whether
                  you&apos;re looking for a developer or just want to talk
                  about an idea, I&apos;d love to hear from you.
                </p>
              </div>

              <div className="flex w-full flex-col items-stretch gap-3 sm:items-start lg:col-span-4 lg:items-end">
                <Link
                  href="/contact"
                  className="group inline-flex w-full items-center justify-center gap-2.5 rounded-xl bg-[#6fbd68] px-7 py-4 text-xs font-semibold text-[#081009] transition-all duration-300 hover:bg-[#82cf7a] sm:w-auto sm:text-sm"
                >
                  <span>Get in touch</span>
                  <ArrowUpRight
                    size={17}
                    className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </Link>

                <p className="text-center font-mono text-[11px] text-white/35 sm:text-left lg:text-right">
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