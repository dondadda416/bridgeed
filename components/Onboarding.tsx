'use client'

import { useState, useEffect } from 'react'
import { CheckCircle, MessageSquare, Calendar } from 'lucide-react'
import { Modal } from '@/components/ui/Modal'

const STORAGE_KEY = 'bridgeed_onboarding_done'

const STEPS = [
  {
    id: 'welcome',
    title: 'Welcome to BridgeED 👋',
    subtitle: "You're connected to Maple Ridge Public School.",
    content: (
      <div className="text-center py-2">
        <div className="w-16 h-16 bg-[#D1FAE5] rounded-full flex items-center justify-center mx-auto mb-5">
          <CheckCircle size={32} className="text-[#065F46]" aria-hidden="true" />
        </div>
        <p className="text-text2 text-base leading-[1.7]">
          BridgeED gives you a real-time window into your child&apos;s school life —
          grades, teacher messages, upcoming events, and curriculum support.
        </p>
        <p className="text-text2 text-base leading-[1.7] mt-3">
          It takes about 60 seconds to get set up. Let&apos;s go.
        </p>
      </div>
    ),
  },
  {
    id: 'child',
    title: 'Your child is linked',
    subtitle: "Here's who we found in your school.",
    content: (
      <div className="py-2">
        <div className="bg-surface2 border border-border rounded-lg p-4 flex items-center gap-4 mb-4">
          <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center font-serif text-white text-xl flex-shrink-0">
            A
          </div>
          <div className="flex-1">
            <p className="font-semibold text-text">Aisha Thompson</p>
            <p className="text-sm text-text2">Grade 4 · Ms. S. Johnson · Maple Ridge PS</p>
          </div>
          <span className="text-xs font-bold bg-[#D1FAE5] text-[#065F46] px-2.5 py-1 rounded-full flex-shrink-0">
            ✓ Linked
          </span>
        </div>
        <p className="text-sm text-text2 leading-relaxed">
          You&apos;ll see Aisha&apos;s grades, attendance, assignments, and teacher feedback from your dashboard.
          If you have more than one child at this school, they&apos;ll appear as tabs on your dashboard.
        </p>
      </div>
    ),
  },
  {
    id: 'ready',
    title: "You're all set! 🎉",
    subtitle: "Here's what you can do with BridgeED.",
    content: (
      <div className="py-2 space-y-3">
        {[
          { icon: CheckCircle, colour: 'text-[#065F46]', bg: 'bg-[#D1FAE5]', text: "Check your child's grades, attendance, and teacher feedback any time" },
          { icon: MessageSquare, colour: 'text-[#1E40AF]', bg: 'bg-[#DBEAFE]', text: 'Message teachers directly — and get notified when they reply' },
          { icon: Calendar,     colour: 'text-[#9A3412]', bg: 'bg-[#FFDDD2]', text: 'Stay on top of school events, PA days, and assignment due dates' },
        ].map((item, i) => {
          const Icon = item.icon
          return (
            <div key={i} className="flex items-start gap-3">
              <div className={`w-8 h-8 rounded-sm flex items-center justify-center flex-shrink-0 ${item.bg}`}>
                <Icon size={16} className={item.colour} aria-hidden="true" />
              </div>
              <p className="text-sm text-text2 leading-relaxed pt-1">{item.text}</p>
            </div>
          )
        })}
      </div>
    ),
  },
]

export default function OnboardingFlow() {
  const [open, setOpen]       = useState(false)
  const [step, setStep]       = useState(0)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const done = localStorage.getItem(STORAGE_KEY)
      if (!done) setOpen(true)
    }
  }, [])

  function finish() {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, '1')
    }
    setOpen(false)
  }

  const current = STEPS[step]
  const isLast  = step === STEPS.length - 1

  return (
    <Modal open={open} onClose={finish} className="max-w-[440px]">
      {/* Step dots */}
      <div className="flex justify-center gap-2 mb-6" role="tablist" aria-label="Onboarding steps">
        {STEPS.map((s, i) => (
          <div
            key={s.id}
            role="tab"
            aria-selected={i === step}
            aria-label={`Step ${i + 1}`}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === step ? 'w-8 bg-accent' : i < step ? 'w-3 bg-accent2' : 'w-3 bg-border'
            }`}
          />
        ))}
      </div>

      {/* Content */}
      <div className="text-center mb-2">
        <h3 className="font-serif text-[22px] text-text mb-1">{current.title}</h3>
        <p className="text-sm text-text3">{current.subtitle}</p>
      </div>

      <div className="my-6">{current.content}</div>

      {/* Actions */}
      {isLast ? (
        <div className="space-y-3">
          <button
            onClick={finish}
            className="w-full bg-accent text-white font-bold py-3.5 rounded-sm text-md hover:bg-[#235A3B] transition-colors"
          >
            Go to My Dashboard
          </button>
          <button
            onClick={finish}
            className="w-full text-sm text-text3 hover:text-text2 transition-colors py-1"
          >
            I&apos;ll explore on my own
          </button>
        </div>
      ) : (
        <button
          onClick={() => setStep(s => s + 1)}
          className="w-full bg-accent text-white font-bold py-3.5 rounded-sm text-md hover:bg-[#235A3B] transition-colors"
        >
          Next →
        </button>
      )}
    </Modal>
  )
}
