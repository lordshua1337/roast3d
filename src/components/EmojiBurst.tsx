import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  rotation: number;
  rotationSpeed: number;
  scale: number;
  opacity: number;
  life: number;
  maxLife: number;
}

interface EmojiBurstProps {
  trigger: number; // increment to trigger a burst
  originX?: number; // px from left of viewport
  originY?: number; // px from top of viewport
}

const EMOJI = "\u{1F602}"; // crying laughing
const PARTICLE_COUNT = 40;
const GRAVITY = 600; // px/s^2

export function EmojiBurst({ trigger, originX, originY }: EmojiBurstProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const rafRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);
  const elementsRef = useRef<HTMLSpanElement[]>([]);

  useEffect(() => {
    if (trigger === 0) return;

    const container = containerRef.current;
    if (!container) return;

    // Clean up previous burst
    elementsRef.current.forEach((el) => el.remove());
    elementsRef.current = [];
    cancelAnimationFrame(rafRef.current);

    const cx = originX ?? window.innerWidth / 2;
    const cy = originY ?? window.innerHeight / 2;

    // Create particles with spread velocities
    const particles: Particle[] = [];
    const elements: HTMLSpanElement[] = [];

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const angle = (Math.PI * 2 * i) / PARTICLE_COUNT + (Math.random() - 0.5) * 0.5;
      const speed = 300 + Math.random() * 500;
      const life = 1.5 + Math.random() * 1.5;

      particles.push({
        x: cx,
        y: cy,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 200 - Math.random() * 300, // bias upward
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 400,
        scale: 0.6 + Math.random() * 0.8,
        opacity: 1,
        life,
        maxLife: life,
      });

      const el = document.createElement("span");
      el.textContent = EMOJI;
      el.style.cssText = `
        position: fixed;
        left: 0;
        top: 0;
        font-size: 28px;
        pointer-events: none;
        z-index: 9999;
        will-change: transform, opacity;
        line-height: 1;
      `;
      container.appendChild(el);
      elements.push(el);
    }

    particlesRef.current = particles;
    elementsRef.current = elements;
    lastTimeRef.current = performance.now();

    const animate = (now: number) => {
      const dt = Math.min((now - lastTimeRef.current) / 1000, 0.05);
      lastTimeRef.current = now;

      let alive = false;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        if (p.life <= 0) {
          elements[i].style.display = "none";
          continue;
        }

        alive = true;
        p.life -= dt;
        p.vy += GRAVITY * dt;
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        p.rotation += p.rotationSpeed * dt;

        // Fade out in last 30% of life
        const lifeRatio = p.life / p.maxLife;
        p.opacity = lifeRatio < 0.3 ? lifeRatio / 0.3 : 1;

        elements[i].style.transform = `translate(${p.x}px, ${p.y}px) rotate(${p.rotation}deg) scale(${p.scale})`;
        elements[i].style.opacity = String(p.opacity);
      }

      if (alive) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        elements.forEach((el) => el.remove());
        elementsRef.current = [];
      }
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafRef.current);
      elementsRef.current.forEach((el) => el.remove());
      elementsRef.current = [];
    };
  }, [trigger, originX, originY]);

  return (
    <div
      ref={containerRef}
      style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 9999 }}
    />
  );
}
