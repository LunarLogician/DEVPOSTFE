import { Link } from 'react-router-dom';
import { Sparkles, ArrowLeft, FileText, Scale, UserCheck, Ban, AlertCircle } from 'lucide-react';

const TermsOfService = () => {
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
            <FileText className="w-8 h-8 text-primary-600" />
            <h1 className="text-4xl font-bold text-gray-900">Terms of Service</h1>
          </div>
          
          <p className="text-gray-600 mb-8">
            Last updated: February 23, 2026
          </p>

          {/* Introduction */}
          <section className="mb-8">
            <p className="text-gray-700 leading-relaxed mb-4">
              Welcome to DevPost AI. By accessing or using our service, you agree to be bound by these Terms of Service. 
              Please read them carefully before using our platform.
            </p>
            <p className="text-gray-700 leading-relaxed">
              If you do not agree with any part of these terms, you may not access or use DevPost AI.
            </p>
          </section>

          {/* Acceptance of Terms */}
          <section className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <UserCheck className="w-6 h-6 text-primary-600" />
              <h2 className="text-2xl font-bold text-gray-900">Acceptance of Terms</h2>
            </div>
            
            <p className="text-gray-700 mb-4">
              By creating an account and using DevPost AI, you acknowledge that you have read, understood, 
              and agree to be bound by these Terms of Service and our Privacy Policy.
            </p>
            <p className="text-gray-700">
              We reserve the right to modify these terms at any time. Continued use of the service after 
              changes constitutes acceptance of the modified terms.
            </p>
          </section>

          {/* Service Description */}
          <section className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-6 h-6 text-primary-600" />
              <h2 className="text-2xl font-bold text-gray-900">Service Description</h2>
            </div>
            
            <p className="text-gray-700 mb-4">
              DevPost AI is an AI-powered platform that helps users generate LinkedIn posts. Our service includes:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>AI-generated content based on your topics and preferences</li>
              <li>Post customization (tone, length, style)</li>
              <li>LinkedIn integration for direct posting</li>
              <li>Post history and management</li>
              <li>Usage tracking and analytics</li>
            </ul>
          </section>

          {/* User Accounts */}
          <section className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <UserCheck className="w-6 h-6 text-primary-600" />
              <h2 className="text-2xl font-bold text-gray-900">User Accounts</h2>
            </div>
            
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Account Creation</h3>
            <p className="text-gray-700 mb-4">
              To use DevPost AI, you must:
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-4 space-y-1">
              <li>Be at least 18 years of age</li>
              <li>Provide accurate and complete registration information</li>
              <li>Maintain the security of your account credentials</li>
              <li>Accept responsibility for all activities under your account</li>
            </ul>

            <h3 className="text-lg font-semibold text-gray-900 mb-2">Account Security</h3>
            <p className="text-gray-700 mb-4">
              You are responsible for maintaining the confidentiality of your account and password. 
              You agree to notify us immediately of any unauthorized use of your account.
            </p>
          </section>

          {/* Subscription Plans */}
          <section className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Scale className="w-6 h-6 text-primary-600" />
              <h2 className="text-2xl font-bold text-gray-900">Subscription Plans</h2>
            </div>
            
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Free Plan</h3>
            <p className="text-gray-700 mb-4">
              The Free Plan includes:
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-4 space-y-1">
              <li>5 posts per month</li>
              <li>Basic AI-generated content</li>
              <li>Standard tone and length options</li>
            </ul>

            <h3 className="text-lg font-semibold text-gray-900 mb-2">Paid Plans (Future)</h3>
            <p className="text-gray-700 mb-4">
              When paid plans become available:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>Billing occurs monthly or annually as selected</li>
              <li>Plans auto-renew unless canceled before renewal date</li>
              <li>Usage limits reset at the start of each billing cycle</li>
              <li>Refunds are subject to our Refund Policy</li>
            </ul>
          </section>

          {/* User Conduct */}
          <section className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Ban className="w-6 h-6 text-primary-600" />
              <h2 className="text-2xl font-bold text-gray-900">Acceptable Use</h2>
            </div>
            
            <p className="text-gray-700 mb-4">
              You agree NOT to use DevPost AI to:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Generate content that is illegal, harmful, threatening, abusive, or hateful</li>
              <li>Create spam, misleading, or deceptive content</li>
              <li>Violate intellectual property rights or privacy rights of others</li>
              <li>Attempt to reverse engineer or exploit the service</li>
              <li>Share or resell your account access</li>
              <li>Use automated systems to access the service beyond normal usage</li>
              <li>Generate content that violates LinkedIn's policies</li>
            </ul>
          </section>

          {/* Content Ownership */}
          <section className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <FileText className="w-6 h-6 text-primary-600" />
              <h2 className="text-2xl font-bold text-gray-900">Content and Intellectual Property</h2>
            </div>
            
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Generated Content</h3>
            <p className="text-gray-700 mb-4">
              You retain ownership of all content you generate using DevPost AI. However, you are solely 
              responsible for the content you create and publish, including ensuring it complies with all 
              applicable laws and third-party terms of service.
            </p>

            <h3 className="text-lg font-semibold text-gray-900 mb-2">Service Content</h3>
            <p className="text-gray-700 mb-4">
              All aspects of DevPost AI, including but not limited to text, graphics, logos, software, 
              and the AI model, are owned by us and protected by copyright, trademark, and other laws.
            </p>
          </section>

          {/* AI Disclaimer */}
          <section className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <AlertCircle className="w-6 h-6 text-primary-600" />
              <h2 className="text-2xl font-bold text-gray-900">AI-Generated Content Disclaimer</h2>
            </div>
            
            <p className="text-gray-700 mb-4">
              DevPost AI uses artificial intelligence to generate content. Please note:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>AI-generated content may contain inaccuracies or errors</li>
              <li>You should review and edit all generated content before publishing</li>
              <li>We are not responsible for the accuracy, quality, or consequences of generated content</li>
              <li>You are responsible for fact-checking and ensuring appropriateness</li>
              <li>AI outputs may vary and are subject to change as we improve our models</li>
            </ul>
          </section>

          {/* Limitation of Liability */}
          <section className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Scale className="w-6 h-6 text-primary-600" />
              <h2 className="text-2xl font-bold text-gray-900">Limitation of Liability</h2>
            </div>
            
            <p className="text-gray-700 mb-4">
              DevPost AI is provided "as is" without warranties of any kind. To the maximum extent permitted 
              by law, we shall not be liable for:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Any indirect, incidental, special, or consequential damages</li>
              <li>Loss of profits, data, or business opportunities</li>
              <li>Damages resulting from generated content</li>
              <li>Service interruptions or technical issues</li>
              <li>Unauthorized access to your account</li>
            </ul>
          </section>

          {/* Termination */}
          <section className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Ban className="w-6 h-6 text-primary-600" />
              <h2 className="text-2xl font-bold text-gray-900">Termination</h2>
            </div>
            
            <p className="text-gray-700 mb-4">
              We reserve the right to suspend or terminate your account at any time for:
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-4 space-y-1">
              <li>Violation of these Terms of Service</li>
              <li>Fraudulent or illegal activity</li>
              <li>Abuse of the service</li>
              <li>Non-payment of fees (for paid plans)</li>
            </ul>
            <p className="text-gray-700">
              You may cancel your account at any time from your dashboard settings. Upon termination, 
              your right to use the service ceases immediately.
            </p>
          </section>

          {/* Changes to Service */}
          <section className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <AlertCircle className="w-6 h-6 text-primary-600" />
              <h2 className="text-2xl font-bold text-gray-900">Changes to Service</h2>
            </div>
            
            <p className="text-gray-700">
              We reserve the right to modify, suspend, or discontinue any part of DevPost AI at any time 
              with or without notice. We will not be liable for any modification, suspension, or discontinuation 
              of the service.
            </p>
          </section>

          {/* Governing Law */}
          <section className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Scale className="w-6 h-6 text-primary-600" />
              <h2 className="text-2xl font-bold text-gray-900">Governing Law</h2>
            </div>
            
            <p className="text-gray-700">
              These Terms of Service shall be governed by and construed in accordance with the laws of 
              the jurisdiction in which DevPost AI operates, without regard to its conflict of law provisions.
            </p>
          </section>

          {/* Contact */}
          <section className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <FileText className="w-6 h-6 text-primary-600" />
              <h2 className="text-2xl font-bold text-gray-900">Contact Us</h2>
            </div>
            
            <p className="text-gray-700">
              If you have any questions about these Terms of Service, please contact us at:
            </p>
            <p className="text-primary-600 font-medium mt-2">
              support@devpostai.com
            </p>
          </section>

          {/* Links to Other Policies */}
          <section className="mt-8 p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-2">Related Policies:</p>
            <div className="flex flex-wrap gap-4">
              <Link to="/privacy" className="text-primary-600 hover:text-primary-700 font-medium text-sm">
                Privacy Policy →
              </Link>
              <Link to="/refund-policy" className="text-primary-600 hover:text-primary-700 font-medium text-sm">
                Refund Policy →
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default TermsOfService;
