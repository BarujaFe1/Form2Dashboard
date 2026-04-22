'use client'

import { useMemo, useState } from 'react'
import {
  useReactTable, getCoreRowModel, getFilteredRowModel,
  getSortedRowModel, getPaginationRowModel,
  flexRender, type ColumnDef, type SortingState,
} from '@tanstack/react-table'
import { ArrowUpDown, ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { StatusBadge } from './status-badge'
import { TableFilters } from './table-filters'
import { useAppStore } from '@/store/app-store'
import { SOURCE_LABELS } from '@/config/constants'
import { formatDate } from '@/lib/utils'
import type { Lead } from '@/types'

export function LeadsTable() {
  const leads = useAppStore((s) => s.leads)
  const filters = useAppStore((s) => s.tableFilters)
  const [sorting, setSorting] = useState<SortingState>([])

  const filteredData = useMemo(() => {
    let data = leads
    if (filters.source) {
      data = data.filter((l) => l.source === filters.source)
    }
    if (filters.status) {
      data = data.filter((l) => l.status === filters.status)
    }
    if (filters.search) {
      const q = filters.search.toLowerCase()
      data = data.filter(
        (l) =>
          l.name.toLowerCase().includes(q) ||
          l.email.toLowerCase().includes(q) ||
          (l.company?.toLowerCase().includes(q) ?? false)
      )
    }
    return data
  }, [leads, filters])

  const columns = useMemo<ColumnDef<Lead>[]>(
    () => [
      {
        accessorKey: 'name',
        header: ({ column }) => (
          <SortHeader column={column} label="Nome" />
        ),
        cell: ({ row }) => (
          <div>
            <p className="font-medium text-foreground text-sm">{row.original.name}</p>
            <p className="text-xs text-muted-foreground">{row.original.email}</p>
          </div>
        ),
      },
      {
        accessorKey: 'company',
        header: 'Empresa',
        cell: ({ getValue }) => (
          <span className="text-sm text-foreground">
            {(getValue() as string) || '—'}
          </span>
        ),
      },
      {
        accessorKey: 'source',
        header: 'Origem',
        cell: ({ getValue }) => (
          <span className="text-sm text-foreground">
            {SOURCE_LABELS[getValue() as keyof typeof SOURCE_LABELS] ?? getValue()}
          </span>
        ),
      },
      {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ getValue }) => <StatusBadge status={getValue() as Lead['status']} />,
      },
      {
        accessorKey: 'timestamp',
        header: ({ column }) => (
          <SortHeader column={column} label="Data" />
        ),
        cell: ({ getValue }) => (
          <span className="text-sm text-muted-foreground">
            {formatDate(getValue() as Date)}
          </span>
        ),
        sortingFn: 'datetime',
      },
    ],
    []
  )

  const table = useReactTable({
    data: filteredData,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize: 15 } },
  })

  return (
    <div className="rounded-xl border border-border bg-surface shadow-card">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-medium text-foreground">
            Todos os leads
          </h3>
          <span className="text-xs text-muted-foreground">
            {filteredData.length} de {leads.length}
          </span>
        </div>
        <TableFilters />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            {table.getHeaderGroups().map((hg) => (
              <tr key={hg.id} className="border-b border-border">
                {hg.headers.map((header) => (
                  <th
                    key={header.id}
                    className={`px-4 py-3 text-xs font-medium uppercase tracking-wider text-muted-foreground ${header.column.id === 'company' ? 'hidden sm:table-cell' : ''}`}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="px-4 py-12 text-center text-sm text-muted-foreground">
                  Nenhum lead encontrado com os filtros atuais.
                </td>
              </tr>
            ) : (
              table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  className="border-b border-border last:border-0 hover:bg-muted/50 transition-colors"
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className={`px-4 py-3 ${cell.column.id === 'company' ? 'hidden sm:table-cell' : ''}`}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {table.getPageCount() > 1 && (
        <div className="flex items-center justify-between border-t border-border px-4 py-3">
          <p className="text-xs text-muted-foreground">
            Página {table.getState().pagination.pageIndex + 1} de{' '}
            {table.getPageCount()}
          </p>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

function SortHeader({ column, label }: { column: { toggleSorting: (desc?: boolean) => void }; label: string }) {
  return (
    <button
      className="flex items-center gap-1 hover:text-foreground transition-colors"
      onClick={() => column.toggleSorting()}
    >
      {label}
      <ArrowUpDown className="h-3 w-3" />
    </button>
  )
}
