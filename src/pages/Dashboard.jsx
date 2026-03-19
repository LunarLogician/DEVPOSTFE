import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { paymentAPI } from '../api/api';
import { useAuth } from '../context/AuthContext';
import { postsAPI, linkedinAPI } from '../api/api';
import LinkedInSettings from '../components/LinkedInSettings';
import toast from 'react-hot-toast';
import {
  Sparkles, LogOut, Loader2, Copy, Check, Save, Trash2, Crown,
  Linkedin, ExternalLink, Edit, X, RefreshCw, Heart,
  MessageCircle, Share2, CheckCircle, FileText, Zap,
  LayoutDashboard, Settings, HelpCircle, BarChart2,
  Bell, Moon, Search, Plus, Image, Lightbulb, BookOpen,
} from 'lucide-react';

/* ─── Font injection ─── */
if (typeof document !== 'undefined' && !document.getElementById('stitch-fonts')) {
  const link = document.createElement('link');
  link.id = 'stitch-fonts';
  link.rel = 'stylesheet';
  link.href = 'https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=DM+Serif+Display:ital@0;1&display=swap';
  document.head.appendChild(link);

  const style = document.createElement('style');
  style.textContent = `
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: 'DM Sans', sans-serif; }

    :root {
      --navy: #1a2744;
      --navy-dark: #141e36;
      --navy-mid: #1e2f52;
      --navy-border: rgba(255,255,255,0.07);
      --navy-hover: rgba(255,255,255,0.06);
      --navy-active: rgba(255,255,255,0.1);
      --teal: #2196b5;
      --teal-deep: #1a7a9a;
      --teal-light: #e8f6fa;
      --teal-pale: #c8e8f2;
      --purple: #7c5cbf;
      --purple-light: #ede8f8;
      --blue-gray: #f0f4f8;
      --blue-gray-mid: #e2eaf2;
      --white: #ffffff;
      --text-primary: #1a2744;
      --text-secondary: #4a6080;
      --text-muted: #8a9bb5;
      --text-nav: rgba(255,255,255,0.5);
      --text-nav-active: #ffffff;
      --border: #dde4ee;
      --shadow-sm: 0 1px 3px rgba(26,39,68,0.05), 0 2px 8px rgba(26,39,68,0.04);
      --shadow-md: 0 4px 16px rgba(26,39,68,0.09), 0 2px 6px rgba(26,39,68,0.04);
      --shadow-teal: 0 6px 20px rgba(33,150,181,0.32);
      --r: 14px;
      --r-sm: 10px;
      --r-pill: 99px;
    }

    ::-webkit-scrollbar { width: 4px; }
    ::-webkit-scrollbar-track { background: transparent; }
    ::-webkit-scrollbar-thumb { background: var(--blue-gray-mid); border-radius: 99px; }

    .nav-item {
      display: flex; align-items: center; gap: 10px;
      padding: 9px 13px; border-radius: 9px;
      font-size: 13px; font-weight: 500;
      color: var(--text-nav); cursor: pointer; border: none;
      background: transparent; width: 100%;
      transition: all 0.17s ease; text-align: left;
      text-decoration: none; font-family: 'DM Sans', sans-serif;
      letter-spacing: -0.01em; position: relative;
    }
    .nav-item:hover { color: rgba(255,255,255,0.82); background: var(--navy-hover); }
    .nav-item.active {
      color: var(--text-nav-active); background: var(--navy-active);
    }
    .nav-item.active::before {
      content: ''; position: absolute; left: 0; top: 6px; bottom: 6px;
      width: 2.5px; border-radius: 0 2px 2px 0;
      background: var(--teal);
    }

    .stat-card {
      background: var(--white); border-radius: var(--r);
      padding: 22px 24px; border: 1px solid var(--border);
      box-shadow: var(--shadow-sm);
      display: flex; align-items: center; justify-content: space-between;
      transition: box-shadow 0.2s, transform 0.2s;
    }
    .stat-card:hover { box-shadow: var(--shadow-md); transform: translateY(-1px); }

    .stat-icon {
      width: 46px; height: 46px; border-radius: 13px;
      display: flex; align-items: center; justify-content: center; flex-shrink: 0;
    }

    .tone-pill {
      padding: 7px 15px; border-radius: var(--r-pill);
      font-size: 13px; font-weight: 500;
      border: 1.5px solid var(--blue-gray-mid);
      background: var(--white); color: var(--text-secondary);
      cursor: pointer; transition: all 0.16s ease;
      font-family: 'DM Sans', sans-serif;
    }
    .tone-pill:hover { border-color: var(--purple); color: var(--purple); }
    .tone-pill.active {
      background: var(--purple); border-color: var(--purple);
      color: white; box-shadow: 0 3px 10px rgba(124,92,191,0.28);
    }

    .length-pill {
      padding: 8px 22px; border-radius: var(--r-pill);
      font-size: 13px; font-weight: 500;
      border: 1.5px solid var(--blue-gray-mid);
      background: var(--white); color: var(--text-secondary);
      cursor: pointer; transition: all 0.16s ease;
      font-family: 'DM Sans', sans-serif;
    }
    .length-pill:hover { border-color: var(--teal); color: var(--teal); }
    .length-pill.active {
      background: var(--teal); border-color: var(--teal);
      color: white; box-shadow: 0 3px 10px rgba(33,150,181,0.28);
    }

    .gen-btn {
      width: 100%; padding: 15px;
      background: linear-gradient(135deg, #2196b5 0%, #1a7a9a 100%);
      color: white; font-family: 'DM Sans', sans-serif;
      font-size: 15px; font-weight: 600; letter-spacing: -0.01em;
      border: none; border-radius: 12px; cursor: pointer;
      display: flex; align-items: center; justify-content: center; gap: 8px;
      transition: all 0.2s; box-shadow: var(--shadow-teal);
    }
    .gen-btn:hover:not(:disabled) { transform: translateY(-1px); box-shadow: 0 9px 28px rgba(33,150,181,0.42); }
    .gen-btn:disabled { opacity: 0.6; cursor: not-allowed; transform: none; }

    .post-input {
      width: 100%; padding: 14px 16px;
      background: var(--blue-gray); border: 1.5px solid var(--blue-gray-mid);
      border-radius: 12px; font-size: 13.5px; line-height: 1.65;
      color: var(--text-primary); resize: none; outline: none;
      font-family: 'DM Sans', sans-serif;
      transition: border-color 0.18s, box-shadow 0.18s, background 0.18s;
    }
    .post-input:focus {
      border-color: var(--teal); background: white;
      box-shadow: 0 0 0 3px rgba(33,150,181,0.12);
    }
    .post-input::placeholder { color: var(--text-muted); }

    .action-btn {
      display: inline-flex; align-items: center; gap: 6px;
      padding: 7px 13px; border-radius: 8px; font-size: 12.5px;
      font-weight: 500; cursor: pointer; transition: all 0.15s;
      border: 1.5px solid var(--border); background: var(--white);
      color: var(--text-secondary); font-family: 'DM Sans', sans-serif;
    }
    .action-btn:hover { border-color: var(--teal); color: var(--teal); }
    .action-btn.primary { background: var(--teal); border-color: var(--teal); color: white; }
    .action-btn.primary:hover { background: var(--teal-deep); border-color: var(--teal-deep); }
    .action-btn.danger { color: #d95252; border-color: #f5caca; }
    .action-btn.danger:hover { background: #fff5f5; border-color: #e8b0b0; }

    .section-label {
      font-size: 10.5px; font-weight: 700; letter-spacing: 0.08em;
      text-transform: uppercase; color: var(--text-muted); margin-bottom: 10px;
    }

    .upload-zone {
      border: 2px dashed var(--blue-gray-mid); border-radius: 12px;
      padding: 30px 20px; text-align: center; cursor: pointer;
      transition: all 0.18s; background: var(--blue-gray);
      color: var(--text-muted); display: block;
    }
    .upload-zone:hover {
      border-color: var(--teal); background: var(--teal-light);
      color: var(--teal-deep);
    }

    .post-card {
      background: var(--white); border-radius: var(--r);
      border: 1.5px solid var(--border); padding: 18px;
      cursor: pointer; transition: all 0.2s; box-shadow: var(--shadow-sm);
    }
    .post-card:hover {
      border-color: var(--teal); box-shadow: var(--shadow-md);
      transform: translateY(-2px);
    }

    .new-post-btn {
      display: flex; align-items: center; justify-content: center; gap: 7px;
      width: 100%; padding: 11px;
      background: linear-gradient(135deg, #2196b5, #1a7a9a);
      color: white; border: none; border-radius: 9px;
      font-size: 13px; font-weight: 600; cursor: pointer;
      font-family: 'DM Sans', sans-serif; letter-spacing: -0.01em;
      box-shadow: 0 4px 14px rgba(33,150,181,0.35);
      transition: all 0.18s;
    }
    .new-post-btn:hover { transform: translateY(-1px); box-shadow: 0 7px 20px rgba(33,150,181,0.45); }
  `;
  document.head.appendChild(style);
}

const TONES = ['Educational', 'Storytelling', 'Opinion', 'Controversial', 'Humorous'];
const LENGTHS = ['Short', 'Medium', 'Long'];
const NAV = [
  { id: 'generate',   label: 'Dashboard',       Icon: LayoutDashboard },
  { id: 'posts',      label: 'Content Studio',  Icon: FileText },
  { id: 'analytics',  label: 'Analytics',       Icon: BarChart2 },
  { id: 'library',    label: 'Library',         Icon: BookOpen },
  { id: 'linkedin',   label: 'Settings',        Icon: Settings },
];

/* ─── Live Preview ─── */
const LivePreview = ({ content, imagePreview, userName }) => {
  const initials = userName ? userName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) : 'ME';
  return (
    <div style={{ background: 'var(--white)', borderRadius: 'var(--r)', border: '1.5px solid var(--border)', overflow: 'hidden' }}>
      <div style={{ padding: '10px 16px', borderBottom: '1px solid var(--blue-gray)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.09em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
          Live Preview
        </span>
        {content && <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#4caf7d', display: 'block', boxShadow: '0 0 0 2.5px rgba(76,175,125,0.2)' }} />}
      </div>
      <div style={{ padding: '14px 16px' }}>
        {/* Profile */}
        <div style={{ display: 'flex', gap: 10, marginBottom: 12 }}>
          <div style={{ width: 38, height: 38, borderRadius: '50%', flexShrink: 0, background: 'linear-gradient(135deg, #e8b88a, #cf8850)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ color: 'white', fontSize: 12, fontWeight: 700 }}>{initials}</span>
          </div>
          <div>
            <p style={{ fontSize: 12.5, fontWeight: 700, color: 'var(--text-primary)' }}>{userName || 'Your Name'} <span style={{ fontWeight: 400, color: 'var(--text-muted)' }}>• 1st</span></p>
            <p style={{ fontSize: 11, color: 'var(--text-muted)' }}>Digital Strategist & Content Creator</p>
            <p style={{ fontSize: 10.5, color: '#b8c5d8' }}>Just now • 🌐</p>
          </div>
        </div>

        {/* Body */}
        {content ? (
          <p style={{ fontSize: 12.5, color: 'var(--text-primary)', lineHeight: 1.65, marginBottom: 10, whiteSpace: 'pre-wrap' }}>
            {content.length > 200 ? content.slice(0, 200) + '…' : content}
          </p>
        ) : (
          <div style={{ marginBottom: 12, display: 'flex', flexDirection: 'column', gap: 5 }}>
            {[88, 95, 80, 68, 50].map((w, i) => (
              <div key={i} style={{ height: 7, borderRadius: 4, background: 'var(--blue-gray-mid)', width: `${w}%` }} />
            ))}
          </div>
        )}

        {content && (
          <p style={{ fontSize: 11.5, color: 'var(--teal)', fontWeight: 500, marginBottom: 10 }}>
            #DigitalMarketing #PersonalBranding #Strategy
          </p>
        )}

        {/* Image */}
        {imagePreview ? (
          <img src={imagePreview} alt="" style={{ width: '100%', height: 110, objectFit: 'cover', borderRadius: 8, marginBottom: 10, border: '1px solid var(--border)' }} />
        ) : (
          <div style={{ width: '100%', height: 100, borderRadius: 8, background: 'var(--blue-gray)', border: '1px solid var(--blue-gray-mid)', marginBottom: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 4 }}>
            <Image size={20} color="var(--text-muted)" />
            <span style={{ fontSize: 10, color: 'var(--text-muted)', letterSpacing: '0.05em', textTransform: 'uppercase', fontWeight: 600 }}>Post Visual</span>
          </div>
        )}

        {/* Engagement */}
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'var(--text-muted)', paddingBottom: 9, borderBottom: '1px solid var(--blue-gray)' }}>
          <span>👍 You and 0 others</span>
          <span>0 comments • 0 shares</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-around', paddingTop: 6 }}>
          {[['👍', 'Like'], ['💬', 'Comment'], ['↗️', 'Share'], ['➤', 'Send']].map(([icon, lbl]) => (
            <button key={lbl} style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '4px 8px', borderRadius: 6, border: 'none', background: 'transparent', fontSize: 11, color: 'var(--text-secondary)', cursor: 'pointer', fontFamily: 'DM Sans, sans-serif', fontWeight: 500 }}>
              {icon} {lbl}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

/* ═══════════════════════
   MAIN
═══════════════════════ */
const Dashboard = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const [tab, setTab] = useState('generate');
  const [form, setForm] = useState({ topic: '', tone: 'Educational', length: 'Medium' });
  const [imgPrev, setImgPrev] = useState(null);
  const [imgB64, setImgB64] = useState(null);
  const [post, setPost] = useState('');
  const [editing, setEditing] = useState('');
  const [postId, setPostId] = useState(null);
  const [generating, setGenerating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [posting, setPosting] = useState(false);
  const [stats, setStats] = useState(null);
  const [saved, setSaved] = useState([]);
  const [liPosts, setLiPosts] = useState([]);
  const [liLoading, setLiLoading] = useState(false);
  const [modal, setModal] = useState(null);
  const [modalEdit, setModalEdit] = useState(false);
  const [modalTxt, setModalTxt] = useState('');

  useEffect(() => {
    fetchStats(); fetchSaved();
    const p = new URLSearchParams(window.location.search);
    if (p.get('payment') === 'success') { toast.success('🎉 Plan upgraded!'); window.history.replaceState({}, '', '/dashboard'); setTimeout(fetchStats, 2000); }
    if (p.get('linkedin') === 'connected') { toast.success('LinkedIn connected!'); fetchStats(); window.history.replaceState({}, '', '/dashboard'); }
    else if (p.get('error')) { toast.error('LinkedIn connection failed'); window.history.replaceState({}, '', '/dashboard'); }
  }, []);

  useEffect(() => { if (stats?.linkedinConnected) fetchLiPosts(); }, [stats?.linkedinConnected]);
  useEffect(() => {
    const h = e => { const items = e.clipboardData?.items; if (!items) return; for (let it of items) if (it.type.startsWith('image/')) { processImg(it.getAsFile()); break; } };
    window.addEventListener('paste', h); return () => window.removeEventListener('paste', h);
  }, []);

  const fetchStats = async () => { try { const { data } = await postsAPI.getStats(); setStats(data.data); } catch { } };
  const fetchSaved = async () => { try { const { data } = await postsAPI.getAll(); setSaved(data.data); } catch { } };
  const fetchLiPosts = async () => {
    setLiLoading(true);
    try { const { data } = await linkedinAPI.getLinkedInPosts(); if (data.success) setLiPosts(data.data || []); }
    catch (e) { if (e.response?.status === 401) toast.error('LinkedIn session expired.'); setLiPosts([]); }
    finally { setLiLoading(false); }
  };

  const processImg = file => {
    if (!file?.type?.startsWith('image/')) { toast.error('Not an image.'); return; }
    if (file.size > 5 * 1024 * 1024) { toast.error('Max 5MB'); return; }
    const r = new FileReader(); r.onload = e => { setImgB64(e.target.result); setImgPrev(e.target.result); toast.success('Image attached!'); }; r.readAsDataURL(file);
  };

  const handleGenerate = async e => {
    e.preventDefault();
    if (!form.topic.trim()) { toast.error('Enter a topic'); return; }
    setGenerating(true); setPost('');
    try {
      const { data } = await postsAPI.generate({ ...form, ...(imgB64 && { image: imgB64 }) });
      if (data.success) { setPost(data.data.content); setEditing(data.data.content); setPostId(data.data._id); toast.success('Post generated!'); fetchStats(); fetchSaved(); }
    } catch (e) { toast.error(e.response?.data?.message || 'Generation failed'); }
    finally { setGenerating(false); }
  };

  const handleCopy = async () => {
    try { await navigator.clipboard.writeText(editing); setCopied(true); toast.success('Copied!'); setTimeout(() => setCopied(false), 2000); } catch { toast.error('Copy failed'); }
  };

  const handlePostToLinkedIn = async () => {
    if (!postId) return; setPosting(true);
    try { const { data } = await postsAPI.postToLinkedIn(postId); if (data.success) toast.success('Posted!'); }
    catch (e) { toast.error(e.response?.data?.message || 'Failed'); }
    finally { setPosting(false); }
  };

  const handleDelete = async id => {
    if (!window.confirm('Delete this post?')) return;
    try { await postsAPI.delete(id); toast.success('Deleted'); fetchSaved(); if (modal?._id === id) setModal(null); } catch { toast.error('Delete failed'); }
  };

  const handleUpdate = async () => {
    if (!modal) return;
    try { const { data } = await postsAPI.update(modal._id, { content: modalTxt }); toast.success('Saved!'); setModal(data.data); setModalEdit(false); fetchSaved(); } catch { toast.error('Update failed'); }
  };

  const copyText = async t => { try { await navigator.clipboard.writeText(t); toast.success('Copied!'); } catch { } };

  const limits = { free: 3, starter: 20, pro: 50 };
  const planLimit = limits[stats?.plan] || 3;
  const usedCount = planLimit - (stats?.remaining ?? planLimit);
  const planLabel = stats?.plan ? stats.plan.charAt(0).toUpperCase() + stats.plan.slice(1) : 'Free';

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden', background: 'var(--blue-gray)', fontFamily: "'DM Sans', sans-serif" }}>

      {/* ── Sidebar ── */}
      <aside style={{
        width: 215, flexShrink: 0,
        background: 'linear-gradient(170deg, #1e2f52 0%, #1a2744 55%, #141e36 100%)',
        display: 'flex', flexDirection: 'column',
        borderRight: '1px solid rgba(255,255,255,0.04)',
      }}>
        {/* Brand */}
        <div style={{ padding: '24px 18px 18px' }}>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <p style={{ fontFamily: "'DM Serif Display', serif", fontSize: 16.5, color: 'white', lineHeight: 1.15, letterSpacing: '-0.01em' }}>
              Editorial Intelligence
            </p>
            <p style={{ fontSize: 9, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.28)', marginTop: 4 }}>
              THE DIGITAL CURATOR
            </p>
          </Link>
        </div>

        <div style={{ height: 1, background: 'rgba(255,255,255,0.06)', margin: '0 16px 10px' }} />

        {/* Nav */}
        <nav style={{ flex: 1, padding: '6px 10px', display: 'flex', flexDirection: 'column', gap: 1 }}>
          {NAV.map(({ id, label, Icon }) => (
            <button key={id} onClick={() => setTab(id)} className={`nav-item ${tab === id ? 'active' : ''}`}>
              <Icon size={14} style={{ flexShrink: 0, opacity: tab === id ? 1 : 0.65 }} />
              {label}
            </button>
          ))}
        </nav>

        {/* New Post */}
        <div style={{ padding: '6px 12px 10px' }}>
          <button className="new-post-btn" onClick={() => setTab('generate')}>
            <Plus size={14} /> New Post
          </button>
        </div>

        <div style={{ height: 1, background: 'rgba(255,255,255,0.06)', margin: '0 16px' }} />

        {/* Bottom */}
        <div style={{ padding: '8px 10px 6px', display: 'flex', flexDirection: 'column', gap: 1 }}>
          <button className="nav-item"><HelpCircle size={14} style={{ opacity: 0.65 }} /> Help Center</button>
          <button onClick={() => { logout(); navigate('/login'); }} className="nav-item">
            <LogOut size={14} style={{ opacity: 0.65 }} /> Log Out
          </button>
        </div>

        {/* User */}
        <div style={{ padding: '10px 14px 18px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 9, padding: '8px 6px' }}>
            <div style={{ width: 30, height: 30, borderRadius: '50%', background: 'linear-gradient(135deg, #4a90c4, #2d6088)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <span style={{ color: 'white', fontSize: 11, fontWeight: 700 }}>{user?.name?.charAt(0)?.toUpperCase() || 'U'}</span>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ fontSize: 11.5, fontWeight: 600, color: 'rgba(255,255,255,0.75)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user?.name}</p>
              <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.28)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user?.email}</p>
            </div>
          </div>
        </div>
      </aside>

      {/* ── Right panel ── */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>

        {/* Topbar */}
        <div style={{ height: 56, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 28px', background: 'var(--white)', borderBottom: '1px solid var(--border)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 16px', background: 'var(--blue-gray)', border: '1.5px solid var(--border)', borderRadius: 'var(--r-pill)', color: 'var(--text-muted)', fontSize: 13, width: 260, cursor: 'text' }}>
            <Search size={14} />
            <span>Search insights...</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', display: 'flex', padding: 4 }}><Bell size={17} /></button>
            <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', display: 'flex', padding: 4 }}><Moon size={16} /></button>
            <button style={{ padding: '7px 18px', borderRadius: 'var(--r-pill)', background: 'var(--teal)', color: 'white', border: 'none', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'DM Sans, sans-serif', boxShadow: '0 2px 8px rgba(33,150,181,0.3)', transition: 'all 0.15s' }}
              onMouseEnter={e => e.currentTarget.style.background = 'var(--teal-deep)'}
              onMouseLeave={e => e.currentTarget.style.background = 'var(--teal)'}
            >
              Upgrade Plan
            </button>
            <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'linear-gradient(135deg, var(--navy-mid), var(--navy-dark))', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
              <span style={{ color: 'white', fontSize: 11, fontWeight: 700 }}>{user?.name?.charAt(0)?.toUpperCase() || 'U'}</span>
            </div>
          </div>
        </div>

        {/* Main */}
        <main style={{ flex: 1, overflowY: 'auto', padding: '28px 28px 40px' }}>

          {/* ── GENERATE ── */}
          {tab === 'generate' && (
            <div>
              {/* Stats row */}
              {stats && (
                <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
                  style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14, marginBottom: 24 }}>

                  <div className="stat-card">
                    <div>
                      <p className="section-label" style={{ marginBottom: 7 }}>Posts Created</p>
                      <p style={{ fontSize: 34, fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.03em', lineHeight: 1 }}>{saved.length}</p>
                    </div>
                    <div className="stat-icon" style={{ background: 'rgba(124,92,191,0.1)' }}>
                      <Sparkles size={20} color="var(--purple)" />
                    </div>
                  </div>

                  <div className="stat-card">
                    <div>
                      <p className="section-label" style={{ marginBottom: 7 }}>Remaining Credits</p>
                      <p style={{ fontSize: 34, fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.03em', lineHeight: 1 }}>
                        {stats.remaining ?? '—'}
                        <span style={{ fontSize: 15, color: 'var(--text-muted)', fontWeight: 500, marginLeft: 5 }}>/ {planLimit}</span>
                      </p>
                    </div>
                    <div className="stat-icon" style={{ background: 'rgba(33,150,181,0.1)' }}>
                      <Zap size={20} color="var(--teal)" />
                    </div>
                  </div>

                  <div className="stat-card">
                    <div>
                      <p className="section-label" style={{ marginBottom: 7 }}>Plan Status</p>
                      <p style={{ fontSize: 22, fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.02em', lineHeight: 1.2 }}>{planLabel} Monthly</p>
                    </div>
                    <div className="stat-icon" style={{ background: 'rgba(76,175,125,0.1)' }}>
                      <CheckCircle size={20} color="#4caf7d" />
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Two-col */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 20, alignItems: 'start' }}>

                {/* Form */}
                <motion.div initial={{ opacity: 0, x: -14 }} animate={{ opacity: 1, x: 0 }}
                  style={{ background: 'var(--white)', borderRadius: 'var(--r)', border: '1.5px solid var(--border)', padding: 28, boxShadow: 'var(--shadow-sm)' }}>

                  <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 22, color: 'var(--text-primary)', marginBottom: 26, letterSpacing: '-0.01em' }}>
                    Create a Post
                  </h2>

                  <form onSubmit={handleGenerate} style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
                    <div>
                      <p className="section-label">Post Topic</p>
                      <textarea className="post-input" value={form.topic} onChange={e => setForm({ ...form, topic: e.target.value })}
                        rows={4} placeholder="What are we talking about today? Describe your idea or paste a link..." required />
                    </div>

                    <div>
                      <p className="section-label">Post Tone</p>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                        {TONES.map(t => (
                          <button key={t} type="button" onClick={() => setForm(f => ({ ...f, tone: t }))}
                            className={`tone-pill ${form.tone === t ? 'active' : ''}`}>{t}</button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <p className="section-label">Length</p>
                      <div style={{ display: 'flex', gap: 8 }}>
                        {LENGTHS.map(l => (
                          <button key={l} type="button" onClick={() => setForm(f => ({ ...f, length: l }))}
                            className={`length-pill ${form.length === l ? 'active' : ''}`}>{l}</button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <p className="section-label">Image (Optional)</p>
                      <input type="file" accept="image/*" onChange={e => { if (e.target.files?.[0]) processImg(e.target.files[0]); }} style={{ display: 'none' }} id="img-up" />
                      {imgPrev ? (
                        <div style={{ position: 'relative', borderRadius: 10, overflow: 'hidden', border: '1.5px solid var(--border)' }}>
                          <img src={imgPrev} alt="" style={{ width: '100%', height: 120, objectFit: 'cover', display: 'block' }} />
                          <button type="button" onClick={() => { setImgB64(null); setImgPrev(null); }}
                            style={{ position: 'absolute', top: 8, right: 8, width: 26, height: 26, borderRadius: '50%', background: 'rgba(0,0,0,0.5)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                            <X size={13} />
                          </button>
                        </div>
                      ) : (
                        <label htmlFor="img-up" className="upload-zone">
                          <Image size={26} style={{ margin: '0 auto 6px', display: 'block' }} />
                          <p style={{ fontSize: 13, fontWeight: 500 }}>Click to upload or drag and drop</p>
                        </label>
                      )}
                    </div>

                    <button type="submit" disabled={generating} className="gen-btn">
                      {generating ? <><Loader2 size={17} className="animate-spin" /> Generating…</> : <><Sparkles size={17} /> Generate Post</>}
                    </button>
                  </form>

                  {/* Post edit area */}
                  {post && (
                    <div style={{ marginTop: 22, paddingTop: 22, borderTop: '1px solid var(--blue-gray)' }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                        <p className="section-label" style={{ marginBottom: 0 }}>Refine Post</p>
                        <div style={{ display: 'flex', gap: 6 }}>
                          {stats?.linkedinConnected && (
                            <button onClick={handlePostToLinkedIn} disabled={posting} className="action-btn primary" style={{ fontSize: 12 }}>
                              {posting ? <><Loader2 size={11} className="animate-spin" />Posting…</> : <><Linkedin size={11} />Post</>}
                            </button>
                          )}
                          <button onClick={handleCopy} className="action-btn" style={{ fontSize: 12 }}>
                            {copied ? <><Check size={11} color="#4caf7d" />Copied!</> : <><Copy size={11} />Copy</>}
                          </button>
                        </div>
                      </div>
                      <textarea className="post-input" value={editing} onChange={e => setEditing(e.target.value)} rows={8} style={{ fontFamily: 'monospace', fontSize: 12.5 }} />
                    </div>
                  )}
                </motion.div>

                {/* Right col */}
                <motion.div initial={{ opacity: 0, x: 14 }} animate={{ opacity: 1, x: 0 }}
                  style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>

                  <LivePreview content={editing} imagePreview={imgPrev} userName={user?.name} />

                  {/* Tip */}
                  <div style={{ background: 'var(--teal-light)', borderRadius: 'var(--r)', border: '1.5px solid var(--teal-pale)', padding: 16, display: 'flex', gap: 10 }}>
                    <div style={{ width: 32, height: 32, borderRadius: 9, background: 'rgba(33,150,181,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Lightbulb size={15} color="var(--teal-deep)" />
                    </div>
                    <div>
                      <p style={{ fontSize: 11.5, fontWeight: 700, color: 'var(--teal-deep)', marginBottom: 3 }}>Editor's Tip</p>
                      <p style={{ fontSize: 12.5, color: '#2a6a80', lineHeight: 1.55 }}>LinkedIn posts with an image receive 2× more engagement. Add a relevant graphic to boost visibility.</p>
                    </div>
                  </div>

                  {/* Upgrade / Manage */}
                  {stats?.plan === 'free' && (
                    <div style={{ borderRadius: 'var(--r)', padding: '18px 20px', background: 'linear-gradient(135deg, #1e2f52, #141e36)', boxShadow: '0 8px 24px rgba(26,39,68,0.28)' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 5 }}>
                        <Crown size={14} color="#f5d08a" />
                        <span style={{ fontWeight: 700, color: 'white', fontSize: 13.5 }}>Go Pro</span>
                      </div>
                      <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.55)', marginBottom: 14, lineHeight: 1.5 }}>50 posts/month, auto-publish to LinkedIn & more.</p>
                      <Link to="/pricing" style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '7px 14px', background: 'var(--teal)', color: 'white', borderRadius: 8, fontSize: 12.5, fontWeight: 600, textDecoration: 'none', boxShadow: '0 3px 10px rgba(33,150,181,0.4)' }}>
                        <Zap size={12} /> Upgrade Now
                      </Link>
                    </div>
                  )}
                  {stats?.plan && stats.plan !== 'free' && (
                    <div style={{ background: 'var(--white)', borderRadius: 'var(--r)', border: '1.5px solid var(--border)', padding: 16 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                        <Crown size={13} color="#c8870a" />
                        <span style={{ fontWeight: 600, fontSize: 13, color: 'var(--text-primary)' }}>{planLabel} Plan — Active</span>
                      </div>
                      <p style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 12 }}>Manage billing or cancel anytime.</p>
                      <button onClick={async () => { try { const { data } = await paymentAPI.getPortalUrl(); if (data.portalUrl) window.open(data.portalUrl, '_blank'); } catch { toast.error('Failed'); } }}
                        className="action-btn primary" style={{ fontSize: 12 }}>
                        <ExternalLink size={11} /> Manage Billing
                      </button>
                    </div>
                  )}
                </motion.div>
              </div>
            </div>
          )}

          {/* ── POSTS ── */}
          {tab === 'posts' && (
            <div>
              <div style={{ marginBottom: 22 }}>
                <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 26, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>Content Studio</h1>
                <p style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 4 }}>{saved.length} post{saved.length !== 1 ? 's' : ''} generated</p>
              </div>
              {saved.length === 0 ? (
                <div style={{ background: 'var(--white)', borderRadius: 'var(--r)', border: '1.5px solid var(--border)', padding: '60px 20px', textAlign: 'center' }}>
                  <div style={{ width: 52, height: 52, borderRadius: 14, background: 'var(--blue-gray)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                    <FileText size={24} color="var(--text-muted)" />
                  </div>
                  <p style={{ fontWeight: 600, fontSize: 15, color: 'var(--text-primary)', marginBottom: 4 }}>No posts yet</p>
                  <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 20 }}>Go to Dashboard and generate your first post.</p>
                  <button onClick={() => setTab('generate')} className="gen-btn" style={{ display: 'inline-flex', width: 'auto', padding: '10px 22px' }}>
                    <Sparkles size={15} /> Create a Post
                  </button>
                </div>
              ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(272px, 1fr))', gap: 14 }}>
                  {saved.map((p, i) => (
                    <motion.div key={p._id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
                      className="post-card" onClick={() => { setModal(p); setModalTxt(p.content); setModalEdit(false); }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                        <span style={{ fontSize: 11, padding: '3px 10px', borderRadius: 99, background: 'var(--purple-light)', color: 'var(--purple)', fontWeight: 600 }}>{p.tone}</span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                          {p.linkedinPostId && <CheckCircle size={13} color="#4caf7d" />}
                          <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>{new Date(p.createdAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <p style={{ fontSize: 13.5, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 6, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.topic}</p>
                      <p style={{ fontSize: 12.5, color: 'var(--text-secondary)', lineHeight: 1.6, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                        {p.content.substring(0, 160)}…
                      </p>
                      <div style={{ display: 'flex', gap: 6, marginTop: 14 }}>
                        <button onClick={e => { e.stopPropagation(); copyText(p.content); }} className="action-btn" style={{ flex: 1, justifyContent: 'center', fontSize: 11.5 }}>
                          <Copy size={11} /> Copy
                        </button>
                        <button onClick={e => { e.stopPropagation(); handleDelete(p._id); }} className="action-btn danger" style={{ padding: '6px 10px' }}>
                          <Trash2 size={12} />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ── SETTINGS / LINKEDIN ── */}
          {tab === 'linkedin' && (
            <div>
              <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 26, color: 'var(--text-primary)', letterSpacing: '-0.02em', marginBottom: 4 }}>Settings</h1>
              <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 24 }}>Connect LinkedIn and manage your account.</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                <LinkedInSettings stats={stats} onUpdate={fetchStats} />
                {stats?.linkedinConnected && liPosts.length > 0 && (
                  <div style={{ background: 'var(--white)', borderRadius: 'var(--r)', border: '1.5px solid var(--border)', padding: 24 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                      <div>
                        <h3 style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: 15 }}>Recent LinkedIn Posts</h3>
                        <p style={{ fontSize: 12.5, color: 'var(--text-muted)', marginTop: 3 }}>Engagement from your profile</p>
                      </div>
                      <button onClick={fetchLiPosts} disabled={liLoading} className="action-btn">
                        <RefreshCw size={13} className={liLoading ? 'animate-spin' : ''} />
                      </button>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                      {liPosts.map((p, i) => (
                        <div key={p.id || i} style={{ padding: 14, background: 'var(--blue-gray)', borderRadius: 10, border: '1.5px solid var(--border)' }}>
                          <p style={{ fontSize: 12.5, color: 'var(--text-primary)', lineHeight: 1.55, marginBottom: 10, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                            {p.text || p.content || 'No content'}
                          </p>
                          <div style={{ display: 'flex', gap: 12, fontSize: 12 }}>
                            <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><Heart size={11} color="#e07070" />{p.likes || 0}</span>
                            <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><MessageCircle size={11} color="var(--teal)" />{p.comments || 0}</span>
                            <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><Share2 size={11} color="#7aaa8a" />{p.shares || 0}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Placeholder */}
          {(tab === 'analytics' || tab === 'library') && (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '55vh', flexDirection: 'column', gap: 12 }}>
              <div style={{ width: 58, height: 58, borderRadius: 16, background: 'var(--teal-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1.5px solid var(--teal-pale)' }}>
                {tab === 'analytics' ? <BarChart2 size={26} color="var(--teal)" /> : <BookOpen size={26} color="var(--teal)" />}
              </div>
              <p style={{ fontFamily: "'DM Serif Display', serif", fontSize: 20, color: 'var(--text-primary)' }}>
                {tab === 'analytics' ? 'Analytics' : 'Library'} coming soon
              </p>
              <p style={{ fontSize: 13, color: 'var(--text-muted)' }}>This section is under development.</p>
            </div>
          )}
        </main>
      </div>

      {/* ── Modal ── */}
      <AnimatePresence>
        {modal && (
          <div style={{ position: 'fixed', inset: 0, background: 'rgba(20,30,54,0.52)', backdropFilter: 'blur(6px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16, zIndex: 50 }}>
            <motion.div initial={{ opacity: 0, scale: 0.97, y: 12 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.97, y: 12 }}
              style={{ background: 'var(--white)', borderRadius: 18, width: '100%', maxWidth: 600, maxHeight: '88vh', display: 'flex', flexDirection: 'column', boxShadow: '0 24px 80px rgba(26,39,68,0.28)', border: '1.5px solid var(--border)' }}>
              <div style={{ padding: '20px 22px 16px', borderBottom: '1px solid var(--blue-gray)', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                    <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-primary)' }}>{modal.topic}</h3>
                    {modal.linkedinPostId && <CheckCircle size={15} color="#4caf7d" />}
                  </div>
                  <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                    <span style={{ fontSize: 11, padding: '2px 9px', borderRadius: 99, background: 'var(--purple-light)', color: 'var(--purple)', fontWeight: 600 }}>{modal.tone}</span>
                    <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>· {modal.length} · {new Date(modal.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
                <button onClick={() => { setModal(null); setModalEdit(false); }}
                  style={{ padding: 7, border: 'none', background: 'var(--blue-gray)', borderRadius: 8, cursor: 'pointer', display: 'flex', color: 'var(--text-secondary)', transition: 'background 0.15s' }}>
                  <X size={15} />
                </button>
              </div>
              <div style={{ flex: 1, overflowY: 'auto', padding: '18px 22px' }}>
                {modalEdit ? (
                  <textarea className="post-input" value={modalTxt} onChange={e => setModalTxt(e.target.value)} rows={16} style={{ fontFamily: 'monospace', fontSize: 13 }} />
                ) : (
                  <pre style={{ whiteSpace: 'pre-wrap', fontFamily: "'DM Sans', sans-serif", fontSize: 13.5, color: 'var(--text-primary)', background: 'var(--blue-gray)', padding: '16px 18px', borderRadius: 10, lineHeight: 1.65, border: '1px solid var(--border)', margin: 0 }}>
                    {modal.content}
                  </pre>
                )}
              </div>
              <div style={{ padding: '13px 22px', borderTop: '1px solid var(--blue-gray)', background: 'var(--blue-gray)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10, borderRadius: '0 0 18px 18px' }}>
                <div style={{ display: 'flex', gap: 6 }}>
                  {!modalEdit ? (
                    <>
                      <button onClick={() => setModalEdit(true)} className="action-btn"><Edit size={12} /> Edit</button>
                      <button onClick={() => copyText(modal.content)} className="action-btn"><Copy size={12} /> Copy</button>
                      {stats?.linkedinConnected && !modal.linkedinPostId && (
                        <button onClick={async () => { try { const { data } = await postsAPI.postToLinkedIn(modal._id); if (data.success) { toast.success('Posted!'); fetchSaved(); } } catch { toast.error('Failed'); } }}
                          className="action-btn primary"><Linkedin size={12} /> Post</button>
                      )}
                    </>
                  ) : (
                    <>
                      <button onClick={handleUpdate} className="action-btn primary"><Save size={12} /> Save</button>
                      <button onClick={() => { setModalEdit(false); setModalTxt(modal.content); }} className="action-btn">Cancel</button>
                    </>
                  )}
                </div>
                <button onClick={() => handleDelete(modal._id)} className="action-btn danger"><Trash2 size={12} /> Delete</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Dashboard;