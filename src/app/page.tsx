'use client'

import { Header } from '@/components/layout/header'
import { LandingHero } from '@/components/upload/landing-hero'
import { ColumnMapper } from '@/components/mapping/column-mapper'
import { DashboardView } from '@/components/dashboard/dashboard-view'
import { useAppStore } from '@/store/app-store'

export default function Home() {
  const step = useAppStore((s) => s.step)

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex flex-1 flex-col">
        {step === 'upload' && <LandingHero />}
        {step === 'mapping' && <ColumnMapper />}
        {step === 'dashboard' && <DashboardView />}
      </main>
    </div>
  )
}
