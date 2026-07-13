# Architecture — Form2Dashboard

## Overview

Form2Dashboard is a **static Next.js App Router** product. There is no backend API, database, or auth. The value lives in a client-side data pipeline that turns messy form CSVs into cleaned leads and dashboard aggregates.

```text
Browser
  │
  ├─ Upload / seed / messy fixture CSV
  │     └─ PapaParse (parser)
  │
  ├─ Column mapping UI
  │     └─ autoDetectMapping + manual override
  │
  ├─ runPipeline()
  │     ├─ validateRows          ─┐
  │     ├─ cleanRows             ├─ stage timings (PipelineProfile)
  │     ├─ aggregateLeads        │
  │     └─ buildTransformReport  ─┘
  │
  └─ Dashboard UI
        ├─ KPI cards (metric contracts)
        ├─ Recharts
        ├─ Data quality + transform report
        └─ TanStack Table + CSV export
```

## Layers

| Layer | Location | Responsibility |
|---|---|---|
| UI | `src/components/**` | Steps: upload → mapping → dashboard |
| State | `src/store/app-store.ts` | Zustand orchestration of pipeline + filters |
| Domain | `src/lib/*` | Pure functions: parse, map, validate, clean, aggregate, export, pipeline, transform-report |
| Config | `src/config/constants.ts` | Aliases, labels, soft limits |
| Types | `src/types/index.ts` | Shared domain contracts |

## Pipeline contracts

1. **Parse** — CSV → `{ rows, headers, errors }`
2. **Map** — headers → `Partial<ColumnMapping>` (required: timestamp, name, email)
3. **Validate** — row-level required fields + email + parseable date
4. **Clean** — title-case names, lowercase email, source/status aliases, dedupe by email (keep newest)
5. **Aggregate** — metrics, time series, source/status breakdowns
6. **Export** — cleaned/filtered leads → UTF-8 CSV (BOM for Excel)

## Privacy model

All processing stays in memory in the browser tab. Refreshing the page clears state. No telemetry, no uploads to a server.

## Rendering model

- Single route: `/` (`src/app/page.tsx`) is a client page switching on `AppStep`.
- Static export-friendly build (prerendered shell + client interactivity).
- Theme via `next-themes`.

## Soft limits

- Max upload size: **5 MB** (`MAX_CSV_FILE_BYTES`)
- Soft row warning: **10_000** rows (`MAX_CSV_ROWS_SOFT`)
- Date policy: **BR Forms `DD/MM/YYYY` first**; unambiguous ISO `YYYY-MM-DD` supported; ambiguous US `MM/DD` slash dates are intentionally not supported

These protect UX and correctness, not a multi-tenant quota system.

## Fixtures

- Operational seed: `public/seed/leads-operacionais.csv`
- Before/after demo: `public/fixtures/before-after/messy-leads.csv` + `expected-summary.json`
