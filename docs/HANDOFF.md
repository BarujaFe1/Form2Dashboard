# Handoff — Form2Dashboard portfolio quality pass

**Branch:** `chore/portfolio-quality-pass`  
**Date:** 2026-07-13  
**Suggested commit:** `chore: improve portfolio quality, docs, tests and stability`

---

## What was found

- Solid client-side pipeline and UI already existed; build/lint/tsc already green.
- Portfolio gaps: no tests, no LICENSE (despite badge), README overclaims (Next 15, skeletons, page size 25), missing CSV export.
- Real bug: **qualified** metric counted only `qualificado`, while README defined `qualificado | convertido`.
- Upload lacked size limits and keyboard accessibility; seed fetch ignored HTTP failures.
- `.gitignore` `.env*` would hide `.env.example` without an exception.
- Duplicate count used `rows - leads` (could inflate if cleaner skipped rows).

## What was fixed

- Qualified metric definition aligned with product docs + unit test.
- True duplicate counter in `cleanRows`.
- Upload: 5 MB limit, soft 10k-row warning, `response.ok` on seed, keyboard a11y.
- CSV export (full cleaned set + filtered table view) with Excel BOM + escaping.
- Empty dashboard / zero-valid-rows messaging.
- LICENSE (MIT), `.env.example`, `.gitignore` exception.

## What was improved

- Metric methodology hints on KPI cards.
- Landing subtle radial atmosphere (keeps existing teal brand).
- Open Graph / Twitter metadata.
- Scripts: `typecheck`, `test`, `test:watch`.
- Vitest suite (12 tests) for the pipeline.
- CI: typecheck script + unit tests; also runs on `chore/**` pushes.
- Docs: `AUDIT_REPORT`, `ARCHITECTURE`, `TECHNICAL_DECISIONS`, `TESTING`, `DEPLOYMENT`, this handoff.
- README rewritten as portfolio piece (honest badges, interview narrative).

## Commands run

```bash
npm ci
npm run lint
npm run typecheck
npm run test
npm run build
```

All passed (lint may still show the known TanStack `useReactTable` React Compiler advisory — warning only).

## Tests executed

`src/lib/__tests__/pipeline.test.ts` — **12/12 passed**

## Still missing / residual risks

- No Playwright E2E yet.
- Very large CSVs still process on the main thread (mitigated by limits).
- Screenshots may be slightly stale vs new export button (worth regenerating).
- Live Vercel deploy not re-verified from this machine in this session.
- `shadcn` remains a runtime dependency (CLI package) — acceptable for now, optional cleanup later.

## Next steps

1. Merge this branch after review.
2. Redeploy Vercel from `main`.
3. Refresh screenshots including export CTA.
4. Optional: Playwright seed→dashboard→export path.
5. Optional: move heavy parse/clean to a Web Worker.

## Portfolio suggestions

- Lead with the privacy + pipeline story, not “yet another Next dashboard”.
- In interviews, open the demo, click seed, show quality card + export, then jump to `cleaner.ts` / tests.
- Keep README claims synced with code (this pass fixed the drift).

## Suggested commit message

```text
chore: improve portfolio quality, docs, tests and stability
```
