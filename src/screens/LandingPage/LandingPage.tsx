import {
  Sparkles,
  ArrowRight,
  Zap,
  Target,
  Brain,
  Lightbulb,
  CheckCircle,
  Code2,
  ArrowUp
} from 'lucide-react';
import { TextLoader } from '../../components/animations/TextLoader';
import { FAQ } from '../FAQ/FAQ';
import { useState, useEffect } from 'react';

interface LandingPageProps {
  onGetStarted: () => void;
  onStartHackathonMode: () => void;
}

export function LandingPage({ onGetStarted, onStartHackathonMode }: LandingPageProps) {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-50/50">

      <style>
        {`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes fadeInDown {
            from {
              opacity: 0;
              transform: translateY(-20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes scaleIn {
            from {
              opacity: 0;
              transform: scale(0.95);
            }
            to {
              opacity: 1;
              transform: scale(1);
            }
          }

          @keyframes slideInLeft {
            from {
              opacity: 0;
              transform: translateX(-30px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }

          @keyframes slideInRight {
            from {
              opacity: 0;
              transform: translateX(30px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }

          .animate-fadeInUp {
            animation: fadeInUp 0.6s ease-out forwards;
          }

          .animate-fadeInDown {
            animation: fadeInDown 0.6s ease-out forwards;
          }

          .animate-scaleIn {
            animation: scaleIn 0.5s ease-out forwards;
          }

          .animate-slideInLeft {
            animation: slideInLeft 0.6s ease-out forwards;
          }

          .animate-slideInRight {
            animation: slideInRight 0.6s ease-out forwards;
          }

          .delay-100 { animation-delay: 0.1s; }
          .delay-200 { animation-delay: 0.2s; }
          .delay-300 { animation-delay: 0.3s; }
          .delay-400 { animation-delay: 0.4s; }
          .delay-500 { animation-delay: 0.5s; }
        `}
      </style>

      {/* Hero Section */}
      <div className="relative overflow-hidden min-h-[600px] flex items-center">
        {/* Background Decor */}
        <div className="absolute inset-0 overflow-hidden opacity-[0.02]">
          <div className="absolute top-1/4 left-1/4 w-[800px] h-[800px] bg-[#1F3C88] rounded-full blur-[120px]"></div>
          <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-[#22D3EE] rounded-full blur-[100px]"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 py-12 lg:py-24 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">

            {/* Left: Main Content */}
            <div className="text-center lg:text-left">
              <h1 className="text-[#1F3C88] mb-6 text-4xl sm:text-5xl lg:text-6xl animate-fadeInDown font-bold leading-tight tracking-tight">
                Stop Wondering.
                <br />
                <span className="text-[#22D3EE]">
                  Start Building.
                </span>
              </h1>

              <p className="text-lg sm:text-xl lg:text-2xl text-slate-600 leading-relaxed mb-10 animate-fadeInUp delay-100 max-w-xl">
                AI-powered project ideas that match your skill, interests, and availability.
              </p>

              {/* Text Loader Animation */}
              <div className="flex justify-center lg:justify-start mb-10 animate-fadeInUp delay-200">
                <TextLoader />
              </div>

              {/* CTA Buttons - Refined sizing to prevent wrapping */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button
                  onClick={onGetStarted}
                  className="group px-6 py-3.5 bg-[#1F3C88] text-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 text-base font-semibold animate-scaleIn delay-300"
                >
                  <span className="flex items-center justify-center gap-3">
                    <Sparkles className="w-5 h-5 text-cyan-400" />
                    Generate My Idea
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </button>

                <button
                  onClick={onStartHackathonMode}
                  className="group px-6 py-3.5 bg-white border-2 border-slate-200 text-[#1F3C88] rounded-2xl shadow-sm hover:border-[#1F3C88]/20 transition-all duration-300 text-base font-semibold animate-scaleIn delay-400"
                >
                  <span className="flex items-center justify-center gap-3">
                    <Zap className="w-5 h-5 text-amber-500" />
                    <span>Hackathon Mode</span>
                  </span>
                </button>
              </div>

              {/* Trust Indicators */}
              <div className="mt-10 flex items-center justify-center lg:justify-start gap-6 text-slate-500 animate-fadeInUp delay-500">
                <div className="flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-sm">No signup required</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-sm">Free forever</span>
                </div>
              </div>
            </div>

            {/* Right: Hero Illustration */}
            <div className="hidden lg:flex justify-center items-center animate-slideInRight delay-200 w-full max-w-lg mx-auto">
              <div className="relative w-full aspect-square">
                {/* Decorative background elements */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] bg-gradient-to-tr from-cyan-100/40 to-[#1F3C88]/10 rounded-full blur-[80px] -z-10"></div>
                
                <div className="relative h-full flex flex-col justify-center gap-12">
                  <div className="flex items-center justify-between w-full relative px-4">
                    
                    {/* Connecting line */}
                    <div className="absolute top-1/2 left-12 right-12 h-1 bg-gradient-to-r from-amber-200 via-cyan-300 to-[#1F3C88] -z-10 rounded-full opacity-60"></div>

                    {/* Input */}
                    <div className="flex flex-col items-center gap-4 animate-fadeInUp delay-300 transform transition-transform hover:-translate-y-2">
                      <div className="w-24 h-24 bg-white rounded-3xl shadow-xl flex items-center justify-center border-2 border-slate-100 rotate-[-8deg] hover:rotate-0 transition-transform">
                        <Lightbulb className="w-12 h-12 text-amber-500" />
                      </div>
                      <span className="text-sm font-bold text-slate-600 bg-white px-4 py-1.5 rounded-full shadow-sm border border-slate-100">Raw Idea</span>
                    </div>

                    {/* AI Processing */}
                    <div className="flex flex-col items-center justify-center relative animate-fadeInUp delay-400 transform transition-transform hover:scale-110">
                      <div className="absolute inset-0 bg-cyan-200 rounded-full blur-2xl scale-125 animate-pulse opacity-50"></div>
                      <div className="w-32 h-32 bg-gradient-to-tr from-[#1F3C88] to-[#22D3EE] rounded-[40px] shadow-2xl flex items-center justify-center relative z-10 rotate-[45deg] overflow-hidden">
                        <div className="absolute inset-0 bg-white/10 blur-xl"></div>
                        <Brain className="w-16 h-16 text-white rotate-[-45deg]" />
                      </div>
                      <div className="absolute -right-2 -top-2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center z-20">
                        <Sparkles className="w-5 h-5 text-[#22D3EE] animate-pulse" />
                      </div>
                    </div>

                    {/* Output */}
                    <div className="flex flex-col items-center gap-4 animate-fadeInUp delay-500 transform transition-transform hover:-translate-y-2">
                      <div className="w-24 h-24 bg-white rounded-3xl shadow-xl flex items-center justify-center border-2 border-slate-100 rotate-[8deg] hover:rotate-0 transition-transform">
                        <Code2 className="w-12 h-12 text-[#1F3C88]" />
                      </div>
                      <span className="text-sm font-bold text-slate-600 bg-white px-4 py-1.5 rounded-full shadow-sm border border-slate-100">Blueprint</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="relative">
        <div className="absolute inset-0 grid-pattern opacity-100"></div>

        <div className="relative z-10">
          {/* How It Works */}
          <section id="how-it-works" className="py-24">
            <div className="container mx-auto px-4 max-w-6xl">
              <div className="text-center mb-16">
                <h2 className="text-[#1F3C88] text-4xl lg:text-5xl font-bold mb-4">How It Works</h2>
                <p className="text-xl text-slate-600">Three simple steps to your next portfolio piece</p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {[
                  {
                    step: '1',
                    icon: Target,
                    title: 'Your Skill Level',
                    description: 'Beginner, intermediate, or advanced? We adapt to you.',
                    feature: 'Adaptive Difficulty'
                  },
                  {
                    step: '2',
                    icon: Sparkles,
                    title: 'Strategic Questions',
                    description: 'Answer smart questions that uncover your interests.',
                    feature: 'AI Logic'
                  },
                  {
                    step: '3',
                    icon: Lightbulb,
                    title: 'Custom Roadmap',
                    description: 'Get a full blueprint with features and tech stack.',
                    feature: 'Pure Feasibility'
                  }
                ].map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div key={idx} className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300">
                      <div className="w-14 h-14 bg-navy-50 rounded-2xl flex items-center justify-center mb-6">
                        <Icon className="w-7 h-7 text-[#1F3C88]" />
                      </div>
                      <h3 className="text-[#1F3C88] text-2xl font-bold mb-3">{item.title}</h3>
                      <p className="text-slate-600 text-lg mb-6 leading-relaxed">{item.description}</p>
                      

                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Example Output */}
          <section className="py-24 bg-slate-50/50">
            <div className="container mx-auto px-4 max-w-5xl">
              <div className="text-center mb-16">
                <h2 className="text-[#1F3C88] text-4xl lg:text-5xl font-bold mb-4">What You Get</h2>
                <p className="text-xl text-slate-600">A detailed blueprint for success</p>
              </div>

              <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
                <div className="p-8 lg:p-12 border-b border-slate-50">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="px-4 py-1.5 bg-navy-50 text-[#1F3C88] rounded-full text-sm font-semibold">
                      Featured Example
                    </span>
                  </div>
                  <h3 className="text-3xl lg:text-4xl font-bold text-[#1F3C88] mb-4">Task Manager with Local Storage</h3>
                  <p className="text-lg text-slate-600">A practical web app focused on DOM manipulation and data persistence.</p>
                  
                  <div className="flex flex-wrap gap-3 mt-8">
                    {['Beginner', 'Web Dev', '2-3 Weeks'].map(tag => (
                      <span key={tag} className="px-4 py-2 bg-slate-100 text-slate-600 rounded-xl text-sm font-medium">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-8 lg:p-12">
                  <div className="grid md:grid-cols-2 gap-12">
                    <div>
                      <h4 className="text-[#1F3C88] font-bold text-xl mb-6 flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-[#22D3EE]" />
                        Key Features
                      </h4>
                      <ul className="space-y-4 text-slate-600 text-lg">
                        {['Task persistence', 'Status filtering', 'Inline editing', 'Dark mode support'].map(f => (
                          <li key={f} className="flex items-center gap-3">
                            <div className="w-1.5 h-1.5 bg-[#22D3EE] rounded-full"></div>
                            {f}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-[#1F3C88] font-bold text-xl mb-6 flex items-center gap-2">
                        <Code2 className="w-5 h-5 text-[#22D3EE]" />
                        Tech Stack
                      </h4>
                      <div className="flex flex-wrap gap-3">
                        {['HTML5', 'CSS3', 'JavaScript', 'localStorage'].map(t => (
                          <span key={t} className="px-4 py-2 bg-[#1F3C88] text-white rounded-xl text-sm font-medium">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-12 p-8 bg-navy-50 rounded-2xl border-l-4 border-[#22D3EE]">
                    <div className="flex gap-4">
                      <Brain className="w-8 h-8 text-[#1F3C88] flex-shrink-0" />
                      <div>
                        <h4 className="text-[#1F3C88] font-bold text-lg mb-2">AI Reasoning</h4>
                        <p className="text-slate-600 leading-relaxed">
                          This project reinforces core concepts while delivering a tangible tool. It's perfectly sized for a beginner's sprint.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* FAQ */}
          <FAQ />

          {/* Final CTA */}
          <section className="py-24">
            <div className="container mx-auto px-4 max-w-4xl text-center">
              <h2 className="text-[#1F3C88] text-4xl lg:text-5xl font-bold mb-6">Ready to Build?</h2>
              <p className="text-xl text-slate-600 mb-10">Stop wondering what to build. Find your perfect match in seconds.</p>
              
              <button
                onClick={onGetStarted}
                className="group px-12 py-6 bg-[#1F3C88] text-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 text-2xl font-bold"
              >
                <span className="flex items-center justify-center gap-3">
                  <Sparkles className="w-7 h-7" />
                  Generate My Idea
                  <ArrowRight className="w-7 h-7 group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
            </div>
          </section>
        </div>
      </div>

      {/* Back to Top */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 w-14 h-14 bg-[#1F3C88] text-white rounded-full shadow-lg hover:scale-110 transition-all duration-300 flex items-center justify-center"
        >
          <ArrowUp className="w-6 h-6" />
        </button>
      )}

    </div>
  );
}

export default LandingPage;