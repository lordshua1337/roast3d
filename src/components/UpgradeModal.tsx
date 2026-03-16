import { Check, Flame } from "lucide-react";
import { Logo } from "./Logo";

interface UpgradeModalProps {
  onClose: () => void;
}

export function UpgradeModal({ onClose }: UpgradeModalProps) {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
      }}
      onClick={onClose}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(0,0,0,.75)",
          backdropFilter: "blur(8px)",
        }}
      />
      <div
        style={{
          position: "relative",
          background: "#fff",
          borderRadius: 28,
          maxWidth: 640,
          width: "100%",
          overflow: "hidden",
          animation: "fadeUp .4s cubic-bezier(.16,1,.3,1)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ background: "#0a0a0a", padding: "40px 40px 32px", textAlign: "center" }}>
          <Logo size="md" />
          <p
            className="fb"
            style={{ color: "rgba(255,255,255,.4)", fontSize: 15, marginTop: 10, lineHeight: 1.5 }}
          >
            You've seen the problems. Now get the full playbook.
          </p>
        </div>
        <div style={{ padding: "36px 36px 20px", display: "flex", gap: 20, flexWrap: "wrap" }}>
          {/* Single */}
          <div
            style={{
              flex: "1 1 220px",
              border: "2px solid #eee",
              borderRadius: 20,
              padding: 28,
              textAlign: "center",
            }}
          >
            <p
              className="fm"
              style={{ fontSize: 10, color: "#aaa", letterSpacing: 3, marginBottom: 12 }}
            >
              SINGLE ROAST PACK
            </p>
            <p style={{ display: "flex", alignItems: "baseline", justifyContent: "center", gap: 2 }}>
              <span className="fd" style={{ fontSize: 48, color: "#111" }}>
                $9
              </span>
              <span className="fb" style={{ fontSize: 14, color: "#999" }}>
                once
              </span>
            </p>
            <div
              style={{ width: 40, height: 2, background: "#eee", margin: "16px auto", borderRadius: 1 }}
            />
            <div style={{ textAlign: "left", marginBottom: 24 }}>
              {[
                "All 10 recommendations",
                "Downloadable PDF report",
                "Roast Roadmap checklist",
                "Priority email support",
              ].map((t, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    gap: 8,
                    padding: "8px 0",
                    borderBottom: "1px solid #f8f8f6",
                    alignItems: "center",
                  }}
                >
                  <Check size={14} color="#16a34a" />
                  <span className="fb" style={{ fontSize: 13, color: "#444" }}>
                    {t}
                  </span>
                </div>
              ))}
            </div>
            <button
              className="fu"
              style={{
                width: "100%",
                padding: 16,
                borderRadius: 14,
                border: "2px solid #111",
                background: "#fff",
                color: "#111",
                fontSize: 14,
                cursor: "pointer",
                transition: "all .15s",
              }}
              onMouseEnter={(e) => {
                const t = e.target as HTMLElement;
                t.style.background = "#111";
                t.style.color = "#fff";
              }}
              onMouseLeave={(e) => {
                const t = e.target as HTMLElement;
                t.style.background = "#fff";
                t.style.color = "#111";
              }}
            >
              Get This Report
            </button>
          </div>
          {/* Unlimited */}
          <div
            style={{
              flex: "1 1 220px",
              border: "2px solid #FF3D00",
              borderRadius: 20,
              padding: 28,
              textAlign: "center",
              position: "relative",
              overflow: "hidden",
              background: "linear-gradient(180deg,rgba(255,61,0,.02),transparent)",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 16,
                right: -24,
                background: "#FF3D00",
                color: "#fff",
                fontSize: 9,
                fontWeight: 700,
                padding: "5px 36px",
                transform: "rotate(35deg)",
                fontFamily: "'Chakra Petch'",
                letterSpacing: 2,
              }}
            >
              BEST DEAL
            </div>
            <p
              className="fm"
              style={{ fontSize: 10, color: "#FF3D00", letterSpacing: 3, marginBottom: 12 }}
            >
              UNLIMITED LIFETIME
            </p>
            <p style={{ display: "flex", alignItems: "baseline", justifyContent: "center", gap: 2 }}>
              <span className="fd" style={{ fontSize: 48, color: "#111" }}>
                $47
              </span>
              <span className="fb" style={{ fontSize: 14, color: "#999" }}>
                forever
              </span>
            </p>
            <div
              style={{
                width: 40,
                height: 2,
                background: "#FF3D0033",
                margin: "16px auto",
                borderRadius: 1,
              }}
            />
            <div style={{ textAlign: "left", marginBottom: 16 }}>
              {[
                "Unlimited roasts forever",
                "All recommendations unlocked",
                "PDF reports for every roast",
                "Roast Roadmap for every page",
                "Compare mode (coming soon)",
                "Priority roast processing",
              ].map((t, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    gap: 8,
                    padding: "8px 0",
                    borderBottom: "1px solid #f8f8f6",
                    alignItems: "center",
                  }}
                >
                  <Check size={14} color="#FF3D00" />
                  <span className="fb" style={{ fontSize: 13, color: "#444" }}>
                    {t}
                  </span>
                </div>
              ))}
            </div>
            <p
              className="fb"
              style={{
                fontSize: 13,
                color: "#999",
                fontStyle: "italic",
                marginBottom: 16,
                lineHeight: 1.5,
              }}
            >
              You know you have more websites.
              <br />
              Don't be afraid.
            </p>
            <button
              className="fu"
              style={{
                width: "100%",
                padding: 16,
                borderRadius: 14,
                border: "none",
                background: "#FF3D00",
                color: "#fff",
                fontSize: 15,
                cursor: "pointer",
                boxShadow: "0 4px 20px rgba(255,61,0,.3)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 6,
                transition: "all .15s",
              }}
              onMouseEnter={(e) => {
                (e.target as HTMLElement).style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLElement).style.transform = "translateY(0)";
              }}
            >
              Go Unlimited <Flame size={16} />
            </button>
          </div>
        </div>
        <div style={{ textAlign: "center", padding: "16px 36px 28px" }}>
          <button
            onClick={onClose}
            className="fm"
            style={{ background: "none", border: "none", color: "#ccc", fontSize: 12, cursor: "pointer" }}
          >
            i'll keep suffering, thanks
          </button>
        </div>
      </div>
    </div>
  );
}
