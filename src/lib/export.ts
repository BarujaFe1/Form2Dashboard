import type { Lead } from '@/types'
import { SOURCE_LABELS, STATUS_LABELS } from '@/config/constants'
import { formatDate } from './utils'

const CSV_HEADERS = [
  'Data',
  'Nome',
  'E-mail',
  'Telefone',
  'Empresa',
  'Cargo',
  'Origem',
  'Interesse',
  'Mensagem',
  'Status',
] as const

function escapeCsvCell(value: string): string {
  if (/[",\n\r]/.test(value)) {
    return `"${value.replace(/"/g, '""')}"`
  }
  return value
}

/**
 * Serialize cleaned leads to a CSV string (UTF-8, header row included).
 */
export function leadsToCSV(leads: Lead[]): string {
  const lines = [CSV_HEADERS.join(',')]

  for (const lead of leads) {
    const row = [
      formatDate(lead.timestamp),
      lead.name,
      lead.email,
      lead.phone ?? '',
      lead.company ?? '',
      lead.role ?? '',
      SOURCE_LABELS[lead.source] ?? lead.source,
      lead.interest ?? '',
      lead.message ?? '',
      STATUS_LABELS[lead.status] ?? lead.status,
    ].map((cell) => escapeCsvCell(String(cell)))

    lines.push(row.join(','))
  }

  return lines.join('\n')
}

/**
 * Trigger a browser download for a CSV string.
 */
export function downloadCSV(content: string, filename: string): void {
  const blob = new Blob(['\uFEFF' + content], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement('a')
  anchor.href = url
  anchor.download = filename
  anchor.click()
  URL.revokeObjectURL(url)
}
