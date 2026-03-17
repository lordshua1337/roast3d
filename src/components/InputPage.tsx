import { useRef, useEffect } from "react";
import {
  Skull, Crosshair, PenLine, Check,
  Smartphone, Clapperboard, Flame,
} from "lucide-react";
import { Logo } from "./Logo";
import { FlameBar } from "./FlameBar";
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
        <Logo size="sm" flames />
        <span className="fm" style={{ fontSize: 11, color: "rgba(255,255,255,.2)", letterSpacing: 1 }}>
          Free &middot; Fast &middot; Unsparing
        </span>
      </div>
      <div style={{ maxWidth: 920, margin: "0 auto", padding: "48px 32px 80px", position: "relative", zIndex: 5 }}>
        <div style={{ display: "flex", gap: 56, alignItems: "center", flexWrap: "wrap" }}>
          <div style={{ flex: "1 1 420px", minWidth: 300 }}>
            <h1 className="fu" style={{ fontSize: "clamp(28px,5vw,46px)", lineHeight: 1.15, marginBottom: 20 }}>
              Your {tab === "lp" ? "landing page" : "ad"} is{" "}
              <span
                style={{
                  background: "linear-gradient(135deg,#FF3D00,#ff8a50,#ff6a00)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                embarrassing
              </span>
              <br />
              <span style={{ fontSize: "clamp(18px,3vw,28px)", color: "rgba(255,255,255,.35)" }}>
                Let AI prove it.
              </span>
            </h1>
            <p
              className="fb"
              style={{
                fontSize: 15,
                color: "rgba(255,255,255,.4)",
                lineHeight: 1.65,
                marginBottom: 32,
                maxWidth: 440,
              }}
            >
              Paste your URL. Get a brutally honest roast. Then fix it before your
              competitors screenshot it.
            </p>
            <div style={{ display: "flex", gap: 8, marginBottom: 24 }}>
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
                    padding: "12px 24px",
                    borderRadius: 12,
                    cursor: "pointer",
                    fontSize: 13,
                    border: tab === t.k ? "2px solid #FF3D00" : "2px solid rgba(255,255,255,.08)",
                    background: tab === t.k ? "rgba(255,61,0,.15)" : "transparent",
                    color: tab === t.k ? "#FF3D00" : "rgba(255,255,255,.35)",
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
            <FlameBar>
            <div
              style={{
                display: "flex",
                background: "#0a0a0a",
                border: "none",
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
            </FlameBar>
            {error && (
              <p className="fm" style={{ color: "#FF3D00", fontSize: 12, marginTop: 12 }}>
                {error}
              </p>
            )}
            {!error && (
              <p className="fm" style={{ fontSize: 11, color: "rgba(255,255,255,.15)", marginTop: 14 }}>
                No signup. No paywall. Just pain.
              </p>
            )}
          </div>
          {/* Hero illustration */}
          <div
            style={{
              flex: "0 0 280px",
              position: "relative",
              height: 460,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              src="/hero-phone.png"
              alt="Landing page getting roasted"
              style={{
                height: 420,
                width: "auto",
                borderRadius: 12,
                position: "relative",
                zIndex: 1,
              }}
            />
            {[
              { text: "DEAD", bg: "#e53e3e", t: 5, r: -12, rot: 6, d: 0, I: Skull },
              { text: "NO CTA", bg: "#f0d000", t: 80, r: -32, rot: -4, d: 0.6, dark: true, I: Crosshair },
              { text: "COPY", bg: "#4dc9f6", b: 45, r: -18, rot: 7, d: 1.1, dark: true, I: PenLine },
              { text: "PRO TIP", bg: "#48bb78", b: 2, l: 5, rot: -5, d: 1.6, dark: true, I: Check },
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
