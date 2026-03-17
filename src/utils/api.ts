import type { TabType, RoastResult } from "../types/roast";

function buildPrompt(tab: TabType, input: string): string {
  const type = tab === "lp" ? "landing page" : "ad";
  const ck = tab === "lp"
    ? "headline,cta,design,copy,trust,ux"
    : "hook,creative,copy,offer,targeting_fit";

  const catExamples = ck
    .split(",")
    .map((k) => `"${k}":{"score":50,"roast":"Full paragraph roast. Be brutal. Assume negative reviews exist. Poke at insecurities. Examine what Russell Brunson would check: headlines, CTAs, above-the-fold content, social proof, urgency, specificity, value ladder positioning.","bullets":["specific issue 1","specific issue 2","specific issue 3","specific issue 4","specific issue 5"]}`)
    .join(",");

  return `You're a brutal, hilarious marketing critic who assumes every company has complaints they're self-conscious about. Roast this ${type}: ${input}

Be savage. Be specific. Assume bad reviews exist. Poke at their insecurities. Examine everything Russell Brunson would check: buttons, CTAs, headlines, bullets, above-the-fold content, social proof, urgency, specificity, value ladder positioning.

Each category roast must be a FULL PARAGRAPH (4-6 sentences minimum). Each category gets 5 specific bullet points.

The roast_paragraph is a full brutal paragraph for the overall verdict -- take digs, assume complaints exist, poke insecurities ("no wonder your reviews mention..." style).

Return ONLY valid JSON:
{"site_name":"brand","one_liner":"20 word max punchline","verdict_name":"funny 3-7 word verdict","overall_score":50,"roast_paragraph":"Full brutal paragraph. 4-6 sentences. Take digs at the business. Assume they have complaints they're self-conscious about. Be specific to what you see on their page. Make it personal.","diagnostics":{"conversion":{"grade":"C","summary":"One punchy sentence about their conversion game","subs":[{"label":"Funnel Clarity","grade":"D"},{"label":"CTA Strength","grade":"C"},{"label":"Value Prop","grade":"B"}]},"copy_clarity":{"grade":"D","summary":"One punchy sentence about their copy","subs":[{"label":"Reading Level","grade":"C"},{"label":"Message Match","grade":"F"},{"label":"Specificity","grade":"D"}]},"performance":{"grade":"B","summary":"One punchy sentence about speed","subs":[{"label":"Load Speed","grade":"B"},{"label":"Asset Weight","grade":"C"},{"label":"Core Vitals","grade":"B"}]},"mobile":{"grade":"F","summary":"One punchy sentence about mobile","subs":[{"label":"Responsive","grade":"F"},{"label":"Touch Targets","grade":"D"},{"label":"Viewport Fit","grade":"F"}]}},"categories":{${catExamples}},"hot_take":"3 sentences. Dead serious.","vibe":"one word","potential":"2 sentences about why this business has potential.","recommendations":[{"title":"rec","description":"2-3 sentences","priority":"critical"},{"title":"","description":"","priority":"critical"},{"title":"","description":"","priority":"critical"},{"title":"","description":"","priority":"high"},{"title":"","description":"","priority":"high"},{"title":"","description":"","priority":"high"},{"title":"","description":"","priority":"medium"},{"title":"","description":"","priority":"medium"},{"title":"","description":"","priority":"medium"},{"title":"","description":"","priority":"low"}]}`;
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
