import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'NuKoken - Heerlijke Recepten',
  description: 'Ontdek heerlijke recepten voor elke gelegenheid',
  keywords: 'recepten, koken, eten, maaltijden, ingrediënten',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="nl">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}
