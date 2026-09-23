import type { Analysis } from "./types";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options?.headers || {})
    },
    ...options
  });

  if (!response.ok) {
    const body = await response.json().catch(() => ({}));
    throw new Error(body.message || `Request failed with ${response.status}`);
  }

  return response.json();
}

export function createAnalysis(url: string) {
  return request<Analysis>("/analyses", {
    method: "POST",
    body: JSON.stringify({ url })
  });
}

export function getAnalyses() {
  return request<Analysis[]>("/analyses");
}

export function getAnalysis(id: string) {
  return request<Analysis>(`/analyses/${id}`);
}

export function getHealth() {
  return request<{ status: string }>("/health");
}