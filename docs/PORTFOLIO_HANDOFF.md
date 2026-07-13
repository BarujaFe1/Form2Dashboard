# Portfolio handoff — Form2Dashboard

**Branch:** `chore/portfolio-quality-pass`  
**Date:** 2026-07-13  
**Tier recommendation:** **Destaque (Tier A)** for analytics engineering / data product / full-stack analítico interviews  
**Honest scope:** client-side lab / MVP demo — not a multi-tenant SaaS

---

## Summary

This pass deepened the **data pipeline evidence** beyond a pretty dashboard:

1. Found and fixed a **P0 BR date bug** (`new Date('12/03/2026')` → US MM/DD) that corrupted Google Forms timestamps and dedupe ordering.
2. Added `runPipeline` with **stage profiling** + **before/after transform report** in the UI.
3. Shipped a **reproducible messy fixture** with expected outcomes + regression tests.
4. Measured pipeline performance up to **10k rows** (`docs/BENCHMARK_RESULTS.md`).

## Before → after

| Area | Before | After |
|---|---|---|
| Date parsing | Ambiguous slash dates via `Date` ctor | Explicit BR + ISO parsers |
| Pipeline orchestration | Inline in Zustand | `src/lib/pipeline.ts` |
| Transformation storytelling | Quality card only | Transform report + timings |
| Regression evidence | Unit tests on aliases | Fixture before/after contract |
| Performance claims | Anecdotal | Written benchmark medians |
| Demo path | Single seed | Operational seed + messy fixture |

## Commands run

```bash
npm run test          # 14 passed (excludes long bench)
npm run benchmark     # writes docs/BENCHMARK_RESULTS.md
npm run typecheck
npm run lint
npm run build
```

## Deploy caveat (important)

https://form2dashboard.vercel.app was live during audit but corresponds to **production/main**. Until merge + redeploy, public demo may **lack** transform report / messy fixture / date fix. Interview with local production build:

```bash
npm run build && npm start
```

## Remaining limitations

- No backend / warehouse / auth (by design for privacy demo).
- Main-thread parsing (Worker is roadmap).
- Screenshots slightly stale vs new UI.
- No Playwright E2E yet (fixture + unit coverage instead).
- `shadcn` package still listed as dependency (CLI leftover).

## Next steps

1. Merge PR → redeploy Vercel.
2. Refresh screenshots per `docs/SCREENSHOTS.md`.
3. Optional Playwright: messy fixture → dashboard → export.
4. Optional Web Worker for >10k rows.

## Portfolio placement

Lead with: **privacy-first Forms CSV cleaning with measurable pipeline + metric contracts**.  
Avoid overlap with pure BI dashboards or ML projects — this is **data product / analytics engineering craft**.

Copy guides: see `C:\dev\prompts_para_port\form2dashboard-supermegaprompt-portfolio.md`.
