// ─── User & Auth ─────────────────────────────────────────────────────────────

export type UserRole = 'parent' | 'teacher' | 'student' | 'admin' | 'organizer'

export interface NotificationPreferences {
  email: boolean
  push: boolean
  messageAlerts: boolean
  assignmentReminders: boolean
  announcementAlerts: boolean
}

export interface User {
  id: string
  email: string
  displayName: string
  role: UserRole
  schoolId: string
  linkedStudentIds?: string[]   // for parents
  classIds?: string[]           // for teachers
  language: string              // preferred locale code e.g. 'en', 'fr', 'ar'
  notifications: NotificationPreferences
  createdAt: Date
  lastActiveAt: Date
}

// ─── School ──────────────────────────────────────────────────────────────────

export interface School {
  id: string
  name: string
  board: string
  address: string
  accessCode: string            // e.g. "MAPLE-2024"
  principalId: string
  totalStudents: number
  grades: string[]              // e.g. ['JK', 'K', '1', '2', ... '8']
  schoolYear: string            // e.g. "2024-25"
}

// ─── Student ─────────────────────────────────────────────────────────────────

export interface Student {
  id: string
  firstName: string
  lastName: string
  grade: number                 // JK = 0, K = 0.5, 1-8
  teacherId: string
  schoolId: string
  parentIds: string[]
  studentNumber: string
  enrollmentDate: Date
}

// ─── Learning ────────────────────────────────────────────────────────────────

export type LetterGrade = 'A' | 'A-' | 'B+' | 'B' | 'B-' | 'C+' | 'C' | 'C-' | 'D' | 'R'

export interface LearningSkills {
  responsibility: 1 | 2 | 3 | 4   // 1=Needs Improvement … 4=Excellent
  organization: 1 | 2 | 3 | 4
  independentWork: 1 | 2 | 3 | 4
  collaboration: 1 | 2 | 3 | 4
  initiative: 1 | 2 | 3 | 4
  selfRegulation: 1 | 2 | 3 | 4
}

export interface LearningGoal {
  id: string
  description: string
  targetDate: Date
  met: boolean
  teacherComment?: string
}

export interface Intervention {
  id: string
  studentId: string
  teacherId: string
  type: 'academic' | 'attendance' | 'behavioural'
  description: string
  startDate: Date
  resolved: boolean
  resolvedDate?: Date
}

export interface SubjectRecord {
  grade: number                 // 0-100
  letterGrade: LetterGrade
  teacherComment: string
  learningSkills: LearningSkills
  topics: string[]              // e.g. ['Fractions', 'Measurement']
}

export interface AttendanceRecord {
  present: number
  absent: number
  late: number
  percentage: number
}

export interface StudentProgress {
  studentId: string
  schoolYear: string            // "2024-25"
  term: 1 | 2 | 3
  subjects: Record<string, SubjectRecord>
  attendance: AttendanceRecord
  readingLevel: number
  learningGoals: LearningGoal[]
  interventions: Intervention[]
  aiInsight?: string            // cached Claude-generated summary
  aiInsightGeneratedAt?: Date
}

// ─── Assignment ──────────────────────────────────────────────────────────────

export type AssignmentStatus = 'not-started' | 'in-progress' | 'submitted' | 'graded'

export interface Assignment {
  id: string
  title: string
  subject: string
  classId: string
  teacherId: string
  description: string
  dueDate: Date
  createdAt: Date
  totalPoints?: number
}

export interface AssignmentSubmission {
  assignmentId: string
  studentId: string
  status: AssignmentStatus
  submittedAt?: Date
  grade?: number
  teacherFeedback?: string
  attachmentUrls?: string[]
}

// ─── Messaging ───────────────────────────────────────────────────────────────

export interface Attachment {
  name: string
  url: string
  type: string
  size: number
}

export interface MessageThread {
  id: string
  participantIds: string[]      // [parentId, teacherId] or [userId, userId]
  studentId?: string            // the student this thread is about
  lastMessage?: string
  lastMessageAt?: Date
  unreadCounts: Record<string, number>  // userId → unread count
  createdAt: Date
}

export interface Message {
  id: string
  threadId: string
  senderId: string
  senderRole: UserRole
  content: string
  timestamp: Date
  read: boolean
  attachments?: Attachment[]
}

// ─── Workshop ────────────────────────────────────────────────────────────────

export type BookingStatus = 'pending' | 'confirmed' | 'cancelled' | 'completed'
export type PaymentStatus = 'pending' | 'paid' | 'refunded'

export interface Workshop {
  id: string
  title: string
  category: string
  description: string
  learningOutcomes: string[]
  price: number                 // in cents (e.g. 25000 = $250.00 CAD)
  duration: number              // in minutes
  capacity: number
  targetAudience: string
  deliveryFormat: string
  rating: number
  reviewCount: number
  availableDates: Date[]
  isActive: boolean
}

export interface WorkshopBooking {
  id: string
  workshopId: string
  schoolId: string
  schoolName: string
  contactName: string
  contactEmail: string
  preferredDate: Date
  confirmedDate?: Date
  status: BookingStatus
  attendeeCount?: number
  paymentStatus: PaymentStatus
  stripePaymentIntentId?: string
  amount: number                // in cents
  invoiceUrl?: string
  createdAt: Date
}

// ─── Calendar & Announcements ────────────────────────────────────────────────

export type EventType = 'school' | 'trip' | 'important' | 'assignment'

export interface CalendarEvent {
  id: string
  schoolId: string
  title: string
  description?: string
  date: Date
  endDate?: Date
  type: EventType
  classId?: string              // undefined = school-wide
  createdBy: string
}

export interface Announcement {
  id: string
  schoolId: string
  title: string
  body: string
  type: EventType
  postedBy: string
  postedAt: Date
  expiresAt?: Date
  classId?: string
}

// ─── Curriculum ──────────────────────────────────────────────────────────────

export type Subject =
  | 'mathematics'
  | 'language-arts'
  | 'science'
  | 'social-studies'
  | 'arts'
  | 'health-pe'

export interface CurriculumEntry {
  grade: number                 // 0 = JK/K, 1-8
  subject: Subject
  keyTopics: string[]
  helpAtHomeTips: string[]
  description: string           // parent-friendly paragraph
}

// ─── Notifications ───────────────────────────────────────────────────────────

export type NotificationType =
  | 'message'
  | 'assignment'
  | 'grade'
  | 'attendance'
  | 'announcement'
  | 'workshop'
  | 'intervention'

export interface AppNotification {
  id: string
  userId: string
  type: NotificationType
  title: string
  body: string
  read: boolean
  link?: string
  createdAt: Date
}
