import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy — BridgeED',
  description: 'How BridgeED collects, uses, and protects your family\'s information.',
}

export default function PrivacyPage() {
  return (
    <div id="main-content" className="pt-nav min-h-screen bg-bg">
      <div className="max-w-[760px] mx-auto px-6 py-14">

        {/* Header */}
        <div className="mb-10">
          <Link href="/" className="text-sm text-accent font-semibold hover:underline">← Back to BridgeED</Link>
          <h1 className="font-serif text-[42px] text-text mt-4 mb-2">Privacy Policy</h1>
          <p className="text-text3 text-sm">Last updated: May 2026</p>
          <p className="text-text2 text-md leading-[1.75] mt-4">
            BridgeED is built for Ontario families. We take your privacy seriously and will always
            be straightforward about what we collect, how we use it, and who can see it.
            We do not show ads. We do not sell your data. Ever.
          </p>
        </div>

        <div className="space-y-10 text-text2">

          <section>
            <h2 className="font-serif text-2xl text-text mb-4">1. What information we collect</h2>
            <p className="leading-[1.75] mb-3">When you create a BridgeED account, we collect:</p>
            <ul className="list-disc list-inside space-y-2 leading-[1.75] ml-2">
              <li>Your name and email address</li>
              <li>Your role (parent, teacher, or administrator)</li>
              <li>Your school, identified by the access code you entered during registration</li>
              <li>Your child&apos;s name and grade (provided by your school)</li>
              <li>Messages you send to or receive from teachers through the platform</li>
              <li>Your notification and language preferences</li>
            </ul>
            <p className="leading-[1.75] mt-3">
              We do not collect payment information (workshops are booked by inquiry), location data,
              browsing history, or any information beyond what is needed to run the platform.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-text mb-4">2. How we use your information</h2>
            <p className="leading-[1.75] mb-3">We use your information to:</p>
            <ul className="list-disc list-inside space-y-2 leading-[1.75] ml-2">
              <li>Show you your child&apos;s grades, attendance, and teacher feedback</li>
              <li>Enable secure messaging between parents and teachers</li>
              <li>Send you notifications about new messages, school events, and upcoming workshops</li>
              <li>Provide curriculum guidance tailored to your child&apos;s grade</li>
              <li>Improve the platform based on how features are used (aggregate, anonymised data only)</li>
            </ul>
            <p className="leading-[1.75] mt-3">
              We do not use your information for advertising, profiling, or any purpose outside of
              providing the BridgeED service to you and your school.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-text mb-4">3. Who can see your information</h2>
            <div className="bg-surface border border-border rounded-lg p-5 space-y-3">
              {[
                { who: 'You',                      what: 'Can see all of your own account information and your child\'s progress data.' },
                { who: 'Your child\'s teacher',    what: 'Can see messages you send them and your child\'s progress data for their class only.' },
                { who: 'Your school administrator', what: 'Can see account registration data and school-wide engagement summaries. They cannot read your private messages.' },
                { who: 'BridgeED staff',            what: 'Access only for technical support and only when necessary. We never read private messages unless required by law.' },
                { who: 'Third parties',             what: 'Never. We do not share, sell, or rent your information to anyone.' },
              ].map(row => (
                <div key={row.who} className="flex gap-3 text-sm">
                  <span className="font-semibold text-text w-40 flex-shrink-0">{row.who}</span>
                  <span className="text-text2 leading-[1.65]">{row.what}</span>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-text mb-4">4. How we protect your data</h2>
            <p className="leading-[1.75] mb-3">
              BridgeED uses Google Firebase infrastructure, which provides enterprise-grade security
              including encryption in transit (TLS) and encryption at rest. We comply with Ontario&apos;s
              Freedom of Information and Protection of Privacy Act (FIPPA) and Canada&apos;s PIPEDA.
            </p>
            <p className="leading-[1.75]">
              Student data is never used to train AI models. AI-generated progress summaries are produced
              from your child&apos;s grade data only, and are never stored in a way that is shared with
              Anthropic or any third party.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-text mb-4">5. Your rights</h2>
            <p className="leading-[1.75]">
              You can access, correct, or delete your BridgeED account and data at any time.
              To make a request, email us at{' '}
              <a href="mailto:hello@bridgeed.ca" className="text-accent font-semibold hover:underline">
                hello@bridgeed.ca
              </a>{' '}
              and we will respond within 5 business days. If your school leaves BridgeED, your account
              data will be deleted within 30 days unless you request otherwise.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-text mb-4">6. Children&apos;s privacy</h2>
            <p className="leading-[1.75]">
              BridgeED is designed for parents and guardians, not for children to use directly.
              We do not knowingly collect personal information from children under 13.
              Student data (grades, attendance, learning goals) is provided by the school and
              is accessible only to the parent or guardian linked to that student.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-text mb-4">7. Cookies</h2>
            <p className="leading-[1.75]">
              We use a session cookie to keep you logged in. We do not use advertising cookies,
              tracking pixels, or third-party analytics cookies. You can clear your cookies at any time
              through your browser settings — this will sign you out of BridgeED.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-text mb-4">8. Contact us</h2>
            <p className="leading-[1.75]">
              If you have any questions about this Privacy Policy, please contact us at:
            </p>
            <div className="bg-surface border border-border rounded-lg p-5 mt-3 text-sm space-y-1">
              <p><span className="font-semibold text-text">Email:</span> <a href="mailto:hello@bridgeed.ca" className="text-accent hover:underline">hello@bridgeed.ca</a></p>
              <p><span className="font-semibold text-text">Phone:</span> 1-888-BRIDGE-ED</p>
              <p><span className="font-semibold text-text">Mail:</span> 120 Adelaide Street West, Suite 800, Toronto, ON M5H 1T1</p>
            </div>
          </section>
        </div>

        {/* Footer note */}
        <div className="mt-12 pt-8 border-t border-border">
          <p className="text-sm text-text3 text-center">
            BridgeED does not show ads. We do not sell your data. Ever.
          </p>
          <div className="flex justify-center gap-6 mt-4 text-sm">
            <Link href="/terms" className="text-accent hover:underline">Terms of Service</Link>
            <Link href="/" className="text-accent hover:underline">Back to BridgeED</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
