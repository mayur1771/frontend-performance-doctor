import crypto from "node:crypto";
import type { ApiMetric, AssetMetric, Recommendation } from "../types.js";

function seedFromUrl(url: string) {
  const hex = crypto.createHash("sha256").update(url).digest("hex").slice(0, 8);
  return parseInt(hex, 16);
}

function range(seed: number, min: number, max: number, offset = 0) {
  const value = Math.abs(Math.sin(seed + offset) * 10000);
  return Math.round((min + (value - Math.floor(value)) * (max - min)) * 10) / 10;
}

export function buildDemoAnalysis(url: string) {
  const seed = seedFromUrl(url);

  const lcp = range(seed, 1.4, 3.8, 1);
  const cls = range(seed, 0.03, 0.22, 2);
  const inp = Math.round(range(seed, 130, 360, 3));
  const bundleSize = Math.round(range(seed, 1800, 6200, 4));
  const apiResponseTime = Math.round(range(seed, 180, 1050, 5));
  const requestCount = Math.round(range(seed, 18, 58, 6));

  const loadingScore = Math.max(35, Math.min(100, Math.round(100 - (lcp - 1.2) * 30)));
  const networkScore = Math.max(35, Math.min(100, Math.round(100 - (apiResponseTime - 150) / 12)));
  const assetScore = Math.max(35, Math.min(100, Math.round(100 - Math.max(0, bundleSize - 1800) / 70)));
  const renderingScore = Math.max(35, Math.min(100, Math.round(100 - Math.max(0, inp - 120) / 5)));
  const accessibilityScore = Math.round(range(seed, 78, 98, 7));

  const performanceScore = Math.round(
    loadingScore * 0.30 +
    networkScore * 0.20 +
    assetScore * 0.20 +
    renderingScore * 0.20 +
    accessibilityScore * 0.10
  );

  const apiNames = ["/api/users", "/api/products", "/api/orders", "/api/search"];
  const apiMetrics: ApiMetric[] = apiNames.map((endpoint, index) => {
    const responseTime = Math.round(range(seed, 100, 1200, 20 + index));
    const statusCode = responseTime > 950 ? 503 : 200;
    const requests = Math.round(range(seed, 120, 980, 30 + index));
    const errors = statusCode === 503 ? Math.round(range(seed, 2, 18, 40 + index)) : Math.round(range(seed, 0, 4, 40 + index));
    return { endpoint, responseTime, statusCode, requests, errors };
  });

  const assets: AssetMetric[] = [
    {
      name: "main.js",
      sizeKb: Math.round(bundleSize * 0.42),
      type: "JavaScript",
      status: bundleSize > 4000 ? "critical" : bundleSize > 2800 ? "warning" : "good"
    },
    {
      name: "vendor.js",
      sizeKb: Math.round(bundleSize * 0.30),
      type: "JavaScript",
      status: bundleSize > 4500 ? "warning" : "good"
    },
    {
      name: "hero-image.webp",
      sizeKb: Math.round(range(seed, 180, 1200, 60)),
      type: "Image",
      status: "warning"
    },
    {
      name: "styles.css",
      sizeKb: Math.round(range(seed, 70, 340, 70)),
      type: "CSS",
      status: "good"
    },
    {
      name: "inter-var.woff2",
      sizeKb: Math.round(range(seed, 80, 240, 80)),
      type: "Font",
      status: "good"
    }
  ];

  const recommendations: Recommendation[] = [];

  if (bundleSize > 4000) {
    recommendations.push({
      severity: "high",
      title: "Reduce JavaScript bundle size",
      problem: `The demo bundle is ${bundleSize} KB, which may increase initial download and parse time.`,
      action: "Use route-level code splitting, tree shaking and lazy loading for non-critical modules."
    });
  } else {
    recommendations.push({
      severity: "low",
      title: "Keep bundle growth controlled",
      problem: "The demo bundle is currently within the target range.",
      action: "Track bundle size in CI and set a performance budget."
    });
  }

  if (lcp > 2.5) {
    recommendations.push({
      severity: "high",
      title: "Improve Largest Contentful Paint",
      problem: `Demo LCP is ${lcp.toFixed(1)}s, above the 2.5s target.`,
      action: "Prioritize critical content, optimize hero assets and reduce render-blocking resources."
    });
  } else {
    recommendations.push({
      severity: "low",
      title: "Maintain fast LCP",
      problem: `Demo LCP is ${lcp.toFixed(1)}s and within the target range.`,
      action: "Protect the metric with performance budgets and regression testing."
    });
  }

  if (apiResponseTime > 700) {
    recommendations.push({
      severity: "high",
      title: "Investigate slow API responses",
      problem: `Average demo API latency is ${apiResponseTime}ms.`,
      action: "Add caching, pagination, database indexes and endpoint-level latency monitoring."
    });
  } else {
    recommendations.push({
      severity: "medium",
      title: "Add API caching",
      problem: "Repeated API requests can still create unnecessary network work.",
      action: "Cache stable responses and invalidate them when relevant data changes."
    });
  }

  if (requestCount > 40) {
    recommendations.push({
      severity: "medium",
      title: "Reduce request count",
      problem: `The demo page performs approximately ${requestCount} requests.`,
      action: "Batch related requests, defer non-critical data and reuse cached responses."
    });
  }

  if (cls > 0.1) {
    recommendations.push({
      severity: "medium",
      title: "Reduce layout shifts",
      problem: `Demo CLS is ${cls.toFixed(2)}, above the recommended target.`,
      action: "Reserve dimensions for images and dynamic content before it loads."
    });
  }

  return {
    url,
    mode: "demo" as const,
    performanceScore,
    loadingScore,
    networkScore,
    assetScore,
    renderingScore,
    accessibilityScore,
    lcp,
    cls,
    inp,
    bundleSize,
    apiResponseTime,
    requestCount,
    apiMetrics,
    assets,
    recommendations
  };
}