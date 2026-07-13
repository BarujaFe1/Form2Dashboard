'use client'

import { Activity, ArrowRightLeft, Timer } from 'lucide-react'
import type { TransformReport } from '@/types'
import { formatPercent } from '@/lib/utils'

interface TransformReportCardProps {
  report: TransformReport
}

export function TransformReportCard({ report }: TransformReportCardProps) {
  const { before, after, transformations, profile } = report

  return (
    <div className="rounded-xl border border-border bg-surface p-5 shadow-card space-y-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          <ArrowRightLeft className="h-4 w-4 text-primary" aria-hidden />
          <div>
            <h3 className="text-sm font-medium text-foreground">
              Relatório de transformação
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              Antes → depois do pipeline de limpeza (validação, normalização, dedupe)
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 rounded-md border border-border bg-muted/40 px-2.5 py-1 text-xs text-muted-foreground">
          <Timer className="h-3.5 w-3.5" aria-hidden />
          {profile.totalMs.toFixed(1)} ms · {profile.inputRows} → {profile.outputLeads} leads
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <BeforeAfterPanel
          title="Antes"
          rows={[
            { label: 'Linhas brutas', value: String(before.rawRows) },
            { label: 'Origens distintas (raw)', value: String(before.distinctRawSources) },
            { label: 'Status distintos (raw)', value: String(before.distinctRawStatuses) },
            { label: 'Issues de validação', value: String(before.issueCounts.total) },
          ]}
        />
        <BeforeAfterPanel
          title="Depois"
          rows={[
            { label: 'Leads únicos', value: String(after.leads) },
            { label: 'Descartadas', value: String(after.invalidRows) },
            { label: 'Duplicatas removidas', value: String(after.duplicatesRemoved) },
            {
              label: 'Retenção',
              value: formatPercent(after.retentionRate),
            },
          ]}
        />
      </div>

      <div>
        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-2">
          O que o pipeline fez
        </p>
        <ul className="space-y-1.5">
          {transformations.map((item) => (
            <li key={item} className="flex items-start gap-2 text-xs text-foreground">
              <Activity className="mt-0.5 h-3 w-3 shrink-0 text-primary" aria-hidden />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {profile.stages.length > 0 && (
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-2">
            Profiling por etapa
          </p>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {profile.stages.map((stage) => (
              <div
                key={stage.stage}
                className="rounded-lg border border-border bg-muted/30 px-3 py-2"
              >
                <p className="text-[11px] uppercase tracking-wide text-muted-foreground">
                  {stageLabel(stage.stage)}
                </p>
                <p className="text-sm font-semibold text-foreground">
                  {stage.durationMs.toFixed(1)} ms
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {(before.topRawSources.length > 0 || before.topRawStatuses.length > 0) && (
        <div className="grid gap-3 sm:grid-cols-2">
          <ValueList title="Origens brutas (top)" items={before.topRawSources} />
          <ValueList title="Status brutos (top)" items={before.topRawStatuses} />
        </div>
      )}
    </div>
  )
}

function stageLabel(stage: string): string {
  switch (stage) {
    case 'validate':
      return 'Validar'
    case 'clean':
      return 'Limpar'
    case 'aggregate':
      return 'Agregar'
    case 'report':
      return 'Relatório'
    default:
      return stage
  }
}

function BeforeAfterPanel({
  title,
  rows,
}: {
  title: string
  rows: { label: string; value: string }[]
}) {
  return (
    <div className="rounded-lg border border-border bg-muted/20 p-3">
      <p className="text-xs font-medium text-foreground mb-2">{title}</p>
      <dl className="space-y-1.5">
        {rows.map((row) => (
          <div key={row.label} className="flex items-center justify-between gap-2">
            <dt className="text-xs text-muted-foreground">{row.label}</dt>
            <dd className="text-xs font-semibold text-foreground">{row.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  )
}

function ValueList({
  title,
  items,
}: {
  title: string
  items: { value: string; count: number }[]
}) {
  if (items.length === 0) return null
  return (
    <div>
      <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-2">
        {title}
      </p>
      <ul className="space-y-1">
        {items.slice(0, 5).map((item) => (
          <li
            key={`${item.value}-${item.count}`}
            className="flex justify-between gap-2 text-xs text-muted-foreground"
          >
            <span className="truncate text-foreground">{item.value}</span>
            <span>{item.count}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
