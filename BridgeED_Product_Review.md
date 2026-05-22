# BridgeED — Product Strategy & UX Review
**Prepared for:** JP Copeland / BridgeED Team
**Date:** May 2026
**Reviewer lens:** Senior Product Strategist · UX/UI Designer · Accessibility Specialist · SaaS QA Reviewer
**Scope:** Parent Engagement MVP — admin and school management tools treated as future paid tier

---

## Executive Summary

BridgeED is a genuinely differentiated product with a compelling mission and a real gap in the Ontario K–8 market. The design is polished, the workshop catalogue is original, and the newcomer/multilingual focus gives it a lane that no major competitor occupies. However, in its current form, BridgeED reads more like a school administration portal than a family engagement app. The navigation exposes Teacher Dashboards and Admin Portals to parents, the dashboards are chart-heavy and data-dense in ways that assume data literacy most parents don't have, and there is no onboarding, no privacy explanation, and no mobile navigation to speak of. The product has all the right ingredients — they just need to be reorganized around a single clear user: the busy Ontario parent who wants to know "How is my kid doing, and what can I do?" If that question is answered cleanly, BridgeED has a genuine shot at becoming the default family engagement layer for Ontario schools.

---

## Positioning Statement

**"BridgeED gives every Ontario parent — including newcomer families — a clear, simple window into their child's school life: progress updates, direct teacher messages, curriculum support, and community workshops, all in one app built for families, not administrators."**

---

## 1. Core Product Focus

### Is the parent engagement purpose immediately clear?
Partially. The hero headline ("Connecting Schools & Families for Student Success") is good and the feature cards reinforce the parent angle. But the moment a parent looks at the navigation bar, they see **Teacher Dashboard** and **Admin Portal** listed as top-level items. This immediately signals "this is a school tool" — not a family app. Trust and clarity are lost in the nav before the hero even finishes loading.

### Does the app feel focused on parents?
No. The current experience is a hybrid portal that tries to serve parents, teachers, and admins simultaneously from the same navigation. This is a classic SaaS mistake — you end up with a product that feels unfocused to everyone.

### Which features should stay in the parent MVP?
- Student progress view (simplified)
- Parent-teacher messaging
- Calendar & school announcements
- Ontario Curriculum guide
- Workshop browsing + booking inquiry
- Newcomer support section
- Multilingual UI (English + French at minimum for MVP)
- Account registration with school access code
- Email notification opt-in

### Which features should move to a paid/premium school tier?
- Admin Portal (all of it — analytics, user management, financials)
- Teacher Dashboard (classroom management, class charts, intervention tools)
- School-wide reporting
- Financial/revenue reporting
- Workshop revenue tracking
- Data export tools
- Broadcast notification controls

### What should BridgeED be known for in one sentence?
**"The app Ontario parents actually use to stay involved in their child's school life — especially families who've never had that access before."**

---

## 2. Parent Journey and User Flow

### Would a first-time parent know what to do after landing?
No. There is no onboarding. After registering, a parent lands on a dashboard with six charts and progress rings and no explanation of what they're looking at. A first-time user has no guided path. This is a significant launch risk — parents will abandon and not return.

**Fix:** Add a 3-step post-registration onboarding flow: (1) Link your child by student ID or teacher code, (2) Set your notification preferences, (3) Here's what's on your dashboard. Done. Three screens, 60 seconds.

### Is the path from homepage to key features clear?
The navigation labels are technically accurate but not parent-first. "Student Progress" is fine. "Ontario Curriculum" is slightly jargony — most parents would search for "what is my kid learning" not "Ontario Curriculum." "Messaging" is fine. "Calendar" is fine. "Workshops" is fine.

**Fix:** Rename "Ontario Curriculum" → "Learning Guide." Remove "Teacher Dashboard" and "Admin Portal" from parent nav entirely.

### Are there too many navigation options?
Yes. 11 tabs is too many for any app. On a phone, they overflow — there is currently no hamburger menu, which means mobile users see a broken nav. For a parent MVP, 6–7 items is the ceiling.

**Recommended parent nav:**
> Home | My Child | Messages | Calendar | Workshops | Resources | Help

### What would make a parent come back weekly?
- A digest-style notification: "Here's what happened at school this week for Aisha"
- A visible unread message badge
- A "this week's homework" summary on the dashboard
- Curriculum tip of the week ("Here's what Grade 4 is working on in Math right now")
- Workshop reminder 48 hours before a booking

---

## 3. Parent Dashboard

### Does the dashboard show the most useful information first?
No. It leads with abstract metrics (Overall Average: 82%, Attendance: 96%) without context. Most parents don't have a baseline — they don't know if 82% is good, expected, or concerning for Grade 4. The data exists but it doesn't communicate.

### Are metrics meaningful?
Not yet. "Learning Goals: 4/5" means nothing without explaining what the 5 goals are. "Assignments Due: 3, 2 submitted" is more useful but is buried as a small metric card.

**Fix:** Replace raw metrics with plain-language status cards:
- ✅ "Aisha is on track this term" (not "Overall Average: 82%")
- 📬 "You have 3 unread messages from Ms. Johnson"
- 📋 "1 assignment due Friday"
- 📅 "Parent-Teacher interviews are Nov 28 — book your spot"

### Are the 6 charts and progress rings appropriate for parents?
No. Six subject rings + a bar chart + a line chart + a radar chart is dashboard overload. This is what a teacher or principal needs to see. A parent needs to see whether their child is doing well, and what specifically to pay attention to.

**Fix for MVP dashboard:**
- Keep: Subject grade cards (simple — subject name, letter grade, one-line teacher note)
- Keep: Attendance indicator
- Keep: "Teacher Feedback" section (most valuable content on the current dashboard)
- Remove for MVP: Bar chart, trend line chart, progress rings (move to a "Detailed View" sub-page)
- Remove for MVP: Radar chart (no parent knows what to do with a math radar chart)

### How should the dashboard work for multiple children?
The current child switcher (Aisha / Marcus in the sidebar) is the right concept. But it needs to be more prominent — a tab or pill selector at the top of the main content area, not buried in a sidebar that collapses on mobile.

---

## 4. Communication and Engagement

### Evaluate the messaging experience.
The messaging UI is one of the best parts of the prototype — the thread list, chat bubbles, and send-on-enter flow are all appropriate. The design clearly differentiates teacher vs. parent messages. This is solid.

**Gaps:**
- No read receipts (parents don't know if a teacher has seen their message)
- No character limit or guidance ("Teachers typically respond within 2 school days")
- No file attachment UI (exists in the data model, not the UI)
- No "new conversation" flow — who can a parent initiate a message with?
- No message archiving or search

### Are announcements easy to find?
They're in the Calendar page's right panel, which is reasonable, but they're not surfaced on the dashboard. A parent who never navigates to Calendar will miss them entirely.

**Fix:** Add an "Announcements" card on the parent dashboard — top 2 school announcements, with a "See all" link to Calendar.

### What notification features are missing?
- Email notifications for new messages (critical — this is what drives re-engagement)
- Push notifications for assignment due dates
- Calendar event reminders (24h before)
- Weekly digest email
- Workshop booking confirmation + reminder

### Messaging safeguards to build in?
- Clearly communicate expected response time (set teacher expectations)
- Hours-of-service indicator ("Ms. Johnson is typically available Mon–Fri, 8am–4pm")
- A "report a concern" escalation path that goes to admin, not just the teacher
- No direct student-to-teacher messaging for K–8 (parents only)

---

## 5. Curriculum and Learning Support

### Is it written in parent-friendly language?
Mostly yes — the "Help at Home" tips are the strongest part of this section and genuinely useful. The curriculum topic descriptions ("Multi-digit multiplication, fractions & decimals, data management") are accurate but feel like a syllabus, not parent guidance.

**Fix:** Lead with the "Help at Home" tip, not the topic list. Parents care more about what they can do than what the curriculum officially contains.

### What would make this section more practical?
- Organize by child profile, not just grade — "Here's what Aisha's class is working on right now" (requires teacher data input)
- Add a "What to ask your child" prompt for each subject (e.g., "Ask Aisha: What fraction of our pizza did we each eat?")
- Add a "Resources" link per subject (Khan Academy, library programs, etc.)
- Seasonal relevance — curriculum tips that match the current term

### Should it be organized by grade, subject, skill, or child profile?
For MVP: grade (already implemented, good enough).
For V2: child profile — parents shouldn't have to figure out which grade tab to click. "Aisha is in Grade 4 — here's her curriculum" should be the default.

---

## 6. Workshops and Parent Education

### Are workshops clearly connected to parent engagement?
Yes — the workshop catalogue is genuinely differentiated. No competitor offers structured, bookable, in-school parent education workshops at this level. This is a real wedge.

### Which workshops are most valuable for the MVP?
1. **Navigating the System** (newcomer focus — highest unmet need)
2. **School Engaging Parents** (core product alignment)
3. **Understanding Social Media** (high relevance for Grades 4–8 families)
4. **Bullying is Wack** (student-facing, but parents want this for their kids)

### Which could become premium later?
- **Grant Writing Secrets** (valuable but niche — school councils, not individual parents)
- **School Council Breakdown** (same — leadership audience, not general parent)

### How should booking, reminders, and follow-up work?
- **Booking:** Simple inquiry form for MVP (name, school, preferred date, email) — no payment required yet
- **Confirmation:** Automated email confirmation within 24h (SendGrid)
- **Reminder:** Email 48h before workshop
- **Follow-up:** Post-workshop resource PDF emailed automatically
- **Waitlist:** Collect email if date is full — notify when a spot opens

---

## 7. Newcomer and Multilingual Family Support

### Does the app feel welcoming for newcomer families?
In intent, yes. In execution, not yet. The language bar at the bottom of the homepage is well-placed, but clicking a language currently does nothing. For newcomer parents, discovering that the translation button doesn't work is worse than not having it — it breaks trust immediately.

### Where should language options appear?
- Top of the registration page ("Choose your language / Choisissez votre langue / اختر لغتك")
- Persistently in the nav (a globe icon → language picker, not buried in the footer)
- On the Curriculum page, next to the grade selector
- On every workshop card that offers multilingual delivery

### What barriers might newcomer parents face?
- Registration requiring a "school access code" — many newcomer parents won't have received this or won't know what it means. Needs plain-language explanation: "Your school gave you a code that looks like MAPLE-2024. Can't find it? Call your school office."
- Legal/formal language in the app — parents from countries with authoritarian school systems may distrust a digital platform requesting their child's data
- Emoji-heavy UI can be misread across cultures
- Date formats (November 12 vs. 12/11 vs. ١٢ نوفمبر) need localization, not just translation

### What features would build confidence?
- A "New to Ontario Schools?" landing section explaining the school year, grade structure, report cards, and EQAO — in plain language, in 9 languages
- A "Talk to Someone" button that connects to a settlement worker or school staff member
- Phone number displayed prominently (1-888-BRIDGE-ED) — many newcomer parents prefer phone to digital
- Success stories from newcomer parents (the Fatuma Abdi testimonial on About Us is exactly right — put this on the home page)

---

## 8. Visual Design and Brand

### Does the design feel warm, trustworthy, and appropriate for families?
Mostly yes. The forest green palette reads as trustworthy and distinctly Canadian without being cold. DM Serif Display gives it warmth and authority. The card-based layout is clean and modern. This is genuinely good design work.

### Does it feel like a parent app or an admin portal?
It feels like a well-designed admin portal. The density of charts, tables, and data panels is the primary issue — not the aesthetic. The visual system is right; the content hierarchy is wrong.

### Specific design issues:
- **Text3 colour (#9A9186)** on white background likely fails WCAG AA contrast ratio for small text — needs to be darkened to at least #6B6358 minimum
- **Progress rings:** Beautiful, but not the right UX pattern for parents. A coloured grade card (A/B/C with plain label) communicates faster.
- **Metric cards:** The 3px coloured top bar is a subtle and elegant pattern — keep it, but make the metric values themselves speak in plain language
- **Modal overlays:** Login/Join modals just redirect to pages — the modals add a click without adding value. Skip the modal, link directly.
- **CTA buttons:** "Explore Dashboard" on the hero should be "See Your Child's Progress" — more specific, more parent-relevant
- **Teacher Dashboard button in nav is dark green (active state sometimes)** — parents should never accidentally land there

### Suggested quick design wins:
- Warmer hero: Add a subtle image or illustration of a parent and child (not a stock photo — an illustrated avatar system)
- Replace the six-ring dashboard section with three plain grade cards for MVP
- Add a persistent "back to my child" breadcrumb inside any sub-page
- Round the logo mark slightly more — it reads as corporate, not family-friendly at small sizes

---

## 9. Mobile-First Experience

### Would the current app work on phones?
No, not adequately. The primary issues:

- **Navigation:** 11 tabs overflow horizontally. There is no hamburger menu. On a 375px screen, most nav items are cut off and require scrolling — parents will miss items entirely.
- **Sidebar layout:** The parent and teacher dashboards use a 240px sidebar + main content two-column grid. On mobile, the sidebar is `display:none` — so all sidebar navigation (child switcher, attendance, assignments, etc.) disappears.
- **Charts:** Chart.js charts at 200px height work on mobile but require two-thumb pinch to read labels. The class bar chart with 12 student names is unreadable on a phone.
- **Calendar:** The 7-column calendar grid with event chips compresses to near-unusable on 375px width.
- **Messaging:** The two-column message layout collapses correctly (thread sidebar hides), but there's no way to navigate back to the thread list from a chat on mobile.

### What should be redesigned for mobile?
1. Nav → hamburger menu (max 6 items visible)
2. Dashboard → single column, cards stacked vertically, no charts on mobile (show summary text instead)
3. Calendar → switch to a list view (upcoming events) as the default on mobile
4. Messaging → standard mobile chat pattern: thread list → tap to open → back button to return

### What should be available in 1–2 taps from the home screen?
1. My child's grades (tap: My Child)
2. Unread messages (tap: Messages, badge shows count)
3. This week's events (tap: Calendar)
4. Quick contact: "Message a teacher" (one tap from dashboard)

---

## 10. Accessibility and Inclusion

### Colour contrast issues:
- `--text3: #9A9186` on `--bg: #F7F5F0` = **3.1:1 contrast ratio** — fails WCAG AA for body text (requires 4.5:1). Used extensively on labels and metadata. Must darken.
- Green on green (accent3 badge on surface) — check contrast for the tag/pill system
- Dark mode variant `--text3: #6B6358` on `--bg: #1A1814` — borderline, needs audit

### Font size issues:
- `--text-xs: 11px` is used for labels, metadata, and form hints. 11px is below the recommended minimum of 16px for body and 14px for secondary text. Increase minimum to 13px, remove 11px from body copy.
- Progress ring percentage labels at 14px SVG text need to meet contrast requirements

### Cognitive load issues:
- Dashboard has 4 metric cards + 2 charts + 6 rings + teacher feedback = 13+ distinct data points before a parent has scrolled. Reduce to 5 maximum above the fold.
- Navigation labels like "Ontario Curriculum" assume knowledge of the term. "Learning Guide" or "What My Child Is Learning" is more accessible.

### Missing accessibility features:
- No skip-to-main-content link (keyboard navigation essential)
- No `aria-live` regions for messaging (screen readers won't announce new messages)
- No `aria-label` on icon-only buttons
- Progress ring SVG elements need `role="img"` and `aria-label`
- Form inputs need `autocomplete` attributes for mobile autofill
- No visible focus state on custom nav buttons (default outline removed in CSS)

### Guided onboarding for low-tech-confidence parents:
- Add tooltips on first dashboard visit ("This shows Aisha's average grade across all subjects")
- Offer a "Guided Tour" button (3–4 highlights, dismissable)
- Plain-language glossary: "What is a Learning Goal?" "What is an IEP?" linked from relevant sections

---

## 11. Trust, Privacy, and Student Data

### What's missing?
This is the most significant launch blocker. The current app has:
- No privacy policy page
- No terms of service page
- No data consent explanation during registration
- No explanation of what student data is collected, stored, or shared
- No explanation of who can see a parent's messages
- No cookie consent banner (required under PIPEDA)
- No explanation of Firebase data residency (Canadian parents will ask if their data is stored in Canada)

### What parents need to trust the platform:
- "Your child's data stays private. Here's exactly what we store and who can see it." (Plain language, not legalese)
- A clear statement that BridgeED does not sell data and does not show ads
- Explanation that messages are private between the parent and teacher only
- Description of what happens to data when a school stops using BridgeED

### What schools need before inviting families:
- A school administrator agreement / data processing agreement
- FIPPA compliance statement (Ontario Freedom of Information and Protection of Privacy Act)
- Confirmation that student data is not used for training AI models
- A named Data Protection contact

### Immediate actions:
1. Add `/privacy` and `/terms` pages before any public launch
2. Add a checkbox at registration: "I agree to the Privacy Policy and Terms of Service"
3. Add a cookie consent banner (a simple one — not a GDPR wall)
4. Add "Your data is protected under Ontario FIPPA" to the registration page

---

## 12. MVP vs. Paid Tier

### A. Parent Engagement MVP (ship this)
| Feature | Notes |
|---|---|
| Registration + school access code | Working in scaffold |
| Parent dashboard (simplified) | 3 metrics, grade cards, teacher feedback — no charts |
| Student progress page | Simplified version — grades + attendance + reading level |
| Parent-teacher messaging | Core feature — ship early |
| Calendar & announcements | Existing design is good |
| Ontario Curriculum guide (K–8) | Rename to "Learning Guide" |
| Workshop browsing + inquiry booking | No payment needed for MVP |
| Newcomer support section | "New to Ontario Schools?" standalone page |
| Email notifications | New message alerts + weekly digest |
| Multilingual UI | English + French at launch minimum |
| Privacy policy + terms | Non-negotiable before public launch |
| Mobile-responsive nav | Hamburger menu, single-column dashboard |
| Onboarding flow (3 screens) | Show after registration |

### B. Nice-to-Have Later (V2)
| Feature | Notes |
|---|---|
| AI progress insights (Claude API) | Expensive per-call — add after validating core engagement |
| Dark mode | Nice, not essential |
| PDF report card export | V2 |
| Parent meeting scheduler | Requires teacher availability data |
| Assignment submission portal | Teacher-side complexity, not MVP |
| Push notifications (FCM) | Email first, then push |
| Multi-language beyond EN/FR | Arabic, Chinese, Punjabi next |
| Downloadable curriculum PDFs | Generate per-grade, V2 |
| Workshop ratings & reviews | After 6 months of bookings |

### C. Paid/Premium School Tier
| Feature | Notes |
|---|---|
| Admin Portal | School analytics, financial reports, user management |
| Teacher Dashboard | Classroom management, class charts, intervention tools |
| School-wide attendance reporting | Board-level feature |
| Data export (CSV/Excel) | Admin tool |
| Broadcast notifications | Admin sends school-wide alerts |
| Multi-school management | Board/district level |
| Workshop revenue tracking | Financial reporting |
| Grant Writing + School Council workshops | School leadership audience |
| Custom school branding | White-label tier |
| API access for LMS integration | Enterprise |

### D. Remove or Rethink
| Feature | Issue |
|---|---|
| "Admin Portal" in parent nav | Wrong audience — remove from parent nav entirely |
| "Teacher Dashboard" in parent nav | Same — remove from parent nav |
| 6 subject progress rings | Beautiful but creates cognitive overload — replace with grade cards for MVP |
| Dual-axis engagement chart | Admin analytics — not parent-relevant |
| Workshop doughnut chart | Admin feature |
| Math radar chart | Only meaningful to educators — remove from parent-facing progress page |
| Login modal → redirects to page | Extra click with no value — link directly |

---

## 13. Competitive Positioning

### Current landscape:
| Platform | What they do | BridgeED's advantage |
|---|---|---|
| **School Messenger** | Automated school-to-parent broadcast alerts | BridgeED is two-way, parent-first |
| **Bloomz / Remind** | Teacher-parent messaging | BridgeED adds progress visibility + workshops |
| **PowerSchool / Brightspace** | LMS / grade portals | BridgeED is lighter, friendlier, not school-managed |
| **Edsby** | Ontario-specific school platform | BridgeED is parent-first; Edsby is institution-first |
| **Google Classroom** | Assignment/learning management | No parent engagement layer |
| **ParentSquare** | US parent engagement platform | No Ontario curriculum, no workshops, no newcomer focus |

### What makes BridgeED distinct:
1. **Ontario-specific** — curriculum content, EQAO references, Ontario school structure. No generic US platform can replicate this.
2. **Newcomer/multilingual focus** — the most underserved segment in Ontario school engagement. This is the market wedge.
3. **Workshop catalogue** — no competitor offers structured, bookable in-school parent education. This is a real product differentiator and a revenue model.
4. **Parent-first** — not a school IT tool that parents are forced to use. A product parents choose.

### What BridgeED should avoid becoming:
- Another grade portal (PowerSchool already owns this)
- A teacher workload tool (teachers will resist adoption)
- A surveillance app (parents receive data, not spy on their kids)
- A broadcast-only notification system (Remind does this better)

### The clearest market wedge:
**Lead with newcomer families.** Ontario has the highest proportion of newcomer students of any Canadian province. School boards, settlement agencies, and government programs are all actively looking for solutions for this population. A product that wins newcomer family engagement becomes the trusted platform for all Ontario parents over time.

---

## 14. Final Output

### Top 10 Strengths
1. Excellent visual design system — on-brand, warm, professional, clearly documented
2. Workshop catalogue is genuinely differentiated — no competitor offers this
3. Ontario-specific curriculum content — localized value no US platform can copy
4. Newcomer/multilingual focus — correct market wedge for Ontario
5. Role-based architecture already designed — parent/teacher/admin separation is sound
6. Secure messaging design is intuitive and well-executed
7. Progress ring visualization is appealing and parent-friendly in concept
8. Full spec with demo data — development has clear direction and can move fast
9. AI progress insights (Claude integration) is unique — no competitor has this
10. Calendar + announcements integration prevents fragmentation across channels

### Top 10 Issues and Risks
1. **Teacher Dashboard and Admin Portal in the parent nav** — immediately signals "school tool" not "family app," destroys product focus clarity
2. **No mobile hamburger menu** — 11 tabs overflow on every phone, the majority use case
3. **No onboarding flow** — first-time parents have no guided path post-registration
4. **No privacy policy, terms, or data consent** — a legal and trust blocker that prevents any school from joining
5. **Multilingual UI listed but not implemented** — clicking a language button that does nothing breaks trust with the exact audience you want most
6. **Dashboard cognitive overload** — 13+ data points before the scroll is too many for a busy parent on a phone
7. **Plain-language metrics missing** — "82% average" is meaningless without context; parents need "Aisha is on track"
8. **No email notifications** — without re-engagement triggers, parents won't return after the first visit
9. **Workshop booking has no path to completion** — Stripe is skipped, but there's no alternative confirmation flow
10. **text3 colour (#9A9186) fails WCAG AA contrast** — accessibility issue that affects all secondary text across the app

### Highest-Impact Changes Before Launch
1. Remove Teacher Dashboard and Admin Portal from parent nav
2. Reduce nav to 7 items, add hamburger menu for mobile
3. Redesign parent dashboard — 3 plain-language status cards, teacher feedback, announcements strip
4. Add 3-screen onboarding flow post-registration
5. Add `/privacy` and `/terms` pages + checkbox at registration
6. Disable or remove the language switcher until translations are ready (or implement EN/FR)
7. Add email notification for new teacher messages (SendGrid — already in the stack)
8. Add "What this means" tooltips to grade metrics on first dashboard visit
9. Add workshop inquiry form (name, school, email, preferred date) as the booking CTA instead of Stripe
10. Add a "New to Ontario Schools?" page for newcomer families

### Recommended MVP Feature List
1. Registration + school access code + role selection
2. 3-screen onboarding flow
3. Parent dashboard: 3 status cards + subject grades + teacher feedback + announcements strip
4. Student progress detail page: grades, attendance, reading level, timeline
5. Parent-teacher messaging (thread list + chat)
6. Calendar & announcements
7. Learning Guide (Ontario Curriculum, K–8, renamed)
8. Workshop browsing + inquiry booking form
9. New to Ontario Schools? newcomer support page
10. Email notifications: new messages + weekly digest
11. Privacy policy + terms of service
12. Mobile-responsive nav with hamburger menu
13. English + French UI

### Features to Move to Paid/Premium School Tier
- Admin Portal (all analytics, user management, financials)
- Teacher Dashboard (classroom management, class performance charts)
- School-wide reporting and data export
- Broadcast notification controls
- Grant Writing and School Council workshops (leadership audience)
- Workshop revenue and attendance tracking
- Multi-school / board-level management
- Custom school branding

### Simplified Navigation Structure

**Parent MVP nav (7 items):**
```
Home | My Child | Messages | Calendar | Workshops | Learn | Help
```
- "My Child" → student progress dashboard
- "Learn" → Learning Guide (formerly Ontario Curriculum)
- "Help" → Newcomer support, Contact, FAQ
- Language picker: globe icon, top right, next to Sign In

**Logged-in state removes "Home" and exposes:**
```
[Child Name ▾] | Messages [3] | Calendar | Workshops | Learn | Help | [Avatar]
```

### Homepage Copy and CTA Improvements

**Current H1:** "Connecting Schools & Families for Student Success"
**Suggested H1:** "Know how your child is doing. Every week."

**Current sub-copy:** Generic platform description
**Suggested sub-copy:** "BridgeED gives Ontario parents a clear picture of their child's school life — grades, messages from teachers, upcoming events, and workshops to help you get involved — all in one place, in your language."

**Current primary CTA:** "Explore Dashboard"
**Suggested primary CTA:** "See Your Child's Progress" (for logged-out) / "Go to My Dashboard" (for logged-in)

**Current secondary CTAs:** Browse Workshops | Learn More
**Suggested secondary CTAs:** "Book a Parent Workshop" | "New to Ontario Schools?"

**Add below hero:** One real testimonial from a newcomer parent (Fatuma Abdi from the About page) — this is the most trust-building content on the site and it's buried.

---

## Scores

| Area | Score | Notes |
|---|---|---|
| **Visual Design** | 8/10 | Strong design system, needs parent-first adjustments |
| **Parent Usability** | 4/10 | Too admin-heavy, no onboarding, charts over clarity |
| **Accessibility** | 5/10 | Contrast failures, no mobile nav, missing ARIA |
| **Product Focus** | 4/10 | Blended parent/teacher/admin experience dilutes positioning |
| **Launch Readiness** | 3/10 | No privacy pages, no mobile nav, no notifications, unimplemented features (language) |

---

## 30-Day Action Plan

### Week 1 — Scope & Navigation (Days 1–7)
- [ ] Remove "Teacher Dashboard" and "Admin Portal" from parent navigation
- [ ] Reduce nav to 7 items, rename "Ontario Curriculum" → "Learning Guide"
- [ ] Add hamburger menu for mobile (Tailwind + state toggle, no library needed)
- [ ] Fix `text3` colour contrast: change `#9A9186` to `#6B6358` minimum in globals.css
- [ ] Disable language switcher or implement EN/FR toggle (don't leave broken buttons)

### Week 2 — Dashboard & Onboarding (Days 8–14)
- [ ] Redesign parent dashboard: replace 6 rings + 2 charts with 3 plain-language status cards
- [ ] Add teacher feedback and announcements strip to dashboard above the fold
- [ ] Build 3-screen onboarding modal that fires after first login (child link → notifications → dashboard tour)
- [ ] Add "What this means" tooltips to grade cards (first visit only, dismissable)
- [ ] Add multi-child tab selector to dashboard header (not hidden in sidebar)

### Week 3 — Trust, Privacy & Notifications (Days 15–21)
- [ ] Create `/privacy` page (plain-language, not legalese — 500 words max)
- [ ] Create `/terms` page
- [ ] Add PIPEDA-compliant cookie consent banner
- [ ] Add privacy checkbox to registration form
- [ ] Implement SendGrid email notification: "You have a new message from [Teacher Name]"
- [ ] Implement weekly digest email: "Here's what's happening at school this week"

### Week 4 — Workshops, Newcomer & Polish (Days 22–30)
- [ ] Replace workshop "Book Now" with inquiry form (name, school, email, date preference → sends email via SendGrid)
- [ ] Add workshop confirmation email template
- [ ] Create "New to Ontario Schools?" page with: school year explained, grade structure, report cards, EQAO, how to talk to teachers — in English and French
- [ ] Add globe icon language picker to nav (EN/FR only, with "More languages coming soon" for others)
- [ ] Add Fatuma Abdi testimonial to homepage hero section
- [ ] Audit and fix mobile calendar (switch to list view on screens < 768px)
- [ ] Add skip-to-main-content link (accessibility)
- [ ] Add `aria-label` to all icon-only buttons

---

*This review is based on the BridgeED_Spec.md, the HTML prototype (BridgeED v3), and the live Next.js build at localhost:3000 as of May 2026.*
