'use client'

import { MetricCard } from './metric-card'
import type { DashboardMetrics } from '@/types'
import { formatPercent } from '@/lib/utils'

interface MetricsGridProps {
  metrics: DashboardMetrics
}

export function MetricsGrid({ metrics }: MetricsGridProps) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
      <MetricCard
        label="Total de leads"
        value={metrics.totalLeads}
        accent
      />
      <MetricCard
        label="Convertidos"
        value={metrics.convertedLeads}
        detail={`Taxa: ${formatPercent(metrics.conversionRate)}`}
      />
      <MetricCard
        label="Qualificados"
        value={metrics.qualifiedLeads}
      />
      <MetricCard
        label="Taxa de contato"
        value={formatPercent(metrics.contactRate)}
      />
      <MetricCard
        label="Fontes ativas"
        value={metrics.activeSources}
        detail={`Principal: ${metrics.topSource}`}
      />
    </div>
  )
}
