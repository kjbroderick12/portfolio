"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import styles from "./Hero.module.css";
import ParticleBackground from "./ParticleBackground";

export default function Hero() {
  return (
    <section className="relative isolate flex min-h-[82svh] w-full flex-col overflow-x-clip bg-[#080d12] px-5 pb-10 pt-28 text-white sm:min-h-[max(780px,100svh)] sm:px-10 sm:pb-10 sm:pt-36 lg:px-16">
      <div className={styles.background} aria-hidden="true">
        <ParticleBackground />
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-1 h-32 bg-linear-to-t from-[#080d12] to-transparent"
      />

      <div className="relative z-10 flex w-full flex-1 items-center">
        <div className="mx-auto w-full max-w-7xl">
          <div
            className={`${styles.reveal} ${styles.delayEyebrow} mb-6 inline-flex items-center gap-2.5 text-[11px] font-medium uppercase tracking-[0.22em] text-white/55 sm:mb-8 sm:text-xs`}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#6fbd68] shadow-[0_0_12px_rgba(111,189,104,0.85)]" />
            <span>Software Developer / Full-Stack Development</span>
          </div>

          <h1
            className={`${styles.reveal} ${styles.delayHeadlineOne} max-w-4xl text-4xl font-semibold leading-[1.03] tracking-[-0.045em] text-white sm:text-6xl lg:text-7xl`}
          >
            Architecting code <br className="hidden md:inline" />
            without <span className="text-[#6fbd68]">compromise.</span>
          </h1>

          <div className="mt-7 flex flex-col gap-6 pt-5 sm:mt-10 sm:gap-7 sm:pt-8 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
            <p
              className={`${styles.reveal} ${styles.delayDescription} max-w-xl text-sm leading-7 text-white/65 sm:text-lg sm:leading-[1.8]`}
            >
              I build web applications and backend features, working across
              frontend interfaces, APIs, and databases. I care about
              understanding the problem, writing maintainable code, and
              delivering practical solutions.
            </p>

            <nav
              className={`${styles.reveal} ${styles.delayActions} flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4`}
              aria-label="Hero navigation"
            >
              <Link
                href="#projects"
                className="group inline-flex min-h-12 w-full items-center justify-center gap-2.5 rounded-full bg-[#6fbd68] px-6 text-xs font-semibold text-[#080d12] transition-all duration-300 hover:scale-[1.02] hover:bg-[#83ce7c] hover:shadow-[0_0_32px_rgba(111,189,104,0.25)] active:scale-[0.98] sm:min-h-13 sm:w-auto sm:px-7 sm:text-sm"
                style={{
                  transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
                }}
              >
                <span>Explore my work</span>
                <ArrowUpRight
                  size={16}
                  strokeWidth={2.5}
                  className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </Link>

              <Link
                href="/contact"
                className="inline-flex min-h-12 w-full items-center justify-center rounded-full border border-white/10 bg-white/2 px-6 text-xs font-semibold text-white/80 transition-all duration-300 hover:scale-[1.02] hover:border-white/25 hover:bg-white/6 hover:text-white active:scale-[0.98] sm:min-h-13 sm:w-auto sm:px-7 sm:text-sm"
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
    </section>
  );
}
