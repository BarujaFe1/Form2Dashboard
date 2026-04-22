import type { RawRow, ColumnMapping, Lead, LeadSource, LeadStatus, CleaningResult } from '@/types'
import { SOURCE_ALIASES, STATUS_ALIASES } from '@/config/constants'
import { getMappedValue } from './mapper'
import { parseDate, generateId } from './utils'

/**
 * Clean and normalize valid rows into Lead objects.
 * - Trims strings
 * - Normalizes casing
 * - Parses dates
 * - Normalizes source and status via aliases
 * - Deduplicates by email (keeps most recent)
 */
export function cleanRows(
  rows: RawRow[],
  mapping: Partial<ColumnMapping>
): CleaningResult {
  const warnings: string[] = []
  const leadsMap = new Map<string, Lead>()

  for (const row of rows) {
    const timestampStr = getMappedValue(row, mapping, 'timestamp') ?? ''
    const timestamp = parseDate(timestampStr)
    if (!timestamp) continue

    const name = normalizeName(getMappedValue(row, mapping, 'name') ?? '')
    const email = (getMappedValue(row, mapping, 'email') ?? '').toLowerCase().trim()
    if (!email) continue

    // Normalize source
    const rawSource = (getMappedValue(row, mapping, 'source') ?? '').toLowerCase().trim()
    let source: LeadSource = 'outro'
    if (rawSource) {
      const matched = SOURCE_ALIASES[rawSource]
      if (matched) {
        source = matched
      } else {
        source = 'outro'
        warnings.push(`Origem "${rawSource}" não reconhecida → normalizada para "outro"`)
      }
    }

    // Normalize status
    const rawStatus = (getMappedValue(row, mapping, 'status') ?? '').toLowerCase().trim()
    let status: LeadStatus = 'novo'
    if (rawStatus) {
      const matched = STATUS_ALIASES[rawStatus]
      if (matched) {
        status = matched
      } else {
        status = 'novo'
        warnings.push(`Status "${rawStatus}" não reconhecido → normalizado para "novo"`)
      }
    }

    const lead: Lead = {
      id: generateId(),
      timestamp,
      name,
      email,
      phone: getMappedValue(row, mapping, 'phone'),
      company: getMappedValue(row, mapping, 'company'),
      role: getMappedValue(row, mapping, 'role'),
      source,
      interest: getMappedValue(row, mapping, 'interest'),
      message: getMappedValue(row, mapping, 'message'),
      status,
    }

    // Dedup by email: keep most recent
    const existing = leadsMap.get(email)
    if (existing) {
      if (lead.timestamp > existing.timestamp) {
        leadsMap.set(email, lead)
      }
    } else {
      leadsMap.set(email, lead)
    }
  }

  const leads = Array.from(leadsMap.values()).sort(
    (a, b) => b.timestamp.getTime() - a.timestamp.getTime()
  )

  const duplicatesRemoved = rows.length - leads.length

  // Deduplicate warnings
  const uniqueWarnings = [...new Set(warnings)]

  return { leads, duplicatesRemoved, warningsApplied: uniqueWarnings }
}

function normalizeName(name: string): string {
  return name
    .trim()
    .split(/\s+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ')
}
