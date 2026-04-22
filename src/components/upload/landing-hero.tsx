'use client'

import { UploadZone } from './upload-zone'

export function LandingHero() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-4 py-16 sm:py-24">
      <div className="mx-auto max-w-lg text-center">
        <div className="mb-6 inline-flex items-center rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-muted-foreground">
          100% no navegador · sem backend · seus dados ficam com você
        </div>

        <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          Transforme seu CSV em um{' '}
          <span className="text-primary">dashboard útil</span>{' '}
          em segundos
        </h1>

        <p className="mt-4 text-base leading-relaxed text-muted-foreground">
          Importe dados de Google Forms ou CSV, mapeie as colunas e gere
          um painel operacional limpo — sem configuração, sem planilhas
          bagunçadas.
        </p>

        <div className="mt-10">
          <UploadZone />
        </div>
      </div>
    </div>
  )
}
