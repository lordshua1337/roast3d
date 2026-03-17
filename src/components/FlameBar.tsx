import { useEffect, useRef, useCallback } from "react";

interface FlameBarProps {
  children: React.ReactNode;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
}

// Color temperature gradient: white-hot core -> yellow -> orange -> red -> transparent
// Each stop: [r, g, b, a] at lifecycle percentage
const FIRE_GRADIENT: [number, number, number, number][] = [
  [255, 255, 220, 0.0],   // born: invisible
  [255, 255, 200, 0.9],   // 10%: white-hot
  [255, 220, 80, 0.85],   // 25%: bright yellow
  [255, 160, 20, 0.7],    // 45%: orange
  [255, 80, 0, 0.5],      // 65%: deep orange
  [200, 30, 0, 0.25],     // 85%: dark red
  [120, 10, 0, 0.0],      // 100%: gone
];

function lerpColor(t: number): [number, number, number, number] {
  const steps = FIRE_GRADIENT.length - 1;
  const idx = t * steps;
  const lo = Math.floor(idx);
  const hi = Math.min(lo + 1, steps);
  const frac = idx - lo;

  return [
    FIRE_GRADIENT[lo][0] + (FIRE_GRADIENT[hi][0] - FIRE_GRADIENT[lo][0]) * frac,
    FIRE_GRADIENT[lo][1] + (FIRE_GRADIENT[hi][1] - FIRE_GRADIENT[lo][1]) * frac,
    FIRE_GRADIENT[lo][2] + (FIRE_GRADIENT[hi][2] - FIRE_GRADIENT[lo][2]) * frac,
    FIRE_GRADIENT[lo][3] + (FIRE_GRADIENT[hi][3] - FIRE_GRADIENT[lo][3]) * frac,
  ];
}

export function FlameBar({ children }: FlameBarProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const rafRef = useRef<number>(0);

  const emit = useCallback((w: number, h: number) => {
    const particles = particlesRef.current;
    // emit from bottom edge primarily
    const count = 3 + Math.floor(Math.random() * 3); // 3-5 per frame

    for (let i = 0; i < count; i++) {
      const edge = Math.random();
      let x: number;
      let y: number;
      let vx: number;
      let vy: number;

      if (edge < 0.55) {
        // bottom edge
        x = Math.random() * w;
        y = h;
        vx = (Math.random() - 0.5) * 0.8;
        vy = -(Math.random() * 1.5 + 1.0);
      } else if (edge < 0.72) {
        // top edge
        x = Math.random() * w;
        y = 0;
        vx = (Math.random() - 0.5) * 0.6;
        vy = -(Math.random() * 1.0 + 0.5);
      } else if (edge < 0.86) {
        // left edge
        x = 0;
        y = h * 0.2 + Math.random() * h * 0.8;
        vx = -(Math.random() * 0.5 + 0.3);
        vy = -(Math.random() * 1.2 + 0.5);
      } else {
        // right edge
        x = w;
        y = h * 0.2 + Math.random() * h * 0.8;
        vx = Math.random() * 0.5 + 0.3;
        vy = -(Math.random() * 1.2 + 0.5);
      }

      const maxLife = 30 + Math.random() * 30; // 30-60 frames (~0.5-1s)

      particles.push({
        x,
        y,
        vx,
        vy,
        life: 0,
        maxLife,
        size: Math.random() * 6 + 3,
      });
    }
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const rect = container.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      // extend canvas beyond container for flames that rise above
      const pad = 40;
      canvas.width = (rect.width + pad * 2) * dpr;
      canvas.height = (rect.height + pad * 2) * dpr;
      canvas.style.width = `${rect.width + pad * 2}px`;
      canvas.style.height = `${rect.height + pad * 2}px`;
      canvas.style.left = `${-pad}px`;
      canvas.style.top = `${-pad}px`;
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener("resize", resize);

    const loop = () => {
      const rect = container.getBoundingClientRect();
      const pad = 40;
      const w = rect.width;
      const h = rect.height;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // additive blending -- overlapping particles glow brighter
      ctx.globalCompositeOperation = "lighter";

      emit(w, h);

      const particles = particlesRef.current;
      const alive: Particle[] = [];

      for (const p of particles) {
        p.life++;
        const t = p.life / p.maxLife;
        if (t >= 1) continue;

        // physics: upward acceleration (hot gas), slight horizontal turbulence
        p.vy -= 0.02; // upward acceleration
        p.vx += (Math.random() - 0.5) * 0.15; // turbulence
        p.x += p.vx;
        p.y += p.vy;

        const [r, g, b, a] = lerpColor(t);
        const size = p.size * (1 - t * 0.5); // shrink as it ages

        // draw as soft radial gradient circle
        const grd = ctx.createRadialGradient(
          pad + p.x, pad + p.y, 0,
          pad + p.x, pad + p.y, size
        );
        grd.addColorStop(0, `rgba(${r|0},${g|0},${b|0},${a})`);
        grd.addColorStop(0.4, `rgba(${r|0},${g|0},${b|0},${a * 0.6})`);
        grd.addColorStop(1, `rgba(${r|0},${g|0},${b|0},0)`);

        ctx.fillStyle = grd;
        ctx.beginPath();
        ctx.arc(pad + p.x, pad + p.y, size, 0, Math.PI * 2);
        ctx.fill();

        alive.push(p);
      }

      particlesRef.current = alive;
      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [emit]);

  return (
    <div
      ref={containerRef}
      style={{
        position: "relative",
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          pointerEvents: "none",
          zIndex: 5,
        }}
      />
      <div style={{ position: "relative", zIndex: 6 }}>
        {children}
      </div>
    </div>
  );
}
