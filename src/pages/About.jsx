import { Link } from 'react-router-dom';
import { Sparkles, ArrowLeft, Linkedin, Github, Mail } from 'lucide-react';

const About = () => {
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
          <h1 className="text-4xl font-bold text-gray-900 mb-4">About DevPost AI</h1>
          <p className="text-lg text-gray-600 mb-8">
            AI-powered LinkedIn content engine for developers
          </p>

          {/* What is DevPost AI */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">What is DevPost AI?</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              DevPost AI is a SaaS application designed to help developers create engaging LinkedIn posts using AI. 
              We understand that developers are great at coding but often struggle with content creation. That's why 
              we built a tool that generates high-quality, developer-focused LinkedIn posts in seconds.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Our AI-powered engine uses advanced natural language processing to create posts that resonate with 
              the developer community, helping you build your personal brand and share your knowledge effectively.
            </p>
          </section>

          {/* Mission */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
            <p className="text-gray-700 leading-relaxed">
              To empower developers to build their personal brand on LinkedIn without the hassle of content creation. 
              We believe every developer has valuable insights to share, and we're here to help amplify their voice.
            </p>
          </section>

          {/* Features */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Key Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">🤖 AI-Powered Generation</h3>
                <p className="text-sm text-gray-600">
                  Generate posts using advanced GPT-4 technology tailored for developers
                </p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">🎨 Multiple Tones</h3>
                <p className="text-sm text-gray-600">
                  Choose from Educational, Storytelling, Opinion, Motivational, Technical, or Casual
                </p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">📝 Editable Content</h3>
                <p className="text-sm text-gray-600">
                  Edit generated posts to match your personal style before posting
                </p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">💾 Post History</h3>
                <p className="text-sm text-gray-600">
                  Save and manage all your generated posts in one place
                </p>
              </div>
            </div>
          </section>

          {/* Tech Stack */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Built With</h2>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium">React</span>
              <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium">Node.js</span>
              <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium">Express</span>
              <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium">MongoDB</span>
              <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium">OpenAI</span>
              <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium">Tailwind CSS</span>
            </div>
          </section>

          {/* Creator */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Created By</h2>
            <div className="p-6 bg-gradient-to-br from-primary-50 to-purple-50 rounded-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Zubair</h3>
              <p className="text-gray-700 mb-4">
                5th Semester CS Student | MERN Stack Developer | Intern at WardsPay
              </p>
              <div className="flex gap-3">
                <a href="#" className="p-2 bg-white rounded-lg hover:bg-gray-50 transition-colors">
                  <Linkedin className="w-5 h-5 text-primary-600" />
                </a>
                <a href="#" className="p-2 bg-white rounded-lg hover:bg-gray-50 transition-colors">
                  <Github className="w-5 h-5 text-gray-700" />
                </a>
                <a href="#" className="p-2 bg-white rounded-lg hover:bg-gray-50 transition-colors">
                  <Mail className="w-5 h-5 text-gray-700" />
                </a>
              </div>
            </div>
          </section>

          {/* Contact */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Get in Touch</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Have questions, feedback, or suggestions? We'd love to hear from you!
            </p>
            <p className="text-gray-700">
              Email us at: <a href="mailto:support@devpostai.com" className="text-primary-600 hover:underline">support@devpostai.com</a>
            </p>
          </section>
        </div>
      </main>
    </div>
  );
};

export default About;
