import { getGradeColor } from "../utils/scoring";
import type { SubGrade } from "../types/roast";

interface DiagCardProps {
  label: string;
  Ic: React.ComponentType<{ size?: number; color?: string }>;
  grade: string;
  subs: SubGrade[];
  delay: number;
}

export function DiagCard({ label, Ic, grade, subs, delay }: DiagCardProps) {
  const color = getGradeColor(grade);

  return (
    <div
      style={{
        background: "#fff",
        borderRadius: 16,
        padding: 24,
        border: "1px solid #eee",
        animation: `fadeUp .4s ${delay}s cubic-bezier(.4,0,.2,1) both`,
        minWidth: 0,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
        <Ic size={18} color="#888" />
        <span
          className="fm"
          style={{ fontSize: 10, color: "#aaa", letterSpacing: 2, textTransform: "uppercase" }}
        >
          {label}
        </span>
      </div>
      <span className="fd" style={{ fontSize: 48, color, lineHeight: 1, display: "block", marginBottom: 16 }}>
        {grade}
      </span>
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        {subs.map((sub, i) => {
          const sc = getGradeColor(sub.grade || "C");
          return (
            <div
              key={i}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "6px 0",
                borderTop: "1px solid #f5f5f5",
              }}
            >
              <span className="fb" style={{ fontSize: 12, color: "#888" }}>
                {sub.label}
              </span>
              <span className="fd" style={{ fontSize: 18, color: sc }}>
                {sub.grade || "?"}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
