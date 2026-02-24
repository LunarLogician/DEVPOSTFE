import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'https://devpostaibackend-production.up.railway.app/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for better error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 429) {
      console.warn('⚠️ Rate limit exceeded. Please wait before making more requests.');
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  verifyEmail: (data) => api.post('/auth/verify-email', data),
  resendOtp: (data) => api.post('/auth/resend-otp', data),
  login: (data) => api.post('/auth/login', data),
  forgotPassword: (data) => api.post('/auth/forgot-password', data),
  verifyResetOtp: (data) => api.post('/auth/verify-reset-otp', data),
  resetPassword: (data) => api.post('/auth/reset-password', data),
  getMe: () => api.get('/auth/me')
};

// Posts API
export const postsAPI = {
  generate: (data) => api.post('/posts/generate', data),
  getAll: () => api.get('/posts'),
  getOne: (id) => api.get(`/posts/${id}`),
  update: (id, data) => api.put(`/posts/${id}`, data),
  delete: (id) => api.delete(`/posts/${id}`),
  getStats: () => api.get('/posts/stats'),
  postToLinkedIn: (id) => api.post(`/posts/${id}/post-to-linkedin`)
};

// LinkedIn API
export const linkedinAPI = {
  getAuthUrl: () => api.get('/linkedin/auth'),
  disconnect: () => api.post('/linkedin/disconnect'),
  toggleAutoPost: () => api.post('/linkedin/toggle-auto-post'),
  getLinkedInPosts: () => api.get('/linkedin/posts')
};

// Payment API
export const paymentAPI = {
  createCheckout: (plan) => api.post('/lemonsqueezy/create-checkout', { plan }),
  getPortalUrl: () => api.post('/lemonsqueezy/customer-portal'),
  getSubscription: () => api.get('/lemonsqueezy/subscription')
};

export default api;
