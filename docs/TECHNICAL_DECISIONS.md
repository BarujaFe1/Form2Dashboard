# Technical decisions — Form2Dashboard

## Why client-side only?

**Decision:** Run the entire CSV → dashboard pipeline in the browser.

**Why:** The portfolio story is privacy + immediacy. A recruiter can open the demo, load sample data, and see real cleaning logic without accounts or infrastructure.

**Trade-off:** Very large files can stress the main thread. Mitigated with size limits and soft row warnings; a Web Worker is a future option.

---

## Why Zustand instead of React Context / Redux?

**Decision:** One small Zustand store for step, raw rows, mapping, leads, aggregates, and table filters.

**Why:** Minimal boilerplate for a single-page multi-step flow. Domain functions stay pure and testable outside React.

---

## Why PapaParse + custom cleaner (not a BI SDK)?

**Decision:** Lightweight CSV parsing + hand-written validation/normalization.

**Why:** Demonstrates data-product thinking (aliases, BR dates, dedupe policy) instead of wrapping a black-box chart library over raw CSV.

---

## Why Recharts + TanStack Table?

**Decision:** Mature, accessible-enough charting and headless table primitives on top of shadcn/ui.

**Why:** Fast to ship a credible dashboard without building chart/table infra. Accept React Compiler warning on `useReactTable` (known incompatible-library advisory).

---

## Metric definitions

| Metric | Definition |
|---|---|
| Total leads | Count after validation + email dedupe |
| Convertidos | `status === 'convertido'` |
| Qualificados | `qualificado` **or** `convertido` |
| Taxa de conversão | convertidos ÷ total |
| Taxa de contato | contatado + qualificado + convertido ÷ total |
| Fontes ativas | distinct normalized sources |

These definitions are product contracts and are covered by unit tests.

---

## Deduplication policy

Deduplicate by **normalized email**. Keep the row with the **latest timestamp**. Older submissions are counted as removed duplicates.

---

## Internationalization

UI copy is PT-BR first (target audience + demo CSV). README is bilingual for portfolio reach. Full i18n framework was intentionally deferred.

---

## Dependencies not added

- No Zod yet — mapping/validation is domain-specific string logic; Zod would add surface without much gain for this demo size.
- No backend / database — would contradict the privacy-first demo thesis.
- No E2E suite yet — unit tests cover the pipeline; Playwright is a roadmap item.
