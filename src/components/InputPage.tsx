import { useRef, useEffect } from "react";
import {
  Skull, Crosshair, PenLine, Check,
  Smartphone, Clapperboard, Flame,
} from "lucide-react";
import { Logo } from "./Logo";
import type { TabType } from "../types/roast";

interface InputPageProps {
  tab: TabType;
  setTab: (t: TabType) => void;
  input: string;
  setInput: (v: string) => void;
  error: string;
  onRoast: () => void;
}

export function InputPage({ tab, setTab, input, setInput, error, onRoast }: InputPageProps) {
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setTimeout(() => ref.current?.focus(), 60);
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#000",
        color: "#fff",
        fontFamily: "'Chakra Petch', sans-serif",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "-20%",
          left: "50%",
          transform: "translateX(-50%)",
          width: 700,
          height: 700,
          borderRadius: "50%",
          background: "radial-gradient(circle,rgba(255,61,0,.06),transparent 65%)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "20px 32px",
          position: "relative",
          zIndex: 10,
        }}
      >
        <Logo size="md" />
        <span className="fm" style={{ fontSize: 11, color: "rgba(255,255,255,.2)", letterSpacing: 1 }}>
          Free &middot; Fast &middot; Unsparing
        </span>
      </div>
      <div style={{ maxWidth: 920, margin: "0 auto", padding: "48px 32px 80px", position: "relative", zIndex: 5 }}>
        <div style={{ display: "flex", gap: 56, alignItems: "center", flexWrap: "wrap" }}>
          <div style={{ flex: "1 1 420px", minWidth: 300 }}>
            <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
              {[
                { k: "lp" as TabType, l: "Landing Page", I: Smartphone },
                { k: "ad" as TabType, l: "Ad Creative", I: Clapperboard },
              ].map((t) => (
                <button
                  key={t.k}
                  onClick={() => {
                    setTab(t.k);
                    setInput("");
                  }}
                  className="fu"
                  style={{
                    padding: "6px 18px",
                    borderRadius: 8,
                    cursor: "pointer",
                    fontSize: 11,
                    border: tab === t.k ? "1px solid rgba(255,61,0,.4)" : "1px solid rgba(255,255,255,.06)",
                    background: tab === t.k ? "rgba(255,61,0,.08)" : "transparent",
                    color: tab === t.k ? "rgba(255,61,0,.6)" : "rgba(255,255,255,.2)",
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                  }}
                >
                  <t.I size={14} />
                  {t.l}
                </button>
              ))}
            </div>
            <h1 className="fu" style={{ lineHeight: 0.95, marginBottom: 0 }}>
              <span style={{ fontSize: "clamp(28px,5vw,46px)", display: "block" }}>
                Your{" "}
                <span
                  style={{
                    background: "linear-gradient(135deg,#FF3D00,#ff8a50,#ff6a00)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {tab === "lp" ? "Landing Page" : "Ad"}
                </span>
              </span>
              <span
                style={{
                  fontSize: "clamp(72px,14vw,130px)",
                  display: "block",
                  letterSpacing: -2,
                  textTransform: "uppercase",
                }}
              >
                Sucks.
              </span>
            </h1>
            <p
              className="fd"
              style={{
                fontSize: "clamp(18px,3vw,26px)",
                fontStyle: "italic",
                color: "#fff",
                marginTop: 4,
                marginBottom: 12,
              }}
            >
              Let's Roast It
            </p>
            <p
              className="fb"
              style={{
                fontSize: 15,
                color: "rgba(255,255,255,.4)",
                lineHeight: 1.65,
                marginBottom: 20,
                maxWidth: 440,
              }}
            >
              Paste the URL. We'll prove it, then help you fix it — for free.
            </p>
            <div
              style={{
                display: "flex",
                background: "rgba(255,255,255,.03)",
                border: "2px solid rgba(255,255,255,.08)",
                borderRadius: 16,
                overflow: "hidden",
              }}
            >
              <input
                ref={ref}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") onRoast();
                }}
                placeholder={
                  tab === "lp"
                    ? "Paste your landing page URL..."
                    : "Paste ad URL or describe your ad..."
                }
                className="fm"
                style={{
                  flex: 1,
                  background: "transparent",
                  border: "none",
                  outline: "none",
                  color: "#fff",
                  fontSize: 14,
                  padding: "18px 20px",
                }}
              />
              <button
                onClick={onRoast}
                disabled={!input.trim()}
                className="fu"
                style={{
                  background: !input.trim()
                    ? "rgba(255,255,255,.04)"
                    : "linear-gradient(135deg,#FF3D00,#e63600)",
                  border: "none",
                  color: !input.trim() ? "rgba(255,255,255,.15)" : "#fff",
                  padding: "18px 36px",
                  margin: 6,
                  borderRadius: 12,
                  fontSize: 14,
                  cursor: !input.trim() ? "not-allowed" : "pointer",
                  whiteSpace: "nowrap",
                  boxShadow: input.trim() ? "0 4px 24px rgba(255,61,0,.35)" : "none",
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                }}
              >
                ROAST IT <Flame size={16} />
              </button>
            </div>
            {error && (
              <p className="fm" style={{ color: "#FF3D00", fontSize: 12, marginTop: 12 }}>
                {error}
              </p>
            )}
            {!error && (
              <p
                className="fm"
                style={{
                  fontSize: 11,
                  marginTop: 14,
                  background: "linear-gradient(135deg,#FF3D00,#ff8a50,#ff6a00)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  letterSpacing: 0.5,
                }}
              >
                No signup. No paywall. Just pain.
              </p>
            )}
          </div>
          {/* Hero illustration */}
          <div
            style={{
              flex: "0 0 340px",
              position: "relative",
              height: 520,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              src="/hero-phone.png"
              alt="Landing page getting roasted"
              style={{
                height: 480,
                width: "auto",
                borderRadius: 12,
                position: "relative",
                zIndex: 1,
              }}
            />
            {[
              { text: "KILL IT", bg: "#e53e3e", t: 30, r: 80, rot: 6, d: 0, I: Skull },
              { text: "CTA", bg: "#f0d000", t: 130, r: 50, rot: -4, d: 0.6, dark: true, I: Crosshair },
              { text: "COPY", bg: "#4dc9f6", b: 80, r: 60, rot: 7, d: 1.1, dark: true, I: PenLine },
              { text: "PRO TIP", bg: "#48bb78", b: 20, l: 60, rot: -5, d: 1.6, dark: true, I: Check },
            ].map((b, i) => (
              <div
                key={i}
                className="fu"
                style={{
                  position: "absolute",
                  top: b.t,
                  bottom: b.b,
                  right: b.r,
                  left: b.l,
                  transform: `rotate(${b.rot}deg)`,
                  background: b.bg,
                  borderRadius: 10,
                  padding: "6px 14px",
                  fontSize: 12,
                  color: b.dark ? "#000" : "#fff",
                  boxShadow: `0 4px 20px ${b.bg}55`,
                  animation: `flb 3s ease-in-out ${b.d}s infinite alternate`,
                  border: "2px solid rgba(255,255,255,.1)",
                  zIndex: 5,
                  whiteSpace: "nowrap",
                  display: "flex",
                  alignItems: "center",
                  gap: 5,
                }}
              >
                <b.I size={13} />
                {b.text}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
