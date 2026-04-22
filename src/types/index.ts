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
