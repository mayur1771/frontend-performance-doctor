# Frontend Performance Doctor

> **Find bottlenecks before users feel them.**

A developer-focused frontend performance intelligence dashboard built with **React, TypeScript, Node.js, Express.js, and MongoDB**.

Frontend Performance Doctor helps developers inspect performance signals, understand potential bottlenecks, and identify optimization opportunities through an explainable, rule-based analysis system.

---

## 🚀 Project Overview

Frontend performance problems can come from multiple areas such as:

- Slow loading
- High API latency
- Large JavaScript bundles
- Unoptimized assets
- Rendering issues
- Accessibility problems

Frontend Performance Doctor brings these signals into a single dashboard and produces an **explainable performance score** with actionable recommendations.

> **Important:** This portfolio version uses a deterministic demo analysis engine. It does **not** crawl or execute arbitrary public websites.

---

## ✨ Core Features

### Performance Analysis

- Explainable overall performance score
- Loading performance analysis
- Network/API latency analysis
- JavaScript bundle analysis
- Image, CSS and font asset audit
- Rendering performance analysis
- Accessibility checks

### Web Performance Metrics

- LCP — Largest Contentful Paint
- CLS — Cumulative Layout Shift
- INP — Interaction to Next Paint

### Developer Insights

- Rule-based performance recommendations
- Category-level performance scores
- API endpoint analysis
- Asset-level analysis
- Bottleneck identification

### Dashboard

- Performance overview
- Analysis history
- Before/after comparison
- Responsive interface
- Dark/light mode
- Loading states
- Error states

### Backend & Data

- REST API
- TypeScript backend
- Express.js routing
- MongoDB persistence
- Mongoose data modeling
- Demo memory mode when MongoDB is not configured

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React.js |
| Language | TypeScript |
| Build Tool | Vite |
| Backend | Node.js |
| API Framework | Express.js |
| Database | MongoDB |
| ODM | Mongoose |
| API Style | REST / JSON |
| Development | VS Code, Git, GitHub |

---

## 🏗️ System Architecture

```text
┌──────────────────────────────┐
│     React + TypeScript       │
│       Frontend Dashboard     │
└──────────────┬───────────────┘
               │
               │ REST / JSON
               ▼
┌──────────────────────────────┐
│      Node.js + Express       │
│          REST API            │
└──────────────┬───────────────┘
               │
               ▼
┌──────────────────────────────┐
│      Analysis Engine         │
│                              │
│ • Loading                    │
│ • Network                    │
│ • Assets                     │
│ • Rendering                  │
│ • Accessibility              │
└──────────────┬───────────────┘
               │
               ▼
┌──────────────────────────────┐
│      MongoDB + Mongoose      │
│      Analysis History        │
└──────────────────────────────┘
```

---

## 🔄 How It Works

```text
User enters URL
       ↓
Frontend sends REST request
       ↓
Express API validates request
       ↓
Analysis Engine processes input
       ↓
Performance categories are evaluated
       ↓
Weighted score is calculated
       ↓
Recommendations are generated
       ↓
Report returned to frontend
       ↓
Report can be persisted in MongoDB
       ↓
Dashboard displays results
```

---

## 📊 Performance Scoring

The application uses an explainable weighted scoring approach.

| Category | Weight |
|---|---:|
| Loading | 30% |
| Network | 20% |
| Assets | 20% |
| Rendering | 20% |
| Accessibility | 10% |

The weighted approach makes the final score understandable because each category contributes explicitly to the overall result.

---

## 📈 Example Analysis Areas

### Loading

Evaluates signals such as:

- LCP
- CLS
- INP
- Page load characteristics

### Network

Analyzes API endpoint response characteristics such as:

- Response latency
- Endpoint performance
- Slow API detection

### Assets

Checks assets such as:

- JavaScript
- Images
- CSS
- Fonts

Potential optimization recommendations can include reducing bundle size and optimizing heavy assets.

### Rendering

Identifies potential rendering-related performance issues.

### Accessibility

Provides accessibility-oriented checks as part of the overall performance report.

---

## 💡 Recommendation Engine

The recommendation system is **rule-based and explainable**.

Instead of returning an unexplained score, the system maps detected conditions to recommendations.

For example:

```text
Large JavaScript bundle
        ↓
Performance rule triggered
        ↓
Recommendation generated
        ↓
"Reduce JavaScript bundle size"
```

This approach makes the analysis easier for developers to understand and act upon.

---

## 🗄️ MongoDB Persistence

MongoDB is used to persist analysis reports and history.

If MongoDB is configured:

```text
Analysis
   ↓
Express API
   ↓
Mongoose
   ↓
MongoDB
```

If MongoDB is not configured, the application can run in **demo memory mode**.

In demo memory mode, reports are not persisted after the backend restarts.

---

## 📁 Project Structure

```text
frontend-performance-doctor/
│
├── backend/
│   ├── src/
│   │   ├── models/
│   │   │   └── Analysis.ts
│   │   │
│   │   ├── routes/
│   │   │   └── analysisRoutes.ts
│   │   │
│   │   ├── services/
│   │   │   └── analysisEngine.ts
│   │   │
│   │   ├── server.ts
│   │   └── types.ts
│   │
│   ├── .env.example
│   ├── package.json
│   └── tsconfig.json
│
├── frontend/
│   ├── src/
│   │   ├── App.tsx
│   │   ├── api.ts
│   │   ├── main.tsx
│   │   ├── styles.css
│   │   ├── types.ts
│   │   └── utils.ts
│   │
│   ├── package.json
│   ├── tsconfig.json
│   └── vite.config.ts
│
├── docs/
│   └── INTERVIEW.md
│
├── .gitignore
└── README.md
```

---

# ⚙️ Run Locally

## Prerequisites

Make sure you have:

- Node.js
- npm
- MongoDB Server (optional)
- Git

---

## 1. Clone the Repository

```bash
git clone https://github.com/mayur1771/frontend-performance-doctor.git
cd frontend-performance-doctor
```

---

## 2. Start the Backend

```bash
cd backend
npm install
```

Create the environment file:

```bash
copy .env.example .env
```

Configure:

```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/frontendPerformanceDoctor
```

Start the backend:

```bash
npm run dev
```

Expected output:

```text
MongoDB connected
API running at http://localhost:5000
```

---

## 3. Start the Frontend

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

Open:

```text
http://localhost:5173
```

---

## 🔐 Environment Variables

The backend uses:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
```

The actual `.env` file is intentionally excluded from Git.

**Never commit credentials, passwords, API keys, or private connection strings.**

---

# 🔌 REST API

## Health Check

```http
GET /api/health
```

---

## Create Analysis

```http
POST /api/analyses
```

Request:

```json
{
  "url": "https://example.com"
}
```

---

## Get Analysis History

```http
GET /api/analyses
```

---

## Get Single Analysis

```http
GET /api/analyses/:id
```

---

# 🧪 Current Project Scope

This project is intentionally designed as a **portfolio/developer-tool implementation**.

The current version uses a deterministic analysis engine rather than executing arbitrary third-party websites in a real browser environment.

This keeps the application:

- Predictable
- Explainable
- Secure for a portfolio environment
- Easy to run locally
- Easy to demonstrate during interviews

---

# 🎯 Design Decisions

## Why React?

React provides a component-based architecture suitable for building a responsive developer dashboard.

## Why TypeScript?

TypeScript provides static typing for:

- API contracts
- Component props
- Analysis data
- Backend models

This reduces common runtime mistakes and improves maintainability.

## Why Express.js?

Express provides a lightweight backend framework for:

- REST APIs
- Routing
- Request handling
- Middleware
- Backend service separation

## Why MongoDB?

The analysis report contains structured and nested information, making MongoDB's document-oriented model suitable for storing reports and historical analysis data.

## Why REST?

The analysis report can naturally be represented as a resource, making REST a simple and clear client/server communication model.

## Why Deterministic Scoring?

The scoring system is intentionally explainable.

Each performance category has an explicit weight, allowing developers to understand how the overall score is calculated.

## Why Demo Analysis Instead of Website Crawling?

Real website measurement requires controlled browser execution and introduces additional concerns such as:

- CORS
- Security
- Browser isolation
- Infrastructure requirements
- Resource management

The current implementation keeps the portfolio application reliable while leaving a clear path toward a production browser-worker architecture.

---

# 🚀 Future Enhancements

A production-oriented version could add:

- Playwright/Lighthouse browser worker
- Background job queue
- Authentication and authorization
- Result caching
- API rate limiting
- Real browser telemetry
- CI performance budgets
- WebSocket-based analysis progress
- Scheduled performance monitoring
- Team/project management
- Performance regression alerts

---

# 📚 Interview Talking Points

This project demonstrates practical knowledge of:

- React component architecture
- TypeScript
- REST API design
- Node.js
- Express.js
- MongoDB
- Mongoose
- API integration
- State management
- Error handling
- Loading states
- Performance concepts
- Web development architecture
- Git and GitHub

Detailed interview preparation is available in:

```text
docs/INTERVIEW.md
```

---

# 👨‍💻 Author

**Mayur Mhase**

B.E. Information Technology  
Trinity College of Engineering & Research, Pune

GitHub:

https://github.com/mayur1771

---

# 📄 License

This project is created for educational, portfolio, and demonstration purposes.