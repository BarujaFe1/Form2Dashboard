'use client'

import { UploadZone } from './upload-zone'

export function LandingHero() {
  return (
    <div className="relative flex flex-1 flex-col items-center justify-center overflow-hidden px-4 py-16 sm:py-24">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--teal-soft)_0%,_transparent_55%)] opacity-80 dark:opacity-40"
      />
      <div className="relative mx-auto max-w-lg text-center">
        <div className="mb-6 inline-flex items-center rounded-full border border-border bg-surface/90 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur-sm">
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
