import { useState, useEffect, useRef } from "react";
import { Logo } from "./Logo";
import { LP_FLOW, AD_FLOW } from "../utils/constants";
import type { TabType } from "../types/roast";

interface FullLoaderProps {
  mode: TabType;
}

export function FullLoader({ mode }: FullLoaderProps) {
  const [lines, setLines] = useState<string[]>([]);
  const flowRef = useRef(mode === "lp" ? LP_FLOW : AD_FLOW);
  const idxRef = useRef(0);

  useEffect(() => {
    const steps = flowRef.current;
    let timer: ReturnType<typeof setTimeout>;

    const next = () => {
      const i = idxRef.current;
      if (i >= steps.length) return;
      setLines((prev) => [...prev, steps[i].t]);
      idxRef.current = i + 1;
      if (i + 1 < steps.length) {
        timer = setTimeout(next, steps[i].d);
      }
    };

    timer = setTimeout(next, 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "#000",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          width: 600,
          height: 600,
          borderRadius: "50%",
          background: "radial-gradient(circle,rgba(255,61,0,.06),transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: 480,
          width: "100%",
          padding: "0 24px",
        }}
      >
        <div style={{ marginBottom: 40, textAlign: "center" }}>
          <Logo size="md" />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12, minHeight: 300 }}>
          {lines.map((line, i) => (
            <p
              key={i}
              className="fb"
              style={{
                fontSize: 16,
                color: i === lines.length - 1 ? "#fff" : "rgba(255,255,255,.25)",
                lineHeight: 1.5,
                animation: "fadeUp .4s cubic-bezier(.16,1,.3,1)",
                transition: "color .5s",
              }}
            >
              {line}
            </p>
          ))}
          {lines.length > 0 && lines.length < flowRef.current.length && (
            <span
              style={{
                display: "inline-block",
                width: 8,
                height: 18,
                background: "#FF3D00",
                animation: "blink 1s step-end infinite",
                marginTop: 4,
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
