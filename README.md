<div align="center">
  <img src="./icon.png" alt="Form2Dashboard Logo" width="120" height="120" />

  <h1>Form2Dashboard</h1>

  <p><strong>CSV operacional bagunçado → dashboard útil, no navegador, em segundos</strong></p>
  <p><em>Upload messy form CSVs, clean columns, and generate interactive dashboards.</em></p>

  <p>
    <img src="https://img.shields.io/badge/build-passing-brightgreen.svg" alt="Build" />
    <img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="MIT" />
    <img src="https://img.shields.io/badge/Next.js-16-black.svg?logo=next.js&logoColor=white" alt="Next.js 16" />
    <img src="https://img.shields.io/badge/TypeScript-strict-3178C6.svg?logo=typescript&logoColor=white" alt="TypeScript" />
    <img src="https://img.shields.io/badge/tests-vitest-6E9F18.svg" alt="Vitest" />
    <img src="https://img.shields.io/badge/deployed%20on-Vercel-black.svg?logo=vercel&logoColor=white" alt="Vercel" />
  </p>

  <p>
    <a href="https://form2dashboard.vercel.app"><strong>Live Demo</strong></a> ·
    <a href="https://github.com/BarujaFe1/Form2Dashboard"><strong>Repository</strong></a> ·
    <a href="https://barujafe.vercel.app/"><strong>Portfolio</strong></a>
  </p>
</div>

---

## Screenshot

<div align="center">
  <img src="./public/screenshots/dashboard.png" alt="Dashboard Form2Dashboard" width="800" />
  <p><em>KPIs, charts, data quality and filterable leads table (light mode)</em></p>
</div>

<details>
<summary>More screenshots</summary>

<div align="center">
  <img src="./public/screenshots/upload.png" alt="Upload" width="720" />
  <p><em>Upload / demo seed</em></p>
  <img src="./public/screenshots/mapper.png" alt="Mapper" width="720" />
  <p><em>Column mapping with auto-detection</em></p>
  <img src="./public/screenshots/dark-mode.png" alt="Dark mode" width="720" />
  <p><em>Dark mode dashboard</em></p>
</div>
</details>

---

## Problem

Operational teams collect leads in Google Forms (or similar) and end up with messy CSVs:

- inconsistent headers (`Carimbo de data/hora`, `Como nos encontrou`, …)
- invalid emails and missing required fields
- mixed date formats (BR `DD/MM/YYYY HH:mm:ss`)
- free-text sources/statuses (`Instagram`, `won`, `quente`)
- duplicate submissions by the same email

Before any decision, someone spends hours cleaning spreadsheets and rebuilding charts.

## Solution

**Form2Dashboard** is a privacy-first, client-side data product:

1. Upload a CSV (or load demo data)
2. Confirm auto-detected column mapping
3. Run validation → cleaning → dedupe → aggregation
4. Read KPIs, charts, quality report, and an interactive table
5. Export the cleaned CSV back to disk

> The CSV never leaves the browser. No backend, no database, no account.

---

## Main features

- **Ingestion** — drag & drop CSV, 5 MB guard, soft warning above 10k rows, one-click demo seed
- **Mapping** — alias-based auto-detection for common Forms headers + manual override
- **Validation** — required timestamp/name/email, email format, parseable dates
- **Cleaning** — name casing, source/status aliases, email dedupe (keep newest)
- **Dashboard** — KPIs with methodology hints, time series, source/status charts
- **Table** — search, source/status filters, sort, pagination (15/page)
- **Export** — download cleaned leads or the current filtered table view
- **UX** — light/dark theme, empty/error states, keyboard-accessible upload zone

---

## Architecture

```text
CSV → PapaParse → mapping → validate → clean/dedupe → aggregate → UI + export
```

| Layer | Path |
|---|---|
| UI steps | `src/components/{upload,mapping,dashboard,table}` |
| State | `src/store/app-store.ts` |
| Domain | `src/lib/{parser,mapper,validator,cleaner,aggregator,export}` |
| Config | `src/config/constants.ts` |

Full detail: [`docs/ARCHITECTURE.md`](./docs/ARCHITECTURE.md)

---

## Stack

- **Next.js 16** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS 4** + **shadcn/ui**
- **Zustand** (app state)
- **PapaParse** (CSV)
- **Recharts** (charts)
- **TanStack Table** (table)
- **Vitest** (unit tests)
- **Vercel** (deploy)

---

## Local demo

Recommended recruiter path:

1. `npm run dev`
2. Open http://localhost:3000
3. Click **Carregar dados de exemplo**
4. Confirm mapping → **Gerar dashboard**
5. Explore filters and **Exportar CSV limpo**

---

## Commands

```bash
npm ci
npm run dev          # development
npm run lint
npm run typecheck
npm run test
npm run build
npm start            # production server after build
```

---

## Environment variables

None required for the default demo. See [`.env.example`](./.env.example).

Optional: `NEXT_PUBLIC_SITE_URL` for site URL tooling.

---

## Tests

Pipeline unit tests cover parsing, mapping, validation, cleaning/dedupe, aggregation (qualified definition), and CSV escaping.

```bash
npm run test
```

See [`docs/TESTING.md`](./docs/TESTING.md).

---

## Technical decisions

- **Client-side only** to prove privacy + instant demo value
- **Pure domain functions** so the pipeline is testable without mounting React
- **Alias tables** instead of brittle exact header matching
- **Deduplicate by email, keep newest** as an explicit operational policy

Details and trade-offs: [`docs/TECHNICAL_DECISIONS.md`](./docs/TECHNICAL_DECISIONS.md)

---

## Trade-offs

| Choice | Upside | Cost |
|---|---|---|
| No backend | Privacy, zero ops, easy demo | Large files can freeze the tab |
| Single-page steps | Simple mental model | No deep-linkable dashboard URL |
| PT-BR UI | Matches BR Forms demos | English UI not first-class yet |
| Soft limits only | Keeps demo frictionless | Not a multi-tenant SaaS quota system |

---

## Roadmap

- [x] V1.0 end-to-end client pipeline + dashboard
- [x] V1.1 CSV export, tests, CI hardening, docs honesty
- [ ] Web Worker for large CSVs
- [ ] Playwright happy-path
- [ ] Saved mapping presets (localStorage)
- [ ] Optional EN UI toggle

---

## Current status

**Production-ready demo.** Install, lint, typecheck, tests, and build pass. Suitable for public portfolio and interview walkthroughs.

Deploy notes: [`docs/DEPLOYMENT.md`](./docs/DEPLOYMENT.md)

---

## What this project demonstrates

- Turning a real operational pain into a focused data product
- Designing a **deterministic cleaning pipeline** (not just charts on raw CSV)
- Separating **domain logic** from UI for testability
- Privacy-aware architecture choices
- Portfolio communication: problem → solution → proof → trade-offs

---

## How I would present this in an interview

1. **Problem** — “Teams drown in Forms CSVs before they can decide.”
2. **Constraint** — “Demo must work with zero backend and keep PII local.”
3. **Design** — show `validator` → `cleaner` → `aggregator` and the qualified metric contract.
4. **Proof** — open live demo, load seed, export cleaned CSV; point to Vitest cases.
5. **Honesty** — call out client-side limits and what I’d add next (Worker, E2E, presets).

---

## Docs index

| Doc | Purpose |
|---|---|
| [`docs/AUDIT_REPORT.md`](./docs/AUDIT_REPORT.md) | Quality audit |
| [`docs/ARCHITECTURE.md`](./docs/ARCHITECTURE.md) | System design |
| [`docs/TECHNICAL_DECISIONS.md`](./docs/TECHNICAL_DECISIONS.md) | ADRs / trade-offs |
| [`docs/TESTING.md`](./docs/TESTING.md) | Test strategy |
| [`docs/DEPLOYMENT.md`](./docs/DEPLOYMENT.md) | Vercel / local prod |
| [`docs/HANDOFF.md`](./docs/HANDOFF.md) | Session handoff |

---

## Author

**Felipe Alirio Baruja**  
[Portfolio](https://barujafe.vercel.app/) · [LinkedIn](https://www.linkedin.com/in/felipe-baruja/) · [GitHub](https://github.com/BarujaFe1)

---

## License

MIT — see [`LICENSE`](./LICENSE).
