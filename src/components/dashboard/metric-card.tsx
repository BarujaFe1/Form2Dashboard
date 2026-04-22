'use client'

import { cn } from '@/lib/utils'

interface MetricCardProps {
  label: string
  value: string | number
  detail?: string
  accent?: boolean
}

export function MetricCard({ label, value, detail, accent }: MetricCardProps) {
  return (
    <div
      className={cn(
        'rounded-xl border border-border bg-surface p-5 shadow-card transition-colors',
        accent && 'border-primary/20 bg-teal-soft'
      )}
    >
      <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
        {label}
      </p>
      <p
        className={cn(
          'mt-2 text-2xl font-semibold tracking-tight',
          accent ? 'text-primary' : 'text-foreground'
        )}
      >
        {value}
      </p>
      {detail && (
        <p className="mt-1 text-xs text-muted-foreground">{detail}</p>
      )}
    </div>
  )
}
