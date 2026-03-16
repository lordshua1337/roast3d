export function getGrade(score: number): string {
  if (score >= 93) return "A";
  if (score >= 85) return "B+";
  if (score >= 77) return "B";
  if (score >= 70) return "B-";
  if (score >= 63) return "C+";
  if (score >= 55) return "C";
  if (score >= 45) return "D";
  return "F";
}

export function getGradeColor(grade: string): string {
  const colors: Record<string, string> = {
    A: "#16a34a",
    "B+": "#22c55e",
    B: "#ca8a04",
    "B-": "#d97706",
    "C+": "#ea580c",
    C: "#dc2626",
    D: "#b91c1c",
    F: "#991b1b",
  };
  return colors[grade] || "#dc2626";
}
