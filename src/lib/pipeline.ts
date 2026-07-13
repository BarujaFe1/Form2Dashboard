import type {
  AggregatedData,
  CleaningResult,
  ColumnMapping,
  DataQuality,
  PipelineProfile,
  RawRow,
  StageTiming,
  TransformReport,
  ValidationResult,
} from '@/types'
import { validateRows } from './validator'
import { cleanRows } from './cleaner'
import { aggregateLeads } from './aggregator'
import { buildTransformReport } from './transform-report'

export interface PipelineResult {
  validationResult: ValidationResult
  cleaningResult: CleaningResult
  aggregatedData: AggregatedData
  dataQuality: DataQuality
  transformReport: TransformReport
  profile: PipelineProfile
}

function nowMs(): number {
  return typeof performance !== 'undefined' && typeof performance.now === 'function'
    ? performance.now()
    : Date.now()
}

/**
 * Run the full validate → clean → aggregate pipeline with stage timings
 * and a before/after transformation report.
 */
export function runPipeline(
  rows: RawRow[],
  mapping: Partial<ColumnMapping>
): PipelineResult {
  const stages: StageTiming[] = []
  const totalStart = nowMs()

  let t0 = nowMs()
  const validationResult = validateRows(rows, mapping)
  stages.push({ stage: 'validate', durationMs: roundMs(nowMs() - t0) })

  t0 = nowMs()
  const cleaningResult = cleanRows(validationResult.validRows, mapping)
  stages.push({ stage: 'clean', durationMs: roundMs(nowMs() - t0) })

  t0 = nowMs()
  const aggregatedData = aggregateLeads(cleaningResult.leads)
  stages.push({ stage: 'aggregate', durationMs: roundMs(nowMs() - t0) })

  t0 = nowMs()
  const dataQuality: DataQuality = {
    totalRawRows: rows.length,
    validRows: validationResult.validRows.length,
    invalidRows: validationResult.invalidRows.length,
    duplicatesRemoved: cleaningResult.duplicatesRemoved,
    warnings: cleaningResult.warningsApplied,
  }

  const transformReport = buildTransformReport({
    rawRows: rows,
    mapping,
    validationResult,
    cleaningResult,
    dataQuality,
  })
  stages.push({ stage: 'report', durationMs: roundMs(nowMs() - t0) })

  const profile: PipelineProfile = {
    totalMs: roundMs(nowMs() - totalStart),
    stages,
    inputRows: rows.length,
    outputLeads: cleaningResult.leads.length,
    measuredAt: new Date().toISOString(),
  }

  transformReport.profile = profile

  return {
    validationResult,
    cleaningResult,
    aggregatedData,
    dataQuality,
    transformReport,
    profile,
  }
}

function roundMs(value: number): number {
  return Math.round(value * 100) / 100
}
