import { create } from 'zustand'
import type {
  AppStep, RawRow, ColumnMapping, ValidationResult,
  Lead, DataQuality, AggregatedData, TransformReport, PipelineProfile,
} from '@/types'
import { autoDetectMapping } from '@/lib/mapper'
import { runPipeline } from '@/lib/pipeline'

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
  transformReport: TransformReport | null
  pipelineProfile: PipelineProfile | null
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
  transformReport: null,
  pipelineProfile: null,
  tableFilters: initialFilters,
  setTableFilters: (filters) =>
    set((state) => ({ tableFilters: { ...state.tableFilters, ...filters } })),

  loadRawData: (rows, headers, parseErrors) => {
    const mapping = autoDetectMapping(headers)
    set({
      rawRows: rows, headers, parseErrors, columnMapping: mapping,
      step: 'mapping', validationResult: null, leads: [],
      dataQuality: null, aggregatedData: null,
      transformReport: null, pipelineProfile: null,
      tableFilters: initialFilters,
    })
  },

  processData: () => {
    const { rawRows, columnMapping } = get()
    const result = runPipeline(rawRows, columnMapping)
    set({
      validationResult: result.validationResult,
      leads: result.cleaningResult.leads,
      dataQuality: result.dataQuality,
      aggregatedData: result.aggregatedData,
      transformReport: result.transformReport,
      pipelineProfile: result.profile,
      step: 'dashboard',
    })
  },

  reset: () => set({
    step: 'upload', rawRows: [], headers: [], parseErrors: [],
    columnMapping: {}, validationResult: null, leads: [],
    dataQuality: null, aggregatedData: null,
    transformReport: null, pipelineProfile: null,
    tableFilters: initialFilters,
  }),
}))
