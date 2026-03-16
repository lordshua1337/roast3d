import { useState, useEffect } from "react";
import { getGrade, getGradeColor } from "../utils/scoring";

interface RingProps {
  score: number;
  size?: number;
}

export function Ring({ score, size = 200 }: RingProps) {
  const [go, setGo] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setGo(true), 400);
    return () => clearTimeout(t);
  }, []);

  const grade = getGrade(score);
  const color = getGradeColor(grade);
  const r = (size - 20) / 2;
  const circ = 2 * Math.PI * r;

  return (
    <div style={{ position: "relative", width: size, height: size, flexShrink: 0 }}>
      <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#eee" strokeWidth="16" />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={color}
          strokeWidth="16"
          strokeLinecap="round"
          strokeDasharray={circ}
          strokeDashoffset={go ? circ - (score / 100) * circ : circ}
          style={{ transition: "stroke-dashoffset 2s cubic-bezier(.16,1,.3,1)" }}
        />
      </svg>
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span className="fd" style={{ fontSize: size * 0.42, color, lineHeight: 1 }}>
          {grade}
        </span>
        <span className="fm" style={{ fontSize: size * 0.085, color: "#999", marginTop: 6 }}>
          {score}/100
        </span>
      </div>
    </div>
  );
}
