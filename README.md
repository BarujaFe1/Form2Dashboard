<div align="center">
  <img src="./icon.png" alt="Form2Dashboard Logo" width="120" height="120" />

  <h1>Form2Dashboard</h1>

  <p><strong>CSV operacional bagunçado → limpeza medível → dashboard útil no navegador</strong></p>
  <p><em>Upload messy form CSVs, clean columns with an auditable pipeline, and generate interactive dashboards.</em></p>

  <p>
    <img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="MIT" />
    <img src="https://img.shields.io/badge/Next.js-16-black.svg?logo=next.js&logoColor=white" alt="Next.js 16" />
    <img src="https://img.shields.io/badge/TypeScript-strict-3178C6.svg?logo=typescript&logoColor=white" alt="TypeScript" />
    <img src="https://img.shields.io/badge/tests-vitest-6E9F18.svg" alt="Vitest" />
    <img src="https://img.shields.io/badge/scope-client--side%20lab-lightgrey.svg" alt="Client-side lab" />
  </p>

  <p>
    <a href="https://form2dashboard.vercel.app"><strong>Live Demo</strong></a> ·
    <a href="https://github.com/BarujaFe1/Form2Dashboard"><strong>Repository</strong></a> ·
    <a href="https://barujafe.vercel.app/"><strong>Portfolio</strong></a>
  </p>
</div>

> **Deploy note:** the Vercel URL tracks `main`. For the latest pipeline/report work on `chore/portfolio-quality-pass`, run locally (`npm run build && npm start`) until the branch is merged and redeployed.

---

## Screenshot

<div align="center">
  <img src="./public/screenshots/dashboard.png" alt="Dashboard Form2Dashboard" width="800" />
  <p><em>KPIs, charts, data quality (refresh screenshots after transform-report UI — see docs/SCREENSHOTS.md)</em></p>
</div>

---

## Problem & audience

**Who:** ops / growth / small data teams that collect leads via Google Forms (or similar) and live in messy CSVs.

**Pain:** before any KPI, someone manually fixes emails, BR dates, free-text channels/statuses, and duplicates — then rebuilds charts.

**Value:** a guided, privacy-first path from raw Forms export to cleaned leads, metric contracts, and export — with a before/after report you can defend in interview.

---

## Solution & flow

1. Upload CSV **or** load **dataset operacional** / **CSV bagunçado (antes/depois)**
2. Confirm auto-detected column mapping
3. Run `validate → clean/dedupe → aggregate` via `runPipeline`
4. Read KPIs (with methodology hints), charts, quality + **transform report** (timings)
5. Export cleaned CSV (full or filtered view)

> CSV stays in the browser tab. No backend, no database, no account.

```text
CSV → PapaParse → mapping → validate → clean/dedupe → aggregate → UI + export
                         └────────── profiling + transform report ──────────┘
```

---

## What this project demonstrates

- Designing an **auditable cleaning pipeline** (not charts on raw CSV)
- Explicit **metric contracts** (e.g. Qualificados = `qualificado ∪ convertido`)
- **BR date correctness** for Google Forms exports (regression-tested)
- Separating domain (`src/lib`) from UI for Vitest coverage
- Privacy-aware product constraints and honest soft limits (5 MB / 10k rows)
- Interview-ready before/after fixture + benchmark evidence

---

## Architecture

| Layer | Path |
|---|---|
| UI steps | `src/components/{upload,mapping,dashboard,table}` |
| State | `src/store/app-store.ts` |
| Pipeline | `src/lib/pipeline.ts` (+ parser, mapper, validator, cleaner, aggregator, transform-report, export) |
| Fixtures | `public/fixtures/before-after/` |
| Config | `src/config/constants.ts` |

Docs: [`docs/ARCHITECTURE.md`](./docs/ARCHITECTURE.md) · [`docs/TECHNICAL_DECISIONS.md`](./docs/TECHNICAL_DECISIONS.md)

---

## Stack

Next.js 16 · React 19 · TypeScript · Tailwind 4 · shadcn/ui · Zustand · PapaParse · Recharts · TanStack Table · Vitest · Vercel

---

## Quick start

```bash
npm ci
npm run dev
```

Interview demo (3–5 min): [`docs/DEMO_WALKTHROUGH.md`](./docs/DEMO_WALKTHROUGH.md)

1. Open http://localhost:3000  
2. Click **CSV bagunçado (antes/depois)**  
3. Generate dashboard → inspect **Relatório de transformação**  
4. Export cleaned CSV  

---

## Commands & gates

```bash
npm run lint
npm run typecheck
npm run test          # unit + fixture (excludes long bench)
npm run benchmark     # 100→10k rows → docs/BENCHMARK_RESULTS.md
npm run build
```

CI: `.github/workflows/ci.yml` (lint, typecheck, test, build).

---

## Environment

None required. See [`.env.example`](./.env.example).

---

## Decisions & trade-offs

| Choice | Upside | Cost |
|---|---|---|
| Client-side only | Privacy, zero ops, instant demo | Large files can stress the main thread |
| BR-first date parsing | Correct Forms exports | US `MM/DD` slash dates are not supported |
| Soft limits | Honest UX | Not a warehouse-scale product |
| PT-BR UI | Matches BR Forms demos | EN UI is secondary (README bilingual) |

---

## Performance evidence (Node microbench)

See [`docs/BENCHMARK_RESULTS.md`](./docs/BENCHMARK_RESULTS.md). On the authoring machine (Node 22 / win32), **10,000 synthetic rows ~60 ms median** end-to-end in Vitest — relative evidence, not a browser FPS claim.

---

## Current status & limitations

- **Status:** lab/demo ready for portfolio + interviews on this branch.
- **Not claimed:** enterprise SaaS, multi-tenant auth, warehouse sync, or AI.
- **Known gaps:** screenshots may lag UI; public Vercel may lag `main`; no Playwright yet; no Web Worker.

Release notes: [`CHANGELOG.md`](./CHANGELOG.md)

---

## Interview talking points

See [`docs/DEMO_WALKTHROUGH.md`](./docs/DEMO_WALKTHROUGH.md). Short version:

1. Problem (Forms CSV friction) + privacy constraint  
2. Show messy fixture → transform report → metric contracts  
3. Mention P0 date bug found via fixture and fixed with regression  
4. Show tests + benchmark doc  
5. State limits and next step (Worker / E2E)

---

## Docs index

| Doc | Purpose |
|---|---|
| [`docs/PORTFOLIO_HANDOFF.md`](./docs/PORTFOLIO_HANDOFF.md) | Portfolio placement |
| [`docs/AUDIT_REPORT.md`](./docs/AUDIT_REPORT.md) | Earlier audit |
| [`docs/DEMO_WALKTHROUGH.md`](./docs/DEMO_WALKTHROUGH.md) | 3–5 min script |
| [`docs/BENCHMARK_RESULTS.md`](./docs/BENCHMARK_RESULTS.md) | Timings |
| [`docs/SCREENSHOTS.md`](./docs/SCREENSHOTS.md) | Capture guide |
| [`CHANGELOG.md`](./CHANGELOG.md) | Release notes |

---

## Author

**Felipe Alírio Baruja** — software developer · Statistics / Data Science student (USP)  
[Portfolio](https://barujafe.vercel.app/) · [GitHub](https://github.com/BarujaFe1)

## License

MIT — [`LICENSE`](./LICENSE)
