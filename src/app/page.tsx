import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Bricolage_Grotesque } from "next/font/google";

import FeaturedProjects from "@/features/home/components/FeaturedProjects";
import Hero from "@/features/home/components/Hero";
import AboutJourney from "@/features/home/components/AboutJourney";

const sansFont = Bricolage_Grotesque({
  subsets: ["latin"],
  display: "swap",
});

export default function Home() {
  return (
    <main>
      <Hero />
      <FeaturedProjects />
      <AboutJourney />

      {/* Contact CTA */}
      <section
        id="contact"
        className={`${sansFont.className} relative isolate w-full overflow-hidden bg-[#080d12] px-6 pb-14 pt-10 text-white sm:px-10 sm:pb-16 sm:pt-12 lg:px-16 lg:pb-20 lg:pt-14`}
      >
        {/* Background Atmosphere */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 bg-linear-to-b from-[#080d12] via-[#090f14] to-[#06090d]"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-48 top-0 z-0 h-125 w-125 rounded-full bg-[#6fbd68]/4 blur-[150px]"
        />

        <div className="relative z-10 mx-auto w-full max-w-7xl">
          <div className="border-t border-white/8 pt-8 sm:pt-10">
            <div className="flex flex-col gap-9 md:flex-row md:items-end md:justify-between md:gap-16">
              <div className="max-w-2xl">
                <div className="mb-5 inline-flex items-center gap-3 text-[10px] font-medium uppercase tracking-[0.24em] text-[#6fbd68] sm:text-[11px]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#6fbd68] shadow-[0_0_10px_rgba(111,189,104,0.4)]" />
                  Get in Touch
                </div>

                <h2 className="text-[clamp(2.75rem,5vw,4.5rem)] font-semibold leading-[0.98] tracking-[-0.055em]">
                  Have a project
                  <span className="block text-[#6fbd68]">
                    in mind?
                  </span>
                </h2>

                <p className="mt-6 max-w-xl text-sm leading-[1.9] text-white/55 sm:mt-7 sm:text-base">
                  I'm always interested in new opportunities,
                  interesting projects, and connecting with other
                  people in tech. Whether you're looking for a
                  developer or just want to talk about an idea,
                  I'd love to hear from you.
                </p>
              </div>

              <div className="flex shrink-0 flex-col items-start gap-4 md:items-end">
                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-3 rounded-full border border-[#6fbd68]/30 bg-[#6fbd68]/10 px-7 py-4 text-sm font-semibold text-[#6fbd68] transition-all duration-300 hover:border-[#6fbd68]/60 hover:bg-[#6fbd68] hover:text-[#080d12]"
                >
                  Get in touch
                  <ArrowUpRight
                    size={18}
                    className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
                  />
                </Link>

                <p className="text-[10px] tracking-wide text-white/30">
                  I'd love to hear what you're working on.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

