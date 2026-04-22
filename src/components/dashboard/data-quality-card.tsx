'use client'

import { ShieldCheck, AlertTriangle } from 'lucide-react'
import type { DataQuality } from '@/types'

interface DataQualityCardProps {
  quality: DataQuality
}

export function DataQualityCard({ quality }: DataQualityCardProps) {
  const hasWarnings = quality.warnings.length > 0 || quality.invalidRows > 0

  return (
    <div className="rounded-xl border border-border bg-surface p-5 shadow-card">
      <div className="flex items-center gap-2 mb-3">
        <ShieldCheck className="h-4 w-4 text-primary" />
        <h3 className="text-sm font-medium text-foreground">
          Qualidade dos dados
        </h3>
      </div>

      <div className="grid grid-cols-2 gap-x-6 gap-y-2 sm:grid-cols-4">
        <Stat label="Linhas lidas" value={quality.totalRawRows} />
        <Stat label="Válidas" value={quality.validRows} positive />
        <Stat label="Descartadas" value={quality.invalidRows} negative={quality.invalidRows > 0} />
        <Stat label="Duplicatas removidas" value={quality.duplicatesRemoved} />
      </div>

      {hasWarnings && (
        <div className="mt-4 space-y-1.5">
          {quality.invalidRows > 0 && (
            <Warning text={`${quality.invalidRows} linha(s) ignorada(s) por dados inválidos`} />
          )}
          {quality.duplicatesRemoved > 0 && (
            <Warning text={`${quality.duplicatesRemoved} duplicata(s) removida(s) por e-mail`} />
          )}
          {quality.warnings.slice(0, 5).map((w, i) => (
            <Warning key={i} text={w} />
          ))}
          {quality.warnings.length > 5 && (
            <p className="text-xs text-muted-foreground pl-5">
              +{quality.warnings.length - 5} avisos adicionais
            </p>
          )}
        </div>
      )}

      {!hasWarnings && (
        <p className="mt-3 text-xs text-muted-foreground">
          Todos os dados foram processados sem problemas.
        </p>
      )}
    </div>
  )
}

function Stat({
  label, value, positive, negative,
}: {
  label: string; value: number; positive?: boolean; negative?: boolean
}) {
  return (
    <div>
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className={`text-lg font-semibold ${
        positive ? 'text-emerald-600 dark:text-emerald-400' : negative ? 'text-amber-600 dark:text-amber-400' : 'text-foreground'
      }`}>
        {value}
      </p>
    </div>
  )
}

function Warning({ text }: { text: string }) {
  return (
    <div className="flex items-start gap-1.5">
      <AlertTriangle className="mt-0.5 h-3 w-3 shrink-0 text-amber-500" />
      <p className="text-xs text-muted-foreground">{text}</p>
    </div>
  )
}
