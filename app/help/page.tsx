import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'New to Ontario Schools? — RECESS',
  description: 'A plain-language guide for newcomer families navigating the Ontario K–8 school system.',
}

// ─── Static data ─────────────────────────────────────────────────────────────

const GRADE_ROWS = [
  { grades: 'JK – SK',   ages: '4–6',   name: 'Junior & Senior Kindergarten' },
  { grades: 'Grade 1–3', ages: '6–9',   name: 'Early Primary' },
  { grades: 'Grade 4–6', ages: '9–12',  name: 'Junior Division' },
  { grades: 'Grade 7–8', ages: '12–14', name: 'Intermediate Division' },
]

const REPORT_CARD_DATES = [
  { term: 'Progress Report',   when: 'November', note: 'No grades — teachers describe your child\'s learning habits.' },
  { term: 'Term 1 Report Card', when: 'January–February', note: 'First graded report. Includes letter grades or levels.' },
  { term: 'Term 2 Report Card', when: 'June', note: 'Final report card of the school year.' },
]

const GLOSSARY = [
  { term: 'IEP', meaning: 'Individual Education Plan — a personal learning plan for students who need extra support.' },
  { term: 'EQAO', meaning: 'Province-wide tests in Grade 3 and Grade 6. Reading, writing, and math.' },
  { term: 'PA Day', meaning: 'Professional Activity Day — school is closed. Teachers have training.' },
  { term: 'OSR', meaning: 'Ontario Student Record — your child\'s official school file.' },
  { term: 'ESL / ELD', meaning: 'English as a Second Language / English Literacy Development — free language support.' },
  { term: 'IPRC', meaning: 'A meeting to decide if your child qualifies for special education support.' },
]

const LANGUAGES = [
  { code: 'en', name: 'English',   note: 'Full support' },
  { code: 'fr', name: 'Français',  note: 'Full support' },
  { code: 'ar', name: 'العربية',   note: 'Full support' },
  { code: 'zh', name: '中文',      note: 'Full support' },
  { code: 'pa', name: 'ਪੰਜਾਬੀ',   note: 'Full support' },
  { code: 'tl', name: 'Tagalog',   note: 'Full support' },
  { code: 'ur', name: 'اردو',      note: 'Full support' },
  { code: 'ta', name: 'தமிழ்',    note: 'Full support' },
  { code: 'so', name: 'Soomaali',  note: 'Full support' },
]

const TIPS = [
  {
    emoji: '📅',
    heading: 'Ask for a meeting',
    body: "You have the right to meet your child's teacher. Ask the school office to book a 15-minute phone or in-person meeting. No appointment form is required.",
  },
  {
    emoji: '📝',
    heading: 'Write it down first',
    body: 'Before the meeting, write down your questions. Bring a pen. You can ask the teacher to repeat anything you didn\'t understand — that is always okay.',
  },
  {
    emoji: '🌐',
    heading: 'Request an interpreter',
    body: 'Ontario schools can arrange interpretation for parent meetings at no cost. Ask the office when you book.',
  },
  {
    emoji: '📩',
    heading: 'Use RECESS messaging',
    body: 'If speaking feels hard, you can message teachers through RECESS. Type in your language — we\'ll help translate.',
  },
]

// ─── Page ────────────────────────────────────────────────────────────────────

export default function HelpPage() {
  return (
    <div id="main-content" className="pt-nav min-h-screen bg-bg">

      {/* ── Hero ── */}
      <section
        className="text-white px-8 py-16"
        style={{ background: 'linear-gradient(135deg, #1B4332 0%, #2C6E49 60%, #40916C 100%)' }}
      >
        <div className="max-w-[820px] mx-auto">
          <Link href="/" className="inline-block text-sm text-white/70 hover:text-white mb-6 hover:underline">
            ← Back to RECESS
          </Link>
          <div className="inline-flex items-center gap-2 bg-white/15 border border-white/25 rounded-full px-3.5 py-1.5 text-[13px] mb-5">
            🌍 Newcomer Family Support
          </div>
          <h1 className="font-serif text-[clamp(32px,5vw,52px)] leading-[1.1] mb-5">
            New to Ontario Schools?
          </h1>
          <p className="text-lg opacity-85 max-w-[560px] leading-[1.65]">
            We know the Ontario school system can feel complicated when you&apos;re new to Canada.
            This guide explains how it works — in plain language.
          </p>
        </div>
      </section>

      <div className="max-w-[820px] mx-auto px-6 py-14 space-y-14">

        {/* ── School year ── */}
        <section>
          <h2 className="font-serif text-2xl text-text mb-4">The School Year</h2>
          <p className="text-text2 leading-[1.75] mb-4">
            Ontario schools run from early September to late June — about 10 months.
            The year is divided into two terms. In July and August, schools are closed for summer.
          </p>
          <div className="bg-surface border border-border rounded-lg p-5 grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
            {[
              { period: 'September – January', label: 'Term 1' },
              { period: 'February – June',     label: 'Term 2' },
              { period: 'July – August',        label: 'Summer break (schools closed)' },
            ].map(row => (
              <div key={row.label} className="flex flex-col gap-1">
                <span className="font-semibold text-text">{row.label}</span>
                <span className="text-text2">{row.period}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ── Grade structure ── */}
        <section>
          <h2 className="font-serif text-2xl text-text mb-4">Grade Structure (JK–Grade 8)</h2>
          <p className="text-text2 leading-[1.75] mb-5">
            Elementary school in Ontario goes from Junior Kindergarten (age 4) to Grade 8 (age 13–14).
            After Grade 8, students move on to high school (Grades 9–12).
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border border-border rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-surface2 border-b border-border">
                  <th className="text-left px-4 py-3 font-semibold text-text">Grades</th>
                  <th className="text-left px-4 py-3 font-semibold text-text">Typical Ages</th>
                  <th className="text-left px-4 py-3 font-semibold text-text">Division Name</th>
                </tr>
              </thead>
              <tbody>
                {GRADE_ROWS.map((row, i) => (
                  <tr key={row.grades} className={i < GRADE_ROWS.length - 1 ? 'border-b border-border' : ''}>
                    <td className="px-4 py-3 font-semibold text-text">{row.grades}</td>
                    <td className="px-4 py-3 text-text2">{row.ages}</td>
                    <td className="px-4 py-3 text-text2">{row.name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ── Report cards ── */}
        <section>
          <h2 className="font-serif text-2xl text-text mb-4">Report Cards</h2>
          <p className="text-text2 leading-[1.75] mb-5">
            Ontario schools send home three reports each year. You will receive these by email or in your child&apos;s
            backpack. RECESS will also notify you when a new report is available.
          </p>
          <div className="space-y-3">
            {REPORT_CARD_DATES.map(rc => (
              <div key={rc.term} className="bg-surface border border-border rounded-lg p-4 flex gap-4">
                <div className="w-2 rounded-full bg-accent flex-shrink-0 self-stretch" />
                <div>
                  <p className="font-semibold text-text mb-0.5">{rc.term} — <span className="font-normal text-text2">{rc.when}</span></p>
                  <p className="text-sm text-text2 leading-relaxed">{rc.note}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-sm text-text3 mt-4 leading-relaxed">
            Grades in Ontario run from A (excellent) to D (needs improvement). Your child&apos;s teacher can always explain
            what any grade means for your child specifically.
          </p>
        </section>

        {/* ── EQAO ── */}
        <section>
          <h2 className="font-serif text-2xl text-text mb-4">EQAO Tests</h2>
          <p className="text-text2 leading-[1.75] mb-3">
            EQAO stands for the Education Quality and Accountability Office. These are province-wide tests given to
            all Ontario students in Grade 3 and Grade 6. They cover reading, writing, and mathematics.
          </p>
          <p className="text-text2 leading-[1.75] mb-3">
            EQAO scores do not affect your child&apos;s report card grade. They help the province understand how schools
            are doing overall. Your child&apos;s teacher will let you know when the tests are coming.
          </p>
          <div className="bg-[#FEF3C7] border border-[#FDE68A] rounded-lg p-4 text-sm text-[#92400E]">
            <strong>For newcomer families:</strong> If your child has been in Canada for less than a year and is still
            learning English, they may be eligible to defer the EQAO. Talk to your principal.
          </div>
        </section>

        {/* ── How to talk to teachers ── */}
        <section>
          <h2 className="font-serif text-2xl text-text mb-2">How to Talk to Your Child&apos;s Teacher</h2>
          <p className="text-text2 leading-[1.75] mb-6">
            Many newcomer parents tell us this is the part that feels most uncertain. Here is what you need to know:
            teachers want to hear from you. Here&apos;s how to make it easy.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {TIPS.map(tip => (
              <div key={tip.heading} className="bg-surface border border-border rounded-lg p-5">
                <div className="text-2xl mb-3">{tip.emoji}</div>
                <p className="font-semibold text-text mb-2">{tip.heading}</p>
                <p className="text-sm text-text2 leading-[1.65]">{tip.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Glossary ── */}
        <section>
          <h2 className="font-serif text-2xl text-text mb-4">Words You Might Hear</h2>
          <p className="text-text2 leading-[1.75] mb-5">
            Schools use a lot of abbreviations. Here are the most common ones explained.
          </p>
          <div className="divide-y divide-border border border-border rounded-lg overflow-hidden">
            {GLOSSARY.map(item => (
              <div key={item.term} className="flex gap-4 px-5 py-4 bg-surface">
                <span className="font-semibold text-accent flex-shrink-0 w-16">{item.term}</span>
                <span className="text-sm text-text2 leading-relaxed">{item.meaning}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ── Language support ── */}
        <section>
          <h2 className="font-serif text-2xl text-text mb-4">RECESS in Your Language</h2>
          <p className="text-text2 leading-[1.75] mb-5">
            RECESS is available in 9 languages. You can change your language from the navigation bar at any time.
            All core features — messaging, grades, announcements — are fully translated.
          </p>
          <div className="grid grid-cols-3 sm:grid-cols-3 gap-3">
            {LANGUAGES.map(lang => (
              <div
                key={lang.code}
                className="bg-surface border border-border rounded-lg px-4 py-3 text-center"
              >
                <p className="font-semibold text-text text-sm">{lang.name}</p>
                <p className="text-xs text-accent mt-0.5">{lang.note}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Workshop feature card ── */}
        <section className="bg-surface border border-border rounded-xl p-6 flex flex-col sm:flex-row gap-6 items-start">
          <div className="flex-shrink-0">
            <div className="w-14 h-14 rounded-sm bg-accent3/20 flex items-center justify-center text-2xl">🧭</div>
          </div>
          <div className="flex-1">
            <div className="flex items-start justify-between gap-4 mb-2 flex-wrap">
              <div>
                <p className="text-xs font-bold text-text3 uppercase tracking-wide mb-1">Featured Workshop</p>
                <h3 className="font-serif text-xl text-text">Navigating the System</h3>
              </div>
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold bg-[#DBEAFE] text-[#1E40AF] border border-[#93C5FD] px-2.5 py-1 rounded-full flex-shrink-0">
                🌐 Interpretation available
              </span>
            </div>
            <p className="text-text2 text-sm leading-[1.7] mb-4">
              Designed specifically for newcomer and immigrant families. Covers the Ontario school system, report
              cards, how to work with teachers, and community resources — all in a welcoming, jargon-free session.
            </p>
            <div className="flex flex-wrap gap-3 items-center text-xs text-text3 mb-5">
              <span>👥 Up to 30 families</span>
              <span>·</span>
              <span>⏱ 2 hours</span>
              <span>·</span>
              <span>📍 In-school</span>
            </div>
            <Link
              href="/workshops"
              className="inline-flex items-center gap-2 bg-accent text-white text-sm font-semibold px-5 py-2.5 rounded-sm hover:bg-[#235A3B] transition-colors no-underline"
            >
              Book This Workshop →
            </Link>
          </div>
        </section>

        {/* ── Contact footer ── */}
        <section className="text-center pt-4 pb-2">
          <h2 className="font-serif text-2xl text-text mb-3">Still have questions?</h2>
          <p className="text-text2 leading-[1.75] mb-6 max-w-[480px] mx-auto">
            Our team speaks English and French and can connect you with interpretation in other languages.
            We are here to help.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="mailto:hello@recess.ca"
              className="inline-flex items-center gap-2 bg-accent text-white text-sm font-semibold px-5 py-3 rounded-sm hover:bg-[#235A3B] transition-colors no-underline"
            >
              ✉ Email us
            </a>
            <Link
              href="/register"
              className="inline-flex items-center gap-2 border border-accent text-accent text-sm font-semibold px-5 py-3 rounded-sm hover:bg-accent hover:text-white transition-colors no-underline"
            >
              Join Your School
            </Link>
          </div>
          <p className="text-sm text-text3 mt-6">
            hello@recess.ca · 1-888-RECESS
          </p>
        </section>

      </div>
    </div>
  )
}
