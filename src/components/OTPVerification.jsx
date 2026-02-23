import { useState, useRef, useEffect } from 'react';
import { Mail, Loader2, RefreshCw } from 'lucide-react';
import { authAPI } from '../api/api';
import toast from 'react-hot-toast';

const OTPVerification = ({ email, onVerified, onBack }) => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [timer, setTimer] = useState(600); // 10 minutes
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

  const handleChange = (index, value) => {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const otpCode = otp.join('');
    if (otpCode.length !== 6) {
      toast.error('Please enter complete OTP code');
      return;
    }

    setLoading(true);
    try {
      const { data } = await authAPI.verifyEmail({ email, otp: otpCode });
      
      if (data.success && data.data.token) {
        // Store token and user data
        localStorage.setItem('token', data.data.token);
        toast.success('Email verified! You can now login.');
        onVerified(data.data);
      }
    } catch (error) {
      const message = error.response?.data?.message || 'Invalid OTP code';
      toast.error(message);
      // Clear OTP on error
      setOtp(['', '', '', '', '', '']);
      inputRefs.current[0]?.focus();
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setResending(true);
    try {
      const { data } = await authAPI.resendOtp({ email });
      
      if (data.success) {
        toast.success('New OTP sent to your email!');
        setTimer(600); // Reset timer
        setOtp(['', '', '', '', '', '']);
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
          <Mail className="w-8 h-8 text-primary-600" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Verify Your Email</h2>
        <p className="text-gray-600">
          We've sent a 6-digit code to<br />
          <span className="font-medium text-gray-900">{email}</span>
        </p>
      </div>

      {/* OTP Form */}
      <div className="card">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* OTP Input Grid */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3 text-center">
              Enter 6-digit code
            </label>
            <div className="flex gap-2 justify-center">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={handlePaste}
                  className="w-12 h-12 text-center text-xl font-bold border-2 border-gray-300 rounded-lg focus:border-primary-500 focus:ring-4 focus:ring-primary-100 transition-all"
                  disabled={loading || resending}
                />
              ))}
            </div>
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

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading || otp.join('').length !== 6}
            className="btn btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin mr-2" />
                Verifying...
              </>
            ) : (
              'Verify Email'
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
        </form>

        {/* Back to Register */}
        {onBack && (
          <div className="mt-4 text-center">
            <button
              onClick={onBack}
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              ← Back to registration
            </button>
          </div>
        )}
      </div>

      {/* Help Text */}
      <div className="mt-6 text-center text-sm text-gray-500">
        <p>Didn't receive the code? Check your spam folder</p>
        <p className="mt-1">or try resending after 1 minute</p>
      </div>
    </div>
  );
};

export default OTPVerification;
