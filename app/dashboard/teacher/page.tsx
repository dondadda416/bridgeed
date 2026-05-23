'use client'

import Link from 'next/link'
import {
  Users,
  MessageSquare,
  Calendar,
  UserCheck,
  ChevronRight,
  Send,
  ClipboardList,
  Bell,
} from 'lucide-react'
import { cn } from '@/lib/utils'

// ─── Types ────────────────────────────────────────────────────────────────────

type StatusKey = 'Excellent' | 'On Track' | 'Needs Check-in' | 'At Risk'

interface Student {
  name: string
  grade: number
  attendance: number
  status: StatusKey
}

interface ParentMessage {
  parent: string
  preview: string
  time: string
}

interface UpcomingItem {
  title: string
  date: string
  detail: string
  icon: React.ReactNode
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const students: Student[] = [
  { name: 'Aisha Thompson',   grade: 84, attendance: 96, status: 'On Track' },
  { name: 'Marcus Reid',      grade: 71, attendance: 88, status: 'Needs Check-in' },
  { name: 'Priya Sharma',     grade: 92, attendance: 99, status: 'Excellent' },
  { name: "Liam O'Brien",     grade: 65, attendance: 79, status: 'At Risk' },
  { name: 'Sofia Petrov',     grade: 88, attendance: 95, status: 'On Track' },
  { name: 'James Okafor',     grade: 78, attendance: 91, status: 'On Track' },
  { name: 'Mei Lin',          grade: 95, attendance: 98, status: 'Excellent' },
  { name: 'Fatima Al-Hassan', grade: 69, attendance: 85, status: 'Needs Check-in' },
]

const messages: ParentMessage[] = [
  { parent: 'Maya Thompson', preview: "Question about Friday's quiz...", time: '2h ago' },
  { parent: 'David Reid',    preview: 'Marcus has a dentist appt Thu...', time: 'Yesterday' },
  { parent: 'Li Wei',        preview: 'Thank you for the feedback on Mei...', time: 'Nov 12' },
]

// ─── Sub-components ───────────────────────────────────────────────────────────

const statusConfig: Record<StatusKey, { label: string; className: string }> = {
  Excellent:       { label: 'Excellent',       className: 'bg-green-100 text-green-800' },
  'On Track':      { label: 'On Track',        className: 'bg-blue-100 text-blue-800' },
  'Needs Check-in':{ label: 'Needs Check-in',  className: 'bg-amber-100 text-amber-800' },
  'At Risk':       { label: 'At Risk',         className: 'bg-red-100 text-red-800' },
}

function StatusBadge({ status }: { status: StatusKey }) {
  const cfg = statusConfig[status]
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
        cfg.className,
      )}
    >
      {cfg.label}
    </span>
  )
}

function StatCard({
  icon,
  value,
  label,
  sub,
  iconClass,
}: {
  icon: React.ReactNode
  value: string | number
  label: string
  sub: string
  iconClass?: string
}) {
  return (
    <div className="rounded-lg border border-[#E2DDD4] bg-[#FFFFFF] p-4">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-2xl font-bold text-[#1A1814]">{value}</p>
          <p className="mt-0.5 text-sm font-medium text-[#1A1814]">{label}</p>
          <p className="mt-0.5 text-xs text-[#6B6358]">{sub}</p>
        </div>
        <span className={cn('rounded-lg p-2', iconClass ?? 'bg-[#F0EDE6] text-[#2C6E49]')}>
          {icon}
        </span>
      </div>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function TeacherDashboardPage() {
  return (
    <div id="main-content" className="pt-nav min-h-screen bg-[#F7F5F0]">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

        {/* ── Header ──────────────────────────────────────────────────────── */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm text-[#6B6358]">Good morning, Ms. Johnson 👋</p>
            <h1 className="font-serif text-2xl font-bold text-[#1A1814] sm:text-3xl">
              Grade 4 — Maple Ridge PS
            </h1>
          </div>
          <Link
            href="/messaging"
            className="inline-flex items-center gap-2 rounded-lg bg-[#2C6E49] px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-[#52B788] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2C6E49]"
          >
            <MessageSquare size={16} />
            Message Parents
          </Link>
        </div>

        {/* ── Stat cards ──────────────────────────────────────────────────── */}
        <div className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
          <StatCard
            icon={<Users size={18} />}
            value={24}
            label="Students"
            sub="All enrolled"
            iconClass="bg-[#F0EDE6] text-[#2C6E49]"
          />
          <StatCard
            icon={<UserCheck size={18} />}
            value="18 of 24"
            label="Parents Active"
            sub="75% platform adoption"
            iconClass="bg-blue-50 text-blue-600"
          />
          <StatCard
            icon={<Bell size={18} />}
            value={6}
            label="Unread Messages"
            sub="From parents this week"
            iconClass="bg-amber-50 text-amber-600"
          />
          <StatCard
            icon={<Calendar size={18} />}
            value={3}
            label="Upcoming Events"
            sub="This week"
            iconClass="bg-purple-50 text-purple-700"
          />
        </div>

        {/* ── Two-column layout ────────────────────────────────────────────── */}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start">

          {/* ── Main: student table ─────────────────────────────────────── */}
          <div className="flex-1 min-w-0">
            <div className="rounded-lg border border-[#E2DDD4] bg-[#FFFFFF]">
              <div className="flex items-center justify-between border-b border-[#E2DDD4] px-5 py-4">
                <div className="flex items-center gap-2">
                  <ClipboardList size={18} className="text-[#2C6E49]" />
                  <h2 className="font-serif text-lg font-semibold text-[#1A1814]">
                    Class Overview
                  </h2>
                </div>
                <span className="text-xs text-[#6B6358]">8 of 24 shown</span>
              </div>

              {/* Table — visible md+ */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-[#E2DDD4] bg-[#F7F5F0] text-left text-xs uppercase tracking-wide text-[#6B6358]">
                      <th className="px-5 py-3 font-medium">Student</th>
                      <th className="px-4 py-3 font-medium text-center">Grade</th>
                      <th className="px-4 py-3 font-medium text-center">Attendance</th>
                      <th className="px-4 py-3 font-medium">Status</th>
                      <th className="px-4 py-3 font-medium"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E2DDD4]">
                    {students.map((s) => (
                      <tr
                        key={s.name}
                        className="transition hover:bg-[#F7F5F0]"
                      >
                        <td className="px-5 py-3 font-medium text-[#1A1814]">{s.name}</td>
                        <td className="px-4 py-3 text-center text-[#5C5649]">
                          <span
                            className={cn(
                              'font-semibold',
                              s.grade >= 80 ? 'text-[#2C6E49]' : s.grade >= 70 ? 'text-[#5C5649]' : 'text-[#E76F51]',
                            )}
                          >
                            {s.grade}%
                          </span>
                        </td>
                        <td className="px-4 py-3 text-center text-[#5C5649]">
                          <span
                            className={cn(
                              s.attendance >= 90 ? 'text-[#2C6E49]' : s.attendance >= 85 ? 'text-[#5C5649]' : 'text-[#E76F51]',
                            )}
                          >
                            {s.attendance}%
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <StatusBadge status={s.status} />
                        </td>
                        <td className="px-4 py-3 text-right">
                          <Link
                            href="/messaging"
                            className="inline-flex items-center gap-1 rounded-md border border-[#E2DDD4] px-2.5 py-1 text-xs font-medium text-[#5C5649] transition hover:border-[#2C6E49] hover:text-[#2C6E49]"
                          >
                            <Send size={12} />
                            Send Note
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Card list — mobile */}
              <div className="divide-y divide-[#E2DDD4] md:hidden">
                {students.map((s) => (
                  <div key={s.name} className="flex items-center justify-between px-5 py-4">
                    <div className="min-w-0">
                      <p className="truncate font-medium text-[#1A1814]">{s.name}</p>
                      <div className="mt-1 flex items-center gap-3 text-xs text-[#6B6358]">
                        <span>
                          Grade:{' '}
                          <span
                            className={cn(
                              'font-semibold',
                              s.grade >= 80 ? 'text-[#2C6E49]' : s.grade >= 70 ? 'text-[#5C5649]' : 'text-[#E76F51]',
                            )}
                          >
                            {s.grade}%
                          </span>
                        </span>
                        <span>
                          Att:{' '}
                          <span
                            className={cn(
                              'font-semibold',
                              s.attendance >= 90 ? 'text-[#2C6E49]' : 'text-[#E76F51]',
                            )}
                          >
                            {s.attendance}%
                          </span>
                        </span>
                      </div>
                      <div className="mt-2">
                        <StatusBadge status={s.status} />
                      </div>
                    </div>
                    <Link
                      href="/messaging"
                      className="ml-4 flex-shrink-0 rounded-md border border-[#E2DDD4] p-2 text-[#5C5649] transition hover:border-[#2C6E49] hover:text-[#2C6E49]"
                      aria-label={`Send note to ${s.name}'s parent`}
                    >
                      <Send size={14} />
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Sidebar ─────────────────────────────────────────────────── */}
          <div className="flex flex-col gap-6 lg:w-80 lg:flex-shrink-0">

            {/* Recent messages */}
            <div className="rounded-lg border border-[#E2DDD4] bg-[#FFFFFF]">
              <div className="flex items-center gap-2 border-b border-[#E2DDD4] px-5 py-4">
                <MessageSquare size={18} className="text-[#2C6E49]" />
                <h2 className="font-serif text-lg font-semibold text-[#1A1814]">
                  Recent Messages
                </h2>
              </div>
              <div className="divide-y divide-[#E2DDD4]">
                {messages.map((m) => (
                  <div key={m.parent} className="px-5 py-4">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-sm font-semibold text-[#1A1814]">{m.parent}</p>
                      <span className="flex-shrink-0 text-xs text-[#6B6358]">{m.time}</span>
                    </div>
                    <p className="mt-0.5 text-sm text-[#5C5649]">{m.preview}</p>
                  </div>
                ))}
              </div>
              <div className="border-t border-[#E2DDD4] px-5 py-3">
                <Link
                  href="/messaging"
                  className="flex items-center gap-1 text-sm font-medium text-[#2C6E49] hover:text-[#52B788]"
                >
                  View all messages
                  <ChevronRight size={14} />
                </Link>
              </div>
            </div>

            {/* Upcoming events */}
            <div className="rounded-lg border border-[#E2DDD4] bg-[#FFFFFF]">
              <div className="flex items-center gap-2 border-b border-[#E2DDD4] px-5 py-4">
                <Calendar size={18} className="text-[#2C6E49]" />
                <h2 className="font-serif text-lg font-semibold text-[#1A1814]">Upcoming</h2>
              </div>
              <div className="divide-y divide-[#E2DDD4]">
                {/* Parent-Teacher Interviews */}
                <div className="px-5 py-4">
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-sm font-semibold text-[#1A1814]">
                      Parent-Teacher Interviews
                    </p>
                    <span className="flex-shrink-0 rounded bg-[#F0EDE6] px-2 py-0.5 text-xs font-medium text-[#5C5649]">
                      Nov 28
                    </span>
                  </div>
                  <p className="mt-0.5 text-xs text-[#6B6358]">14 slots booked, 10 remaining</p>
                </div>
                {/* Math Assessment */}
                <div className="px-5 py-4">
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-sm font-semibold text-[#1A1814]">Math Assessment</p>
                    <span className="flex-shrink-0 rounded bg-[#F0EDE6] px-2 py-0.5 text-xs font-medium text-[#5C5649]">
                      Nov 22
                    </span>
                  </div>
                  <p className="mt-0.5 text-xs text-[#6B6358]">Grade 4</p>
                </div>
                {/* Report Cards */}
                <div className="px-5 py-4">
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-sm font-semibold text-[#1A1814]">Report Cards Due</p>
                    <span className="flex-shrink-0 rounded bg-[#F0EDE6] px-2 py-0.5 text-xs font-medium text-[#5C5649]">
                      Jan 15
                    </span>
                  </div>
                  <p className="mt-0.5 text-xs text-[#6B6358]">Term 1</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}
