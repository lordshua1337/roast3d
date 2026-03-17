import { useEffect, useRef } from "react";

interface FlameBarProps {
  children: React.ReactNode;
}

export function FlameBar({ children }: FlameBarProps) {
  const wrapRef = useRef<HTMLDivElement>(null);

  // Slow, sparse particles -- always BEHIND the input
  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    const interval = setInterval(() => {
      const particle = document.createElement("span");
      const rect = wrap.getBoundingClientRect();

      // spawn from bottom edge only
      const x = Math.random() * rect.width;
      const y = rect.height + 4;
      const size = Math.random() * 4 + 2;
      const duration = Math.random() * 1.5 + 1.0;
      const hue = Math.random() * 30 + 15;
      const light = Math.random() * 20 + 55;

      Object.assign(particle.style, {
        position: "absolute",
        left: `${x}px`,
        top: `${y}px`,
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: "50%",
        background: `hsl(${hue}, 100%, ${light}%)`,
        boxShadow: `0 0 ${size * 2}px hsl(${hue}, 100%, ${light}%)`,
        pointerEvents: "none",
        zIndex: "1",
        opacity: "0",
        animation: `flame-float ${duration}s ease-out forwards`,
      });

      const driftX = (Math.random() - 0.5) * 20;
      const driftY = -(Math.random() * 35 + 20);
      particle.style.setProperty("--dx", `${driftX}px`);
      particle.style.setProperty("--dy", `${driftY}px`);

      wrap.appendChild(particle);
      setTimeout(() => particle.remove(), duration * 1000);
    }, 200); // slow -- one every 200ms

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      ref={wrapRef}
      className="flame-bar"
      style={{ position: "relative" }}
    >
      <style>{`
        .flame-bar::before {
          content: '';
          position: absolute;
          inset: -2px;
          border-radius: 18px;
          padding: 2px;
          background: linear-gradient(
            var(--flame-deg, 0deg),
            #ff3d00, #ff8a00, #ffb800, #ff6a00, #ff3d00
          );
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          opacity: 0.6;
          animation: flame-spin 3s linear infinite;
          z-index: 2;
        }

        .flame-bar::after {
          content: '';
          position: absolute;
          inset: -6px;
          border-radius: 22px;
          background: linear-gradient(
            var(--flame-deg, 0deg),
            transparent 30%,
            rgba(255,61,0,0.15) 45%,
            rgba(255,138,0,0.2) 50%,
            rgba(255,61,0,0.15) 55%,
            transparent 70%
          );
          filter: blur(8px);
          animation: flame-spin 3s linear infinite, flame-breathe 2s ease-in-out infinite;
          z-index: 0;
        }

        @property --flame-deg {
          syntax: '<angle>';
          initial-value: 0deg;
          inherits: false;
        }

        @keyframes flame-spin {
          to { --flame-deg: 360deg; }
        }

        @keyframes flame-breathe {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.7; }
        }

        @keyframes flame-float {
          0% { opacity: 0; transform: translate(0, 0) scale(1); }
          15% { opacity: 0.7; }
          100% { opacity: 0; transform: translate(var(--dx), var(--dy)) scale(0.3); }
        }
      `}</style>

      {/* Children (the input) sit above everything */}
      <div style={{ position: "relative", zIndex: 3 }}>
        {children}
      </div>
    </div>
  );
}
