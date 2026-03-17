import { FlaskConical, ChevronRight, Lock } from "lucide-react";
import type { Recommendation } from "../types/roast";

interface RecommendationsSectionProps {
  recommendations: Recommendation[];
  onRoadmap: () => void;
  onUpgrade: () => void;
}

export function RecommendationsSection({ recommendations, onRoadmap, onUpgrade }: RecommendationsSectionProps) {
  return (
    <div style={{ marginBottom: 48, animation: "fadeUp .5s .4s cubic-bezier(.16,1,.3,1) both" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 20 }}>
        <h3 className="fd" style={{ fontSize: 24, color: "#111", display: "flex", alignItems: "center", gap: 10 }}>
          <FlaskConical size={22} />
          Recommendations
        </h3>
        <button
          onClick={onRoadmap}
          className="fu"
          style={{
            background: "none",
            border: "1px solid #ddd",
            padding: "8px 16px",
            borderRadius: 8,
            fontSize: 12,
            color: "#888",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: 5,
          }}
        >
          Roadmap <ChevronRight size={14} />
        </button>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        {recommendations.slice(0, 3).map((r, i) => (
          <div
            key={i}
            style={{
              gridColumn: i === 0 ? "span 2" : "span 1",
              background: "#fff",
              borderRadius: 14,
              padding: 24,
              border: "1px solid #eee",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12, marginBottom: 8 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span className="fd" style={{ fontSize: 22, color: "#ddd" }}>
                  {i + 1}
                </span>
                <p className="fu" style={{ fontSize: 15, color: "#222" }}>
                  {r.title}
                </p>
              </div>
              <span
                className="fm"
                style={{
                  fontSize: 9,
                  letterSpacing: 1.5,
                  textTransform: "uppercase",
                  flexShrink: 0,
                  padding: "4px 10px",
                  borderRadius: 4,
                  background: r.priority === "critical" ? "#fef2f2" : "#fffbeb",
                  color: r.priority === "critical" ? "#dc2626" : "#d97706",
                  border: `1px solid ${r.priority === "critical" ? "#fecaca" : "#fde68a"}`,
                }}
              >
                {r.priority}
              </span>
            </div>
            <p className="fb" style={{ fontSize: 13, color: "#888", lineHeight: 1.6 }}>
              {r.description}
            </p>
          </div>
        ))}
      </div>
      {recommendations.length > 3 && (
        <div style={{ position: "relative", marginTop: 10 }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 10,
              filter: "blur(4px)",
              opacity: 0.4,
              pointerEvents: "none",
            }}
          >
            {recommendations.slice(3, 7).map((r, i) => (
              <div key={i} style={{ background: "#fff", borderRadius: 14, padding: 24, border: "1px solid #eee" }}>
                <p className="fu" style={{ fontSize: 14, color: "#222", marginBottom: 4 }}>
                  {r.title}
                </p>
                <p className="fb" style={{ fontSize: 12, color: "#aaa" }}>
                  {(r.description || "").slice(0, 60)}...
                </p>
              </div>
            ))}
          </div>
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 12,
            }}
          >
            <p className="fu" style={{ fontSize: 16, color: "#111", display: "flex", alignItems: "center", gap: 6 }}>
              <Lock size={16} />
              {recommendations.length - 3} more recommendations
            </p>
            <button
              onClick={onUpgrade}
              className="fu"
              style={{
                background: "#FF3D00",
                border: "none",
                color: "#fff",
                padding: "14px 32px",
                borderRadius: 12,
                fontSize: 14,
                cursor: "pointer",
                boxShadow: "0 4px 16px rgba(255,61,0,.2)",
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              Unlock All <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
