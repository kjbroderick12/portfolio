"use client";

import { useEffect, useRef } from "react";

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Array<{ x: number; y: number; vx: number; vy: number; radius: number }> = [];
    const mouse = { x: -1000, y: -1000 };

    const resize = () => {
      const width = window.innerWidth || document.documentElement.clientWidth || 800;
      const height = window.innerHeight || document.documentElement.clientHeight || 780;
      
      // Match device pixel ratios cleanly for high-DPI retina screens
      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      
      ctx.scale(dpr, dpr);
    };

    const createParticles = () => {
      particles = [];
      const width = window.innerWidth || 800;
      // Well-balanced volume count to keep performance smooth
      const count = Math.min(Math.floor(width / 30), 45);
      
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * (window.innerWidth || 800),
          y: Math.random() * (window.innerHeight || 780),
          vx: (Math.random() - 0.5) * 0.35,
          vy: (Math.random() - 0.5) * 0.35,
          radius: Math.random() * 1.5 + 1.25, // Increased node size for clean visibility
        });
      }
    };

    const animate = () => {
      const width = canvas.width / (window.devicePixelRatio || 1);
      const height = canvas.height / (window.devicePixelRatio || 1);
      
      ctx.clearRect(0, 0, width, height);

      // Loop to render network link vectors
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          // Draw sleek network vectors between local nodes
          if (dist < 110) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            // Dynamic web opacity based on proximity matrix
            ctx.strokeStyle = `rgba(111, 189, 104, ${0.18 * (1 - dist / 110)})`;
            ctx.lineWidth = 0.75;
            ctx.stroke();
          }
        }
      }

      // Draw primary nodes
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        // Clean wrapping bounds logic
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Interactive cursor physics tracking
        const mdx = mouse.x - p.x;
        const mdy = mouse.y - p.y;
        const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
        
        if (mdist < 140) {
          p.x -= (mdx / mdist) * 0.5;
          p.y -= (mdy / mdist) * 0.5;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        // Solid opacity color signature (#6fbd68)
        ctx.fillStyle = "rgba(111, 189, 104, 0.85)";
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);
    
    resize();
    createParticles();
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 top-0 left-0 block z-10 min-h-full min-w-full pointer-events-none"
    />
  );
}
