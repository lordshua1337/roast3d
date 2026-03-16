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
  { t: "ok let me pull this up...", d: 1400 },
  { t: "page is loading... kinda slow honestly", d: 2000 },
  { t: "alright hero section is up. hmm.", d: 1800 },
  { t: "that headline... really? that's what we're going with?", d: 2200 },
  { t: "scrolling down... stock photo, stock photo, another stock photo", d: 2000 },
  { t: "looking for the CTA... where is it", d: 1800 },
  { t: "oh. oh no.", d: 1200 },
  { t: "checking the copy... reads like it was written in 10 minutes", d: 2200 },
  { t: 'any social proof? testimonials? ...nothing? cool cool', d: 2200 },
  { t: "let me check mobile real quick", d: 1600 },
  { t: "yep that's broken too", d: 1200 },
  { t: "ok i've seen enough. assembling the damage report...", d: 2000 },
];

export const AD_FLOW: FlowStep[] = [
  { t: "pulling up the ad...", d: 1400 },
  { t: "ok first impression -- would i stop scrolling for this?", d: 2200 },
  { t: "...no. no i would not.", d: 1400 },
  { t: "the creative looks like every other ad in this space", d: 2000 },
  { t: 'reading the copy... it\'s very "hello fellow humans"', d: 2200 },
  { t: "where's the offer? what am i even supposed to do here?", d: 2000 },
  { t: "checking if the hook makes sense for the audience...", d: 1800 },
  { t: "it does not.", d: 1000 },
  { t: "ok i've seen enough. let me put this together...", d: 2000 },
];
