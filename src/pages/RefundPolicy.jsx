import { Link } from 'react-router-dom';
import { Sparkles, ArrowLeft, DollarSign, Clock, CheckCircle, XCircle, AlertCircle, Mail } from 'lucide-react';

const RefundPolicy = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-900">DevPost AI</h1>
            </div>
            <Link to="/dashboard" className="btn btn-secondary flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Dashboard
            </Link>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="card">
          <div className="flex items-center gap-3 mb-4">
            <DollarSign className="w-8 h-8 text-primary-600" />
            <h1 className="text-4xl font-bold text-gray-900">Refund Policy</h1>
          </div>
          
          <p className="text-gray-600 mb-8">
            Last updated: February 23, 2026
          </p>

          {/* Introduction */}
          <section className="mb-8">
            <p className="text-gray-700 leading-relaxed">
              At DevPost AI, we want you to be completely satisfied with our service. This Refund Policy 
              explains our refund terms for both Free and Paid subscription plans.
            </p>
          </section>

          {/* Free Plan */}
          <section className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <CheckCircle className="w-6 h-6 text-green-600" />
              <h2 className="text-2xl font-bold text-gray-900">Free Plan</h2>
            </div>
            
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
              <p className="text-green-800 font-medium mb-2">Current Plan Available</p>
              <p className="text-green-700">
                The Free Plan is currently available to all users at no cost.
              </p>
            </div>

            <h3 className="text-lg font-semibold text-gray-900 mb-2">Free Plan Details</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>No charges or fees</li>
              <li>No refunds needed (free service)</li>
              <li>5 posts per month included</li>
              <li>Cancel anytime from your dashboard</li>
              <li>No billing or payment information required</li>
            </ul>

            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">
                <strong>How to Cancel:</strong> Simply log into your dashboard and delete your account 
                if you no longer wish to use the service.
              </p>
            </div>
          </section>

          {/* Paid Plans */}
          <section className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <DollarSign className="w-6 h-6 text-primary-600" />
              <h2 className="text-2xl font-bold text-gray-900">Paid Plans (When Available)</h2>
            </div>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
              <p className="text-blue-800 font-medium mb-2">Coming Soon</p>
              <p className="text-blue-700">
                Paid subscription plans are not yet available. When they launch, the following refund 
                policy will apply.
              </p>
            </div>

            <h3 className="text-lg font-semibold text-gray-900 mb-2">14-Day Money-Back Guarantee</h3>
            <p className="text-gray-700 mb-4">
              We offer a 14-day money-back guarantee for all new paid subscriptions. If you're not 
              satisfied with DevPost AI, you can request a full refund within 14 days of your initial purchase.
            </p>

            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              <h4 className="font-semibold text-gray-900 mb-2">Eligibility Requirements:</h4>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                <li>First-time subscribers only (not applicable to renewals)</li>
                <li>Request must be made within 14 days of initial purchase</li>
                <li>Account has not exceeded fair usage limits</li>
                <li>No history of refund abuse</li>
              </ul>
            </div>
          </section>

          {/* Refund Process */}
          <section className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Clock className="w-6 h-6 text-primary-600" />
              <h2 className="text-2xl font-bold text-gray-900">How to Request a Refund</h2>
            </div>
            
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold">
                  1
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Contact Support</h4>
                  <p className="text-gray-700">
                    Email us at <span className="text-primary-600 font-medium">support@devpostai.com</span> with 
                    your refund request.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold">
                  2
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Provide Information</h4>
                  <p className="text-gray-700">
                    Include your account email, order/transaction number, and reason for the refund request.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold">
                  3
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Processing Time</h4>
                  <p className="text-gray-700">
                    We will review your request within 2-3 business days and respond via email.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold">
                  4
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Refund Issued</h4>
                  <p className="text-gray-700">
                    If approved, refunds are processed within 7-10 business days to your original payment method.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Non-Refundable Items */}
          <section className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <XCircle className="w-6 h-6 text-red-600" />
              <h2 className="text-2xl font-bold text-gray-900">Non-Refundable Items</h2>
            </div>
            
            <p className="text-gray-700 mb-4">
              The following are NOT eligible for refunds:
            </p>
            
            <div className="space-y-3">
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <h4 className="font-semibold text-red-900 mb-1">Subscription Renewals</h4>
                <p className="text-red-800 text-sm">
                  Automatic subscription renewals are non-refundable. You must cancel your subscription 
                  before the renewal date to avoid charges.
                </p>
              </div>

              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <h4 className="font-semibold text-red-900 mb-1">Partial Months</h4>
                <p className="text-red-800 text-sm">
                  We do not offer prorated refunds for partial billing periods. If you cancel mid-cycle, 
                  you will retain access until the end of your billing period.
                </p>
              </div>

              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <h4 className="font-semibold text-red-900 mb-1">Excessive Usage</h4>
                <p className="text-red-800 text-sm">
                  Accounts that have significantly exceeded usage limits or generated excessive content 
                  may not be eligible for refunds.
                </p>
              </div>

              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <h4 className="font-semibold text-red-900 mb-1">Account Violations</h4>
                <p className="text-red-800 text-sm">
                  Accounts terminated for violating our Terms of Service are not eligible for refunds.
                </p>
              </div>

              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <h4 className="font-semibold text-red-900 mb-1">Repeat Refunds</h4>
                <p className="text-red-800 text-sm">
                  Users with multiple previous refund requests may not be eligible for additional refunds.
                </p>
              </div>
            </div>
          </section>

          {/* Cancellation Policy */}
          <section className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <AlertCircle className="w-6 h-6 text-primary-600" />
              <h2 className="text-2xl font-bold text-gray-900">Cancellation Policy</h2>
            </div>
            
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Free Plan</h3>
            <p className="text-gray-700 mb-4">
              You can cancel your Free Plan account at any time from your dashboard settings. 
              No notice period required.
            </p>

            <h3 className="text-lg font-semibold text-gray-900 mb-2">Paid Plans (When Available)</h3>
            <p className="text-gray-700 mb-4">
              You can cancel your paid subscription at any time:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Cancel from your dashboard settings or contact support</li>
              <li>Cancellation takes effect at the end of your current billing period</li>
              <li>You retain access to paid features until the period ends</li>
              <li>No automatic renewal charges after cancellation</li>
              <li>You can reactivate your subscription anytime</li>
            </ul>

            <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-yellow-800">
                <strong>Important:</strong> To avoid renewal charges, make sure to cancel at least 
                24 hours before your next billing date.
              </p>
            </div>
          </section>

          {/* Payment Issues */}
          <section className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <DollarSign className="w-6 h-6 text-primary-600" />
              <h2 className="text-2xl font-bold text-gray-900">Payment Issues and Disputes</h2>
            </div>
            
            <p className="text-gray-700 mb-4">
              If you notice an unexpected charge or billing error:
            </p>
            <ol className="list-decimal list-inside text-gray-700 space-y-2">
              <li>Contact our support team immediately at support@devpostai.com</li>
              <li>Provide details of the charge (date, amount, transaction ID)</li>
              <li>We will investigate and respond within 3-5 business days</li>
              <li>Billing errors will be corrected and refunded promptly</li>
            </ol>

            <div className="mt-4 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-800">
                Please contact us before initiating a chargeback with your bank. Most billing issues 
                can be resolved quickly through direct communication.
              </p>
            </div>
          </section>

          {/* Contact Information */}
          <section className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Mail className="w-6 h-6 text-primary-600" />
              <h2 className="text-2xl font-bold text-gray-900">Contact Us</h2>
            </div>
            
            <p className="text-gray-700 mb-4">
              For refund requests, billing questions, or cancellation assistance, please contact us:
            </p>
            
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="mb-2">
                <span className="text-gray-600">Email:</span>
                <span className="text-primary-600 font-medium ml-2">support@devpostai.com</span>
              </div>
              <div>
                <span className="text-gray-600">Response Time:</span>
                <span className="text-gray-900 ml-2">Within 24-48 hours</span>
              </div>
            </div>
          </section>

          {/* Policy Updates */}
          <section className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <AlertCircle className="w-6 h-6 text-primary-600" />
              <h2 className="text-2xl font-bold text-gray-900">Changes to This Policy</h2>
            </div>
            
            <p className="text-gray-700">
              We reserve the right to modify this Refund Policy at any time. Changes will be posted 
              on this page with an updated "Last updated" date. Your continued use of DevPost AI after 
              changes constitutes acceptance of the modified policy.
            </p>
          </section>

          {/* Links to Other Policies */}
          <section className="mt-8 p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-2">Related Policies:</p>
            <div className="flex flex-wrap gap-4">
              <Link to="/privacy" className="text-primary-600 hover:text-primary-700 font-medium text-sm">
                Privacy Policy →
              </Link>
              <Link to="/terms" className="text-primary-600 hover:text-primary-700 font-medium text-sm">
                Terms of Service →
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default RefundPolicy;
