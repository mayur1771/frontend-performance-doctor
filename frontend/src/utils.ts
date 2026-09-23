import type { Analysis, Recommendation, Severity } from "./types";

export function formatDate(value: string) {
  return new Date(value).toLocaleString([], {
    dateStyle: "medium",
    timeStyle: "short"
  });
}

export function scoreLabel(score: number) {
  if (score >= 90) return "Excellent";
  if (score >= 75) return "Good";
  if (score >= 50) return "Needs attention";
  return "Critical";
}

export function severityClass(severity: Severity) {
  return `severity-${severity}`;
}

export function improvement(before: number, after: number, lowerIsBetter = false) {
  if (before === 0) return 0;
  const value = ((after - before) / before) * 100;
  return Number((lowerIsBetter ? -value : value).toFixed(1));
}

export function recommendationCount(analysis: Analysis, severity?: Severity) {
  return analysis.recommendations.filter(
    (item: Recommendation) => !severity || item.severity === severity
  ).length;
}