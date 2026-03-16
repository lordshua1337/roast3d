import { useState } from "react";
import {
  ArrowLeft, Download, Lock, Copy, FileText,
  Flame, Skull, FlaskConical, ChevronRight, Swords,
  Target, TrendingUp, Type, Gauge, MonitorSmartphone,
} from "lucide-react";
import { Logo } from "./Logo";
import { Ring } from "./Ring";
import { DiagCard } from "./DiagCard";
import { getGrade, getGradeColor } from "../utils/scoring";
import { exportRoastPDF } from "../utils/export-pdf";
import type { RoastResult, CategoryDef } from "../types/roast";

interface ReportPageProps {
  result: RoastResult;
  cats: CategoryDef[];
  onReset: () => void;
  onUpgrade: () => void;
  onRoadmap: () => void;
}

function findWorst(categories: RoastResult["categories"], cats: CategoryDef[]): string | null {
  let worst: string | null = null;
  let worstScore = 999;
  for (const cat of cats) {
    const sc = categories?.[cat.key];
    if (sc && sc.score < worstScore) {
      worstScore = sc.score;
      worst = cat.key;
    }
  }
  return worst;
}

export function ReportPage({ result, cats, onReset, onUpgrade, onRoadmap }: ReportPageProps) {
  const [copied, setCopied] = useState(false);

  const s = result.overall_score;
  const grade = getGrade(s);
  const color = getGradeColor(grade);
  const diag = result.diagnostics || {};
  const worstKey = findWorst(result.categories, cats);

  const share = () => {
    const type = cats.length === 6 ? "landing page" : "ad";
    navigator.clipboard.writeText(
      `My ${type} got ROAST3D\nGrade: ${getGrade(s)} (${s}/100)\nVerdict: "${result.verdict_name}"\n"${result.one_liner}"`
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div style={{ background: "#f8f8f6", minHeight: "100vh", fontFamily: "'Chakra Petch', sans-serif", color: "#111" }}>
      {/* Sticky header */}
      <div
        style={{
          background: "#111",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "14px 28px",
          position: "sticky",
          top: 0,
          zIndex: 100,
        }}
      >
        <button
          onClick={onReset}
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
          New
        </button>
        <Logo size="sm" />
        <div style={{ display: "flex", gap: 8 }}>
          <button
            onClick={() => exportRoastPDF(result)}
            className="fu"
            style={{
              background: "none",
              border: "1px solid rgba(255,255,255,.15)",
              color: "rgba(255,255,255,.5)",
              padding: "8px 16px",
              borderRadius: 8,
              fontSize: 12,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 5,
            }}
          >
            <Download size={12} />
            PDF
          </button>
          <button
            onClick={onUpgrade}
            className="fu"
            style={{
              background: "#FF3D00",
              border: "none",
              color: "#fff",
              padding: "8px 20px",
              borderRadius: 8,
              fontSize: 12,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 5,
            }}
          >
            <Lock size={12} />
            Upgrade
          </button>
        </div>
      </div>

      <div style={{ maxWidth: 860, margin: "0 auto", padding: "48px 28px 80px" }}>
        {/* Title */}
        <div style={{ marginBottom: 32, animation: "fadeUp .5s cubic-bezier(.16,1,.3,1)" }}>
          <p className="fm" style={{ fontSize: 11, color: "#999", letterSpacing: 3, textTransform: "uppercase", marginBottom: 8 }}>
            {result.site_name} &middot; {result.vibe} energy
          </p>
          <h1 className="fd" style={{ fontSize: "clamp(32px,7vw,56px)", color: "#111", lineHeight: 1 }}>
            ROAST REPORT
          </h1>
          <div style={{ width: 80, height: 4, background: "#FF3D00", borderRadius: 2, marginTop: 8 }} />
        </div>

        {/* Diagnostics grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4,1fr)",
            gap: 12,
            marginBottom: 40,
            animation: "fadeUp .5s .05s cubic-bezier(.16,1,.3,1) both",
          }}
        >
          <DiagCard
            label="Conversion" Ic={TrendingUp}
            grade={diag.conversion?.grade || "C"}
            subs={diag.conversion?.subs || [{ label: "Funnel Clarity", grade: "C" }, { label: "CTA Strength", grade: "C" }, { label: "Value Prop", grade: "C" }]}
            delay={0.1}
          />
          <DiagCard
            label="Copy" Ic={Type}
            grade={diag.copy_clarity?.grade || "C"}
            subs={diag.copy_clarity?.subs || [{ label: "Reading Level", grade: "C" }, { label: "Message Match", grade: "C" }, { label: "Specificity", grade: "C" }]}
            delay={0.15}
          />
          <DiagCard
            label="Speed" Ic={Gauge}
            grade={diag.performance?.grade || "C"}
            subs={diag.performance?.subs || [{ label: "Load Speed", grade: "C" }, { label: "Asset Weight", grade: "C" }, { label: "Core Vitals", grade: "C" }]}
            delay={0.2}
          />
          <DiagCard
            label="Mobile" Ic={MonitorSmartphone}
            grade={diag.mobile?.grade || "C"}
            subs={diag.mobile?.subs || [{ label: "Responsive", grade: "C" }, { label: "Touch Targets", grade: "C" }, { label: "Viewport Fit", grade: "C" }]}
            delay={0.25}
          />
        </div>

        {/* Verdict with ring */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "auto 1fr",
            gap: 40,
            alignItems: "center",
            marginBottom: 48,
            animation: "fadeUp .5s .1s cubic-bezier(.16,1,.3,1) both",
          }}
        >
          <Ring score={s} size={200} />
          <div>
            <p className="fm" style={{ fontSize: 10, color: "#bbb", letterSpacing: 2, textTransform: "uppercase", marginBottom: 6 }}>
              VERDICT
            </p>
            <h2 className="fd" style={{ fontSize: "clamp(24px,4vw,36px)", color, lineHeight: 1.15, marginBottom: 12 }}>
              {result.verdict_name}
            </h2>
            <p className="fb" style={{ fontSize: 17, color: "#666", lineHeight: 1.6, fontStyle: "italic", maxWidth: 440 }}>
              "{result.one_liner}"
            </p>
          </div>
        </div>

        {/* Category breakdown */}
        <div style={{ marginBottom: 48, animation: "fadeUp .5s .15s cubic-bezier(.16,1,.3,1) both" }}>
          <h3 className="fd" style={{ fontSize: 24, color: "#111", marginBottom: 20, display: "flex", alignItems: "center", gap: 10 }}>
            <Skull size={22} />
            The Breakdown
          </h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            {cats.map((cat, i) => {
              const sc = result.categories?.[cat.key];
              const score = sc?.score ?? 50;
              const ro = sc?.roast ?? "";
              const co = getGradeColor(getGrade(score));
              const bulls = sc?.bullets ?? [];
              const isBig = i === 0 || i === 3;
              const isWorst = cat.key === worstKey;
              const CatIcon = cat.Ic;

              return (
                <div
                  key={cat.key}
                  style={{
                    gridColumn: isBig ? "span 2" : "span 1",
                    background: "#fff",
                    borderRadius: 16,
                    padding: isBig ? "28px 32px" : 24,
                    border: "1px solid #eee",
                    animation: `fadeUp .4s ${0.2 + i * 0.05}s cubic-bezier(.4,0,.2,1) both`,
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  {isWorst && (
                    <div style={{ position: "absolute", top: -8, right: -8, width: 64, height: 64, overflow: "hidden", zIndex: 2 }}>
                      <div
                        className="fu"
                        style={{
                          position: "absolute",
                          top: 14,
                          right: -14,
                          background: "#FF3D00",
                          color: "#fff",
                          fontSize: 10,
                          padding: "3px 24px",
                          transform: "rotate(45deg)",
                          letterSpacing: 2,
                          boxShadow: "0 2px 8px rgba(255,61,0,.4)",
                        }}
                      >
                        LOL
                      </div>
                    </div>
                  )}
                  <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16, marginBottom: 10 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <CatIcon size={isBig ? 20 : 16} color="#555" />
                      <span className="fd" style={{ fontSize: isBig ? 22 : 18, color: "#111" }}>
                        {cat.label}
                      </span>
                    </div>
                    <span className="fd" style={{ fontSize: isBig ? 48 : 36, color: co, lineHeight: 1, flexShrink: 0 }}>
                      {score}
                    </span>
                  </div>
                  <div style={{ height: 4, background: "#f0f0f0", borderRadius: 2, overflow: "hidden", marginBottom: 14 }}>
                    <div
                      style={{
                        height: "100%",
                        width: `${score}%`,
                        background: co,
                        borderRadius: 2,
                        transformOrigin: "left",
                        animation: `bg 1s ${0.25 + i * 0.06}s cubic-bezier(.16,1,.3,1) both`,
                      }}
                    />
                  </div>
                  <p className="fb" style={{ fontSize: 14, color: "#666", lineHeight: 1.7, marginBottom: bulls.length ? 12 : 0 }}>
                    {ro}
                  </p>
                  {bulls.length > 0 && (
                    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                      {bulls.map((b, j) => (
                        <div key={j} style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                          <span style={{ color: co, fontSize: 14, lineHeight: 1.5, flexShrink: 0 }}>&#9656;</span>
                          <span className="fm" style={{ fontSize: 12, color: "#888", lineHeight: 1.5 }}>
                            {b}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Hot take */}
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
          {result.potential && (
            <p className="fb" style={{ fontSize: 17, color: "rgba(255,255,255,.45)", lineHeight: 1.7, marginBottom: 20, maxWidth: 600 }}>
              {result.potential}
            </p>
          )}
          <p className="fb" style={{ fontSize: 20, color: "rgba(255,255,255,.9)", lineHeight: 1.75, maxWidth: 640 }}>
            {result.hot_take}
          </p>
        </div>

        {/* Recommendations */}
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
            {(result.recommendations || []).slice(0, 3).map((r, i) => (
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
          {(result.recommendations || []).length > 3 && (
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
                {(result.recommendations || []).slice(3, 7).map((r, i) => (
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
                  {(result.recommendations || []).length - 3} more recommendations
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

        {/* Compare mode teaser */}
        <div style={{ background: "#fff", borderRadius: 18, padding: 32, border: "2px dashed #ddd", textAlign: "center", marginBottom: 48 }}>
          <Swords size={28} color="#999" style={{ margin: "0 auto 8px" }} />
          <p className="fu" style={{ fontSize: 16, color: "#333", marginBottom: 4 }}>
            Compare Mode -- coming soon
          </p>
          <p className="fb" style={{ fontSize: 13, color: "#999" }}>
            Roast a competitor's page. See side-by-side.
          </p>
        </div>

        {/* Bottom actions */}
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", paddingTop: 32, borderTop: "2px solid #eee" }}>
          <button
            onClick={() => exportRoastPDF(result)}
            className="fu"
            style={{
              background: "#111",
              border: "none",
              color: "#fff",
              padding: "16px 40px",
              borderRadius: 14,
              fontSize: 14,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            <Download size={16} />
            Export PDF
          </button>
          <button
            onClick={share}
            className="fu"
            style={{
              background: "#FF3D00",
              border: "none",
              color: "#fff",
              padding: "16px 40px",
              borderRadius: 14,
              fontSize: 14,
              cursor: "pointer",
              boxShadow: "0 4px 20px rgba(255,61,0,.2)",
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            <Copy size={16} />
            {copied ? "Copied!" : "Share"}
          </button>
          <button
            onClick={onRoadmap}
            className="fu"
            style={{
              background: "#fff",
              border: "2px solid #ddd",
              color: "#555",
              padding: "16px 40px",
              borderRadius: 14,
              fontSize: 14,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            <FileText size={16} />
            Roadmap
          </button>
          <button
            onClick={onReset}
            className="fu"
            style={{
              background: "#fff",
              border: "2px solid #ddd",
              color: "#888",
              padding: "16px 40px",
              borderRadius: 14,
              fontSize: 14,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            <Flame size={16} />
            Again
          </button>
        </div>
        <p className="fm" style={{ textAlign: "center", padding: "24px 0", fontSize: 12, color: "#ccc" }}>
          Your bounce rate has a better exit strategy than most CEOs.
        </p>
      </div>
    </div>
  );
}
