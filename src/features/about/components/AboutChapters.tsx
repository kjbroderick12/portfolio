"use client";

import { useState } from "react";

interface ExperienceItem {
  period: string;
  role: string;
  badge: string;
  title: string;
  description: string[];
  highlights: string[];
}

interface AboutChaptersProps {
  experiences: ExperienceItem[];
}

export default function AboutChapters({ experiences }: AboutChaptersProps) {
  const [activeChapter, setActiveChapter] = useState(2);

  const current = experiences[activeChapter];

  return (
    <div className="rounded-2xl border border-white/8 bg-[#0b1117]/70 p-5 sm:p-8">
      <div className="flex flex-col justify-between gap-4 border-b border-white/[0.07] pb-5 sm:flex-row sm:items-end sm:pb-6">
        <div>
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#6fbd68]">
            Experience
          </span>
          <h2 className="mt-2 font-(family-name:--font-bricolage) text-2xl font-semibold tracking-[-0.04em] sm:text-3xl">
            My journey.
          </h2>
        </div>

        <div
          role="group"
          aria-label="Select an experience"
          className="flex flex-wrap gap-2"
        >
          {experiences.map((item, idx) => (
            <button
              key={item.role}
              type="button"
              aria-pressed={activeChapter === idx}
              onClick={() => setActiveChapter(idx)}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6fbd68]/60 ${
                activeChapter === idx
                  ? "bg-[#6fbd68] text-[#081009]"
                  : "border border-white/10 bg-white/2 text-white/50 hover:border-white/25 hover:text-white"
              }`}
            >
              {item.role.split("·")[0].trim()}
            </button>
          ))}
        </div>
      </div>

      <div className="pt-6" aria-live="polite">
        <div className="flex flex-wrap items-center gap-2.5 text-xs sm:gap-3">
          <span className="font-mono font-semibold text-[#6fbd68]">
            {current.period}
          </span>
          <span className="text-white/20">•</span>
          <span className="font-medium text-white/75">{current.role}</span>
          <span className="rounded-md border border-white/10 bg-white/3 px-2 py-0.5 text-[10px] uppercase tracking-wider text-white/45">
            {current.badge}
          </span>
        </div>

        <h3 className="mt-4 font-(family-name:--font-bricolage) text-xl font-medium tracking-[-0.03em] text-white sm:text-2xl">
          {current.title}
        </h3>

        <div className="mt-3 space-y-3 text-sm leading-7 text-white/55 sm:text-base">
          {current.description.map((desc, i) => (
            <p key={i}>{desc}</p>
          ))}
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {current.highlights.map((tag) => (
            <span
              key={tag}
              className="rounded-md border border-[#6fbd68]/20 bg-[#6fbd68]/6 px-2.5 py-1 text-xs text-[#83ce7b]"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
