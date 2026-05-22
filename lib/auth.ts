import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  updateProfile,
  type UserCredential,
} from 'firebase/auth'
import {
  doc,
  setDoc,
  getDoc,
  serverTimestamp,
} from 'firebase/firestore'
import { auth, db } from './firebase'
import type { User, UserRole, NotificationPreferences } from '@/types'

const DEFAULT_NOTIFICATION_PREFS: NotificationPreferences = {
  email: true,
  push: true,
  messageAlerts: true,
  assignmentReminders: true,
  announcementAlerts: true,
}

// ─── Register ────────────────────────────────────────────────────────────────

export interface RegisterPayload {
  email: string
  password: string
  displayName: string
  role: UserRole
  schoolAccessCode: string
}

export async function registerUser(payload: RegisterPayload): Promise<UserCredential> {
  const { email, password, displayName, role, schoolAccessCode } = payload

  // 1. Verify the school access code
  const schoolId = await resolveSchoolByAccessCode(schoolAccessCode)
  if (!schoolId) throw new Error('Invalid school access code. Please check with your school.')

  // 2. Create Firebase Auth account
  const credential = await createUserWithEmailAndPassword(auth, email, password)
  await updateProfile(credential.user, { displayName })

  // 3. Create Firestore user document
  const userDoc: Omit<User, 'id'> & { createdAt: unknown; lastActiveAt: unknown } = {
    email,
    displayName,
    role,
    schoolId,
    language: 'en',
    notifications: DEFAULT_NOTIFICATION_PREFS,
    createdAt: serverTimestamp() as unknown as Date,
    lastActiveAt: serverTimestamp() as unknown as Date,
    ...(role === 'parent' ? { linkedStudentIds: [] } : {}),
    ...(role === 'teacher' ? { classIds: [] } : {}),
  }

  await setDoc(doc(db, 'users', credential.user.uid), userDoc)

  return credential
}

// ─── Sign In ─────────────────────────────────────────────────────────────────

export async function signIn(email: string, password: string): Promise<UserCredential> {
  return signInWithEmailAndPassword(auth, email, password)
}

// ─── Sign Out ────────────────────────────────────────────────────────────────

export async function signOut(): Promise<void> {
  return firebaseSignOut(auth)
}

// ─── Fetch user profile ──────────────────────────────────────────────────────

export async function fetchUserProfile(uid: string): Promise<User | null> {
  const snap = await getDoc(doc(db, 'users', uid))
  if (!snap.exists()) return null
  return { id: snap.id, ...snap.data() } as User
}

// ─── Role-based redirect helper ──────────────────────────────────────────────

export function dashboardPathForRole(role: UserRole): string {
  switch (role) {
    case 'parent':    return '/dashboard/parent'
    case 'teacher':   return '/dashboard/teacher'
    case 'student':   return '/dashboard/student'
    case 'admin':     return '/dashboard/admin'
    case 'organizer': return '/dashboard/admin'
    default:          return '/'
  }
}

// ─── School access code resolver ─────────────────────────────────────────────

async function resolveSchoolByAccessCode(code: string): Promise<string | null> {
  const { collection, query, where, getDocs } = await import('firebase/firestore')
  const q = query(
    collection(db, 'schools'),
    where('accessCode', '==', code.trim().toUpperCase()),
  )
  const snap = await getDocs(q)
  if (snap.empty) return null
  return snap.docs[0].id
}
