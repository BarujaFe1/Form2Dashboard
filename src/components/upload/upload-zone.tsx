'use client'

import { useCallback, useRef, useState } from 'react'
import { Upload, FileSpreadsheet, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAppStore } from '@/store/app-store'
import { parseCSV, parseCSVString } from '@/lib/parser'

export function UploadZone() {
  const loadRawData = useAppStore((s) => s.loadRawData)
  const [isDragging, setIsDragging] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFile = useCallback(
    async (file: File) => {
      if (!file.name.endsWith('.csv')) {
        setError('Por favor, selecione um arquivo CSV.')
        return
      }
      setError(null)
      setIsLoading(true)
      try {
        const result = await parseCSV(file)
        if (result.rows.length === 0) {
          setError('O arquivo CSV está vazio ou não pôde ser lido.')
          return
        }
        loadRawData(result.rows, result.headers, result.errors)
      } catch {
        setError('Erro ao processar o arquivo. Verifique o formato.')
      } finally {
        setIsLoading(false)
      }
    },
    [loadRawData]
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

  const handleSeedData = useCallback(async () => {
    setError(null)
    setIsLoading(true)
    try {
      const response = await fetch('/seed/leads-operacionais.csv')
      const csvText = await response.text()
      const result = parseCSVString(csvText)
      if (result.rows.length === 0) {
        setError('Erro ao carregar dados de exemplo.')
        return
      }
      loadRawData(result.rows, result.headers, result.errors)
    } catch {
      setError('Erro ao carregar dados de exemplo.')
    } finally {
      setIsLoading(false)
    }
  }, [loadRawData])

  return (
    <div className="w-full space-y-3">
      <div
        onDragOver={(e) => {
          e.preventDefault()
          setIsDragging(true)
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`
          group relative flex cursor-pointer flex-col items-center justify-center
          rounded-xl border-2 border-dashed px-6 py-10 transition-all duration-200
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
          accept=".csv"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0]
            if (file) handleFile(file)
          }}
        />

        {isLoading ? (
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        ) : (
          <>
            <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-lg bg-muted group-hover:bg-primary/10 transition-colors">
              <Upload className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
            </div>
            <p className="text-sm font-medium text-foreground">
              Arraste seu CSV aqui ou clique para selecionar
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              Suporta arquivos .csv exportados do Google Forms
            </p>
          </>
        )}
      </div>

      <div className="flex items-center gap-3">
        <div className="h-px flex-1 bg-border" />
        <span className="text-xs text-muted-foreground">ou</span>
        <div className="h-px flex-1 bg-border" />
      </div>

      <Button
        variant="outline"
        className="w-full gap-2 text-sm h-10"
        onClick={handleSeedData}
        disabled={isLoading}
      >
        <FileSpreadsheet className="h-4 w-4" />
        Carregar dados de exemplo
      </Button>

      {error && (
        <p className="text-center text-xs text-destructive">{error}</p>
      )}
    </div>
  )
}
