import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'

// ─── Static data ─────────────────────────────────────────────────────────────

const HERO_STATS = [
  { value: '47',      label: 'Partner Schools' },
  { value: '12,400+', label: 'Families Connected' },
  { value: '98%',     label: 'Parent Satisfaction' },
  { value: '6',       label: 'Workshop Programs' },
]

const FEATURES = [
  {
    icon: '📊',
    title: 'Student Progress Tracking',
    description: 'Real-time grades, attendance, assignments, and teacher feedback — all in one parent-friendly dashboard.',
    href: '/dashboard/parent',
    bg: 'bg-[rgba(44,110,73,0.08)]',
  },
  {
    icon: '💬',
    title: 'Secure Messaging',
    description: 'Encrypted, private communication between parents and teachers. No lost notes, no phone tag.',
    href: '/messaging',
    bg: 'bg-blue2',
  },
  {
    icon: '🎓',
    title: 'Parent Workshops',
    description: 'Six evidence-based programs — from anti-bullying to grant writing — delivered right at your school.',
    href: '/workshops',
    bg: 'bg-[#FFDDD2]',
  },
  {
    icon: '📚',
    title: 'Ontario Curriculum Guide',
    description: 'Grade-by-grade curriculum breakdowns in plain language — plus tips for supporting learning at home.',
    href: '/curriculum',
    bg: 'bg-purple2',
  },
  {
    icon: '📅',
    title: 'Calendar & Announcements',
    description: 'Never miss a school event, PA day, or assignment due date again.',
    href: '/calendar',
    bg: 'bg-gold2',
  },
  {
    icon: '🌍',
    title: 'Newcomer Family Support',
    description: 'Multilingual resources and settlement guidance for families new to the Ontario school system.',
    href: '/help',
    bg: 'bg-accent3/20',
  },
]

const IMPACT_METRICS = [
  { value: '94%',    label: 'of parents check dashboards weekly' },
  { value: '28,000+', label: 'Messages sent this school year' },
  { value: '1,240',  label: 'Workshops booked across schools' },
  { value: '3,100',  label: 'Newcomer families supported' },
]

const LANGUAGES = ['English', 'Français', 'العربية', '中文', 'Punjabi', 'Tagalog', 'Urdu', 'Tamil', 'Somali']

// ─── Page ────────────────────────────────────────────────────────────────────

export default function HomePage() {
  return (
    <div className="pt-nav">
      {/* ── Hero ── */}
      <section
        className="text-white px-10 py-20 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #1B4332 0%, #2C6E49 50%, #40916C 100%)' }}
      >
        <div className="max-w-[900px] mx-auto relative">
          {/* Badge */}
          <div className="inline-flex items-center gap-1.5 bg-white/15 border border-white/25 rounded-full px-3.5 py-1.5 text-[13px] mb-6">
            🍁 Built for Ontario K–8 Schools
          </div>

          <h1 className="text-[clamp(36px,5vw,60px)] leading-[1.1] mb-5">
            Connecting <em className="not-italic text-accent3">Schools</em> &amp; Families for Student{' '}
            <em className="not-italic text-accent3">Success</em>
          </h1>

          <p className="text-sm font-semibold uppercase tracking-[0.12em] text-accent3/90 mb-5">
            <span className="text-white">R</span>esponsive <span className="text-white">E</span>ngagement{' '}
            <span className="text-white">C</span>onnecting <span className="text-white">E</span>very{' '}
            <span className="text-white">S</span>tudent&apos;s <span className="text-white">S</span>takeholder
          </p>

          <p className="text-lg opacity-85 max-w-[580px] leading-[1.65] mb-9">
            RECESS gives Ontario families real-time visibility into their child&apos;s education —
            with secure messaging, parent workshops, curriculum guides, and AI-powered progress insights.
          </p>

          <div className="flex flex-wrap gap-3">
            <Link href="/dashboard/parent">
              <Button variant="hero-main" size="lg">Explore Dashboard</Button>
            </Link>
            <Link href="/workshops">
              <Button variant="hero-sec" size="lg">Browse Workshops</Button>
            </Link>
            <Link href="/about">
              <Button variant="hero-sec" size="lg">Learn More</Button>
            </Link>
          </div>

          {/* Stats row */}
          <div className="flex flex-wrap gap-8 mt-12 pt-10 border-t border-white/20">
            {HERO_STATS.map(stat => (
              <div key={stat.label}>
                <span className="block font-serif text-[32px] font-bold">{stat.value}</span>
                <p className="text-[13px] opacity-70 mt-0.5">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Testimonial */}
          <div className="mt-10 bg-white/10 border border-white/20 rounded-xl px-6 py-5 max-w-[600px]">
            <p className="text-[15px] leading-[1.7] opacity-90 italic mb-4">
              &ldquo;When we moved from Somalia, I had no idea how to talk to my daughter&apos;s teacher.
              RECESS explained everything — report cards, the school year, even how to ask for a meeting.
              Now I feel like I am part of her education.&rdquo;
            </p>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center font-serif font-bold text-sm flex-shrink-0">
                F
              </div>
              <div>
                <p className="text-sm font-semibold">Fatuma Abdi</p>
                <p className="text-xs opacity-60">Parent · Grade 3 · Maple Ridge PS</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Feature cards ── */}
      <section className="py-[60px] px-10 max-w-[1100px] mx-auto">
        <div className="text-center mb-12">
          <span className="inline-block bg-accent3 text-accent text-xs font-bold uppercase tracking-[0.5px] px-3 py-1 rounded-full mb-3">
            Platform Features
          </span>
          <h2 className="text-[clamp(28px,4vw,40px)] mb-3">Everything Your School Community Needs</h2>
          <p className="text-text2 text-md max-w-[520px] mx-auto leading-[1.65]">
            One platform that brings together parents, teachers, and administrators around every student&apos;s success.
          </p>
        </div>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-5">
          {FEATURES.map(f => (
            <Link key={f.href} href={f.href} className="no-underline">
              <Card hover className="h-full">
                <div className={`w-12 h-12 rounded-sm flex items-center justify-center text-[22px] mb-4 ${f.bg}`}>
                  {f.icon}
                </div>
                <h3 className="text-[17px] mb-2 text-text">{f.title}</h3>
                <p className="text-sm text-text2 leading-[1.6]">{f.description}</p>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Impact section ── */}
      <section className="bg-surface2 py-[60px] px-10">
        <div className="max-w-[1100px] mx-auto grid grid-cols-[1fr_1fr] gap-16 items-center max-[768px]:grid-cols-1">
          {/* Left — narrative */}
          <div>
            <span className="inline-block bg-accent3 text-accent text-xs font-bold uppercase tracking-[0.5px] px-3 py-1 rounded-full mb-4">
              Our Impact
            </span>
            <h2 className="text-[clamp(28px,4vw,40px)] mb-5">Closing the Engagement Gap</h2>
            <p className="text-text2 text-md leading-[1.7] mb-6">
              Research consistently shows that engaged parents produce better student outcomes. RECESS was built to
              make that engagement accessible — especially for newcomer, immigrant, and underserved families who face
              the highest barriers.
            </p>
            <ul className="space-y-3">
              {[
                'Students with engaged parents are 30% more likely to meet grade-level goals',
                'Newcomer families report 4× more confidence navigating the Ontario school system',
                '87% of student learning goals met — above the provincial average',
              ].map(point => (
                <li key={point} className="flex items-start gap-3 text-text2 text-base">
                  <span className="text-accent mt-0.5 flex-shrink-0">✓</span>
                  {point}
                </li>
              ))}
            </ul>
          </div>

          {/* Right — metric cards */}
          <div className="grid grid-cols-2 gap-4">
            {IMPACT_METRICS.map(m => (
              <Card key={m.label} className="text-center">
                <p className="font-serif text-[36px] font-bold text-accent mb-1">{m.value}</p>
                <p className="text-sm text-text2 leading-[1.5]">{m.label}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA strip ── */}
      <section
        className="text-white py-[60px] px-10 text-center"
        style={{ background: 'linear-gradient(135deg, #1B4332, #2C6E49)' }}
      >
        <h2 className="font-serif text-[36px] mb-4">Ready to Bridge the Gap?</h2>
        <p className="text-md opacity-85 max-w-[520px] mx-auto mb-8 leading-[1.65]">
          Join 47 Ontario schools already using RECESS to connect families and support student success.
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <Link href="/register"><Button variant="hero-main" size="lg">Join School</Button></Link>
          <Link href="/workshops"><Button variant="hero-sec" size="lg">Book Workshop</Button></Link>
          <Link href="/curriculum"><Button variant="hero-sec" size="lg">Explore Curriculum</Button></Link>
        </div>
      </section>

      {/* ── Language bar ── */}
      <div className="bg-surface border-t border-border px-6 py-2 flex items-center gap-2 text-sm text-text2 flex-wrap">
        <span>🌐 Available in:</span>
        {LANGUAGES.map((lang, i) => (
          <span key={lang}>
            <button className="text-accent font-semibold hover:underline cursor-pointer">{lang}</button>
            {i < LANGUAGES.length - 1 && <span className="text-border ml-2">·</span>}
          </span>
        ))}
      </div>
    </div>
  )
}
