import mongoose, { Schema, Document } from "mongoose";
import type { ApiMetric, AssetMetric, Recommendation } from "../types.js";

export interface IAnalysis extends Document {
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
  createdAt: Date;
}

const analysisSchema = new Schema<IAnalysis>(
  {
    url: { type: String, required: true },
    mode: { type: String, enum: ["demo"], default: "demo" },
    performanceScore: { type: Number, required: true },
    loadingScore: { type: Number, required: true },
    networkScore: { type: Number, required: true },
    assetScore: { type: Number, required: true },
    renderingScore: { type: Number, required: true },
    accessibilityScore: { type: Number, required: true },
    lcp: { type: Number, required: true },
    cls: { type: Number, required: true },
    inp: { type: Number, required: true },
    bundleSize: { type: Number, required: true },
    apiResponseTime: { type: Number, required: true },
    requestCount: { type: Number, required: true },
    apiMetrics: { type: [Schema.Types.Mixed]as any, default: [] },
    assets: { type: [Schema.Types.Mixed]as any, default: [] },
    recommendations: { type: [Schema.Types.Mixed]as any, default: [] }
  },
  { timestamps: true }
);

export default mongoose.model<IAnalysis>("Analysis", analysisSchema);