'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

const STORAGE_KEY = 'recess_cookie_consent'

export default function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const consent = localStorage.getItem(STORAGE_KEY)
      if (!consent) setVisible(true)
    }
  }, [])

  function accept() {
    localStorage.setItem(STORAGE_KEY, 'accepted')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      className="fixed bottom-0 left-0 right-0 z-50 bg-[#1A1814] text-white px-5 py-4 flex flex-col sm:flex-row items-start sm:items-center gap-4 shadow-lg"
    >
      <p className="text-sm leading-relaxed flex-1 opacity-90">
        RECESS uses a single session cookie to keep you signed in. We do not use advertising
        or tracking cookies.{' '}
        <Link href="/privacy" className="underline opacity-70 hover:opacity-100">
          Privacy Policy
        </Link>
      </p>
      <button
        onClick={accept}
        className="flex-shrink-0 bg-[#2C6E49] hover:bg-[#235A3B] text-white text-sm font-semibold px-5 py-2 rounded-sm transition-colors whitespace-nowrap"
      >
        Got it
      </button>
    </div>
  )
}
