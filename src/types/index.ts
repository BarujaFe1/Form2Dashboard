// ─── Core Domain Types ───

export type LeadStatus = 'novo' | 'contatado' | 'qualificado' | 'perdido' | 'convertido'
export type LeadSource = 'orgânico' | 'pago' | 'indicação' | 'redes_sociais' | 'email' | 'outro'

export interface Lead {
  id: string
  timestamp: Date
  name: string
  email: string
  phone?: string
  company?: string
  role?: string
  source: LeadSource
  interest?: string
  message?: string
  status: LeadStatus
}

// ─── Pipeline Types ───

export type RawRow = Record<string, string>

export interface ColumnMapping {
  timestamp: string
  name: string
  email: string
  phone?: string
  company?: string
  role?: string
  source?: string
  interest?: string
  message?: string
  status?: string
}

export type MappableField = keyof ColumnMapping

export interface ValidationIssue {
  row: number
  field: string
  message: string
  severity: 'error' | 'warning'
}

export interface ValidationResult {
  validRows: RawRow[]
  invalidRows: RawRow[]
  issues: ValidationIssue[]
}

export interface CleaningResult {
  leads: Lead[]
  duplicatesRemoved: number
  warningsApplied: string[]
}

export interface DataQuality {
  totalRawRows: number
  validRows: number
  invalidRows: number
  duplicatesRemoved: number
  warnings: string[]
}

// ─── Pipeline profiling & transform report ───

export type PipelineStage = 'validate' | 'clean' | 'aggregate' | 'report'

export interface StageTiming {
  stage: PipelineStage
  durationMs: number
}

export interface PipelineProfile {
  totalMs: number
  stages: StageTiming[]
  inputRows: number
  outputLeads: number
  measuredAt: string
}

export interface ValueCount {
  value: string
  count: number
}

export interface TransformReport {
  before: {
    rawRows: number
    distinctRawSources: number
    distinctRawStatuses: number
    topRawSources: ValueCount[]
    topRawStatuses: ValueCount[]
    issueCounts: {
      email: number
      timestamp: number
      name: number
      total: number
    }
  }
  after: {
    leads: number
    invalidRows: number
    duplicatesRemoved: number
    warningsApplied: number
    retentionRate: number
    sources: ValueCount[]
    statuses: ValueCount[]
  }
  transformations: string[]
  profile: PipelineProfile
}

// ─── Dashboard Types ───

export interface DashboardMetrics {
  totalLeads: number
  convertedLeads: number
  conversionRate: number
  qualifiedLeads: number
  activeSources: number
  leadsThisWeek: number
  contactRate: number
  topSource: string
}

export interface TimeSeriesPoint {
  date: string
  count: number
}

export interface SourceBreakdown {
  source: LeadSource
  count: number
  percentage: number
}

export interface StatusBreakdown {
  status: LeadStatus
  count: number
  percentage: number
}

export interface AggregatedData {
  metrics: DashboardMetrics
  timeSeries: TimeSeriesPoint[]
  sourceBreakdown: SourceBreakdown[]
  statusBreakdown: StatusBreakdown[]
}

// ─── App State ───

export type AppStep = 'upload' | 'mapping' | 'dashboard'
