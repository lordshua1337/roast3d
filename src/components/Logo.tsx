import { useEffect, useRef } from "react";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  flames?: boolean;
  mode?: "dark" | "light";
}

const imgHeights: Record<string, number> = {
  sm: 24,
  md: 40,
  lg: 64,
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
  const h = imgHeights[size] || 40;
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!flames || !containerRef.current) return;

    const container = containerRef.current;
    const interval = setInterval(() => {
      const particle = document.createElement("span");
      const isEmber = Math.random() > 0.4;
      const pSize = isEmber ? Math.random() * 4 + 2 : Math.random() * 6 + 3;
      const startX = Math.random() * 100;
      const drift = (Math.random() - 0.5) * 40;
      const duration = Math.random() * 1.2 + 0.8;

      Object.assign(particle.style, {
        position: "absolute",
        bottom: "20%",
        left: `${startX}%`,
        width: `${pSize}px`,
        height: `${pSize}px`,
        borderRadius: "50%",
        background: isEmber
          ? `hsl(${Math.random() * 30 + 10}, 100%, ${Math.random() * 30 + 50}%)`
          : `radial-gradient(circle, rgba(255,${Math.floor(Math.random() * 100 + 50)},0,0.9), transparent)`,
        pointerEvents: "none",
        zIndex: "1",
        animation: `particle-rise ${duration}s ease-out forwards`,
        filter: isEmber ? "none" : `blur(${Math.random() * 2}px)`,
      });
      particle.style.setProperty("--drift", `${drift}px`);

      container.appendChild(particle);
      setTimeout(() => particle.remove(), duration * 1000);
    }, 80);

    return () => clearInterval(interval);
  }, [flames]);

  // Light mode = Permanent Marker text logo (for light backgrounds like report)
  if (mode === "light") {
    return <TextLogo size={size} />;
  }

  // Dark mode = image logo (for dark backgrounds)
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
        display: "inline-block",
        padding: "16px 8px 8px",
      }}
    >
      <style>{`
        @keyframes particle-rise {
          0% { opacity: 1; transform: translateY(0) translateX(0) scale(1); }
          100% { opacity: 0; transform: translateY(-${h * 1.2}px) translateX(var(--drift, 0px)) scale(0.2); }
        }
        @keyframes glow-pulse {
          0%, 100% { filter: drop-shadow(0 0 8px rgba(255,69,0,.5)) drop-shadow(0 0 20px rgba(255,69,0,.2)); }
          50% { filter: drop-shadow(0 0 12px rgba(255,69,0,.7)) drop-shadow(0 0 30px rgba(255,69,0,.35)); }
        }
      `}</style>
      <img
        src="/logo.png"
        alt="ROAST3D"
        style={{
          height: h,
          width: "auto",
          display: "inline-block",
          position: "relative",
          zIndex: 2,
          animation: "glow-pulse 3s ease-in-out infinite",
        }}
      />
    </div>
  );
}
