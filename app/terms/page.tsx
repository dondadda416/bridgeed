import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service — BridgeED',
  description: 'BridgeED terms of service for parents, guardians, and school staff.',
}

export default function TermsPage() {
  return (
    <div id="main-content" className="pt-nav min-h-screen bg-bg">
      <div className="max-w-[760px] mx-auto px-6 py-14">

        <div className="mb-10">
          <Link href="/" className="text-sm text-accent font-semibold hover:underline">← Back to BridgeED</Link>
          <h1 className="font-serif text-[42px] text-text mt-4 mb-2">Terms of Service</h1>
          <p className="text-text3 text-sm">Last updated: May 2026</p>
          <p className="text-text2 text-md leading-[1.75] mt-4">
            These terms explain what BridgeED is, what you can do with it, and what we ask of you.
            We&apos;ve written them in plain language so they&apos;re actually readable.
          </p>
        </div>

        <div className="space-y-10 text-text2">

          <section>
            <h2 className="font-serif text-2xl text-text mb-4">1. Who this is for</h2>
            <p className="leading-[1.75]">
              BridgeED is a parent engagement platform for Ontario K–8 schools. It is designed for
              parents, guardians, teachers, and school administrators. By creating an account, you
              confirm that you are a parent or guardian of a student enrolled at an Ontario K–8 school,
              or a school staff member authorized by your school to use the platform.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-text mb-4">2. Your account</h2>
            <p className="leading-[1.75] mb-3">
              You are responsible for keeping your login credentials secure. Do not share your password
              with anyone, including your child&apos;s teacher or school staff. BridgeED will never ask
              for your password by email or phone.
            </p>
            <p className="leading-[1.75]">
              One account per person. If you have multiple children at the same school, they can all
              be linked to your single parent account.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-text mb-4">3. What you can and can&apos;t do</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-[#D1FAE5] border border-[#6EE7B7] rounded-lg p-4">
                <p className="font-semibold text-[#065F46] mb-3">✓ You can</p>
                <ul className="space-y-2 text-sm text-[#065F46] leading-[1.65]">
                  <li>View your child&apos;s grades, attendance, and learning goals</li>
                  <li>Send and receive messages with your child&apos;s teacher</li>
                  <li>Browse and book parent education workshops</li>
                  <li>Access curriculum guides and home learning tips</li>
                  <li>Update your notification and language preferences</li>
                </ul>
              </div>
              <div className="bg-[#FEE2E2] border border-[#FCA5A5] rounded-lg p-4">
                <p className="font-semibold text-[#991B1B] mb-3">✗ You can&apos;t</p>
                <ul className="space-y-2 text-sm text-[#991B1B] leading-[1.65]">
                  <li>Share your login with anyone else</li>
                  <li>Attempt to access another family&apos;s data</li>
                  <li>Send harmful, abusive, or threatening messages</li>
                  <li>Use BridgeED for commercial or advertising purposes</li>
                  <li>Attempt to reverse-engineer or copy the platform</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-text mb-4">4. School access codes</h2>
            <p className="leading-[1.75]">
              Access codes (e.g., MAPLE-2024) are issued by your school and tie your account to your
              school&apos;s data. Access codes are confidential — do not share them publicly or on social
              media. Misuse of an access code, including using one you were not given, will result in
              immediate account removal and may be reported to your school.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-text mb-4">5. Workshop bookings</h2>
            <p className="leading-[1.75]">
              Workshop bookings are subject to availability and confirmed within 24 hours of your inquiry.
              Cancellations must be made at least 48 hours before the scheduled workshop date.
              Late cancellations may result in a cancellation fee as outlined in your booking confirmation.
              BridgeED reserves the right to reschedule workshops due to facilitator availability or
              minimum attendance requirements.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-text mb-4">6. Limitation of liability</h2>
            <p className="leading-[1.75]">
              BridgeED provides information and communication tools to support parent engagement.
              Student progress data shown on the platform is sourced from your school and may not
              reflect the most recent updates from your child&apos;s teacher. For official academic
              decisions — including grades, promotions, IEPs, and support plans — always follow your
              school&apos;s official communications and speak directly with your child&apos;s teacher or principal.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-text mb-4">7. Changes to these terms</h2>
            <p className="leading-[1.75]">
              If we make material changes to these terms, we will notify you by email at least 14 days
              before the changes take effect. Continued use of BridgeED after that date constitutes
              acceptance of the updated terms. If you disagree with changes, you can delete your account
              at any time by emailing hello@bridgeed.ca.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-text mb-4">8. Contact</h2>
            <p className="leading-[1.75] mb-3">
              Questions about these terms? Contact us:
            </p>
            <div className="bg-surface border border-border rounded-lg p-5 text-sm space-y-1">
              <p><span className="font-semibold text-text">Email:</span> <a href="mailto:hello@bridgeed.ca" className="text-accent hover:underline">hello@bridgeed.ca</a></p>
              <p><span className="font-semibold text-text">Phone:</span> 1-888-BRIDGE-ED</p>
              <p><span className="font-semibold text-text">Mail:</span> 120 Adelaide Street West, Suite 800, Toronto, ON M5H 1T1</p>
            </div>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex justify-center gap-6 text-sm">
            <Link href="/privacy" className="text-accent hover:underline">Privacy Policy</Link>
            <Link href="/" className="text-accent hover:underline">Back to BridgeED</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
