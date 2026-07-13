import { describe, expect, it } from 'vitest'
import { parseCSVString } from '@/lib/parser'
import { autoDetectMapping, validateMapping, getMappedValue } from '@/lib/mapper'
import { validateRows } from '@/lib/validator'
import { cleanRows } from '@/lib/cleaner'
import { aggregateLeads } from '@/lib/aggregator'
import { leadsToCSV } from '@/lib/export'
import { parseDate, formatPercent, isThisWeek } from '@/lib/utils'
import type { Lead } from '@/types'

describe('parseCSVString', () => {
  it('parses headers and rows', () => {
    const csv = 'Nome,E-mail\nAna,ana@x.com\n,\n'
    const result = parseCSVString(csv)
    expect(result.headers).toEqual(['Nome', 'E-mail'])
    expect(result.rows).toHaveLength(1)
    expect(result.rows[0].Nome).toBe('Ana')
  })
})

describe('mapper', () => {
  it('auto-detects common Google Forms headers', () => {
    const headers = [
      'Carimbo de data/hora',
      'Nome completo',
      'Endereço de e-mail',
      'Como nos encontrou',
      'Status',
    ]
    const mapping = autoDetectMapping(headers)
    expect(mapping.timestamp).toBe('Carimbo de data/hora')
    expect(mapping.name).toBe('Nome completo')
    expect(mapping.email).toBe('Endereço de e-mail')
    expect(mapping.source).toBe('Como nos encontrou')
    expect(mapping.status).toBe('Status')
  })

  it('validates required mapping fields', () => {
    expect(validateMapping({}).isValid).toBe(false)
    expect(validateMapping({ timestamp: 'a', name: 'b', email: 'c' }).isValid).toBe(true)
  })

  it('reads mapped values', () => {
    const row = { Nome: '  Ana  ' }
    expect(getMappedValue(row, { name: 'Nome' }, 'name')).toBe('Ana')
  })
})

describe('parseDate', () => {
  it('parses BR datetime without US MM/DD ambiguity', () => {
    const d = parseDate('12/03/2026 14:30:00')
    expect(d).not.toBeNull()
    expect(d!.getFullYear()).toBe(2026)
    expect(d!.getMonth()).toBe(2) // March
    expect(d!.getDate()).toBe(12)
  })

  it('parses ISO dates', () => {
    const d = parseDate('2026-03-12T14:30:00')
    expect(d).not.toBeNull()
    expect(d!.getMonth()).toBe(2)
    expect(d!.getDate()).toBe(12)
  })

  it('returns null for garbage', () => {
    expect(parseDate('not-a-date')).toBeNull()
  })
})

describe('validateRows + cleanRows', () => {
  const mapping = {
    timestamp: 'ts',
    name: 'name',
    email: 'email',
    source: 'source',
    status: 'status',
  }

  const rows = [
    { ts: '15/02/2026 09:00:00', name: 'Ana', email: 'ana@x.com', source: 'Google', status: 'qualificado' },
    { ts: '16/02/2026 10:00:00', name: 'Ana 2', email: 'ana@x.com', source: 'Instagram', status: 'convertido' },
    { ts: '17/02/2026 11:00:00', name: 'Bob', email: 'bad-email', source: 'pago', status: 'novo' },
    { ts: '18/02/2026 12:00:00', name: 'Carla', email: 'carla@x.com', source: 'xyz-canal', status: 'won' },
  ]

  it('flags invalid email', () => {
    const result = validateRows(rows, mapping)
    expect(result.validRows).toHaveLength(3)
    expect(result.invalidRows).toHaveLength(1)
    expect(result.issues.some((i) => i.field === 'email')).toBe(true)
  })

  it('dedupes by email keeping newest and normalizes aliases', () => {
    const validation = validateRows(rows, mapping)
    const cleaned = cleanRows(validation.validRows, mapping)
    expect(cleaned.duplicatesRemoved).toBe(1)
    expect(cleaned.leads).toHaveLength(2)

    const ana = cleaned.leads.find((l) => l.email === 'ana@x.com')
    expect(ana?.status).toBe('convertido')
    expect(ana?.source).toBe('redes_sociais')

    const carla = cleaned.leads.find((l) => l.email === 'carla@x.com')
    expect(carla?.status).toBe('convertido')
    expect(carla?.source).toBe('outro')
    expect(cleaned.warningsApplied.length).toBeGreaterThan(0)
  })
})

describe('aggregateLeads', () => {
  it('counts qualified as qualificado or convertido', () => {
    const leads: Lead[] = [
      {
        id: '1',
        timestamp: new Date('2026-07-10T12:00:00'),
        name: 'A',
        email: 'a@x.com',
        source: 'orgânico',
        status: 'qualificado',
      },
      {
        id: '2',
        timestamp: new Date('2026-07-11T12:00:00'),
        name: 'B',
        email: 'b@x.com',
        source: 'pago',
        status: 'convertido',
      },
      {
        id: '3',
        timestamp: new Date('2026-07-12T12:00:00'),
        name: 'C',
        email: 'c@x.com',
        source: 'pago',
        status: 'novo',
      },
    ]

    const agg = aggregateLeads(leads)
    expect(agg.metrics.totalLeads).toBe(3)
    expect(agg.metrics.convertedLeads).toBe(1)
    expect(agg.metrics.qualifiedLeads).toBe(2)
    expect(agg.metrics.activeSources).toBe(2)
    expect(agg.metrics.topSource).toBe('Pago')
  })
})

describe('export', () => {
  it('escapes commas and quotes in CSV cells', () => {
    const leads: Lead[] = [
      {
        id: '1',
        timestamp: new Date(2026, 1, 15),
        name: 'Ana, "Lead"',
        email: 'ana@x.com',
        source: 'outro',
        status: 'novo',
        message: 'Olá\nmundo',
      },
    ]
    const csv = leadsToCSV(leads)
    expect(csv.split('\n')[0]).toContain('Nome')
    expect(csv).toContain('"Ana, ""Lead"""')
  })
})

describe('utils helpers', () => {
  it('formats percent', () => {
    expect(formatPercent(0.255)).toBe('25.5%')
  })

  it('detects this week', () => {
    expect(isThisWeek(new Date())).toBe(true)
    expect(isThisWeek(new Date('2020-01-01'))).toBe(false)
  })
})
