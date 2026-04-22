'use client'

import { useAppStore } from '@/store/app-store'
import { MetricsGrid } from './metrics-grid'
import { ChartLeadsOverTime } from './chart-leads-over-time'
import { ChartSource } from './chart-source'
import { ChartStatus } from './chart-status'
import { DataQualityCard } from './data-quality-card'
import { LeadsTable } from '@/components/table/leads-table'

export function DashboardView() {
  const aggregatedData = useAppStore((s) => s.aggregatedData)
  const dataQuality = useAppStore((s) => s.dataQuality)
  const leads = useAppStore((s) => s.leads)

  if (!aggregatedData || !dataQuality) {
    return (
      <div className="flex flex-1 items-center justify-center py-20">
        <p className="text-sm text-muted-foreground">Nenhum dado processado.</p>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          Dashboard de Leads
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          {leads.length} leads processados · dados mantidos apenas no navegador
        </p>
      </div>

      {/* KPI Metrics */}
      <MetricsGrid metrics={aggregatedData.metrics} />

      {/* Charts row */}
      <div className="grid gap-4 lg:grid-cols-2">
        <ChartLeadsOverTime data={aggregatedData.timeSeries} />
        <div className="grid gap-4">
          <ChartSource data={aggregatedData.sourceBreakdown} />
          <ChartStatus data={aggregatedData.statusBreakdown} />
        </div>
      </div>

      {/* Data Quality */}
      <DataQualityCard quality={dataQuality} />

      {/* Table */}
      <LeadsTable />
    </div>
  )
}
