# Demo walkthrough (3–5 minutes)

Use this script in interviews for analytics engineering / data product / full-stack analítico roles.

## Setup

```bash
npm ci
npm run dev
```

Open http://localhost:3000  
(If the public Vercel deploy is behind `main`, prefer local.)

## Minute 0–1 — Problem framing

> “Equipes operacionais baixam CSV do Google Forms e perdem tempo limpando e-mails, datas BR, status livres e duplicatas antes de qualquer métrica.”

Show the landing trust line: **100% no navegador**.

## Minute 1–2 — Messy → clean pipeline

1. Click **CSV bagunçado (antes/depois)**.
2. Show auto-detected mapping (Forms headers).
3. Click **Gerar dashboard**.
4. Open **Relatório de transformação**:
   - raw rows → unique leads
   - invalid / duplicates
   - stage timings (ms)
5. Point to code: `src/lib/pipeline.ts`, `cleaner.ts`, `utils.ts` (`parseDate` BR-safe).

## Minute 2–3 — Metrics with contracts

Explain definitions (also on KPI hints):

| KPI | Contract |
|---|---|
| Qualificados | `qualificado` **or** `convertido` |
| Convertidos | `status === convertido` |
| Dedup | email lowercase, **keep newest timestamp** |

Filter the table; **Exportar CSV limpo** / **Exportar vista**.

## Minute 3–4 — Evidence

- Fixture + expected summary: `public/fixtures/before-after/`
- Tests: `npm run test`
- Benchmark: `npm run benchmark` → `docs/BENCHMARK_RESULTS.md` (~60 ms median for 10k rows on this machine’s Node run — cite as relative evidence)

## Minute 4–5 — Honest limits

- Client-side lab: no backend, no auth, no warehouse.
- 5 MB hard cap; soft warn at 10k rows; main-thread processing.
- Next increments: Web Worker, Playwright E2E, mapping presets in localStorage.

## Optional deeper dive

- Ambiguous date bug + fix narrative (P0 found via fixture).
- Privacy: nothing leaves the browser tab.
