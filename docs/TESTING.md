# Testing — Form2Dashboard

## Strategy

Prioritize **pure domain tests** for the data pipeline. UI is thin and mostly wiring; regressions that matter for trust live in parse/map/validate/clean/aggregate/export.

## Commands

```bash
npm run test          # vitest once (CI)
npm run test:watch    # local TDD
npm run typecheck     # tsc --noEmit
npm run lint
npm run build
```

## What is covered

File: `src/lib/__tests__/pipeline.test.ts`

- CSV string parsing (empty row filter)
- Auto-mapping of Google Forms-like headers
- Required mapping validation
- BR date parsing
- Row validation (invalid email)
- Cleaning: alias normalization + email dedupe (keep newest)
- Aggregation: qualified = qualificado ∪ convertido
- CSV export escaping

## CI

GitHub Actions (`.github/workflows/ci.yml`) runs: install → lint → typecheck → test → build.

## Gaps / next tests

- Component tests for upload error states
- Playwright happy-path: seed → map → dashboard → export
- Fuzz fixtures with messy encodings / BOM-only files
