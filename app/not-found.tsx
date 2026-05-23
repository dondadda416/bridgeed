import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Page Not Found — BridgeED',
}

export default function NotFound() {
  return (
    <div id="main-content" className="pt-nav min-h-screen bg-bg flex items-center justify-center px-6">
      <div className="text-center max-w-[480px]">
        <p className="font-serif text-[96px] leading-none text-accent3 mb-2">404</p>
        <h1 className="font-serif text-3xl text-text mb-4">Page not found</h1>
        <p className="text-text2 leading-[1.75] mb-8">
          The page you&apos;re looking for doesn&apos;t exist or may have moved.
          Let&apos;s get you back on track.
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <Link
            href="/"
            className="bg-accent text-white font-semibold px-6 py-3 rounded-sm text-sm hover:bg-[#235A3B] transition-colors no-underline"
          >
            Go to Home
          </Link>
          <Link
            href="/dashboard/parent"
            className="border border-accent text-accent font-semibold px-6 py-3 rounded-sm text-sm hover:bg-accent hover:text-white transition-colors no-underline"
          >
            My Dashboard
          </Link>
        </div>
        <p className="text-sm text-text3 mt-8">
          Need help?{' '}
          <a href="mailto:hello@bridgeed.ca" className="text-accent hover:underline">
            hello@bridgeed.ca
          </a>
        </p>
      </div>
    </div>
  )
}
