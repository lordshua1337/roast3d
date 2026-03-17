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

        /* Animated fire glow around the whole input */
        .flame-bar-wrap::before {
          content: '';
          position: absolute;
          inset: -3px;
          border-radius: 18px;
          background: conic-gradient(
            from var(--flame-angle, 0deg),
            #ff3d00, #ff6a00, #ff9500, #ffb700,
            #ff9500, #ff6a00, #ff3d00, #cc2200,
            #ff3d00
          );
          opacity: 0.5;
          filter: blur(6px);
          z-index: -1;
          animation: flame-rotate 3s linear infinite, flame-pulse 2s ease-in-out infinite;
        }

        /* Inner glow layer */
        .flame-bar-wrap::after {
          content: '';
          position: absolute;
          inset: -1px;
          border-radius: 17px;
          background: conic-gradient(
            from var(--flame-angle2, 180deg),
            transparent 30%,
            rgba(255,61,0,0.3) 45%,
            rgba(255,150,0,0.4) 50%,
            rgba(255,61,0,0.3) 55%,
            transparent 70%
          );
          opacity: 0.7;
          filter: blur(2px);
          z-index: -1;
          animation: flame-rotate-reverse 2.5s linear infinite;
        }

        /* Flame tongues rising from bottom */
        .flame-bar-wrap .flame-tongue {
          position: absolute;
          bottom: -2px;
          width: 8px;
          height: 20px;
          border-radius: 50% 50% 20% 20%;
          z-index: -1;
          filter: blur(2px);
          transform-origin: bottom center;
        }

        @property --flame-angle {
          syntax: '<angle>';
          initial-value: 0deg;
          inherits: false;
        }

        @property --flame-angle2 {
          syntax: '<angle>';
          initial-value: 180deg;
          inherits: false;
        }

        @keyframes flame-rotate {
          to { --flame-angle: 360deg; }
        }

        @keyframes flame-rotate-reverse {
          to { --flame-angle2: -180deg; }
        }

        @keyframes flame-pulse {
          0%, 100% { opacity: 0.35; filter: blur(6px); }
          50% { opacity: 0.6; filter: blur(8px); }
        }

        @keyframes tongue-flicker-1 {
          0%, 100% { height: 14px; opacity: 0.7; transform: scaleX(1) rotate(-2deg); }
          25% { height: 22px; opacity: 0.9; transform: scaleX(0.8) rotate(3deg); }
          50% { height: 18px; opacity: 0.6; transform: scaleX(1.1) rotate(-1deg); }
          75% { height: 26px; opacity: 0.85; transform: scaleX(0.7) rotate(4deg); }
        }

        @keyframes tongue-flicker-2 {
          0%, 100% { height: 18px; opacity: 0.6; transform: scaleX(0.9) rotate(2deg); }
          30% { height: 28px; opacity: 0.8; transform: scaleX(0.7) rotate(-3deg); }
          60% { height: 12px; opacity: 0.5; transform: scaleX(1.2) rotate(1deg); }
          80% { height: 24px; opacity: 0.9; transform: scaleX(0.8) rotate(-4deg); }
        }

        @keyframes tongue-flicker-3 {
          0%, 100% { height: 10px; opacity: 0.5; transform: scaleX(1) rotate(1deg); }
          20% { height: 20px; opacity: 0.8; transform: scaleX(0.6) rotate(-2deg); }
          45% { height: 16px; opacity: 0.7; transform: scaleX(1.1) rotate(3deg); }
          70% { height: 24px; opacity: 0.85; transform: scaleX(0.7) rotate(-1deg); }
        }
      `}</style>

      {/* Flame tongues along bottom edge */}
      {[10, 18, 28, 38, 50, 60, 72, 85, 92].map((pct, i) => (
        <span
          key={i}
          className="flame-tongue"
          style={{
            left: `${pct}%`,
            width: 6 + (i % 3) * 3,
            background: `radial-gradient(ellipse at bottom, ${
              i % 3 === 0
                ? "rgba(255,180,0,0.8), rgba(255,80,0,0.4), transparent"
                : i % 3 === 1
                  ? "rgba(255,100,0,0.7), rgba(255,40,0,0.3), transparent"
                  : "rgba(255,200,50,0.6), rgba(255,100,0,0.3), transparent"
            })`,
            animation: `tongue-flicker-${(i % 3) + 1} ${0.8 + (i % 4) * 0.3}s ease-in-out ${i * 0.15}s infinite`,
          }}
        />
      ))}

      {children}
    </div>
  );
}
