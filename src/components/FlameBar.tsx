interface FlameBarProps {
  children: React.ReactNode;
}

export function FlameBar({ children }: FlameBarProps) {
  return (
    <div className="flame-bar-wrap">
      <style>{`
        .flame-bar-wrap {
          position: relative;
        }

        /* Subtle ambient glow -- just warmth, not a spotlight */
        .flame-bar-wrap::before {
          content: '';
          position: absolute;
          inset: -2px;
          border-radius: 18px;
          background: conic-gradient(
            from var(--flame-angle, 0deg),
            transparent 20%,
            rgba(255,61,0,0.15) 30%,
            rgba(255,150,0,0.2) 35%,
            rgba(255,61,0,0.15) 40%,
            transparent 50%,
            transparent 70%,
            rgba(255,80,0,0.12) 80%,
            rgba(255,120,0,0.18) 85%,
            rgba(255,80,0,0.12) 90%,
            transparent 100%
          );
          filter: blur(4px);
          z-index: -1;
          animation: flame-rotate 4s linear infinite;
        }

        /* Flame tongues container */
        .flame-tongue {
          position: absolute;
          bottom: -4px;
          z-index: 6;
          pointer-events: none;
          transform-origin: bottom center;
        }

        @property --flame-angle {
          syntax: '<angle>';
          initial-value: 0deg;
          inherits: false;
        }

        @keyframes flame-rotate {
          to { --flame-angle: 360deg; }
        }

        @keyframes flick-a {
          0%, 100% { height: 16px; opacity: 0.8; transform: scaleX(1) rotate(-2deg); }
          20% { height: 24px; opacity: 0.9; transform: scaleX(0.7) rotate(4deg); }
          40% { height: 12px; opacity: 0.6; transform: scaleX(1.2) rotate(-1deg); }
          60% { height: 28px; opacity: 0.95; transform: scaleX(0.6) rotate(5deg); }
          80% { height: 18px; opacity: 0.7; transform: scaleX(0.9) rotate(-3deg); }
        }

        @keyframes flick-b {
          0%, 100% { height: 12px; opacity: 0.7; transform: scaleX(0.9) rotate(1deg); }
          25% { height: 20px; opacity: 0.85; transform: scaleX(0.65) rotate(-3deg); }
          50% { height: 26px; opacity: 0.9; transform: scaleX(0.55) rotate(6deg); }
          75% { height: 14px; opacity: 0.6; transform: scaleX(1.1) rotate(-2deg); }
        }

        @keyframes flick-c {
          0%, 100% { height: 10px; opacity: 0.6; transform: scaleX(1) rotate(2deg); }
          30% { height: 22px; opacity: 0.85; transform: scaleX(0.7) rotate(-4deg); }
          55% { height: 16px; opacity: 0.75; transform: scaleX(0.85) rotate(3deg); }
          80% { height: 26px; opacity: 0.9; transform: scaleX(0.5) rotate(-5deg); }
        }
      `}</style>

      {/* Flame tongues -- tapered gradient shapes flickering up from bottom */}
      {[
        { pct: 8, w: 7, anim: "a", dur: 0.7, delay: 0 },
        { pct: 15, w: 5, anim: "b", dur: 0.9, delay: 0.1 },
        { pct: 22, w: 8, anim: "c", dur: 0.8, delay: 0.25 },
        { pct: 30, w: 6, anim: "a", dur: 1.0, delay: 0.15 },
        { pct: 38, w: 9, anim: "b", dur: 0.75, delay: 0.3 },
        { pct: 46, w: 5, anim: "c", dur: 0.85, delay: 0.05 },
        { pct: 54, w: 7, anim: "a", dur: 0.95, delay: 0.2 },
        { pct: 62, w: 8, anim: "b", dur: 0.7, delay: 0.35 },
        { pct: 70, w: 6, anim: "c", dur: 0.9, delay: 0.1 },
        { pct: 78, w: 9, anim: "a", dur: 0.8, delay: 0.25 },
        { pct: 85, w: 5, anim: "b", dur: 1.0, delay: 0.15 },
        { pct: 92, w: 7, anim: "c", dur: 0.75, delay: 0.3 },
      ].map((f, i) => (
        <span
          key={i}
          className="flame-tongue"
          style={{
            left: `${f.pct}%`,
            width: f.w,
            borderRadius: "50% 50% 20% 20%",
            background:
              f.anim === "a"
                ? "linear-gradient(to top, rgba(255,60,0,0.9), rgba(255,150,0,0.6), rgba(255,200,50,0.2), transparent)"
                : f.anim === "b"
                  ? "linear-gradient(to top, rgba(255,80,0,0.85), rgba(255,120,0,0.5), rgba(255,180,0,0.15), transparent)"
                  : "linear-gradient(to top, rgba(255,40,0,0.8), rgba(255,100,0,0.5), rgba(255,160,40,0.2), transparent)",
            animation: `flick-${f.anim} ${f.dur}s ease-in-out ${f.delay}s infinite`,
          }}
        />
      ))}

      {children}
    </div>
  );
}
