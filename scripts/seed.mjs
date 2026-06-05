// ─────────────────────────────────────────────────────────────────────────────
// RECESS — Firestore + Auth seed script
//
// Creates the demo school, demo accounts, students, and progress data so the
// app is usable end-to-end (login + dashboards + registration via access code).
//
// Idempotent: safe to run more than once. Existing users are updated in place.
//
// SETUP (one time):
//   1. Firebase Console → Authentication → Sign-in method → enable Email/Password.
//   2. Firebase Console → Project settings → Service accounts →
//        "Generate new private key" → save the JSON as:
//            scripts/serviceAccountKey.json        (already git-ignored)
//      ...OR set GOOGLE_APPLICATION_CREDENTIALS to its absolute path.
//   3. npm install            (installs firebase-admin, added to package.json)
//
// RUN:
//   npm run seed
//
// All demo accounts use the password:  Demo1234
// ─────────────────────────────────────────────────────────────────────────────

import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'
import admin from 'firebase-admin'

const __dirname = dirname(fileURLToPath(import.meta.url))

// ── Locate service account credentials ───────────────────────────────────────
function loadCredential() {
  const envPath = process.env.GOOGLE_APPLICATION_CREDENTIALS
  const localPath = resolve(__dirname, 'serviceAccountKey.json')
  const path = envPath || localPath
  try {
    const json = JSON.parse(readFileSync(path, 'utf8'))
    console.log(`🔑 Using service account: ${json.client_email} (project ${json.project_id})`)
    return admin.credential.cert(json)
  } catch (err) {
    console.error(
      '\n❌ Could not read a service account key.\n' +
        '   Download one from Firebase Console → Project settings → Service accounts →\n' +
        '   "Generate new private key", then save it as:\n' +
        `       ${localPath}\n` +
        '   (or set GOOGLE_APPLICATION_CREDENTIALS to its path)\n',
    )
    process.exit(1)
  }
}

admin.initializeApp({ credential: loadCredential() })
const auth = admin.auth()
const db = admin.firestore()
const { Timestamp } = admin.firestore

const PASSWORD = 'Demo1234'
const SCHOOL_ID = 'maple-ridge-ps'
const SCHOOL_YEAR = '2024-25'

// ── Helpers ──────────────────────────────────────────────────────────────────

/** Create the auth user if missing, otherwise update password + displayName. */
async function upsertAuthUser({ uid, email, displayName }) {
  try {
    await auth.getUser(uid)
    await auth.updateUser(uid, { email, password: PASSWORD, displayName, emailVerified: true })
    console.log(`   ↻ updated auth user  ${email}`)
  } catch (err) {
    if (err.code === 'auth/user-not-found') {
      await auth.createUser({ uid, email, password: PASSWORD, displayName, emailVerified: true })
      console.log(`   + created auth user  ${email}`)
    } else {
      throw err
    }
  }
}

const notificationPrefs = {
  email: true,
  push: true,
  messageAlerts: true,
  assignmentReminders: true,
  announcementAlerts: true,
}

// ── Data definitions ─────────────────────────────────────────────────────────

const SCHOOL = {
  name: 'Maple Ridge PS',
  board: 'Toronto District School Board',
  address: '120 Maple Ridge Ave, Toronto, ON M4K 1N2',
  accessCode: 'MAPLE-2024',
  principalId: 'admin-priya',
  totalStudents: 412,
  grades: ['JK', 'K', '1', '2', '3', '4', '5', '6', '7', '8'],
  schoolYear: SCHOOL_YEAR,
}

const USERS = [
  {
    uid: 'maya-thompson',
    email: 'maya@example.com',
    displayName: 'Maya Thompson',
    role: 'parent',
    schoolId: SCHOOL_ID,
    linkedStudentIds: ['aisha-thompson', 'marcus-thompson'],
    language: 'en',
  },
  {
    uid: 'teacher-johnson',
    email: 'teacher@example.com',
    displayName: 'Ms. S. Johnson',
    role: 'teacher',
    schoolId: SCHOOL_ID,
    classIds: ['class-4j'],
    language: 'en',
  },
  {
    uid: 'admin-priya',
    email: 'admin@example.com',
    displayName: 'Priya Sharma',
    role: 'admin',
    schoolId: SCHOOL_ID,
    language: 'en',
  },
]

const STUDENTS = [
  {
    id: 'aisha-thompson',
    firstName: 'Aisha',
    lastName: 'Thompson',
    grade: 4,
    teacherId: 'teacher-johnson',
    schoolId: SCHOOL_ID,
    parentIds: ['maya-thompson'],
    studentNumber: 'MR-100412',
    enrollmentDate: Timestamp.fromDate(new Date('2021-09-07')),
  },
  {
    id: 'marcus-thompson',
    firstName: 'Marcus',
    lastName: 'Thompson',
    grade: 2,
    teacherId: 'teacher-evans',
    schoolId: SCHOOL_ID,
    parentIds: ['maya-thompson'],
    studentNumber: 'MR-100598',
    enrollmentDate: Timestamp.fromDate(new Date('2023-09-05')),
  },
]

const goodSkills = {
  responsibility: 4,
  organization: 3,
  independentWork: 4,
  collaboration: 4,
  initiative: 3,
  selfRegulation: 3,
}

// Progress for Aisha — mirrors the parent dashboard demo subjects.
const AISHA_PROGRESS = {
  studentId: 'aisha-thompson',
  schoolYear: SCHOOL_YEAR,
  term: 2,
  subjects: {
    Mathematics: {
      grade: 78, letterGrade: 'B',
      teacherComment: 'Working on fractions — great effort this week.',
      learningSkills: goodSkills, topics: ['Fractions', 'Measurement'],
    },
    'Language Arts': {
      grade: 85, letterGrade: 'A-',
      teacherComment: 'Strong reader, keep up the nightly reading.',
      learningSkills: goodSkills, topics: ['Reading Comprehension', 'Narrative Writing'],
    },
    Science: {
      grade: 91, letterGrade: 'A',
      teacherComment: 'Excellent work on the Habitats project.',
      learningSkills: goodSkills, topics: ['Habitats', 'Life Systems'],
    },
    'Social Studies': {
      grade: 80, letterGrade: 'B+',
      teacherComment: 'Good participation in class discussions.',
      learningSkills: goodSkills, topics: ['Early Societies', 'Mapping'],
    },
    Arts: {
      grade: 88, letterGrade: 'A-',
      teacherComment: 'Creative and enthusiastic — a pleasure to teach.',
      learningSkills: goodSkills, topics: ['Visual Arts', 'Music'],
    },
    'Health & PE': {
      grade: 92, letterGrade: 'A',
      teacherComment: 'Excellent attitude and leadership on the field.',
      learningSkills: goodSkills, topics: ['Movement', 'Healthy Living'],
    },
  },
  attendance: { present: 86, absent: 2, late: 1, percentage: 96 },
  readingLevel: 26,
  learningGoals: [
    { id: 'g1', description: 'Re-read word problems before solving', targetDate: Timestamp.fromDate(new Date('2025-01-31')), met: false, teacherComment: 'Improving steadily.' },
    { id: 'g2', description: 'Read 20 minutes nightly', targetDate: Timestamp.fromDate(new Date('2025-01-31')), met: true },
    { id: 'g3', description: 'Contribute to class discussions', targetDate: Timestamp.fromDate(new Date('2025-01-31')), met: true },
    { id: 'g4', description: 'Complete science inquiry log', targetDate: Timestamp.fromDate(new Date('2025-01-31')), met: true },
    { id: 'g5', description: 'Organize materials independently', targetDate: Timestamp.fromDate(new Date('2025-01-31')), met: true },
  ],
  interventions: [],
}

const ANNOUNCEMENTS = [
  {
    id: 'ann-interviews',
    schoolId: SCHOOL_ID,
    title: 'Parent-Teacher Interviews — Nov 28',
    body: "Book your 15-minute slot through the office or by messaging your child's teacher directly.",
    type: 'important',
    postedBy: 'admin-priya',
    postedAt: Timestamp.fromDate(new Date('2024-11-14')),
  },
  {
    id: 'ann-concert',
    schoolId: SCHOOL_ID,
    title: 'Winter Concert — Dec 12',
    body: 'Grades 3–6 perform at 6:30pm in the gymnasium. All families welcome.',
    type: 'school',
    postedBy: 'admin-priya',
    postedAt: Timestamp.fromDate(new Date('2024-11-20')),
  },
]

const CALENDAR_EVENTS = [
  {
    id: 'evt-interviews',
    schoolId: SCHOOL_ID,
    title: 'Parent-Teacher Interviews',
    description: 'Evening interviews — booking required.',
    date: Timestamp.fromDate(new Date('2024-11-28T16:00:00')),
    type: 'important',
    createdBy: 'admin-priya',
  },
  {
    id: 'evt-concert',
    schoolId: SCHOOL_ID,
    title: 'Winter Concert',
    description: 'Grades 3–6, 6:30pm, gymnasium.',
    date: Timestamp.fromDate(new Date('2024-12-12T18:30:00')),
    type: 'school',
    createdBy: 'admin-priya',
  },
]

// ── Run ──────────────────────────────────────────────────────────────────────

async function seed() {
  console.log('\n🌱 Seeding RECESS demo data...\n')

  console.log('🏫 School')
  await db.collection('schools').doc(SCHOOL_ID).set(SCHOOL, { merge: true })
  console.log(`   ✓ ${SCHOOL.name}  (access code: ${SCHOOL.accessCode})`)

  console.log('\n👤 Users (auth + profile)')
  for (const u of USERS) {
    await upsertAuthUser(u)
    const { uid, ...rest } = u
    await db.collection('users').doc(uid).set(
      {
        ...rest,
        notifications: notificationPrefs,
        createdAt: Timestamp.now(),
        lastActiveAt: Timestamp.now(),
      },
      { merge: true },
    )
  }

  console.log('\n🎒 Students')
  for (const s of STUDENTS) {
    const { id, ...rest } = s
    await db.collection('students').doc(id).set(rest, { merge: true })
    console.log(`   ✓ ${s.firstName} ${s.lastName} (Grade ${s.grade})`)
  }

  console.log('\n📊 Student progress')
  const progressId = `${AISHA_PROGRESS.studentId}_${SCHOOL_YEAR}_T${AISHA_PROGRESS.term}`
  await db.collection('studentProgress').doc(progressId).set(AISHA_PROGRESS, { merge: true })
  console.log(`   ✓ ${progressId}`)

  console.log('\n📢 Announcements & calendar')
  for (const a of ANNOUNCEMENTS) {
    const { id, ...rest } = a
    await db.collection('announcements').doc(id).set(rest, { merge: true })
  }
  for (const e of CALENDAR_EVENTS) {
    const { id, ...rest } = e
    await db.collection('calendarEvents').doc(id).set(rest, { merge: true })
  }
  console.log(`   ✓ ${ANNOUNCEMENTS.length} announcements, ${CALENDAR_EVENTS.length} events`)

  console.log('\n✅ Done. Demo logins (password for all:  Demo1234):')
  console.log('   • Parent   maya@example.com')
  console.log('   • Teacher  teacher@example.com')
  console.log('   • Admin    admin@example.com')
  console.log('   • School access code (for new sign-ups):  MAPLE-2024\n')
}

seed()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error('\n❌ Seed failed:', err)
    process.exit(1)
  })
