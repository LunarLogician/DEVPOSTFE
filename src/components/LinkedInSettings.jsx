import { useState } from 'react';
import { Linkedin, CheckCircle, XCircle, Settings } from 'lucide-react';
import { linkedinAPI, postsAPI } from '../api/api';
import toast from 'react-hot-toast';

const LinkedInSettings = ({ stats, onUpdate }) => {
  const [loading, setLoading] = useState(false);

  const handleConnectLinkedIn = async () => {
    try {
      setLoading(true);
      const { data } = await linkedinAPI.getAuthUrl();
      
      if (data.success && data.authUrl) {
        // Open LinkedIn OAuth in popup
        window.location.href = data.authUrl;
      }
    } catch (error) {
      toast.error('Failed to connect LinkedIn');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDisconnect = async () => {
    if (!confirm('Are you sure you want to disconnect LinkedIn?')) return;
    
    try {
      setLoading(true);
      await linkedinAPI.disconnect();
      toast.success('LinkedIn disconnected');
      onUpdate();
    } catch (error) {
      toast.error('Failed to disconnect');
    } finally {
      setLoading(false);
    }
  };

  const handleToggleAutoPost = async () => {
    try {
      setLoading(true);
      const { data } = await linkedinAPI.toggleAutoPost();
      toast.success(data.autoPostToLinkedIn ? 'Auto-post enabled' : 'Auto-post disabled');
      onUpdate();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to toggle auto-post');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
          <Linkedin className="w-6 h-6 text-blue-600" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-gray-900">LinkedIn Integration</h2>
          <p className="text-sm text-gray-500">Auto-post generated content to LinkedIn</p>
        </div>
      </div>

      <div className="space-y-4">
        {/* Connection Status */}
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-3">
            {stats?.linkedinConnected ? (
              <>
                <CheckCircle className="w-5 h-5 text-green-600" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Connected</p>
                  <p className="text-xs text-gray-500">Your LinkedIn account is linked</p>
                </div>
              </>
            ) : (
              <>
                <XCircle className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Not Connected</p>
                  <p className="text-xs text-gray-500">Connect to auto-post</p>
                </div>
              </>
            )}
          </div>

          {stats?.linkedinConnected ? (
            <button
              onClick={handleDisconnect}
              disabled={loading}
              className="btn btn-secondary text-sm"
            >
              Disconnect
            </button>
          ) : (
            <button
              onClick={handleConnectLinkedIn}
              disabled={loading}
              className="btn btn-primary text-sm flex items-center gap-2"
            >
              <Linkedin className="w-4 h-4" />
              Connect LinkedIn
            </button>
          )}
        </div>

        {/* Auto-Post Toggle */}
        {stats?.linkedinConnected && (
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-3">
              <Settings className="w-5 h-5 text-gray-600" />
              <div>
                <p className="text-sm font-medium text-gray-900">Auto-Post</p>
                <p className="text-xs text-gray-500">
                  Automatically publish generated posts to LinkedIn
                </p>
              </div>
            </div>

            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={stats?.autoPostToLinkedIn || false}
                onChange={handleToggleAutoPost}
                disabled={loading}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
            </label>
          </div>
        )}
      </div>
    </div>
  );
};

export default LinkedInSettings;
