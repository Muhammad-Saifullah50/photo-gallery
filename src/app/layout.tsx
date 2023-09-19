import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { MyThemeProvider } from '@/components/theme/ThemeProvider'
import { Navbar } from '@/components'


const inter = Inter({
  subsets: ['latin']
})

export const metadata: Metadata = {
  title: 'Photoose',
  description: 'Discover and share favorite images',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en"><MyThemeProvider>
      <body className={`${inter.className} dark:bg-zinc-950`}>
      <Navbar />
        {children}
      </body>
    </MyThemeProvider>
    </html>
  )
}
