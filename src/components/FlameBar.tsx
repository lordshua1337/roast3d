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
      const rect = container.getBoundingClientRect();

      // spawn 2-3 flames per tick for density
      const count = Math.random() < 0.4 ? 3 : 2;
      for (let n = 0; n < count; n++) {
        const flame = document.createElement("span");

        // flames rise from the bottom edge primarily, some from sides
        const edge = Math.random();
        let x: number;
        let y: number;

        if (edge < 0.6) {
          // bottom edge -- most flames come from here
          x = Math.random() * rect.width;
          y = rect.height;
        } else if (edge < 0.75) {
          // top edge -- heat shimmer rising off the top
          x = Math.random() * rect.width;
          y = -4;
        } else if (edge < 0.88) {
          // left edge
          x = -4;
          y = rect.height * 0.3 + Math.random() * rect.height * 0.7;
        } else {
          // right edge
          x = rect.width + 4;
          y = rect.height * 0.3 + Math.random() * rect.height * 0.7;
        }

        const type = Math.random();
        const duration = Math.random() * 0.6 + 0.5;

        if (type < 0.45) {
          // tall flame tongues -- the main effect
          const w = Math.random() * 6 + 4;
          const h = Math.random() * 16 + 12;
          const hue = Math.random() * 30 + 10; // 10-40 (red to orange-yellow)
          const sat = 100;
          const light = Math.random() * 20 + 50; // 50-70%

          Object.assign(flame.style, {
            position: "absolute",
            left: `${x - w / 2}px`,
            top: `${y}px`,
            width: `${w}px`,
            height: `${h}px`,
            borderRadius: "50% 50% 20% 20%",
            background: `radial-gradient(ellipse at bottom, hsl(${hue},${sat}%,${light}%) 0%, hsl(${hue + 10},100%,${light - 15}%) 40%, transparent 100%)`,
            boxShadow: `0 0 ${w + 4}px rgba(255,${Math.floor(Math.random() * 40 + 40)},0,0.5)`,
            filter: `blur(${Math.random() * 1.5 + 0.5}px)`,
            pointerEvents: "none",
            zIndex: "5",
            opacity: "0",
          });
        } else if (type < 0.75) {
          // glowing embers -- small hot dots
          const s = Math.random() * 4 + 2;
          const hue = Math.random() * 25 + 20; // orange-yellow
          const light = Math.random() * 15 + 65; // bright 65-80%

          Object.assign(flame.style, {
            position: "absolute",
            left: `${x - s / 2}px`,
            top: `${y}px`,
            width: `${s}px`,
            height: `${s}px`,
            borderRadius: "50%",
            background: `hsl(${hue},100%,${light}%)`,
            boxShadow: `0 0 ${s * 3}px rgba(255,${Math.floor(Math.random() * 60 + 80)},0,0.7), 0 0 ${s * 6}px rgba(255,60,0,0.3)`,
            pointerEvents: "none",
            zIndex: "6",
            opacity: "0",
          });
        } else {
          // heat distortion wisps -- wide, soft, blurry
          const w = Math.random() * 14 + 8;
          const h = Math.random() * 10 + 6;

          Object.assign(flame.style, {
            position: "absolute",
            left: `${x - w / 2}px`,
            top: `${y}px`,
            width: `${w}px`,
            height: `${h}px`,
            borderRadius: "50%",
            background: `radial-gradient(circle, rgba(255,80,0,0.25), rgba(255,40,0,0.08), transparent)`,
            filter: `blur(${Math.random() * 3 + 2}px)`,
            pointerEvents: "none",
            zIndex: "4",
            opacity: "0",
          });
        }

        // flames rise upward with slight sway
        const driftX = (Math.random() - 0.5) * 24;
        const driftY = -(Math.random() * 30 + 15);
        const sway = (Math.random() - 0.5) * 12;
        flame.style.setProperty("--fx", `${driftX}px`);
        flame.style.setProperty("--fy", `${driftY}px`);
        flame.style.setProperty("--sx", `${sway}px`);
        flame.style.animation = `flame-rise ${duration}s ease-out forwards`;

        container.appendChild(flame);
        setTimeout(() => flame.remove(), duration * 1000);
      }
    }, 40);

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
        @keyframes flame-rise {
          0% {
            opacity: 0;
            transform: translateY(0) translateX(0) scaleY(1) scaleX(1);
          }
          10% {
            opacity: 0.8;
          }
          30% {
            opacity: 0.9;
            transform: translateY(calc(var(--fy, -20px) * 0.3)) translateX(var(--sx, 0px)) scaleY(1.1) scaleX(0.9);
          }
          60% {
            opacity: 0.5;
            transform: translateY(calc(var(--fy, -20px) * 0.7)) translateX(var(--fx, 0px)) scaleY(0.8) scaleX(0.7);
          }
          100% {
            opacity: 0;
            transform: translateY(var(--fy, -20px)) translateX(calc(var(--fx, 0px) + var(--sx, 0px))) scaleY(0.3) scaleX(0.4);
          }
        }
      `}</style>
      {children}
    </div>
  );
}
