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
      className={`${heroFont.className} relative isolate flex min-h-[max(780px,100svh)] w-full items-center overflow-hidden bg-[#030405] px-6 pb-32 pt-36 text-white sm:px-10 lg:px-16`}
    >
      {/* Background Stacking Canvas Architecture */}
      <div className={styles.background} aria-hidden="true">
          <ParticleBackground />
      </div>

      {/* Hero content */}
      <div className="relative z-10 mx-auto w-full max-w-7xl">
        {/* Eyebrow Status Badge */}
        <div
          className={`${styles.reveal} ${styles.delayEyebrow} mb-8 inline-flex items-center gap-2.5 text-[11px] font-medium uppercase tracking-[0.22em] text-white/50 sm:text-xs`}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-[#6fbd68] shadow-[0_0_12px_rgba(111,189,104,0.85)]" />
          Software Engineer / Full-Stack Development
        </div>

        {/* Headline Fluid Scaling */}
        <h1
          className={`${styles.reveal} ${styles.delayHeadlineOne} max-w-300 text-[clamp(2.5rem,7vw,6.8rem)] font-semibold leading-[1.02] tracking-tighter text-white`}
        >
          Architecting code <br className="hidden md:inline" />
          without <span className="text-[#6fbd68]">compromise.</span>
        </h1>

        {/* Asymmetric Split Layout Area */}
        <div className="mt-12 flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between border-t border-white/6 pt-10">
          <p
            className={`${styles.reveal} ${styles.delayDescription} max-w-130 text-base leading-[1.8] tracking-normal text-white/60 sm:text-lg`}
          >
            I design, build, and launch web applications with thoughtful
            architecture, clean execution, and a focus on creating software
            that lasts.
          </p>

          {/* Premium Easing Hover Interactions */}
          <nav
            className={`${styles.reveal} ${styles.delayActions} flex flex-wrap items-center gap-4`}
            aria-label="Hero navigation"
          >
            <Link
              href="#projects"
              className="group inline-flex min-h-13 items-center gap-2.5 rounded-full bg-[#6fbd68] px-7 text-sm font-semibold text-[#030405] transition-all duration-300 hover:bg-[#83ce7c] hover:scale-[1.02] hover:shadow-[0_0_32px_rgba(111,189,104,0.25)] active:scale-[0.98]"
              style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
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
              className="inline-flex min-h-13 items-center rounded-full border border-white/10 bg-white/1 px-7 text-sm font-semibold text-white/80 transition-all duration-300 hover:border-white/25 hover:bg-white/5 hover:scale-[1.02] hover:text-white active:scale-[0.98]"
              style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
            >
              Get in touch
            </Link>
          </nav>
        </div>
      </div>

      {/* Structural Metadata Footer Status Bar */}
      <div
        className={`${styles.reveal} ${styles.delayDetails} absolute bottom-8 left-6 right-6 z-10 flex items-center justify-between border-t border-white/5 pt-6 sm:left-10 sm:right-10 lg:left-16 lg:right-16`}
      >
        <span className="text-[10px] font-medium tracking-[0.25em] text-white/30">
          THOUGHTFUL BY DESIGN.
        </span>
        <span className="text-[10px] font-medium tracking-[0.25em] text-white/30">
          BUILT WITH INTENTION.
        </span>
      </div>
    </section>
  );
}
