# Audit Report — Form2Dashboard

**Date:** 2026-07-13  
**Branch:** `chore/portfolio-quality-pass`  
**Auditor role:** senior full-stack + data product + portfolio recruiter lens

---

## Executive summary

Form2Dashboard is a solid **client-side data product demo**: upload messy operational CSVs → map columns → validate/clean/dedupe → interactive dashboard. The domain pipeline (`parser → mapper → validator → cleaner → aggregator`) is real, privacy-friendly, and demonstrable.

The public surface (README, badges, MIT claim) is stronger than the engineering hygiene underneath: **no tests**, **no LICENSE file**, **README claims that oversell UX** (skeletons, pagination size), **one metric definition mismatch**, and **missing CSV export** (already identified as the next increment). Build, lint, and typecheck already pass on Next.js 16.

**Current portfolio score: 6.5 / 10**

After this quality pass (bugs, export, tests, CI, docs, README honesty): target **8.5–9 / 10**.

---

## Current score: 6.5 / 10

| Dimension | Score | Notes |
|---|---|---|
| Product clarity | 8 | Clear problem/solution, privacy story |
| Code architecture | 7 | Clean lib/domain split; thin UI |
| Reliability | 5 | No tests; edge cases lightly handled |
| UX polish | 6.5 | Good baseline; gaps in a11y, export, empty states |
| Documentation honesty | 5.5 | Strong prose; some inaccurate claims |
| DX / CI | 6 | CI exists; no `test`/`typecheck` scripts |
| Portfolio signal | 7 | Demo + screenshots help; engineering proof thin |

---

## Main risks

1. **Recruiter trust risk** — README claims MIT LICENSE, skeletons, and pagination of 25 rows; LICENSE missing; skeletons absent; page size is 15.
2. **Metric contract drift** — README defines “Qualificados” as `qualificado` **or** `convertido`; aggregator counts only `qualificado`.
3. **No automated tests** — pipeline regressions (dates, dedupe, mapping) would go unnoticed.
4. **Large CSV / memory** — no file size or row-count guard; huge uploads can freeze the tab.
5. **Seed fetch fragility** — demo load does not check `response.ok`.
6. **`.gitignore` masks `.env.example`** — pattern `.env*` would ignore a committed example unless excepted.

---

## Quick wins

- Fix qualified metric to match product definition.
- Add CSV export of cleaned leads (highest product value).
- Add Vitest coverage for `parser`, `mapper`, `validator`, `cleaner`, `aggregator`, `utils`.
- Add `typecheck` / `test` scripts; wire into CI.
- Add `LICENSE`, `.env.example`, honest README.
- File size limit + upload keyboard accessibility.
- Track true duplicate removals in cleaner.

---

## Structural improvements

- Keep client-side architecture (core portfolio story).
- Document pipeline in `docs/ARCHITECTURE.md`.
- Capture trade-offs in `docs/TECHNICAL_DECISIONS.md`.
- Deployment path for Vercel in `docs/DEPLOYMENT.md`.
- Optional later: Web Worker for large files; persisted mapping presets.

---

## Bugs found

| ID | Severity | Issue | Status |
|---|---|---|---|
| B1 | Medium | `qualifiedLeads` ignores `convertido` vs README | Fixed this pass |
| B2 | Low | `duplicatesRemoved` = `rows - leads` (inflates if cleaner skips) | Fixed this pass |
| B3 | Medium | No max file size on upload | Fixed this pass |
| B4 | Low | Seed `fetch` ignores HTTP errors | Fixed this pass |
| B5 | Low | Upload dropzone not keyboard-accessible | Fixed this pass |
| B6 | Docs | README overclaims (skeletons, page size 25, Next 15 badge) | Fixed this pass |
| B7 | Docs | LICENSE referenced but missing | Fixed this pass |
| B8 | DX | No unit tests / test script | Fixed this pass |

---

## Execution plan

1. Diagnose + run install/lint/tsc/build ✅
2. Fix pipeline bugs + export + upload guards
3. Add Vitest + essential tests
4. Improve dashboard UX (export, metric hints, empty states)
5. Docs suite + portfolio README rewrite
6. CI update + handoff + commit/push

---

## Final checklist

- [x] Project installs
- [x] Lint / typecheck / build pass
- [x] Core bugs fixed or documented
- [x] Tests for pipeline
- [x] README portfolio-grade
- [x] Architecture / decisions / testing / deployment docs
- [x] CI includes test
- [x] `.env.example` + `.gitignore` hardened
- [x] UX reviewed (export, a11y, honesty)
- [x] `docs/HANDOFF.md` written
