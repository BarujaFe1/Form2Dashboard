<div align="center">
  <img src="./public/og-image.png" alt="Form2Dashboard Banner" width="100%" style="border-radius: 8px; margin-bottom: 24px;" />

  <h1>Form2Dashboard</h1>
  <p><strong>Take ugly operational data. Get useful clarity in seconds.</strong></p>

  <p>
    <img src="https://img.shields.io/badge/build-passing-brightgreen?style=flat-square" alt="Build Status" />
    <img src="https://img.shields.io/badge/license-MIT-blue?style=flat-square" alt="License" />
    <img src="https://img.shields.io/badge/made%20with-Next.js-black?style=flat-square&logo=next.js" alt="Made with Next.js" />
    <img src="https://img.shields.io/badge/language-TypeScript-blue?style=flat-square&logo=typescript" alt="TypeScript" />
    <img src="https://img.shields.io/badge/deployed_on-Vercel-black?style=flat-square&logo=vercel" alt="Deployed on Vercel" />
  </p>
</div>

---

## Overview

**Form2Dashboard** is a premium, client-side operational dashboard designed to instantly transform messy CSV exports—such as raw Google Forms responses—into a clean, structured, and highly visual analytics interface. 

Real-world operational data is rarely clean. It often contains duplicate entries, inconsistent casing, unparseable dates, and missing fields. Form2Dashboard bridges the gap between raw data collection and actionable insight by automatically mapping, validating, and cleaning your datasets before presenting them in an elegant, Apple-inspired interface.

Unlike generic BI tools that require complex backend integrations, or simple admin templates that lack data processing logic, Form2Dashboard handles the entire pipeline entirely within the user's browser. It is built for product teams, marketers, and operators who need immediate clarity without the overhead of engineering a custom backend.

## Live Demo

🔗 **[View Live Demo on Vercel](https://form2dashboard.vercel.app)**

> **💡 Try it instantly:** You don't need your own data to test the application! Click the **"Load Demo Data"** button on the landing page to instantly populate the dashboard with our realistic seed dataset.

🔒 **Privacy First:** All data processing, validation, and aggregation happens 100% locally in your browser. No CSV data is ever uploaded to a server or stored in a database.

---

## Screenshots

<div align="center">
  <figure>
    <img src="./public/screenshots/upload.png" alt="Upload Screen" width="800" style="border-radius: 8px; border: 1px solid #eaeaea;" />
    <figcaption><em>Clean, drag-and-drop CSV upload interface.</em></figcaption>
  </figure>
  <br/>
  <figure>
    <img src="./public/screenshots/mapper.png" alt="Column Mapper" width="800" style="border-radius: 8px; border: 1px solid #eaeaea;" />
    <figcaption><em>Intelligent auto-detection and column mapping.</em></figcaption>
  </figure>
  <br/>
  <figure>
    <img src="./public/screenshots/dashboard.png" alt="Dashboard View" width="800" style="border-radius: 8px; border: 1px solid #eaeaea;" />
    <figcaption><em>Comprehensive dashboard with KPI metrics, charts, and table.</em></figcaption>
  </figure>
  <br/>
  <figure>
    <img src="./public/screenshots/dark-mode.png" alt="Dark Mode" width="800" style="border-radius: 8px; border: 1px solid #333;" />
    <figcaption><em>Polished dark mode support out of the box.</em></figcaption>
  </figure>
</div>

---

## Features

### 📥 Data Ingestion
- **Drag & Drop Upload**: Fluid, animated dropzone for CSV files.
- **Auto-Detection**: Intelligently guesses column mappings based on common Portuguese header names (e.g., "Nome", "E-mail", "Carimbo de data/hora").
- **Seed Data Integration**: One-click demo initialization.

### 🧹 Validation & Cleaning
- **Strict Typing**: Enforces required fields, email formatting, and valid timestamps.
- **Smart Deduplication**: Identifies duplicate emails and automatically keeps the most recent entry.
- **Graceful Fallbacks**: Normalizes unknown statuses to default values with warnings rather than outright failures.

### 📊 Metrics
Instant calculation of 5 core Key Performance Indicators (KPIs):
- **Total Leads**: Valid, deduplicated lead count.
- **Converted Leads**: Total leads successfully converted.
- **Conversion Rate**: Percentage of converted leads versus total.
- **Qualified Leads**: Number of leads currently in the qualified stage.
- **Active Sources**: Distinct acquisition channels.

### 📈 Visualizations
- **Leads Over Time**: Smooth Area chart displaying daily acquisition trends.
- **Source Distribution**: Donut chart breaking down leads by acquisition channel.
- **Pipeline Status**: Bar chart showing the distribution of leads across different funnel stages.

### 📋 Interactive Table
- **Global Search**: Filter rows across name, email, and company instantly.
- **Faceted Filters**: Dropdowns to filter by specific Status or Source.
- **Sorting & Pagination**: Fully client-side sorted columns and paginated views.

### ✨ UX Quality
- **Premium Aesthetics**: Minimalist, high-contrast, Apple-like design language.
- **Responsive Layouts**: Fluidly adapts from mobile viewports to ultrawide monitors.
- **Dark Mode**: Flawless system-aware light and dark themes using next-themes.
- **Empty & Error States**: Beautifully crafted fallback screens.

---

## Data Flow

```ascii
[ CSV Upload ] ──▶ [ Parser ] ──▶ [ Column Mapper ] ──▶ [ Validator ] ──▶ [ Cleaner ] ──▶ [ Aggregator ] ──▶ [ Dashboard ]
```

1. **CSV Upload**: The user drops a file, which is read as a raw string into memory.
2. **Parser**: PapaParse converts the raw string into an array of generic JSON objects.
3. **Column Mapper**: The UI allows the user to map CSV columns to the application's domain model.
4. **Validator**: Inspects the mapped data for data integrity (e.g., required fields, valid dates).
5. **Cleaner**: Removes duplicate rows, patches minor issues, and produces an array of strongly-typed `Lead` objects.
6. **Aggregator**: Processes the clean `Lead` array into time-series data, KPI metrics, and category breakdowns.
7. **Dashboard**: The UI renders the aggregated data visually via Recharts and TanStack Table.

---

## Tech Stack

| Layer | Technology | Purpose |
|-------|------------|---------|
| **Framework** | Next.js (App Router) | React framework and routing |
| **UI Library** | React / Tailwind CSS | Component architecture and utility-first styling |
| **Components** | shadcn/ui | Accessible, customizable baseline components |
| **State Mgt.** | Zustand | Lightweight, hook-based global state management |
| **Charts** | Recharts | Composable, responsive SVG charting |
| **Table** | TanStack Table | Headless UI for building powerful datagrids |
| **Data Parsing**| PapaParse | Fast, reliable CSV parsing in the browser |
| **Icons** | Lucide React | Clean, consistent vector iconography |
| **CI / CD** | GitHub Actions | Automated build and lint checks |
| **Deployment** | Vercel | Global edge network hosting |

---

## Project Structure

```text
├── .github/workflows/   # CI/CD pipelines (ci.yml)
├── public/
│   ├── screenshots/     # README assets
│   ├── seed/            # Contains leads-operacionais.csv for demo
│   └── og-image.png     # Open Graph banner
├── src/
│   ├── app/             # Next.js App Router pages and layout
│   ├── components/      # React Components
│   │   ├── dashboard/   # Metrics, charts, and quality cards
│   │   ├── layout/      # Header and structural wrappers
│   │   ├── mapping/     # Column mapping interface
│   │   ├── table/       # Data table, filters, and pagination
│   │   ├── ui/          # shadcn/ui baseline components
│   │   └── upload/      # Drag & drop CSV dropzone
│   ├── config/          # Application constants and labels
│   ├── lib/             # Core Business Logic
│   │   ├── aggregator.ts# Derives KPIs and chart data
│   │   ├── cleaner.ts   # Deduplication and normalization
│   │   ├── parser.ts    # PapaParse wrapper
│   │   ├── utils.ts     # Tailwind merge and formatting helpers
│   │   └── validator.ts # Data integrity rules
│   ├── store/           # Zustand state (app-store.ts)
│   └── types/           # TypeScript domain interfaces
└── README.md            # This document
```

---

## Getting Started

### Prerequisites
- Node.js 18+
- npm or pnpm

### Installation

```bash
git clone https://github.com/BarujaFe1/Form2Dashboard.git
cd Form2Dashboard
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Using with your own data
1. Export your Google Forms responses (or any CRM export) as a CSV file.
2. Upload the file on the landing page dropzone.
3. Map your CSV columns to the required application fields (Name, Email, Timestamp, etc.).
4. View your cleanly processed dashboard instantly.

### Using demo data
If you just want to see the application in action without preparing a CSV, use the included seed data. The dataset is located at `public/seed/leads-operacionais.csv` and can be loaded automatically by clicking the **"Load Demo Data"** button on the initial screen.

---

## Seed Data

The provided seed dataset (`leads-operacionais.csv`) is specifically designed to demonstrate the application's processing capabilities. It contains:
- **~120 rows** of realistic Brazilian lead data.
- **3 months of timestamps** to generate meaningful time-series trends.
- **All 5 status values** (`novo`, `contatado`, `qualificado`, `perdido`, `convertido`).
- **6 different source channels** (Organic, Paid, Referral, Social, Email, Other).
- **Intentional anomalies**: Includes duplicate emails and missing data to showcase the validator and cleaner in action.

---

## Validation Rules

| Rule | Behavior | User message |
|------|----------|--------------|
| **Required field empty** | Row ignored, counted in errors | _"Linha [X]: Campo obrigatório ausente: [Campo]"_ |
| **Invalid email** | Row ignored | _"Linha [X]: E-mail inválido: [Valor]"_ |
| **Unparseable date** | Row ignored | _"Linha [X]: Data inválida no campo timestamp"_ |
| **Duplicate email** | Keeps most recent entry | _Warning added to Data Quality card_ |
| **Unknown status** | Normalized to "novo" | _Warning added to Data Quality card_ |
| **Empty CSV** | Upload blocked | _"O arquivo CSV está vazio."_ |

---

## Data Schema

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

## Design System

Form2Dashboard employs a deliberate, premium visual direction:
- **Aesthetic**: Apple-like, minimal, elegant, and highly legible.
- **Framework**: Tailwind CSS paired with custom-styled `shadcn/ui` components.
- **Palette**: A restrained, warm neutral background system (zinc/slate) accented with a vibrant primary teal for interactive elements and data highlights.
- **Themes**: First-class support for both Light and Dark modes.
- **Data Vis**: Recharts implemented with a curated, semantic color palette to prevent visual overload.
- **Typography**: Focus on generous breathing room, tight typographic hierarchy, and structural polish.

---

## Roadmap

| Version | Status | What it brings |
|---------|--------|----------------|
| **V1.0** | ✅ Complete | CSV upload, mapping, validation, cleaning, full dashboard |
| **V1.1** | 🔜 Planned | CSV export, advanced table filters, improved mapping logic |
| **V2.0** | 💡 Planned | Direct Google Sheets URL import, custom alert thresholds |

---

## Contributing

Contributions are welcome! If you'd like to improve Form2Dashboard:
1. Fork the repository.
2. Create a new feature branch (`git checkout -b feature/amazing-feature`).
3. Commit your changes (`git commit -m 'feat: add amazing feature'`).
4. Push to the branch (`git push origin feature/amazing-feature`).
5. Open a Pull Request.

---

## License

This project is licensed under the MIT License.

---

## Author

**Felipe Baruja**  
Product Engineer · Data & Automation  
[LinkedIn](https://www.linkedin.com/in/felipebaruja) · [GitHub](https://github.com/BarujaFe1)

---

## Acknowledgments

Special thanks to the incredible open-source tools that make this possible:
- [Next.js](https://nextjs.org/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Recharts](https://recharts.org/)
- [TanStack Table](https://tanstack.com/table)
- [PapaParse](https://www.papaparse.com/)
- [Zustand](https://github.com/pmndrs/zustand)
