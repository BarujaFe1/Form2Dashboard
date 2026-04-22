import type {
  Lead,
  AggregatedData,
  DashboardMetrics,
  TimeSeriesPoint,
  SourceBreakdown,
  StatusBreakdown,
  LeadSource,
  LeadStatus,
} from '@/types'
import { LEAD_SOURCES, LEAD_STATUSES, SOURCE_LABELS } from '@/config/constants'
import { formatDateISO, isThisWeek } from './utils'

/**
 * Aggregate leads data into dashboard metrics, time series,
 * source breakdown, and status breakdown.
 */
export function aggregateLeads(leads: Lead[]): AggregatedData {
  return {
    metrics: computeMetrics(leads),
    timeSeries: computeTimeSeries(leads),
    sourceBreakdown: computeSourceBreakdown(leads),
    statusBreakdown: computeStatusBreakdown(leads),
  }
}

function computeMetrics(leads: Lead[]): DashboardMetrics {
  const total = leads.length
  const converted = leads.filter((l) => l.status === 'convertido').length
  const qualified = leads.filter((l) => l.status === 'qualificado').length
  const contacted = leads.filter((l) =>
    ['contatado', 'qualificado', 'convertido'].includes(l.status)
  ).length
  const thisWeek = leads.filter((l) => isThisWeek(l.timestamp)).length

  const sourcesUsed = new Set(leads.map((l) => l.source))

  // Find top source
  const sourceCounts = new Map<LeadSource, number>()
  for (const lead of leads) {
    sourceCounts.set(lead.source, (sourceCounts.get(lead.source) ?? 0) + 1)
  }
  let topSource: LeadSource = 'outro'
  let topCount = 0
  sourceCounts.forEach((count, source) => {
    if (count > topCount) {
      topCount = count
      topSource = source
    }
  })

  return {
    totalLeads: total,
    convertedLeads: converted,
    conversionRate: total > 0 ? converted / total : 0,
    qualifiedLeads: qualified,
    activeSources: sourcesUsed.size,
    leadsThisWeek: thisWeek,
    contactRate: total > 0 ? contacted / total : 0,
    topSource: SOURCE_LABELS[topSource] ?? 'N/A',
  }
}

function computeTimeSeries(leads: Lead[]): TimeSeriesPoint[] {
  if (leads.length === 0) return []

  const counts = new Map<string, number>()

  for (const lead of leads) {
    const key = formatDateISO(lead.timestamp)
    counts.set(key, (counts.get(key) ?? 0) + 1)
  }

  // Fill gaps in date range
  const sorted = [...leads].sort(
    (a, b) => a.timestamp.getTime() - b.timestamp.getTime()
  )
  const start = new Date(sorted[0].timestamp)
  const end = new Date(sorted[sorted.length - 1].timestamp)

  const result: TimeSeriesPoint[] = []
  const current = new Date(start)
  current.setHours(0, 0, 0, 0)

  while (current <= end) {
    const key = formatDateISO(current)
    result.push({ date: key, count: counts.get(key) ?? 0 })
    current.setDate(current.getDate() + 1)
  }

  // If too many data points, aggregate by week
  if (result.length > 60) {
    return aggregateByWeek(result)
  }

  return result
}

function aggregateByWeek(daily: TimeSeriesPoint[]): TimeSeriesPoint[] {
  const weeks: TimeSeriesPoint[] = []
  for (let i = 0; i < daily.length; i += 7) {
    const chunk = daily.slice(i, i + 7)
    const count = chunk.reduce((sum, p) => sum + p.count, 0)
    weeks.push({ date: chunk[0].date, count })
  }
  return weeks
}

function computeSourceBreakdown(leads: Lead[]): SourceBreakdown[] {
  const total = leads.length
  if (total === 0) return []

  const counts = new Map<LeadSource, number>()
  for (const source of LEAD_SOURCES) {
    counts.set(source, 0)
  }
  for (const lead of leads) {
    counts.set(lead.source, (counts.get(lead.source) ?? 0) + 1)
  }

  return LEAD_SOURCES
    .map((source) => ({
      source,
      count: counts.get(source) ?? 0,
      percentage: total > 0 ? (counts.get(source) ?? 0) / total : 0,
    }))
    .filter((s) => s.count > 0)
    .sort((a, b) => b.count - a.count)
}

function computeStatusBreakdown(leads: Lead[]): StatusBreakdown[] {
  const total = leads.length
  if (total === 0) return []

  const counts = new Map<LeadStatus, number>()
  for (const status of LEAD_STATUSES) {
    counts.set(status, 0)
  }
  for (const lead of leads) {
    counts.set(lead.status, (counts.get(lead.status) ?? 0) + 1)
  }

  return LEAD_STATUSES
    .map((status) => ({
      status,
      count: counts.get(status) ?? 0,
      percentage: total > 0 ? (counts.get(status) ?? 0) / total : 0,
    }))
    .filter((s) => s.count > 0)
}
