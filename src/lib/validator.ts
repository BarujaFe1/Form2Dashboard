import type { RawRow, ColumnMapping, ValidationIssue, ValidationResult } from '@/types'
import { getMappedValue } from './mapper'
import { parseDate } from './utils'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/**
 * Validate all raw rows against the column mapping.
 * Produces valid rows, invalid rows, and detailed issues.
 */
export function validateRows(
  rows: RawRow[],
  mapping: Partial<ColumnMapping>
): ValidationResult {
  const validRows: RawRow[] = []
  const invalidRows: RawRow[] = []
  const issues: ValidationIssue[] = []

  rows.forEach((row, index) => {
    const rowNum = index + 2 // +2 for header + 0-index
    let isValid = true

    // Check required: name
    const name = getMappedValue(row, mapping, 'name')
    if (!name) {
      issues.push({
        row: rowNum,
        field: 'name',
        message: `Linha ${rowNum}: Nome está vazio`,
        severity: 'error',
      })
      isValid = false
    }

    // Check required: email
    const email = getMappedValue(row, mapping, 'email')
    if (!email) {
      issues.push({
        row: rowNum,
        field: 'email',
        message: `Linha ${rowNum}: E-mail está vazio`,
        severity: 'error',
      })
      isValid = false
    } else if (!EMAIL_REGEX.test(email)) {
      issues.push({
        row: rowNum,
        field: 'email',
        message: `Linha ${rowNum}: E-mail inválido (${email})`,
        severity: 'error',
      })
      isValid = false
    }

    // Check required: timestamp
    const timestamp = getMappedValue(row, mapping, 'timestamp')
    if (!timestamp) {
      issues.push({
        row: rowNum,
        field: 'timestamp',
        message: `Linha ${rowNum}: Data/hora está vazia`,
        severity: 'error',
      })
      isValid = false
    } else {
      const parsed = parseDate(timestamp)
      if (!parsed) {
        issues.push({
          row: rowNum,
          field: 'timestamp',
          message: `Linha ${rowNum}: Data não reconhecida (${timestamp})`,
          severity: 'error',
        })
        isValid = false
      }
    }

    if (isValid) {
      validRows.push(row)
    } else {
      invalidRows.push(row)
    }
  })

  return { validRows, invalidRows, issues }
}
