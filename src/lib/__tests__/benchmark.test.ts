/**
 * Micro-benchmark for the client-side data pipeline.
 * Generates synthetic Form-like rows and records stage timings.
 *
 * Run: npm run benchmark
 */
import { writeFileSync, mkdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'
import { runPipeline } from '@/lib/pipeline'
import type { RawRow } from '@/types'

const __dirname = dirname(fileURLToPath(import.meta.url))
const outDir = join(__dirname, '../../../docs')
const outFile = join(outDir, 'BENCHMARK_RESULTS.md')

const SIZES = [100, 1_000, 5_000, 10_000] as const

const mapping = {
  timestamp: 'timestamp',
  name: 'name',
  email: 'email',
  source: 'source',
  status: 'status',
  company: 'company',
}

const sources = ['Google', 'Instagram', 'Indicação', 'Email', 'xyz-canal', 'LinkedIn']
const statuses = ['novo', 'quente', 'won', 'contacted', 'perdido', 'abc']

function makeRows(n: number): RawRow[] {
  const rows: RawRow[] = []
  for (let i = 0; i < n; i++) {
    const day = (i % 28) + 1
    const month = (i % 12) + 1
    const isDup = i % 17 === 0 && i > 0
    const email = isDup ? `user${i - 17}@example.com` : `user${i}@example.com`
    const isBad = i % 41 === 0
    rows.push({
      timestamp: `${String(day).padStart(2, '0')}/${String(month).padStart(2, '0')}/2026 10:${String(i % 60).padStart(2, '0')}:00`,
      name: isBad && i % 82 === 0 ? '' : `Lead ${i}`,
      email: isBad && i % 82 !== 0 ? 'not-an-email' : email,
      source: sources[i % sources.length],
      status: statuses[i % statuses.length],
      company: `Empresa ${i % 50}`,
    })
  }
  return rows
}

function median(values: number[]): number {
  const sorted = [...values].sort((a, b) => a - b)
  const mid = Math.floor(sorted.length / 2)
  return sorted.length % 2 === 0
    ? (sorted[mid - 1] + sorted[mid]) / 2
    : sorted[mid]
}

describe('pipeline benchmark', () => {
  it('measures sizes and writes docs/BENCHMARK_RESULTS.md', () => {
    const results: Array<{
      size: number
      totalMsMedian: number
      stagesMsMedian: Record<string, number>
      outputLeads: number
      invalidRows: number
      duplicatesRemoved: number
    }> = []

    for (const size of SIZES) {
      const rows = makeRows(size)
      runPipeline(rows, mapping) // warm-up

      const totals: number[] = []
      const stageBuckets: Record<string, number[]> = {}
      let last = runPipeline(rows, mapping)

      for (let r = 0; r < 5; r++) {
        last = runPipeline(rows, mapping)
        totals.push(last.profile.totalMs)
        for (const stage of last.profile.stages) {
          if (!stageBuckets[stage.stage]) stageBuckets[stage.stage] = []
          stageBuckets[stage.stage].push(stage.durationMs)
        }
      }

      const stagesMsMedian: Record<string, number> = {}
      for (const [stage, values] of Object.entries(stageBuckets)) {
        stagesMsMedian[stage] = Math.round(median(values) * 100) / 100
      }

      results.push({
        size,
        totalMsMedian: Math.round(median(totals) * 100) / 100,
        stagesMsMedian,
        outputLeads: last.cleaningResult.leads.length,
        invalidRows: last.dataQuality.invalidRows,
        duplicatesRemoved: last.dataQuality.duplicatesRemoved,
      })

      // Soft guardrails: keep the demo responsive on typical CI VMs
      if (size <= 1_000) {
        expect(results[results.length - 1].totalMsMedian).toBeLessThan(2_000)
      }
      if (size === 10_000) {
        expect(results[results.length - 1].totalMsMedian).toBeLessThan(15_000)
      }
    }

    const machine = `${process.platform} · Node ${process.version}`
    const lines = [
      '# Benchmark results — Form2Dashboard pipeline',
      '',
      `Generated: ${new Date().toISOString()}`,
      `Environment: ${machine}`,
      '',
      'Synthetic Google-Forms-like rows processed via `runPipeline` (validate → clean → aggregate → report).',
      'Medians over 5 runs after 1 warm-up. Node/Vitest measurement — relative engineering evidence, not a browser FPS claim.',
      '',
      '| Rows | Median total (ms) | Validate | Clean | Aggregate | Report | Output leads | Invalid | Dupes |',
      '| ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |',
    ]

    for (const r of results) {
      lines.push(
        `| ${r.size.toLocaleString('en-US')} | ${r.totalMsMedian} | ${r.stagesMsMedian.validate ?? '—'} | ${r.stagesMsMedian.clean ?? '—'} | ${r.stagesMsMedian.aggregate ?? '—'} | ${r.stagesMsMedian.report ?? '—'} | ${r.outputLeads} | ${r.invalidRows} | ${r.duplicatesRemoved} |`
      )
    }

    lines.push(
      '',
      '## Soft limits (product)',
      '',
      '- Upload hard cap: **5 MB**',
      '- Soft warning: **10_000 rows**',
      '- Processing remains on the browser main thread (lab / demo scope)',
      '',
      '## Interpretation',
      '',
      '- Sub-second for a few thousand rows is expected on modern hardware.',
      '- At 10k rows, cost is still dominated by JS loops + Date parsing, not UI rendering.',
      '- For larger files, the honest next step is a Web Worker — this lab does not claim multi-million-row scale.',
      ''
    )

    mkdirSync(outDir, { recursive: true })
    writeFileSync(outFile, lines.join('\n'), 'utf8')
    expect(results.length).toBe(SIZES.length)
  }, 60_000)
})
