# Interview Preparation

## 1. Explain the project

"I built Frontend Performance Doctor, a developer tool that analyzes frontend performance signals and turns them into an explainable score and actionable recommendations. The frontend is React and TypeScript, the backend is Node and Express, and MongoDB stores analysis reports."

## 2. Explain the architecture

React sends a REST request to Express. Express validates the URL and passes it to a deterministic analysis engine. The engine calculates performance categories and recommendations. If MongoDB is configured, the report is persisted and can be retrieved later.

## 3. Why TypeScript?

For strong typing of API responses, component data and domain models.

## 4. Why separate frontend and backend?

It keeps UI, business logic and persistence concerns independent and makes the system easier to test and deploy.

## 5. How is the score calculated?

Loading 30%, Network 20%, Assets 20%, Rendering 20%, Accessibility 10%.

## 6. Why not claim real website crawling?

Because arbitrary website measurement needs a controlled browser environment. The portfolio version is deliberately transparent and uses demo metrics.

## 7. How would you make it production-grade?

Use a Playwright/Lighthouse worker, queue analysis jobs, cache reports, add authentication and rate limiting, then stream progress to the frontend.

## 8. What frontend optimizations did you implement?

Lazy-loadable route architecture, debounced search/filter patterns, reusable components, responsive UI, loading/error states and careful state boundaries.

## 9. What happens when the API fails?

The client catches non-2xx responses and shows an error state. The UI does not silently display a fake successful result.

## 10. What did you personally learn?

API contracts, TypeScript domain modeling, frontend state handling, explainable scoring, responsive UI design and separating presentation from business logic.
