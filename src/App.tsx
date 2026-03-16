import { useState, useCallback } from "react";
import { FullLoader } from "./components/FullLoader";
import { InputPage } from "./components/InputPage";
import { ReportPage } from "./components/ReportPage";
import { Roadmap } from "./components/Roadmap";
import { UpgradeModal } from "./components/UpgradeModal";
import { callRoastAPI } from "./utils/api";
import { LP_CATS, AD_CATS } from "./utils/constants";
import type { TabType, RoastResult } from "./types/roast";

export default function App() {
  const [tab, setTab] = useState<TabType>("lp");
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<RoastResult | null>(null);
  const [error, setError] = useState("");
  const [showUpgrade, setShowUpgrade] = useState(false);
  const [showRoadmap, setShowRoadmap] = useState(false);

  const cats = tab === "lp" ? LP_CATS : AD_CATS;

  const roast = useCallback(() => {
    if (!input.trim() || loading) return;
    setLoading(true);
    setError("");
    setResult(null);
    setShowRoadmap(false);

    callRoastAPI(tab, input.trim())
      .then((data) => setResult(data))
      .catch((e) => {
        console.error(e);
        setError(e.message + ". Try again.");
      })
      .finally(() => setLoading(false));
  }, [input, loading, tab]);

  const reset = () => {
    setResult(null);
    setError("");
    setInput("");
    setShowRoadmap(false);
  };

  return (
    <div>
      <style>{`
@import url('https://fonts.googleapis.com/css2?family=Permanent+Marker&family=Bebas+Neue&family=Chakra+Petch:wght@300;400;500;600;700&family=Fira+Code:wght@400;500;600;700&display=swap');
*{box-sizing:border-box;margin:0;padding:0}
body{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}
.fd{font-family:'Permanent Marker',cursive}
.fb2{font-family:'Bebas Neue',sans-serif}
.fu{font-family:'Chakra Petch',sans-serif;font-weight:600}
.fb{font-family:'Chakra Petch',sans-serif;font-weight:400}
.fm{font-family:'Fira Code',monospace;font-weight:500}
::selection{background:#FF3D00;color:#fff}
@keyframes fadeUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}
@keyframes flb{0%{transform:translateY(0)}100%{transform:translateY(-10px)}}
@keyframes bg{from{transform:scaleX(0)}to{transform:scaleX(1)}}
@keyframes fp{0%,100%{opacity:.85;filter:brightness(1)}50%{opacity:1;filter:brightness(1.4)}}
@keyframes blink{0%,100%{opacity:1}50%{opacity:0}}
      `}</style>

      {showUpgrade && <UpgradeModal onClose={() => setShowUpgrade(false)} />}
      {loading && <FullLoader mode={tab} />}

      {!loading && result && showRoadmap && (
        <Roadmap
          recs={result.recommendations || []}
          siteName={result.site_name || ""}
          onBack={() => setShowRoadmap(false)}
        />
      )}

      {!loading && !result && (
        <InputPage
          tab={tab}
          setTab={(t) => { setTab(t); setError(""); }}
          input={input}
          setInput={setInput}
          error={error}
          onRoast={roast}
        />
      )}

      {!loading && result && !showRoadmap && (
        <ReportPage
          result={result}
          cats={cats}
          onReset={reset}
          onUpgrade={() => setShowUpgrade(true)}
          onRoadmap={() => setShowRoadmap(true)}
        />
      )}
    </div>
  );
}
