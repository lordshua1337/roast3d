import {
  Skull, Crosshair, Eye, PenLine, ShieldOff, FlaskConical,
  Clapperboard, Bomb, Target, Zap,
} from "lucide-react";
import type { CategoryDef, FlowStep } from "../types/roast";

export const LP_CATS: CategoryDef[] = [
  { key: "headline", label: "HEADLINE", Ic: Zap },
  { key: "cta", label: "CTA", Ic: Crosshair },
  { key: "design", label: "DESIGN", Ic: Eye },
  { key: "copy", label: "COPY", Ic: PenLine },
  { key: "trust", label: "TRUST", Ic: ShieldOff },
  { key: "ux", label: "UX", Ic: FlaskConical },
];

export const AD_CATS: CategoryDef[] = [
  { key: "hook", label: "HOOK", Ic: Skull },
  { key: "creative", label: "CREATIVE", Ic: Clapperboard },
  { key: "copy", label: "COPY", Ic: PenLine },
  { key: "offer", label: "OFFER", Ic: Bomb },
  { key: "targeting_fit", label: "FIT", Ic: Target },
];

export const LP_FLOW: FlowStep[] = [
  { t: "ok pulling this up...", d: 1400 },
  { t: "alright page loaded.. let me look at this", d: 2200 },
  { t: "checking mobile real quick...", d: 1800 },
  { t: "lol.. ok let me read the headline", d: 2000 },
  { t: "ok dunno what they were doing there.. let me scroll..", d: 2400 },
  { t: "hmm.. interesting choice with the CTA", d: 2000 },
  { t: "ok let me check the trust signals...", d: 1800 },
  { t: "yikes.. ok one sec", d: 1400 },
  { t: "checking a few more things hold on", d: 2200 },
  { t: "alright putting this together...", d: 2000 },
];

export const AD_FLOW: FlowStep[] = [
  { t: "pulling up the ad...", d: 1400 },
  { t: "ok first impression.. let me sit with this for a sec", d: 2200 },
  { t: "reading the copy now...", d: 1800 },
  { t: "hmm ok.. looking at the creative", d: 2000 },
  { t: "checking the hook against the audience...", d: 2200 },
  { t: "interesting.. ok what about the offer", d: 2000 },
  { t: "wait let me look at that again", d: 1600 },
  { t: "ok yeah.. alright putting this together...", d: 2200 },
];
