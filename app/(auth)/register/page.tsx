'use client'

import { useState, type FormEvent } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { registerUser, dashboardPathForRole } from '@/lib/auth'
import type { UserRole } from '@/types'

const ROLES: { value: UserRole; label: string; description: string }[] = [
  { value: 'parent',  label: 'Parent / Guardian', description: 'Access your child\'s progress and communicate with teachers' },
  { value: 'teacher', label: 'Teacher',            description: 'Manage your classroom and communicate with families' },
  { value: 'student', label: 'Student',            description: 'View your own progress and assignments' },
  { value: 'admin',   label: 'Administrator',      description: 'School-wide analytics and user management' },
]

export default function RegisterPage() {
  const router = useRouter()

  const [displayName,  setDisplayName]  = useState('')
  const [email,        setEmail]        = useState('')
  const [password,     setPassword]     = useState('')
  const [confirm,      setConfirm]      = useState('')
  const [role,         setRole]         = useState<UserRole>('parent')
  const [accessCode,   setAccessCode]   = useState('')
  const [error,        setError]        = useState('')
  const [loading,      setLoading]      = useState(false)
  const [agreedTerms,  setAgreedTerms]  = useState(false)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError('')

    if (password !== confirm) {
      setError('Passwords do not match.')
      return
    }
    if (password.length < 8) {
      setError('Password must be at least 8 characters.')
      return
    }
    if (!accessCode.trim()) {
      setError('Please enter your school access code.')
      return
    }
    if (!agreedTerms) {
      setError('Please agree to the Terms of Service and Privacy Policy.')
      return
    }

    setLoading(true)
    try {
      await registerUser({ email, password, displayName, role, schoolAccessCode: accessCode })
      router.push(dashboardPathForRole(role))
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Registration failed.'
      setError(
        msg.includes('email-already-in-use')
          ? 'An account with this email already exists.'
          : msg,
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="pt-nav min-h-screen bg-bg flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center font-serif text-white text-2xl mx-auto mb-3">
            B
          </div>
          <h1 className="font-serif text-3xl mb-1">Join your school</h1>
          <p className="text-text2 text-base">Create your BridgeED account</p>
        </div>

        <div className="bg-surface border border-border rounded-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Full name */}
            <div>
              <label className="block text-sm font-semibold mb-1.5" htmlFor="name">Full Name</label>
              <input
                id="name" type="text" required autoComplete="name"
                value={displayName} onChange={e => setDisplayName(e.target.value)}
                placeholder="Maya Thompson"
                className="w-full px-4 py-3 border-[1.5px] border-border rounded-sm text-[15px] bg-bg text-text outline-none focus:border-accent transition-colors"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold mb-1.5" htmlFor="email">Email Address</label>
              <input
                id="email" type="email" required autoComplete="email"
                value={email} onChange={e => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-4 py-3 border-[1.5px] border-border rounded-sm text-[15px] bg-bg text-text outline-none focus:border-accent transition-colors"
              />
            </div>

            {/* Role selector */}
            <div>
              <label className="block text-sm font-semibold mb-2">I am a…</label>
              <div className="grid grid-cols-2 gap-2">
                {ROLES.map(r => (
                  <button
                    key={r.value}
                    type="button"
                    onClick={() => setRole(r.value)}
                    className={`text-left px-3 py-3 rounded-sm border-[1.5px] text-sm transition-all ${
                      role === r.value
                        ? 'border-accent bg-accent/5 text-accent'
                        : 'border-border text-text2 hover:border-accent/40'
                    }`}
                  >
                    <span className="font-semibold block mb-0.5">{r.label}</span>
                    <span className="text-[11px] opacity-70 leading-tight">{r.description}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* School access code */}
            <div>
              <label className="block text-sm font-semibold mb-1.5" htmlFor="code">
                School Access Code
              </label>
              <input
                id="code" type="text" required
                value={accessCode} onChange={e => setAccessCode(e.target.value.toUpperCase())}
                placeholder="e.g. MAPLE-2024"
                className="w-full px-4 py-3 border-[1.5px] border-border rounded-sm text-[15px] bg-bg text-text outline-none focus:border-accent transition-colors font-mono tracking-wider"
              />
              <p className="text-xs text-text3 mt-1">Ask your school office if you don&apos;t have one.</p>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold mb-1.5" htmlFor="pw">Password</label>
              <input
                id="pw" type="password" required autoComplete="new-password" minLength={8}
                value={password} onChange={e => setPassword(e.target.value)}
                placeholder="Minimum 8 characters"
                className="w-full px-4 py-3 border-[1.5px] border-border rounded-sm text-[15px] bg-bg text-text outline-none focus:border-accent transition-colors"
              />
            </div>

            {/* Confirm password */}
            <div>
              <label className="block text-sm font-semibold mb-1.5" htmlFor="pw2">Confirm Password</label>
              <input
                id="pw2" type="password" required autoComplete="new-password"
                value={confirm} onChange={e => setConfirm(e.target.value)}
                placeholder="Repeat your password"
                className="w-full px-4 py-3 border-[1.5px] border-border rounded-sm text-[15px] bg-bg text-text outline-none focus:border-accent transition-colors"
              />
            </div>

            {/* Privacy + Terms checkbox */}
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={agreedTerms}
                onChange={e => setAgreedTerms(e.target.checked)}
                className="mt-0.5 w-4 h-4 accent-[#2C6E49] flex-shrink-0"
              />
              <span className="text-sm text-text2 leading-relaxed">
                I agree to BridgeED&apos;s{' '}
                <Link href="/terms" className="text-accent font-semibold hover:underline">Terms of Service</Link>
                {' '}and{' '}
                <Link href="/privacy" className="text-accent font-semibold hover:underline">Privacy Policy</Link>.
                I understand that my child&apos;s school data is protected under Ontario&apos;s FIPPA.
              </span>
            </label>

            {error && (
              <p className="text-[13px] text-[#EF4444] bg-[#FEE2E2] px-3 py-2 rounded-sm">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-accent text-white font-bold py-3.5 rounded-sm text-md hover:bg-[#235A3B] hover:-translate-y-px transition-all disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? 'Creating account…' : 'Create Account'}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-border text-center text-sm text-text2">
            Already have an account?{' '}
            <Link href="/login" className="text-accent font-semibold hover:underline">Sign in</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
