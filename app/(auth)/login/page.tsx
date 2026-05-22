'use client'

import { useState, type FormEvent } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { signIn, fetchUserProfile, dashboardPathForRole } from '@/lib/auth'

export default function LoginPage() {
  const router = useRouter()
  const [email,    setEmail]    = useState('')
  const [password, setPassword] = useState('')
  const [error,    setError]    = useState('')
  const [loading,  setLoading]  = useState(false)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const credential = await signIn(email, password)
      const profile = await fetchUserProfile(credential.user.uid)
      if (!profile) throw new Error('Account found but profile is missing. Contact support.')
      router.push(dashboardPathForRole(profile.role))
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Sign in failed.'
      // Humanise Firebase error codes
      setError(
        msg.includes('invalid-credential') || msg.includes('wrong-password')
          ? 'Incorrect email or password.'
          : msg.includes('user-not-found')
          ? 'No account found with that email.'
          : msg.includes('too-many-requests')
          ? 'Too many attempts. Please wait a moment and try again.'
          : msg,
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="pt-nav min-h-screen bg-bg flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center font-serif text-white text-2xl mx-auto mb-3">
            B
          </div>
          <h1 className="font-serif text-3xl mb-1">Welcome back</h1>
          <p className="text-text2 text-base">Sign in to your BridgeED account</p>
        </div>

        {/* Form */}
        <div className="bg-surface border border-border rounded-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold mb-1.5 text-text" htmlFor="email">
                Email address
              </label>
              <input
                id="email"
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-4 py-3 border-[1.5px] border-border rounded-sm text-[15px] bg-bg text-text outline-none transition-colors focus:border-accent"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1.5 text-text" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                autoComplete="current-password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 border-[1.5px] border-border rounded-sm text-[15px] bg-bg text-text outline-none transition-colors focus:border-accent"
              />
            </div>

            {error && (
              <p className="text-[13px] text-[#EF4444] bg-[#FEE2E2] px-3 py-2 rounded-sm">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-accent text-white font-bold py-3.5 rounded-sm text-md hover:bg-[#235A3B] hover:-translate-y-px transition-all disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? 'Signing in…' : 'Sign In'}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-border text-center text-sm text-text2">
            Don&apos;t have an account?{' '}
            <Link href="/register" className="text-accent font-semibold hover:underline">
              Join your school
            </Link>
          </div>
        </div>

        {/* Demo credentials hint */}
        <div className="mt-4 bg-blue2 border border-blue/20 rounded-sm px-4 py-3 text-[13px] text-blue">
          <strong>Demo:</strong> maya@example.com · pass: Demo1234
        </div>
      </div>
    </div>
  )
}
