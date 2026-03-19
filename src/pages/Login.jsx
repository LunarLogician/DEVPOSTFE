import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, Sparkles } from 'lucide-react';
import OTPVerification from '../components/OTPVerification';

// ─── Inject color system ─────────────────────────────────────────────────────
if (typeof document !== 'undefined' && !document.getElementById('devpost-colors')) {
  const style = document.createElement('style');
  style.id = 'devpost-colors';
  style.textContent = `
    :root {
      --cream: #faf8f5;
      --cream-dark: #f3f0eb;
      --sand: #e8e2d9;
      --sky: #6fa8c9;
      --sky-light: #d4e9f5;
      --sky-deep: #3d7fa3;
      --sage: #7aaa8a;
      --amber-soft: #e8a84c;
      --text-dark: #2c2a27;
      --text-mid: #6b6560;
      --text-soft: #a09890;
      --text-soft-light: #b0a898;
    }
  `;
  document.head.appendChild(style);
}

const Login = () => {
  const navigate = useNavigate();
  const { login, setUserAndToken } = useAuth();
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [showOTPVerification, setShowOTPVerification] = useState(false);
  const [unverifiedEmail, setUnverifiedEmail] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const result = await login(formData.email, formData.password);
    
    if (result.success) {
      navigate('/dashboard');
    } else if (result.requiresVerification) {
      // Show OTP verification screen
      setUnverifiedEmail(result.email || formData.email);
      setShowOTPVerification(true);
    }
    
    setLoading(false);
  };

  const handleOTPVerified = (userData) => {
    // User verified, set auth and redirect
    setUserAndToken(userData);
    navigate('/dashboard');
  };

  const handleBackToLogin = () => {
    setShowOTPVerification(false);
    setUnverifiedEmail('');
  };

  // Show OTP verification screen
  if (showOTPVerification) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--cream)', padding: '16px' }}>
        <OTPVerification 
          email={unverifiedEmail}
          onVerified={handleOTPVerified}
          onBack={handleBackToLogin}
        />
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--cream)', padding: '16px' }}>
      <div style={{ maxWidth: '448px', width: '100%' }}>
        {/* Logo/Brand */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            width: '64px', height: '64px', background: 'var(--sky-deep)', borderRadius: '16px', marginBottom: '16px'
          }}>
            <Sparkles style={{ width: '32px', height: '32px', color: 'white' }} />
          </div>
          <h1 style={{ fontSize: '30px', fontWeight: 'bold', color: 'var(--text-dark)' }}>DevPost AI</h1>
          <p style={{ color: 'var(--text-mid)', marginTop: '8px' }}>Welcome back!</p>
        </div>

        {/* Form Card */}
        <div style={{
          background: 'white',
          borderRadius: '16px',
          padding: '24px',
          border: '1.5px solid var(--sand)',
          boxShadow: '0 1px 4px rgba(44,42,39,0.06), 0 2px 8px rgba(44,42,39,0.04)'
        }}>
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: 'var(--text-dark)', marginBottom: '8px' }}>Sign In</h2>
          <p style={{ color: 'var(--text-mid)', marginBottom: '24px' }}>Continue creating amazing content</p>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* Email Input */}
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: 'var(--text-dark)', marginBottom: '8px' }}>
                Email Address
              </label>
              <div style={{ position: 'relative' }}>
                <Mail style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', width: '20px', height: '20px', color: 'var(--text-soft)' }} />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    paddingLeft: '40px',
                    paddingRight: '16px',
                    paddingTop: '12px',
                    paddingBottom: '12px',
                    borderRadius: '10px',
                    border: '1.5px solid var(--sand)',
                    background: 'var(--cream)',
                    color: 'var(--text-dark)',
                    fontSize: '14px',
                    outline: 'none',
                    transition: 'border-color 0.2s, box-shadow 0.2s',
                  }}
                  placeholder="you@example.com"
                  required
                  onFocus={(e) => {
                    e.target.style.borderColor = 'var(--sky-deep)';
                    e.target.style.boxShadow = '0 0 0 3px rgba(61,127,163,0.15)';
                    e.target.style.background = 'white';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'var(--sand)';
                    e.target.style.boxShadow = 'none';
                    e.target.style.background = 'var(--cream)';
                  }}
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: 'var(--text-dark)' }}>
                  Password
                </label>
                <Link 
                  to="/forgot-password" 
                  style={{ fontSize: '14px', color: 'var(--sky-deep)', textDecoration: 'none', fontWeight: '500' }}
                >
                  Forgot password?
                </Link>
              </div>
              <div style={{ position: 'relative' }}>
                <Lock style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', width: '20px', height: '20px', color: 'var(--text-soft)' }} />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    paddingLeft: '40px',
                    paddingRight: '16px',
                    paddingTop: '12px',
                    paddingBottom: '12px',
                    borderRadius: '10px',
                    border: '1.5px solid var(--sand)',
                    background: 'var(--cream)',
                    color: 'var(--text-dark)',
                    fontSize: '14px',
                    outline: 'none',
                    transition: 'border-color 0.2s, box-shadow 0.2s',
                  }}
                  placeholder="••••••••"
                  required
                  onFocus={(e) => {
                    e.target.style.borderColor = 'var(--sky-deep)';
                    e.target.style.boxShadow = '0 0 0 3px rgba(61,127,163,0.15)';
                    e.target.style.background = 'white';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'var(--sand)';
                    e.target.style.boxShadow = 'none';
                    e.target.style.background = 'var(--cream)';
                  }}
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                padding: '14px',
                background: loading ? 'var(--sky)' : 'linear-gradient(135deg, #3d7fa3 0%, #2d6a8a 100%)',
                color: 'white',
                fontSize: '14px',
                fontWeight: '600',
                border: 'none',
                borderRadius: '10px',
                cursor: loading ? 'not-allowed' : 'pointer',
                opacity: loading ? 0.6 : 1,
                transition: 'all 0.2s ease',
                boxShadow: '0 4px 14px rgba(61,127,163,0.35)',
              }}
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          {/* Register Link */}
          <p style={{ textAlign: 'center', color: 'var(--text-mid)', marginTop: '24px' }}>
            Don't have an account?{' '}
            <Link to="/register" style={{ color: 'var(--sky-deep)', textDecoration: 'none', fontWeight: '500' }}>
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
