
"use client";

import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
};

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = canvas?.parentElement;
    const ctx = canvas?.getContext("2d");

    if (!canvas || !container || !ctx) return;

    let animationFrameId = 0;
    let particles: Particle[] = [];
    let width = 0;
    let height = 0;
    let dpr = 1;

    const mouse = { x: -1000, y: -1000 };
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    const createParticles = () => {
      particles = [];

      const count = Math.min(Math.floor(width / 30), 60);

      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.35,
          vy: (Math.random() - 0.5) * 0.35,
          radius: Math.random() * 1.6 + 1.4,
        });
      }
    };

    const resize = () => {
      const bounds = container.getBoundingClientRect();

      width = bounds.width;
      height = bounds.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = "100%";
      canvas.style.height = "100%";

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      createParticles();
      draw();
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((particle) => {
        if (!reducedMotion.matches) {
          particle.x += particle.vx;
          particle.y += particle.vy;

          if (particle.x < 0) particle.x = width;
          if (particle.x > width) particle.x = 0;
          if (particle.y < 0) particle.y = height;
          if (particle.y > height) particle.y = 0;

          const dx = mouse.x - particle.x;
          const dy = mouse.y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance > 0 && distance < 140) {
            particle.x -= (dx / distance) * 0.5;
            particle.y -= (dy / distance) * 0.5;
          }
        }
      });

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 125) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(111, 189, 104, ${
              0.28 * (1 - distance / 125)
            })`;
            ctx.lineWidth = 0.9;
            ctx.stroke();
          }
        }
      }

      particles.forEach((particle) => {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(111, 189, 104, 0.95)";
        ctx.fill();
      });
    };

    const animate = () => {
      draw();

      if (!reducedMotion.matches) {
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    const handleMouseMove = (event: MouseEvent) => {
      const bounds = canvas.getBoundingClientRect();

      mouse.x = event.clientX - bounds.left;
      mouse.y = event.clientY - bounds.top;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    const handleMotionPreferenceChange = () => {
      cancelAnimationFrame(animationFrameId);
      animate();
    };

    const resizeObserver = new ResizeObserver(resize);

    resizeObserver.observe(container);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);
    reducedMotion.addEventListener("change", handleMotionPreferenceChange);

    resize();

    if (!reducedMotion.matches) {
      animationFrameId = requestAnimationFrame(animate);
    }

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      reducedMotion.removeEventListener(
        "change",
        handleMotionPreferenceChange
      );
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0 block h-full w-full pointer-events-none"
      aria-hidden="true"
    />
  );
}
