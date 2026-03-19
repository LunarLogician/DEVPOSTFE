import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { motion, useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import {
  Sparkles, Linkedin, ArrowRight, Check, X,
  ChevronRight, Star, Menu, Zap,
  MessageSquare, PenLine, BarChart2, Users
} from 'lucide-react'

// ─── Scroll reveal wrapper ────────────────────────────────────────────────────
function Reveal({ children, delay = 0, className = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-72px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const FEATURES = [
  {
    icon: <Sparkles size={20} />,
    name: 'Claude AI Writing',
    desc: 'Powered by Claude — one of the most capable AI models. Understands tone, formats LinkedIn posts that actually get engagement.',
    chip: 'Claude-Powered',
    chipColor: 'bg-blue-50 text-blue-700',
    iconBg: 'bg-blue-50 text-blue-600',
  },
  {
    icon: <Users size={20} />,
    name: 'Multiple Tones & Styles',
    desc: 'Educational, motivational, storytelling, controversy — pick a tone and the AI adapts the entire post to match your brand voice.',
    chip: '8+ Tones',
    chipColor: 'bg-pink-50 text-pink-700',
    iconBg: 'bg-pink-50 text-pink-600',
  },
  {
    icon: <Linkedin size={20} />,
    name: 'Auto-Post to LinkedIn',
    desc: 'Connect your LinkedIn account once. Posts publish automatically to your profile — no copy-paste, no manual posting, ever.',
    chip: 'Fully Automated',
    chipColor: 'bg-amber-50 text-amber-700',
    iconBg: 'bg-amber-50 text-amber-600',
  },
  {
    icon: <PenLine size={20} />,
    name: 'Edit Before Posting',
    desc: 'Want full control? Review and edit every post before it goes live. Save drafts, rewrite sections — your content, your rules.',
    chip: 'Full Control',
    chipColor: 'bg-emerald-50 text-emerald-700',
    iconBg: 'bg-emerald-50 text-emerald-700',
  },
  {
    icon: <MessageSquare size={20} />,
    name: 'Saved Post Library',
    desc: 'Every generated post is saved. Browse your history, re-post top performers, and build a content library over time.',
    chip: 'Post History',
    chipColor: 'bg-red-50 text-red-700',
    iconBg: 'bg-red-50 text-red-600',
  },
  {
    icon: <BarChart2 size={20} />,
    name: 'Analytics & Tracking',
    desc: 'See likes, comments and shares across all your posts. Know what content resonates so you can double down on what works.',
    chip: 'Coming Soon',
    chipColor: 'bg-sky-50 text-sky-600',
    iconBg: 'bg-sky-50 text-sky-500',
    soon: true,
  },
]

const STEPS = [
  {
    num: '01',
    name: 'Create your account',
    desc: 'Sign up in seconds — no credit card required. Connect your LinkedIn profile during onboarding and you\'re ready to post.',
  },
  {
    num: '02',
    name: 'Generate your post',
    desc: 'Enter a topic, pick a tone and length. Claude AI writes a professional LinkedIn post in under 10 seconds.',
  },
  {
    num: '03',
    name: 'Post automatically',
    desc: 'Hit "Post to LinkedIn" and it publishes directly to your profile. Or save it as a draft and post later.',
  },
]

const TESTIMONIALS = [
  {
    stars: 5,
    quote: "I was inconsistent on LinkedIn for years. With DevPost AI I went from posting once a month to posting daily. My connection requests tripled in 6 weeks.",
    name: 'Sara Malik',
    role: 'Product Manager, Lahore',
    initials: 'SM',
    avatarColor: 'bg-blue-100 text-blue-700',
    featured: false,
  },
  {
    stars: 5,
    quote: "The auto-post feature is a game changer. I generate 7 posts on Sunday and they publish throughout the week automatically. My engagement is up 4x.",
    name: 'Usman Tariq',
    role: 'Startup Founder, Karachi',
    initials: 'UT',
    avatarColor: 'bg-emerald-100 text-emerald-700',
    featured: true,
  },
  {
    stars: 5,
    quote: "I always had ideas but zero time to write. DevPost turns a rough topic into a polished post in seconds. Worth every penny.",
    name: 'Ayesha Khan',
    role: 'Marketing Director, Islamabad',
    initials: 'AK',
    avatarColor: 'bg-pink-100 text-pink-700',
    featured: false,
  },
]

const PLANS = [
  {
    tier: 'Free',
    price: '$0',
    period: 'per month',
    desc: 'Get started with AI-powered LinkedIn posts',
    features: [
      { text: '3 AI-generated posts/month', ok: true },
      { text: 'Basic tones & styles', ok: true },
      { text: 'Copy & save posts', ok: true },
      { text: 'Manual LinkedIn posting', ok: true },
    ],
    cta: 'Free Forever',
    featured: false,
    free: true,
  },
  {
    tier: 'Starter',
    price: 'Rs 1,000',
    period: 'per month',
    desc: 'For professionals growing their presence',
    features: [
      { text: '20 AI-generated posts/month', ok: true },
      { text: 'All tones & styles', ok: true },
      { text: 'LinkedIn auto-post', ok: true },
      { text: 'Post history & analytics', ok: true },
      { text: 'Priority support', ok: true },
    ],
    cta: 'Upgrade to Starter',
    featured: true,
  },
  {
    tier: 'Pro',
    price: 'Rs 2,000',
    period: 'per month',
    desc: 'For power users and teams',
    features: [
      { text: '50 AI-generated posts/month', ok: true },
      { text: 'All tones & styles', ok: true },
      { text: 'LinkedIn auto-post', ok: true },
      { text: 'Advanced analytics', ok: true },
      { text: 'Priority support', ok: true },
      { text: 'Early access to new features', ok: true },
    ],
    cta: 'Upgrade to Pro',
    featured: false,
    pro: true,
  },
]

const TOOL_PILLS = [
  { icon: <Sparkles size={16} />, label: 'AI Writing', color: 'text-blue-600 bg-blue-50' },
  { icon: <Linkedin size={16} />, label: 'Auto-Post', color: 'text-sky-600 bg-sky-50' },
  { icon: <Users size={16} />, label: 'Tone Control', color: 'text-pink-600 bg-pink-50' },
  { icon: <PenLine size={16} />, label: 'Draft & Edit', color: 'text-amber-600 bg-amber-50' },
  { icon: <BarChart2 size={16} />, label: 'Analytics', color: 'text-emerald-700 bg-emerald-50' },
]

// ─── Main Component ───────────────────────────────────────────────────────────
const Home = () => {
  const navigate = useNavigate()
  const { user, isAuthenticated } = useAuth()
  const [scrolled, setScrolled] = useState(false)
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const [demoTone, setDemoTone] = useState('educational')

  useEffect(() => {
    if (!document.getElementById('devpost-fonts')) {
      const link = document.createElement('link')
      link.id = 'devpost-fonts'
      link.rel = 'stylesheet'
      link.href = 'https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:wght@300;400;500;600&display=swap'
      document.head.appendChild(link)
    }
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const demoPost = {
    educational: `🧠 Most people underestimate the power of compounding in their career.\n\nHere's what 1% improvement daily looks like over a year:\n\n→ Day 1: 1.00\n→ Day 30: 1.35\n→ Day 365: 37.78\n\nThe professionals winning are not the ones working harder.\n\nThey're the ones who compound their skills, relationships, and presence consistently.\n\nStart today. Post one insight. Share one lesson.\n\n#LinkedInGrowth #CareerAdvice #PersonalDevelopment`,
    motivational: `You don't need permission to start.\n\nEvery expert was once a beginner who decided to begin anyway.\n\nThe difference between where you are and where you want to be:\n\n→ Not talent.\n→ Not connections.\n→ Not luck.\n\nIt's consistency. Show up. Every. Single. Day.\n\nYour future self is counting on what you do today. 💪\n\n#Motivation #Growth #Success`,
    storytelling: `6 months ago, I almost quit LinkedIn.\n\nMy posts got 3 likes. My connections were stagnant. I felt invisible.\n\nThen I made one change.\n\nI stopped posting what I thought people wanted to hear.\nI started sharing what actually helped me.\n\nWeek 1: 12 likes.\nWeek 4: 200+ reactions.\nMonth 3: 500 new followers.\n\nAuthenticity is a growth strategy.\n\nWhat's one real lesson you've learned this year?\n\n#LinkedIn #PersonalBrand #Content`,
  }

  return (
    <div className="bg-[#fdfcf8] text-gray-900 overflow-x-hidden">
      <style>{`
        .serif { font-family: 'Instrument Serif', Georgia, serif; }
        @keyframes float-0 { 0%,100%{transform:translateY(0px)} 50%{transform:translateY(-7px)} }
        @keyframes float-1 { 0%,100%{transform:translateY(0px)} 50%{transform:translateY(-9px)} }
        @keyframes float-2 { 0%,100%{transform:translateY(0px)} 50%{transform:translateY(-6px)} }
        @keyframes float-3 { 0%,100%{transform:translateY(0px)} 50%{transform:translateY(-10px)} }
        @keyframes float-4 { 0%,100%{transform:translateY(0px)} 50%{transform:translateY(-7px)} }
        .float-0{animation:float-0 2.8s ease-in-out 0s infinite}
        .float-1{animation:float-1 3.1s ease-in-out 0.2s infinite}
        .float-2{animation:float-2 2.6s ease-in-out 0.4s infinite}
        .float-3{animation:float-3 3.3s ease-in-out 0.1s infinite}
        .float-4{animation:float-4 2.9s ease-in-out 0.3s infinite}
        @keyframes pulse-dot{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.6;transform:scale(1.35)}}
        .pulse-dot{animation:pulse-dot 2s ease-in-out infinite}
      `}</style>

      {/* ─── NAV ─────────────────────────────────────────────────────────────── */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || mobileNavOpen ? 'bg-[#fdfcf8]/95 backdrop-blur-xl shadow-sm border-b border-gray-100' : 'bg-transparent'
      }`}>
        <div className="px-5 md:px-12 py-4 max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Linkedin size={16} className="text-white" />
            </div>
            <span className="font-semibold text-gray-900 tracking-tight">
              DevPost<span className="text-blue-600">AI</span>
            </span>
          </div>

          <div className="hidden md:flex items-center gap-1">
            {['Features', 'How it works', 'Pricing'].map((l) => (
              <a key={l} href={`#${l.toLowerCase().replace(/ /g, '-')}`}
                className="px-4 py-2 text-sm text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all">
                {l}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            {isAuthenticated ? (
              <div className="hidden md:flex items-center gap-2">
                <button onClick={() => navigate('/dashboard')}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-semibold transition-all">
                  Dashboard
                </button>
              </div>
            ) : (
              <div className="hidden md:flex items-center gap-2">
                <button onClick={() => navigate('/login')}
                  className="px-4 py-2 text-sm text-gray-500 hover:bg-gray-100 rounded-lg transition-all">
                  Log in
                </button>
                <button onClick={() => navigate('/register')}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-semibold transition-all shadow-sm">
                  Get started free
                </button>
              </div>
            )}

            <button
              onClick={() => navigate(isAuthenticated ? '/dashboard' : '/register')}
              className="md:hidden px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-semibold transition-all"
            >
              {isAuthenticated ? 'Dashboard' : 'Start free'}
            </button>
            <button
              onClick={() => setMobileNavOpen(o => !o)}
              className="md:hidden p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all"
              aria-label="Toggle menu"
            >
              {mobileNavOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {mobileNavOpen && (
          <div className="md:hidden border-t border-gray-100 bg-[#fdfcf8]/98 px-5 py-3 space-y-0.5">
            {['Features', 'How it works', 'Pricing'].map((l) => (
              <a key={l} href={`#${l.toLowerCase().replace(/ /g, '-')}`}
                onClick={() => setMobileNavOpen(false)}
                className="block px-4 py-2.5 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all">{l}</a>
            ))}
            {!isAuthenticated && (
              <div className="pt-2 border-t border-gray-100 space-y-0.5">
                <button onClick={() => { navigate('/login'); setMobileNavOpen(false) }}
                  className="block w-full text-left px-4 py-2.5 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-all">
                  Log in
                </button>
              </div>
            )}
          </div>
        )}
      </nav>

      {/* ─── HERO ────────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden px-5 sm:px-6" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', paddingTop: '96px', paddingBottom: '64px' }}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_900px_600px_at_50%_30%,rgba(37,99,235,0.07),transparent_70%)]" />
          <div className="absolute inset-0" style={{
            backgroundImage: 'linear-gradient(rgba(0,0,0,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(0,0,0,0.04) 1px,transparent 1px)',
            backgroundSize: '56px 56px',
            maskImage: 'radial-gradient(ellipse 70% 55% at 50% 50%,black 0%,transparent 80%)',
          }} />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-white border border-gray-200 rounded-full px-3 py-1.5 mb-8 shadow-sm"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-blue-500 pulse-dot" />
            <span className="text-xs font-medium text-blue-800">LinkedIn Content Engine · Powered by Claude AI</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="serif text-[clamp(52px,8vw,86px)] leading-[1.05] tracking-[-3px] text-gray-900"
          >
            Your LinkedIn presence,<br />
            <em className="text-blue-700">on autopilot.</em>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.16 }}
            className="mt-5 text-lg font-light text-gray-500 max-w-xl mx-auto leading-relaxed"
          >
            Generate professional LinkedIn posts with Claude AI in seconds — then watch them publish automatically to your profile. Stay consistent without the time commitment.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.24 }}
            className="mt-9 flex flex-col sm:flex-row gap-3 justify-center items-center"
          >
            <button
              onClick={() => navigate('/register')}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold text-[15px] transition-all shadow-lg shadow-blue-600/20 hover:shadow-blue-600/30 hover:-translate-y-0.5"
            >
              <Sparkles size={15} /> Start for free
            </button>
            <a
              href="#features"
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-3.5 bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 rounded-xl text-[15px] transition-all hover:-translate-y-0.5"
            >
              See all features <ChevronRight size={15} />
            </a>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
            className="mt-4 text-xs text-gray-400"
          >
            No credit card required · Free posts included · Upgrade anytime
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 mt-16 flex flex-wrap justify-center gap-3 max-w-xl mx-auto"
        >
          {TOOL_PILLS.map((t, i) => (
            <div key={t.label} className={`float-${i} bg-white border border-gray-100 rounded-xl px-4 py-2.5 flex items-center gap-2 shadow-sm`}>
              <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${t.color}`}>{t.icon}</div>
              <span className="text-xs font-medium text-gray-600">{t.label}</span>
            </div>
          ))}
        </motion.div>
      </section>

      {/* ─── DEMO ─────────────────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-28 px-5 sm:px-6 bg-[#f7f6f2]">
        <div className="max-w-6xl mx-auto">
          <Reveal className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-blue-700 mb-3">
                <div className="w-4 h-0.5 bg-blue-500 rounded" /> See it in action
              </div>
              <h2 className="serif text-[clamp(32px,4vw,52px)] leading-tight tracking-tight">
                AI-written posts that<br /><em className="text-blue-700">actually sound like you</em>
              </h2>
            </div>
            <p className="text-base text-gray-500 max-w-md leading-relaxed">
              Pick a tone, enter a topic, and Claude writes a ready-to-post LinkedIn update in seconds. Then hit post — it publishes automatically.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-6 items-start">
            {/* Left: tone selector */}
            <Reveal className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-6 shadow-sm">
              <div className="text-xs font-bold tracking-widest uppercase text-gray-400 mb-4">Pick a tone</div>
              <div className="flex flex-col gap-2">
                {[
                  { id: 'educational', label: 'Educational', icon: <BarChart2 size={16} /> },
                  { id: 'motivational', label: 'Motivational', icon: <Zap size={16} /> },
                  { id: 'storytelling', label: 'Storytelling', icon: <MessageSquare size={16} /> },
                ].map((t) => {
                  const active = demoTone === t.id
                  return (
                    <button key={t.id} onClick={() => setDemoTone(t.id)}
                      className={`flex items-center gap-2.5 px-3.5 py-3 rounded-xl border transition-all text-left ${
                        active ? 'bg-blue-600 text-white border-blue-600 shadow-sm' : 'bg-white hover:bg-gray-50 text-gray-700 border-gray-200'
                      }`}>
                      <span className={`w-8 h-8 rounded-lg flex items-center justify-center ${active ? 'bg-white/10 text-white' : 'bg-blue-50 text-blue-700'}`}>{t.icon}</span>
                      <span className="text-sm font-semibold">{t.label}</span>
                      <span className={`ml-auto text-xs font-semibold ${active ? 'text-blue-200' : 'text-gray-400'}`}>→</span>
                    </button>
                  )
                })}
              </div>

              <div className="mt-6 border-t border-gray-100 pt-5">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
                    <Check size={16} />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-gray-900">Ready to post instantly</div>
                    <p className="text-sm text-gray-500 leading-relaxed mt-0.5">Connect LinkedIn once — posts publish with a single click, or automatically on a schedule.</p>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Right: generated post preview */}
            <Reveal className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
              <div className="px-5 sm:px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center">
                    <Linkedin size={16} className="text-white" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-gray-900">Generated LinkedIn Post</div>
                    <div className="text-xs text-gray-400">Tone: {demoTone.charAt(0).toUpperCase() + demoTone.slice(1)} · Ready to post</div>
                  </div>
                </div>
                <button onClick={() => navigate('/register')}
                  className="hidden sm:inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-semibold transition-all">
                  Try it now <ArrowRight size={14} />
                </button>
              </div>

              <div className="p-5 sm:p-6">
                <div className="rounded-2xl border border-gray-200 bg-gray-50 p-5">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-bold">Y</div>
                    <div>
                      <div className="text-sm font-semibold text-gray-900">Your Name</div>
                      <div className="text-xs text-gray-400">Your Title · Just now</div>
                    </div>
                  </div>
                  <pre className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap font-sans">
                    {demoPost[demoTone]}
                  </pre>
                </div>
              </div>

              <div className="px-5 sm:px-6 py-4 border-t border-gray-100 bg-white flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
                <div className="text-sm text-gray-600">
                  <span className="font-semibold text-gray-900">Pro unlocks</span> auto-scheduling + unlimited posts.
                </div>
                <div className="flex gap-2">
                  <button onClick={() => navigate('/login')}
                    className="flex-1 sm:flex-none px-4 py-2 rounded-xl border border-gray-200 text-gray-700 hover:bg-gray-50 text-sm font-semibold transition-all">
                    Log in
                  </button>
                  <button onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
                    className="flex-1 sm:flex-none px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold transition-all">
                    See pricing
                  </button>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ─── STATS BAR ───────────────────────────────────────────────────────── */}
      <div className="bg-blue-700 py-6 px-6">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-px bg-white/10 overflow-hidden">
          {[
            { num: '10,000+', label: 'Posts generated' },
            { num: '5,000+', label: 'Active creators' },
            { num: '30s', label: 'Avg generation time' },
            { num: '4.9 ★', label: 'Average rating' },
          ].map((s) => (
            <div key={s.label} className="text-center py-5 px-4 bg-blue-700">
              <div className="serif text-2xl text-white">{s.num}</div>
              <div className="text-xs text-white/50 mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ─── FEATURES ────────────────────────────────────────────────────────── */}
      <section id="features" className="py-16 sm:py-28 px-5 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <Reveal className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-blue-700 mb-3">
                <div className="w-4 h-0.5 bg-blue-500 rounded" /> Features
              </div>
              <h2 className="serif text-[clamp(32px,4vw,52px)] leading-tight tracking-tight">
                Six powerful tools,<br /><em className="text-blue-700">one platform</em>
              </h2>
            </div>
            <p className="text-base text-gray-500 max-w-sm leading-relaxed">
              From AI writing to auto-publishing — DevPost AI handles every part of your LinkedIn content workflow.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-gray-100 border border-gray-100 rounded-2xl overflow-hidden">
            {FEATURES.map((f, i) => (
              <Reveal key={f.name} delay={i * 0.05}>
                <div className={`bg-white p-5 sm:p-8 h-full hover:bg-blue-50/50 transition-colors duration-200 ${f.soon ? 'opacity-55' : ''}`}>
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-5 ${f.iconBg}`}>{f.icon}</div>
                  <h3 className="font-semibold text-gray-900 mb-2">{f.name}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
                  <span className={`inline-block mt-4 text-[11px] font-semibold px-2.5 py-1 rounded-full ${f.chipColor}`}>{f.chip}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── HOW IT WORKS ────────────────────────────────────────────────────── */}
      <section id="how-it-works" className="py-16 sm:py-28 px-5 sm:px-6 bg-gray-950 text-white">
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-blue-400 mb-3">
              <div className="w-4 h-0.5 bg-blue-500 rounded" /> How it works
            </div>
            <h2 className="serif text-[clamp(32px,4vw,52px)] leading-tight tracking-tight">
              Up and running<br /><em className="text-blue-400">in 60 seconds</em>
            </h2>
          </Reveal>

          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
            {STEPS.map((s, i) => (
              <Reveal key={s.num} delay={i * 0.1}>
                <div>
                  <div className="serif text-[80px] leading-none text-white/12 select-none mb-2">{s.num}</div>
                  <div className="w-8 h-8 rounded-full border border-white/25 flex items-center justify-center text-xs font-semibold text-white/80 mb-5">{i + 1}</div>
                  <h3 className="font-semibold text-lg mb-3">{s.name}</h3>
                  <p className="text-sm text-white/70 leading-relaxed">{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ────────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-28 px-5 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <Reveal className="text-center mb-16">
            <div className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-widest text-blue-700 mb-3">
              <div className="w-4 h-0.5 bg-blue-500 rounded" /> Reviews <div className="w-4 h-0.5 bg-blue-500 rounded" />
            </div>
            <h2 className="serif text-[clamp(32px,4vw,52px)] leading-tight tracking-tight">
              Loved by creators<br /><em className="text-blue-700">everywhere</em>
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {TESTIMONIALS.map((t, i) => (
              <Reveal key={t.name} delay={i * 0.08}>
                <div className={`rounded-2xl p-7 h-full border transition-all hover:-translate-y-1 hover:shadow-lg duration-200 ${
                  t.featured ? 'bg-blue-50 border-blue-200 shadow-md' : 'bg-white border-gray-100'
                }`}>
                  <div className="flex gap-0.5 mb-4">
                    {Array.from({ length: t.stars }).map((_, j) => (
                      <Star key={j} size={13} className="fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed italic mb-6">"{t.quote}"</p>
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-semibold ${t.avatarColor}`}>{t.initials}</div>
                    <div>
                      <div className="text-sm font-semibold text-gray-900">{t.name}</div>
                      <div className="text-xs text-gray-400">{t.role}</div>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PRICING ─────────────────────────────────────────────────────────── */}
      <section id="pricing" className="py-16 sm:py-28 px-5 sm:px-6 bg-[#f7f6f2]">
        <div className="max-w-5xl mx-auto">
          <Reveal className="text-center mb-16">
            <div className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-widest text-blue-700 mb-3">
              <div className="w-4 h-0.5 bg-blue-500 rounded" /> Pricing <div className="w-4 h-0.5 bg-blue-500 rounded" />
            </div>
            <h2 className="serif text-[clamp(32px,4vw,52px)] leading-tight tracking-tight">
              Simple, creator-friendly<br /><em className="text-blue-700">pricing</em>
            </h2>
            <p className="mt-3 text-sm text-gray-500">Start free. Upgrade for auto-posting and unlimited content.</p>
          </Reveal>

          <Reveal>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {PLANS.map((plan) => (
                <div key={plan.tier} className={`rounded-2xl p-5 sm:p-8 border relative overflow-hidden ${
                  plan.featured
                    ? 'bg-blue-700 border-blue-600 text-white'
                    : plan.pro
                    ? 'bg-amber-950 border-amber-700 text-white'
                    : 'bg-white border-gray-200 text-gray-900'
                }`}>
                  {plan.featured && (
                    <div className="absolute top-5 right-5">
                      <span className="text-[10px] font-bold bg-blue-500/20 text-blue-200 px-2.5 py-1 rounded-full tracking-wide uppercase">Popular</span>
                    </div>
                  )}
                  {plan.pro && (
                    <div className="absolute top-5 right-5">
                      <span className="text-[10px] font-bold bg-amber-500/20 text-amber-300 px-2.5 py-1 rounded-full tracking-wide uppercase">Best Value</span>
                    </div>
                  )}
                  <div className={`text-xs font-bold tracking-widest uppercase mb-3 ${
                    plan.featured ? 'text-blue-300' : plan.pro ? 'text-amber-400' : 'text-gray-400'
                  }`}>{plan.tier}</div>
                  <div className="serif text-4xl tracking-tight mb-1">{plan.price}</div>
                  <div className={`text-sm mb-1 ${plan.featured ? 'text-blue-300' : plan.pro ? 'text-amber-400/70' : 'text-gray-400'}`}>{plan.period}</div>
                  <div className={`text-xs mb-7 ${plan.featured ? 'text-blue-400/70' : plan.pro ? 'text-amber-300/50' : 'text-gray-400'}`}>{plan.desc}</div>
                  <ul className={`space-y-3 mb-8 border-t pt-6 ${
                    plan.featured ? 'border-white/10' : plan.pro ? 'border-amber-700/30' : 'border-gray-100'
                  }`}>
                    {plan.features.map((f, i) => (
                      <li key={i} className="flex items-center gap-2.5 text-sm">
                        <Check size={14} className={plan.featured ? 'text-blue-300' : plan.pro ? 'text-amber-400' : 'text-blue-600'} />
                        <span className={plan.featured ? 'text-white/85' : plan.pro ? 'text-amber-100/85' : 'text-gray-700'}>{f.text}</span>
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => !plan.free && navigate('/register')}
                    disabled={plan.free}
                    className={`w-full py-3 rounded-xl font-semibold text-sm transition-all ${
                      plan.featured
                        ? 'bg-white text-blue-700 hover:bg-blue-50'
                        : plan.pro
                        ? 'bg-amber-400 text-amber-950 hover:bg-amber-300'
                        : 'bg-gray-700 text-gray-400 cursor-default'
                    }`}>
                    {plan.cta}
                  </button>
                </div>
              ))}
            </div>
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-500">
                Not ready?{' '}
                <button onClick={() => navigate('/register')} className="text-blue-700 font-semibold hover:underline">
                  Start with free posts →
                </button>
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── FINAL CTA ───────────────────────────────────────────────────────── */}
      <section className="py-20 sm:py-32 px-5 sm:px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_700px_400px_at_50%_50%,rgba(37,99,235,0.06),transparent_70%)]" />
        <Reveal className="relative z-10 max-w-2xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-widest text-blue-700 mb-4">
            <div className="w-4 h-0.5 bg-blue-500 rounded" /> Ready to start? <div className="w-4 h-0.5 bg-blue-500 rounded" />
          </div>
          <h2 className="serif text-[clamp(36px,5vw,64px)] leading-tight tracking-tight mb-4">
            Stop struggling.<br /><em className="text-blue-700">Start posting.</em>
          </h2>
          <p className="text-base text-gray-500 mb-10">
            Join thousands of professionals who grow their LinkedIn presence with DevPost AI. Free to start — no credit card needed.
          </p>
          <div className="flex gap-3 justify-center flex-col sm:flex-row items-center">
            <button onClick={() => navigate('/register')}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-all shadow-lg shadow-blue-600/20 hover:-translate-y-0.5">
              <Sparkles size={15} /> Create free account
            </button>
            <a href="#features"
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 rounded-xl transition-all hover:-translate-y-0.5">
              Explore features <ArrowRight size={15} />
            </a>
          </div>
        </Reveal>
      </section>

      {/* ─── FOOTER ──────────────────────────────────────────────────────────── */}
      <footer className="border-t border-gray-100 px-5 sm:px-6 py-10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-blue-600 rounded-md flex items-center justify-center">
              <Linkedin size={13} className="text-white" />
            </div>
            <span className="font-semibold text-sm">DevPost<span className="text-blue-600">AI</span></span>
          </div>
          <div className="flex gap-6">
            {[['Privacy', '/privacy'], ['Terms', '/terms'], ['About', '/about'], ['Refund Policy', '/refund-policy']].map(([l, href]) => (
              <a key={l} href={href} className="text-sm text-gray-400 hover:text-blue-700 transition-colors">{l}</a>
            ))}
          </div>
          <p className="text-xs text-gray-400">© 2026 DevPost AI. Built for creators.</p>
        </div>
      </footer>
    </div>
  )
}

export default Home;
