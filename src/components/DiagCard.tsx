import { getGradeColor } from "../utils/scoring";
import type { SubGrade } from "../types/roast";

interface DiagCardProps {
  label: string;
  Ic: React.ComponentType<{ size?: number; color?: string }>;
  grade: string;
  subs: SubGrade[];
  summary?: string;
  delay: number;
}

function gradeToPercent(grade: string): number {
  const map: Record<string, number> = {
    "A": 95, "B+": 85, "B": 77, "B-": 70,
    "C+": 63, "C": 55, "D": 40, "F": 20,
  };
  return map[grade] || 50;
}

function gradeAccentBg(grade: string): string {
  const map: Record<string, string> = {
    "A": "rgba(22,163,74,.06)",
    "B+": "rgba(34,197,94,.05)",
    "B": "rgba(202,138,4,.05)",
    "B-": "rgba(217,119,6,.05)",
    "C+": "rgba(234,88,12,.05)",
    "C": "rgba(220,38,38,.04)",
    "D": "rgba(185,28,28,.05)",
    "F": "rgba(153,27,27,.06)",
  };
  return map[grade] || "rgba(220,38,38,.04)";
}

export function DiagCard({ label, Ic, grade, subs, summary, delay }: DiagCardProps) {
  const color = getGradeColor(grade);

  return (
    <div
      style={{
        background: `linear-gradient(135deg, #fff 60%, ${gradeAccentBg(grade)})`,
        borderRadius: 16,
        padding: 24,
        border: "1px solid #eee",
        borderLeft: `3px solid ${color}`,
        animation: `fadeUp .4s ${delay}s cubic-bezier(.4,0,.2,1) both`,
        minWidth: 0,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: 8,
            background: `${color}12`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <Ic size={16} color={color} />
        </div>
        <span
          className="fu"
          style={{ fontSize: 12, color: "#555", letterSpacing: 1.5, textTransform: "uppercase" }}
        >
          {label}
        </span>
      </div>

      <span className="fd" style={{ fontSize: 52, color, lineHeight: 1, display: "block", marginBottom: 8 }}>
        {grade}
      </span>

      {summary && (
        <p className="fb" style={{ fontSize: 12, color: "#888", lineHeight: 1.5, marginBottom: 14 }}>
          {summary}
        </p>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: "auto" }}>
        {subs.map((sub, i) => {
          const sc = getGradeColor(sub.grade || "C");
          const pct = gradeToPercent(sub.grade || "C");
          return (
            <div key={i}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 4,
                }}
              >
                <span className="fb" style={{ fontSize: 11, color: "#777" }}>
                  {sub.label}
                </span>
                <span className="fd" style={{ fontSize: 16, color: sc }}>
                  {sub.grade || "?"}
                </span>
              </div>
              <div
                style={{
                  height: 3,
                  background: "#f0f0f0",
                  borderRadius: 2,
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    width: `${pct}%`,
                    background: sc,
                    borderRadius: 2,
                    transition: "width 1s cubic-bezier(.16,1,.3,1)",
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
