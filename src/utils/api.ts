import type { TabType, RoastResult } from "../types/roast";

function buildPrompt(tab: TabType, input: string): string {
  const type = tab === "lp" ? "landing page" : "ad";
  const ck = tab === "lp"
    ? "headline,cta,design,copy,trust,ux"
    : "hook,creative,copy,offer,targeting_fit";

  const catExamples = ck
    .split(",")
    .map((k) => `"${k}":{"score":50,"roast":"2 savage sentences","bullets":["issue 1","issue 2","issue 3"]}`)
    .join(",");

  return `You're a brutal but hilarious marketing critic. Roast this ${type}: ${input}

Return ONLY valid JSON:
{"site_name":"brand","one_liner":"20 word max punchline","verdict_name":"funny 3-7 word verdict","overall_score":50,"diagnostics":{"conversion":{"grade":"C","subs":[{"label":"Funnel Clarity","grade":"D"},{"label":"CTA Strength","grade":"C"},{"label":"Value Prop","grade":"B"}]},"copy_clarity":{"grade":"D","subs":[{"label":"Reading Level","grade":"C"},{"label":"Message Match","grade":"F"},{"label":"Specificity","grade":"D"}]},"performance":{"grade":"B","subs":[{"label":"Load Speed","grade":"B"},{"label":"Asset Weight","grade":"C"},{"label":"Core Vitals","grade":"B"}]},"mobile":{"grade":"F","subs":[{"label":"Responsive","grade":"F"},{"label":"Touch Targets","grade":"D"},{"label":"Viewport Fit","grade":"F"}]}},"categories":{${catExamples}},"hot_take":"3 sentences. Dead serious.","vibe":"one word","potential":"2 sentences about why this business has potential.","recommendations":[{"title":"rec","description":"2-3 sentences","priority":"critical"},{"title":"","description":"","priority":"critical"},{"title":"","description":"","priority":"critical"},{"title":"","description":"","priority":"high"},{"title":"","description":"","priority":"high"},{"title":"","description":"","priority":"high"},{"title":"","description":"","priority":"medium"},{"title":"","description":"","priority":"medium"},{"title":"","description":"","priority":"medium"},{"title":"","description":"","priority":"low"}]}`;
}

export async function callRoastAPI(tab: TabType, input: string): Promise<RoastResult> {
  const response = await fetch("/api/roast", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt: buildPrompt(tab, input) }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || `API error ${response.status}`);
  }

  const data = await response.json();
  return data as RoastResult;
}
