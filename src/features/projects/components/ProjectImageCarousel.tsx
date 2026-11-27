"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight, Pause, Play } from "lucide-react";

export type ProjectImageSlide = {
  src: string;
  alt: string;
  caption: string;
  description: string;
};

type ProjectImageCarouselProps = {
  slides: ProjectImageSlide[];
  interval?: number;
};

export default function ProjectImageCarousel({
  slides,
  interval = 4500,
}: ProjectImageCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const isPausedByUser = isPaused || isHovered || isFocused;

  useEffect(() => {
    if (slides.length < 2 || isPausedByUser) return;

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % slides.length);
    }, interval);

    return () => window.clearInterval(timer);
  }, [slides.length, interval, isPausedByUser]);

  if (slides.length === 0) return null;

  const goToPrevious = () => {
    setActiveIndex((current) =>
      current === 0 ? slides.length - 1 : current - 1
    );
  };

  const goToNext = () => {
    setActiveIndex((current) => (current + 1) % slides.length);
  };

  const activeSlide = slides[activeIndex];

  return (
    <section
      aria-label="Project screenshots"
      className="mt-7 sm:mt-10"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocusCapture={() => setIsFocused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setIsFocused(false);
        }
      }}
    >
      <div className="overflow-hidden rounded-lg border border-white/9 bg-[#0a0f15]">
        {/* Screenshot */}
        <div
          className="relative aspect-16/10 w-full overflow-hidden bg-[#080c11] sm:aspect-video"
          aria-live="polite"
          aria-atomic="true"
        >
          <Image
            key={activeSlide.src}
            src={activeSlide.src}
            alt={activeSlide.alt}
            fill
            priority={activeIndex === 0}
            sizes="(max-width: 1024px) 100vw, 900px"
            className="object-contain"
          />
        </div>

        {/* Caption and Controls */}
        <div className="flex flex-col gap-4 border-t border-white/[0.07] px-3 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-5 sm:py-4">
          <div className="min-w-0">
            <p className="text-sm font-medium text-white/85">
              {activeSlide.caption}
            </p>
            <p className="mt-1 text-xs leading-5 text-white/45">
              {activeSlide.description}
            </p>
          </div>

          {slides.length > 1 && (
            <div className="flex shrink-0 items-center justify-between gap-4 sm:justify-end">
              {/* Slide Indicators */}
              <div className="flex items-center gap-2" aria-label="Choose screenshot">
                {slides.map((slide, index) => (
                  <button
                    key={slide.src}
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    aria-label={`Show screenshot ${index + 1}: ${slide.caption}`}
                    aria-current={activeIndex === index ? "true" : undefined}
                    className={`h-1.5 rounded-full transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#6fbd68] ${
                      activeIndex === index
                        ? "w-6 bg-[#6fbd68]"
                        : "w-1.5 bg-white/25 hover:bg-white/50"
                    }`}
                  />
                ))}
              </div>

              {/* Playback and Navigation */}
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setIsPaused((current) => !current)}
                  aria-label={isPaused ? "Resume automatic slideshow" : "Pause automatic slideshow"}
                  className="flex h-8 w-8 items-center justify-center rounded-full text-white/45 transition-colors hover:bg-white/5 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6fbd68]"
                >
                  {isPaused ? <Play size={14} /> : <Pause size={14} />}
                </button>

                <button
                  type="button"
                  onClick={goToPrevious}
                  aria-label="Previous screenshot"
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 text-white/60 transition-colors hover:border-[#6fbd68]/40 hover:text-[#6fbd68] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6fbd68]"
                >
                  <ArrowLeft size={15} />
                </button>

                <button
                  type="button"
                  onClick={goToNext}
                  aria-label="Next screenshot"
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 text-white/60 transition-colors hover:border-[#6fbd68]/40 hover:text-[#6fbd68] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6fbd68]"
                >
                  <ArrowRight size={15} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <p className="mt-2 text-right text-[10px] text-white/30">
        {activeIndex + 1} / {slides.length}
      </p>
    </section>
  );
}
