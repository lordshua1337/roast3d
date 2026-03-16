import { useState } from "react";
import { ArrowLeft, Check } from "lucide-react";
import { Logo } from "./Logo";
import type { Recommendation } from "../types/roast";

interface RoadmapProps {
  recs: Recommendation[];
  siteName: string;
  onBack: () => void;
}

export function Roadmap({ recs, siteName, onBack }: RoadmapProps) {
  const [checked, setChecked] = useState<Record<number, boolean>>({});

  const toggle = (i: number) => {
    setChecked((prev) => ({ ...prev, [i]: !prev[i] }));
  };

  const done = Object.values(checked).filter(Boolean).length;

  return (
    <div style={{ background: "#f8f8f6", minHeight: "100vh", fontFamily: "'Chakra Petch', sans-serif" }}>
      <div
        style={{
          background: "#111",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "14px 28px",
        }}
      >
        <button
          onClick={onBack}
          className="fu"
          style={{
            background: "none",
            border: "none",
            color: "rgba(255,255,255,.5)",
            fontSize: 13,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: 6,
          }}
        >
          <ArrowLeft size={14} />
          Back
        </button>
        <Logo size="sm" />
        <div />
      </div>
      <div style={{ maxWidth: 700, margin: "0 auto", padding: "48px 28px 80px" }}>
        <p
          className="fm"
          style={{ fontSize: 11, color: "#999", letterSpacing: 3, marginBottom: 8, textTransform: "uppercase" }}
        >
          {siteName}
        </p>
        <h1 className="fd" style={{ fontSize: "clamp(28px,6vw,44px)", color: "#111", marginBottom: 4 }}>
          ROAST ROADMAP
        </h1>
        <div style={{ width: 60, height: 4, background: "#FF3D00", borderRadius: 2, marginBottom: 24 }} />
        <p className="fb" style={{ fontSize: 15, color: "#888", marginBottom: 32 }}>
          {done} of {recs.length} completed
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {recs.map((r, i) => (
            <div
              key={i}
              style={{
                background: "#fff",
                borderRadius: 14,
                padding: "20px 24px",
                border: "1px solid #eee",
                display: "flex",
                gap: 16,
                alignItems: "flex-start",
                opacity: checked[i] ? 0.5 : 1,
              }}
            >
              <div
                onClick={() => toggle(i)}
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: 8,
                  border: `2px solid ${checked[i] ? "#16a34a" : "#ddd"}`,
                  background: checked[i] ? "#16a34a" : "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  flexShrink: 0,
                  marginTop: 2,
                }}
              >
                {checked[i] && <Check size={16} color="#fff" />}
              </div>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                  <p
                    className="fu"
                    style={{
                      fontSize: 14,
                      color: checked[i] ? "#aaa" : "#222",
                      textDecoration: checked[i] ? "line-through" : "none",
                    }}
                  >
                    {r.title}
                  </p>
                  <span
                    className="fm"
                    style={{
                      fontSize: 9,
                      letterSpacing: 1,
                      textTransform: "uppercase",
                      padding: "2px 8px",
                      borderRadius: 4,
                      background:
                        r.priority === "critical"
                          ? "#fef2f2"
                          : r.priority === "high"
                            ? "#fffbeb"
                            : "#f9fafb",
                      color:
                        r.priority === "critical"
                          ? "#dc2626"
                          : r.priority === "high"
                            ? "#d97706"
                            : "#999",
                    }}
                  >
                    {r.priority}
                  </span>
                </div>
                <p className="fb" style={{ fontSize: 13, color: "#999", lineHeight: 1.5 }}>
                  {r.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
