import type { ColumnMapping, MappableField } from '@/types'
import { HEADER_ALIASES } from '@/config/constants'

/**
 * Auto-detect column mapping by fuzzy-matching CSV headers
 * against known aliases for each field.
 */
export function autoDetectMapping(headers: string[]): Partial<ColumnMapping> {
  const mapping: Partial<ColumnMapping> = {}
  const usedHeaders = new Set<string>()

  const fieldKeys = Object.keys(HEADER_ALIASES) as MappableField[]

  for (const field of fieldKeys) {
    const aliases = HEADER_ALIASES[field]
    for (const header of headers) {
      if (usedHeaders.has(header)) continue
      const normalized = header.toLowerCase().trim()
      if (aliases.includes(normalized)) {
        mapping[field] = header
        usedHeaders.add(header)
        break
      }
    }
  }

  return mapping
}

/**
 * Check if all required fields have been mapped.
 */
export function validateMapping(mapping: Partial<ColumnMapping>): {
  isValid: boolean
  missingFields: MappableField[]
} {
  const required: MappableField[] = ['timestamp', 'name', 'email']
  const missingFields = required.filter((field) => !mapping[field])
  return {
    isValid: missingFields.length === 0,
    missingFields,
  }
}

/**
 * Apply column mapping to extract a mapped value from a raw row.
 */
export function getMappedValue(
  row: Record<string, string>,
  mapping: Partial<ColumnMapping>,
  field: MappableField
): string | undefined {
  const header = mapping[field]
  if (!header) return undefined
  return row[header]?.trim() || undefined
}
