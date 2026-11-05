"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import styles from "./Hero.module.css";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  targetAlpha: number;
  hueOffset: number;
}

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const mouseRef = useRef({
    x: -1000,
    y: -1000,
    active: false,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];

    const maxParticles = 85;
    const connectionRadius = 140;

    // Match the original viewport-based canvas sizing.
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createParticles = () => {
      particles = [];

      for (let i = 0; i < maxParticles; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.22,
          vy: (Math.random() - 0.5) * 0.22,
          radius: Math.random() * 2.2 + 1.2,
          alpha: Math.random() * 0.5 + 0.2,
          targetAlpha: Math.random() * 0.7 + 0.3,
          hueOffset: Math.random() * 30 - 15,
        });
      }
    };

    const drawScene = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Render and update particle nodes.
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Continuous particle movement.
        p.x += p.vx;
        p.y += p.vy;

        // Subtle opacity variation.
        p.alpha += (p.targetAlpha - p.alpha) * 0.01;

        if (Math.abs(p.alpha - p.targetAlpha) < 0.02) {
          p.targetAlpha = Math.random() * 0.7 + 0.3;
        }

        // Keep particles within the canvas.
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        // Desktop pointer interaction.
        if (mouseRef.current.active) {
          const mDx = p.x - mouseRef.current.x;
          const mDy = p.y - mouseRef.current.y;
          const mDist = Math.sqrt(mDx * mDx + mDy * mDy);

          if (mDist > 0 && mDist < 180) {
            p.x -= (mDx / mDist) * 0.6;
            p.y -= (mDy / mDist) * 0.6;
          }
        }

        // Draw particle node.
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);

        ctx.fillStyle = `rgba(111, 189, 104, ${p.alpha})`;
        ctx.fill();

        // Connect nearby particles.
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];

          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectionRadius) {
            const lineAlpha =
              (1 - distance / connectionRadius) * 0.22;

            const strokeColor =
              p.hueOffset > 0
                ? `rgba(111, 189, 104, ${lineAlpha})`
                : `rgba(167, 243, 208, ${lineAlpha * 0.7})`;

            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);

            ctx.strokeStyle = strokeColor;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      // Draw connections between particles and the mouse.
      if (mouseRef.current.active) {
        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];

          const dx = p.x - mouseRef.current.x;
          const dy = p.y - mouseRef.current.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            const mouseLineAlpha =
              (1 - distance / 150) * 0.35;

            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(
              mouseRef.current.x,
              mouseRef.current.y
            );

            ctx.strokeStyle =
              `rgba(111, 189, 104, ${mouseLineAlpha})`;

            ctx.lineWidth = 1.2;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(drawScene);
    };

    const handleMouseMove = (event: MouseEvent) => {
      mouseRef.current.x = event.clientX;
      mouseRef.current.y = event.clientY;
      mouseRef.current.active = true;
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
      mouseRef.current.x = -1000;
      mouseRef.current.y = -1000;
    };

    const handleResize = () => {
      resizeCanvas();
      createParticles();
    };

    // Initialize.
    resizeCanvas();
    createParticles();
    drawScene();

    // Event listeners.
    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);

      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section className={styles.hero}>
      {/* Animated particle background */}
      <div className={styles.background} aria-hidden="true">
        <div className={styles.backgroundGlow} />

        <canvas
          ref={canvasRef}
          className={styles.fluidCanvas}
        />

        <div className={styles.leftOverlay} />
        <div className={styles.bottomOverlay} />
      </div>

      {/* Hero content */}
      <div className={styles.content}>
        <div className={styles.intro}>
          <span className={styles.eyebrow}>
            <span className={styles.eyebrowLine} />
            SOFTWARE ENGINEER
          </span>

          <span className={styles.subEyebrow}>
            FULL-STACK DEVELOPMENT
          </span>
        </div>

        <h1 className={styles.heading}>
          <span className={styles.headingLine}>
            Architecting code
          </span>

          <span className={styles.headingLine}>
            without compromise.
          </span>
        </h1>

        <p className={styles.description}>
          I design, develop, and launch web applications with an emphasis on
          thoughtful architecture, clean execution, and software built to last.
        </p>

        <div className={styles.actions}>
          <Link href="#projects" className={styles.primaryButton}>
            Explore Case Studies
            <span aria-hidden="true">↗</span>
          </Link>

          <Link href="/contact" className={styles.secondaryButton}>
            Discuss a Project
          </Link>
        </div>
      </div>

      {/* Bottom labels */}
      <div className={styles.footer}>
        <span>QUALITY OVER SHORTCUTS.</span>
        <span>BUILT WITH INTENTION</span>
      </div>

      {/* Scroll indicator */}
      <a
        href="#projects"
        className={styles.scrollIndicator}
        aria-label="Scroll to projects"
      >
        <span />
      </a>
    </section>
  );
}