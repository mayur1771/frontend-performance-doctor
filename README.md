# Frontend Performance Doctor

A developer-focused performance intelligence dashboard built with React, TypeScript, Node.js, Express and MongoDB.

## What problem does it solve?

Frontend teams need a clear way to inspect performance signals, understand bottlenecks and decide what to optimize first.

This portfolio version uses a deterministic demo analysis engine. It does **not** crawl arbitrary public websites.

## Core features

- Explainable performance score
- Core Web Vitals visualization
- API latency analysis
- JavaScript bundle audit
- Asset audit
- Rule-based recommendations
- Historical reports with MongoDB
- Before/after comparison
- Responsive dashboard
- Dark/light mode
- REST API
- TypeScript
- Error and loading states

## Architecture

```text
React + TypeScript
        |
        | REST / JSON
        v
Node.js + Express
        |
        v
Analysis Engine
        |
        v
MongoDB (optional)
```

## Run locally

### 1. Backend

```bash
cd backend
npm install
copy .env.example .env
npm run dev
```

If you do not configure MongoDB, the API still runs in demo memory mode. History will not persist after restart.

### 2. Frontend

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

Open:

http://localhost:5173

## MongoDB

Create a free MongoDB Atlas cluster and put the connection string in:

```text
backend/.env
```

Example:

```env
PORT=5000
MONGODB_URI=mongodb+srv://USERNAME:PASSWORD@CLUSTER.mongodb.net/frontendPerformanceDoctor
```

Never commit `.env`.

## API

### Health

`GET /api/health`

### Create analysis

`POST /api/analyses`

Body:

```json
{
  "url": "https://example.com"
}
```

### Get analysis history

`GET /api/analyses`

### Get one report

`GET /api/analyses/:id`

## Interview talking points

### Why TypeScript?

It provides static typing for API contracts, component props and analysis data, reducing runtime mistakes.

### Why REST?

The analysis report is naturally represented as a resource and REST provides a simple client/server contract.

### Why deterministic scoring?

The score is explainable. Each category has an explicit weight, so a developer can understand why the score changed.

### Why demo mode?

External website measurement requires controlled browser execution and introduces CORS, security and infrastructure concerns. Demo mode keeps the portfolio application reliable while the architecture leaves a clear path to a real browser-worker implementation.

### Production upgrade

A production version could add:
- Playwright/Lighthouse worker
- background job queue
- authentication
- caching
- rate limiting
- real browser telemetry
- CI performance budgets
- WebSocket progress updates
