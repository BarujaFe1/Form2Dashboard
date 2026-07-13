import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import { parseCSVString } from '@/lib/parser'
import { autoDetectMapping } from '@/lib/mapper'
import { runPipeline } from '@/lib/pipeline'

const fixtureDir = join(process.cwd(), 'public/fixtures/before-after')

describe('before/after fixture regression', () => {
  it('produces the documented transformation outcomes', () => {
    const csv = readFileSync(join(fixtureDir, 'messy-leads.csv'), 'utf8')
    const summary = JSON.parse(
      readFileSync(join(fixtureDir, 'expected-summary.json'), 'utf8')
    )
    const expected = summary.expected

    const parsed = parseCSVString(csv)
    expect(parsed.rows).toHaveLength(summary.rawRows)

    const mapping = autoDetectMapping(parsed.headers)
    expect(mapping.timestamp).toBeTruthy()
    expect(mapping.name).toBeTruthy()
    expect(mapping.email).toBeTruthy()

    const result = runPipeline(parsed.rows, mapping)

    expect(result.dataQuality.validRows).toBe(expected.validRows)
    expect(result.dataQuality.invalidRows).toBe(expected.invalidRows)
    expect(result.dataQuality.duplicatesRemoved).toBe(expected.duplicatesRemoved)
    expect(result.cleaningResult.leads).toHaveLength(expected.finalLeads)
    expect(result.aggregatedData.metrics.convertedLeads).toBe(expected.convertedLeads)
    expect(result.aggregatedData.metrics.qualifiedLeads).toBe(expected.qualifiedLeads)

    expect(result.profile.totalMs).toBeGreaterThanOrEqual(0)
    expect(result.profile.stages.map((s) => s.stage)).toEqual([
      'validate',
      'clean',
      'aggregate',
      'report',
    ])

    expect(result.transformReport.before.rawRows).toBe(parsed.rows.length)
    expect(result.transformReport.after.leads).toBe(expected.finalLeads)
    expect(result.transformReport.transformations.length).toBeGreaterThan(0)

    const ana = result.cleaningResult.leads.find((l) => l.email === 'ana.silva@example.com')
    expect(ana?.status).toBe('qualificado')
    expect(ana?.source).toBe('redes_sociais')

    const bruno = result.cleaningResult.leads.find((l) => l.email === 'bruno.costa@empresa.com')
    expect(bruno?.status).toBe('convertido')
    expect(bruno?.source).toBe('indicação')
  })
})
