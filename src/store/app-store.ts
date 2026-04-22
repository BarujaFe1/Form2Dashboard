import { create } from 'zustand'
import type {
  AppStep, RawRow, ColumnMapping, ValidationResult,
  Lead, DataQuality, AggregatedData,
} from '@/types'
import { autoDetectMapping } from '@/lib/mapper'
import { validateRows } from '@/lib/validator'
import { cleanRows } from '@/lib/cleaner'
import { aggregateLeads } from '@/lib/aggregator'

interface TableFilters {
  search: string
  source: string
  status: string
}

interface AppState {
  step: AppStep
  setStep: (step: AppStep) => void
  rawRows: RawRow[]
  headers: string[]
  parseErrors: string[]
  columnMapping: Partial<ColumnMapping>
  setColumnMapping: (mapping: Partial<ColumnMapping>) => void
  updateFieldMapping: (field: keyof ColumnMapping, value: string) => void
  validationResult: ValidationResult | null
  leads: Lead[]
  dataQuality: DataQuality | null
  aggregatedData: AggregatedData | null
  tableFilters: TableFilters
  setTableFilters: (filters: Partial<TableFilters>) => void
  loadRawData: (rows: RawRow[], headers: string[], parseErrors: string[]) => void
  processData: () => void
  reset: () => void
}

const initialFilters: TableFilters = { search: '', source: '', status: '' }

export const useAppStore = create<AppState>((set, get) => ({
  step: 'upload',
  setStep: (step) => set({ step }),
  rawRows: [],
  headers: [],
  parseErrors: [],
  columnMapping: {},
  setColumnMapping: (mapping) => set({ columnMapping: mapping }),
  updateFieldMapping: (field, value) =>
    set((state) => ({
      columnMapping: { ...state.columnMapping, [field]: value || undefined },
    })),
  validationResult: null,
  leads: [],
  dataQuality: null,
  aggregatedData: null,
  tableFilters: initialFilters,
  setTableFilters: (filters) =>
    set((state) => ({ tableFilters: { ...state.tableFilters, ...filters } })),

  loadRawData: (rows, headers, parseErrors) => {
    const mapping = autoDetectMapping(headers)
    set({
      rawRows: rows, headers, parseErrors, columnMapping: mapping,
      step: 'mapping', validationResult: null, leads: [],
      dataQuality: null, aggregatedData: null, tableFilters: initialFilters,
    })
  },

  processData: () => {
    const { rawRows, columnMapping } = get()
    const validationResult = validateRows(rawRows, columnMapping)
    const cleaningResult = cleanRows(validationResult.validRows, columnMapping)
    const aggregatedData = aggregateLeads(cleaningResult.leads)
    const dataQuality: DataQuality = {
      totalRawRows: rawRows.length,
      validRows: validationResult.validRows.length,
      invalidRows: validationResult.invalidRows.length,
      duplicatesRemoved: cleaningResult.duplicatesRemoved,
      warnings: cleaningResult.warningsApplied,
    }
    set({
      validationResult, leads: cleaningResult.leads,
      dataQuality, aggregatedData, step: 'dashboard',
    })
  },

  reset: () => set({
    step: 'upload', rawRows: [], headers: [], parseErrors: [],
    columnMapping: {}, validationResult: null, leads: [],
    dataQuality: null, aggregatedData: null, tableFilters: initialFilters,
  }),
}))
