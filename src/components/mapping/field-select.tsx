'use client'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import type { FieldDef } from '@/config/constants'

interface FieldSelectProps {
  field: FieldDef
  headers: string[]
  value: string | undefined
  onChange: (value: string) => void
  usedHeaders: Set<string>
}

export function FieldSelect({ field, headers, value, onChange, usedHeaders }: FieldSelectProps) {
  const availableHeaders = headers.filter(
    (h) => !usedHeaders.has(h) || h === value
  )

  return (
    <div className="flex items-center gap-4 py-3">
      <div className="min-w-[140px]">
        <div className="flex items-center gap-1.5">
          <span className="text-sm font-medium text-foreground">
            {field.label}
          </span>
          {field.required && (
            <span className="text-xs text-destructive">*</span>
          )}
        </div>
        <p className="text-xs text-muted-foreground mt-0.5">
          {field.description}
        </p>
      </div>

      <div className="flex-1">
        <Select value={value ?? '__none__'} onValueChange={(v) => onChange(!v || v === '__none__' ? '' : v)}>
          <SelectTrigger className="h-9 text-sm bg-surface">
            <SelectValue placeholder="Selecionar coluna..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="__none__">
              <span className="text-muted-foreground">Nenhuma</span>
            </SelectItem>
            {availableHeaders.map((header) => (
              <SelectItem key={header} value={header}>
                {header}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {value && (
        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10">
          <div className="h-2 w-2 rounded-full bg-primary" />
        </div>
      )}
    </div>
  )
}
