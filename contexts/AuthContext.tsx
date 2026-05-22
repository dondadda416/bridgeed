'use client'

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react'
import { onAuthStateChanged, type User as FirebaseUser } from 'firebase/auth'
import { auth } from '@/lib/firebase'
import { fetchUserProfile } from '@/lib/auth'
import type { User } from '@/types'

// ─── Context shape ───────────────────────────────────────────────────────────

interface AuthContextValue {
  firebaseUser: FirebaseUser | null
  userProfile: User | null
  loading: boolean
  /** Call after login to refresh the profile */
  refreshProfile: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue>({
  firebaseUser: null,
  userProfile: null,
  loading: true,
  refreshProfile: async () => {},
})

// ─── Provider ────────────────────────────────────────────────────────────────

export function AuthProvider({ children }: { children: ReactNode }) {
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null)
  const [userProfile, setUserProfile] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  async function loadProfile(fbUser: FirebaseUser) {
    const profile = await fetchUserProfile(fbUser.uid)
    setUserProfile(profile)
  }

  async function refreshProfile() {
    if (firebaseUser) await loadProfile(firebaseUser)
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (fbUser) => {
      setFirebaseUser(fbUser)
      if (fbUser) {
        await loadProfile(fbUser)
      } else {
        setUserProfile(null)
      }
      setLoading(false)
    })
    return unsubscribe
  }, [])

  return (
    <AuthContext.Provider value={{ firebaseUser, userProfile, loading, refreshProfile }}>
      {children}
    </AuthContext.Provider>
  )
}

// ─── Hook ────────────────────────────────────────────────────────────────────

export function useAuth() {
  return useContext(AuthContext)
}

/** Returns the user profile or throws — use inside authenticated routes */
export function useRequiredAuth(): { firebaseUser: FirebaseUser; userProfile: User } {
  const { firebaseUser, userProfile, loading } = useAuth()
  if (loading) throw new Error('Auth is still loading')
  if (!firebaseUser || !userProfile) throw new Error('Not authenticated')
  return { firebaseUser, userProfile }
}
