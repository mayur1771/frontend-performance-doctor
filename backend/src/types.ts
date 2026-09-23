export type Severity = "low" | "medium" | "high";

export interface AnalysisInput {
  url: string;
}

export interface ApiMetric {
  endpoint: string;
  responseTime: number;
  statusCode: number;
  requests: number;
  errors: number;
}

export interface AssetMetric {
  name: string;
  sizeKb: number;
  type: "JavaScript" | "Image" | "CSS" | "Font";
  status: "good" | "warning" | "critical";
}

export interface Recommendation {
  severity: Severity;
  title: string;
  problem: string;
  action: string;
}

export interface AnalysisResult {
  id: string;
  url: string;
  mode: "demo";
  performanceScore: number;
  loadingScore: number;
  networkScore: number;
  assetScore: number;
  renderingScore: number;
  accessibilityScore: number;
  lcp: number;
  cls: number;
  inp: number;
  bundleSize: number;
  apiResponseTime: number;
  requestCount: number;
  apiMetrics: ApiMetric[];
  assets: AssetMetric[];
  recommendations: Recommendation[];
  createdAt: string;
}