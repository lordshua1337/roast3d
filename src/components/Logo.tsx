interface LogoProps {
  size?: "sm" | "md" | "lg";
}

const sizes = {
  sm: { fs: "20px", ls: 2 },
  md: { fs: "36px", ls: 3 },
  lg: { fs: "clamp(48px,10vw,72px)", ls: 4 },
};

export function Logo({ size = "md" }: LogoProps) {
  const s = sizes[size];
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
          "drop-shadow(0 0 8px rgba(255,69,0,.6)) drop-shadow(0 0 20px rgba(255,69,0,.3)) drop-shadow(0 2px 1px rgba(0,0,0,.8))",
        display: "inline-block",
        lineHeight: 1,
      }}
    >
      ROAST3D
    </span>
  );
}
