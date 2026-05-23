'use client'

import { useState } from 'react'
import { Send, ChevronLeft, Circle } from 'lucide-react'
import { cn } from '@/lib/utils'

// ─── Demo data ────────────────────────────────────────────────────────────────

const DEMO_THREADS = [
  {
    id: '1',
    teacher: 'Ms. S. Johnson',
    subject: 'Grade 4 · Maple Ridge PS',
    avatar: 'J',
    lastMessage: 'Hi Maya — just wanted to flag that Aisha did really well on Friday\'s math quiz. She\'s come a long way with fractions!',
    lastDate: 'Today, 9:14 am',
    unread: 2,
    messages: [
      {
        id: 'm1',
        from: 'teacher',
        name: 'Ms. S. Johnson',
        body: 'Hi Maya, hope you\'re well! I wanted to share that Aisha has been making great progress this term. Her reading comprehension in particular has really jumped.',
        time: 'Nov 12, 10:02 am',
      },
      {
        id: 'm2',
        from: 'parent',
        name: 'Maya Thompson',
        body: 'That\'s wonderful to hear, thank you! We\'ve been doing nightly reading at home — glad it\'s showing.',
        time: 'Nov 12, 6:45 pm',
      },
      {
        id: 'm3',
        from: 'teacher',
        name: 'Ms. S. Johnson',
        body: 'It absolutely is. One small thing — she sometimes rushes through word problems in math. Encourage her to re-read the question before answering. She\'s on track for a strong Term 2.',
        time: 'Nov 13, 8:30 am',
      },
      {
        id: 'm4',
        from: 'teacher',
        name: 'Ms. S. Johnson',
        body: 'Hi Maya — just wanted to flag that Aisha did really well on Friday\'s math quiz. She\'s come a long way with fractions!',
        time: 'Today, 9:14 am',
        unread: true,
      },
    ],
  },
  {
    id: '2',
    teacher: 'Ms. S. Nakamura',
    subject: 'Grade 4 Science · Maple Ridge PS',
    avatar: 'N',
    lastMessage: 'Outstanding work on the Habitats poster. Aisha went well beyond the requirements.',
    lastDate: 'Nov 8',
    unread: 1,
    messages: [
      {
        id: 'm1',
        from: 'teacher',
        name: 'Ms. S. Nakamura',
        body: 'Hi Maya! I wanted to reach out personally about Aisha\'s Habitats poster project. She showed real curiosity and creativity — the level of research she did was well beyond what was asked. Definitely a strength to nurture.',
        time: 'Nov 8, 2:10 pm',
        unread: true,
      },
    ],
  },
  {
    id: '3',
    teacher: 'Mr. R. Evans',
    subject: 'Grade 2 · Maple Ridge PS',
    avatar: 'E',
    lastMessage: 'Marcus had a great week — very enthusiastic in class discussions.',
    lastDate: 'Nov 5',
    unread: 0,
    messages: [
      {
        id: 'm1',
        from: 'parent',
        name: 'Maya Thompson',
        body: 'Hi Mr. Evans, Marcus mentioned he has a book report due next week — could you let me know the requirements?',
        time: 'Nov 4, 7:30 pm',
      },
      {
        id: 'm2',
        from: 'teacher',
        name: 'Mr. R. Evans',
        body: 'Hi Maya! The report is 1 page — they just need to summarize the book and share their favourite part. Marcus had a great week by the way — very enthusiastic in class discussions.',
        time: 'Nov 5, 8:15 am',
      },
    ],
  },
]

const AVATAR_COLOURS = ['bg-accent', 'bg-blue', 'bg-purple', 'bg-[#B45309]']

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function MessagingPage() {
  const [activeThread, setActiveThread] = useState(DEMO_THREADS[0])
  const [reply, setReply]               = useState('')
  const [showThread, setShowThread]     = useState(false) // mobile: show thread pane

  function handleSend() {
    if (!reply.trim()) return
    // In production: write to Firestore and trigger SendGrid notification
    setReply('')
  }

  return (
    <div id="main-content" className="pt-nav min-h-screen bg-bg flex flex-col">
      <div className="max-w-[1100px] w-full mx-auto px-5 py-8 flex-1 flex flex-col">

        {/* Header */}
        <div className="mb-6">
          <h1 className="font-serif text-3xl text-text">Messages</h1>
          <p className="text-sm text-text3 mt-1">
            Private, secure messages between you and your child&apos;s teachers.
          </p>
        </div>

        {/* Two-pane layout */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-[300px_1fr] lg:grid-cols-[340px_1fr] gap-0 border border-border rounded-xl overflow-hidden bg-surface min-h-[560px]">

          {/* ── Thread list ── */}
          <div className={cn(
            'border-r border-border flex flex-col',
            showThread ? 'hidden md:flex' : 'flex',
          )}>
            <div className="px-4 py-3 border-b border-border">
              <p className="text-xs font-semibold text-text3 uppercase tracking-wide">Conversations</p>
            </div>
            <div className="flex-1 overflow-y-auto divide-y divide-border">
              {DEMO_THREADS.map((thread, i) => (
                <button
                  key={thread.id}
                  onClick={() => { setActiveThread(thread); setShowThread(true) }}
                  className={cn(
                    'w-full text-left px-4 py-4 flex gap-3 hover:bg-surface2 transition-colors',
                    activeThread.id === thread.id && 'bg-surface2',
                  )}
                >
                  {/* Avatar */}
                  <div className={cn(
                    'w-10 h-10 rounded-full flex items-center justify-center font-serif font-bold text-white text-sm flex-shrink-0',
                    AVATAR_COLOURS[i % AVATAR_COLOURS.length],
                  )}>
                    {thread.avatar}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-0.5">
                      <p className="font-semibold text-[13px] text-text truncate">{thread.teacher}</p>
                      <p className="text-[11px] text-text3 flex-shrink-0">{thread.lastDate}</p>
                    </div>
                    <p className="text-xs text-text3 mb-1">{thread.subject}</p>
                    <p className="text-xs text-text2 leading-relaxed line-clamp-2">{thread.lastMessage}</p>
                  </div>

                  {thread.unread > 0 && (
                    <span className="mt-1 w-5 h-5 rounded-full bg-accent text-white text-[10px] font-bold flex items-center justify-center flex-shrink-0">
                      {thread.unread}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* ── Message thread ── */}
          <div className={cn(
            'flex flex-col',
            !showThread ? 'hidden md:flex' : 'flex',
          )}>
            {/* Thread header */}
            <div className="flex items-center gap-3 px-5 py-3.5 border-b border-border">
              <button
                onClick={() => setShowThread(false)}
                className="md:hidden p-1 -ml-1 text-text3 hover:text-text"
                aria-label="Back to conversations"
              >
                <ChevronLeft size={20} />
              </button>
              <div>
                <p className="font-semibold text-[15px] text-text">{activeThread.teacher}</p>
                <p className="text-xs text-text3">{activeThread.subject}</p>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-5 py-5 space-y-5">
              {activeThread.messages.map(msg => {
                const isParent = msg.from === 'parent'
                return (
                  <div
                    key={msg.id}
                    className={cn('flex gap-3', isParent && 'flex-row-reverse')}
                  >
                    {/* Avatar dot */}
                    <div className={cn(
                      'w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs text-white flex-shrink-0 mt-0.5',
                      isParent ? 'bg-accent' : 'bg-blue',
                    )}>
                      {msg.name[0]}
                    </div>

                    <div className={cn('max-w-[70%]', isParent && 'items-end flex flex-col')}>
                      {(msg as any).unread && (
                        <span className="flex items-center gap-1 text-[10px] font-semibold text-accent mb-1">
                          <Circle size={6} fill="currentColor" /> New
                        </span>
                      )}
                      <div className={cn(
                        'rounded-xl px-4 py-3 text-sm leading-[1.65]',
                        isParent
                          ? 'bg-accent text-white rounded-tr-sm'
                          : 'bg-surface2 text-text2 rounded-tl-sm border border-border',
                      )}>
                        {msg.body}
                      </div>
                      <p className={cn('text-[11px] text-text3 mt-1.5', isParent && 'text-right')}>
                        {msg.name} · {msg.time}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Reply composer */}
            <div className="border-t border-border px-5 py-4">
              <div className="flex gap-3 items-end">
                <textarea
                  value={reply}
                  onChange={e => setReply(e.target.value)}
                  onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend() } }}
                  placeholder={`Message ${activeThread.teacher}…`}
                  rows={2}
                  className="flex-1 resize-none bg-surface2 border border-border rounded-lg px-4 py-2.5 text-sm text-text placeholder:text-text3 focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent leading-relaxed"
                />
                <button
                  onClick={handleSend}
                  disabled={!reply.trim()}
                  aria-label="Send message"
                  className="w-10 h-10 rounded-lg bg-accent text-white flex items-center justify-center flex-shrink-0 hover:bg-[#235A3B] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <Send size={16} />
                </button>
              </div>
              <p className="text-[11px] text-text3 mt-2">
                Messages are private between you and your child&apos;s teacher. Press Enter to send.
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
