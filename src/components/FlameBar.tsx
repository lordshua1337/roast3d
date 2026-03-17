import { useEffect, useRef } from "react";

interface FlameBarProps {
  children: React.ReactNode;
}

export function FlameBar({ children }: FlameBarProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const interval = setInterval(() => {
      const particle = document.createElement("span");
      const rect = container.getBoundingClientRect();
      const edge = Math.random();
      const duration = Math.random() * 0.8 + 0.4;
      const pSize = Math.random() * 4 + 2;

      let x: number;
      let y: number;

      if (edge < 0.45) {
        // top edge
        x = Math.random() * rect.width;
        y = -2;
      } else if (edge < 0.65) {
        // left edge
        x = -2;
        y = Math.random() * rect.height;
      } else if (edge < 0.85) {
        // right edge
        x = rect.width + 2;
        y = Math.random() * rect.height;
      } else {
        // bottom edge
        x = Math.random() * rect.width;
        y = rect.height + 2;
      }

      const hue = Math.random() * 40 + 10;
      const lightness = Math.random() * 25 + 55;

      Object.assign(particle.style, {
        position: "absolute",
        left: `${x}px`,
        top: `${y}px`,
        width: `${pSize}px`,
        height: `${pSize}px`,
        borderRadius: "50%",
        background: `hsl(${hue}, 100%, ${lightness}%)`,
        boxShadow: `0 0 ${pSize * 2}px rgba(255,${Math.floor(Math.random() * 60 + 60)},0,0.6)`,
        pointerEvents: "none",
        zIndex: "5",
        opacity: "0",
        animation: `flame-edge ${duration}s ease-out forwards`,
      });

      // drift upward and slightly outward
      const driftX = (Math.random() - 0.5) * 16;
      const driftY = -(Math.random() * 20 + 10);
      particle.style.setProperty("--fx", `${driftX}px`);
      particle.style.setProperty("--fy", `${driftY}px`);

      container.appendChild(particle);
      setTimeout(() => particle.remove(), duration * 1000);
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: "relative",
        overflow: "visible",
      }}
    >
      <style>{`
        @keyframes flame-edge {
          0% { opacity: 0; transform: translate(0, 0) scale(1); }
          20% { opacity: 0.9; }
          100% { opacity: 0; transform: translate(var(--fx, 0px), var(--fy, -15px)) scale(0.1); }
        }
      `}</style>
      {children}
    </div>
  );
}
