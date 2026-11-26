import ScrollReveal from "@/shared/components/ScrollReveal";

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

export default function AboutChapters({
  experiences,
}: AboutChaptersProps) {
  return (
    <div className="relative">
      <div
        aria-hidden="true"
        className="absolute bottom-5 left-1.25 top-2 w-px bg-linear-to-b from-[#6fbd68]/60 via-white/15 to-transparent sm:left-1.75"
      />

      <div className="space-y-10 sm:space-y-14">
        {experiences.map((item, index) => (
          <ScrollReveal key={item.role} variant="up">
            <article className="relative grid grid-cols-[24px_minmax(0,1fr)] gap-4 sm:grid-cols-[32px_minmax(0,1fr)] sm:gap-7">
              <div className="relative flex justify-center">
                <span
                  className={`relative z-10 mt-1.5 h-3 w-3 rounded-full border-2 ${
                    index === experiences.length - 1
                      ? "border-[#6fbd68] bg-[#6fbd68]/20 shadow-[0_0_14px_rgba(111,189,104,0.25)]"
                      : "border-white/30 bg-[#080d12]"
                  }`}
                />
              </div>

              <div className="min-w-0 pb-1">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                  <span className="font-mono text-[11px] font-semibold tracking-wide text-[#83ce7b]">
                    {item.period}
                  </span>

                  <span
                    className="hidden text-white/20 sm:inline"
                    aria-hidden="true"
                  >
                    /
                  </span>

                  <span className="text-xs font-medium text-white/65">
                    {item.role}
                  </span>

                  <span className="rounded-full border border-white/10 px-2.5 py-1 text-[9px] uppercase tracking-[0.12em] text-white/40">
                    {item.badge}
                  </span>
                </div>

                <h3 className="mt-4 max-w-2xl font-(family-name:--font-bricolage) text-xl font-medium leading-snug tracking-[-0.035em] text-white sm:text-2xl">
                  {item.title}
                </h3>

                <div className="mt-3 max-w-2xl space-y-3 text-sm leading-7 text-white/50 sm:mt-4 sm:text-[15px]">
                  {item.description.map((paragraph, paragraphIndex) => (
                    <p key={paragraphIndex}>{paragraph}</p>
                  ))}
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  {item.highlights.map((highlight) => (
                    <span
                      key={highlight}
                      className="rounded-md border border-[#6fbd68]/20 bg-[#6fbd68]/4.5 px-2.5 py-1.5 text-[10px] text-[#83ce7b]"
                    >
                      {highlight}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
}