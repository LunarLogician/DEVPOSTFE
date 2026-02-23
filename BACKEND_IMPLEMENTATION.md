# Backend Implementation Required for LinkedIn Sync Feature

## Overview
The frontend has been updated to support syncing posts from LinkedIn and displaying engagement metrics. The backend needs to implement the following endpoints and data model updates.

---

## 1. Update Post Model Schema

Add these fields to your `Post` model:

```javascript
// models/Post.js
const postSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  topic: { type: String, required: true },
  tone: { type: String, required: true },
  length: { type: String, required: true },
  content: { type: String, required: true },
  
  // NEW FIELDS FOR LINKEDIN INTEGRATION
  linkedinPostId: { type: String }, // LinkedIn's post ID/URN
  linkedinPostUrl: { type: String }, // Direct URL to the LinkedIn post
  linkedinEngagement: {
    likes: { type: Number, default: 0 },
    comments: { type: Number, default: 0 },
    shares: { type: Number, default: 0 },
    lastSyncedAt: { type: Date }
  },
  
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});
```

---

## 2. Create LinkedIn Sync Controller

Create/update `controllers/linkedinController.js`:

```javascript
import User from '../models/User.js';
import Post from '../models/Post.js';

// @desc    Sync posts from LinkedIn
// @route   POST /api/linkedin/sync-posts
// @access  Private
export const syncLinkedInPosts = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);

    if (!user.linkedinAccessToken) {
      return res.status(400).json({
        success: false,
        message: 'LinkedIn account not connected'
      });
    }

    // Fetch posts from LinkedIn UGC API
    const linkedinPosts = await fetchUserPostsFromLinkedIn(user.linkedinAccessToken, user.linkedinId);
    
    let importedCount = 0;
    let updatedCount = 0;

    for (const linkedinPost of linkedinPosts) {
      // Check if post already exists
      const existingPost = await Post.findOne({
        userId,
        linkedinPostId: linkedinPost.id
      });

      if (existingPost) {
        // Update engagement metrics
        existingPost.linkedinEngagement = {
          likes: linkedinPost.likes || 0,
          comments: linkedinPost.comments || 0,
          shares: linkedinPost.shares || 0,
          lastSyncedAt: new Date()
        };
        await existingPost.save();
        updatedCount++;
      } else {
        // Import new post
        await Post.create({
          userId,
          topic: linkedinPost.text?.substring(0, 50) || 'LinkedIn Post',
          tone: 'Professional', // Default tone
          length: linkedinPost.text?.length > 200 ? 'Long' : 'Medium',
          content: linkedinPost.text || '',
          linkedinPostId: linkedinPost.id,
          linkedinPostUrl: linkedinPost.postUrl,
          linkedinEngagement: {
            likes: linkedinPost.likes || 0,
            comments: linkedinPost.comments || 0,
            shares: linkedinPost.shares || 0,
            lastSyncedAt: new Date()
          },
          createdAt: linkedinPost.createdAt || new Date()
        });
        importedCount++;
      }
    }

    res.json({
      success: true,
      message: `Synced ${importedCount + updatedCount} posts from LinkedIn`,
      imported: importedCount,
      updated: updatedCount
    });

  } catch (error) {
    console.error('Error syncing LinkedIn posts:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to sync LinkedIn posts',
      error: error.message
    });
  }
};

// Helper function to fetch posts from LinkedIn
async function fetchUserPostsFromLinkedIn(accessToken, linkedinId) {
  try {
    // Fetch posts using LinkedIn UGC API
    const response = await fetch(
      `https://api.linkedin.com/v2/ugcPosts?q=authors&authors=List(urn:li:person:${linkedinId})&count=50`,
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'X-Restli-Protocol-Version': '2.0.0',
          'LinkedIn-Version': '202304'
        }
      }
    );

    if (!response.ok) {
      throw new Error(`LinkedIn API error: ${response.statusText}`);
    }

    const data = await response.json();
    
    // Transform LinkedIn response to our format
    const posts = data.elements?.map(post => ({
      id: post.id,
      text: post.specificContent?.['com.linkedin.ugc.ShareContent']?.shareCommentary?.text || '',
      createdAt: new Date(post.created?.time || Date.now()),
      postUrl: `https://www.linkedin.com/feed/update/${post.id}`,
      likes: post.socialDetail?.totalSocialActivityCounts?.numLikes || 0,
      comments: post.socialDetail?.totalSocialActivityCounts?.numComments || 0,
      shares: post.socialDetail?.totalSocialActivityCounts?.numShares || 0
    })) || [];

    return posts;

  } catch (error) {
    console.error('Error fetching posts from LinkedIn:', error);
    throw error;
  }
}

// @desc    Get LinkedIn posts
// @route   GET /api/linkedin/posts
// @access  Private
export const getLinkedInPosts = async (req, res) => {
  try {
    const userId = req.user._id;
    
    // Get posts that are published on LinkedIn
    const linkedinPosts = await Post.find({
      userId,
      linkedinPostId: { $exists: true, $ne: null }
    })
    .sort({ createdAt: -1 })
    .limit(50);

    res.json({
      success: true,
      count: linkedinPosts.length,
      data: linkedinPosts
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching LinkedIn posts',
      error: error.message
    });
  }
};
```

---

## 3. Update LinkedIn Routes

Update `routes/linkedin.js`:

```javascript
import express from 'express';
import { protect } from '../middleware/auth.js';
import { 
  connectLinkedIn, 
  linkedInCallback, 
  disconnectLinkedIn,
  toggleAutoPost,
  syncLinkedInPosts,  // NEW
  getLinkedInPosts    // NEW
} from '../controllers/linkedinController.js';

const router = express.Router();

router.get('/auth', protect, connectLinkedIn);
router.get('/callback', linkedInCallback);
router.post('/disconnect', protect, disconnectLinkedIn);
router.post('/toggle-auto-post', protect, toggleAutoPost);
router.post('/sync-posts', protect, syncLinkedInPosts);  // NEW
router.get('/posts', protect, getLinkedInPosts);          // NEW

export default router;
```

---

## 4. Update Post Creation to Save LinkedIn Info

When posting to LinkedIn (in `postToLinkedIn` service), save the LinkedIn post ID and URL:

```javascript
// services/linkedinService.js

export const postToLinkedIn = async (userId, content) => {
  // ... existing code to post to LinkedIn ...
  
  // After successful post to LinkedIn
  const post = await Post.findOne({ userId, content }); // Or use post ID if available
  
  if (post) {
    post.linkedinPostId = linkedinResponse.id;
    post.linkedinPostUrl = `https://www.linkedin.com/feed/update/${linkedinResponse.id}`;
    await post.save();
  }
  
  return {
    postUrl: post.linkedinPostUrl
  };
};
```

---

## 5. Required LinkedIn OAuth Scopes

Make sure your LinkedIn OAuth includes these scopes:

```javascript
const LINKEDIN_SCOPES = [
  'openid',
  'profile',
  'email',
  'w_member_social',     // Write posts
  'r_member_social'      // Read posts and engagement metrics (NEW)
];
```

Update your LinkedIn auth URL:

```javascript
export const connectLinkedIn = async (req, res) => {
  const scope = 'openid profile email w_member_social r_member_social';
  const authUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${LINKEDIN_CLIENT_ID}&redirect_uri=${LINKEDIN_REDIRECT_URI}&scope=${scope}`;
  
  res.json({ authUrl });
};
```

---

## 6. Testing the Implementation

### Test Sync Endpoint:
```bash
curl -X POST https://your-api.com/api/linkedin/sync-posts \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### Test Get LinkedIn Posts:
```bash
curl -X GET https://your-api.com/api/linkedin/posts \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

---

## 7. Environment Variables

Make sure these are set:
```env
LINKEDIN_CLIENT_ID=your_client_id
LINKEDIN_CLIENT_SECRET=your_client_secret
LINKEDIN_REDIRECT_URI=https://your-api.com/api/linkedin/callback
```

---

## Notes

- **Rate Limits**: LinkedIn API has rate limits. Consider caching and limiting sync frequency.
- **Token Refresh**: LinkedIn access tokens expire. Implement token refresh logic.
- **Engagement Updates**: Consider running a background job to periodically update engagement metrics.
- **Error Handling**: Handle cases where LinkedIn posts are deleted or made private.

---

## Frontend Already Implemented ✅

- ✅ "Sync from LinkedIn" button in Dashboard
- ✅ Display LinkedIn engagement metrics (likes, comments, shares)
- ✅ Green checkmark indicator for posts live on LinkedIn
- ✅ "View on LinkedIn" link in post modal
- ✅ Hide "Post to LinkedIn" button if already posted
- ✅ API client methods: `linkedinAPI.syncPosts()` and `linkedinAPI.getLinkedInPosts()`
