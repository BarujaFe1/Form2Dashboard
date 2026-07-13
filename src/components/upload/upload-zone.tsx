'use client'

import { useCallback, useRef, useState } from 'react'
import { Upload, FileSpreadsheet, FileWarning, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAppStore } from '@/store/app-store'
import { parseCSV, parseCSVString } from '@/lib/parser'
import { MAX_CSV_FILE_BYTES, MAX_CSV_ROWS_SOFT } from '@/config/constants'

function formatBytes(bytes: number): string {
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

export function UploadZone() {
  const loadRawData = useAppStore((s) => s.loadRawData)
  const [isDragging, setIsDragging] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [warning, setWarning] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const applyParseResult = useCallback(
    (rows: ReturnType<typeof parseCSVString>['rows'], headers: string[], errors: string[]) => {
      if (rows.length === 0) {
        setError('O arquivo CSV está vazio ou não pôde ser lido.')
        return false
      }
      if (rows.length > MAX_CSV_ROWS_SOFT) {
        setWarning(
          `Arquivo grande (${rows.length.toLocaleString('pt-BR')} linhas). O processamento pode ficar lento neste navegador.`
        )
      } else {
        setWarning(null)
      }
      loadRawData(rows, headers, errors)
      return true
    },
    [loadRawData]
  )

  const handleFile = useCallback(
    async (file: File) => {
      if (!file.name.toLowerCase().endsWith('.csv')) {
        setError('Por favor, selecione um arquivo CSV.')
        return
      }
      if (file.size > MAX_CSV_FILE_BYTES) {
        setError(
          `Arquivo muito grande (${formatBytes(file.size)}). Limite: ${formatBytes(MAX_CSV_FILE_BYTES)}.`
        )
        return
      }
      setError(null)
      setIsLoading(true)
      try {
        const result = await parseCSV(file)
        applyParseResult(result.rows, result.headers, result.errors)
      } catch {
        setError('Erro ao processar o arquivo. Verifique o formato.')
      } finally {
        setIsLoading(false)
      }
    },
    [applyParseResult]
  )

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setIsDragging(false)
      const file = e.dataTransfer.files[0]
      if (file) handleFile(file)
    },
    [handleFile]
  )

  const openFilePicker = useCallback(() => {
    fileInputRef.current?.click()
  }, [])

  const loadPublicCsv = useCallback(
    async (path: string, label: string) => {
      setError(null)
      setWarning(null)
      setIsLoading(true)
      try {
        const response = await fetch(path)
        if (!response.ok) {
          setError(`Erro ao carregar ${label}.`)
          return
        }
        const csvText = await response.text()
        const result = parseCSVString(csvText)
        applyParseResult(result.rows, result.headers, result.errors)
      } catch {
        setError(`Erro ao carregar ${label}.`)
      } finally {
        setIsLoading(false)
      }
    },
    [applyParseResult]
  )

  return (
    <div className="w-full space-y-3">
      <div
        role="button"
        tabIndex={0}
        aria-label="Enviar arquivo CSV"
        aria-busy={isLoading}
        onDragOver={(e) => {
          e.preventDefault()
          setIsDragging(true)
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        onClick={openFilePicker}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            openFilePicker()
          }
        }}
        className={`
          group relative flex cursor-pointer flex-col items-center justify-center
          rounded-xl border-2 border-dashed px-6 py-10 transition-all duration-200
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring
          ${
            isDragging
              ? 'border-primary bg-teal-soft'
              : 'border-border bg-surface hover:border-primary/40 hover:bg-muted/50'
          }
        `}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".csv,text/csv"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0]
            if (file) handleFile(file)
            e.target.value = ''
          }}
        />

        {isLoading ? (
          <Loader2 className="h-8 w-8 animate-spin text-primary" aria-hidden />
        ) : (
          <>
            <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-lg bg-muted group-hover:bg-primary/10 transition-colors">
              <Upload className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" aria-hidden />
            </div>
            <p className="text-sm font-medium text-foreground">
              Arraste seu CSV aqui ou clique para selecionar
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              Suporta arquivos .csv exportados do Google Forms · até {formatBytes(MAX_CSV_FILE_BYTES)}
            </p>
          </>
        )}
      </div>

      <div className="flex items-center gap-3">
        <div className="h-px flex-1 bg-border" />
        <span className="text-xs text-muted-foreground">ou experimente</span>
        <div className="h-px flex-1 bg-border" />
      </div>

      <div className="grid gap-2 sm:grid-cols-2">
        <Button
          variant="outline"
          className="w-full gap-2 text-sm h-10"
          onClick={() => loadPublicCsv('/seed/leads-operacionais.csv', 'dados de exemplo')}
          disabled={isLoading}
        >
          <FileSpreadsheet className="h-4 w-4" aria-hidden />
          Dataset operacional
        </Button>
        <Button
          variant="outline"
          className="w-full gap-2 text-sm h-10"
          onClick={() =>
            loadPublicCsv('/fixtures/before-after/messy-leads.csv', 'CSV bagunçado')
          }
          disabled={isLoading}
        >
          <FileWarning className="h-4 w-4" aria-hidden />
          CSV bagunçado (antes/depois)
        </Button>
      </div>

      {error && (
        <p className="text-center text-xs text-destructive" role="alert">
          {error}
        </p>
      )}
      {warning && !error && (
        <p className="text-center text-xs text-amber-600 dark:text-amber-400" role="status">
          {warning}
        </p>
      )}
    </div>
  )
}
