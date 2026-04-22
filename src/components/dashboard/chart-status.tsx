'use client'

import {
  BarChart, Bar, XAxis, YAxis, Tooltip,
  ResponsiveContainer, Cell,
} from 'recharts'
import type { StatusBreakdown } from '@/types'
import { STATUS_LABELS } from '@/config/constants'

const STATUS_CHART_COLORS: Record<string, string> = {
  novo: '#3B82F6',
  contatado: '#F59E0B',
  qualificado: '#10B981',
  perdido: '#EF4444',
  convertido: '#0A7B6C',
}

interface ChartStatusProps {
  data: StatusBreakdown[]
}

export function ChartStatus({ data }: ChartStatusProps) {
  if (data.length === 0) return null

  const chartData = data.map((d) => ({
    name: STATUS_LABELS[d.status],
    value: d.count,
    status: d.status,
  }))

  return (
    <div className="rounded-xl border border-border bg-surface p-5 shadow-card">
      <h3 className="mb-4 text-sm font-medium text-foreground">
        Leads por status
      </h3>
      <div className="h-[180px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            layout="vertical"
            margin={{ top: 0, right: 12, left: 0, bottom: 0 }}
          >
            <XAxis
              type="number"
              allowDecimals={false}
              tick={{ fontSize: 11, fill: 'var(--muted-foreground)' }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              type="category"
              dataKey="name"
              width={90}
              tick={{ fontSize: 12, fill: 'var(--foreground)' }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: '8px',
                fontSize: '12px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
              }}
              formatter={(value) => [`${value} leads`]}
              cursor={{ fill: 'var(--muted)', opacity: 0.3 }}
            />
            <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={20}>
              {chartData.map((entry) => (
                <Cell
                  key={entry.status}
                  fill={STATUS_CHART_COLORS[entry.status] ?? 'var(--muted-foreground)'}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
