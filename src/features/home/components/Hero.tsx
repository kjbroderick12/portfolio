"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Bricolage_Grotesque } from "next/font/google";
import styles from "./Hero.module.css";
import ParticleBackground from "./ParticleBackground";

const heroFont = Bricolage_Grotesque({
  subsets: ["latin"],
  display: "swap",
});

export default function Hero() {
  return (
    <section
      className={`${heroFont.className} relative isolate flex min-h-[max(780px,100svh)] w-full flex-col overflow-hidden bg-[#030405] px-6 pb-7 pt-32 text-white sm:px-10 sm:pb-8 sm:pt-36 lg:px-16`}
    >
      <div className={styles.background} aria-hidden="true">
        <ParticleBackground />
      </div>

      <div className="relative z-10 flex w-full flex-1 items-center">
        <div className="mx-auto w-full max-w-7xl">
          <div
            className={`${styles.reveal} ${styles.delayEyebrow} mb-8 inline-flex items-center gap-2.5 text-[11px] font-medium uppercase tracking-[0.22em] text-white/50 sm:text-xs`}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#6fbd68] shadow-[0_0_12px_rgba(111,189,104,0.85)]" />
            Software Engineer / Full-Stack Development
          </div>

          <h1
            className={`${styles.reveal} ${styles.delayHeadlineOne} max-w-300 text-[clamp(2.5rem,7vw,6.8rem)] font-semibold leading-[1.02] tracking-tighter text-white`}
          >
            Architecting code <br className="hidden md:inline" />
            without <span className="text-[#6fbd68]">compromise.</span>
          </h1>

          <div className="mt-9 flex flex-col gap-6 pt-7 sm:mt-11 sm:gap-7 sm:pt-8 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
            <p
              className={`${styles.reveal} ${styles.delayDescription} max-w-130 text-base leading-[1.8] tracking-normal text-white/60 sm:text-lg`}
            >
              I design, build, and launch web applications with thoughtful
              architecture, clean execution, and a focus on creating software
              that lasts.
            </p>

            <nav
              className={`${styles.reveal} ${styles.delayActions} flex flex-wrap items-center gap-3 sm:gap-4`}
              aria-label="Hero navigation"
            >
              <Link
                href="#projects"
                className="group inline-flex min-h-13 items-center gap-2.5 rounded-full bg-[#6fbd68] px-6 text-sm font-semibold text-[#030405] transition-all duration-300 hover:scale-[1.02] hover:bg-[#83ce7c] hover:shadow-[0_0_32px_rgba(111,189,104,0.25)] active:scale-[0.98] sm:px-7"
                style={{
                  transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
                }}
              >
                Explore my work
                <ArrowUpRight
                  size={16}
                  strokeWidth={2.5}
                  className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </Link>

              <Link
                href="/contact"
                className="inline-flex min-h-13 items-center rounded-full border border-white/10 bg-white/1 px-6 text-sm font-semibold text-white/80 transition-all duration-300 hover:scale-[1.02] hover:border-white/25 hover:bg-white/5 hover:text-white active:scale-[0.98] sm:px-7"
                style={{
                  transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
                }}
              >
                Get in touch
              </Link>
            </nav>
          </div>
        </div>
      </div>

      <div
        className={`${styles.reveal} ${styles.delayDetails} relative z-10 mx-auto mt-12 flex w-full max-w-7xl flex-col items-center gap-2 pt-5 sm:mt-14 sm:flex-row sm:justify-between sm:gap-4 sm:pt-6 lg:mt-10`}
      >
      </div>
    </section>
  );
}
