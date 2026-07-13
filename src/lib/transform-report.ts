import type {
  CleaningResult,
  ColumnMapping,
  DataQuality,
  PipelineProfile,
  RawRow,
  TransformReport,
  ValidationResult,
  ValueCount,
} from '@/types'
import { getMappedValue } from './mapper'

interface BuildArgs {
  rawRows: RawRow[]
  mapping: Partial<ColumnMapping>
  validationResult: ValidationResult
  cleaningResult: CleaningResult
  dataQuality: DataQuality
}

const emptyProfile: PipelineProfile = {
  totalMs: 0,
  stages: [],
  inputRows: 0,
  outputLeads: 0,
  measuredAt: '',
}

/**
 * Build a before/after transformation report for interview demos
 * and data-quality storytelling.
 */
export function buildTransformReport({
  rawRows,
  mapping,
  validationResult,
  cleaningResult,
  dataQuality,
}: BuildArgs): TransformReport {
  const rawSources = countMappedValues(rawRows, mapping, 'source')
  const rawStatuses = countMappedValues(rawRows, mapping, 'status')

  const afterSources: ValueCount[] = []
  const afterStatuses: ValueCount[] = []
  const sourceMap = new Map<string, number>()
  const statusMap = new Map<string, number>()

  for (const lead of cleaningResult.leads) {
    sourceMap.set(lead.source, (sourceMap.get(lead.source) ?? 0) + 1)
    statusMap.set(lead.status, (statusMap.get(lead.status) ?? 0) + 1)
  }

  sourceMap.forEach((count, value) => afterSources.push({ value, count }))
  statusMap.forEach((count, value) => afterStatuses.push({ value, count }))
  afterSources.sort((a, b) => b.count - a.count)
  afterStatuses.sort((a, b) => b.count - a.count)

  const emailIssues = validationResult.issues.filter((i) => i.field === 'email').length
  const dateIssues = validationResult.issues.filter((i) => i.field === 'timestamp').length
  const nameIssues = validationResult.issues.filter((i) => i.field === 'name').length

  const transformations: string[] = []
  transformations.push(
    `${dataQuality.totalRawRows} linhas brutas → ${cleaningResult.leads.length} leads únicos`
  )
  if (dataQuality.invalidRows > 0) {
    transformations.push(
      `${dataQuality.invalidRows} linha(s) descartada(s) na validação (nome/e-mail/data)`
    )
  }
  if (dataQuality.duplicatesRemoved > 0) {
    transformations.push(
      `${dataQuality.duplicatesRemoved} duplicata(s) por e-mail removida(s) (mantém registro mais recente)`
    )
  }
  if (cleaningResult.warningsApplied.length > 0) {
    transformations.push(
      `${cleaningResult.warningsApplied.length} normalização(ões) de origem/status aplicadas`
    )
  }
  if (emailIssues > 0) {
    transformations.push(`${emailIssues} problema(s) de e-mail detectado(s)`)
  }
  if (dateIssues > 0) {
    transformations.push(`${dateIssues} problema(s) de data detectado(s)`)
  }
  if (nameIssues > 0) {
    transformations.push(`${nameIssues} linha(s) sem nome`)
  }
  if (transformations.length === 1) {
    transformations.push('Nenhuma correção adicional necessária — dataset já estava consistente')
  }

  const retentionRate =
    dataQuality.totalRawRows > 0
      ? cleaningResult.leads.length / dataQuality.totalRawRows
      : 0

  return {
    before: {
      rawRows: dataQuality.totalRawRows,
      distinctRawSources: rawSources.length,
      distinctRawStatuses: rawStatuses.length,
      topRawSources: rawSources.slice(0, 8),
      topRawStatuses: rawStatuses.slice(0, 8),
      issueCounts: {
        email: emailIssues,
        timestamp: dateIssues,
        name: nameIssues,
        total: validationResult.issues.length,
      },
    },
    after: {
      leads: cleaningResult.leads.length,
      invalidRows: dataQuality.invalidRows,
      duplicatesRemoved: dataQuality.duplicatesRemoved,
      warningsApplied: cleaningResult.warningsApplied.length,
      retentionRate,
      sources: afterSources,
      statuses: afterStatuses,
    },
    transformations,
    profile: emptyProfile,
  }
}

function countMappedValues(
  rows: RawRow[],
  mapping: Partial<ColumnMapping>,
  field: 'source' | 'status'
): ValueCount[] {
  const counts = new Map<string, number>()
  for (const row of rows) {
    const raw = (getMappedValue(row, mapping, field) ?? '').trim() || '(vazio)'
    const key = raw.toLowerCase()
    counts.set(key, (counts.get(key) ?? 0) + 1)
  }
  return [...counts.entries()]
    .map(([value, count]) => ({ value, count }))
    .sort((a, b) => b.count - a.count)
}
