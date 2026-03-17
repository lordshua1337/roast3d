import { Target } from "lucide-react";

interface HotTakeSectionProps {
  hotTake: string;
  potential?: string;
}

export function HotTakeSection({ hotTake, potential }: HotTakeSectionProps) {
  return (
    <div
      style={{
        marginBottom: 48,
        padding: "48px 44px",
        borderRadius: 24,
        background: "#0a0a0a",
        color: "#fff",
        position: "relative",
        overflow: "hidden",
        animation: "fadeUp .5s .3s cubic-bezier(.16,1,.3,1) both",
      }}
    >
      <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: 5, background: "linear-gradient(90deg,#FF3D00,#ff8a50,#ff6a00,#FF3D00)" }} />
      <div
        style={{
          position: "absolute",
          bottom: "-30%",
          right: "-10%",
          width: 400,
          height: 400,
          borderRadius: "50%",
          background: "radial-gradient(circle,rgba(255,61,0,.06),transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* Eyebrow -- small and muted */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
        <Target size={18} color="#FF3D00" />
        <span className="fm" style={{ fontSize: 10, color: "rgba(255,255,255,.4)", letterSpacing: 4, textTransform: "uppercase" }}>
          THE ONE THING THAT MATTERS
        </span>
      </div>

      {/* Big headline -- dominates, premium feel */}
      <h3
        className="fu"
        style={{ fontSize: "clamp(32px,6vw,52px)", color: "#fff", lineHeight: 1.05, marginBottom: 28, fontWeight: 700, letterSpacing: 0.5 }}
      >
        IF YOU FIX NOTHING ELSE, FIX THIS.
      </h3>

      {/* Potential -- subordinate, lighter */}
      {potential && (
        <p className="fb" style={{ fontSize: 15, color: "rgba(255,255,255,.35)", lineHeight: 1.7, marginBottom: 20, maxWidth: 600 }}>
          {potential}
        </p>
      )}

      {/* Hot take -- main body, brighter and larger */}
      <p className="fb" style={{ fontSize: 20, color: "rgba(255,255,255,.9)", lineHeight: 1.75, maxWidth: 640 }}>
        {hotTake}
      </p>
    </div>
  );
}
