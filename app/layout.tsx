import type { Metadata } from 'next'
import { DM_Sans, DM_Serif_Display } from 'next/font/google'
import { AuthProvider } from '@/contexts/AuthContext'
import { Navigation } from '@/components/Navigation'
import CookieBanner from '@/components/CookieBanner'
import './globals.css'

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
})

const dmSerif = DM_Serif_Display({
  subsets: ['latin'],
  variable: '--font-serif',
  weight: '400',
  style: ['normal', 'italic'],
})

export const metadata: Metadata = {
  title: 'BridgeED — Ontario K–8 School Family Engagement Platform',
  description:
    'Connecting Ontario K–8 schools and families for student success. Real-time progress tracking, secure messaging, parent workshops, and curriculum guidance.',
  keywords: ['Ontario schools', 'parent engagement', 'K-8', 'student progress', 'BridgeED'],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${dmSans.variable} ${dmSerif.variable}`}>
      <body className="font-sans bg-bg text-text min-h-screen overflow-x-hidden">
        <AuthProvider>
          <Navigation />
          <main>{children}</main>
          <CookieBanner />
        </AuthProvider>
      </body>
    </html>
  )
}
