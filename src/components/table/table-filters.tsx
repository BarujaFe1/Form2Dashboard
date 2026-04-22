'use client'

import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select'
import { useAppStore } from '@/store/app-store'
import { LEAD_SOURCES, LEAD_STATUSES, SOURCE_LABELS, STATUS_LABELS } from '@/config/constants'

export function TableFilters() {
  const filters = useAppStore((s) => s.tableFilters)
  const setTableFilters = useAppStore((s) => s.setTableFilters)

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Buscar por nome, e-mail, empresa..."
          className="h-9 pl-9 text-sm bg-surface"
          value={filters.search}
          onChange={(e) => setTableFilters({ search: e.target.value })}
        />
      </div>

      <div className="flex gap-2">
        <Select
          value={filters.source || '__all__'}
          onValueChange={(v) => setTableFilters({ source: !v || v === '__all__' ? '' : v })}
        >
          <SelectTrigger className="h-9 w-[150px] text-sm bg-surface">
            <SelectValue placeholder="Origem">
              {filters.source ? SOURCE_LABELS[filters.source as keyof typeof SOURCE_LABELS] : 'Todas as origens'}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="__all__">Todas as origens</SelectItem>
            {LEAD_SOURCES.map((source) => (
              <SelectItem key={source} value={source}>
                {SOURCE_LABELS[source]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={filters.status || '__all__'}
          onValueChange={(v) => setTableFilters({ status: !v || v === '__all__' ? '' : v })}
        >
          <SelectTrigger className="h-9 w-[150px] text-sm bg-surface">
            <SelectValue placeholder="Status">
              {filters.status ? STATUS_LABELS[filters.status as keyof typeof STATUS_LABELS] : 'Todos os status'}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="__all__">Todos os status</SelectItem>
            {LEAD_STATUSES.map((status) => (
              <SelectItem key={status} value={status}>
                {STATUS_LABELS[status]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
