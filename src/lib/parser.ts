import Papa from 'papaparse'
import type { RawRow } from '@/types'

export interface ParseResult {
  rows: RawRow[]
  headers: string[]
  errors: string[]
}

export function parseCSV(file: File): Promise<ParseResult> {
  return new Promise((resolve) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      transformHeader: (header: string) => header.trim(),
      complete: (results) => {
        const rows = results.data as RawRow[]
        const headers = results.meta.fields ?? []
        const errors = results.errors.map(
          (e) => `Linha ${e.row !== undefined ? e.row + 2 : '?'}: ${e.message}`
        )

        // Filter out completely empty rows
        const nonEmptyRows = rows.filter((row) =>
          Object.values(row).some((val) => val && val.trim() !== '')
        )

        resolve({ rows: nonEmptyRows, headers, errors })
      },
      error: (error: Error) => {
        resolve({ rows: [], headers: [], errors: [error.message] })
      },
    })
  })
}

export function parseCSVString(csvString: string): ParseResult {
  const results = Papa.parse(csvString, {
    header: true,
    skipEmptyLines: true,
    transformHeader: (header: string) => header.trim(),
  })

  const rows = results.data as RawRow[]
  const headers = results.meta.fields ?? []
  const errors = results.errors.map(
    (e) => `Linha ${e.row !== undefined ? e.row + 2 : '?'}: ${e.message}`
  )

  const nonEmptyRows = rows.filter((row) =>
    Object.values(row).some((val) => val && val.trim() !== '')
  )

  return { rows: nonEmptyRows, headers, errors }
}
