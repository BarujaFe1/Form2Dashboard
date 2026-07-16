<div align="center">
  <img src="./icon.png" alt="Form2Dashboard Logo" width="120" height="120" />

  <h1>Form2Dashboard</h1>

  <p><strong>CSV de formulário bagunçado → colunas limpas → dashboard interativo.</strong></p>
  <p><strong>Messy form CSVs → cleaned columns → interactive dashboards.</strong></p>

  <p>
    <a href="#pt-br">PT-BR</a>
     · 
    <a href="#english">English</a>
     · 
    <a href="#live-demo">Live Demo</a>
     · 
    <a href="#stack">Stack</a>
     · 
    <a href="#architecture">Architecture</a>
     · 
    <a href="#quick-start">Quick Start</a>
     · 
    <a href="#author">Author</a>
  </p>

  <p>
    <img alt="Next.js-16" src="https://img.shields.io/badge/Next.js-16-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" />
    <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" />
    <img alt="Recharts" src="https://img.shields.io/badge/Recharts-FF7300?style=for-the-badge" />
    <img alt="Status-Lab%20demo" src="https://img.shields.io/badge/Status-Lab%20demo-22C55E?style=for-the-badge" />
    <img alt="License-MIT" src="https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge" />
  </p>

  <p>
    <a href="https://form2dashboard.vercel.app"><strong>Live Demo</strong></a>
     · 
    <a href="https://github.com/BarujaFe1/Form2Dashboard"><strong>Repo</strong></a>
     · 
    <a href="https://barujafe.vercel.app/"><strong>Portfolio</strong></a>
     · 
    <a href="https://www.linkedin.com/in/barujafe/"><strong>LinkedIn</strong></a>
  </p>
</div>


> **Lab / demo notice:** client-side Next.js data product. Parsing/cleaning happens in the browser (Papa Parse + app logic) — not a hosted ETL warehouse.

---

## PT-BR

### Visão geral
O **Form2Dashboard** recebe CSV de formulários, ajuda a mapear/limpar colunas e gera KPIs + gráficos + tabela interativa.

### Problema
Exportações de Typeform/Google Forms/etc. chegam com nomes ruins, tipos misturados e sem cockpit — analistas perdem tempo em Excel repetitivo.

### Para quem
Operações, PMs e analistas que precisam de um **dashboard rápido** a partir de CSV de formulário.

### Funcionalidades
- Upload de CSV (Papa Parse)
- Mapeamento / limpeza de colunas
- KPIs operacionais e visualizações (Recharts)
- Tabela interativa (`@tanstack/react-table`)
- Estado local (Zustand) + UI shadcn-style

### Escopo e limites (honestos)
- Demo front-end — sem pipeline enterprise nem multi-tenant auth
- Qualidade depende do CSV de entrada
- Não conecta diretamente a APIs de form builders (importação = arquivo)

---

## English

### Overview
**Form2Dashboard** takes form CSVs, helps map/clean columns and builds KPIs + charts + an interactive table.

### Problem
Typeform/Google Forms exports arrive with messy names and mixed types — analysts burn time in repetitive spreadsheets.

### Who it is for
Ops, PMs and analysts who need a **fast dashboard** from form CSV exports.

### Features
- CSV upload (Papa Parse)
- Column mapping / cleaning
- Operational KPIs and Recharts visuals
- Interactive table (`@tanstack/react-table`)
- Local state (Zustand) + shadcn-style UI

### Scope and honest limits
- Frontend demo — no enterprise ETL or multi-tenant auth
- Output quality depends on the input CSV
- No direct form-builder API connectors (file import)

---

## Live Demo

| Surface | URL |
|---|---|
| **Public lab** | [https://form2dashboard.vercel.app](https://form2dashboard.vercel.app) |
| **GitHub** | see Repo badge above |

**How to try:** upload a sample/CSV → map columns → review KPIs/charts → filter the interactive table.



## Stack

| Layer | Technology |
|---|---|
| Web | Next.js 16, React 19, TypeScript, Tailwind |
| Data UI | Papa Parse, Zustand, TanStack Table, Recharts |

---

## Architecture

```txt
src/           App Router UI + cleaning/mapping logic
public/        static assets / seed hints
icon.png       brand
```

Flow: CSV → parse → map/clean → aggregates → dashboard.

---

## Quick Start

```bash
npm install
npm run dev
```

---

## Technical decisions

- **Browser-side pipeline** for a zero-backend portfolio demo
- **Explicit column mapping** instead of silent type guesses only
- Table + charts together so ops can validate rows, not only KPIs

---

## Roadmap

- More seed datasets and mapping presets
- Export of cleaned CSV / dashboard snapshot
- Optional server persistence later

---

## Author

**Felipe Alirio Baruja** — data / product / full-stack portfolio.

- Portfolio: [https://barujafe.vercel.app/](https://barujafe.vercel.app/)
- GitHub: [https://github.com/BarujaFe1](https://github.com/BarujaFe1)
- LinkedIn: [https://www.linkedin.com/in/barujafe/](https://www.linkedin.com/in/barujafe/)


## License

MIT (stated in project docs). Add a root `LICENSE` file if you want SPDX clarity on GitHub.
