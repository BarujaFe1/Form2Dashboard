# Architecture — Form2Dashboard

## Overview

Form2Dashboard is a **static Next.js App Router** product. There is no backend API, database, or auth. The value lives in a client-side data pipeline that turns messy form CSVs into cleaned leads and dashboard aggregates.

```text
Browser
  │
  ├─ Upload / seed CSV
  │     └─ PapaParse (parser)
  │
  ├─ Column mapping UI
  │     └─ autoDetectMapping + manual override
  │
  ├─ processData()
  │     ├─ validateRows
  │     ├─ cleanRows (normalize + dedupe)
  │     └─ aggregateLeads
  │
  └─ Dashboard UI
        ├─ KPI cards
        ├─ Recharts
        ├─ Data quality
        └─ TanStack Table + CSV export
```

## Layers

| Layer | Location | Responsibility |
|---|---|---|
| UI | `src/components/**` | Steps: upload → mapping → dashboard |
| State | `src/store/app-store.ts` | Zustand orchestration of pipeline + filters |
| Domain | `src/lib/*` | Pure functions: parse, map, validate, clean, aggregate, export |
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

These protect UX, not enforce a hard product quota.
