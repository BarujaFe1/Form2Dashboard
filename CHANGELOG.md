# Changelog

## 1.1.0 — 2026-07-13 (portfolio engineering pass)

### Fixed
- **P0 date parsing:** `parseDate` no longer uses `new Date('DD/MM/YYYY')`, which JS engines treat as US `MM/DD` and silently corrupts Google Forms timestamps (days 1–12). BR Forms dates are now parsed explicitly; ISO `YYYY-MM-DD` remains supported.
- Metric contract for **Qualificados** (`qualificado | convertido`) was already aligned in 1.0.1; covered by fixture regression.

### Added
- Orchestrated `runPipeline()` with **stage profiling** (validate / clean / aggregate / report).
- **Relatório de transformação** (before → after) in the dashboard UI.
- Reproducible fixture `public/fixtures/before-after/messy-leads.csv` + `expected-summary.json`.
- Demo button **CSV bagunçado (antes/depois)**.
- `npm run benchmark` → writes `docs/BENCHMARK_RESULTS.md` (100 → 10k rows).
- Regression tests for fixture outcomes and ambiguous BR dates.

### Changed
- Store uses `runPipeline` as single source of truth for processing.
- README / docs updated for honest lab scope (no “premium/enterprise” language).
- Soft product limits remain: 5 MB upload, warning at 10k rows.

### Notes on deploy
- Live URL https://form2dashboard.vercel.app may still serve **main** until this branch is merged and redeployed. Prefer local `npm run build && npm start` for the latest demo.
