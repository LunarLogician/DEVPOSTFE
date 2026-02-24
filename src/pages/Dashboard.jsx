import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { paymentAPI } from '../api/api';
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
  ExternalLink,
  Eye,
  Edit,
  X,
  RefreshCw,
  Heart,
  MessageCircle,
  Share2,
  CheckCircle
} from 'lucide-react';

const ManageSubscriptionCard = ({ plan }) => {
  const [loading, setLoading] = useState(false);

  const handlePortal = async () => {
    try {
      setLoading(true);
      const { data } = await paymentAPI.getPortalUrl();
      if (data.portalUrl) {
        window.open(data.portalUrl, '_blank');
      } else {
        toast.error('Could not open customer portal');
      }
    } catch {
      toast.error('Failed to open customer portal');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200">
      <div className="flex items-start gap-3">
        <Crown className="w-6 h-6 text-yellow-600 flex-shrink-0" />
        <div className="flex-1">
          <h4 className="font-bold text-gray-900 mb-1 capitalize">
            {plan} Plan Active
          </h4>
          <p className="text-sm text-gray-600 mb-3">
            Manage billing, invoices, or cancel your subscription.
          </p>
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={handlePortal}
              disabled={loading}
              className="btn btn-primary text-sm flex items-center gap-1.5"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <ExternalLink className="w-4 h-4" />}
              Manage Subscription
            </button>
            <Link to="/pricing" className="btn btn-secondary text-sm">
              View Plans
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

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
  const [viewingPost, setViewingPost] = useState(null);
  const [isEditingPost, setIsEditingPost] = useState(false);
  const [editedPostContent, setEditedPostContent] = useState('');
  const [linkedInPosts, setLinkedInPosts] = useState([]);
  const [isFetchingLinkedInPosts, setIsFetchingLinkedInPosts] = useState(false);

  useEffect(() => {
    fetchStats();
    fetchPosts();
    
    // Check for payment success
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('payment') === 'success') {
      toast.success('🎉 Payment successful! Your plan has been upgraded.');
      window.history.replaceState({}, '', '/dashboard');
      // Refresh user data to reflect new plan
      setTimeout(() => fetchStats(), 2000);
    }

    if (urlParams.get('linkedin') === 'connected') {
      toast.success('LinkedIn connected successfully!');
      fetchStats();
      window.history.replaceState({}, '', '/dashboard');
    } else if (urlParams.get('error')) {
      toast.error('Failed to connect LinkedIn');
      window.history.replaceState({}, '', '/dashboard');
    }
  }, []);

  useEffect(() => {
    if (stats?.linkedinConnected) {
      fetchLinkedInPosts();
    }
  }, [stats?.linkedinConnected]);

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

  const fetchLinkedInPosts = async () => {
    if (!stats?.linkedinConnected) return;
    
    setIsFetchingLinkedInPosts(true);
    try {
      const { data } = await linkedinAPI.getLinkedInPosts();
      if (data.success) {
        setLinkedInPosts(data.data || []);
      }
    } catch (error) {
      console.error('Error fetching LinkedIn posts:', error);
      // Handle specific errors
      if (error.response?.status === 503 || error.response?.status === 404) {
        // Backend endpoint not available yet - silently fail
        setLinkedInPosts([]);
      } else if (error.response?.status === 401) {
        toast.error('LinkedIn session expired. Please reconnect.', { duration: 3000 });
      }
      // For other errors, silently fail - this is a nice-to-have feature
    } finally {
      setIsFetchingLinkedInPosts(false);
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
      if (viewingPost?._id === postId) {
        setViewingPost(null);
      }
    } catch (error) {
      toast.error('Failed to delete post');
    }
  };

  const handleViewPost = (post) => {
    setViewingPost(post);
    setEditedPostContent(post.content);
    setIsEditingPost(false);
  };

  const handleUpdatePost = async () => {
    if (!viewingPost) return;

    try {
      const { data } = await postsAPI.update(viewingPost._id, {
        content: editedPostContent
      });
      toast.success('Post updated successfully!');
      setViewingPost(data.data);
      setIsEditingPost(false);
      fetchPosts();
    } catch (error) {
      toast.error('Failed to update post');
    }
  };

  const handleCopyPostContent = async (content) => {
    try {
      await navigator.clipboard.writeText(content);
      toast.success('Copied to clipboard!');
    } catch (error) {
      toast.error('Failed to copy');
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
                  {(() => {
                    const limits = { free: 5, starter: 20, pro: 50 };
                    const limit = limits[stats.plan] || 5;
                    const planColors = { pro: 'text-yellow-600', starter: 'text-blue-600', free: 'text-gray-600' };
                    return (
                      <>
                        {stats.plan !== 'free' && (
                          <Crown className={`w-4 h-4 ${planColors[stats.plan]}`} />
                        )}
                        <span className={`text-sm font-medium ${planColors[stats.plan]}`}>
                          {stats.remaining}/{limit} posts left
                          {stats.plan !== 'free' && ` · ${stats.plan.charAt(0).toUpperCase() + stats.plan.slice(1)} Plan`}
                        </span>
                      </>
                    );
                  })()}
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
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900">
                  Recent Posts ({savedPosts.length})
                </h3>
              </div>
              
              <div className="space-y-3 max-h-[500px] overflow-y-auto">
                {savedPosts.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">
                    No posts yet. Generate your first one!
                  </p>
                ) : (
                  savedPosts.map((post) => (
                    <div
                      key={post._id}
                      className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors border border-gray-200"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <p className="text-sm font-medium text-gray-900 line-clamp-1">
                              {post.topic}
                            </p>
                            {post.linkedinPostId && (
                              <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" title="Live on LinkedIn" />
                            )}
                          </div>
                          <p className="text-xs text-gray-600 mt-1 line-clamp-2">
                            {post.content.substring(0, 100)}...
                          </p>
                          <div className="flex items-center gap-2 mt-2 flex-wrap">
                            <span className="text-xs px-2 py-1 bg-primary-100 text-primary-700 rounded">
                              {post.tone}
                            </span>
                            <span className="text-xs text-gray-400">•</span>
                            <span className="text-xs text-gray-500">
                              {new Date(post.createdAt).toLocaleDateString()}
                            </span>
                            {post.linkedinEngagement && (
                              <>
                                <span className="text-xs text-gray-400">•</span>
                                <div className="flex items-center gap-3 text-xs text-gray-600">
                                  {post.linkedinEngagement.likes > 0 && (
                                    <span className="flex items-center gap-1">
                                      <Heart className="w-3 h-3" />
                                      {post.linkedinEngagement.likes}
                                    </span>
                                  )}
                                  {post.linkedinEngagement.comments > 0 && (
                                    <span className="flex items-center gap-1">
                                      <MessageCircle className="w-3 h-3" />
                                      {post.linkedinEngagement.comments}
                                    </span>
                                  )}
                                  {post.linkedinEngagement.shares > 0 && (
                                    <span className="flex items-center gap-1">
                                      <Share2 className="w-3 h-3" />
                                      {post.linkedinEngagement.shares}
                                    </span>
                                  )}
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => handleViewPost(post)}
                            className="p-2 text-gray-400 hover:text-primary-600 transition-colors"
                            title="View Post"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeletePost(post._id)}
                            className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                            title="Delete Post"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
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
                    <Link to="/pricing" className="btn btn-primary text-sm">
                      Upgrade Now
                    </Link>
                  </div>
                </div>
              </div>
            )}

            {/* Manage Subscription (for paid users) */}
            {stats?.plan && stats.plan !== 'free' && (
              <ManageSubscriptionCard plan={stats.plan} />
            )}
          </div>
        </div>
        
        {/* LinkedIn Posts Section */}
        {stats?.linkedinConnected && linkedInPosts.length > 0 && (
          <div className="mt-8">
            <div className="card">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Your LinkedIn Posts</h3>
                  <p className="text-sm text-gray-500 mt-1">Recent posts from your LinkedIn profile with engagement metrics</p>
                </div>
                <button
                  onClick={fetchLinkedInPosts}
                  disabled={isFetchingLinkedInPosts}
                  className="btn btn-secondary flex items-center gap-2 text-sm"
                  title="Refresh LinkedIn posts"
                >
                  <RefreshCw className={`w-4 h-4 ${isFetchingLinkedInPosts ? 'animate-spin' : ''}`} />
                  Refresh
                </button>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                {linkedInPosts.map((post, index) => (
                  <div
                    key={post.id || index}
                    className="p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-primary-300 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="flex items-center gap-2">
                        <Linkedin className="w-4 h-4 text-blue-600" />
                        <span className="text-xs font-medium text-gray-600">
                          {new Date(post.createdAt || post.created).toLocaleDateString('en-US', { 
                            month: 'short', 
                            day: 'numeric', 
                            year: 'numeric' 
                          })}
                        </span>
                      </div>
                      {post.url && (
                        <a
                          href={post.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary-600 hover:text-primary-700 transition-colors"
                          title="View on LinkedIn"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                    
                    <p className="text-sm text-gray-700 mb-3 line-clamp-3">
                      {post.text || post.content || 'No content'}
                    </p>
                    
                    <div className="flex items-center gap-4 pt-3 border-t border-gray-200">
                      {post.visibility && (
                        <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded capitalize">
                          {post.visibility}
                        </span>
                      )}
                      <div className="flex items-center gap-3 text-sm text-gray-600 ml-auto">
                        <span className="flex items-center gap-1" title="Likes">
                          <Heart className="w-4 h-4 text-red-500" />
                          <strong>{post.likes || 0}</strong>
                        </span>
                        <span className="flex items-center gap-1" title="Comments">
                          <MessageCircle className="w-4 h-4 text-blue-500" />
                          <strong>{post.comments || 0}</strong>
                        </span>
                        <span className="flex items-center gap-1" title="Shares">
                          <Share2 className="w-4 h-4 text-green-500" />
                          <strong>{post.shares || 0}</strong>
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* LinkedIn Settings Section */}
        <div className="mt-8">
          <LinkedInSettings stats={stats} onUpdate={fetchStats} />
        </div>
      </main>

      {/* View/Edit Post Modal */}
      {viewingPost && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-bold text-gray-900">
                    {viewingPost.topic}
                  </h3>
                  {viewingPost.linkedinPostId && (
                    <CheckCircle className="w-5 h-5 text-green-600" title="Live on LinkedIn" />
                  )}
                </div>
                <div className="flex items-center gap-2 mt-2 flex-wrap">
                  <span className="text-xs px-2 py-1 bg-primary-100 text-primary-700 rounded">
                    {viewingPost.tone}
                  </span>
                  <span className="text-xs text-gray-400">•</span>
                  <span className="text-xs text-gray-500">
                    {viewingPost.length}
                  </span>
                  <span className="text-xs text-gray-400">•</span>
                  <span className="text-xs text-gray-500">
                    {new Date(viewingPost.createdAt).toLocaleDateString()}
                  </span>
                  {viewingPost.linkedinPostUrl && (
                    <>
                      <span className="text-xs text-gray-400">•</span>
                      <a
                        href={viewingPost.linkedinPostUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-primary-600 hover:text-primary-700 flex items-center gap-1"
                      >
                        View on LinkedIn
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </>
                  )}
                </div>
                {viewingPost.linkedinEngagement && (
                  <div className="flex items-center gap-4 mt-3 text-sm text-gray-600">
                    {viewingPost.linkedinEngagement.likes > 0 && (
                      <span className="flex items-center gap-1">
                        <Heart className="w-4 h-4 text-red-500" />
                        <strong>{viewingPost.linkedinEngagement.likes}</strong> likes
                      </span>
                    )}
                    {viewingPost.linkedinEngagement.comments > 0 && (
                      <span className="flex items-center gap-1">
                        <MessageCircle className="w-4 h-4 text-blue-500" />
                        <strong>{viewingPost.linkedinEngagement.comments}</strong> comments
                      </span>
                    )}
                    {viewingPost.linkedinEngagement.shares > 0 && (
                      <span className="flex items-center gap-1">
                        <Share2 className="w-4 h-4 text-green-500" />
                        <strong>{viewingPost.linkedinEngagement.shares}</strong> shares
                      </span>
                    )}
                  </div>
                )}
              </div>
              <button
                onClick={() => {
                  setViewingPost(null);
                  setIsEditingPost(false);
                }}
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="flex-1 overflow-y-auto p-6">
              {isEditingPost ? (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Edit Post Content
                  </label>
                  <textarea
                    value={editedPostContent}
                    onChange={(e) => setEditedPostContent(e.target.value)}
                    className="input resize-none font-mono text-sm"
                    rows="15"
                  />
                </div>
              ) : (
                <div className="prose max-w-none">
                  <pre className="whitespace-pre-wrap font-sans text-sm text-gray-700 bg-gray-50 p-4 rounded-lg">
                    {viewingPost.content}
                  </pre>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-between gap-3 p-6 border-t border-gray-200 bg-gray-50">
              <div className="flex items-center gap-2">
                {!isEditingPost ? (
                  <>
                    <button
                      onClick={() => setIsEditingPost(true)}
                      className="btn btn-secondary flex items-center gap-2"
                    >
                      <Edit className="w-4 h-4" />
                      Edit
                    </button>
                    <button
                      onClick={() => handleCopyPostContent(viewingPost.content)}
                      className="btn btn-secondary flex items-center gap-2"
                    >
                      <Copy className="w-4 h-4" />
                      Copy
                    </button>
                    {stats?.linkedinConnected && !viewingPost.linkedinPostId && (
                      <button
                        onClick={async () => {
                          try {
                            const { data } = await postsAPI.postToLinkedIn(viewingPost._id);
                            if (data.success) {
                              toast.success('Posted to LinkedIn!');
                              fetchPosts(); // Refresh to get updated post data
                            }
                          } catch (error) {
                            toast.error('Failed to post to LinkedIn');
                          }
                        }}
                        className="btn btn-primary flex items-center gap-2"
                      >
                        <Linkedin className="w-4 h-4" />
                        Post to LinkedIn
                      </button>
                    )}
                    {viewingPost.linkedinPostUrl && (
                      <a
                        href={viewingPost.linkedinPostUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-primary flex items-center gap-2"
                      >
                        <ExternalLink className="w-4 h-4" />
                        View on LinkedIn
                      </a>
                    )}
                  </>
                ) : (
                  <>
                    <button
                      onClick={handleUpdatePost}
                      className="btn btn-primary flex items-center gap-2"
                    >
                      <Save className="w-4 h-4" />
                      Save Changes
                    </button>
                    <button
                      onClick={() => {
                        setIsEditingPost(false);
                        setEditedPostContent(viewingPost.content);
                      }}
                      className="btn btn-secondary"
                    >
                      Cancel
                    </button>
                  </>
                )}
              </div>
              <button
                onClick={() => {
                  handleDeletePost(viewingPost._id);
                }}
                className="btn bg-red-600 hover:bg-red-700 text-white flex items-center gap-2"
                title="Deletes from your dashboard only, not from LinkedIn"
              >
                <Trash2 className="w-4 h-4" />
                Delete from Dashboard
              </button>
            </div>
          </div>
        </div>
      )}

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
              <Link to="/terms" className="text-sm text-gray-600 hover:text-primary-600 transition-colors">
                Terms of Service
              </Link>
              <Link to="/refund-policy" className="text-sm text-gray-600 hover:text-primary-600 transition-colors">
                Refund Policy
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
