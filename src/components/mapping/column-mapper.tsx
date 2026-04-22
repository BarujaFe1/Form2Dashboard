'use client'

import { useMemo } from 'react'
import { ArrowRight, ArrowLeft, AlertCircle, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { FieldSelect } from './field-select'
import { useAppStore } from '@/store/app-store'
import { FIELD_DEFINITIONS } from '@/config/constants'
import { validateMapping } from '@/lib/mapper'
import type { MappableField } from '@/types'

export function ColumnMapper() {
  const headers = useAppStore((s) => s.headers)
  const mapping = useAppStore((s) => s.columnMapping)
  const updateFieldMapping = useAppStore((s) => s.updateFieldMapping)
  const processData = useAppStore((s) => s.processData)
  const setStep = useAppStore((s) => s.setStep)
  const rawRows = useAppStore((s) => s.rawRows)

  const { isValid, missingFields } = useMemo(
    () => validateMapping(mapping),
    [mapping]
  )

  const usedHeaders = useMemo(() => {
    const used = new Set<string>()
    Object.values(mapping).forEach((v) => {
      if (v) used.add(v)
    })
    return used
  }, [mapping])

  const mappedCount = Object.values(mapping).filter(Boolean).length
  const requiredFields = FIELD_DEFINITIONS.filter((f) => f.required)
  const optionalFields = FIELD_DEFINITIONS.filter((f) => !f.required)

  return (
    <div className="mx-auto max-w-2xl px-4 py-10 sm:py-16">
      <div className="mb-8">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          Mapeamento de colunas
        </h2>
        <p className="mt-1.5 text-sm text-muted-foreground">
          Conecte as colunas do seu CSV aos campos do dashboard.
          {rawRows.length > 0 && (
            <span className="ml-1 text-xs">
              ({rawRows.length} linhas detectadas)
            </span>
          )}
        </p>
      </div>

      {/* Auto-detection feedback */}
      {mappedCount > 0 && (
        <div className="mb-6 flex items-start gap-2 rounded-lg border border-primary/20 bg-teal-soft p-3">
          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
          <p className="text-xs text-foreground">
            <strong>{mappedCount} campos</strong> foram detectados
            automaticamente. Confira e ajuste se necessário.
          </p>
        </div>
      )}

      {/* Required fields */}
      <div className="mb-6">
        <h3 className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Campos obrigatórios
        </h3>
        <div className="divide-y divide-border rounded-lg border border-border bg-surface p-4">
          {requiredFields.map((field) => (
            <FieldSelect
              key={field.key}
              field={field}
              headers={headers}
              value={mapping[field.key]}
              onChange={(value) => updateFieldMapping(field.key, value)}
              usedHeaders={usedHeaders}
            />
          ))}
        </div>
      </div>

      {/* Optional fields */}
      <div className="mb-8">
        <h3 className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Campos opcionais
        </h3>
        <div className="divide-y divide-border rounded-lg border border-border bg-surface p-4">
          {optionalFields.map((field) => (
            <FieldSelect
              key={field.key}
              field={field}
              headers={headers}
              value={mapping[field.key]}
              onChange={(value) => updateFieldMapping(field.key, value)}
              usedHeaders={usedHeaders}
            />
          ))}
        </div>
      </div>

      {/* Validation error */}
      {!isValid && (
        <div className="mb-4 flex items-start gap-2 rounded-lg border border-destructive/20 bg-destructive/5 p-3">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-destructive" />
          <p className="text-xs text-destructive">
            Campos obrigatórios sem mapeamento:{' '}
            {missingFields
              .map((f: MappableField) => FIELD_DEFINITIONS.find((d) => d.key === f)?.label ?? f)
              .join(', ')}
          </p>
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setStep('upload')}
          className="gap-1.5 text-muted-foreground"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Voltar
        </Button>

        <Button
          onClick={processData}
          disabled={!isValid}
          className="gap-1.5"
          size="sm"
        >
          Gerar dashboard
          <ArrowRight className="h-3.5 w-3.5" />
        </Button>
      </div>
    </div>
  )
}
