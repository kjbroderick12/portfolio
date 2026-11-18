
"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import { usePathname } from "next/navigation";

type RevealVariant = "up" | "fade" | "left" | "right" | "blur";

interface ScrollRevealProps {
  children: ReactNode;
  variant?: RevealVariant;
  delay?: number;
  duration?: number;
  className?: string;
  threshold?: number;
  once?: boolean;
}

interface RevealContentProps {
  children: ReactNode;
  variant: RevealVariant;
  delay: number;
  duration: number;
  className: string;
  threshold: number;
  once: boolean;
}

const hiddenVariants: Record<RevealVariant, string> = {
  up: "translate-y-[25px]",
  fade: "translate-y-0",
  left: "-translate-x-[25px]",
  right: "translate-x-[25px]",
  blur: "translate-y-[15px] blur-[6px]",
};

function RevealContent({
  children,
  variant,
  delay,
  duration,
  className,
  threshold,
  once,
}: RevealContentProps) {
  const elementRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = elementRef.current;

    if (!element) return;

    const mediaQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    if (mediaQuery.matches) {
      setIsVisible(true);
      return;
    }

    if (!("IntersectionObserver" in window)) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);

          if (once) {
            observer.unobserve(element);
          }
        } else if (!once) {
          setIsVisible(false);
        }
      },
      {
        threshold,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    const timeoutId = window.setTimeout(() => {
      observer.observe(element);
    }, 100);

    return () => {
      window.clearTimeout(timeoutId);
      observer.disconnect();
    };
  }, [once, threshold]);

  const animationStyle: CSSProperties = {
    transitionDuration: `${duration}ms`,
    transitionDelay: `${delay}ms`,
  };

  return (
    <div
      ref={elementRef}
      className={`
        transition-[opacity,transform,filter]
        ease-[cubic-bezier(0.2,0.7,0.2,1)]
        ${
          isVisible
            ? "translate-x-0 translate-y-0 opacity-100 blur-0"
            : `opacity-0 ${hiddenVariants[variant]}`
        }
        motion-reduce:opacity-100!
        motion-reduce:translate-x-0!
        motion-reduce:translate-y-0!
        motion-reduce:blur-0!
        motion-reduce:transition-none!
        ${className}
      `}
      style={animationStyle}
    >
      {children}
    </div>
  );
}

export default function ScrollReveal({
  children,
  variant = "up",
  delay = 0,
  duration = 650,
  className = "",
  threshold = 0.05,
  once = true,
}: ScrollRevealProps) {
  const pathname = usePathname();

  return (
    <RevealContent
      key={pathname}
      children={children}
      variant={variant}
      delay={delay}
      duration={duration}
      className={className}
      threshold={threshold}
      once={once}
    />
  );
}
