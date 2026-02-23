import { useState, useRef, useEffect } from 'react';
import { Lock, Loader2, RefreshCw, Eye, EyeOff } from 'lucide-react';
import { authAPI } from '../api/api';
import toast from 'react-hot-toast';

const ResetPasswordForm = ({ email, onSuccess, onBack }) => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [timer, setTimer] = useState(600); // 10 minutes
  const [attempts, setAttempts] = useState(0);
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [verifiedOtp, setVerifiedOtp] = useState('');
  const inputRefs = useRef([]);

  useEffect(() => {
    // Start countdown timer
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 0) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Focus first input on mount
    inputRefs.current[0]?.focus();
  }, []);

  const handleOtpChange = (index, value) => {
    // Only allow numbers
    if (value && !/^\d$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    // Handle backspace
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 6);
    
    if (!/^\d+$/.test(pastedData)) {
      toast.error('Please paste only numbers');
      return;
    }

    const newOtp = pastedData.split('').concat(Array(6).fill('')).slice(0, 6);
    setOtp(newOtp);

    // Focus last filled input
    const lastIndex = Math.min(pastedData.length, 5);
    inputRefs.current[lastIndex]?.focus();
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    
    const otpCode = otp.join('');
    if (otpCode.length !== 6) {
      toast.error('Please enter complete OTP code');
      return;
    }

    // Check max attempts (5 attempts as per backend)
    if (attempts >= 5) {
      toast.error('Maximum attempts reached. Please request a new OTP.');
      return;
    }

    setLoading(true);
    try {
      // Call the verify-reset-otp endpoint
      const { data } = await authAPI.verifyResetOtp({ email, otp: otpCode });
      
      if (data.success) {
        setVerifiedOtp(otpCode);
        setIsOtpVerified(true);
        toast.success('Code verified! Now set your new password.');
      }
    } catch (error) {
      const message = error.response?.data?.message || 'Invalid OTP code';
      toast.error(message);
      
      setAttempts(prev => prev + 1);
      
      // Clear OTP on error
      setOtp(['', '', '', '', '', '']);
      inputRefs.current[0]?.focus();
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    setLoading(true);
    try {
      const { data } = await authAPI.resetPassword({ 
        email, 
        newPassword: password 
      });
      
      if (data.success) {
        toast.success('Password reset successful!');
        onSuccess();
      }
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to reset password';
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setResending(true);
    try {
      const { data } = await authAPI.forgotPassword({ email });
      
      if (data.success) {
        toast.success('New OTP sent to your email!');
        setTimer(600); // Reset timer
        setOtp(['', '', '', '', '', '']);
        setAttempts(0); // Reset attempts
        setIsOtpVerified(false); // Reset verification state
        setVerifiedOtp('');
        inputRefs.current[0]?.focus();
      }
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to resend OTP';
      toast.error(message);
    } finally {
      setResending(false);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="max-w-md w-full">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4">
          <Lock className="w-8 h-8 text-primary-600" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Reset Password</h2>
        <p className="text-gray-600">
          Enter the verification code sent to<br />
          <span className="font-medium text-gray-900">{email}</span>
        </p>
      </div>

      {/* Form */}
      <div className="card">
        {!isOtpVerified ? (
          // Step 1: Verify OTP
          <form onSubmit={handleVerifyOtp} className="space-y-6">
            {/* OTP Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3 text-center">
                Enter 6-digit code
              </label>
              <div className="flex gap-2 justify-center mb-2">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => (inputRefs.current[index] = el)}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    onPaste={handlePaste}
                    className="w-12 h-12 text-center text-xl font-bold border-2 border-gray-300 rounded-lg focus:border-primary-500 focus:ring-4 focus:ring-primary-100 transition-all"
                    disabled={loading || resending}
                  />
                ))}
              </div>
              {attempts > 0 && (
                <p className="text-xs text-red-600 text-center mt-1">
                  {5 - attempts} attempt(s) remaining
                </p>
              )}
            </div>

            {/* Timer */}
            {timer > 0 && (
              <div className="text-center">
                <p className="text-sm text-gray-500">
                  Code expires in{' '}
                  <span className="font-medium text-gray-900">{formatTime(timer)}</span>
                </p>
              </div>
            )}

            {/* Verify Button */}
            <button
              type="submit"
              disabled={loading || otp.join('').length !== 6 || attempts >= 5}
              className="btn btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin mr-2" />
                  Verifying...
                </>
              ) : (
                'Verify Code'
              )}
            </button>

            {/* Resend Button */}
            <button
              type="button"
              onClick={handleResendOTP}
              disabled={resending || timer > 540}
              className="btn btn-secondary w-full disabled:opacity-50"
            >
              {resending ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin mr-2" />
                  Sending...
                </>
              ) : (
                <>
                  <RefreshCw className="w-5 h-5 mr-2" />
                  Resend Code
                </>
              )}
            </button>

            {/* Back Button */}
            {onBack && (
              <div className="text-center">
                <button
                  type="button"
                  onClick={onBack}
                  className="text-sm text-gray-600 hover:text-gray-900"
                >
                  ← Back to email
                </button>
              </div>
            )}
          </form>
        ) : (
          // Step 2: Set New Password
          <form onSubmit={handleResetPassword} className="space-y-6">
            <div className="text-center mb-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 rounded-lg">
                <span className="text-2xl">✓</span>
                <span className="text-sm font-medium">Code Verified</span>
              </div>
            </div>

            {/* New Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                New Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input pl-10 pr-10"
                  placeholder="••••••••"
                  minLength="6"
                  required
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-1">Minimum 6 characters</p>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="input pl-10 pr-10"
                  placeholder="••••••••"
                  minLength="6"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Reset Button */}
            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin mr-2" />
                  Resetting...
                </>
              ) : (
                'Reset Password'
              )}
            </button>
          </form>
        )}
      </div>

      {/* Help Text - Only show during OTP verification */}
      {!isOtpVerified && (
        <div className="mt-6 text-center text-sm text-gray-500">
          <p>Didn't receive the code? Check your spam folder</p>
        </div>
      )}
    </div>
  );
};

export default ResetPasswordForm;
