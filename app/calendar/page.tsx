'use client'

import { ChevronLeft, ChevronRight, BookOpen, CalendarDays, AlertCircle, Users } from 'lucide-react'
import { cn } from '@/lib/utils'

// ─── Types & Data ─────────────────────────────────────────────────────────────

type EventType = 'academic' | 'school' | 'deadline' | 'holiday' | 'interview'

interface CalEvent {
  day: number
  label: string
  type: EventType
  child?: string
}

const EVENTS: CalEvent[] = [
  { day: 8,  label: 'Book Fair ends',              type: 'school' },
  { day: 11, label: 'Remembrance Day (No School)', type: 'holiday' },
  { day: 14, label: 'Math quiz',                   type: 'academic', child: 'Aisha' },
  { day: 15, label: 'Assignment due',              type: 'deadline', child: 'Aisha' },
  { day: 22, label: 'School Council Meeting',      type: 'school' },
  { day: 28, label: 'Parent-Teacher Interviews',   type: 'interview' },
  { day: 29, label: 'PA Day — No School',          type: 'deadline' },
]

const TODAY = 14

// Nov 2024: starts on Friday (index 5 in Sun-Mon-Tue-Wed-Thu-Fri-Sat)
const FIRST_DAY_OF_WEEK = 5
const DAYS_IN_MONTH = 30

const DAY_HEADERS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

// ─── Style helpers ────────────────────────────────────────────────────────────

const dotColor: Record<EventType, string> = {
  academic:  'bg-accent2',
  school:    'bg-blue',
  deadline:  'bg-warm',
  holiday:   'bg-text3',
  interview: 'bg-accent',
}

const badgeBg: Record<EventType, string> = {
  academic:  'bg-accent3/30 text-accent',
  school:    'bg-blue2 text-blue',
  deadline:  'bg-warm3 text-warm',
  holiday:   'bg-surface2 text-text2',
  interview: 'bg-accent3/20 text-accent',
}

const categoryLabel: Record<EventType, string> = {
  academic:  'Academic',
  school:    'School Event',
  deadline:  'PA Day / Deadline',
  holiday:   'No School',
  interview: 'Interview',
}

const categoryIcon: Record<EventType, React.ReactNode> = {
  academic:  <BookOpen size={13} />,
  school:    <Users size={13} />,
  deadline:  <AlertCircle size={13} />,
  holiday:   <CalendarDays size={13} />,
  interview: <CalendarDays size={13} />,
}

// Build a map of day → events for quick lookup
const eventsByDay = EVENTS.reduce<Record<number, CalEvent[]>>((acc, e) => {
  if (!acc[e.day]) acc[e.day] = []
  acc[e.day].push(e)
  return acc
}, {})

// Format day number as "Nov 8", "Nov 14", etc.
function formatDate(day: number) {
  return `Nov ${day}`
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function CalendarPage() {
  // Build calendar grid: leading empty cells + days 1–30
  const cells: (number | null)[] = [
    ...Array(FIRST_DAY_OF_WEEK).fill(null),
    ...Array.from({ length: DAYS_IN_MONTH }, (_, i) => i + 1),
  ]
  // Pad to complete the last row
  while (cells.length % 7 !== 0) cells.push(null)

  return (
    <div id="main-content" className="pt-nav min-h-screen bg-bg">
      <div className="max-w-3xl mx-auto px-4 py-8 space-y-8">

        {/* ── Page header ── */}
        <div>
          <h1 className="font-serif text-2xl text-text">School Calendar</h1>
          <p className="mt-1 text-base text-text2">
            Events, PA days, and assignment due dates for Maple Ridge PS
          </p>
        </div>

        {/* ── Calendar card ── */}
        <div className="bg-surface border border-border rounded-lg shadow overflow-hidden">

          {/* Month header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-border">
            <button
              aria-label="Previous month"
              className="p-1.5 rounded-sm text-text2 hover:bg-surface2 transition-colors"
            >
              <ChevronLeft size={18} />
            </button>
            <h2 className="font-serif text-lg text-text tracking-wide">November 2024</h2>
            <button
              aria-label="Next month"
              className="p-1.5 rounded-sm text-text2 hover:bg-surface2 transition-colors"
            >
              <ChevronRight size={18} />
            </button>
          </div>

          {/* Day-of-week headers */}
          <div className="grid grid-cols-7 border-b border-border">
            {DAY_HEADERS.map(d => (
              <div
                key={d}
                className="py-2 text-center text-xs font-sans font-medium uppercase tracking-wider text-text3"
              >
                {d}
              </div>
            ))}
          </div>

          {/* Calendar grid */}
          <div className="grid grid-cols-7">
            {cells.map((day, idx) => {
              const isToday = day === TODAY
              const dayEvents = day ? (eventsByDay[day] ?? []) : []
              const isLastRow = idx >= cells.length - 7
              const isLastCol = idx % 7 === 6

              return (
                <div
                  key={idx}
                  className={cn(
                    'min-h-[72px] p-1.5 relative',
                    !isLastRow && 'border-b border-border',
                    !isLastCol && 'border-r border-border',
                    !day && 'bg-surface2/50',
                  )}
                >
                  {day && (
                    <>
                      {/* Day number */}
                      <div className="flex items-start justify-end mb-1">
                        <span
                          className={cn(
                            'text-sm font-sans w-7 h-7 flex items-center justify-center rounded-full',
                            isToday
                              ? 'bg-accent text-white font-semibold'
                              : 'text-text2',
                          )}
                        >
                          {day}
                        </span>
                      </div>

                      {/* Event dots + labels */}
                      <div className="space-y-0.5">
                        {dayEvents.map((ev, i) => (
                          <div key={i} className="flex items-center gap-1 min-w-0">
                            <span
                              className={cn(
                                'flex-shrink-0 w-1.5 h-1.5 rounded-full',
                                dotColor[ev.type],
                              )}
                            />
                            <span className="text-xs text-text2 truncate leading-tight">
                              {ev.label}
                            </span>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              )
            })}
          </div>

          {/* Legend */}
          <div className="px-5 py-3 border-t border-border bg-surface2/40 flex flex-wrap gap-x-5 gap-y-1">
            {(Object.keys(dotColor) as EventType[]).map(type => (
              <div key={type} className="flex items-center gap-1.5">
                <span className={cn('w-2 h-2 rounded-full flex-shrink-0', dotColor[type])} />
                <span className="text-xs text-text3 font-sans">{categoryLabel[type]}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Upcoming events list ── */}
        <div>
          <h2 className="font-serif text-xl text-text mb-4">Upcoming Events</h2>
          <div className="space-y-3">
            {EVENTS.map((ev, i) => (
              <div
                key={i}
                className="bg-surface border border-border rounded-lg shadow flex gap-4 p-4 items-start"
              >
                {/* Date badge */}
                <div
                  className={cn(
                    'flex-shrink-0 rounded-sm px-3 py-2 text-center min-w-[56px]',
                    badgeBg[ev.type],
                  )}
                >
                  <p className="text-xs font-sans font-semibold uppercase tracking-wider">Nov</p>
                  <p className="font-serif text-xl leading-none mt-0.5">{ev.day}</p>
                </div>

                {/* Event details */}
                <div className="flex-1 min-w-0">
                  <p className="text-base font-sans font-medium text-text leading-snug">
                    {ev.label}
                  </p>
                  {ev.child && (
                    <p className="text-sm text-text2 mt-0.5">
                      {ev.child} · Grade 4
                    </p>
                  )}
                  {/* Category tag */}
                  <span
                    className={cn(
                      'mt-2 inline-flex items-center gap-1 text-xs font-sans font-medium px-2 py-0.5 rounded-full',
                      badgeBg[ev.type],
                    )}
                  >
                    {categoryIcon[ev.type]}
                    {categoryLabel[ev.type]}
                  </span>
                </div>

                {/* Today marker */}
                {ev.day === TODAY && (
                  <span className="flex-shrink-0 self-center text-xs font-sans font-semibold text-accent bg-accent3/30 px-2 py-0.5 rounded-full">
                    Today
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}
