import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  Clock, 
  TrendingUp, 
  Zap, 
  CheckCircle2,
  Linkedin,
  ArrowRight,
  BarChart3,
  Users,
  Bot,
  Menu,
  X
} from 'lucide-react';

const Home = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Navigation */}
      <nav className="bg-white/90 backdrop-blur-lg border-b border-gray-200 sticky top-0 z-50 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 sm:h-20">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-primary-600 to-primary-700 rounded-xl flex items-center justify-center shadow-lg">
                <Sparkles className="w-5 h-5 sm:w-7 sm:h-7 text-white" />
              </div>
              <div>
                <span className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-primary-600 to-primary-700 bg-clip-text text-transparent">DevPost AI</span>
                <p className="text-[10px] sm:text-xs text-gray-500 font-medium">LinkedIn Content Engine</p>
              </div>
            </div>

            {/* Desktop nav */}
            <div className="hidden sm:flex items-center space-x-4">
              <Link
                to="/login"
                className="px-5 py-2.5 text-gray-700 hover:text-primary-600 font-semibold transition-all duration-200 hover:bg-gray-50 rounded-lg"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-xl font-semibold hover:shadow-2xl hover:scale-105 transition-all duration-300 shadow-lg"
              >
                Get Started Free
              </Link>
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="sm:hidden p-2 text-gray-600 hover:text-primary-600 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile menu */}
          {mobileMenuOpen && (
            <div className="sm:hidden border-t border-gray-200 py-4 space-y-3">
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-2.5 text-gray-700 hover:text-primary-600 font-semibold transition-all rounded-lg hover:bg-gray-50"
              >
                Login
              </Link>
              <Link
                to="/register"
                onClick={() => setMobileMenuOpen(false)}
                className="block mx-4 px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-xl font-semibold text-center shadow-lg"
              >
                Get Started Free
              </Link>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-24 pb-12 sm:pb-20">
        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 w-48 sm:w-72 h-48 sm:h-72 bg-primary-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-40 right-10 w-48 sm:w-72 h-48 sm:h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        
        <div className="relative text-center space-y-6 sm:space-y-10">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-primary-50 to-indigo-50 text-primary-700 px-4 py-2 sm:px-5 sm:py-3 rounded-full text-xs sm:text-sm font-semibold border-2 border-primary-200 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105">
            <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 animate-pulse" />
            <span>Powered by Claude AI</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl sm:text-6xl lg:text-8xl font-bold text-gray-900 leading-tight tracking-tight">
            Your LinkedIn Presence,
            <br />
            <span className="bg-gradient-to-r from-primary-600 via-primary-500 to-indigo-600 bg-clip-text text-transparent animate-gradient">
              On Autopilot
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-base sm:text-xl lg:text-2xl text-gray-700 max-w-4xl mx-auto leading-relaxed font-medium px-2">
            Generate engaging, professional LinkedIn posts in <span className="text-primary-600 font-bold">seconds</span> using <span className="text-primary-600 font-bold">Claude AI</span>. 
            Then sit back as they <span className="text-primary-600 font-bold">automatically post to your profile</span>. 
            Stay consistent, grow your presence, no time commitment.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5 pt-4 sm:pt-6">
            <Link
              to="/register"
              className="group w-full sm:w-auto px-8 sm:px-10 py-4 sm:py-5 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-2xl font-bold text-lg sm:text-xl hover:shadow-2xl hover:scale-105 sm:hover:scale-110 transition-all duration-300 flex items-center justify-center space-x-3 shadow-xl"
            >
              <span>Start Creating for Free</span>
              <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-2 transition-transform duration-300" />
            </Link>
            <Link
              to="/about"
              className="w-full sm:w-auto px-8 sm:px-10 py-4 sm:py-5 bg-white text-gray-800 rounded-2xl font-bold text-lg sm:text-xl border-2 border-gray-300 hover:border-primary-600 hover:text-primary-600 hover:shadow-xl transition-all duration-300 text-center"
            >
              Watch Demo
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8 pt-12 sm:pt-20 max-w-5xl mx-auto">
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 border border-gray-100">
              <div className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-primary-600 to-primary-700 bg-clip-text text-transparent">10x</div>
              <div className="text-gray-700 mt-2 sm:mt-3 font-semibold text-base sm:text-lg">Faster Content Creation</div>
            </div>
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 border border-gray-100">
              <div className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-primary-600 to-primary-700 bg-clip-text text-transparent">95%</div>
              <div className="text-gray-700 mt-2 sm:mt-3 font-semibold text-base sm:text-lg">Time Saved Weekly</div>
            </div>
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 border border-gray-100">
              <div className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-primary-600 to-primary-700 bg-clip-text text-transparent">24/7</div>
              <div className="text-gray-700 mt-2 sm:mt-3 font-semibold text-base sm:text-lg">Content Ready</div>
            </div>
          </div>
        </div>
      </div>

      {/* Problem Section */}
      <div className="py-12 sm:py-24 bg-gradient-to-b from-white via-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 sm:space-y-6 mb-12 sm:mb-20">
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900">
              The LinkedIn Dilemma
            </h2>
            <p className="text-lg sm:text-2xl text-gray-600 max-w-4xl mx-auto font-medium px-2">
              We all know consistent LinkedIn posting is crucial for professional growth, 
              but who has the time?
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-10 max-w-6xl mx-auto">
            <div className="group bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-10 border-2 border-gray-200 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:border-primary-300">
              <div className="bg-gradient-to-br from-primary-100 to-primary-50 w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300">
                <Clock className="w-7 h-7 sm:w-9 sm:h-9 text-primary-600" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-gray-900">No Time to Post</h3>
              <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
                Between meetings, deadlines, and life, creating quality content gets pushed to "someday"
              </p>
            </div>

            <div className="group bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-10 border-2 border-gray-200 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:border-primary-300">
              <div className="bg-gradient-to-br from-primary-100 to-primary-50 w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300">
                <TrendingUp className="w-7 h-7 sm:w-9 sm:h-9 text-primary-600" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-gray-900">Falling Behind</h3>
              <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
                Your competitors are posting daily while your profile collects dust
              </p>
            </div>

            <div className="group bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-10 border-2 border-gray-200 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:border-primary-300">
              <div className="bg-gradient-to-br from-primary-100 to-primary-50 w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300">
                <Zap className="w-7 h-7 sm:w-9 sm:h-9 text-primary-600" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-gray-900">Writer's Block</h3>
              <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
                Staring at a blank screen, struggling to find the right words or ideas
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Solution Section */}
      <div className="py-12 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 sm:space-y-6 mb-10 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">
              Your Solution is Here
            </h2>
            <p className="text-base sm:text-xl text-gray-600 max-w-3xl mx-auto px-2">
              DevPost AI generates professional, engaging LinkedIn content in seconds using Claude AI. 
              Just pick a topic, customize the tone, connect LinkedIn, and watch posts publish automatically.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 items-center">
            <div className="space-y-6">
          <div className="flex items-start space-x-4">
                <div className="bg-primary-50 p-3 rounded-lg border border-primary-100">
                  <Bot className="w-6 h-6 text-primary-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Claude AI Writing</h3>
                  <p className="text-gray-600">
                    Powered by Claude, one of the most advanced AI models. Understands LinkedIn's tone and creates posts that resonate
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-primary-50 p-3 rounded-lg border border-primary-100">
                  <Clock className="w-6 h-6 text-primary-500" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Minutes to Seconds</h3>
                  <p className="text-gray-600">
                    What used to take 30+ minutes now takes less than 30 seconds. Generate, review, post.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-primary-50 p-3 rounded-lg border border-primary-100">
                  <Users className="w-6 h-6 text-primary-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Multiple Tones & Styles</h3>
                  <p className="text-gray-600">
                    Educational, motivational, storytelling - customize the tone to match your brand
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-primary-50 p-3 rounded-lg border border-primary-100">
                  <Linkedin className="w-6 h-6 text-primary-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Auto-Post to LinkedIn</h3>
                  <p className="text-gray-600">
                    Connect your LinkedIn and posts publish automatically. No copy-paste, no manual posting. Just generate and go.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-primary-600 rounded-2xl p-1">
              <div className="bg-white rounded-xl p-8">
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-4 border-b">
                    <span className="font-semibold text-gray-700">Generate Post</span>
                    <Sparkles className="w-5 h-5 text-primary-600" />
                  </div>
                  <div className="space-y-3">
                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="text-sm text-gray-500 mb-1">Topic</div>
                      <div className="text-gray-900">AI in business</div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="text-sm text-gray-500 mb-1">Tone</div>
                      <div className="text-gray-900">Educational</div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="text-sm text-gray-500 mb-1">Length</div>
                      <div className="text-gray-900">Medium</div>
                    </div>
                  </div>
                  <button className="w-full bg-primary-600 text-white py-3 rounded-lg font-semibold flex items-center justify-center space-x-2">
                    <Sparkles className="w-5 h-5" />
                    <span>Generate & Post</span>
                  </button>
                  <div className="mt-4 p-4 bg-green-50 rounded-lg border-2 border-green-200">
                    <div className="text-sm text-green-700 mb-2 font-semibold">✅ Posted to LinkedIn!</div>
                    <div className="text-sm text-green-700">
                      Your post is now live on your LinkedIn profile
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="py-12 sm:py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
              Everything You Need
            </h2>
            <p className="text-base sm:text-xl text-gray-600">
              Powerful features to supercharge your LinkedIn presence
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[
              { icon: Sparkles, title: 'Claude AI Generation', desc: 'Powered by advanced Claude AI' },
              { icon: Users, title: 'Multiple Tones', desc: 'Educational, motivational, storytelling' },
              { icon: Linkedin, title: 'Auto-Post to LinkedIn', desc: 'Posts publish automatically to your profile' },
              { icon: Clock, title: 'Lightning Fast', desc: 'Generate & post in under 30 seconds' },
              { icon: CheckCircle2, title: 'Manual Control', desc: 'Edit before posting if you want' },
              { icon: BarChart3, title: 'Track Performance', desc: 'See engagement on all your posts' }
            ].map((feature, idx) => (
              <div key={idx} className="bg-white rounded-xl p-6 border border-gray-100 shadow-md hover:shadow-xl transition-shadow">
                <feature.icon className="w-10 h-10 text-primary-600 mb-4" />
                <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative bg-indigo-700 py-16 sm:py-28 overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-10 left-10 w-40 sm:w-64 h-40 sm:h-64 bg-white rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-48 sm:w-80 h-48 sm:h-80 bg-white rounded-full filter blur-3xl"></div>
        </div>
        
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-4 sm:mb-6 leading-tight">
            Start Posting to LinkedIn on Autopilot
          </h2>
          <p className="text-lg sm:text-2xl text-white/90 mb-8 sm:mb-10 font-medium max-w-3xl mx-auto px-2">
            Generate posts with AI. They post automatically. Build your presence while you focus on what matters.
          </p>
          <Link
            to="/register"
            className="inline-flex items-center space-x-3 px-8 sm:px-12 py-4 sm:py-6 bg-white text-primary-700 rounded-2xl font-bold text-lg sm:text-xl hover:shadow-2xl hover:scale-105 sm:hover:scale-110 transition-all duration-300 shadow-2xl group"
          >
            <span>Get Started Free</span>
            <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-2 transition-transform duration-300" />
          </Link>
          <p className="text-white/80 mt-4 sm:mt-6 text-sm sm:text-lg font-semibold px-4">No credit card required • Start creating in minutes • Cancel anytime</p>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 text-gray-600 py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center space-y-4 md:flex-row md:justify-between md:space-y-0">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="text-lg font-bold text-gray-900">DevPost AI</span>
                <p className="text-[10px] text-gray-500">LinkedIn Content Engine</p>
              </div>
            </div>
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
              <Link to="/about" className="hover:text-primary-600 transition-colors text-sm sm:text-base">About</Link>
              <Link to="/privacy" className="hover:text-primary-600 transition-colors text-sm sm:text-base">Privacy</Link>
              <Link to="/terms" className="hover:text-primary-600 transition-colors text-sm sm:text-base">Terms</Link>
              <Link to="/refund-policy" className="hover:text-primary-600 transition-colors text-sm sm:text-base">Refund Policy</Link>
            </div>
            <div className="text-xs sm:text-sm text-gray-500">
              © 2026 DevPost AI. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
