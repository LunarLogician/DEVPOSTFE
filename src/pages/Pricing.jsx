import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { paymentAPI } from '../api/api';
import toast from 'react-hot-toast';
import { Check, Sparkles, Crown, Zap, ArrowLeft, Loader2, ExternalLink } from 'lucide-react';

const plans = [
  {
    id: 'free',
    name: 'Free',
    price: '$0',
    period: '/month',
    description: 'Get started with AI-powered LinkedIn posts',
    icon: <Sparkles className="w-6 h-6" />,
    color: 'border-gray-200',
    badge: null,
    features: [
      '5 AI-generated posts/month',
      'Basic tones & styles',
      'Copy & save posts',
      'Manual LinkedIn posting',
    ],
    cta: 'Current Plan',
    ctaDisabled: true,
  },
  {
    id: 'starter',
    name: 'Starter',
    price: 'Rs 2,500',
    period: '/month',
    description: 'For professionals growing their presence',
    icon: <Zap className="w-6 h-6 text-blue-500" />,
    color: 'border-blue-500',
    badge: 'Popular',
    features: [
      '20 AI-generated posts/month',
      'All tones & styles',
      'LinkedIn auto-post',
      'Post history & analytics',
      'Priority support',
    ],
    cta: 'Upgrade to Starter',
    ctaDisabled: false,
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 'Rs 5,300',
    period: '/month',
    description: 'For power users and teams',
    icon: <Crown className="w-6 h-6 text-yellow-500" />,
    color: 'border-yellow-500',
    badge: 'Best Value',
    features: [
      '50 AI-generated posts/month',
      'All tones & styles',
      'LinkedIn auto-post',
      'Advanced analytics',
      'Priority support',
      'Early access to new features',
    ],
    cta: 'Upgrade to Pro',
    ctaDisabled: false,
  },
];

const Pricing = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [loadingPlan, setLoadingPlan] = useState(null);
  const [portalLoading, setPortalLoading] = useState(false);

  const currentPlan = user?.plan || 'free';
  const hasActiveSub = user?.subscriptionStatus === 'active' && currentPlan !== 'free';

  const handleUpgrade = async (planId) => {
    if (!isAuthenticated) {
      toast.error('Please log in to upgrade your plan');
      navigate('/login');
      return;
    }

    if (planId === 'free') return;

    // If downgrading or same plan
    if (planId === currentPlan && hasActiveSub) {
      toast('You are already on this plan. Use the portal to manage it.');
      return;
    }

    try {
      setLoadingPlan(planId);
      const { data } = await paymentAPI.createCheckout(planId);
      if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl;
      } else {
        toast.error('Could not create checkout session');
      }
    } catch (error) {
      const msg = error.response?.data?.error || 'Failed to create checkout';
      toast.error(msg);
    } finally {
      setLoadingPlan(null);
    }
  };

  const handleManageSubscription = async () => {
    try {
      setPortalLoading(true);
      const { data } = await paymentAPI.getPortalUrl();
      if (data.portalUrl) {
        window.open(data.portalUrl, '_blank');
      } else {
        toast.error('Could not open customer portal');
      }
    } catch (error) {
      toast.error('Failed to open customer portal');
    } finally {
      setPortalLoading(false);
    }
  };

  const getCtaLabel = (plan) => {
    if (plan.id === 'free') return 'Free Forever';
    if (plan.id === currentPlan && hasActiveSub) return 'Current Plan';
    return plan.cta;
  };

  const isCurrentPlan = (planId) => planId === currentPlan;

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Header */}
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <Link
            to={isAuthenticated ? '/dashboard' : '/'}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            {isAuthenticated ? 'Back to Dashboard' : 'Back to Home'}
          </Link>

          {isAuthenticated && hasActiveSub && (
            <button
              onClick={handleManageSubscription}
              disabled={portalLoading}
              className="flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 transition-colors"
            >
              {portalLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <ExternalLink className="w-4 h-4" />
              )}
              Manage Subscription
            </button>
          )}
        </div>
      </div>

      {/* Hero */}
      <div className="text-center px-4 pb-8 sm:pb-12 pt-4">
        <div className="inline-flex items-center gap-2 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-full px-4 py-1.5 text-sm font-medium mb-4 sm:mb-6">
          <Sparkles className="w-4 h-4" />
          Simple, transparent pricing
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4">
          Choose your plan
        </h1>
        <p className="text-gray-400 text-base sm:text-lg max-w-xl mx-auto px-2">
          Generate high-quality LinkedIn posts with AI. Upgrade anytime, cancel anytime.
        </p>

        {isAuthenticated && (
          <div className="mt-4 inline-flex items-center gap-2 bg-gray-800 rounded-full px-4 py-2 text-sm">
            <span className="text-gray-400">Current plan:</span>
            <span className="font-semibold capitalize text-white">{currentPlan}</span>
            {hasActiveSub && (
              <span className="w-2 h-2 bg-green-400 rounded-full" />
            )}
          </div>
        )}
      </div>

      {/* Plans */}
      <div className="max-w-6xl mx-auto px-4 pb-12 sm:pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {plans.map((plan) => {
            const isCurrent = isCurrentPlan(plan.id);
            const isLoading = loadingPlan === plan.id;

            return (
              <div
                key={plan.id}
                className={`relative bg-gray-900 rounded-2xl border-2 p-6 sm:p-8 flex flex-col transition-all duration-200 ${
                  plan.id === 'starter'
                    ? 'border-blue-500 shadow-xl shadow-blue-500/10'
                    : isCurrent
                    ? 'border-green-500/60'
                    : plan.color
                }`}
              >
                {/* Badge */}
                {plan.badge && (
                  <div className={`absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold ${
                    plan.id === 'starter' ? 'bg-blue-500 text-white' : 'bg-yellow-500 text-gray-900'
                  }`}>
                    {plan.badge}
                  </div>
                )}

                {isCurrent && isAuthenticated && (
                  <div className="absolute -top-3.5 right-4 px-3 py-1 rounded-full text-xs font-bold bg-green-500 text-white">
                    Active
                  </div>
                )}

                {/* Icon & Name */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-gray-800 rounded-xl">
                    {plan.icon}
                  </div>
                  <h2 className="text-xl font-bold">{plan.name}</h2>
                </div>

                {/* Price */}
                <div className="mb-2">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-gray-400 text-sm">{plan.period}</span>
                </div>
                <p className="text-gray-400 text-sm mb-6">{plan.description}</p>

                {/* Features */}
                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3 text-sm">
                      <Check className="w-4 h-4 text-green-400 shrink-0" />
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <button
                  onClick={() => handleUpgrade(plan.id)}
                  disabled={plan.id === 'free' || (isCurrent && hasActiveSub) || isLoading}
                  className={`w-full py-3 rounded-xl font-semibold text-sm transition-all flex items-center justify-center gap-2 ${
                    plan.id === 'free' || (isCurrent && hasActiveSub)
                      ? 'bg-gray-800 text-gray-500 cursor-not-allowed'
                      : plan.id === 'starter'
                      ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/20'
                      : 'bg-yellow-500 hover:bg-yellow-400 text-gray-900 shadow-lg shadow-yellow-500/20'
                  }`}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Redirecting...
                    </>
                  ) : (
                    getCtaLabel(plan)
                  )}
                </button>
              </div>
            );
          })}
        </div>

        {/* Footer Note */}
        <p className="text-center text-gray-500 text-sm mt-10">
          Secure payments powered by{' '}
          <a
            href="https://lemonsqueezy.com"
            target="_blank"
            rel="noreferrer"
            className="text-gray-400 hover:text-white transition-colors"
          >
            Lemon Squeezy
          </a>
          . Cancel anytime from your customer portal.
        </p>
      </div>
    </div>
  );
};

export default Pricing;
