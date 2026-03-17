interface LogoProps {
  size?: "sm" | "md" | "lg";
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

export function Logo({ size = "md", mode = "dark" }: LogoProps) {
  if (mode === "light") {
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

  const h = imgHeights[size] || 48;
  return (
    <img
      src="/logo.png"
      alt="ROAST3D"
      style={{
        height: h,
        width: "auto",
        display: "inline-block",
        borderRadius: 10,
      }}
    />
  );
}
