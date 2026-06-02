<div align="center">
  <img src="./icon.png" alt="Form2Dashboard Logo" width="120" height="120" />

  <h1>Form2Dashboard</h1>

  <p><strong>Transforme CSVs operacionais bagunçados em clareza útil em segundos</strong></p>
  <p><strong>Take ugly operational data and get useful clarity in seconds</strong></p>

  <p>
    <a href="#pt-br">PT-BR</a> •
    <a href="#en">English</a> •
    <a href="#tech-stack">Tech Stack</a> •
    <a href="#quick-start--início-rápido">Quick Start</a> •
    <a href="#data-pipeline--pipeline-de-dados">Pipeline</a> •
    <a href="#autor--author">Autor</a>
  </p>

  <p>
    <img src="https://img.shields.io/badge/build-passing-brightgreen.svg" alt="Build Passing" />
    <img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="MIT License" />
    <img src="https://img.shields.io/badge/Next.js-15-black.svg?logo=next.js&logoColor=white" alt="Next.js 15" />
    <img src="https://img.shields.io/badge/TypeScript-strict-3178C6.svg?logo=typescript&logoColor=white" alt="TypeScript Strict" />
    <img src="https://img.shields.io/badge/Tailwind-CSS-38BDF8.svg?logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
    <img src="https://img.shields.io/badge/deployed%20on-Vercel-black.svg?logo=vercel&logoColor=white" alt="Vercel" />
  </p>

  <p>
    <a href="https://form2dashboard.vercel.app"><strong>🌐 Live Demo</strong></a> •
    <a href="https://github.com/BarujaFe1/Form2Dashboard"><strong>📦 Repository</strong></a> •
    <a href="https://barujafe.vercel.app/"><strong>👤 Portfolio</strong></a>
  </p>
</div>

---

<a id="pt-br"></a>

## 🇧🇷 PT-BR

## 📊 Visão geral

**Form2Dashboard** é um dashboard operacional premium, totalmente client-side, que transforma exportações CSV bagunçadas — como respostas brutas do Google Forms — em uma interface analítica limpa, estruturada e visualmente clara.

Dados operacionais do mundo real raramente chegam prontos para análise. Eles costumam ter campos ausentes, e-mails inválidos, datas difíceis de interpretar, capitalização inconsistente, status fora do padrão e registros duplicados.

O Form2Dashboard resolve esse atrito executando todo o pipeline de dados diretamente no navegador do usuário:

- upload;
- parsing;
- mapeamento de colunas;
- validação;
- limpeza;
- deduplicação;
- agregação;
- dashboard visual.

> **Privacidade por design:** o CSV nunca sai da máquina do usuário. Todo o processamento acontece localmente no browser, sem servidor, sem banco de dados e sem configuração complexa.

---

## 🎯 Problema que resolve

Muitas operações começam coletando dados em formulários simples, mas terminam com uma planilha difícil de interpretar. Antes de qualquer decisão, é preciso gastar tempo com tarefas repetitivas:

- baixar o CSV;
- abrir em planilha;
- corrigir campos;
- interpretar datas;
- remover duplicados;
- padronizar status;
- montar gráficos;
- calcular métricas;
- explicar a qualidade dos dados.

Esse processo é lento, manual e pouco apresentável.

O **Form2Dashboard** transforma essa rotina em uma experiência guiada: o usuário envia o CSV, confirma o mapeamento e recebe um painel pronto para leitura.

---

## 💡 Proposta

A proposta do projeto é oferecer um produto simples, elegante e útil para transformar dados operacionais ruins em clareza acionável.

Diferente de ferramentas de BI genéricas, que exigem conexão com banco ou configuração de backend, o Form2Dashboard roda inteiramente no frontend. Diferente de templates administrativos comuns, ele possui lógica real de processamento de dados.

O foco é ser:

- rápido;
- privado;
- demonstrável;
- visualmente premium;
- fácil de usar;
- tecnicamente sólido;
- ideal para dados exportados de formulários.

---

## ✨ Funcionalidades principais

### 📥 Ingestão de dados

- Upload por drag and drop.
- Validação visual do arquivo.
- Suporte a CSV operacional.
- Carregamento de demo com um clique.
- Auto-detecção inteligente de colunas com nomes comuns, como:
  - `Nome`
  - `E-mail`
  - `Carimbo de data/hora`
  - `Status`
  - `Origem`

---

### 🧭 Mapeamento de colunas

- Interface para associar colunas do CSV aos campos do domínio.
- Detecção automática com possibilidade de ajuste manual.
- Campos obrigatórios destacados.
- Experiência guiada antes de gerar o painel.

---

### 🧹 Validação e limpeza

- Campos obrigatórios: `timestamp`, `name`, `email`.
- Validação de formato de e-mail.
- Parsing de datas em múltiplos formatos.
- Normalização de strings, origens e status.
- Deduplicação por e-mail.
- Manutenção do registro mais recente em caso de duplicidade.
- Relatório de linhas ignoradas e avisos de qualidade.

---

### 📊 KPIs operacionais

| Métrica | Descrição |
|---|---|
| **Total de Leads** | Leads válidos e deduplicados |
| **Convertidos** | Leads com status `convertido` |
| **Taxa de Conversão** | Convertidos ÷ Total × 100% |
| **Qualificados** | Leads com status `qualificado` ou `convertido` |
| **Origens Ativas** | Canais de aquisição distintos no dataset |

---

### 📈 Visualizações

- Leads ao longo do tempo.
- Distribuição por origem.
- Status do pipeline.
- Gráficos responsivos com Recharts.
- Escala temporal automática para leitura semanal ou mensal.

---

### 📋 Tabela interativa

- Busca global por nome, e-mail e empresa.
- Filtro por origem.
- Filtro por status.
- Colunas ordenáveis.
- Paginação com 25 linhas por página.
- Callout de qualidade com:
  - percentual válido;
  - duplicatas removidas;
  - linhas ignoradas;
  - avisos de normalização.

---

### ✨ Experiência de usuário

- Dark/light mode com detecção automática do sistema.
- Toggle manual de tema.
- Skeleton loaders.
- Estados de vazio, erro e carregamento.
- Design responsivo de mobile até ultrawide.
- Interface limpa, moderna e apresentável.

---

## 🖼️ Screenshots

Adicione os arquivos em `public/screenshots/` para exibir as telas no README:

```md
<div align="center">
  <img src="./public/screenshots/upload.png" alt="Upload Screen" width="800" />
  <p><em>Clean drag-and-drop CSV upload interface</em></p>

  <img src="./public/screenshots/mapper.png" alt="Column Mapper" width="800" />
  <p><em>Intelligent auto-detection and column mapping</em></p>

  <img src="./public/screenshots/dashboard.png" alt="Dashboard Light Mode" width="800" />
  <p><em>KPI cards, charts and filterable table</em></p>

  <img src="./public/screenshots/dark-mode.png" alt="Dashboard Dark Mode" width="800" />
  <p><em>First-class dark mode support</em></p>
</div>
```

---

<a id="en"></a>

## 🇺🇸 English

## 📊 Overview

**Form2Dashboard** is a premium, fully client-side operational dashboard that transforms messy CSV exports — such as raw Google Forms responses — into a clean, structured and highly visual analytics interface.

Real-world operational data is rarely analysis-ready. It often contains missing fields, invalid emails, hard-to-parse dates, inconsistent casing, non-standard statuses and duplicate records.

Form2Dashboard solves this friction by running the entire data pipeline directly in the user's browser:

- upload;
- parsing;
- column mapping;
- validation;
- cleaning;
- deduplication;
- aggregation;
- visual dashboard.

> **Privacy by design:** the CSV never leaves the user's machine. All processing runs locally in the browser, with no server, no database and no complex configuration.

---

## 🎯 Problem solved

Many operations start by collecting data through simple forms, but end up with a spreadsheet that is hard to interpret. Before making any decision, users often need to spend time on repetitive tasks:

- downloading the CSV;
- opening it in a spreadsheet;
- fixing fields;
- interpreting dates;
- removing duplicates;
- standardizing statuses;
- building charts;
- calculating metrics;
- explaining data quality.

This workflow is slow, manual and not very presentable.

**Form2Dashboard** turns this routine into a guided experience: the user uploads a CSV, confirms the mapping and receives a ready-to-read dashboard.

---

## 💡 Proposal

The project offers a simple, elegant and useful product for turning bad operational data into actionable clarity.

Unlike generic BI tools that require database connections or backend configuration, Form2Dashboard runs entirely in the frontend. Unlike common admin templates, it includes real data processing logic.

The focus is to be:

- fast;
- private;
- demonstrable;
- visually premium;
- easy to use;
- technically solid;
- ideal for form-exported data.

---

## ✨ Key features

### 📥 Data ingestion

- Drag-and-drop upload.
- Visual file validation.
- Support for operational CSV files.
- One-click demo data loading.
- Smart column auto-detection from common headers such as:
  - `Nome`
  - `E-mail`
  - `Carimbo de data/hora`
  - `Status`
  - `Origem`

---

### 🧭 Column mapping

- Interface to map CSV columns to domain fields.
- Automatic detection with manual override.
- Required fields highlighted.
- Guided experience before generating the dashboard.

---

### 🧹 Validation and cleaning

- Required fields: `timestamp`, `name`, `email`.
- Email format validation.
- Multi-format date parsing.
- String, source and status normalization.
- Email-based deduplication.
- Keeps the most recent record when duplicates exist.
- Report of skipped rows and quality warnings.

---

### 📊 Operational KPIs

| Metric | Description |
|---|---|
| **Total Leads** | Valid, deduplicated leads |
| **Converted** | Leads with `convertido` status |
| **Conversion Rate** | Converted ÷ Total × 100% |
| **Qualified** | Leads with `qualificado` or `convertido` status |
| **Active Sources** | Distinct acquisition channels in the dataset |

---

### 📈 Visualizations

- Leads over time.
- Source distribution.
- Pipeline status.
- Responsive charts with Recharts.
- Automatic weekly/monthly temporal scale.

---

### 📋 Interactive table

- Global search by name, email and company.
- Source filter.
- Status filter.
- Sortable columns.
- Pagination with 25 rows per page.
- Data quality callout with:
  - valid percentage;
  - duplicates removed;
  - skipped rows;
  - normalization warnings.

---

### ✨ User experience

- System-aware dark/light mode.
- Manual theme toggle.
- Skeleton loaders.
- Empty, error and loading states.
- Responsive design from mobile to ultrawide.
- Clean, modern and presentation-ready interface.

---

## 🖼️ Screenshots

Add files to `public/screenshots/` to display the screens in the README:

```md
<div align="center">
  <img src="./public/screenshots/upload.png" alt="Upload Screen" width="800" />
  <p><em>Clean drag-and-drop CSV upload interface</em></p>

  <img src="./public/screenshots/mapper.png" alt="Column Mapper" width="800" />
  <p><em>Intelligent auto-detection and column mapping</em></p>

  <img src="./public/screenshots/dashboard.png" alt="Dashboard Light Mode" width="800" />
  <p><em>KPI cards, charts and filterable table</em></p>

  <img src="./public/screenshots/dark-mode.png" alt="Dashboard Dark Mode" width="800" />
  <p><em>First-class dark mode support</em></p>
</div>
```

---

<a id="tech-stack"></a>

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 App Router |
| Language | TypeScript strict |
| Styling | Tailwind CSS + shadcn/ui |
| State | Zustand |
| Charts | Recharts |
| Table | TanStack Table v8 |
| CSV Parsing | PapaParse |
| Icons | Lucide React |
| CI/CD | GitHub Actions |
| Hosting | Vercel |

---

<a id="data-pipeline--pipeline-de-dados"></a>

## 🔄 Data Pipeline / Pipeline de dados

```txt
[CSV Drop]
   ↓
[PapaParse]
   ↓
[Column Mapper]
   ↓
[Validator]
   ↓
[Cleaner]
   ↓
[Aggregator]
   ↓
[Dashboard]
```

| Step | File | Responsibility |
|---|---|---|
| Parse | `lib/parser.ts` | CSV string → raw `Record<string, string>[]` |
| Map | `components/mapping/` | User assigns CSV columns to domain fields |
| Validate | `lib/validator.ts` | Required fields, email regex, date parsing and deduplication |
| Clean | `lib/cleaner.ts` | Normalize dates, strings, sources and statuses |
| Aggregate | `lib/aggregator.ts` | KPIs, time series and category breakdowns |
| Render | `components/dashboard/` | Recharts + TanStack Table |

---

## 📁 Project Structure / Estrutura do projeto

```txt
form2dashboard/
├── .github/workflows/ci.yml
├── public/
│   ├── og-image.png
│   ├── screenshots/
│   └── seed/
│       └── leads-operacionais.csv
├── src/
│   ├── app/
│   ├── components/
│   │   ├── dashboard/
│   │   ├── layout/
│   │   ├── mapping/
│   │   ├── table/
│   │   ├── ui/
│   │   └── upload/
│   ├── config/
│   ├── lib/
│   │   ├── aggregator.ts
│   │   ├── cleaner.ts
│   │   ├── parser.ts
│   │   ├── utils.ts
│   │   └── validator.ts
│   ├── store/
│   │   └── app-store.ts
│   └── types/
└── README.md
```

---

<a id="quick-start--início-rápido"></a>

## 🚀 Quick Start / Início rápido

### Requirements / Pré-requisitos

- Node.js 18+
- npm or pnpm

### Installation / Instalação

```bash
git clone https://github.com/BarujaFe1/Form2Dashboard.git
cd Form2Dashboard
npm install
npm run dev
```

Open:

```txt
http://localhost:3000
```

---

## 🌐 Live Demo / Demo ao vivo

```txt
https://form2dashboard.vercel.app
```

No data available? Use the built-in demo dataset.

Sem dados próprios? Use o dataset de demonstração integrado.

---

## 🧪 Using your own data / Usando seus próprios dados

1. Export Google Forms responses as CSV.
2. Drop the file on the upload screen.
3. Map columns to required fields.
4. Review validation feedback.
5. Open the generated dashboard.

---

## 🌱 Seed Dataset

The seed dataset `leads-operacionais.csv` was designed to stress-test the entire pipeline:

- 120 rows of realistic Brazilian B2B lead data.
- 3 months of timestamps, from Jan to Mar 2025.
- All 5 pipeline statuses represented.
- 8 acquisition channels.
- Intentional anomalies:
  - 3 duplicate emails;
  - 6 rows with invalid or missing data.

---

## ✅ Validation Rules / Regras de validação

| Rule | Behavior | Message |
|---|---|---|
| Required field empty | Row skipped | `Linha [X]: Campo obrigatório ausente: [field]` |
| Invalid email format | Row skipped | `Linha [X]: E-mail inválido: [value]` |
| Unparseable date | Row skipped | `Linha [X]: Data inválida no campo timestamp` |
| Duplicate email | Most recent kept | Warning in Data Quality card |
| Unknown status value | Normalized to `novo` | Warning in Data Quality card |
| Empty CSV file | Upload blocked | `O arquivo CSV está vazio.` |

---

## 🧬 Data Schema / Schema de dados

```typescript
type LeadStatus = 'novo' | 'contatado' | 'qualificado' | 'perdido' | 'convertido'
type LeadSource = 'orgânico' | 'pago' | 'indicação' | 'redes_sociais' | 'email' | 'outro'

interface Lead {
  id: string
  timestamp: Date
  name: string
  email: string
  phone?: string
  company?: string
  role?: string
  source: LeadSource
  interest?: string
  message?: string
  status: LeadStatus
}
```

---

## 🗺️ Roadmap

| Version | Status | Scope |
|---|---|---|
| V1.0 | Shipped | Upload, mapping, validation, cleaning and full dashboard |
| V1.1 | Next | CSV export, advanced filters and improved auto-mapping |
| V2.0 | Planned | Google Sheets URL import, simple alert thresholds and second template |

---

## 🤝 Contributing / Contribuição

```bash
git checkout -b feature/your-feature
git commit -m "feat: describe your change"
git push origin feature/your-feature
```

Then open a Pull Request.

---

<a id="autor--author"></a>

## 👤 Autor / Author

Developed by **Felipe Baruja** — Product Engineer · Data & Automation.

- **Portfolio:** [https://barujafe.vercel.app/](https://barujafe.vercel.app/)
- **GitHub:** [github.com/BarujaFe1](https://github.com/BarujaFe1)
- **LinkedIn:** [linkedin.com/in/barujafe](https://www.linkedin.com/in/barujafe)
- **Project:** [github.com/BarujaFe1/Form2Dashboard](https://github.com/BarujaFe1/Form2Dashboard)

---

## 📄 License / Licença

MIT License.

See [LICENSE](./LICENSE) for details.

---

## 🙏 Acknowledgments / Agradecimentos

Built with open-source tools:

[Next.js](https://nextjs.org/) · [shadcn/ui](https://ui.shadcn.com/) · [Recharts](https://recharts.org/) · [TanStack Table](https://tanstack.com/table) · [PapaParse](https://www.papaparse.com/) · [Zustand](https://github.com/pmndrs/zustand)

---

<div align="center">
  <p><strong>Form2Dashboard</strong></p>
  <p>Operational CSVs in. Useful clarity out.</p>
  <p><em>CSVs operacionais entram. Clareza útil sai.</em></p>
</div>
