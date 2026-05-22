'use client'

import { useState } from 'react'
import { X, Star, Users, Clock, MapPin, CheckCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

// ─── Data ────────────────────────────────────────────────────────────────────

type Category = 'all' | 'parents' | 'students' | 'councils' | 'newcomer'

const WORKSHOPS = [
  {
    id: '1',
    title: '🤝 School Engaging Parents',
    category: 'parents' as Category,
    categoryLabel: 'Parent Engagement',
    price: 250,
    duration: '3 hours',
    capacity: 'Up to 40 participants',
    format: 'In-school delivery',
    rating: 4.9,
    reviews: 142,
    description: 'Equip your school with strategies to build authentic, lasting partnerships with all families. Packed with communication tools, outreach frameworks, and engagement best practices for educators and school staff.',
    outcomes: ['Understanding barriers to parent engagement', 'Communication strategies for diverse families', 'Building a welcoming school culture', 'Digital engagement tools', 'Measuring engagement success'],
    tagColour: 'bg-[#D1FAE5] text-[#065F46]',
  },
  {
    id: '2',
    title: '🛑 Bullying is Wack',
    category: 'students' as Category,
    categoryLabel: 'Anti-Bullying',
    price: 200,
    duration: '2.5 hours',
    capacity: '1–3 classrooms',
    format: 'In-classroom, K–8 students',
    rating: 4.8,
    reviews: 89,
    description: 'An energetic, student-centred anti-bullying program. Builds emotional safety, conflict resolution skills, peer respect, and a positive school culture through interactive activities, real stories, and student-led pledges.',
    outcomes: ['Defining bullying vs. conflict', 'Emotional safety and empathy', 'Being an upstander, not a bystander', 'Conflict resolution scripts', 'Creating a positive classroom pledge'],
    tagColour: 'bg-[#FEE2E2] text-[#991B1B]',
  },
  {
    id: '3',
    title: '🏛️ School Council Breakdown',
    category: 'councils' as Category,
    categoryLabel: 'School Leadership',
    price: 225,
    duration: '2.5 hours',
    capacity: 'Up to 30 parents',
    format: 'Evening session available',
    rating: 4.7,
    reviews: 64,
    description: 'Demystify the school council for parents who want to get involved. Covers roles, responsibilities, decision-making, parent advocacy, and how councils can directly improve school resources.',
    outcomes: ['How Ontario school councils are structured', 'Roles: Chair, Treasurer, Secretary', 'How councils influence school budgets', 'Advocating for your school community', 'Running effective meetings'],
    tagColour: 'bg-[#DBEAFE] text-[#1E40AF]',
  },
  {
    id: '4',
    title: '💰 Grant Writing Secrets',
    category: 'councils' as Category,
    categoryLabel: 'Funding & Finance',
    price: 300,
    duration: '3 hours',
    capacity: 'Up to 25 participants',
    format: 'Workshop with workbooks included',
    rating: 4.9,
    reviews: 51,
    description: 'Unlock funding for your school community. Teaches parent councils and educators how to identify school grants, write compelling proposals, manage budgets, and run successful fundraising campaigns.',
    outcomes: ['Ontario school grant landscape', 'Writing a strong needs statement', 'Grant proposal structure', 'Budget justification', 'Reporting and accountability'],
    tagColour: 'bg-[#FEF3C7] text-[#92400E]',
  },
  {
    id: '5',
    title: '📱 Understanding Social Media',
    category: 'parents' as Category,
    categoryLabel: 'Digital Citizenship',
    price: 225,
    duration: '2 hours',
    capacity: 'Parents + Grades 4–8 students',
    format: 'Interactive, dual parent/student session',
    rating: 4.8,
    reviews: 103,
    description: 'A practical digital citizenship workshop for parents and students. Covers online safety, social media platforms, screen-time habits, cyberbullying prevention, and healthy conversations about technology at home.',
    outcomes: ['Popular platforms and risks (TikTok, Instagram, Discord, Roblox)', 'Privacy settings walkthrough', 'Recognising and reporting cyberbullying', 'Healthy screen-time habits', 'Parent-child conversation starters'],
    tagColour: 'bg-[#EDE9FE] text-[#5B21B6]',
  },
  {
    id: '6',
    title: '🌍 Navigating the System',
    category: 'newcomer' as Category,
    categoryLabel: 'Newcomer Support',
    price: 200,
    duration: '3 hours',
    capacity: 'Up to 35 families',
    format: 'Multilingual delivery',
    rating: 5.0,
    reviews: 78,
    description: 'Designed for newcomer and immigrant families. Explains the Ontario school system — grade structures, IEPs, French programs, communication with teachers, EQAO testing, and how to access community supports.',
    outcomes: ['Ontario school structure (JK–Grade 12)', 'How to communicate with teachers and principals', 'Understanding report cards and EQAO', 'IEPs and learning support resources', 'Community settlement resources in your area'],
    tagColour: 'bg-[#FFDDD2] text-[#9A3412]',
    badge: '🌐 Interpretation available',
  },
]

const FILTERS: { id: Category; label: string }[] = [
  { id: 'all',      label: 'All Workshops' },
  { id: 'parents',  label: 'For Parents' },
  { id: 'students', label: 'For Students' },
  { id: 'councils', label: 'For School Councils' },
  { id: 'newcomer', label: 'Newcomer Support' },
]

// ─── Booking modal ────────────────────────────────────────────────────────────

interface BookingForm {
  school: string
  name: string
  email: string
  date: string
  message: string
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function WorkshopsPage() {
  const [activeFilter, setActiveFilter] = useState<Category>('all')
  const [bookingFor, setBookingFor]     = useState<typeof WORKSHOPS[0] | null>(null)
  const [form, setForm]                 = useState<BookingForm>({ school: '', name: '', email: '', date: '', message: '' })
  const [submitted, setSubmitted]       = useState(false)

  const filtered = activeFilter === 'all'
    ? WORKSHOPS
    : WORKSHOPS.filter(w => w.category === activeFilter)

  function handleBook(workshop: typeof WORKSHOPS[0]) {
    setBookingFor(workshop)
    setSubmitted(false)
    setForm({ school: '', name: '', email: '', date: '', message: '' })
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    // TODO: Send via SendGrid API route
    setSubmitted(true)
  }

  return (
    <div id="main-content" className="pt-nav min-h-screen bg-bg">

      {/* ── Hero ── */}
      <section
        className="text-white px-10 py-16 text-center"
        style={{ background: 'linear-gradient(135deg, #C2410C, #EA580C, #F97316)' }}
      >
        <span className="inline-block bg-white/20 border border-white/30 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-wider mb-4">
          Parent Education
        </span>
        <h1 className="font-serif text-[clamp(32px,5vw,52px)] mb-4 leading-tight">
          Parent Education Workshops
        </h1>
        <p className="text-lg opacity-90 max-w-[580px] mx-auto leading-[1.65] mb-8">
          Six expert-led programs delivered at your school — building stronger families and better student outcomes.
        </p>
        <div className="flex flex-wrap justify-center gap-8 text-sm opacity-80">
          {[['6', 'Programs'], ['$200–$300', 'Per School'], ['2–3 Hours', 'Per Session'], ['All Grades', 'K–8']].map(([v, l]) => (
            <div key={l}>
              <span className="block font-serif text-[28px] font-bold opacity-100">{v}</span>
              <span>{l}</span>
            </div>
          ))}
        </div>
      </section>

      <div className="max-w-[1100px] mx-auto px-5 py-10">

        {/* ── Filters ── */}
        <div className="flex flex-wrap gap-2 mb-8" role="tablist" aria-label="Filter workshops">
          {FILTERS.map(f => (
            <button
              key={f.id}
              role="tab"
              aria-selected={activeFilter === f.id}
              onClick={() => setActiveFilter(f.id)}
              className={cn(
                'px-4 py-2 rounded-full border text-sm font-semibold transition-all',
                activeFilter === f.id
                  ? 'bg-accent text-white border-accent'
                  : 'bg-surface text-text2 border-border hover:border-accent hover:text-accent',
              )}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* ── Workshop cards ── */}
        <div className="grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-5 mb-16">
          {filtered.map(workshop => (
            <article
              key={workshop.id}
              className="bg-surface border border-border rounded-lg overflow-hidden flex flex-col hover:-translate-y-1 hover:shadow-lg transition-all duration-200"
            >
              <div className="p-6 pb-4 flex-1">
                <span className={cn('inline-block text-[11px] font-bold uppercase tracking-wide px-2.5 py-1 rounded-full mb-3', workshop.tagColour)}>
                  {workshop.categoryLabel}
                </span>
                {workshop.badge && (
                  <span className="inline-block ml-2 text-[11px] font-bold bg-surface2 text-text3 px-2.5 py-1 rounded-full mb-3">
                    {workshop.badge}
                  </span>
                )}
                <h2 className="font-serif text-[18px] text-text mb-2">{workshop.title}</h2>
                <p className="text-sm text-text2 leading-[1.65] mb-4">{workshop.description}</p>
                <div className="flex flex-wrap gap-3 text-xs text-text3 border-t border-border pt-4">
                  <span className="flex items-center gap-1.5"><Users size={12} aria-hidden="true" />{workshop.capacity}</span>
                  <span className="flex items-center gap-1.5"><Clock size={12} aria-hidden="true" />{workshop.duration}</span>
                  <span className="flex items-center gap-1.5"><MapPin size={12} aria-hidden="true" />{workshop.format}</span>
                </div>
              </div>
              <div className="px-6 py-4 border-t border-border flex items-center justify-between">
                <div>
                  <span className="font-serif text-2xl font-bold text-text">${workshop.price}</span>
                  <span className="text-xs text-text3">/school</span>
                  <div className="flex items-center gap-1 mt-0.5">
                    <span className="text-[#F59E0B] text-xs">{'★'.repeat(Math.floor(workshop.rating))}</span>
                    <span className="text-xs text-text3">{workshop.rating} ({workshop.reviews})</span>
                  </div>
                </div>
                <button
                  onClick={() => handleBook(workshop)}
                  className="bg-accent text-white px-4 py-2.5 rounded-sm text-sm font-semibold hover:bg-[#235A3B] transition-colors"
                >
                  Book This Workshop
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* ── How it works ── */}
        <section className="bg-surface border border-border rounded-lg p-8" aria-labelledby="how-heading">
          <h2 id="how-heading" className="font-serif text-2xl text-text mb-6 text-center">What happens after you inquire?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { step: '1', title: 'We confirm within 24 hours', body: 'Our team reviews your request and reaches out to confirm availability and answer any questions.' },
              { step: '2', title: 'We coordinate your date', body: 'We work with your school to schedule the best date and handle all logistics — you just show up.' },
              { step: '3', title: 'Workshop delivered at your school', body: 'Our facilitator comes to you. No travel required for families. Materials and resources included.' },
            ].map(item => (
              <div key={item.step} className="text-center">
                <div className="w-10 h-10 bg-accent text-white font-serif text-xl font-bold rounded-full flex items-center justify-center mx-auto mb-3">
                  {item.step}
                </div>
                <h3 className="font-semibold text-text mb-2">{item.title}</h3>
                <p className="text-sm text-text2 leading-[1.65]">{item.body}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* ── Booking modal ── */}
      {bookingFor && (
        <div
          className="fixed inset-0 bg-black/50 z-[200] flex items-center justify-center p-5"
          onClick={() => setBookingFor(null)}
        >
          <div
            className="bg-surface rounded-lg p-8 w-full max-w-[500px] max-h-[90vh] overflow-y-auto relative"
            onClick={e => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label={`Book ${bookingFor.title}`}
          >
            <button
              onClick={() => setBookingFor(null)}
              className="absolute top-4 right-4 text-text3 hover:text-text transition-colors"
              aria-label="Close"
            >
              <X size={20} />
            </button>

            {submitted ? (
              <div className="text-center py-6">
                <div className="w-16 h-16 bg-[#D1FAE5] rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle size={32} className="text-[#065F46]" />
                </div>
                <h3 className="font-serif text-2xl text-text mb-2">Inquiry sent!</h3>
                <p className="text-text2 text-base leading-relaxed mb-6">
                  We&apos;ll be in touch within 24 hours to confirm your booking for <strong>{bookingFor.title}</strong>.
                </p>
                <button
                  onClick={() => setBookingFor(null)}
                  className="bg-accent text-white font-bold px-6 py-3 rounded-sm hover:bg-[#235A3B] transition-colors"
                >
                  Done
                </button>
              </div>
            ) : (
              <>
                <h3 className="font-serif text-[22px] text-text mb-1">Book This Workshop</h3>
                <p className="text-sm text-text3 mb-6">{bookingFor.title}</p>
                <form onSubmit={handleSubmit} className="space-y-4">
                  {[
                    { id: 'school', label: 'School Name', placeholder: 'Maple Ridge Public School', type: 'text' },
                    { id: 'name',   label: 'Your Name',   placeholder: 'Maya Thompson',             type: 'text' },
                    { id: 'email',  label: 'Email Address', placeholder: 'you@example.com',          type: 'email' },
                  ].map(field => (
                    <div key={field.id}>
                      <label className="block text-sm font-semibold mb-1.5 text-text" htmlFor={field.id}>
                        {field.label} <span className="text-warm">*</span>
                      </label>
                      <input
                        id={field.id}
                        type={field.type}
                        required
                        placeholder={field.placeholder}
                        value={form[field.id as keyof BookingForm]}
                        onChange={e => setForm(f => ({ ...f, [field.id]: e.target.value }))}
                        className="w-full px-4 py-3 border-[1.5px] border-border rounded-sm text-[15px] bg-bg text-text outline-none focus:border-accent transition-colors"
                      />
                    </div>
                  ))}
                  <div>
                    <label className="block text-sm font-semibold mb-1.5 text-text" htmlFor="date">
                      Preferred Date <span className="text-warm">*</span>
                    </label>
                    <input
                      id="date"
                      type="date"
                      required
                      value={form.date}
                      onChange={e => setForm(f => ({ ...f, date: e.target.value }))}
                      className="w-full px-4 py-3 border-[1.5px] border-border rounded-sm text-[15px] bg-bg text-text outline-none focus:border-accent transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-1.5 text-text" htmlFor="message">
                      Anything else we should know? <span className="text-text3 font-normal">(optional)</span>
                    </label>
                    <textarea
                      id="message"
                      rows={3}
                      placeholder="Number of expected attendees, accessibility needs, questions..."
                      value={form.message}
                      onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                      className="w-full px-4 py-3 border-[1.5px] border-border rounded-sm text-[15px] bg-bg text-text outline-none focus:border-accent transition-colors resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-accent text-white font-bold py-3.5 rounded-sm text-md hover:bg-[#235A3B] transition-colors mt-2"
                  >
                    Send Inquiry
                  </button>
                  <p className="text-xs text-text3 text-center">We&apos;ll respond within 24 hours. No payment required at this stage.</p>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
