'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'
import { Menu, X, Globe } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useAuth } from '@/contexts/AuthContext'
import { signOut, dashboardPathForRole } from '@/lib/auth'
import { Avatar } from '@/components/ui/Avatar'
import { Modal } from '@/components/ui/Modal'

// Parent-first nav — 7 items max. Admin/Teacher tools live in the paid school tier.
const NAV_LINKS = [
  { label: 'Home',       href: '/' },
  { label: 'My Child',   href: '/dashboard/parent' },
  { label: 'Messages',   href: '/messaging' },
  { label: 'Calendar',   href: '/calendar' },
  { label: 'Workshops',  href: '/workshops' },
  { label: 'Learn',      href: '/curriculum' },
  { label: 'Help',       href: '/help' },
]

// Languages — EN and FR are live; others show "coming soon"
const LANGUAGES = [
  { code: 'en', label: 'English',    live: true  },
  { code: 'fr', label: 'Français',   live: true  },
  { code: 'ar', label: 'العربية',    live: false },
  { code: 'zh', label: '中文',       live: false },
  { code: 'pa', label: 'Punjabi',    live: false },
  { code: 'tl', label: 'Tagalog',    live: false },
  { code: 'ur', label: 'Urdu',       live: false },
  { code: 'ta', label: 'Tamil',      live: false },
  { code: 'so', label: 'Somali',     live: false },
]

export function Navigation() {
  const pathname = usePathname()
  const router   = useRouter()
  const { userProfile, loading } = useAuth()

  const [mobileOpen,   setMobileOpen]   = useState(false)
  const [showLang,     setShowLang]     = useState(false)
  const [showSignIn,   setShowSignIn]   = useState(false)
  const [showJoin,     setShowJoin]     = useState(false)
  const [activeLang,   setActiveLang]   = useState('en')

  async function handleSignOut() {
    await signOut()
    setMobileOpen(false)
    router.push('/')
  }

  function isActive(href: string) {
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  return (
    <>
      {/* ── Skip to content (accessibility) ── */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[999] focus:bg-accent focus:text-white focus:px-4 focus:py-2 focus:rounded-sm focus:font-semibold"
      >
        Skip to main content
      </a>

      <nav
        className="fixed top-0 left-0 right-0 h-nav bg-white/96 backdrop-blur-sm border-b border-border z-[100]"
        aria-label="Main navigation"
      >
        <div className="flex items-center h-full">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 px-5 flex-shrink-0 no-underline"
            aria-label="RECESS home"
          >
            <div
              className="w-9 h-9 bg-accent rounded-[10px] flex items-center justify-center font-serif text-white text-lg"
              aria-hidden="true"
            >
              R
            </div>
            <span className="font-serif text-[20px] text-text tracking-[-0.3px] hidden sm:inline">
              RECE<span className="text-accent">SS</span>
            </span>
          </Link>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-0.5 flex-1 px-2 overflow-x-auto [scrollbar-width:none]">
            {NAV_LINKS.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'px-3 py-1.5 rounded-sm text-[13px] font-medium whitespace-nowrap transition-all duration-150 no-underline',
                  isActive(link.href)
                    ? 'bg-accent text-white'
                    : 'text-text2 hover:bg-surface2 hover:text-text',
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right side: language + auth */}
          <div className="flex items-center gap-2 px-4 flex-shrink-0 ml-auto md:ml-0">
            {/* Language picker */}
            <div className="relative">
              <button
                onClick={() => setShowLang(v => !v)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-sm text-text2 hover:bg-surface2 transition-colors text-sm font-medium"
                aria-label="Choose language"
                aria-expanded={showLang}
              >
                <Globe size={15} aria-hidden="true" />
                <span className="hidden sm:inline uppercase text-xs tracking-wide">{activeLang}</span>
              </button>
              {showLang && (
                <div className="absolute right-0 top-full mt-1 bg-surface border border-border rounded-lg shadow-lg py-1 w-44 z-50">
                  {LANGUAGES.map(lang => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        if (lang.live) setActiveLang(lang.code)
                        setShowLang(false)
                      }}
                      className={cn(
                        'w-full text-left px-4 py-2 text-sm transition-colors flex items-center justify-between',
                        lang.live
                          ? 'text-text hover:bg-surface2 cursor-pointer'
                          : 'text-text3 cursor-default',
                        activeLang === lang.code && 'text-accent font-semibold',
                      )}
                    >
                      <span>{lang.label}</span>
                      {!lang.live && <span className="text-[10px] text-text3">soon</span>}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Auth — desktop */}
            {!loading && (
              <div className="hidden md:flex items-center gap-2">
                {userProfile ? (
                  <>
                    <button
                      onClick={() => router.push(dashboardPathForRole(userProfile.role))}
                      className="flex items-center gap-2 text-sm font-medium text-text2 hover:text-text transition-colors"
                      aria-label={`Go to ${userProfile.displayName}'s dashboard`}
                    >
                      <Avatar name={userProfile.displayName} size="sm" />
                      <span className="hidden lg:inline">{userProfile.displayName.split(' ')[0]}</span>
                    </button>
                    <button
                      onClick={handleSignOut}
                      className="px-4 py-2 rounded-sm text-[13px] font-semibold border border-border text-text hover:border-accent hover:text-accent transition-colors"
                    >
                      Sign Out
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => setShowSignIn(true)}
                      className="px-4 py-2 rounded-sm text-[13px] font-semibold border border-border text-text hover:border-accent hover:text-accent transition-colors"
                    >
                      Sign In
                    </button>
                    <button
                      onClick={() => setShowJoin(true)}
                      className="px-4 py-2 rounded-sm text-[13px] font-semibold bg-accent text-white hover:bg-[#235A3B] transition-colors"
                    >
                      Join School
                    </button>
                  </>
                )}
              </div>
            )}

            {/* Hamburger — mobile only */}
            <button
              onClick={() => setMobileOpen(v => !v)}
              className="md:hidden p-2 rounded-sm text-text2 hover:bg-surface2 transition-colors"
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
            >
              {mobileOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
            </button>
          </div>
        </div>

        {/* ── Mobile menu ── */}
        {mobileOpen && (
          <div
            id="mobile-menu"
            className="md:hidden absolute top-nav left-0 right-0 bg-white border-b border-border shadow-lg z-50 pb-4"
          >
            <div className="px-4 pt-3 flex flex-col gap-1">
              {NAV_LINKS.map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    'px-4 py-3 rounded-sm text-[15px] font-medium transition-colors no-underline',
                    isActive(link.href)
                      ? 'bg-accent text-white'
                      : 'text-text hover:bg-surface2',
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Mobile auth */}
            <div className="px-4 pt-3 border-t border-border mt-3 flex flex-col gap-2">
              {userProfile ? (
                <>
                  <div className="flex items-center gap-3 px-4 py-2">
                    <Avatar name={userProfile.displayName} size="sm" />
                    <span className="font-semibold text-text">{userProfile.displayName}</span>
                  </div>
                  <button
                    onClick={handleSignOut}
                    className="w-full px-4 py-3 rounded-sm text-[15px] font-semibold border border-border text-text hover:bg-surface2 transition-colors"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => { setShowSignIn(true); setMobileOpen(false) }}
                    className="w-full px-4 py-3 rounded-sm text-[15px] font-semibold border border-border text-text hover:border-accent hover:text-accent transition-colors"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => { setShowJoin(true); setMobileOpen(false) }}
                    className="w-full px-4 py-3 rounded-sm text-[15px] font-semibold bg-accent text-white hover:bg-[#235A3B] transition-colors"
                  >
                    Join School
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Sign In Modal */}
      <Modal open={showSignIn} onClose={() => setShowSignIn(false)} title="Sign In to RECESS">
        <p className="text-base text-text2 mb-6 leading-relaxed">
          Access your child&apos;s progress, messages, and school updates.
        </p>
        <Link
          href="/login"
          onClick={() => setShowSignIn(false)}
          className="block w-full text-center bg-accent text-white font-bold py-3.5 rounded-sm hover:bg-[#235A3B] transition-colors no-underline"
        >
          Go to Login
        </Link>
        <p className="text-center text-sm text-text2 mt-4">
          No account?{' '}
          <Link href="/register" onClick={() => setShowSignIn(false)} className="text-accent font-semibold">
            Join your school
          </Link>
        </p>
      </Modal>

      {/* Join School Modal */}
      <Modal open={showJoin} onClose={() => setShowJoin(false)} title="Join Your School">
        <p className="text-base text-text2 mb-6 leading-relaxed">
          Create your account using the access code provided by your school office.
        </p>
        <Link
          href="/register"
          onClick={() => setShowJoin(false)}
          className="block w-full text-center bg-accent text-white font-bold py-3.5 rounded-sm hover:bg-[#235A3B] transition-colors no-underline"
        >
          Create Account
        </Link>
        <p className="text-center text-sm text-text2 mt-4">
          Don&apos;t have a code?{' '}
          <Link href="/help" onClick={() => setShowJoin(false)} className="text-accent font-semibold">
            Get help
          </Link>
        </p>
      </Modal>
    </>
  )
}
