import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About RECESS',
  description: 'RECESS connects Ontario K–8 families and schools for better student outcomes.',
};

export default function AboutPage() {
  return (
    <div id="main-content" className="pt-nav min-h-screen bg-bg">

      {/* Hero Banner */}
      <section className="bg-gradient-to-br from-[#2C6E49] to-[#52B788] text-white py-16 px-4">
        <div className="max-w-[1100px] mx-auto text-center">
          <span className="inline-block bg-white/20 text-white text-sm font-sans font-medium px-4 py-1.5 rounded-full mb-6 tracking-wide">
            🍁 Ontario-built
          </span>
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-3 leading-tight">
            About RECESS
          </h1>
          <p className="font-sans text-sm md:text-base font-semibold uppercase tracking-[0.12em] text-white/80 mb-5">
            Responsive Engagement Connecting Every Student&apos;s Stakeholder
          </p>
          <p className="font-sans text-lg md:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
            We believe every family deserves a real window into their child's education — regardless of language, background, or schedule.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 px-4">
        <div className="max-w-[1100px] mx-auto">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#1A1814] mb-8">
              Why RECESS exists
            </h2>
            <div className="space-y-5 font-sans text-[#5C5649] text-lg leading-relaxed text-left">
              <p>
                Research is clear: when parents are engaged in their child's education, students do better — in grades, in confidence, and in long-term outcomes. But most school communication tools weren't built for today's families. They assume reliable internet, fluency in English, and schedules that have room for school newsletters and parent portal logins.
              </p>
              <p>
                That's a gap that falls hardest on newcomer and immigrant families — the parents who, in many ways, are working hardest for their children's futures. RECESS was built to fix that.
              </p>
              <p>
                It started as a pilot at three Toronto schools in 2023. Since then it has grown to 47 schools across Ontario. The goal has always been simple: make parent engagement easy, accessible, and genuinely useful — for every family, not just the ones the system already works for.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 bg-[#F0EDE6]">
        <div className="max-w-[1100px] mx-auto">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#1A1814] text-center mb-14">
            How it works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: '1',
                heading: 'Get your access code',
                body: 'Your school gives you a unique RECESS access code — at registration, in a welcome letter, or directly from your child\'s teacher.',
              },
              {
                step: '2',
                heading: 'Create your account',
                body: 'Sign up in minutes. Choose your language, add your children, and you\'re in. No paper forms. No waiting.',
              },
              {
                step: '3',
                heading: 'Stay connected',
                body: 'See your child\'s progress, message teachers directly, get real-time updates, and access everything your school shares — all in one place.',
              },
            ].map(({ step, heading, body }) => (
              <div key={step} className="bg-white rounded-2xl p-8 shadow-sm border border-[#E2DDD4] flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-[#2C6E49] text-white font-serif text-xl font-bold flex items-center justify-center mb-5 shrink-0">
                  {step}
                </div>
                <h3 className="font-serif text-xl font-bold text-[#1A1814] mb-3">{heading}</h3>
                <p className="font-sans text-[#5C5649] leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 px-4">
        <div className="max-w-[1100px] mx-auto">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#1A1814] text-center mb-14">
            What we stand for
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: '🔒',
                title: 'Private by design',
                body: 'No ads. No data selling. Your family\'s information stays between you, your school, and RECESS. Full stop.',
              },
              {
                icon: '🌍',
                title: 'Built for everyone',
                body: 'Available in 9 languages. Designed with newcomer families and immigrant parents in mind — and for anyone who found previous tools hard to navigate.',
              },
              {
                icon: '🎓',
                title: 'Student-first',
                body: 'Every feature exists to support student success. Not engagement metrics. Not advertising revenue. Students.',
              },
            ].map(({ icon, title, body }) => (
              <div
                key={title}
                className="bg-[#F0EDE6] rounded-2xl p-8 border border-[#E2DDD4]"
              >
                <div className="text-4xl mb-5">{icon}</div>
                <h3 className="font-serif text-xl font-bold text-[#1A1814] mb-3">{title}</h3>
                <p className="font-sans text-[#5C5649] leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Numbers */}
      <section className="py-16 px-4 bg-[#2C6E49]">
        <div className="max-w-[1100px] mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
            {[
              { number: '47', label: 'Partner Schools' },
              { number: '12,400+', label: 'Families Connected' },
              { number: '3,100', label: 'Newcomer Families Supported' },
              { number: '98%', label: 'Parent Satisfaction' },
            ].map(({ number, label }) => (
              <div key={label}>
                <div className="font-serif text-4xl md:text-5xl font-bold mb-2">{number}</div>
                <div className="font-sans text-white/80 text-sm leading-snug">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-20 px-4 bg-[#F0EDE6]">
        <div className="max-w-[1100px] mx-auto">
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-2xl p-10 md:p-14 shadow-sm border border-[#E2DDD4] relative">
              <div className="text-[#52B788] text-7xl font-serif leading-none mb-6 select-none" aria-hidden="true">
                &ldquo;
              </div>
              <blockquote className="font-serif text-2xl md:text-3xl text-[#1A1814] leading-relaxed mb-8">
                When we moved from Somalia, I had no idea how to talk to my daughter's teacher or what the report cards meant. RECESS explained everything — in a way I could understand. Now I feel like I'm actually part of her education.
              </blockquote>
              <div className="font-sans text-[#5C5649]">
                <span className="font-semibold text-[#1A1814]">Fatuma Abdi</span>
                <span className="mx-2 text-[#95D5B2]">·</span>
                Parent · Grade 3 · Maple Ridge PS
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 px-4">
        <div className="max-w-[1100px] mx-auto">
          <div className="text-center mb-14">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#1A1814] mb-5">
              Built in Ontario, for Ontario
            </h2>
            <p className="font-sans text-[#5C5649] text-lg leading-relaxed max-w-2xl mx-auto">
              RECESS is a small team of educators, designers, and parents based in Toronto. We work directly with school boards, settlement agencies, and parent councils to make sure the platform reflects real family needs.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Priya Sharma',
                role: 'Co-founder & CEO',
                bio: 'Former elementary school principal with 14 years in the TDSB. Priya built RECESS because she saw the same communication gap in every school she led.',
                initials: 'PS',
              },
              {
                name: 'Daniel Osei',
                role: 'Co-founder & CTO',
                bio: 'Built edtech tools for 10 years and is a parent of two Maple Ridge students. Daniel knows what a parent portal should actually feel like to use.',
                initials: 'DO',
              },
              {
                name: 'Anika Patel',
                role: 'Head of Community',
                bio: 'Works with newcomer settlement agencies across the GTA. Anika makes sure RECESS stays grounded in the realities of the families it serves.',
                initials: 'AP',
              },
            ].map(({ name, role, bio, initials }) => (
              <div
                key={name}
                className="bg-[#F0EDE6] rounded-2xl p-8 border border-[#E2DDD4] flex flex-col items-center text-center"
              >
                <div className="w-16 h-16 rounded-full bg-[#52B788] text-white font-serif text-xl font-bold flex items-center justify-center mb-5 shrink-0">
                  {initials}
                </div>
                <h3 className="font-serif text-xl font-bold text-[#1A1814] mb-1">{name}</h3>
                <p className="font-sans text-sm text-[#2C6E49] font-medium mb-4">{role}</p>
                <p className="font-sans text-[#5C5649] leading-relaxed text-sm">{bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-20 px-4 bg-[#2C6E49]">
        <div className="max-w-[1100px] mx-auto text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mb-5">
            Ready to get connected?
          </h2>
          <p className="font-sans text-white/80 text-lg mb-10 max-w-xl mx-auto">
            Join thousands of Ontario families already using RECESS to stay close to their child's education.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/register"
              className="inline-block bg-white text-[#2C6E49] font-sans font-semibold px-8 py-4 rounded-xl text-base hover:bg-[#F0EDE6] transition-colors"
            >
              Join Your School
            </Link>
            <Link
              href="/workshops"
              className="inline-block bg-transparent border-2 border-white text-white font-sans font-semibold px-8 py-4 rounded-xl text-base hover:bg-white/10 transition-colors"
            >
              Book a Workshop
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
