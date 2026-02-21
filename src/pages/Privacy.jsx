import { Link } from 'react-router-dom';
import { Sparkles, ArrowLeft, Shield, Lock, Eye, Database, Mail } from 'lucide-react';

const Privacy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-purple-50">
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
            <Shield className="w-8 h-8 text-primary-600" />
            <h1 className="text-4xl font-bold text-gray-900">Privacy Policy</h1>
          </div>
          
          <p className="text-gray-600 mb-8">
            Last updated: February 21, 2026
          </p>

          {/* Introduction */}
          <section className="mb-8">
            <p className="text-gray-700 leading-relaxed">
              At DevPost AI, we take your privacy seriously. This Privacy Policy explains how we collect, 
              use, disclose, and safeguard your information when you use our service.
            </p>
          </section>

          {/* Information We Collect */}
          <section className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Database className="w-6 h-6 text-primary-600" />
              <h2 className="text-2xl font-bold text-gray-900">Information We Collect</h2>
            </div>
            
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Personal Information</h3>
            <p className="text-gray-700 mb-4">
              When you register for DevPost AI, we collect:
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-4 space-y-1">
              <li>Name</li>
              <li>Email address</li>
              <li>Password (encrypted)</li>
            </ul>

            <h3 className="text-lg font-semibold text-gray-900 mb-2">Usage Information</h3>
            <p className="text-gray-700 mb-4">
              We collect information about how you use our service:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>Posts you generate</li>
              <li>Topics and preferences</li>
              <li>Usage statistics (number of posts generated)</li>
              <li>Feature interactions</li>
            </ul>
          </section>

          {/* How We Use Your Information */}
          <section className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Eye className="w-6 h-6 text-primary-600" />
              <h2 className="text-2xl font-bold text-gray-900">How We Use Your Information</h2>
            </div>
            
            <p className="text-gray-700 mb-4">We use your information to:</p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Provide and maintain our service</li>
              <li>Generate AI-powered content based on your input</li>
              <li>Manage your account and subscription</li>
              <li>Send you important updates about the service</li>
              <li>Improve our AI models and service quality</li>
              <li>Prevent fraud and ensure security</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          {/* Data Security */}
          <section className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Lock className="w-6 h-6 text-primary-600" />
              <h2 className="text-2xl font-bold text-gray-900">Data Security</h2>
            </div>
            
            <p className="text-gray-700 mb-4">
              We implement industry-standard security measures to protect your data:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Password encryption using bcrypt</li>
              <li>JWT token-based authentication</li>
              <li>Secure HTTPS connections</li>
              <li>Regular security audits</li>
              <li>MongoDB database security</li>
            </ul>
            <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-sm text-yellow-800">
                <strong>Note:</strong> While we implement strong security measures, no method of transmission 
                over the internet is 100% secure. We cannot guarantee absolute security.
              </p>
            </div>
          </section>

          {/* Third-Party Services */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Third-Party Services</h2>
            
            <p className="text-gray-700 mb-4">
              We use the following third-party services:
            </p>
            
            <div className="space-y-3">
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-1">OpenAI</h3>
                <p className="text-sm text-gray-600">
                  We use OpenAI's API to generate content. Your prompts and generated content are processed 
                  by OpenAI. Please review OpenAI's privacy policy for more information.
                </p>
              </div>
              
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-1">MongoDB Atlas</h3>
                <p className="text-sm text-gray-600">
                  We use MongoDB Atlas for database hosting. Your data is stored securely in MongoDB's 
                  cloud infrastructure.
                </p>
              </div>
            </div>
          </section>

          {/* Data Retention */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Data Retention</h2>
            <p className="text-gray-700">
              We retain your personal information for as long as your account is active or as needed to 
              provide you services. You can request deletion of your account and data at any time by 
              contacting us.
            </p>
          </section>

          {/* Your Rights */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Rights</h2>
            <p className="text-gray-700 mb-4">You have the right to:</p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Access your personal data</li>
              <li>Correct inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Export your data</li>
              <li>Opt-out of marketing communications</li>
              <li>Object to processing of your data</li>
            </ul>
          </section>

          {/* Cookies */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Cookies</h2>
            <p className="text-gray-700">
              We use JWT tokens stored in your browser's localStorage for authentication. This is not a 
              traditional cookie but serves a similar purpose. You can clear this token by logging out or 
              clearing your browser's local storage.
            </p>
          </section>

          {/* Children's Privacy */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Children's Privacy</h2>
            <p className="text-gray-700">
              Our service is not intended for users under 13 years of age. We do not knowingly collect 
              personal information from children under 13.
            </p>
          </section>

          {/* Changes to Privacy Policy */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Changes to This Privacy Policy</h2>
            <p className="text-gray-700">
              We may update this Privacy Policy from time to time. We will notify you of any changes by 
              posting the new Privacy Policy on this page and updating the "Last updated" date.
            </p>
          </section>

          {/* Contact */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <Mail className="w-6 h-6 text-primary-600" />
              <h2 className="text-2xl font-bold text-gray-900">Contact Us</h2>
            </div>
            <p className="text-gray-700 mb-4">
              If you have questions about this Privacy Policy or how we handle your data, please contact us:
            </p>
            <div className="p-4 bg-primary-50 rounded-lg">
              <p className="text-gray-700">
                <strong>Email:</strong> <a href="mailto:privacy@devpostai.com" className="text-primary-600 hover:underline">privacy@devpostai.com</a>
              </p>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Privacy;
