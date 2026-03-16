import { useEffect, useRef } from "react";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  flames?: boolean;
  mode?: "dark" | "light";
}

const imgHeights: Record<string, number> = {
  sm: 32,
  md: 48,
  lg: 72,
};

const textSizes: Record<string, { fs: string; ls: number }> = {
  sm: { fs: "20px", ls: 2 },
  md: { fs: "36px", ls: 3 },
  lg: { fs: "clamp(48px,10vw,72px)", ls: 4 },
};

function TextLogo({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const s = textSizes[size] || textSizes.md;
  return (
    <span
      style={{
        fontSize: s.fs,
        letterSpacing: s.ls,
        fontFamily: "'Permanent Marker', cursive",
        background:
          "linear-gradient(180deg,#ffd700 0%,#ff8c00 25%,#ff4500 50%,#cc2200 75%,#8b0000 100%)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        filter:
          "drop-shadow(0 0 4px rgba(255,69,0,.3)) drop-shadow(0 1px 1px rgba(0,0,0,.4))",
        display: "inline-block",
        lineHeight: 1,
      }}
    >
      ROAST3D
    </span>
  );
}

export function Logo({ size = "md", flames = false, mode = "dark" }: LogoProps) {
  const h = imgHeights[size] || 48;
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!flames || !containerRef.current) return;

    const container = containerRef.current;
    const interval = setInterval(() => {
      const particle = document.createElement("span");
      const type = Math.random();
      const startX = Math.random() * 80 + 10; // keep within logo bounds
      const duration = Math.random() * 1.5 + 0.6;
      const drift = (Math.random() - 0.5) * 30;

      if (type < 0.35) {
        // tiny bright embers -- these sit ON TOP of the logo
        const pSize = Math.random() * 3 + 1.5;
        Object.assign(particle.style, {
          position: "absolute",
          bottom: `${30 + Math.random() * 40}%`,
          left: `${startX}%`,
          width: `${pSize}px`,
          height: `${pSize}px`,
          borderRadius: "50%",
          background: `hsl(${Math.random() * 40 + 15}, 100%, ${Math.random() * 20 + 65}%)`,
          pointerEvents: "none",
          zIndex: "10",
          opacity: "0",
          animation: `ember-float ${duration}s ease-out forwards`,
          boxShadow: `0 0 ${pSize * 2}px rgba(255,${Math.floor(Math.random() * 80 + 100)},0,0.8)`,
        });
      } else if (type < 0.65) {
        // wispy smoke/heat distortion rising from letters
        const pSize = Math.random() * 12 + 6;
        Object.assign(particle.style, {
          position: "absolute",
          bottom: `${50 + Math.random() * 30}%`,
          left: `${startX}%`,
          width: `${pSize}px`,
          height: `${pSize * 1.5}px`,
          borderRadius: "50%",
          background: `radial-gradient(circle, rgba(255,${Math.floor(Math.random() * 60 + 40)},0,0.4), transparent)`,
          pointerEvents: "none",
          zIndex: "10",
          opacity: "0",
          animation: `heat-rise ${duration * 1.2}s ease-out forwards`,
          filter: `blur(${Math.random() * 3 + 1}px)`,
        });
      } else {
        // sparks that shoot upward and outward
        const pSize = Math.random() * 2 + 1;
        const sparkDrift = (Math.random() - 0.5) * 60;
        Object.assign(particle.style, {
          position: "absolute",
          bottom: `${40 + Math.random() * 20}%`,
          left: `${startX}%`,
          width: `${pSize}px`,
          height: `${pSize}px`,
          borderRadius: "50%",
          background: "#fff",
          pointerEvents: "none",
          zIndex: "10",
          opacity: "0",
          animation: `spark-fly ${duration * 0.7}s ease-out forwards`,
          boxShadow: `0 0 4px #ffd700, 0 0 8px rgba(255,69,0,0.6)`,
        });
        particle.style.setProperty("--spark-drift", `${sparkDrift}px`);
      }
      particle.style.setProperty("--drift", `${drift}px`);

      container.appendChild(particle);
      setTimeout(() => particle.remove(), duration * 1500);
    }, 60);

    return () => clearInterval(interval);
  }, [flames]);

  if (mode === "light") {
    return <TextLogo size={size} />;
  }

  if (!flames) {
    return (
      <img
        src="/logo.png"
        alt="ROAST3D"
        style={{ height: h, width: "auto", display: "inline-block" }}
      />
    );
  }

  return (
    <div
      ref={containerRef}
      style={{
        position: "relative",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <style>{`
        @keyframes ember-float {
          0% { opacity: 0; transform: translateY(0) translateX(0) scale(0.5); }
          15% { opacity: 1; }
          100% { opacity: 0; transform: translateY(-${h * 1.5}px) translateX(var(--drift, 0px)) scale(0.1); }
        }
        @keyframes heat-rise {
          0% { opacity: 0; transform: translateY(0) translateX(0) scale(0.8); }
          20% { opacity: 0.6; }
          100% { opacity: 0; transform: translateY(-${h * 0.8}px) translateX(var(--drift, 0px)) scale(1.5); }
        }
        @keyframes spark-fly {
          0% { opacity: 0; transform: translateY(0) translateX(0); }
          10% { opacity: 1; }
          100% { opacity: 0; transform: translateY(-${h * 2}px) translateX(var(--spark-drift, var(--drift, 0px))); }
        }
        @keyframes glow-pulse {
          0%, 100% { filter: drop-shadow(0 0 6px rgba(255,69,0,.4)) drop-shadow(0 0 16px rgba(255,69,0,.15)); }
          50% { filter: drop-shadow(0 0 10px rgba(255,69,0,.6)) drop-shadow(0 0 24px rgba(255,69,0,.3)); }
        }
      `}</style>
      <img
        src="/logo.png"
        alt="ROAST3D"
        style={{
          height: h,
          width: "auto",
          display: "block",
          position: "relative",
          zIndex: 2,
          animation: "glow-pulse 3s ease-in-out infinite",
        }}
      />
    </div>
  );
}
