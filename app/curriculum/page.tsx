'use client'

import { useState } from 'react'

// ─── Types ────────────────────────────────────────────────────────────────────

interface Subject {
  name: string
  icon: string
  borderColor: string
  iconBg: string
  topics: string[]
  homeTip: string
}

interface GradeData {
  label: string
  readingRange: string
  subjects: Subject[]
}

// ─── Curriculum Data ──────────────────────────────────────────────────────────

const GRADES: { id: string; label: string }[] = [
  { id: 'JK',  label: 'JK' },
  { id: 'SK',  label: 'SK' },
  { id: 'G1',  label: 'Gr 1' },
  { id: 'G2',  label: 'Gr 2' },
  { id: 'G3',  label: 'Gr 3' },
  { id: 'G4',  label: 'Gr 4' },
  { id: 'G5',  label: 'Gr 5' },
  { id: 'G6',  label: 'Gr 6' },
  { id: 'G7',  label: 'Gr 7' },
  { id: 'G8',  label: 'Gr 8' },
]

const GRADE_DATA: Record<string, GradeData> = {
  JK: {
    label: 'Junior Kindergarten',
    readingRange: 'Pre-reading (print awareness, phonological awareness)',
    subjects: [
      {
        name: 'Early Literacy',
        icon: '📖',
        borderColor: 'border-l-accent',
        iconBg: 'bg-accent3/20',
        topics: ['Learning letter names and sounds', 'Recognizing their own name in print', 'Listening to and retelling stories', 'Rhyming and word play'],
        homeTip: 'Read picture books together every day. Point to words as you read — even that small habit builds big reading skills.',
      },
      {
        name: 'Early Numeracy',
        icon: '🔢',
        borderColor: 'border-l-blue',
        iconBg: 'bg-blue2',
        topics: ['Counting objects to 10', 'Sorting by colour, shape, size', 'Recognizing basic shapes', 'Simple patterns'],
        homeTip: 'Count stairs, fruit, and toys at home. Math starts with noticing numbers in everyday life.',
      },
      {
        name: 'Science & the World',
        icon: '🌱',
        borderColor: 'border-l-accent2',
        iconBg: 'bg-accent3/20',
        topics: ['Observing nature and seasons', 'Learning about living things', 'Simple experiments with water and sand', 'Caring for classroom plants or animals'],
        homeTip: 'Go for a nature walk and talk about what you see — trees, birds, bugs. Curiosity is the best science tool.',
      },
      {
        name: 'Social & Emotional Learning',
        icon: '💛',
        borderColor: 'border-l-gold',
        iconBg: 'bg-gold2',
        topics: ['Learning to share and take turns', 'Identifying feelings', 'Making new friends', 'Following simple routines'],
        homeTip: 'Name feelings out loud at home — "I feel frustrated right now." It gives children the words to manage big emotions.',
      },
    ],
  },
  SK: {
    label: 'Senior Kindergarten',
    readingRange: 'Pre-reading to early Level 1 (Fountas & Pinnell)',
    subjects: [
      {
        name: 'Early Literacy',
        icon: '📖',
        borderColor: 'border-l-accent',
        iconBg: 'bg-accent3/20',
        topics: ['Blending and segmenting sounds (phonics)', 'Reading simple 3-letter words', 'Writing their name and simple words', 'Understanding story structure'],
        homeTip: 'Play "I spy something that starts with B." Phonics play at home accelerates reading readiness.',
      },
      {
        name: 'Early Numeracy',
        icon: '🔢',
        borderColor: 'border-l-blue',
        iconBg: 'bg-blue2',
        topics: ['Counting to 20', 'Adding and subtracting small numbers', 'Measuring length with non-standard units', 'Recognizing 2D and 3D shapes'],
        homeTip: 'Use measuring cups when cooking together — it\'s real math with real results. Let them pour and count.',
      },
      {
        name: 'Arts & Creative Play',
        icon: '🎨',
        borderColor: 'border-l-purple',
        iconBg: 'bg-purple2',
        topics: ['Drawing to represent ideas', 'Movement and dance', 'Simple songs and instruments', 'Dramatic play and storytelling'],
        homeTip: 'Set up a "creative corner" with paper, crayons, and blocks. Free creative play builds imagination and problem-solving.',
      },
      {
        name: 'Social & Emotional Learning',
        icon: '💛',
        borderColor: 'border-l-gold',
        iconBg: 'bg-gold2',
        topics: ['Building friendships and resolving conflicts', 'Growing independence', 'Understanding classroom rules', 'Exploring community helpers'],
        homeTip: 'Ask "what was one kind thing you did today?" It shifts focus to positive behaviour and builds empathy.',
      },
    ],
  },
  G1: {
    label: 'Grade 1',
    readingRange: 'Levels 4–12 (Fountas & Pinnell)',
    subjects: [
      {
        name: 'Mathematics',
        icon: '🔢',
        borderColor: 'border-l-blue',
        iconBg: 'bg-blue2',
        topics: ['Counting and ordering to 50', 'Addition and subtraction to 20', 'Measuring length and weight', 'Describing and sorting data'],
        homeTip: 'Play board games that use dice — counting spots builds number sense in a fun, low-pressure way.',
      },
      {
        name: 'Language (Reading & Writing)',
        icon: '📖',
        borderColor: 'border-l-accent',
        iconBg: 'bg-accent3/20',
        topics: ['Decoding words using phonics', 'Reading simple levelled books', 'Writing complete sentences', 'Capitalization and end punctuation'],
        homeTip: 'Let them read menus, cereal boxes, and signs — real-world reading builds confidence fast.',
      },
      {
        name: 'Science & Technology',
        icon: '🔬',
        borderColor: 'border-l-accent2',
        iconBg: 'bg-accent3/20',
        topics: ['Daily and seasonal changes', 'Energy in our lives', 'Needs of living things', 'Materials and how they\'re used'],
        homeTip: 'Talk about weather every morning — "Why do you think it rained?" Science starts with asking why.',
      },
      {
        name: 'Social Studies',
        icon: '🌍',
        borderColor: 'border-l-warm',
        iconBg: 'bg-warm3',
        topics: ['My family and my community', 'Rules and responsibilities', 'Learning about Canada', 'Indigenous communities and traditions'],
        homeTip: 'Share a family tradition or story — it connects classroom lessons about communities to your own home.',
      },
    ],
  },
  G2: {
    label: 'Grade 2',
    readingRange: 'Levels 12–18 (Fountas & Pinnell)',
    subjects: [
      {
        name: 'Mathematics',
        icon: '🔢',
        borderColor: 'border-l-blue',
        iconBg: 'bg-blue2',
        topics: ['Numbers to 100', 'Addition and subtraction with regrouping', 'Introduction to multiplication as repeated addition', 'Time (hours and half-hours)'],
        homeTip: 'Count change together — "If something costs $2.50 and you give $5, how much back?" Real math builds confidence.',
      },
      {
        name: 'Language (Reading & Writing)',
        icon: '📖',
        borderColor: 'border-l-accent',
        iconBg: 'bg-accent3/20',
        topics: ['Reading with expression and fluency', 'Identifying main idea and details', 'Writing simple reports and stories', 'Spelling high-frequency words'],
        homeTip: 'After reading, ask one question: "What was the most important part?" This builds comprehension without pressure.',
      },
      {
        name: 'Science & Technology',
        icon: '🔬',
        borderColor: 'border-l-accent2',
        iconBg: 'bg-accent3/20',
        topics: ['Growth and changes in animals', 'Properties of liquids and solids', 'Movement and simple machines', 'Local environment and habitats'],
        homeTip: 'Look for simple machines at home — ramps, levers, wheels. They\'re everywhere once you start noticing.',
      },
      {
        name: 'Social Studies',
        icon: '🌍',
        borderColor: 'border-l-warm',
        iconBg: 'bg-warm3',
        topics: ['Comparing past and present daily life', 'How communities change over time', 'Reading simple maps', 'Roles in the community'],
        homeTip: 'Look at old family photos together and talk about how things were different — it makes history personal.',
      },
    ],
  },
  G3: {
    label: 'Grade 3',
    readingRange: 'Levels 16–24 (Fountas & Pinnell)',
    subjects: [
      {
        name: 'Mathematics',
        icon: '🔢',
        borderColor: 'border-l-blue',
        iconBg: 'bg-blue2',
        topics: ['Numbers to 1,000', 'Multiplication and division facts to 7×7', 'Introduction to fractions', 'Perimeter of simple shapes'],
        homeTip: 'Practice skip-counting in the car — by 2s, 5s, 10s. It\'s the foundation for multiplication tables.',
      },
      {
        name: 'Language (Reading & Writing)',
        icon: '📖',
        borderColor: 'border-l-accent',
        iconBg: 'bg-accent3/20',
        topics: ['Reading chapter books independently', 'Making inferences while reading', 'Writing multi-sentence paragraphs', 'Editing and revising their own work'],
        homeTip: 'Visit the local library and let them choose their own books — choice builds reading motivation.',
      },
      {
        name: 'Science & Technology',
        icon: '🔬',
        borderColor: 'border-l-accent2',
        iconBg: 'bg-accent3/20',
        topics: ['Soils in the environment', 'Strong and stable structures', 'Forces causing movement', 'Seasonal changes and plants'],
        homeTip: 'Build something together — a birdhouse, a simple bridge with popsicle sticks. Engineering at home is science in action.',
      },
      {
        name: 'Social Studies',
        icon: '🌍',
        borderColor: 'border-l-warm',
        iconBg: 'bg-warm3',
        topics: ['Urban, suburban, and rural communities', 'First Nations and Métis communities', 'Canada\'s provinces and territories', 'How people meet their needs'],
        homeTip: 'Use Google Maps to explore your city — find your school, your home, a park — and talk about different kinds of communities.',
      },
    ],
  },
  G4: {
    label: 'Grade 4',
    readingRange: 'Levels 22–28 (Fountas & Pinnell)',
    subjects: [
      {
        name: 'Mathematics',
        icon: '🔢',
        borderColor: 'border-l-blue',
        iconBg: 'bg-blue2',
        topics: ['Fractions and decimals', 'Multiplication and division to 12×12', 'Measurement (area and perimeter)', 'Probability basics'],
        homeTip: 'Practice times tables together — try apps like Prodigy or just flashcards. Consistency over 10 minutes a day makes a big difference.',
      },
      {
        name: 'Language (Reading & Writing)',
        icon: '📖',
        borderColor: 'border-l-accent',
        iconBg: 'bg-accent3/20',
        topics: ['Novel study and literary analysis', 'Non-fiction reading strategies', 'Paragraph writing with topic sentences', 'Spelling patterns and word families'],
        homeTip: 'Read together for 20 minutes nightly. Ask questions about what happened and why — "Why do you think that character did that?"',
      },
      {
        name: 'Science & Technology',
        icon: '🔬',
        borderColor: 'border-l-accent2',
        iconBg: 'bg-accent3/20',
        topics: ['Habitats and communities', 'Pulleys and mechanisms', 'Rocks and minerals', 'Light and sound'],
        homeTip: 'Visit a local conservation area — connect what they learn in class to what they see outside. Ask them to teach you something.',
      },
      {
        name: 'Social Studies',
        icon: '🌍',
        borderColor: 'border-l-warm',
        iconBg: 'bg-warm3',
        topics: ['Medieval times and feudal systems', 'Early Indigenous communities in Canada', 'Mapping skills and geographic features', 'How societies are organized'],
        homeTip: 'Talk about history at home — ask what their ancestors might have done in the medieval era. Connecting history to family makes it memorable.',
      },
      {
        name: 'Arts',
        icon: '🎨',
        borderColor: 'border-l-purple',
        iconBg: 'bg-purple2',
        topics: ['Drama and role-play', 'Visual arts: proportion and perspective', 'Music: reading basic notation', 'Dance and creative movement'],
        homeTip: 'Encourage drawing and creative play — arts builds problem-solving and emotional intelligence, not just creativity.',
      },
      {
        name: 'Health & Physical Education',
        icon: '🏃',
        borderColor: 'border-l-gold',
        iconBg: 'bg-gold2',
        topics: ['Team sports and cooperation', 'Personal safety and boundaries', 'Healthy relationships', 'Nutrition basics'],
        homeTip: 'Get active together — even a 20-minute walk counts toward their 60 minutes of recommended daily activity. Make it a family habit.',
      },
      {
        name: 'French as a Second Language',
        icon: '🇫🇷',
        borderColor: 'border-l-warm',
        iconBg: 'bg-warm3',
        topics: ['Basic greetings and introductions', 'Colours, numbers, and classroom vocabulary', 'Simple sentences and questions', 'Songs and oral activities in French'],
        homeTip: 'Watch a French kids\' show together — Molang or Télétoon are great starting points. Even 15 minutes of exposure helps.',
      },
    ],
  },
  G5: {
    label: 'Grade 5',
    readingRange: 'Levels 28–34 (Fountas & Pinnell)',
    subjects: [
      {
        name: 'Mathematics',
        icon: '🔢',
        borderColor: 'border-l-blue',
        iconBg: 'bg-blue2',
        topics: ['Decimal numbers to hundredths', 'Multiplying and dividing larger numbers', 'Introduction to integers', 'Data management and graphing'],
        homeTip: 'Talk about prices and discounts while shopping — "If this is 25% off, what\'s the sale price?" Real money makes math click.',
      },
      {
        name: 'Language (Reading & Writing)',
        icon: '📖',
        borderColor: 'border-l-accent',
        iconBg: 'bg-accent3/20',
        topics: ['Reading a variety of genres', 'Writing persuasive essays', 'Research skills and note-taking', 'Grammar: verbs, nouns, and sentence variety'],
        homeTip: 'Ask them to teach you something they learned this week — teaching a concept deepens their own understanding.',
      },
      {
        name: 'Science & Technology',
        icon: '🔬',
        borderColor: 'border-l-accent2',
        iconBg: 'bg-accent3/20',
        topics: ['Human body systems', 'Properties of and changes in matter', 'Conservation of energy', 'Forces acting on structures'],
        homeTip: 'Explore science videos on YouTube together — channels like Kurzgesagt make complex ideas visual and fun.',
      },
      {
        name: 'Social Studies',
        icon: '🌍',
        borderColor: 'border-l-warm',
        iconBg: 'bg-warm3',
        topics: ['Canada\'s government and civic participation', 'Indigenous peoples and treaties in Canada', 'Regions of Canada', 'Economic systems and trade'],
        homeTip: 'Watch the evening news together and pick one story to discuss — it builds civic awareness and critical thinking.',
      },
    ],
  },
  G6: {
    label: 'Grade 6',
    readingRange: 'Levels 34–40 (Fountas & Pinnell)',
    subjects: [
      {
        name: 'Mathematics',
        icon: '🔢',
        borderColor: 'border-l-blue',
        iconBg: 'bg-blue2',
        topics: ['Fractions, decimals, and percentages', 'Rates and ratios', 'Geometry: angles and transformations', 'Patterns and algebraic thinking'],
        homeTip: 'Calculate tip at a restaurant together — percentages become real when money is involved.',
      },
      {
        name: 'Language (Reading & Writing)',
        icon: '📖',
        borderColor: 'border-l-accent',
        iconBg: 'bg-accent3/20',
        topics: ['Critical reading and analysis', 'Multi-paragraph essay writing', 'Media literacy and bias awareness', 'Oral presentation skills'],
        homeTip: 'Discuss a news headline together — practice asking "who wrote this?" and "what perspective is missing?"',
      },
      {
        name: 'Science & Technology',
        icon: '🔬',
        borderColor: 'border-l-accent2',
        iconBg: 'bg-accent3/20',
        topics: ['Biodiversity and ecosystem health', 'Flight and space exploration', 'Electricity and electrical safety', 'Evidence and investigation skills'],
        homeTip: 'Stargaze on a clear night — even identifying a few constellations sparks curiosity about space science.',
      },
      {
        name: 'Social Studies',
        icon: '🌍',
        borderColor: 'border-l-warm',
        iconBg: 'bg-warm3',
        topics: ['Ancient civilizations (Egypt, Greece, Rome)', 'Global communities and interdependence', 'Human rights and responsibilities', 'Environmental stewardship'],
        homeTip: 'Watch a documentary about an ancient civilization together — history comes alive when it\'s visual.',
      },
    ],
  },
  G7: {
    label: 'Grade 7',
    readingRange: 'Grade-level and above (independent novel and non-fiction)',
    subjects: [
      {
        name: 'Mathematics',
        icon: '🔢',
        borderColor: 'border-l-blue',
        iconBg: 'bg-blue2',
        topics: ['Integers and order of operations', 'Proportional reasoning and unit rates', 'Graphing on a coordinate plane', 'Probability and statistics'],
        homeTip: 'Let them help with budgeting decisions — comparing prices, calculating savings. Ownership motivates math practice.',
      },
      {
        name: 'Language (Reading & Writing)',
        icon: '📖',
        borderColor: 'border-l-accent',
        iconBg: 'bg-accent3/20',
        topics: ['Analyzing theme and character development', 'Argumentative and research writing', 'Citing sources and avoiding plagiarism', 'Vocabulary in context'],
        homeTip: 'Read the same book and discuss it together — it models that reading is for adults too, not just schoolwork.',
      },
      {
        name: 'Science',
        icon: '🔬',
        borderColor: 'border-l-accent2',
        iconBg: 'bg-accent3/20',
        topics: ['Pure substances vs. mixtures', 'Interactions in the environment', 'Heat and temperature', 'Form and function in living organisms'],
        homeTip: 'Make a DIY volcano or slime — hands-on experiments at home reinforce classroom concepts in a memorable way.',
      },
      {
        name: 'History & Geography',
        icon: '🌍',
        borderColor: 'border-l-warm',
        iconBg: 'bg-warm3',
        topics: ['New France and British North America', 'Physical geography of Canada', 'Immigration and cultural diversity', 'Natural resources and sustainability'],
        homeTip: 'Share your own family\'s immigration story or connection to Canada — it makes history personal and meaningful.',
      },
    ],
  },
  G8: {
    label: 'Grade 8',
    readingRange: 'Grade 8+ (complex text, inference, analysis)',
    subjects: [
      {
        name: 'Mathematics',
        icon: '🔢',
        borderColor: 'border-l-blue',
        iconBg: 'bg-blue2',
        topics: ['Powers and square roots', 'Linear relationships and graphing', 'Pythagorean theorem', 'Probability with independent and dependent events'],
        homeTip: 'Encourage them to explain a math concept back to you — if they can teach it, they understand it.',
      },
      {
        name: 'Language (Reading & Writing)',
        icon: '📖',
        borderColor: 'border-l-accent',
        iconBg: 'bg-accent3/20',
        topics: ['Analyzing literary devices (irony, symbolism)', 'Writing with voice and style', 'Synthesizing information from multiple sources', 'Formal presentation and debate'],
        homeTip: 'Encourage them to keep a personal journal — writing freely builds fluency and voice, even when it\'s not for school.',
      },
      {
        name: 'Science',
        icon: '🔬',
        borderColor: 'border-l-accent2',
        iconBg: 'bg-accent3/20',
        topics: ['Cells, organ systems, and reproduction', 'Fluids and pressure', 'Optics and the electromagnetic spectrum', 'Mechanical advantage and systems'],
        homeTip: 'Talk about current science news — climate change, space, medicine. Teens engage more when topics feel relevant to the real world.',
      },
      {
        name: 'History & Geography',
        icon: '🌍',
        borderColor: 'border-l-warm',
        iconBg: 'bg-warm3',
        topics: ['Confederation to WWI — building a nation', 'Human geography and global issues', 'Civic participation and democracy', 'Indigenous rights and residential schools'],
        homeTip: 'Watch a documentary together — topics like residential schools or Canadian Confederation are best explored with context and conversation.',
      },
    ],
  },
}

// ─── Subject Card ─────────────────────────────────────────────────────────────

function SubjectCard({ subject }: { subject: Subject }) {
  return (
    <div className={`bg-surface rounded-lg border border-border border-l-4 ${subject.borderColor} shadow overflow-hidden`}>
      <div className="p-5">
        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className={`w-10 h-10 rounded-sm flex items-center justify-center text-xl flex-shrink-0 ${subject.iconBg}`}>
            {subject.icon}
          </div>
          <h3 className="font-serif text-xl text-text">{subject.name}</h3>
        </div>

        {/* What they're learning */}
        <p className="text-xs font-bold uppercase tracking-wider text-text3 mb-2">What they&apos;re learning</p>
        <ul className="space-y-1.5 mb-4">
          {subject.topics.map(topic => (
            <li key={topic} className="flex items-start gap-2 text-base text-text2">
              <span className="text-accent2 mt-0.5 flex-shrink-0 text-sm">✓</span>
              {topic}
            </li>
          ))}
        </ul>

        {/* Home tip callout */}
        <div className="bg-accent3/15 border border-accent3/30 rounded-sm px-4 py-3">
          <p className="text-xs font-bold uppercase tracking-wider text-accent mb-1">How to help at home</p>
          <p className="text-base text-text2 leading-relaxed">{subject.homeTip}</p>
        </div>
      </div>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function CurriculumPage() {
  const [selectedGrade, setSelectedGrade] = useState<string>('G4')

  const gradeData = GRADE_DATA[selectedGrade]

  return (
    <div id="main-content" className="pt-nav min-h-screen bg-bg">

      {/* ── Banner ── */}
      <section
        className="px-6 py-14 text-white"
        style={{ background: 'linear-gradient(135deg, #1B4332 0%, #2C6E49 55%, #40916C 100%)' }}
      >
        <div className="max-w-[860px] mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-1.5 bg-white/15 border border-white/25 rounded-full px-3.5 py-1.5 text-sm mb-5">
            🍁 Ontario Ministry of Education
          </div>

          <h1 className="font-serif text-[clamp(30px,5vw,52px)] leading-[1.1] mb-3">
            Ontario Curriculum Guide
          </h1>
          <p className="text-lg opacity-85 max-w-[540px] leading-relaxed">
            Grade-by-grade breakdowns for K–8, in plain language for parents.
          </p>
        </div>
      </section>

      {/* ── Grade Selector ── */}
      <div className="sticky top-nav z-10 bg-bg border-b border-border shadow-sm">
        <div className="max-w-[900px] mx-auto px-4 py-3">
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
            {GRADES.map(grade => (
              <button
                key={grade.id}
                onClick={() => setSelectedGrade(grade.id)}
                className={`flex-shrink-0 px-4 py-2 rounded-sm text-sm font-semibold border transition-all duration-150
                  ${selectedGrade === grade.id
                    ? 'bg-accent text-white border-accent shadow-sm'
                    : 'bg-surface text-text2 border-border hover:border-accent2 hover:text-accent'
                  }`}
              >
                {grade.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Main Content ── */}
      <div className="max-w-[900px] mx-auto px-4 py-10">

        {/* Grade heading */}
        <div className="mb-8">
          <h2 className="font-serif text-3xl text-text mb-1">{gradeData.label}</h2>
          <p className="text-base text-text3">Ontario Ministry of Education · {new Date().getFullYear()} curriculum</p>
        </div>

        {/* Subject cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-12">
          {gradeData.subjects.map(subject => (
            <SubjectCard key={subject.name} subject={subject} />
          ))}
        </div>

        {/* ── Reading Level Expectations ── */}
        <div className="bg-surface border border-border rounded-lg p-6 mb-6 shadow">
          <div className="flex items-start gap-4">
            <div className="w-11 h-11 rounded-sm bg-blue2 flex items-center justify-center text-xl flex-shrink-0">
              📏
            </div>
            <div>
              <h3 className="font-serif text-xl text-text mb-1">Reading Level Expectations</h3>
              <p className="text-sm font-semibold text-accent mb-3">{gradeData.readingRange}</p>
              <p className="text-base text-text2 leading-relaxed mb-3">
                Ontario teachers often use the <strong>Fountas &amp; Pinnell (F&amp;P)</strong> scale to measure reading progress.
                Each level (A through Z) reflects a book&apos;s complexity — vocabulary, sentence length, and how much the reader
                needs to infer. Your child&apos;s teacher assesses reading level several times a year through one-on-one reading
                conferences.
              </p>
              <div className="flex items-start gap-2 bg-gold2 border border-gold/20 rounded-sm px-4 py-3">
                <span className="text-gold text-md flex-shrink-0">💡</span>
                <p className="text-base text-text2">
                  <strong>Ask your child&apos;s teacher</strong> where your child is reading — and what the next steps are.
                  Most teachers are happy to share levelled book lists you can borrow from the school library.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ── Useful Links ── */}
        <div className="bg-surface border border-border rounded-lg p-6 shadow">
          <h3 className="font-serif text-xl text-text mb-4">Useful Links</h3>
          <ul className="space-y-3">
            {[
              {
                icon: '🏛️',
                label: 'Ontario Curriculum — Ministry of Education',
                href: 'https://www.ontario.ca/curriculum',
                description: 'Official grade-by-grade curriculum documents from the province.',
              },
              {
                icon: '📝',
                label: 'EQAO Grade 3 & 6 Assessments',
                href: 'https://www.eqao.com',
                description: 'Province-wide standardized tests in reading, writing, and math. Results help identify where your child may need support.',
              },
              {
                icon: '🏠',
                label: 'Learning at Home — Ministry Tips',
                href: 'https://www.ontario.ca/page/learning-at-home',
                description: 'Ministry-curated activities and strategies to support learning outside the classroom.',
              },
            ].map(link => (
              <li key={link.href} className="flex items-start gap-3">
                <span className="text-xl flex-shrink-0 mt-0.5">{link.icon}</span>
                <div>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-base font-semibold text-accent hover:underline"
                  >
                    {link.label}
                  </a>
                  <p className="text-sm text-text3 mt-0.5">{link.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </div>
  )
}
