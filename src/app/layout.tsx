import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ThemeProvider } from '@/components/theme-provider'
import './globals.css'

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Form2Dashboard — Transforme CSV em dashboard operacional',
  description:
    'Transforme dados bagunçados de Google Forms e CSV em um dashboard limpo, consistente e útil em segundos. Sem backend, sem banco, tudo no seu navegador.',
  keywords: ['dashboard', 'csv', 'google forms', 'analytics', 'leads', 'operacional'],
  openGraph: {
    title: 'Form2Dashboard',
    description:
      'Upload messy form CSVs, clean columns, and generate interactive dashboards — privacy-first, client-side.',
    images: [{ url: '/og-image.png' }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Form2Dashboard',
    description: 'CSV bagunçado → dashboard operacional no navegador.',
    images: ['/og-image.png'],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className={`${inter.variable} h-full`} suppressHydrationWarning>
      <body className="min-h-full flex flex-col antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
