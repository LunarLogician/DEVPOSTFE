import { createContext, useState, useContext, useEffect } from 'react';
import { authAPI } from '../api/api';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        const { data } = await authAPI.getMe();
        setUser(data.data);
        setIsAuthenticated(true);
      }
    } catch (error) {
      localStorage.removeItem('token');
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      const { data } = await authAPI.login({ email, password });
      localStorage.setItem('token', data.data.token);
      setUser(data.data);
      setIsAuthenticated(true);
      toast.success('Welcome back!');
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || 'Login failed';
      
      // Handle unverified email error
      if (error.response?.status === 403) {
        toast.error('Please verify your email first', { duration: 4000 });
        return { success: false, message, requiresVerification: true, email };
      }
      
      toast.error(message);
      return { success: false, message };
    }
  };

  const register = async (name, email, password) => {
    try {
      const { data } = await authAPI.register({ name, email, password });
      
      // Check if verification is required
      if (data.requiresVerification) {
        toast.success('Check your email for verification code!');
        return { 
          success: true, 
          requiresVerification: true,
          email: data.data?.email || email
        };
      }
      
      // Old flow - if token is provided (shouldn't happen with new backend)
      if (data.data?.token) {
        localStorage.setItem('token', data.data.token);
        setUser(data.data);
        setIsAuthenticated(true);
        toast.success('Account created successfully!');
        return { success: true };
      }
      
      return { success: false, message: 'Unexpected response format' };
    } catch (error) {
      const message = error.response?.data?.message || 'Registration failed';
      toast.error(message);
      return { success: false, message };
    }
  };

  const setUserAndToken = (userData) => {
    if (userData.token) {
      localStorage.setItem('token', userData.token);
    }
    setUser(userData);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setIsAuthenticated(false);
    toast.success('Logged out successfully');
  };

  const value = {
    user,
    loading,
    isAuthenticated,
    login,
    register,
    logout,
    checkAuth,
    setUserAndToken
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
