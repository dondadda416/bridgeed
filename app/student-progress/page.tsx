'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  ArrowLeft, CheckCircle, Circle, BookOpen, MessageSquare,
  Calendar, TrendingUp, User, Clock,
} from 'lucide-react'
import { cn } from '@/lib/utils'

// ─── Demo data ────────────────────────────────────────────────────────────────

const DEMO_CHILDREN = [
  {
    id: '1',
    name: 'Aisha Thompson',
    grade: 4,
    teacher: 'Ms. S. Johnson',
    school: 'Maple Ridge PS',
    updated: 'Nov 13, 2024',
    term: 'Term 2 Progress Report',
    overall: 84,
    overallStatus: 'On track',
    attendance: 96,
    absences: 2,
    goalsTotal: 5,
    goalsMet: 4,
    goalsStatus: 'On track for Term 2',
  },
  {
    id: '2',
    name: 'Marcus Thompson',
    grade: 2,
    teacher: 'Mr. R. Evans',
    school: 'Maple Ridge PS',
    updated: 'Nov 13, 2024',
    term: 'Term 2 Progress Report',
    overall: 81,
    overallStatus: 'On track',
    attendance: 98,
    absences: 1,
    goalsTotal: 5,
    goalsMet: 3,
    goalsStatus: 'Making progress',
  },
]

const SUBJECTS_BY_CHILD: Record<string, { name: string; pct: number; letter: string; note: string }[]> = {
  '1': [
    { name: 'Mathematics',    pct: 78, letter: 'B',  note: 'Working on fractions — great effort this week' },
    { name: 'Language Arts',  pct: 85, letter: 'A−', note: 'Strong reader, keep up the nightly reading' },
    { name: 'Science',        pct: 91, letter: 'A',  note: 'Excellent work on the Habitats project' },
    { name: 'Social Studies', pct: 80, letter: 'B+', note: 'Good participation in class discussions' },
    { name: 'Arts',           pct: 88, letter: 'A−', note: 'Creative and enthusiastic — a pleasure to teach' },
    { name: 'Health & PE',    pct: 92, letter: 'A',  note: 'Excellent attitude and leadership on the field' },
    { name: 'Core French',    pct: 74, letter: 'B−', note: 'Making progress — encourage practice at home' },
  ],
  '2': [
    { name: 'Mathematics',    pct: 82, letter: 'A−', note: 'Solid number sense — enjoying math centres' },
    { name: 'Language Arts',  pct: 79, letter: 'B+', note: 'Reading at level — working on sight words' },
    { name: 'Science',        pct: 84, letter: 'A−', note: 'Very curious — asks great questions in class' },
    { name: 'Social Studies', pct: 77, letter: 'B+', note: 'Engaged in community unit, good effort' },
    { name: 'Arts',           pct: 90, letter: 'A',  note: 'Loves drawing — shows real creativity' },
    { name: 'Health & PE',    pct: 88, letter: 'A−', note: 'Active participant, great sportsmanship' },
    { name: 'Core French',    pct: 70, letter: 'B',  note: 'Building vocabulary — keep up at home' },
  ],
}

// Typed constant used as generic shape
const AISHA_SUBJECTS = SUBJECTS_BY_CHILD['1']

const GOALS_BY_CHILD: Record<string, Array<{ text: string; met: boolean }>> = {
  '1': [
    { text: 'Read independently for 20+ minutes daily', met: true },
    { text: 'Complete multiplication tables to 12×12',  met: true },
    { text: 'Submit all assignments on time',            met: true },
    { text: 'Participate actively in class discussions', met: true },
    { text: 'Improve written response length in Language Arts', met: false },
  ],
  '2': [
    { text: 'Read independently for 15+ minutes daily', met: true },
    { text: 'Practise sight word list each week',        met: true },
    { text: 'Submit all assignments on time',            met: true },
    { text: 'Build confidence speaking in French',       met: false },
    { text: 'Improve sentence length in writing',        met: false },
  ],
}

const FEEDBACK = [
  {
    teacher: 'Ms. S. Johnson',
    subject: 'Mathematics',
    date: 'Nov 12',
    comment:
      'Aisha is making solid progress on fractions. She sometimes rushes through word problems — encourage her to re-read the question before answering. She\'s on track for a strong Term 2.',
  },
  {
    teacher: 'Ms. S. Nakamura',
    subject: 'Science',
    date: 'Nov 8',
    comment:
      'Outstanding work on the Habitats poster project. Aisha showed real curiosity and went beyond the requirements. Definitely a science strength to nurture.',
  },
]

// ─── Helpers ─────────────────────────────────────────────────────────────────

function gradeColour(pct: number) {
  if (pct >= 80) return { bg: 'bg-[#D1FAE5]', text: 'text-[#065F46]', bar: '#2C6E49' }
  if (pct >= 70) return { bg: 'bg-[#DBEAFE]', text: 'text-[#1E40AF]', bar: '#2563EB' }
  if (pct >= 60) return { bg: 'bg-[#FEF3C7]', text: 'text-[#92400E]', bar: '#B45309' }
  return { bg: 'bg-[#FEE2E2]', text: 'text-[#991B1B]', bar: '#DC2626' }
}

// Build a 50-slot attendance dot array (10 weeks × 5 days).
// Spread 2 absences at fixed positions for visual variety.
function buildAttendanceDots(absences: number): boolean[] {
  const dots = Array(50).fill(true) as boolean[]
  // Place absences at natural-looking positions
  const absentSlots = absences === 2 ? [14, 31] : absences === 1 ? [22] : []
  absentSlots.forEach(i => { dots[i] = false })
  return dots
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function StudentProgressPage() {
  const [activeChildId, setActiveChildId] = useState('1')

  const child   = DEMO_CHILDREN.find(c => c.id === activeChildId) ?? DEMO_CHILDREN[0]
  const subjects = SUBJECTS_BY_CHILD[activeChildId] ?? AISHA_SUBJECTS
  const goals    = GOALS_BY_CHILD[activeChildId] ?? []
  const dots     = buildAttendanceDots(child.absences)

  const presentDays = 50 - child.absences

  return (
    <div id="main-content" className="pt-nav min-h-screen bg-bg">
      <div className="max-w-[960px] mx-auto px-5 py-8">

        {/* ── Back link ── */}
        <Link
          href="/dashboard/parent"
          className="inline-flex items-center gap-1.5 text-sm text-text2 hover:text-accent transition-colors mb-6 no-underline"
        >
          <ArrowLeft size={15} aria-hidden="true" />
          Dashboard
        </Link>

        {/* ── Child selector + heading ── */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-2 mb-5" role="tablist" aria-label="Select child">
            {DEMO_CHILDREN.map(c => (
              <button
                key={c.id}
                onClick={() => setActiveChildId(c.id)}
                role="tab"
                aria-selected={activeChildId === c.id}
                className={cn(
                  'flex items-center gap-2.5 px-4 py-2.5 rounded-lg border text-sm font-semibold transition-all',
                  activeChildId === c.id
                    ? 'bg-accent text-white border-accent shadow-sm'
                    : 'bg-surface text-text2 border-border hover:border-accent hover:text-accent',
                )}
              >
                <span className={cn(
                  'w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold',
                  activeChildId === c.id ? 'bg-white/20 text-white' : 'bg-surface2 text-text',
                )}>
                  {c.name[0]}
                </span>
                <span>{c.name.split(' ')[0]}</span>
                <span className="opacity-70 font-normal">Grade {c.grade}</span>
              </button>
            ))}
          </div>

          <h1 className="font-serif text-3xl text-text mb-1">{child.term}</h1>
          <p className="text-sm text-text3 flex flex-wrap items-center gap-x-2 gap-y-1">
            <span className="inline-flex items-center gap-1">
              <User size={13} aria-hidden="true" />
              {child.school}
            </span>
            <span aria-hidden="true">·</span>
            <span>{child.teacher}</span>
            <span aria-hidden="true">·</span>
            <span className="inline-flex items-center gap-1">
              <Clock size={13} aria-hidden="true" />
              Updated {child.updated}
            </span>
          </p>
        </div>

        {/* ── Summary strip ── */}
        <section aria-label="Progress summary" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">

          {/* Overall average */}
          <div className="bg-surface border border-[#6EE7B7] rounded-lg p-5">
            <p className="text-xs font-semibold uppercase tracking-wide text-text3 mb-2">Overall Average</p>
            <p className="font-serif text-4xl font-bold text-[#065F46] mb-1">{child.overall}%</p>
            <span className="inline-block text-xs font-semibold bg-[#D1FAE5] text-[#065F46] px-2 py-0.5 rounded-full">
              {child.overallStatus}
            </span>
          </div>

          {/* Attendance */}
          <div className="bg-surface border border-[#93C5FD] rounded-lg p-5">
            <p className="text-xs font-semibold uppercase tracking-wide text-text3 mb-2">Attendance</p>
            <p className="font-serif text-4xl font-bold text-[#1E40AF] mb-1">{child.attendance}%</p>
            <span className="inline-block text-xs font-semibold bg-[#DBEAFE] text-[#1E40AF] px-2 py-0.5 rounded-full">
              {child.absences} {child.absences === 1 ? 'absence' : 'absences'} this year
            </span>
          </div>

          {/* Learning goals */}
          <div className="bg-surface border border-[#C4B5FD] rounded-lg p-5">
            <p className="text-xs font-semibold uppercase tracking-wide text-text3 mb-2">Learning Goals</p>
            <p className="font-serif text-4xl font-bold text-[#5B21B6] mb-1">
              {child.goalsMet} <span className="text-xl font-normal text-text3">of {child.goalsTotal}</span>
            </p>
            <span className="inline-block text-xs font-semibold bg-[#EDE9FE] text-[#5B21B6] px-2 py-0.5 rounded-full">
              {child.goalsStatus}
            </span>
          </div>
        </section>

        {/* ── Subject breakdown ── */}
        <section aria-labelledby="subjects-heading" className="mb-8">
          <h2 id="subjects-heading" className="font-serif text-xl text-text mb-4">
            {child.name.split(' ')[0]}&apos;s Subjects — {child.term.replace(' Progress Report', '')}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {subjects.map(subject => {
              const gc = gradeColour(subject.pct)
              return (
                <div
                  key={subject.name}
                  className="bg-surface border border-border rounded-lg p-5"
                >
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-[15px] text-text">{subject.name}</h3>
                    <div className="flex items-center gap-2">
                      <span
                        className={cn('font-serif text-2xl font-bold', gc.text)}
                        aria-label={`${subject.pct} percent`}
                      >
                        {subject.pct}%
                      </span>
                      <span className={cn('text-xs font-bold px-2 py-0.5 rounded-full', gc.bg, gc.text)}>
                        {subject.letter}
                      </span>
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div
                    className="w-full bg-surface2 rounded-full h-1.5 mb-3"
                    role="progressbar"
                    aria-valuenow={subject.pct}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-label={`${subject.name}: ${subject.pct}%`}
                  >
                    <div
                      className="h-1.5 rounded-full transition-all"
                      style={{ width: `${subject.pct}%`, backgroundColor: gc.bar }}
                    />
                  </div>

                  <p className="text-xs text-text2 leading-relaxed italic">
                    &ldquo;{subject.note}&rdquo;
                  </p>
                </div>
              )
            })}
          </div>
        </section>

        {/* ── Attendance ── */}
        <section aria-labelledby="attendance-heading" className="bg-surface border border-border rounded-lg p-6 mb-6">
          <h2 id="attendance-heading" className="font-serif text-xl text-text mb-4 flex items-center gap-2">
            <TrendingUp size={18} className="text-accent" aria-hidden="true" />
            Attendance — This Year
          </h2>

          {/* Dot grid: 10 rows × 5 dots */}
          <div className="mb-4" aria-label={`Attendance calendar: ${presentDays} present, ${child.absences} absent`}>
            <div className="grid gap-1.5" style={{ gridTemplateColumns: 'repeat(5, 1fr)', maxWidth: 200 }}>
              {dots.map((present, i) => (
                <div
                  key={i}
                  title={present ? `Day ${i + 1}: Present` : `Day ${i + 1}: Absent`}
                  className={cn(
                    'w-5 h-5 rounded-full',
                    present ? 'bg-[#52B788]' : 'bg-[#E2DDD4]',
                  )}
                  aria-hidden="true"
                />
              ))}
            </div>
            <p className="sr-only">
              {presentDays} days present, {child.absences} days absent out of 50 school days shown.
            </p>
          </div>

          <dl className="flex flex-wrap gap-x-6 gap-y-1 text-sm mb-2">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#52B788]" aria-hidden="true" />
              <dt className="text-text3">Present:</dt>
              <dd className="font-semibold text-text">{presentDays} days</dd>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#E2DDD4]" aria-hidden="true" />
              <dt className="text-text3">Absent:</dt>
              <dd className="font-semibold text-text">{child.absences} days</dd>
            </div>
            <div className="flex items-center gap-2">
              <dt className="text-text3">Attendance rate:</dt>
              <dd className="font-semibold text-[#065F46]">{child.attendance}%</dd>
            </div>
          </dl>

          <p className="text-xs text-text3 italic">
            Ontario average attendance rate: 94% — {child.name.split(' ')[0]} is doing great.
          </p>
        </section>

        {/* ── Learning Goals ── */}
        <section aria-labelledby="goals-heading" className="bg-surface border border-border rounded-lg p-6 mb-6">
          <h2 id="goals-heading" className="font-serif text-xl text-text mb-4">
            Learning Goals — {child.term.replace(' Progress Report', '')}
          </h2>
          <ul className="space-y-3" role="list">
            {goals.map((goal, i) => (
              <li
                key={i}
                className={cn(
                  'flex items-start gap-3 rounded-lg px-4 py-3 border',
                  goal.met
                    ? 'bg-[#F0FDF4] border-[#BBF7D0]'
                    : 'bg-[#FFFBEB] border-[#FDE68A]',
                )}
              >
                {goal.met ? (
                  <CheckCircle
                    size={18}
                    className="text-[#15803D] flex-shrink-0 mt-0.5"
                    aria-label="Goal met"
                  />
                ) : (
                  <Circle
                    size={18}
                    className="text-[#B45309] flex-shrink-0 mt-0.5"
                    aria-label="In progress"
                  />
                )}
                <div>
                  <p className={cn(
                    'text-sm font-medium leading-relaxed',
                    goal.met ? 'text-[#14532D]' : 'text-[#78350F]',
                  )}>
                    {goal.text}
                  </p>
                  {!goal.met && (
                    <p className="text-xs text-[#92400E] mt-0.5 font-medium">In progress</p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* ── Teacher Notes ── */}
        <section aria-labelledby="notes-heading" className="mb-8">
          <h2 id="notes-heading" className="font-serif text-xl text-text mb-4">
            Recent Teacher Notes
          </h2>
          <div className="space-y-3">
            {FEEDBACK.map((fb, i) => (
              <div key={i} className="bg-surface border border-border rounded-lg p-5">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div>
                    <p className="font-semibold text-[14px] text-text">{fb.teacher}</p>
                    <p className="text-xs text-text3">{fb.subject} · {fb.date}</p>
                  </div>
                  <BookOpen size={16} className="text-text3 flex-shrink-0 mt-0.5" aria-hidden="true" />
                </div>
                <p className="text-sm text-text2 leading-[1.75]">{fb.comment}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Bottom CTA strip ── */}
        <div className="bg-surface border border-border rounded-lg p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="font-semibold text-text mb-0.5">Have questions about this report?</p>
            <p className="text-sm text-text2">
              Reach out to {child.teacher} directly — they&apos;re happy to help.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 flex-shrink-0">
            <Link
              href="/messaging"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-accent text-white rounded-sm text-sm font-semibold hover:bg-[#235A3B] transition-colors no-underline"
            >
              <MessageSquare size={14} aria-hidden="true" />
              Message {child.teacher}
            </Link>
            <Link
              href="/calendar"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-surface2 text-text border border-border rounded-sm text-sm font-semibold hover:border-accent hover:text-accent transition-colors no-underline"
            >
              <Calendar size={14} aria-hidden="true" />
              Book an Interview
            </Link>
          </div>
        </div>

      </div>
    </div>
  )
}
