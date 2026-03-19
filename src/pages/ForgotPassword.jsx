import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Sparkles, ArrowLeft } from 'lucide-react';
import { authAPI } from '../api/api';
import toast from 'react-hot-toast';
import ResetPasswordForm from '../components/ResetPasswordForm';

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

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [showResetForm, setShowResetForm] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email.trim()) {
      toast.error('Please enter your email');
      return;
    }

    setLoading(true);
    try {
      const { data } = await authAPI.forgotPassword({ email });
      
      if (data.success) {
        toast.success('OTP sent to your email!');
        setShowResetForm(true);
      }
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to send OTP';
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordReset = () => {
    toast.success('Password reset successful!');
    navigate('/login');
  };

  const handleBackToEmail = () => {
    setShowResetForm(false);
  };

  // Show reset password form with OTP
  if (showResetForm) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--cream)', padding: '16px' }}>
        <ResetPasswordForm 
          email={email}
          onSuccess={handlePasswordReset}
          onBack={handleBackToEmail}
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
          <p style={{ color: 'var(--text-mid)', marginTop: '8px' }}>Reset your password</p>
        </div>

        {/* Form Card */}
        <div style={{
          background: 'white',
          borderRadius: '16px',
          padding: '24px',
          border: '1.5px solid var(--sand)',
          boxShadow: '0 1px 4px rgba(44,42,39,0.06), 0 2px 8px rgba(44,42,39,0.04)'
        }}>
          <div style={{ marginBottom: '24px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: 'var(--text-dark)', marginBottom: '8px' }}>Forgot Password?</h2>
            <p style={{ color: 'var(--text-mid)' }}>
              No worries! Enter your email and we'll send you a verification code to reset your password.
            </p>
          </div>

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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                    e.currentTarget.style.borderColor = 'var(--sky-deep)';
                    e.currentTarget.style.boxShadow = '0 0 0 3px rgba(61,127,163,0.15)';
                    e.currentTarget.style.background = 'white';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = 'var(--sand)';
                    e.currentTarget.style.boxShadow = 'none';
                    e.currentTarget.style.background = 'var(--cream)';
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
              {loading ? 'Sending OTP...' : 'Send Verification Code'}
            </button>
          </form>

          {/* Back to Login */}
          <div style={{ marginTop: '24px', textAlign: 'center' }}>
            <Link 
              to="/login" 
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '14px',
                color: 'var(--text-mid)', textDecoration: 'none', transition: 'color 0.2s',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = 'var(--text-dark)'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-mid)'}
            >
              <ArrowLeft style={{ width: '16px', height: '16px' }} />
              Back to login
            </Link>
          </div>
        </div>

        {/* Help Text */}
        <div style={{ marginTop: '24px', textAlign: 'center', fontSize: '14px', color: 'var(--text-mid)' }}>
          <p>Remember your password?{' '}
            <Link to="/login" style={{ color: 'var(--sky-deep)', fontWeight: '600', textDecoration: 'none', cursor: 'pointer' }}>
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
