'use client'

import { Download } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAppStore } from '@/store/app-store'
import { MetricsGrid } from './metrics-grid'
import { ChartLeadsOverTime } from './chart-leads-over-time'
import { ChartSource } from './chart-source'
import { ChartStatus } from './chart-status'
import { DataQualityCard } from './data-quality-card'
import { TransformReportCard } from './transform-report-card'
import { LeadsTable } from '@/components/table/leads-table'
import { downloadCSV, leadsToCSV } from '@/lib/export'

export function DashboardView() {
  const aggregatedData = useAppStore((s) => s.aggregatedData)
  const dataQuality = useAppStore((s) => s.dataQuality)
  const transformReport = useAppStore((s) => s.transformReport)
  const leads = useAppStore((s) => s.leads)

  if (!aggregatedData || !dataQuality) {
    return (
      <div className="flex flex-1 items-center justify-center py-20 px-4">
        <div className="max-w-sm text-center space-y-2">
          <p className="text-sm font-medium text-foreground">Nenhum dado processado</p>
          <p className="text-sm text-muted-foreground">
            Faça upload de um CSV ou carregue os dados de exemplo para gerar o dashboard.
          </p>
        </div>
      </div>
    )
  }

  const handleExport = () => {
    if (leads.length === 0) return
    const csv = leadsToCSV(leads)
    const stamp = new Date().toISOString().slice(0, 10)
    downloadCSV(csv, `leads-limpos-${stamp}.csv`)
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">
            Dashboard de Leads
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {leads.length} leads processados · dados mantidos apenas no navegador
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          className="gap-1.5 self-start sm:self-auto"
          onClick={handleExport}
          disabled={leads.length === 0}
        >
          <Download className="h-3.5 w-3.5" aria-hidden />
          Exportar CSV limpo
        </Button>
      </div>

      {leads.length === 0 ? (
        <div className="rounded-xl border border-border bg-surface p-8 text-center shadow-card">
          <p className="text-sm font-medium text-foreground">
            Nenhuma linha válida após o processamento
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            Revise o mapeamento de colunas ou o arquivo de origem. Veja o relatório de qualidade abaixo.
          </p>
        </div>
      ) : (
        <>
          <MetricsGrid metrics={aggregatedData.metrics} />

          <div className="grid gap-4 lg:grid-cols-2">
            <ChartLeadsOverTime data={aggregatedData.timeSeries} />
            <div className="grid gap-4">
              <ChartSource data={aggregatedData.sourceBreakdown} />
              <ChartStatus data={aggregatedData.statusBreakdown} />
            </div>
          </div>
        </>
      )}

      <DataQualityCard quality={dataQuality} />

      {transformReport && <TransformReportCard report={transformReport} />}

      {leads.length > 0 && <LeadsTable />}
    </div>
  )
}
