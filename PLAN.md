# PLAN: Form2Dashboard Continuation and Polish

## 1. Audit Summary
- **What already exists**: Complete Next.js + Tailwind + shadcn setup. Core pipeline (parser, mapper, validator, cleaner, aggregator) is implemented. Zustand store and UI components (Upload, Mapping, Dashboard, Table, Charts) are built and functional. Seed data is present.
- **What works**: End-to-end flow from upload/seed to mapping and dashboard generation. Data processing and metric aggregation. Table searching and filtering.
- **What looks weak / needs polish**:
  - Filter dropdowns display `__all__` instead of Portuguese labels when "All" is selected.
  - Mobile header is too crowded.
  - Recharts component responsiveness (potential layout console warnings).
  - Data Quality Card uses strong error/warning colors which distract from the minimal UI.
  - Table lacks responsiveness (too many columns on mobile).
  - Unused `REQUIRED_FIELDS` warning in `column-mapper.tsx`.
- **What is missing**: Mobile-specific adjustments (hiding columns, wrapping header items).

## 2. Execution Steps
1. **Fix Filter Labels**: Update `table-filters.tsx` to handle `__all__` properly in `SelectValue`.
2. **Optimize Mobile Header**: Adjust `header.tsx` to ensure proper spacing and visibility on small screens.
3. **Refine Dashboard Charts**: Fix responsive container warnings by ensuring explicit min-heights or handling the width/height correctly. Adjust the Donut chart legend/layout for mobile.
4. **Polish Data Quality Card**: Soften the colors in `data-quality-card.tsx` to align with the Apple-like minimal aesthetic.
5. **Mobile Table View**: Update `leads-table.tsx` to hide non-essential columns (Company) on mobile screens.
6. **Fix Warnings**: Remove unused `REQUIRED_FIELDS` import in `column-mapper.tsx`.
7. **Validation**: Run type-check, lint, and build.

## 3. Post-execution
- Update README if necessary.
- Create SUMMARY.md for the next handoff.
