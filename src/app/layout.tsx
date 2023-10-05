import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ThemeProvider } from '@/components/theme/ThemeProvider'
import { Footer, Navbar } from '@/components'
import { Toaster } from "@/components/ui/toaster"
import { SessionProvider } from 'next-auth/react'
import { getCurrentUser } from '@/lib/session'

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
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} dark:bg-zinc-950`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Navbar />
            {children}
            <Toaster />
            <Footer />
          </ThemeProvider>
      </body>

    </html >
  )
}

