'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  CheckCircle, AlertCircle, MessageSquare, Calendar,
  BookOpen, TrendingUp, ChevronRight, Bell
} from 'lucide-react'
import { cn } from '@/lib/utils'

// ─── Demo data (replace with Firestore queries) ──────────────────────────────

const DEMO_CHILDREN = [
  { id: '1', name: 'Aisha Thompson', grade: 4, teacher: 'Ms. S. Johnson', school: 'Maple Ridge PS' },
  { id: '2', name: 'Marcus Thompson', grade: 2, teacher: 'Mr. R. Evans',  school: 'Maple Ridge PS' },
]

const DEMO_STATUS = [
  {
    id: 'progress',
    icon: CheckCircle,
    colour: 'green',
    label: 'On track this term',
    sub: 'Overall average: 84% · Attendance: 96%',
    href: '/student-progress',
    cta: 'View full progress',
  },
  {
    id: 'messages',
    icon: MessageSquare,
    colour: 'blue',
    label: '3 unread messages',
    sub: 'Ms. Johnson sent a note about Friday\'s math quiz',
    href: '/messaging',
    cta: 'Open messages',
    badge: 3,
  },
  {
    id: 'upcoming',
    icon: Calendar,
    colour: 'warm',
    label: '2 things coming up',
    sub: 'Assignment due Friday · Parent-Teacher interviews Nov 28',
    href: '/calendar',
    cta: 'See calendar',
  },
]

const DEMO_SUBJECTS = [
  { name: 'Mathematics',    pct: 78, letter: 'B',  colour: '#2C6E49', note: 'Working on fractions — great effort this week' },
  { name: 'Language Arts',  pct: 85, letter: 'A−', colour: '#2563EB', note: 'Strong reader, keep up the nightly reading' },
  { name: 'Science',        pct: 91, letter: 'A',  colour: '#7C3AED', note: 'Excellent work on the Habitats project' },
  { name: 'Social Studies', pct: 80, letter: 'B+', colour: '#E76F51', note: 'Good participation in class discussions' },
  { name: 'Arts',           pct: 88, letter: 'A−', colour: '#B45309', note: 'Creative and enthusiastic — a pleasure to teach' },
  { name: 'Health & PE',    pct: 92, letter: 'A',  colour: '#0891B2', note: 'Excellent attitude and leadership on the field' },
]

const DEMO_FEEDBACK = [
  {
    teacher: 'Ms. S. Johnson',
    subject: 'Mathematics',
    date: 'Nov 12',
    comment: 'Aisha is making solid progress on fractions. She sometimes rushes through word problems — encourage her to re-read the question before answering. She\'s on track for a strong Term 2.',
  },
  {
    teacher: 'Ms. S. Nakamura',
    subject: 'Science',
    date: 'Nov 8',
    comment: 'Outstanding work on the Habitats poster project. Aisha showed real curiosity and went beyond the requirements. Definitely a science strength to nurture.',
  },
]

const DEMO_ANNOUNCEMENTS = [
  {
    id: '1',
    title: '📅 Parent-Teacher Interviews — Nov 28',
    body: 'Book your 15-minute slot through the office or by messaging your child\'s teacher directly.',
    colour: 'border-accent',
  },
  {
    id: '2',
    title: '❄️ Winter Concert — Dec 12',
    body: 'Grades 3–6 perform at 6:30pm in the gymnasium. All families welcome.',
    colour: 'border-blue',
  },
]

// ─── Colour maps ─────────────────────────────────────────────────────────────

const STATUS_COLOURS = {
  green:  { bg: 'bg-[#D1FAE5]', icon: 'text-[#065F46]', border: 'border-[#6EE7B7]' },
  blue:   { bg: 'bg-[#DBEAFE]', icon: 'text-[#1E40AF]', border: 'border-[#93C5FD]' },
  warm:   { bg: 'bg-[#FFDDD2]', icon: 'text-[#9A3412]', border: 'border-[#FCA5A5]' },
}

function gradeColour(pct: number) {
  if (pct >= 80) return { bg: 'bg-[#D1FAE5]', text: 'text-[#065F46]' }
  if (pct >= 70) return { bg: 'bg-[#DBEAFE]', text: 'text-[#1E40AF]' }
  if (pct >= 60) return { bg: 'bg-[#FEF3C7]', text: 'text-[#92400E]' }
  return { bg: 'bg-[#FEE2E2]', text: 'text-[#991B1B]' }
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function ParentDashboardPage() {
  const [activeChild, setActiveChild] = useState(DEMO_CHILDREN[0])

  return (
    <div id="main-content" className="pt-nav min-h-screen bg-bg">
      <div className="max-w-[1100px] mx-auto px-5 py-8">

        {/* ── Header ── */}
        <div className="flex flex-wrap items-start justify-between gap-4 mb-8">
          <div>
            <p className="text-sm text-text3 mb-1">Welcome back, Maya 👋</p>
            <h1 className="font-serif text-3xl text-text">Your Family Dashboard</h1>
          </div>
          <Link
            href="/messaging"
            className="flex items-center gap-2 px-4 py-2 bg-accent text-white rounded-sm text-sm font-semibold hover:bg-[#235A3B] transition-colors no-underline"
          >
            <MessageSquare size={15} aria-hidden="true" />
            Message a Teacher
          </Link>
        </div>

        {/* ── Child selector ── */}
        <div className="flex flex-wrap gap-2 mb-8" role="tablist" aria-label="Select child">
          {DEMO_CHILDREN.map(child => (
            <button
              key={child.id}
              onClick={() => setActiveChild(child)}
              role="tab"
              aria-selected={activeChild.id === child.id}
              className={cn(
                'flex items-center gap-2.5 px-4 py-2.5 rounded-lg border text-sm font-semibold transition-all',
                activeChild.id === child.id
                  ? 'bg-accent text-white border-accent shadow-sm'
                  : 'bg-surface text-text2 border-border hover:border-accent hover:text-accent',
              )}
            >
              <span className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center text-xs font-bold">
                {child.name[0]}
              </span>
              <span>{child.name.split(' ')[0]}</span>
              <span className="opacity-70 font-normal">Grade {child.grade}</span>
            </button>
          ))}
        </div>

        {/* ── Status cards ── */}
        <section aria-label="Child status overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {DEMO_STATUS.map(item => {
            const colours = STATUS_COLOURS[item.colour as keyof typeof STATUS_COLOURS]
            const Icon = item.icon
            return (
              <Link
                key={item.id}
                href={item.href}
                className={cn(
                  'group bg-surface border rounded-lg p-5 no-underline flex flex-col gap-3 transition-all hover:shadow hover:-translate-y-0.5',
                  colours.border,
                )}
              >
                <div className="flex items-start justify-between">
                  <div className={cn('w-10 h-10 rounded-sm flex items-center justify-center', colours.bg)}>
                    <Icon size={20} className={colours.icon} aria-hidden="true" />
                  </div>
                  {item.badge && (
                    <span className="bg-warm text-white text-xs font-bold px-2 py-0.5 rounded-full">
                      {item.badge}
                    </span>
                  )}
                </div>
                <div>
                  <p className="font-semibold text-text text-[15px] mb-0.5">{item.label}</p>
                  <p className="text-sm text-text2 leading-relaxed">{item.sub}</p>
                </div>
                <p className={cn('text-sm font-semibold flex items-center gap-1 mt-auto', colours.icon)}>
                  {item.cta}
                  <ChevronRight size={14} aria-hidden="true" className="group-hover:translate-x-0.5 transition-transform" />
                </p>
              </Link>
            )
          })}
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-6">
          {/* ── Left column ── */}
          <div className="space-y-6">

            {/* Subject grades */}
            <section aria-labelledby="grades-heading">
              <div className="flex items-center justify-between mb-4">
                <h2 id="grades-heading" className="font-serif text-xl text-text">
                  {activeChild.name.split(' ')[0]}&apos;s Grades — Term 2
                </h2>
                <Link href="/student-progress" className="text-sm text-accent font-semibold hover:underline">
                  Full report →
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {DEMO_SUBJECTS.map(subject => {
                  const gc = gradeColour(subject.pct)
                  return (
                    <div key={subject.name} className="bg-surface border border-border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
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
                        className="w-full bg-surface2 rounded-full h-1.5 mb-2.5"
                        role="progressbar"
                        aria-valuenow={subject.pct}
                        aria-valuemin={0}
                        aria-valuemax={100}
                        aria-label={`${subject.name}: ${subject.pct}%`}
                      >
                        <div
                          className="h-1.5 rounded-full transition-all"
                          style={{ width: `${subject.pct}%`, backgroundColor: subject.colour }}
                        />
                      </div>
                      <p className="text-xs text-text2 leading-relaxed italic">&ldquo;{subject.note}&rdquo;</p>
                    </div>
                  )
                })}
              </div>
            </section>

            {/* Teacher feedback */}
            <section aria-labelledby="feedback-heading">
              <h2 id="feedback-heading" className="font-serif text-xl text-text mb-4">
                Recent Teacher Feedback
              </h2>
              <div className="space-y-3">
                {DEMO_FEEDBACK.map((fb, i) => (
                  <div key={i} className="bg-surface border border-border rounded-lg p-5">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <p className="font-semibold text-[14px] text-text">{fb.teacher}</p>
                        <p className="text-xs text-text3">{fb.subject} · {fb.date}</p>
                      </div>
                      <BookOpen size={16} className="text-text3" aria-hidden="true" />
                    </div>
                    <p className="text-sm text-text2 leading-[1.7]">{fb.comment}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* ── Right column ── */}
          <div className="space-y-5">

            {/* Quick stats */}
            <section aria-labelledby="stats-heading" className="bg-surface border border-border rounded-lg p-5">
              <h2 id="stats-heading" className="font-semibold text-[14px] text-text mb-4 flex items-center gap-2">
                <TrendingUp size={15} aria-hidden="true" className="text-accent" />
                {activeChild.name.split(' ')[0]}&apos;s Snapshot
              </h2>
              <dl className="space-y-3">
                {[
                  { label: 'Attendance',     value: '96%',       note: '2 absences this year' },
                  { label: 'Reading Level',  value: 'Level 26',  note: 'Late Grade 4 — ahead of average' },
                  { label: 'Learning Goals', value: '4 of 5 met', note: 'On track for Term 2' },
                  { label: 'Teacher',        value: 'Ms. S. Johnson', note: 'Grade 4 · Maple Ridge PS' },
                ].map(stat => (
                  <div key={stat.label} className="flex items-start justify-between gap-2">
                    <dt className="text-sm text-text3 flex-shrink-0">{stat.label}</dt>
                    <dd className="text-right">
                      <span className="text-sm font-semibold text-text block">{stat.value}</span>
                      <span className="text-xs text-text3">{stat.note}</span>
                    </dd>
                  </div>
                ))}
              </dl>
            </section>

            {/* Announcements */}
            <section aria-labelledby="announcements-heading">
              <div className="flex items-center justify-between mb-3">
                <h2 id="announcements-heading" className="font-semibold text-[14px] text-text flex items-center gap-2">
                  <Bell size={15} aria-hidden="true" className="text-accent" />
                  School Announcements
                </h2>
                <Link href="/calendar" className="text-xs text-accent font-semibold hover:underline">
                  See all →
                </Link>
              </div>
              <div className="space-y-3">
                {DEMO_ANNOUNCEMENTS.map(ann => (
                  <div
                    key={ann.id}
                    className={cn('bg-surface border border-border rounded-lg p-4 border-l-[3px]', ann.colour)}
                  >
                    <p className="font-semibold text-[13px] text-text mb-1">{ann.title}</p>
                    <p className="text-xs text-text2 leading-relaxed">{ann.body}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Quick links */}
            <section aria-label="Quick links" className="bg-surface border border-border rounded-lg overflow-hidden">
              {[
                { label: 'View Ontario Curriculum',     href: '/curriculum', icon: BookOpen },
                { label: 'Browse Parent Workshops',     href: '/workshops',  icon: Calendar },
                { label: 'New to Ontario Schools?',     href: '/help',       icon: CheckCircle },
              ].map(link => {
                const Icon = link.icon
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="flex items-center gap-3 px-5 py-3.5 border-b border-border last:border-b-0 no-underline text-text2 hover:bg-surface2 hover:text-text transition-colors group"
                  >
                    <Icon size={15} className="text-accent flex-shrink-0" aria-hidden="true" />
                    <span className="text-sm font-medium">{link.label}</span>
                    <ChevronRight size={13} className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true" />
                  </Link>
                )
              })}
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
