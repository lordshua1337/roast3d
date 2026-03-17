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
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
        <Target size={24} color="#FF3D00" />
        <span className="fm" style={{ fontSize: 10, color: "rgba(255,255,255,.6)", letterSpacing: 4, textTransform: "uppercase" }}>
          THE ONE THING THAT MATTERS
        </span>
      </div>
      <h3
        className="fb2"
        style={{ fontSize: "clamp(36px,7vw,56px)", color: "#fff", lineHeight: 1.05, marginBottom: 24, letterSpacing: 1 }}
      >
        IF YOU FIX NOTHING ELSE, FIX THIS.
      </h3>
      {potential && (
        <p className="fb" style={{ fontSize: 17, color: "rgba(255,255,255,.45)", lineHeight: 1.7, marginBottom: 20, maxWidth: 600 }}>
          {potential}
        </p>
      )}
      <p className="fb" style={{ fontSize: 20, color: "rgba(255,255,255,.9)", lineHeight: 1.75, maxWidth: 640 }}>
        {hotTake}
      </p>
    </div>
  );
}
