import { useEffect, useRef } from "react";

interface FlameBarProps {
  children: React.ReactNode;
}

export function FlameBar({ children }: FlameBarProps) {
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    const interval = setInterval(() => {
      const particle = document.createElement("span");
      const rect = wrap.getBoundingClientRect();

      const x = Math.random() * rect.width;
      const y = rect.height + 4;
      const size = Math.random() * 3 + 1.5;
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
        zIndex: "-1",
        opacity: "0",
        animation: `flame-float ${duration}s ease-out forwards`,
      });

      const driftX = (Math.random() - 0.5) * 20;
      const driftY = -(Math.random() * 35 + 20);
      particle.style.setProperty("--dx", `${driftX}px`);
      particle.style.setProperty("--dy", `${driftY}px`);

      wrap.appendChild(particle);
      setTimeout(() => particle.remove(), duration * 1000);
    }, 250);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      ref={wrapRef}
      className="flame-bar"
      style={{ position: "relative", isolation: "isolate" }}
    >
      <style>{`
        .flame-bar::before {
          content: '';
          position: absolute;
          inset: -2px;
          border-radius: 18px;
          padding: 2px;
          background: linear-gradient(
            135deg,
            #ff3d00, #ff6a00, #ff8a00, #ffb800, #ff8a00, #ff6a00, #ff3d00
          );
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          animation: flame-pulse 2.5s ease-in-out infinite;
          z-index: 0;
        }

        .flame-bar::after {
          content: '';
          position: absolute;
          inset: -8px;
          border-radius: 24px;
          background: linear-gradient(
            135deg,
            rgba(255,61,0,0.12), rgba(255,138,0,0.08), rgba(255,61,0,0.12)
          );
          filter: blur(10px);
          animation: flame-pulse 2.5s ease-in-out infinite;
          z-index: -1;
        }

        @keyframes flame-pulse {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 0.85; }
        }

        @keyframes flame-float {
          0% { opacity: 0; transform: translate(0, 0) scale(1); }
          15% { opacity: 0.6; }
          100% { opacity: 0; transform: translate(var(--dx), var(--dy)) scale(0.3); }
        }
      `}</style>

      <div style={{ position: "relative", zIndex: 1 }}>
        {children}
      </div>
    </div>
  );
}
