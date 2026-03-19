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
  Linkedin, ExternalLink, Eye, Edit, X, RefreshCw, Heart,
  MessageCircle, Share2, CheckCircle, FileText, Zap, LayoutDashboard,
  Settings, ChevronRight, TrendingUp, BarChart2,
} from 'lucide-react';

/* ─── Google font injection ─── */
if (typeof document !== 'undefined' && !document.getElementById('instrument-serif')) {
  const link = document.createElement('link');
  link.id = 'instrument-serif';
  link.rel = 'stylesheet';
  link.href = 'https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&display=swap';
  document.head.appendChild(link);
}

const TONES = ['Educational', 'Storytelling', 'Opinion', 'Motivational', 'Technical', 'Casual'];
const LENGTHS = [
  { value: 'Short',  label: 'Short',  sub: '~125 words' },
  { value: 'Medium', label: 'Medium', sub: '~200 words' },
  { value: 'Long',   label: 'Long',   sub: '~300 words' },
];
const NAV = [
  { id: 'generate', label: 'Generate',  Icon: Sparkles },
  { id: 'posts',    label: 'My Posts',  Icon: FileText },
  { id: 'linkedin', label: 'LinkedIn',  Icon: Linkedin },
];

/* ─── Manage subscription ─── */
const ManageSubscriptionCard = ({ plan }) => {
  const [loading, setLoading] = useState(false);
  const handlePortal = async () => {
    try {
      setLoading(true);
      const { data } = await paymentAPI.getPortalUrl();
      if (data.portalUrl) window.open(data.portalUrl, '_blank');
      else toast.error('Could not open customer portal');
    } catch { toast.error('Failed to open customer portal'); }
    finally { setLoading(false); }
  };

  return (
    <div className="rounded-2xl border border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50 p-5">
      <div className="flex gap-3 items-start">
        <Crown className="w-5 h-5 text-amber-600 mt-0.5 shrink-0" />
        <div>
          <p className="font-semibold text-gray-900 capitalize mb-1">{plan} Plan — Active</p>
          <p className="text-sm text-gray-500 mb-3">Manage billing, invoices, or cancel anytime.</p>
          <div className="flex gap-2 flex-wrap">
            <button onClick={handlePortal} disabled={loading}
              className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white text-sm rounded-lg font-medium flex items-center gap-1.5 transition-colors disabled:opacity-50">
              {loading ? <Loader2 className="w-4 h-4 animate-spin"/> : <ExternalLink className="w-4 h-4"/>}
              Manage Billing
            </button>
            <Link to="/pricing" className="px-4 py-2 bg-white border border-amber-200 text-amber-700 text-sm rounded-lg font-medium hover:bg-amber-50 transition-colors">
              View Plans
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ─── Live LinkedIn preview ─── */
const LivePreview = ({ content, imagePreview, userName }) => {
  const initials = userName ? userName.split(' ').map(n=>n[0]).join('').toUpperCase().slice(0,2) : 'ME';
  return (
    <div className="rounded-2xl border border-gray-200 bg-white overflow-hidden shadow-sm">
      <div className="px-4 py-2 bg-gray-50 border-b border-gray-100 flex items-center gap-1.5">
        <div className="w-2.5 h-2.5 rounded-full bg-red-400"/>
        <div className="w-2.5 h-2.5 rounded-full bg-yellow-400"/>
        <div className="w-2.5 h-2.5 rounded-full bg-green-400"/>
        <span className="ml-auto text-[10px] tracking-widest uppercase font-medium text-gray-400">LinkedIn Preview</span>
      </div>
      <div className="p-4">
        <div className="flex items-start gap-3 mb-3">
          <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center shrink-0">
            <span className="text-white text-sm font-bold">{initials}</span>
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-900">{userName || 'Your Name'}</p>
            <p className="text-xs text-gray-500">Software Developer · 1st</p>
            <p className="text-xs text-gray-400">Just now · 🌐</p>
          </div>
          <svg viewBox="0 0 24 24" fill="#0A66C2" className="w-5 h-5 ml-auto mt-0.5 shrink-0">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
          </svg>
        </div>
        {imagePreview && <img src={imagePreview} alt="" className="w-full h-36 object-cover rounded-lg mb-3 border border-gray-100"/>}
        <div className="text-sm text-gray-800 leading-relaxed max-h-44 overflow-y-auto whitespace-pre-wrap">
          {content || <span className="text-gray-400 italic">Your post will appear here…</span>}
        </div>
        <div className="mt-4 pt-3 border-t border-gray-100">
          <div className="flex items-center gap-1 mb-2.5 text-xs text-gray-400">
            <span>👍</span><span>❤️</span><span>💡</span>
            <span className="ml-1">Be the first to react</span>
            <span className="ml-auto">0 comments</span>
          </div>
          <div className="flex justify-around text-xs text-gray-500 font-medium">
            {[['❤️','Like'],['💬','Comment'],['↗️','Share']].map(([icon,label]) => (
              <button key={label} className="flex items-center gap-1 px-3 py-1.5 rounded hover:bg-gray-100 transition-colors">
                {icon} {label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════
   MAIN DASHBOARD
═══════════════════════════════════════════════ */
const Dashboard = () => {
  const navigate   = useNavigate();
  const { user, logout } = useAuth();

  const [tab,        setTab]        = useState('generate');
  const [form,       setForm]       = useState({ topic:'', tone:'Educational', length:'Medium' });
  const [imgPrev,    setImgPrev]    = useState(null);
  const [imgB64,     setImgB64]     = useState(null);
  const [post,       setPost]       = useState('');
  const [editing,    setEditing]    = useState('');
  const [postId,     setPostId]     = useState(null);
  const [generating, setGenerating] = useState(false);
  const [copied,     setCopied]     = useState(false);
  const [posting,    setPosting]    = useState(false);
  const [stats,      setStats]      = useState(null);
  const [saved,      setSaved]      = useState([]);
  const [liPosts,    setLiPosts]    = useState([]);
  const [liLoading,  setLiLoading]  = useState(false);
  const [modal,      setModal]      = useState(null); // post being viewed
  const [modalEdit,  setModalEdit]  = useState(false);
  const [modalTxt,   setModalTxt]   = useState('');

  /* ── boot ── */
  useEffect(() => {
    fetchStats(); fetchSaved();
    const p = new URLSearchParams(window.location.search);
    if (p.get('payment')==='success') {
      toast.success('🎉 Payment successful! Plan upgraded.');
      window.history.replaceState({},'',' /dashboard');
      setTimeout(fetchStats, 2000);
    }
    if (p.get('linkedin')==='connected') { toast.success('LinkedIn connected!'); fetchStats(); window.history.replaceState({},'','/dashboard'); }
    else if (p.get('error')) { toast.error('Failed to connect LinkedIn'); window.history.replaceState({},'','/dashboard'); }
  },[]);

  useEffect(()=>{ if(stats?.linkedinConnected) fetchLiPosts(); },[stats?.linkedinConnected]);

  useEffect(()=>{
    const h=(e)=>{ const items=e.clipboardData?.items; if(!items) return; for(let it of items) if(it.type.startsWith('image/')){ processImg(it.getAsFile()); break; } };
    window.addEventListener('paste',h); return ()=>window.removeEventListener('paste',h);
  },[]);

  /* ── fetch ── */
  const fetchStats = async()=>{ try{ const{data}=await postsAPI.getStats(); setStats(data.data); } catch(e){ console.error(e); } };
  const fetchSaved = async()=>{ try{ const{data}=await postsAPI.getAll(); setSaved(data.data); } catch(e){ console.error(e); } };
  const fetchLiPosts = async()=>{
    setLiLoading(true);
    try{ const{data}=await linkedinAPI.getLinkedInPosts(); if(data.success) setLiPosts(data.data||[]); }
    catch(e){ if(e.response?.status===401) toast.error('LinkedIn session expired.',{duration:3000}); setLiPosts([]); }
    finally{ setLiLoading(false); }
  };

  /* ── image ── */
  const processImg=(file)=>{
    if(!file.type.startsWith('image/')){ toast.error('Not an image.'); return; }
    if(file.size>5*1024*1024){ toast.error('Image too large (5MB max)'); return; }
    const r=new FileReader(); r.onload=(e)=>{ setImgB64(e.target.result); setImgPrev(e.target.result); toast.success('Image added!'); }; r.readAsDataURL(file);
  };

  /* ── generate ── */
  const handleGenerate=async(e)=>{
    e.preventDefault();
    if(!form.topic.trim()){ toast.error('Enter a topic'); return; }
    setGenerating(true); setPost('');
    try{
      const{data}=await postsAPI.generate({...form,...(imgB64&&{image:imgB64})});
      if(data.success){
        setPost(data.data.content); setEditing(data.data.content); setPostId(data.data._id);
        if(data.linkedinPostUrl) toast.success(<div>Published! <a href={data.linkedinPostUrl} target="_blank" rel="noopener noreferrer" className="underline">View</a></div>,{duration:5000});
        else toast.success('Post generated!');
        fetchStats(); fetchSaved();
      }
    } catch(e){ toast.error(e.response?.data?.message||'Generation failed', {duration:e.response?.data?.limit?5000:3000}); }
    finally{ setGenerating(false); }
  };

  const handleCopy=async()=>{
    try{ await navigator.clipboard.writeText(editing); setCopied(true); toast.success('Copied!'); setTimeout(()=>setCopied(false),2000); }
    catch{ toast.error('Copy failed'); }
  };

  const handlePostToLinkedIn=async()=>{
    if(!postId){ toast.error('No post to publish'); return; }
    setPosting(true);
    try{
      const{data}=await postsAPI.postToLinkedIn(postId);
      if(data.success) toast.success(<div>Posted! <a href={data.linkedinPostUrl} target="_blank" rel="noopener noreferrer" className="underline">View</a></div>,{duration:5000});
    } catch(e){ toast.error(e.response?.data?.message||'Failed to post'); }
    finally{ setPosting(false); }
  };

  const handleDelete=async(id)=>{
    if(!window.confirm('Delete this post?')) return;
    try{ await postsAPI.delete(id); toast.success('Deleted'); fetchSaved(); if(modal?._id===id) setModal(null); }
    catch{ toast.error('Delete failed'); }
  };

  const handleUpdate=async()=>{
    if(!modal) return;
    try{ const{data}=await postsAPI.update(modal._id,{content:modalTxt}); toast.success('Saved!'); setModal(data.data); setModalEdit(false); fetchSaved(); }
    catch{ toast.error('Update failed'); }
  };

  const copyText=async(t)=>{ try{ await navigator.clipboard.writeText(t); toast.success('Copied!'); } catch{ toast.error('Copy failed'); } };

  /* ── derived ── */
  const limits={free:3,starter:20,pro:50};
  const planLimit=limits[stats?.plan]||3;
  const usagePercent=stats ? Math.round(((planLimit-(stats.remaining??0))/planLimit)*100) : 0;
  const planLabel=stats?.plan ? stats.plan.charAt(0).toUpperCase()+stats.plan.slice(1) : 'Free';

  /* ═══ RENDER ═══ */
  return (
    <div className="flex h-screen overflow-hidden bg-[#f9f8f5]">

      {/* ── Sidebar ── */}
      <aside className="w-56 shrink-0 bg-[#0f0f0f] flex flex-col hidden md:flex">
        {/* Logo */}
        <div className="px-5 py-5 border-b border-white/10 bg-gradient-to-b from-blue-600/10 to-transparent">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shrink-0 shadow-lg shadow-blue-600/30 group-hover:shadow-blue-600/50 transition-shadow">
              <Sparkles className="w-4 h-4 text-white"/>
            </div>
            <div>
              <span className="text-white font-semibold text-base tracking-tight block leading-none">DevPost AI</span>
              <span className="text-white/30 text-[10px] tracking-widest uppercase">LinkedIn Engine</span>
            </div>
          </Link>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          {NAV.map(({id,label,Icon})=>(
            <button key={id} onClick={()=>setTab(id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                tab===id
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-white/50 hover:text-white/90 hover:bg-white/8'
              }`}>
              <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                tab===id ? 'bg-blue-100' : 'bg-white/5'
              }`}>
                <Icon className={`w-3.5 h-3.5 ${tab===id ? 'text-blue-600' : 'text-white/50'}`}/>
              </div>
              {label}
              {tab===id && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-500"/>}
            </button>
          ))}
        </nav>

        {/* Usage pill */}
        {stats && (
          <div className="mx-3 mb-3 p-3 rounded-xl bg-white/6 border border-white/10">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[11px] text-white/40 font-medium uppercase tracking-wider">Posts Used</span>
              <span className="text-xs text-white/70 font-semibold">{planLimit-(stats.remaining??0)}/{planLimit}</span>
            </div>
            <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
              <div className="h-full bg-blue-500 rounded-full transition-all" style={{width:`${usagePercent}%`}}/>
            </div>
            <p className="text-[11px] text-white/30 mt-1.5 capitalize">{planLabel} plan</p>
          </div>
        )}

        {/* User + logout */}
        <div className="px-3 pb-4 border-t border-white/10 pt-3">
          <div className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl hover:bg-white/6 transition-colors group">
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center shrink-0">
              <span className="text-white text-xs font-bold">{user?.name?.charAt(0)?.toUpperCase()||'U'}</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-white/80 truncate">{user?.name}</p>
              <p className="text-[10px] text-white/30 truncate">{user?.email}</p>
            </div>
            <button onClick={()=>{ logout(); navigate('/login'); }} title="Logout"
              className="opacity-0 group-hover:opacity-100 p-1 text-white/40 hover:text-white transition-all">
              <LogOut className="w-3.5 h-3.5"/>
            </button>
          </div>
        </div>
      </aside>

      {/* ── Mobile header ── */}
      <div className="md:hidden fixed top-0 inset-x-0 z-40 bg-[#0f0f0f] px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center"><Sparkles className="w-3.5 h-3.5 text-white"/></div>
          <span className="text-white font-semibold">DevPost AI</span>
        </div>
        <div className="flex gap-1">
          {NAV.map(({id,Icon})=>(
            <button key={id} onClick={()=>setTab(id)} className={`p-2 rounded-lg transition-colors ${tab===id?'bg-white/20 text-white':'text-white/50 hover:text-white'}`}>
              <Icon className="w-4 h-4"/>
            </button>
          ))}
        </div>
      </div>

      {/* ── Main scroll area ── */}
      <main className="flex-1 overflow-y-auto md:pt-0 pt-14">

        {/* ── GENERATE TAB ── */}
        {tab==='generate' && (
          <div className="min-h-full flex flex-col">
            {/* Page header */}
            <div className="px-8 pt-8 pb-5 border-b border-gray-100 mb-2">
              <div className="flex items-center gap-2.5 mb-1">
                <div className="w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center shrink-0 shadow-sm shadow-blue-600/30">
                  <Sparkles className="w-3.5 h-3.5 text-white"/>
                </div>
                <h1 className="text-2xl font-bold text-gray-900" style={{fontFamily:"'Instrument Serif', serif"}}>
                  Create a Post
                </h1>
              </div>
              <p className="text-sm text-gray-400 ml-9">Fill in the details and get a <span className="text-blue-500 font-medium">LinkedIn-ready post</span> in seconds.</p>
            </div>

            {/* Stats row */}
            {stats && (
              <motion.div initial={{opacity:0,y:-6}} animate={{opacity:1,y:0}} className="px-8 mb-6 grid grid-cols-2 lg:grid-cols-4 gap-3">
                {[
                  {label:'Posts Created',  value:saved.length,                                      Icon:Sparkles,  iconBg:'bg-blue-100',   iconColor:'text-blue-600',   val:'text-gray-900'},
                  {label:'Remaining',      value:stats.remaining??'—',                               Icon:Zap,       iconBg:(stats.remaining??99)<3?'bg-red-100':'bg-emerald-100', iconColor:(stats.remaining??99)<3?'text-red-600':'text-emerald-600', val:(stats.remaining??99)<3?'text-red-600':'text-gray-900'},
                  {label:'Plan',           value:planLabel,                                          Icon:Crown,     iconBg:'bg-amber-100',  iconColor:'text-amber-600',  val:'text-gray-900'},
                  {label:'LinkedIn',       value:stats.linkedinConnected?'Connected':'Disconnected', Icon:Linkedin,  iconBg:stats.linkedinConnected?'bg-blue-100':'bg-gray-100', iconColor:stats.linkedinConnected?'text-blue-600':'text-gray-400', val:stats.linkedinConnected?'text-blue-600':'text-gray-500'},
                ].map(({label,value,Icon,iconBg,iconColor,val})=>(
                  <div key={label} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
                    <div className="flex items-center gap-2 mb-2.5">
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${iconBg}`}>
                        <Icon className={`w-4 h-4 ${iconColor}`}/>
                      </div>
                      <p className="text-xs text-gray-400 font-medium leading-tight">{label}</p>
                    </div>
                    <p className={`text-xl font-bold ${val}`}>{value}</p>
                  </div>
                ))}
              </motion.div>
            )}

            {/* Two-column generator */}
            <div className="px-8 pb-10 grid grid-cols-1 xl:grid-cols-2 gap-6 flex-1">

              {/* Form card */}
              <motion.div initial={{opacity:0,x:-12}} animate={{opacity:1,x:0}} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <form onSubmit={handleGenerate} className="space-y-6">
                  {/* Topic */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Topic</label>
                    <div className="relative">
                      <textarea name="topic" value={form.topic} onChange={e=>setForm({...form,topic:e.target.value})}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all"
                        rows={3} placeholder="e.g., JavaScript closures, React hooks, career advice…" required/>
                      <span className={`absolute bottom-2.5 right-3 text-[10px] font-medium transition-colors ${
                        form.topic.length > 200 ? 'text-red-400' : form.topic.length > 100 ? 'text-amber-400' : 'text-gray-300'
                      }`}>{form.topic.length}</span>
                    </div>
                  </div>

                  {/* Tone */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2.5">Tone</label>
                    <div className="flex flex-wrap gap-2">
                      {TONES.map(t=>(
                        <button key={t} type="button" onClick={()=>setForm(f=>({...f,tone:t}))}
                          className={`px-3.5 py-1.5 rounded-full text-sm font-medium border transition-all ${form.tone===t ? 'bg-blue-600 text-white border-blue-600 shadow-sm' : 'bg-transparent text-gray-600 border-gray-200 hover:border-blue-300 hover:text-blue-600'}`}>
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Length */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2.5">Length</label>
                    <div className="grid grid-cols-3 gap-2">
                      {LENGTHS.map(({value,label,sub})=>(
                        <button key={value} type="button" onClick={()=>setForm(f=>({...f,length:value}))}
                          className={`py-3 px-2 rounded-xl border text-center transition-all ${form.length===value ? 'bg-blue-600 border-blue-600 text-white shadow-sm' : 'border-gray-200 text-gray-600 hover:border-blue-200 bg-gray-50'}`}>
                          <p className="text-sm font-semibold">{label}</p>
                          <p className={`text-[10px] mt-0.5 ${form.length===value?'text-blue-100':'text-gray-400'}`}>{sub}</p>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Image */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Image <span className="font-normal text-gray-400">(optional)</span>
                    </label>
                    <input type="file" accept="image/*" onChange={e=>{if(e.target.files?.[0])processImg(e.target.files[0]);}} className="hidden" id="img-up"/>
                    {imgPrev ? (
                      <div className="relative rounded-xl overflow-hidden border border-gray-200">
                        <img src={imgPrev} alt="" className="w-full h-32 object-cover"/>
                        <button type="button" onClick={()=>{setImgB64(null);setImgPrev(null);}}
                          className="absolute top-2 right-2 w-7 h-7 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-colors">
                          <X className="w-4 h-4"/>
                        </button>
                      </div>
                    ) : (
                      <label htmlFor="img-up" className="flex items-center justify-center gap-2 h-16 border-2 border-dashed border-gray-200 rounded-xl cursor-pointer hover:border-blue-400 hover:bg-blue-50/50 transition-all group">
                        <span className="text-xl">📎</span>
                        <span className="text-sm text-gray-400 group-hover:text-blue-600 transition-colors">Click to upload or paste</span>
                      </label>
                    )}
                  </div>

                  <button type="submit" disabled={generating}
                    className="relative w-full py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 text-white font-semibold rounded-xl flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-xl hover:shadow-blue-500/25 active:scale-[0.98] overflow-hidden group">
                    {!generating && (
                      <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"/>
                    )}
                    {generating ? <><Loader2 className="w-5 h-5 animate-spin"/> Generating…</> : <><Sparkles className="w-5 h-5"/> Generate Post</>}
                  </button>
                </form>
              </motion.div>

              {/* Preview card */}
              <motion.div initial={{opacity:0,x:12}} animate={{opacity:1,x:0}} className="space-y-4">
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-gray-900">Post Preview</h3>
                      {editing && (
                        <span className="flex items-center gap-1 text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"/> LIVE
                        </span>
                      )}
                    </div>
                    {post && (
                      <div className="flex gap-2">
                        {stats?.linkedinConnected && !stats?.autoPostToLinkedIn && (
                          <button onClick={handlePostToLinkedIn} disabled={posting}
                            className="px-3 py-1.5 bg-[#0A66C2] hover:bg-[#004182] text-white text-xs rounded-lg font-medium flex items-center gap-1.5 transition-colors disabled:opacity-50">
                            {posting ? <><Loader2 className="w-3 h-3 animate-spin"/> Posting…</> : <><Linkedin className="w-3 h-3"/> Post</>}
                          </button>
                        )}
                        <button onClick={handleCopy}
                          className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs rounded-lg font-medium flex items-center gap-1.5 transition-colors">
                          {copied ? <><Check className="w-3 h-3 text-green-600"/> Copied!</> : <><Copy className="w-3 h-3"/> Copy</>}
                        </button>
                      </div>
                    )}
                  </div>
                  <LivePreview content={editing} imagePreview={imgPrev} userName={user?.name}/>
                  {post && (
                    <div className="mt-4">
                      <div className="flex items-center justify-between mb-1.5">
                        <p className="text-xs text-gray-400 flex items-center gap-1"><Edit className="w-3 h-3"/> Edit before posting</p>
                        <p className="text-xs text-gray-300">{editing.split(/\s+/).filter(Boolean).length} words</p>
                      </div>
                      <textarea value={editing} onChange={e=>setEditing(e.target.value)} rows={7}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-700 font-mono focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all"/>
                    </div>
                  )}
                </div>

                {/* Upsell / subscription */}
                {stats?.plan==='free' && (
                  <div className="rounded-2xl bg-gradient-to-br from-blue-600 to-blue-800 p-5 text-white">
                    <div className="flex items-center gap-2 mb-1"><Crown className="w-5 h-5 text-amber-300"/><span className="font-bold">Want more posts?</span></div>
                    <p className="text-sm text-blue-100 mb-3">Upgrade to Starter or Pro for 20–50 posts/month + auto-publish to LinkedIn.</p>
                    <Link to="/pricing" className="inline-flex items-center gap-1.5 px-4 py-2 bg-white text-blue-700 rounded-xl text-sm font-bold hover:bg-blue-50 transition-colors">
                      <Zap className="w-4 h-4"/> See Plans
                    </Link>
                  </div>
                )}
                {stats?.plan && stats.plan!=='free' && <ManageSubscriptionCard plan={stats.plan}/>}
              </motion.div>
            </div>
          </div>
        )}

        {/* ── POSTS TAB ── */}
        {tab==='posts' && (
          <div className="px-8 pt-8 pb-10">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-900" style={{fontFamily:"'Instrument Serif', serif"}}>My Posts</h1>
                <p className="text-sm text-gray-500 mt-1">{saved.length} post{saved.length!==1?'s':''} generated</p>
              </div>
            </div>

            {saved.length===0 ? (
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-16 text-center">
                <div className="w-14 h-14 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4"><FileText className="w-7 h-7 text-gray-400"/></div>
                <p className="font-semibold text-gray-700 mb-1">No posts yet</p>
                <p className="text-sm text-gray-400 mb-5">Generate your first LinkedIn post with AI</p>
                <button onClick={()=>setTab('generate')} className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-semibold transition-colors">
                  Generate a Post
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {saved.map((p,i)=>(
                  <motion.div key={p._id} initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} transition={{delay:i*0.04}}
                    className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:border-blue-200 hover:shadow-md transition-all group cursor-pointer"
                    onClick={()=>{setModal(p);setModalTxt(p.content);setModalEdit(false);}}>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs px-2.5 py-1 bg-blue-50 text-blue-600 rounded-full font-medium">{p.tone}</span>
                      <div className="flex items-center gap-1.5">
                        {p.linkedinPostId && <CheckCircle className="w-4 h-4 text-green-500" title="Live on LinkedIn"/>}
                        <span className="text-xs text-gray-400">{new Date(p.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <p className="text-sm font-semibold text-gray-900 mb-2 line-clamp-1">{p.topic}</p>
                    <p className="text-xs text-gray-500 line-clamp-3 leading-relaxed">{p.content.substring(0,160)}…</p>
                    {p.image && <div className="mt-3 h-20 rounded-lg overflow-hidden border border-gray-100"><img src={p.image} alt="" className="w-full h-full object-cover"/></div>}
                    {p.linkedinEngagement && (
                      <div className="flex gap-4 mt-3 pt-3 border-t border-gray-100 text-xs text-gray-400">
                        {p.linkedinEngagement.likes>0&&<span className="flex items-center gap-1"><Heart className="w-3 h-3 text-red-400"/>{p.linkedinEngagement.likes}</span>}
                        {p.linkedinEngagement.comments>0&&<span className="flex items-center gap-1"><MessageCircle className="w-3 h-3 text-blue-400"/>{p.linkedinEngagement.comments}</span>}
                        {p.linkedinEngagement.shares>0&&<span className="flex items-center gap-1"><Share2 className="w-3 h-3 text-green-400"/>{p.linkedinEngagement.shares}</span>}
                      </div>
                    )}
                    <div className="flex gap-2 mt-4 pt-3 border-t border-gray-100 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={e=>{e.stopPropagation();copyText(p.content);}} className="flex-1 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-100 rounded-lg transition-colors flex items-center justify-center gap-1">
                        <Copy className="w-3 h-3"/> Copy
                      </button>
                      <button onClick={e=>{e.stopPropagation();handleDelete(p._id);}} className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                        <Trash2 className="w-3.5 h-3.5"/>
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── LINKEDIN TAB ── */}
        {tab==='linkedin' && (
          <div className="px-8 pt-8 pb-10">
            <h1 className="text-2xl font-bold text-gray-900 mb-2" style={{fontFamily:"'Instrument Serif', serif"}}>LinkedIn</h1>
            <p className="text-sm text-gray-500 mb-6">Connect your account to auto-publish posts directly.</p>
            <div className="space-y-6">
              <LinkedInSettings stats={stats} onUpdate={fetchStats}/>
              {stats?.linkedinConnected && liPosts.length>0 && (
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                  <div className="flex items-center justify-between mb-5">
                    <div>
                      <h3 className="font-bold text-gray-900">Recent LinkedIn Posts</h3>
                      <p className="text-sm text-gray-500 mt-0.5">Engagement from your profile</p>
                    </div>
                    <button onClick={fetchLiPosts} disabled={liLoading} className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                      <RefreshCw className={`w-4 h-4 ${liLoading?'animate-spin':''}`}/>
                    </button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {liPosts.map((p,i)=>(
                      <div key={p.id||i} className="p-4 bg-gray-50 rounded-xl border border-gray-100 hover:border-blue-200 transition-colors">
                        <div className="flex items-center justify-between mb-2.5">
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 bg-[#0A66C2] rounded-md flex items-center justify-center"><Linkedin className="w-3.5 h-3.5 text-white"/></div>
                            <span className="text-xs text-gray-500">{new Date(p.createdAt||p.created).toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'})}</span>
                          </div>
                          {p.url && <a href={p.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-700"><ExternalLink className="w-3.5 h-3.5"/></a>}
                        </div>
                        <p className="text-sm text-gray-700 line-clamp-3 mb-3">{p.text||p.content||'No content'}</p>
                        <div className="flex items-center gap-4 pt-3 border-t border-gray-200 text-sm text-gray-600">
                          <span className="flex items-center gap-1.5"><Heart className="w-4 h-4 text-red-400"/><strong>{p.likes||0}</strong></span>
                          <span className="flex items-center gap-1.5"><MessageCircle className="w-4 h-4 text-blue-400"/><strong>{p.comments||0}</strong></span>
                          <span className="flex items-center gap-1.5"><Share2 className="w-4 h-4 text-green-400"/><strong>{p.shares||0}</strong></span>
                          {p.visibility && <span className="ml-auto text-xs px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full capitalize">{p.visibility}</span>}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      {/* ── Post detail modal ── */}
      <AnimatePresence>
        {modal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 z-50">
            <motion.div initial={{opacity:0,scale:0.97,y:16}} animate={{opacity:1,scale:1,y:0}} exit={{opacity:0,scale:0.97,y:16}}
              className="bg-white rounded-t-2xl sm:rounded-2xl w-full sm:max-w-2xl max-h-[92vh] sm:max-h-[85vh] overflow-hidden flex flex-col shadow-2xl">
              <div className="flex items-start justify-between p-5 border-b border-gray-100">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2"><h3 className="text-lg font-bold text-gray-900 truncate">{modal.topic}</h3>{modal.linkedinPostId&&<CheckCircle className="w-5 h-5 text-green-500 shrink-0"/>}</div>
                  <div className="flex items-center gap-2 flex-wrap mt-1.5">
                    <span className="text-xs px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full font-medium">{modal.tone}</span>
                    <span className="text-xs text-gray-400">·</span>
                    <span className="text-xs text-gray-500">{modal.length}</span>
                    <span className="text-xs text-gray-400">·</span>
                    <span className="text-xs text-gray-500">{new Date(modal.createdAt).toLocaleDateString()}</span>
                    {modal.linkedinPostUrl && <a href={modal.linkedinPostUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600 flex items-center gap-1">View on LinkedIn<ExternalLink className="w-3 h-3"/></a>}
                  </div>
                </div>
                <button onClick={()=>{setModal(null);setModalEdit(false);}} className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"><X className="w-5 h-5"/></button>
              </div>

              <div className="flex-1 overflow-y-auto p-5">
                {modalEdit ? (
                  <textarea value={modalTxt} onChange={e=>setModalTxt(e.target.value)} rows={16}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-mono text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none transition-all"/>
                ) : (
                  <div className="space-y-4">
                    {modal.image && <img src={modal.image} alt="" className="w-full h-52 object-cover rounded-xl border border-gray-100"/>}
                    <pre className="whitespace-pre-wrap font-sans text-sm text-gray-700 bg-gray-50 p-4 rounded-xl leading-relaxed">{modal.content}</pre>
                  </div>
                )}
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-5 border-t border-gray-100 bg-gray-50/60">
                <div className="flex gap-2 flex-wrap">
                  {!modalEdit ? (
                    <>
                      <button onClick={()=>setModalEdit(true)} className="px-3 py-2 bg-white border border-gray-200 text-gray-700 text-sm rounded-lg font-medium flex items-center gap-1.5 hover:border-gray-300 transition-colors"><Edit className="w-3.5 h-3.5"/>Edit</button>
                      <button onClick={()=>copyText(modal.content)} className="px-3 py-2 bg-white border border-gray-200 text-gray-700 text-sm rounded-lg font-medium flex items-center gap-1.5 hover:border-gray-300 transition-colors"><Copy className="w-3.5 h-3.5"/>Copy</button>
                      {stats?.linkedinConnected && !modal.linkedinPostId && (
                        <button onClick={async()=>{ try{ const{data}=await postsAPI.postToLinkedIn(modal._id); if(data.success){toast.success('Posted!');fetchSaved();} }catch{toast.error('Failed');} }}
                          className="px-3 py-2 bg-[#0A66C2] hover:bg-[#004182] text-white text-sm rounded-lg font-medium flex items-center gap-1.5 transition-colors"><Linkedin className="w-3.5 h-3.5"/>Post to LinkedIn</button>
                      )}
                      {modal.linkedinPostUrl && <a href={modal.linkedinPostUrl} target="_blank" rel="noopener noreferrer" className="px-3 py-2 bg-[#0A66C2] text-white text-sm rounded-lg font-medium flex items-center gap-1.5"><ExternalLink className="w-3.5 h-3.5"/>View on LinkedIn</a>}
                    </>
                  ) : (
                    <>
                      <button onClick={handleUpdate} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg font-medium flex items-center gap-1.5"><Save className="w-3.5 h-3.5"/>Save</button>
                      <button onClick={()=>{setModalEdit(false);setModalTxt(modal.content);}} className="px-4 py-2 bg-white border border-gray-200 text-gray-700 text-sm rounded-lg font-medium transition-colors">Cancel</button>
                    </>
                  )}
                </div>
                <button onClick={()=>handleDelete(modal._id)} className="px-3 py-2 bg-red-50 hover:bg-red-100 text-red-600 text-sm rounded-lg font-medium flex items-center justify-center gap-1.5 transition-colors w-full sm:w-auto"><Trash2 className="w-3.5 h-3.5"/>Delete</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Dashboard;
