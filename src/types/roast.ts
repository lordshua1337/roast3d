export interface SubGrade {
  label: string;
  grade: string;
}

export interface DiagnosticCategory {
  grade: string;
  subs: SubGrade[];
}

export interface Diagnostics {
  conversion: DiagnosticCategory;
  copy_clarity: DiagnosticCategory;
  performance: DiagnosticCategory;
  mobile: DiagnosticCategory;
}

export interface CategoryScore {
  score: number;
  roast: string;
  bullets: string[];
}

export interface Recommendation {
  title: string;
  description: string;
  priority: "critical" | "high" | "medium" | "low";
}

export interface RoastResult {
  site_name: string;
  one_liner: string;
  verdict_name: string;
  overall_score: number;
  diagnostics: Diagnostics;
  categories: Record<string, CategoryScore>;
  hot_take: string;
  vibe: string;
  potential: string;
  recommendations: Recommendation[];
}

export interface CategoryDef {
  key: string;
  label: string;
  Ic: React.ComponentType<{ size?: number; color?: string }>;
}

export type TabType = "lp" | "ad";

export interface FlowStep {
  t: string;
  d: number;
}
