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
    chipColor: 'chip-blue',
    iconBg: 'icon-blue',
  },
  {
    icon: <Users size={20} />,
    name: 'Multiple Tones & Styles',
    desc: 'Educational, motivational, storytelling, controversy — pick a tone and the AI adapts the entire post to match your brand voice.',
    chip: '8+ Tones',
    chipColor: 'chip-purple',
    iconBg: 'icon-purple',
  },
  {
    icon: <Linkedin size={20} />,
    name: 'Auto-Post to LinkedIn',
    desc: 'Connect your LinkedIn account once. Posts publish automatically to your profile — no copy-paste, no manual posting, ever.',
    chip: 'Fully Automated',
    chipColor: 'chip-teal',
    iconBg: 'icon-teal',
  },
  {
    icon: <PenLine size={20} />,
    name: 'Edit Before Posting',
    desc: 'Want full control? Review and edit every post before it goes live. Save drafts, rewrite sections — your content, your rules.',
    chip: 'Full Control',
    chipColor: 'chip-green',
    iconBg: 'icon-green',
  },
  {
    icon: <MessageSquare size={20} />,
    name: 'Saved Post Library',
    desc: 'Every generated post is saved. Browse your history, re-post top performers, and build a content library over time.',
    chip: 'Post History',
    chipColor: 'chip-navy',
    iconBg: 'icon-navy',
  },
  {
    icon: <BarChart2 size={20} />,
    name: 'Analytics & Tracking',
    desc: 'See likes, comments and shares across all your posts. Know what content resonates so you can double down on what works.',
    chip: 'Coming Soon',
    chipColor: 'chip-muted',
    iconBg: 'icon-muted',
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
    avatarColor: 'av-blue',
    featured: false,
  },
  {
    stars: 5,
    quote: "The auto-post feature is a game changer. I generate 7 posts on Sunday and they publish throughout the week automatically. My engagement is up 4x.",
    name: 'Usman Tariq',
    role: 'Startup Founder, Karachi',
    initials: 'UT',
    avatarColor: 'av-teal',
    featured: true,
  },
  {
    stars: 5,
    quote: "I always had ideas but zero time to write. DevPost turns a rough topic into a polished post in seconds. Worth every penny.",
    name: 'Ayesha Khan',
    role: 'Marketing Director, Islamabad',
    initials: 'AK',
    avatarColor: 'av-purple',
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
      { text: '3 AI-generated posts/month' },
      { text: 'Basic tones & styles' },
      { text: 'Copy & save posts' },
      { text: 'Manual LinkedIn posting' },
    ],
    cta: 'Free Forever',
    variant: 'free',
  },
  {
    tier: 'Starter',
    price: 'Rs 1,000',
    period: 'per month',
    desc: 'For professionals growing their presence',
    features: [
      { text: '20 AI-generated posts/month' },
      { text: 'All tones & styles' },
      { text: 'LinkedIn auto-post' },
      { text: 'Post history & analytics' },
      { text: 'Priority support' },
    ],
    cta: 'Upgrade to Starter',
    badge: 'Popular',
    variant: 'starter',
  },
  {
    tier: 'Pro',
    price: 'Rs 2,000',
    period: 'per month',
    desc: 'For power users and teams',
    features: [
      { text: '50 AI-generated posts/month' },
      { text: 'All tones & styles' },
      { text: 'LinkedIn auto-post' },
      { text: 'Advanced analytics' },
      { text: 'Priority support' },
      { text: 'Early access to new features' },
    ],
    cta: 'Upgrade to Pro',
    badge: 'Best Value',
    variant: 'pro',
  },
]

const TOOL_PILLS = [
  { icon: <Sparkles size={16} />, label: 'AI Writing', cls: 'pill-blue' },
  { icon: <Linkedin size={16} />, label: 'Auto-Post', cls: 'pill-teal' },
  { icon: <Users size={16} />, label: 'Tone Control', cls: 'pill-purple' },
  { icon: <PenLine size={16} />, label: 'Draft & Edit', cls: 'pill-amber' },
  { icon: <BarChart2 size={16} />, label: 'Analytics', cls: 'pill-green' },
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
      link.href = 'https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500;600;700&display=swap'
      document.head.appendChild(link)
    }

    const style = document.createElement('style')
    style.id = 'devpost-home-styles'
    if (!document.getElementById('devpost-home-styles')) {
      style.textContent = `
        :root {
          --navy: #1a2744;
          --navy-dark: #141e36;
          --navy-mid: #1e2f52;
          --teal: #2196b5;
          --teal-deep: #1a7a9a;
          --teal-light: #e8f6fa;
          --teal-pale: #c8e8f2;
          --purple: #7c5cbf;
          --purple-light: #ede8f8;
          --blue-gray: #f0f4f8;
          --blue-gray-mid: #e2eaf2;
          --border: #dde4ee;
          --text-primary: #1a2744;
          --text-secondary: #4a6080;
          --text-muted: #8a9bb5;
          --shadow-teal: 0 6px 20px rgba(33,150,181,0.32);
          --shadow-navy: 0 8px 28px rgba(26,39,68,0.22);
        }
        .serif { font-family: 'DM Serif Display', Georgia, serif; }
        .dm { font-family: 'DM Sans', sans-serif; }

        @keyframes float-0 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-7px)} }
        @keyframes float-1 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-9px)} }
        @keyframes float-2 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
        @keyframes float-3 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
        @keyframes float-4 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-7px)} }
        .float-0{animation:float-0 2.8s ease-in-out 0s infinite}
        .float-1{animation:float-1 3.1s ease-in-out 0.2s infinite}
        .float-2{animation:float-2 2.6s ease-in-out 0.4s infinite}
        .float-3{animation:float-3 3.3s ease-in-out 0.1s infinite}
        .float-4{animation:float-4 2.9s ease-in-out 0.3s infinite}
        @keyframes pulse-dot{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.6;transform:scale(1.35)}}
        .pulse-dot{animation:pulse-dot 2s ease-in-out infinite}

        /* Chips */
        .chip-blue { background: rgba(33,150,181,0.1); color: var(--teal-deep); }
        .chip-purple { background: var(--purple-light); color: var(--purple); }
        .chip-teal { background: var(--teal-light); color: var(--teal-deep); }
        .chip-green { background: rgba(76,175,125,0.1); color: #2d8a5e; }
        .chip-navy { background: rgba(26,39,68,0.08); color: var(--navy-mid); }
        .chip-muted { background: var(--blue-gray); color: var(--text-muted); }

        /* Icon bgs */
        .icon-blue { background: rgba(33,150,181,0.12); color: var(--teal); }
        .icon-purple { background: var(--purple-light); color: var(--purple); }
        .icon-teal { background: var(--teal-light); color: var(--teal-deep); }
        .icon-green { background: rgba(76,175,125,0.1); color: #2d8a5e; }
        .icon-navy { background: rgba(26,39,68,0.08); color: var(--navy); }
        .icon-muted { background: var(--blue-gray); color: var(--text-muted); }

        /* Pills */
        .pill-blue { background: rgba(33,150,181,0.1); color: var(--teal-deep); }
        .pill-teal { background: var(--teal-light); color: var(--teal-deep); }
        .pill-purple { background: var(--purple-light); color: var(--purple); }
        .pill-amber { background: rgba(232,168,76,0.12); color: #9a6200; }
        .pill-green { background: rgba(76,175,125,0.1); color: #2d8a5e; }

        /* Avatars */
        .av-blue { background: rgba(33,150,181,0.15); color: var(--teal-deep); }
        .av-teal { background: rgba(76,175,125,0.15); color: #2d8a5e; }
        .av-purple { background: var(--purple-light); color: var(--purple); }

        /* Section label */
        .section-eyebrow {
          display: inline-flex; align-items: center; gap: 8px;
          font-size: 11px; font-weight: 700; letter-spacing: 0.1em;
          text-transform: uppercase; color: var(--teal-deep);
          font-family: 'DM Sans', sans-serif; margin-bottom: 12px;
        }
        .eyebrow-line { width: 16px; height: 2px; background: var(--teal); border-radius: 1px; }

        /* Nav link */
        .nav-link {
          padding: 7px 14px; font-size: 13.5px; color: var(--text-secondary);
          border-radius: 8px; transition: all 0.16s;
          font-family: 'DM Sans', sans-serif; text-decoration: none;
        }
        .nav-link:hover { color: var(--navy); background: var(--blue-gray); }

        /* Buttons */
        .btn-primary {
          display: inline-flex; align-items: center; justify-content: center; gap: 8px;
          padding: 13px 28px; background: linear-gradient(135deg, #2196b5, #1a7a9a);
          color: white; border-radius: 12px; font-size: 14.5px; font-weight: 600;
          border: none; cursor: pointer; transition: all 0.2s;
          font-family: 'DM Sans', sans-serif; letter-spacing: -0.01em;
          box-shadow: var(--shadow-teal); text-decoration: none;
        }
        .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 10px 28px rgba(33,150,181,0.42); }

        .btn-secondary {
          display: inline-flex; align-items: center; justify-content: center; gap: 8px;
          padding: 13px 28px; background: white; color: var(--text-primary);
          border: 1.5px solid var(--border); border-radius: 12px; font-size: 14.5px;
          font-weight: 500; cursor: pointer; transition: all 0.2s;
          font-family: 'DM Sans', sans-serif; text-decoration: none;
        }
        .btn-secondary:hover { transform: translateY(-2px); background: var(--blue-gray); border-color: var(--teal); }

        .btn-sm-primary {
          padding: 8px 18px; background: linear-gradient(135deg, #2196b5, #1a7a9a);
          color: white; border-radius: 9px; font-size: 13px; font-weight: 600;
          border: none; cursor: pointer; transition: all 0.18s;
          font-family: 'DM Sans', sans-serif;
          box-shadow: 0 3px 10px rgba(33,150,181,0.3);
        }
        .btn-sm-primary:hover { background: var(--teal-deep); }

        .btn-sm-ghost {
          padding: 8px 16px; background: white; color: var(--text-secondary);
          border: 1.5px solid var(--border); border-radius: 9px; font-size: 13px;
          font-weight: 500; cursor: pointer; transition: all 0.18s;
          font-family: 'DM Sans', sans-serif;
        }
        .btn-sm-ghost:hover { border-color: var(--teal); color: var(--teal-deep); }

        /* Feature card */
        .feature-card {
          background: white; padding: 32px; height: 100%;
          transition: background 0.2s;
        }
        .feature-card:hover { background: var(--teal-light); }
        .feature-card.soon { opacity: 0.55; }

        /* Tone button */
        .tone-btn {
          display: flex; align-items: center; gap: 10px;
          padding: 12px 14px; border-radius: 12px; border: 1.5px solid var(--border);
          background: white; color: var(--text-secondary); cursor: pointer;
          transition: all 0.16s; text-align: left; width: 100%;
          font-family: 'DM Sans', sans-serif;
        }
        .tone-btn:hover { border-color: var(--teal); background: var(--teal-light); }
        .tone-btn.active {
          background: linear-gradient(135deg, #2196b5, #1a7a9a);
          border-color: var(--teal); color: white;
          box-shadow: 0 4px 14px rgba(33,150,181,0.3);
        }
        .tone-icon {
          width: 32px; height: 32px; border-radius: 9px;
          display: flex; align-items: center; justify-content: center; flex-shrink: 0;
        }
        .tone-btn.active .tone-icon { background: rgba(255,255,255,0.15); color: white; }
        .tone-btn:not(.active) .tone-icon { background: var(--teal-light); color: var(--teal-deep); }

        /* Pricing cards */
        .plan-free { background: white; border: 1.5px solid var(--border); color: var(--text-primary); }
        .plan-starter { background: linear-gradient(160deg, var(--navy-mid) 0%, var(--navy-dark) 100%); border: 1.5px solid rgba(255,255,255,0.08); color: white; }
        .plan-pro { background: linear-gradient(160deg, #2d1e52 0%, #1e1436 100%); border: 1.5px solid rgba(124,92,191,0.3); color: white; }

        /* Stat bar */
        .stat-bar { background: linear-gradient(135deg, var(--navy-mid), var(--navy-dark)); }

        /* How it works dark section */
        .how-section { background: linear-gradient(160deg, var(--navy-mid) 0%, var(--navy-dark) 100%); }

        /* Testimonial featured */
        .testimonial-featured { background: var(--teal-light); border: 1.5px solid var(--teal-pale); }
        .testimonial-normal { background: white; border: 1.5px solid var(--border); }

        .footer-link { font-size: 13px; color: var(--text-muted); text-decoration: none; transition: color 0.15s; }
        .footer-link:hover { color: var(--teal-deep); }

        /* ──── MOBILE RESPONSIVE ──── */
        @media (max-width: 768px) {
          /* Nav */
          .nav-link { display: none; }
          .desktop-nav { display: none; }

          /* Hero section */
          section { padding: 60px 16px !important; }

          /* Features grid - 1 column on mobile, 2 on tablet, 3 on desktop */
          .features-grid { 
            grid-template-columns: 1fr !important;
            gap: 12px !important;
          }

          /* How it works - 1 column on mobile */
          .how-grid {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
          }

          /* Testimonials - 1 column on mobile */
          .testimonials-grid {
            grid-template-columns: 1fr !important;
            gap: 14px !important;
          }

          /* Pricing - 1 column on mobile */
          .pricing-grid {
            grid-template-columns: 1fr !important;
            gap: 12px !important;
          }

          /* Stats bar - 2 columns on mobile */
          .stats-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 0 !important;
          }

          /* Demo section - stack vertically */
          .demo-layout {
            grid-template-columns: 1fr !important;
            gap: 16px !important;
          }

          /* Footer - single column on mobile */
          .footer-container {
            flex-direction: column !important;
            text-align: center !important;
          }

          .footer-links {
            flex-direction: column !important;
            gap: 12px !important;
          }

          /* Floating pills - reduce on mobile */
          .pills-container {
            flex-wrap: wrap !important;
            gap: 8px !important;
          }

          .pill-item {
            flex: 0 0 calc(50% - 4px) !important;
          }

          /* Buttons - full width on mobile */
          .cta-buttons {
            flex-direction: column !important;
            gap: 10px !important;
          }

          .btn-primary, .btn-secondary {
            width: 100% !important;
          }

          /* Hero heading - smaller on mobile */
          .hero-title {
            font-size: clamp(32px, 8vw, 82px) !important;
          }

          /* Section heading - smaller on mobile */
          .section-title {
            font-size: clamp(24px, 6vw, 48px) !important;
          }

          /* Demo card header - stack on mobile */
          .demo-header {
            flex-direction: column !important;
            gap: 12px !important;
          }

          .demo-header-left {
            width: 100% !important;
          }

          .demo-header button {
            width: 100% !important;
          }

          /* Reduce padding on small sections */
          .stat-bar { padding: 16px 12px !important; }

          /* Feature card padding */
          .feature-card { padding: 20px 16px !important; }

          /* Pricing card padding */
          .plan-card { padding: 24px 20px !important; }

          h1 { font-size: clamp(28px, 7vw, 82px) !important; }
          h2 { font-size: clamp(22px, 5.5vw, 48px) !important; }
        }

        @media (min-width: 640px) and (max-width: 1024px) {
          /* Tablet optimizations */
          section { padding: 64px 24px !important; }

          .features-grid { 
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 12px !important;
          }

          .testimonials-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 14px !important;
          }

          .pricing-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 12px !important;
          }

          .how-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 32px !important;
          }

          .stats-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }

          .pill-item {
            flex: 0 0 calc(50% - 6px) !important;
          }
        }

        @media (max-width: 640px) {
          /* Extra mobile optimizations */
          section { padding: 48px 12px !important; }

          /* Tone pills - single column */
          .pill-item {
            flex: 0 0 100% !important;
          }

          .pills-container {
            gap: 8px !important;
          }

          /* Stats - single column on very small screens */
          .stats-grid {
            grid-template-columns: 1fr !important;
          }

          /* Very aggressive padding reduction */
          .feature-card { padding: 16px 12px !important; }
          .plan-card { padding: 20px 16px !important; }
          
          /* Chip styling - adjust font */
          .section-eyebrow { font-size: 10px !important; }

          /* Demo section buttons - stack */
          .demo-header {
            flex-direction: column !important;
          }

          .demo-header button {
            width: 100% !important;
          }

          /* Final CTA - stack buttons */
          .final-cta-buttons {
            flex-direction: column !important;
          }

          .final-cta-buttons button,
          .final-cta-buttons a {
            width: 100% !important;
          }
        }
      `
      document.head.appendChild(style)
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

  /* hero bg */
  const heroBg = {
    background: 'linear-gradient(160deg, #f8fafc 0%, var(--blue-gray) 60%, #e8f6fa 100%)',
  }

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", color: 'var(--text-primary)', overflowX: 'hidden' }}>

      {/* ─── NAV ─────────────────────────────────────────────────────────────── */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
        transition: 'all 0.3s',
        background: scrolled || mobileNavOpen ? 'rgba(240,244,248,0.97)' : 'transparent',
        backdropFilter: scrolled || mobileNavOpen ? 'blur(16px)' : 'none',
        borderBottom: scrolled || mobileNavOpen ? '1px solid var(--border)' : '1px solid transparent',
        boxShadow: scrolled ? '0 2px 12px rgba(26,39,68,0.06)' : 'none',
      }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '14px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 32, height: 32, borderRadius: 9, background: 'linear-gradient(135deg, #2196b5, #1a7a9a)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 3px 10px rgba(33,150,181,0.3)' }}>
              <Linkedin size={15} color="white" />
            </div>
            <span style={{ fontWeight: 700, fontSize: 15, color: 'var(--navy)', letterSpacing: '-0.02em' }}>
              DevPost<span style={{ color: 'var(--teal)' }}>AI</span>
            </span>
          </div>

          {/* Desktop nav */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }} className="desktop-nav">
            {['Features', 'How it works', 'Pricing'].map(l => (
              <a key={l} href={`#${l.toLowerCase().replace(/ /g, '-')}`} className="nav-link">{l}</a>
            ))}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {isAuthenticated ? (
              <button onClick={() => navigate('/dashboard')} className="btn-sm-primary">Dashboard</button>
            ) : (
              <>
                <button onClick={() => navigate('/login')} className="btn-sm-ghost" style={{ display: 'none' }} id="nav-login">Log in</button>
                <button onClick={() => navigate('/register')} className="btn-sm-primary">Get started free</button>
              </>
            )}
            <button onClick={() => setMobileNavOpen(o => !o)}
              style={{ padding: 7, background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)', display: 'flex', borderRadius: 8 }}>
              {mobileNavOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {mobileNavOpen && (
          <div style={{ borderTop: '1px solid var(--border)', background: 'rgba(240,244,248,0.98)', padding: '8px 18px 12px' }}>
            {['Features', 'How it works', 'Pricing'].map(l => (
              <a key={l} href={`#${l.toLowerCase().replace(/ /g, '-')}`}
                onClick={() => setMobileNavOpen(false)}
                style={{ display: 'block', padding: '10px 14px', fontSize: 13.5, color: 'var(--text-secondary)', borderRadius: 8, textDecoration: 'none' }}>
                {l}
              </a>
            ))}
          </div>
        )}
      </nav>

      {/* ─── HERO ────────────────────────────────────────────────────────────── */}
      <section style={{ ...heroBg, minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '120px 24px 80px', position: 'relative', overflow: 'hidden' }}>
        {/* Grid overlay */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          backgroundImage: 'linear-gradient(var(--border) 1px,transparent 1px),linear-gradient(90deg,var(--border) 1px,transparent 1px)',
          backgroundSize: '56px 56px',
          maskImage: 'radial-gradient(ellipse 65% 55% at 50% 50%,black,transparent 80%)',
          opacity: 0.5,
        }} />
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 800px 500px at 50% 30%,rgba(33,150,181,0.08),transparent 70%)', pointerEvents: 'none' }} />

        <div style={{ position: 'relative', zIndex: 1, maxWidth: 720, margin: '0 auto', textAlign: 'center' }}>
          {/* Badge */}
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'white', border: '1.5px solid var(--teal-pale)', borderRadius: 99, padding: '7px 16px', marginBottom: 32, boxShadow: '0 2px 10px rgba(33,150,181,0.12)' }}>
            <div style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--teal)' }} className="pulse-dot" />
            <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--teal-deep)' }}>LinkedIn Content Engine · Powered by Claude AI</span>
          </motion.div>

          {/* H1 */}
          <motion.h1 initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="serif hero-title"
            style={{ fontSize: 'clamp(48px,7.5vw,82px)', lineHeight: 1.05, letterSpacing: '-0.03em', color: 'var(--navy)', margin: 0 }}>
            Your LinkedIn presence,<br />
            <em style={{ color: 'var(--teal-deep)', fontStyle: 'italic' }}>on autopilot.</em>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.16 }}
            style={{ marginTop: 22, fontSize: 17, fontWeight: 300, color: 'var(--text-secondary)', maxWidth: 520, margin: '20px auto 0', lineHeight: 1.7 }}>
            Generate professional LinkedIn posts with Claude AI in seconds — then watch them publish automatically to your profile.
          </motion.p>

          <motion.div className="cta-buttons" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.24 }}
            style={{ marginTop: 36, display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center' }}>
            <button onClick={() => navigate('/register')} className="btn-primary">
              <Sparkles size={15} /> Start for free
            </button>
            <a href="#features" className="btn-secondary">
              See all features <ChevronRight size={15} />
            </a>
          </motion.div>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
            style={{ marginTop: 14, fontSize: 12, color: 'var(--text-muted)' }}>
            No credit card required · Free posts included · Upgrade anytime
          </motion.p>
        </div>

        {/* Floating pills */}
        <motion.div initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="pills-container"
          style={{ position: 'relative', zIndex: 1, marginTop: 56, display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 12, maxWidth: 560, margin: '56px auto 0' }}>
          {TOOL_PILLS.map((t, i) => (
            <div key={t.label} className={`float-${i} pill-item`}
              style={{ background: 'white', border: '1.5px solid var(--border)', borderRadius: 12, padding: '10px 16px', display: 'flex', alignItems: 'center', gap: 8, boxShadow: '0 2px 10px rgba(26,39,68,0.07)' }}>
              <div className={`tone-icon ${t.cls}`} style={{ width: 28, height: 28, borderRadius: 8 }}>{t.icon}</div>
              <span style={{ fontSize: 12.5, fontWeight: 500, color: 'var(--text-secondary)' }}>{t.label}</span>
            </div>
          ))}
        </motion.div>
      </section>

      {/* ─── DEMO ─────────────────────────────────────────────────────────────── */}
      <section style={{ padding: '80px 24px', background: 'var(--blue-gray)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <Reveal style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'space-between', gap: 24, marginBottom: 48 }}>
            <div>
              <div className="section-eyebrow"><span className="eyebrow-line" /> See it in action</div>
              <h2 className="serif" style={{ fontSize: 'clamp(28px,4vw,48px)', lineHeight: 1.15, letterSpacing: '-0.02em', color: 'var(--navy)', margin: 0 }}>
                AI-written posts that<br /><em style={{ color: 'var(--teal-deep)' }}>actually sound like you</em>
              </h2>
            </div>
            <p style={{ fontSize: 15, color: 'var(--text-secondary)', maxWidth: 380, lineHeight: 1.7, margin: 0 }}>
              Pick a tone, enter a topic, and Claude writes a ready-to-post LinkedIn update in seconds.
            </p>
          </Reveal>

          <div className="demo-layout" style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: 20, alignItems: 'start' }}>
            {/* Tone picker */}
            <Reveal>
              <div style={{ background: 'white', border: '1.5px solid var(--border)', borderRadius: 16, padding: 22, boxShadow: '0 2px 12px rgba(26,39,68,0.06)' }}>
                <p style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 14 }}>Pick a tone</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {[
                    { id: 'educational', label: 'Educational', icon: <BarChart2 size={15} /> },
                    { id: 'motivational', label: 'Motivational', icon: <Zap size={15} /> },
                    { id: 'storytelling', label: 'Storytelling', icon: <MessageSquare size={15} /> },
                  ].map(t => (
                    <button key={t.id} onClick={() => setDemoTone(t.id)}
                      className={`tone-btn ${demoTone === t.id ? 'active' : ''}`}>
                      <span className="tone-icon">{t.icon}</span>
                      <span style={{ fontSize: 13.5, fontWeight: 600 }}>{t.label}</span>
                      <span style={{ marginLeft: 'auto', fontSize: 13, opacity: 0.6 }}>→</span>
                    </button>
                  ))}
                </div>
                <div style={{ marginTop: 20, paddingTop: 18, borderTop: '1px solid var(--blue-gray-mid)', display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                  <div style={{ width: 34, height: 34, borderRadius: 9, background: 'rgba(76,175,125,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Check size={15} color="#2d8a5e" />
                  </div>
                  <div>
                    <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--navy)', marginBottom: 3 }}>Ready to post instantly</p>
                    <p style={{ fontSize: 12.5, color: 'var(--text-muted)', lineHeight: 1.55 }}>Connect LinkedIn once — posts publish with a single click.</p>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Preview */}
            <Reveal>
              <div style={{ background: 'white', border: '1.5px solid var(--border)', borderRadius: 16, overflow: 'hidden', boxShadow: '0 2px 12px rgba(26,39,68,0.06)' }}>
                <div className="demo-header" style={{ padding: '16px 22px', borderBottom: '1px solid var(--blue-gray)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div className="demo-header-left" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ width: 36, height: 36, borderRadius: 10, background: 'linear-gradient(135deg, #2196b5, #1a7a9a)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Linkedin size={16} color="white" />
                    </div>
                    <div>
                      <p style={{ fontSize: 13.5, fontWeight: 600, color: 'var(--navy)' }}>Generated LinkedIn Post</p>
                      <p style={{ fontSize: 11.5, color: 'var(--text-muted)' }}>Tone: {demoTone.charAt(0).toUpperCase() + demoTone.slice(1)} · Ready to post</p>
                    </div>
                  </div>
                  <button onClick={() => navigate('/register')} className="btn-sm-primary" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    Try it now <ArrowRight size={13} />
                  </button>
                </div>
                <div style={{ padding: 22 }}>
                  <div style={{ background: 'var(--blue-gray)', borderRadius: 12, border: '1.5px solid var(--border)', padding: 20 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
                      <div style={{ width: 38, height: 38, borderRadius: '50%', background: 'linear-gradient(135deg, #2196b5, #1a7a9a)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <span style={{ color: 'white', fontSize: 13, fontWeight: 700 }}>Y</span>
                      </div>
                      <div>
                        <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--navy)' }}>Your Name</p>
                        <p style={{ fontSize: 11, color: 'var(--text-muted)' }}>Your Title · Just now</p>
                      </div>
                    </div>
                    <pre style={{ fontSize: 13, color: 'var(--text-primary)', lineHeight: 1.7, whiteSpace: 'pre-wrap', fontFamily: "'DM Sans', sans-serif", margin: 0 }}>
                      {demoPost[demoTone]}
                    </pre>
                  </div>
                </div>
                <div style={{ padding: '14px 22px', borderTop: '1px solid var(--blue-gray)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10 }}>
                  <p style={{ fontSize: 13, color: 'var(--text-secondary)' }}>
                    <strong style={{ color: 'var(--navy)' }}>Pro unlocks</strong> auto-scheduling + unlimited posts.
                  </p>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button onClick={() => navigate('/login')} className="btn-sm-ghost">Log in</button>
                    <button onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })} className="btn-sm-primary">See pricing</button>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ─── STATS BAR ───────────────────────────────────────────────────────── */}
      <div className="stat-bar" style={{ padding: '24px 24px' }}>
        <div className="stats-grid" style={{ maxWidth: 900, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 1, background: 'rgba(255,255,255,0.08)', overflow: 'hidden', borderRadius: 4 }}>
          {[
            { num: '10,000+', label: 'Posts generated' },
            { num: '5,000+', label: 'Active creators' },
            { num: '30s', label: 'Avg generation time' },
            { num: '4.9 ★', label: 'Average rating' },
          ].map(s => (
            <div key={s.label} style={{ textAlign: 'center', padding: '20px 16px', background: 'transparent' }}>
              <div className="serif" style={{ fontSize: 24, color: 'white', lineHeight: 1 }}>{s.num}</div>
              <div style={{ fontSize: 11.5, color: 'rgba(255,255,255,0.45)', marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ─── FEATURES ────────────────────────────────────────────────────────── */}
      <section id="features" style={{ padding: '80px 24px', background: 'white' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <Reveal style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'space-between', gap: 24, marginBottom: 52 }}>
            <div>
              <div className="section-eyebrow"><span className="eyebrow-line" /> Features</div>
              <h2 className="serif" style={{ fontSize: 'clamp(28px,4vw,48px)', lineHeight: 1.15, letterSpacing: '-0.02em', color: 'var(--navy)', margin: 0 }}>
                Six powerful tools,<br /><em style={{ color: 'var(--teal-deep)' }}>one platform</em>
              </h2>
            </div>
            <p style={{ fontSize: 15, color: 'var(--text-secondary)', maxWidth: 340, lineHeight: 1.7, margin: 0 }}>
              From AI writing to auto-publishing — DevPost AI handles every part of your LinkedIn content workflow.
            </p>
          </Reveal>

          <div className="features-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 1, background: 'var(--border)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden' }}>
            {FEATURES.map((f, i) => (
              <Reveal key={f.name} delay={i * 0.05}>
                <div className={`feature-card ${f.soon ? 'soon' : ''}`}>
                  <div className={`tone-icon ${f.iconBg}`} style={{ width: 44, height: 44, borderRadius: 12, marginBottom: 18 }}>{f.icon}</div>
                  <h3 style={{ fontWeight: 600, fontSize: 15, color: 'var(--navy)', marginBottom: 8 }}>{f.name}</h3>
                  <p style={{ fontSize: 13.5, color: 'var(--text-secondary)', lineHeight: 1.65 }}>{f.desc}</p>
                  <span className={`chip-${f.chipColor.replace('chip-', '')}`}
                    style={{ display: 'inline-block', marginTop: 16, fontSize: 11, fontWeight: 700, padding: '4px 10px', borderRadius: 99 }}
                    className={f.chipColor}>
                    {f.chip}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── HOW IT WORKS ────────────────────────────────────────────────────── */}
      <section id="how-it-works" className="how-section" style={{ padding: '80px 24px' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <Reveal>
            <div className="section-eyebrow" style={{ color: 'var(--teal-pale)' }}><span style={{ width: 16, height: 2, background: 'var(--teal)', borderRadius: 1, display: 'inline-block' }} /> How it works</div>
            <h2 className="serif section-title" style={{ fontSize: 'clamp(28px,4vw,48px)', lineHeight: 1.15, letterSpacing: '-0.02em', color: 'white', margin: 0 }}>
              Up and running<br /><em style={{ color: 'var(--teal-pale)', fontStyle: 'italic' }}>in 60 seconds</em>
            </h2>
          </Reveal>

          <div className="how-grid" style={{ marginTop: 64, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 40 }}>
            {STEPS.map((s, i) => (
              <Reveal key={s.num} delay={i * 0.1}>
                <div>
                  <div className="serif" style={{ fontSize: 72, lineHeight: 1, color: 'rgba(255,255,255,0.08)', userSelect: 'none', marginBottom: 4 }}>{s.num}</div>
                  <div style={{ width: 30, height: 30, borderRadius: '50%', border: '1.5px solid rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 18 }}>
                    <span style={{ fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.7)' }}>{i + 1}</span>
                  </div>
                  <h3 style={{ fontWeight: 600, fontSize: 16, color: 'white', marginBottom: 10 }}>{s.name}</h3>
                  <p style={{ fontSize: 13.5, color: 'rgba(255,255,255,0.55)', lineHeight: 1.65 }}>{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ────────────────────────────────────────────────────── */}
      <section style={{ padding: '80px 24px', background: 'var(--blue-gray)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <Reveal style={{ textAlign: 'center', marginBottom: 52 }}>
            <div className="section-eyebrow" style={{ justifyContent: 'center' }}><span className="eyebrow-line" /> Reviews <span className="eyebrow-line" /></div>
            <h2 className="serif" style={{ fontSize: 'clamp(28px,4vw,48px)', lineHeight: 1.15, letterSpacing: '-0.02em', color: 'var(--navy)', margin: 0 }}>
              Loved by creators<br /><em style={{ color: 'var(--teal-deep)' }}>everywhere</em>
            </h2>
          </Reveal>

          <div className="testimonials-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
            {TESTIMONIALS.map((t, i) => (
              <Reveal key={t.name} delay={i * 0.08}>
                <div className={t.featured ? 'testimonial-featured' : 'testimonial-normal'}
                  style={{ borderRadius: 16, padding: 28, height: '100%', transition: 'all 0.2s', cursor: 'default' }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(26,39,68,0.1)'; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}>
                  <div style={{ display: 'flex', gap: 2, marginBottom: 14 }}>
                    {Array.from({ length: t.stars }).map((_, j) => (
                      <Star key={j} size={13} style={{ fill: '#f5c842', color: '#f5c842' }} />
                    ))}
                  </div>
                  <p style={{ fontSize: 13.5, color: 'var(--text-secondary)', lineHeight: 1.7, fontStyle: 'italic', marginBottom: 20 }}>"{t.quote}"</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div className={t.avatarColor} style={{ width: 36, height: 36, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, flexShrink: 0 }}>
                      {t.initials}
                    </div>
                    <div>
                      <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--navy)' }}>{t.name}</p>
                      <p style={{ fontSize: 11.5, color: 'var(--text-muted)' }}>{t.role}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PRICING ─────────────────────────────────────────────────────────── */}
      <section id="pricing" style={{ padding: '80px 24px', background: 'white' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <Reveal style={{ textAlign: 'center', marginBottom: 52 }}>
            <div className="section-eyebrow" style={{ justifyContent: 'center' }}><span className="eyebrow-line" /> Pricing <span className="eyebrow-line" /></div>
            <h2 className="serif" style={{ fontSize: 'clamp(28px,4vw,48px)', lineHeight: 1.15, letterSpacing: '-0.02em', color: 'var(--navy)', margin: 0 }}>
              Simple, creator-friendly<br /><em style={{ color: 'var(--teal-deep)' }}>pricing</em>
            </h2>
            <p style={{ marginTop: 12, fontSize: 13.5, color: 'var(--text-muted)' }}>Start free. Upgrade for auto-posting and unlimited content.</p>
          </Reveal>

          <Reveal>
            <div className="pricing-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
              {PLANS.map(plan => (
                <div key={plan.tier} className={`plan-${plan.variant} plan-card`}
                  style={{ borderRadius: 18, padding: '32px 28px', position: 'relative', overflow: 'hidden' }}>
                  {plan.badge && (
                    <div style={{ position: 'absolute', top: 18, right: 18 }}>
                      <span style={{
                        fontSize: 10, fontWeight: 700, padding: '3px 10px', borderRadius: 99,
                        background: plan.variant === 'starter' ? 'rgba(33,150,181,0.2)' : 'rgba(124,92,191,0.2)',
                        color: plan.variant === 'starter' ? 'var(--teal-pale)' : '#c8b0f5',
                        letterSpacing: '0.06em', textTransform: 'uppercase',
                      }}>{plan.badge}</span>
                    </div>
                  )}
                  <div style={{
                    fontSize: 10.5, fontWeight: 700, letterSpacing: '0.09em', textTransform: 'uppercase', marginBottom: 12,
                    color: plan.variant === 'free' ? 'var(--text-muted)' : plan.variant === 'starter' ? 'var(--teal-pale)' : '#c8b0f5',
                  }}>{plan.tier}</div>
                  <div className="serif" style={{ fontSize: 38, letterSpacing: '-0.03em', lineHeight: 1, color: plan.variant === 'free' ? 'var(--navy)' : 'white' }}>{plan.price}</div>
                  <div style={{ fontSize: 13, marginTop: 4, marginBottom: 2, color: plan.variant === 'free' ? 'var(--text-muted)' : 'rgba(255,255,255,0.5)' }}>{plan.period}</div>
                  <div style={{ fontSize: 12.5, marginBottom: 24, color: plan.variant === 'free' ? 'var(--text-muted)' : 'rgba(255,255,255,0.4)' }}>{plan.desc}</div>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, marginBottom: 28, paddingTop: 20, borderTop: `1px solid ${plan.variant === 'free' ? 'var(--border)' : 'rgba(255,255,255,0.1)'}`, display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {plan.features.map((f, i) => (
                      <li key={i} style={{ display: 'flex', alignItems: 'center', gap: 9, fontSize: 13 }}>
                        <Check size={13} color={plan.variant === 'free' ? 'var(--teal)' : plan.variant === 'starter' ? 'var(--teal-pale)' : '#c8b0f5'} />
                        <span style={{ color: plan.variant === 'free' ? 'var(--text-secondary)' : 'rgba(255,255,255,0.8)' }}>{f.text}</span>
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => plan.variant !== 'free' && navigate('/register')}
                    disabled={plan.variant === 'free'}
                    style={{
                      width: '100%', padding: '12px', borderRadius: 10, fontWeight: 600, fontSize: 13.5,
                      border: 'none', cursor: plan.variant === 'free' ? 'default' : 'pointer',
                      fontFamily: "'DM Sans', sans-serif", transition: 'all 0.18s',
                      background: plan.variant === 'free' ? 'var(--blue-gray)' : plan.variant === 'starter' ? 'rgba(255,255,255,0.15)' : 'rgba(124,92,191,0.3)',
                      color: plan.variant === 'free' ? 'var(--text-muted)' : 'white',
                      border: plan.variant !== 'free' ? '1.5px solid rgba(255,255,255,0.2)' : '1.5px solid transparent',
                    }}
                    onMouseEnter={e => { if (plan.variant !== 'free') e.currentTarget.style.background = plan.variant === 'starter' ? 'rgba(255,255,255,0.22)' : 'rgba(124,92,191,0.45)'; }}
                    onMouseLeave={e => { if (plan.variant !== 'free') e.currentTarget.style.background = plan.variant === 'starter' ? 'rgba(255,255,255,0.15)' : 'rgba(124,92,191,0.3)'; }}
                  >
                    {plan.cta}
                  </button>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 24, textAlign: 'center' }}>
              <p style={{ fontSize: 13.5, color: 'var(--text-muted)' }}>
                Not ready?{' '}
                <button onClick={() => navigate('/register')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--teal-deep)', fontWeight: 600, fontSize: 13.5, fontFamily: "'DM Sans', sans-serif" }}>
                  Start with free posts →
                </button>
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── FINAL CTA ───────────────────────────────────────────────────────── */}
      <section style={{ padding: '96px 24px', background: 'var(--blue-gray)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 600px 350px at 50% 50%,rgba(33,150,181,0.08),transparent 70%)', pointerEvents: 'none' }} />
        <Reveal style={{ position: 'relative', zIndex: 1, maxWidth: 620, margin: '0 auto', textAlign: 'center' }}>
          <div className="section-eyebrow" style={{ justifyContent: 'center' }}><span className="eyebrow-line" /> Ready to start? <span className="eyebrow-line" /></div>
          <h2 className="serif" style={{ fontSize: 'clamp(32px,5vw,60px)', lineHeight: 1.1, letterSpacing: '-0.02em', color: 'var(--navy)', marginBottom: 16 }}>
            Stop struggling.<br /><em style={{ color: 'var(--teal-deep)' }}>Start posting.</em>
          </h2>
          <p style={{ fontSize: 15, color: 'var(--text-secondary)', marginBottom: 40, lineHeight: 1.7 }}>
            Join thousands of professionals who grow their LinkedIn presence with DevPost AI. Free to start — no credit card needed.
          </p>
          <div className="final-cta-buttons" style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button onClick={() => navigate('/register')} className="btn-primary">
              <Sparkles size={15} /> Create free account
            </button>
            <a href="#features" className="btn-secondary">
              Explore features <ArrowRight size={15} />
            </a>
          </div>
        </Reveal>
      </section>

      {/* ─── FOOTER ──────────────────────────────────────────────────────────── */}
      <footer style={{ borderTop: '1px solid var(--border)', padding: '28px 24px', background: 'white' }}>
        <div className="footer-container" style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
            <div style={{ width: 28, height: 28, borderRadius: 8, background: 'linear-gradient(135deg, #2196b5, #1a7a9a)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Linkedin size={13} color="white" />
            </div>
            <span style={{ fontWeight: 700, fontSize: 14, color: 'var(--navy)', letterSpacing: '-0.02em' }}>
              DevPost<span style={{ color: 'var(--teal)' }}>AI</span>
            </span>
          </div>
          <div className="footer-links" style={{ display: 'flex', gap: 24 }}>
            {[['Privacy', '/privacy'], ['Terms', '/terms'], ['About', '/about'], ['Refund Policy', '/refund-policy']].map(([l, href]) => (
              <a key={l} href={href} className="footer-link">{l}</a>
            ))}
          </div>
          <p style={{ fontSize: 12, color: 'var(--text-muted)' }}>© 2026 DevPost AI. Built for creators.</p>
        </div>
      </footer>
    </div>
  )
}

export default Home