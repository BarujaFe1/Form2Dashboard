# Testing — Form2Dashboard

## Strategy

Prioritize **pure domain tests** and a **reproducible before/after fixture**. UI is thin wiring; trust lives in parse/map/validate/clean/aggregate/export/report.

## Commands

```bash
npm run test          # unit + fixture (excludes long benchmark)
npm run test:all      # includes benchmark test
npm run benchmark     # 100→10k rows, writes docs/BENCHMARK_RESULTS.md
npm run typecheck
npm run lint
npm run build
```

## Coverage

| File | Focus |
|---|---|
| `src/lib/__tests__/pipeline.test.ts` | aliases, dedupe, qualified metric, CSV escape, **BR date ambiguity** |
| `src/lib/__tests__/fixture.test.ts` | `messy-leads.csv` vs `expected-summary.json` |
| `src/lib/__tests__/benchmark.test.ts` | soft timing guards + benchmark markdown |

## CI

GitHub Actions runs: install → lint → typecheck → `npm run test` → build.

## Gaps

- Playwright happy-path not yet added
- Browser main-thread timing not instrumented (Node bench is relative)
