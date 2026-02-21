import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { postsAPI, linkedinAPI } from '../api/api';
import LinkedInSettings from '../components/LinkedInSettings';
import toast from 'react-hot-toast';
import { 
  Sparkles, 
  LogOut, 
  Loader2, 
  Copy, 
  Check,
  Save,
  Trash2,
  User,
  Crown,
  Linkedin,
  ExternalLink
} from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  
  const [formData, setFormData] = useState({
    topic: '',
    tone: 'Educational',
    length: 'Medium'
  });
  
  const [generatedPost, setGeneratedPost] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [copied, setCopied] = useState(false);
  const [stats, setStats] = useState(null);
  const [savedPosts, setSavedPosts] = useState([]);
  const [editingContent, setEditingContent] = useState('');
  const [currentPostId, setCurrentPostId] = useState(null);
  const [isPostingToLinkedIn, setIsPostingToLinkedIn] = useState(false);

  useEffect(() => {
    fetchStats();
    fetchPosts();
    
    // Check for LinkedIn callback
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('linkedin') === 'connected') {
      toast.success('LinkedIn connected successfully!');
      fetchStats();
      window.history.replaceState({}, '', '/dashboard');
    } else if (urlParams.get('error')) {
      toast.error('Failed to connect LinkedIn');
      window.history.replaceState({}, '', '/dashboard');
    }
  }, []);

  const fetchStats = async () => {
    try {
      const { data } = await postsAPI.getStats();
      setStats(data.data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const fetchPosts = async () => {
    try {
      const { data } = await postsAPI.getAll();
      setSavedPosts(data.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleGenerate = async (e) => {
    e.preventDefault();
    
    if (!formData.topic.trim()) {
      toast.error('Please enter a topic');
      return;
    }

    setIsGenerating(true);
    setGeneratedPost('');
    
    try {
      const { data } = await postsAPI.generate(formData);
      
      if (data.success) {
        setGeneratedPost(data.data.content);
        setEditingContent(data.data.content);
        setCurrentPostId(data.data._id);
        
        if (data.linkedinPostUrl) {
          toast.success(
            <div>
              Post generated & published to LinkedIn!
              <a href={data.linkedinPostUrl} target="_blank" rel="noopener noreferrer" className="underline ml-2">
                View Post
              </a>
            </div>,
            { duration: 5000 }
          );
        } else {
          toast.success('Post generated successfully!');
        }
        
        fetchStats(); // Update stats
        fetchPosts(); // Refresh saved posts
      }
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to generate post';
      
      if (error.response?.data?.limit) {
        toast.error(message, { duration: 5000 });
      } else {
        toast.error(message);
      }
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(editingContent);
      setCopied(true);
      toast.success('Copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast.error('Failed to copy');
    }
  };

  const handlePostToLinkedIn = async () => {
    if (!currentPostId) {
      toast.error('No post to publish');
      return;
    }

    try {
      setIsPostingToLinkedIn(true);
      const { data } = await postsAPI.postToLinkedIn(currentPostId);
      
      if (data.success) {
        toast.success(
          <div>
            Posted to LinkedIn!
            <a href={data.linkedinPostUrl} target="_blank" rel="noopener noreferrer" className="underline ml-2">
              View Post
            </a>
          </div>,
          { duration: 5000 }
        );
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to post to LinkedIn');
    } finally {
      setIsPostingToLinkedIn(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleDeletePost = async (postId) => {
    if (!window.confirm('Are you sure you want to delete this post?')) return;
    
    try {
      await postsAPI.delete(postId);
      toast.success('Post deleted');
      fetchPosts();
    } catch (error) {
      toast.error('Failed to delete post');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">DevPost AI</h1>
                <p className="text-xs text-gray-500">LinkedIn Content Engine</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              {/* Stats */}
              {stats && (
                <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg">
                  {stats.plan === 'pro' ? (
                    <>
                      <Crown className="w-4 h-4 text-yellow-600" />
                      <span className="text-sm font-medium text-gray-900">Pro Plan</span>
                    </>
                  ) : (
                    <span className="text-sm text-gray-600">
                      {stats.remaining}/5 posts left this month
                    </span>
                  )}
                </div>
              )}
              
              {/* User Menu */}
              <div className="flex items-center gap-2">
                <div className="hidden sm:block text-right">
                  <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                  <p className="text-xs text-gray-500">{user?.email}</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="btn btn-secondary flex items-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Generator Form */}
          <div className="space-y-6">
            <div className="card">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Generate LinkedIn Post
              </h2>
              
              <form onSubmit={handleGenerate} className="space-y-4">
                {/* Topic Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    What do you want to post about?
                  </label>
                  <textarea
                    name="topic"
                    value={formData.topic}
                    onChange={handleChange}
                    className="input resize-none"
                    rows="3"
                    placeholder="e.g., JavaScript closures, React hooks, career advice..."
                    required
                  />
                </div>

                {/* Tone Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tone
                  </label>
                  <select
                    name="tone"
                    value={formData.tone}
                    onChange={handleChange}
                    className="input"
                  >
                    <option value="Educational">Educational</option>
                    <option value="Storytelling">Storytelling</option>
                    <option value="Opinion">Opinion</option>
                    <option value="Motivational">Motivational</option>
                    <option value="Technical">Technical</option>
                    <option value="Casual">Casual</option>
                  </select>
                </div>

                {/* Length Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Length
                  </label>
                  <select
                    name="length"
                    value={formData.length}
                    onChange={handleChange}
                    className="input"
                  >
                    <option value="Short">Short (100-150 words)</option>
                    <option value="Medium">Medium (150-250 words)</option>
                    <option value="Long">Long (250-350 words)</option>
                  </select>
                </div>

                {/* Generate Button */}
                <button
                  type="submit"
                  disabled={isGenerating}
                  className="btn btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5" />
                      Generate Post
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Recent Posts */}
            <div className="card">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Recent Posts ({savedPosts.length})
              </h3>
              
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {savedPosts.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">
                    No posts yet. Generate your first one!
                  </p>
                ) : (
                  savedPosts.slice(0, 10).map((post) => (
                    <div
                      key={post._id}
                      className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {post.topic}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs text-gray-500">{post.tone}</span>
                            <span className="text-xs text-gray-400">•</span>
                            <span className="text-xs text-gray-500">
                              {new Date(post.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                        <button
                          onClick={() => handleDeletePost(post._id)}
                          className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Generated Post */}
          <div className="space-y-6">
            <div className="card">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900">Generated Post</h3>
                
                {generatedPost && (
                  <div className="flex items-center gap-2">
                    {stats?.linkedinConnected && !stats?.autoPostToLinkedIn && (
                      <button
                        onClick={handlePostToLinkedIn}
                        disabled={isPostingToLinkedIn}
                        className="btn btn-primary flex items-center gap-2"
                      >
                        {isPostingToLinkedIn ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Posting...
                          </>
                        ) : (
                          <>
                            <Linkedin className="w-4 h-4" />
                            Post to LinkedIn
                          </>
                        )}
                      </button>
                    )}
                    <button
                      onClick={handleCopy}
                      className="btn btn-secondary flex items-center gap-2"
                    >
                      {copied ? (
                        <>
                          <Check className="w-4 h-4" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          Copy
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>

              {generatedPost ? (
                <div>
                  <textarea
                    value={editingContent}
                    onChange={(e) => setEditingContent(e.target.value)}
                    className="input resize-none font-mono text-sm"
                    rows="20"
                    placeholder="Your generated post will appear here..."
                  />
                  <p className="text-xs text-gray-500 mt-2">
                    ✏️ You can edit the post above before copying
                  </p>
                </div>
              ) : (
                <div className="text-center py-20">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Sparkles className="w-8 h-8 text-gray-400" />
                  </div>
                  <p className="text-gray-500">
                    Enter a topic and click "Generate Post"
                  </p>
                  <p className="text-sm text-gray-400 mt-2">
                    Your AI-powered LinkedIn post will appear here
                  </p>
                </div>
              )}
            </div>

            {/* Upgrade CTA (for free users) */}
            {stats?.plan === 'free' && (
              <div className="card bg-gradient-to-br from-primary-50 to-purple-50 border-primary-200">
                <div className="flex items-start gap-3">
                  <Crown className="w-6 h-6 text-primary-600 flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">
                      Upgrade to Pro
                    </h4>
                    <p className="text-sm text-gray-600 mb-3">
                      Get unlimited posts, scheduling, and auto-post to LinkedIn
                    </p>
                    <button className="btn btn-primary text-sm">
                      Upgrade Now
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* LinkedIn Settings Section */}
        <div className="mt-8">
          <LinkedInSettings stats={stats} onUpdate={fetchStats} />
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-600">
              © 2026 DevPost AI. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <Link to="/about" className="text-sm text-gray-600 hover:text-primary-600 transition-colors">
                About
              </Link>
              <Link to="/privacy" className="text-sm text-gray-600 hover:text-primary-600 transition-colors">
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
