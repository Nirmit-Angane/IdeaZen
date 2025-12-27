import {
    Sparkles,
    ArrowRight,
    Zap,
    Target,
    Brain,
    Lightbulb,
    CheckCircle,
    Code2
} from 'lucide-react';
import { TextLoader } from './TextLoader';
import { ServerNodeLoader } from './ServerNodeLoader';

interface LandingPageProps {
    onGetStarted: () => void;
}

export function LandingPage({ onGetStarted }: LandingPageProps) {
    return (
        <div className="min-h-screen bg-gradient-to-b from-[#F8FAFC] to-white">

            <style>
                {`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes fadeInDown {
            from {
              opacity: 0;
              transform: translateY(-30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes scaleIn {
            from {
              opacity: 0;
              transform: scale(0.9);
            }
            to {
              opacity: 1;
              transform: scale(1);
            }
          }

          @keyframes slideInLeft {
            from {
              opacity: 0;
              transform: translateX(-50px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }

          @keyframes slideInRight {
            from {
              opacity: 0;
              transform: translateX(50px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }

          @keyframes float {
            0%, 100% {
              transform: translateY(0px);
            }
            50% {
              transform: translateY(-10px);
            }
          }

          @keyframes glow {
            0%, 100% {
              box-shadow: 0 0 20px rgba(124, 108, 246, 0.3);
            }
            50% {
              box-shadow: 0 0 40px rgba(34, 211, 238, 0.6);
            }
          }

          @keyframes shimmer {
            0% {
              background-position: -1000px 0;
            }
            100% {
              background-position: 1000px 0;
            }
          }

          .animate-fadeInUp {
            animation: fadeInUp 0.8s ease-out forwards;
          }

          .animate-fadeInDown {
            animation: fadeInDown 0.8s ease-out forwards;
          }

          .animate-scaleIn {
            animation: scaleIn 0.6s ease-out forwards;
          }

          .animate-slideInLeft {
            animation: slideInLeft 0.8s ease-out forwards;
          }

          .animate-slideInRight {
            animation: slideInRight 0.8s ease-out forwards;
          }

          .animate-float {
            animation: float 3s ease-in-out infinite;
          }

          .animate-glow {
            animation: glow 3s ease-in-out infinite;
          }

          .animate-shimmer {
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
            background-size: 1000px 100%;
            animation: shimmer 3s infinite;
          }

          .delay-100 { animation-delay: 0.1s; }
          .delay-200 { animation-delay: 0.2s; }
          .delay-300 { animation-delay: 0.3s; }
          .delay-400 { animation-delay: 0.4s; }
          .delay-500 { animation-delay: 0.5s; }
          .delay-600 { animation-delay: 0.6s; }
        `}
            </style>

            {/* Hero Section */}
            <div className="relative overflow-hidden">
                {/* Animated Background */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-[#7C6CF6]/20 to-[#22D3EE]/20 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-gradient-to-br from-[#22D3EE]/20 to-[#1F3C88]/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
                </div>

                <div className="container mx-auto px-2 py-20 lg:py-32 relative z-10">
                    <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">

                        {/* Left: Main Content */}
                        <div className="text-center lg:text-left">
                            <h1 className="text-[#1F3C88] mb-6 text-5xl lg:text-6xl animate-fadeInDown">
                                Stop Wondering.
                                <br />
                                <span className="bg-gradient-to-r from-[#1F3C88] via-[#22D3EE] to-[#7C6CF6] bg-clip-text text-transparent relative">
                                    Start Building.
                                    <span className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-[#22D3EE] to-[#7C6CF6] rounded-full opacity-50 blur-sm"></span>
                                </span>
                            </h1>

                            <p className="text-xl lg:text-2xl text-[#334155] leading-relaxed mb-8 animate-fadeInUp delay-200">
                                AI-powered project ideas that match your skill, interests, and time
                            </p>

                            {/* Text Loader Animation */}
                            <div className="flex justify-center lg:justify-start mb-8 animate-fadeInUp delay-300">
                                <TextLoader />
                            </div>

                            {/* CTA Button */}
                            <button
                                onClick={onGetStarted}
                                className="group relative px-10 py-5 bg-gradient-to-r from-[#1F3C88] to-[#22D3EE] text-white rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 text-xl mb-3 w-full lg:w-auto animate-scaleIn delay-400 animate-glow"
                            >
                                <span className="relative z-10 flex items-center justify-center gap-3 text-white">
                                    ✨ Generate My Project Idea
                                    <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                                </span>
                                <div className="absolute inset-0 bg-gradient-to-r from-[#22D3EE] to-[#7C6CF6] rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </button>

                            <p className="text-sm text-[#64748B] mb-2 animate-fadeInUp delay-500">
                                ⚡ Takes less than 1 minute • No signup required
                            </p>
                        </div>

                        {/* Right: Server Node Loader */}
                        <div className="flex justify-center items-center animate-slideInRight delay-300">
                            <ServerNodeLoader />
                        </div>

                    </div>
                </div>
            </div>

            {/* How It Works */}
            <div id="how-it-works" className="container mx-auto px-4 py-20">
                <div className="max-w-6xl mx-auto">

                    <div className="text-center mb-16">
                        <h2 className="text-[#1F3C88] text-4xl lg:text-5xl mb-4">How It Works</h2>
                        <p className="text-xl text-[#334155] max-w-2xl mx-auto">Three simple steps to your perfect project</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                step: '1',
                                icon: Target,
                                title: 'Tell Us Your Level',
                                description: 'Beginner, intermediate, or advanced? AI adapts to you.',
                                color: 'from-[#22D3EE] to-[#1F3C88]'
                            },
                            {
                                step: '2',
                                icon: Sparkles,
                                title: 'Answer Smart Questions',
                                description: 'AI asks personalized questions based on your skill level.',
                                color: 'from-[#1F3C88] to-[#22D3EE]'
                            },
                            {
                                step: '3',
                                icon: Lightbulb,
                                title: 'Get Your Idea',
                                description: 'AI-matched project with roadmap, tech stack, and resources.',
                                color: 'from-[#7C6CF6] to-[#1F3C88]'
                            }
                        ].map((item) => {
                            const Icon = item.icon;
                            return (
                                <div key={item.step} className="relative">
                                    <div className="bg-white rounded-2xl p-8 border-2 border-[#E2E8F0] hover:border-[#22D3EE] hover:shadow-xl hover:scale-105 transition-all duration-300">
                                        {/* Step Number */}
                                        <div className={`absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br ${item.color} rounded-xl flex items-center justify-center text-white text-xl shadow-lg animate-float`} style={{ animationDelay: `${parseInt(item.step) * 0.3}s` }}>
                                            {item.step}
                                        </div>

                                        {/* Icon */}
                                        <div className={`w-16 h-16 bg-gradient-to-br ${item.color} rounded-xl flex items-center justify-center mb-6 shadow-lg animate-float`} style={{ animationDelay: `${parseInt(item.step) * 0.2}s` }}>
                                            <Icon className="w-8 h-8 text-white" />
                                        </div>

                                        <h3 className="text-[#1F3C88] text-2xl mb-3">{item.title}</h3>
                                        <p className="text-[#334155] leading-relaxed">{item.description}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Example AI Output - CRITICAL SECTION */}
            <div className="bg-gradient-to-b from-white to-[#F8FAFC] py-20">
                <div className="container mx-auto px-4">
                    <div className="max-w-5xl mx-auto">

                        <div className="text-center mb-12">
                            <h2 className="text-[#1F3C88] text-4xl lg:text-5xl mb-4">What You Actually Get</h2>
                            <p className="text-xl text-[#334155]">See a real AI-generated project idea</p>
                        </div>

                        {/* Mock Project Card */}
                        <div className="bg-white rounded-3xl shadow-2xl border-2 border-[#22D3EE]/30 overflow-hidden">

                            {/* Header */}
                            <div className="bg-gradient-to-br from-[#1F3C88] via-[#2d5ac9] to-[#22D3EE] p-8 text-white">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                                        <Lightbulb className="w-6 h-6 text-white" />
                                    </div>
                                    <span className="text-sm text-white font-medium">✨ AI Generated for Beginners</span>
                                </div>
                                <h3 className="text-3xl mb-3 text-white">Task Manager with Local Storage</h3>
                                <p className="text-white text-lg">A beginner-friendly web app to practice JavaScript fundamentals while building something useful</p>

                                <div className="flex flex-wrap gap-2 mt-6">
                                    <span className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm border border-white/30 text-white">
                                        Beginner
                                    </span>
                                    <span className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm border border-white/30 text-white">
                                        Web Development
                                    </span>
                                    <span className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm border border-white/30 text-white">
                                        2-3 Weeks
                                    </span>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-8">
                                <div className="grid md:grid-cols-2 gap-8">

                                    {/* Key Features */}
                                    <div>
                                        <h4 className="text-[#1F3C88] text-lg mb-4 flex items-center gap-2">
                                            <CheckCircle className="w-5 h-5 text-[#22D3EE]" />
                                            Key Features
                                        </h4>
                                        <ul className="space-y-2 text-[#334155]">
                                            <li className="flex items-start gap-2">
                                                <span className="text-[#22D3EE]">•</span>
                                                <span>Add, edit, and delete tasks</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <span className="text-[#22D3EE]">•</span>
                                                <span>Mark tasks as complete</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <span className="text-[#22D3EE]">•</span>
                                                <span>Filter by status</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <span className="text-[#22D3EE]">•</span>
                                                <span>Persist data with localStorage</span>
                                            </li>
                                        </ul>
                                    </div>

                                    {/* Tech Stack */}
                                    <div>
                                        <h4 className="text-[#1F3C88] text-lg mb-4 flex items-center gap-2">
                                            <Code2 className="w-5 h-5 text-[#7C6CF6]" />
                                            Tech Stack
                                        </h4>
                                        <div className="flex flex-wrap gap-2">
                                            {['HTML5', 'CSS3', 'JavaScript', 'localStorage'].map((tech) => (
                                                <span key={tech} className="px-4 py-2 bg-gradient-to-r from-[#1F3C88] to-[#22D3EE] text-white rounded-lg text-sm">
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                </div>

                                {/* AI Reasoning */}
                                <div className="mt-8 p-6 bg-gradient-to-br from-[#F3F1FF] to-[#ECFEFF] rounded-2xl border border-[#7C6CF6]/30">
                                    <div className="flex items-start gap-4">
                                        <div className="w-10 h-10 bg-gradient-to-br from-[#7C6CF6] to-[#22D3EE] rounded-xl flex items-center justify-center flex-shrink-0">
                                            <Brain className="w-5 h-5 text-white" />
                                        </div>
                                        <div>
                                            <h4 className="text-[#1F3C88] mb-2">Why AI Chose This</h4>
                                            <p className="text-[#334155] text-sm leading-relaxed">
                                                Perfect for beginners because it teaches core JavaScript concepts (DOM manipulation, events, data persistence)
                                                while creating a practical tool you'll actually use. Low complexity, high learning impact.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            {/* Why This Is Smart */}
            <div className="container mx-auto px-4 py-20">
                <div className="max-w-6xl mx-auto">

                    <div className="text-center mb-16">
                        <h2 className="text-[#1F3C88] text-4xl lg:text-5xl mb-4">Why This Is Smart</h2>
                        <p className="text-xl text-[#334155]">AI-powered features that adapt to you</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: Brain,
                                title: 'Skill-Adaptive',
                                description: 'Questions and ideas change based on your experience level',
                                color: 'from-[#7C6CF6] to-[#1F3C88]',
                                emoji: '🧠'
                            },
                            {
                                icon: Zap,
                                title: 'AI Reasoning',
                                description: 'See exactly why each project fits your goals and timeline',
                                color: 'from-[#22D3EE] to-[#1F3C88]',
                                emoji: '⚡'
                            },
                            {
                                icon: Target,
                                title: 'Feasibility Check',
                                description: 'Only get projects you can realistically complete',
                                color: 'from-[#1F3C88] to-[#22D3EE]',
                                emoji: '🎯'
                            }
                        ].map((feature) => (
                            <div key={feature.title} className="bg-white rounded-2xl p-8 border border-[#E2E8F0] hover:border-[#22D3EE] hover:shadow-xl hover:scale-105 transition-all duration-300">
                                <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center mb-6 shadow-lg text-2xl animate-float`} style={{ animationDelay: feature.title === 'Skill-Adaptive' ? '0s' : feature.title === 'AI Reasoning' ? '0.3s' : '0.6s' }}>
                                    {feature.emoji}
                                </div>
                                <h3 className="text-[#1F3C88] text-xl mb-3">{feature.title}</h3>
                                <p className="text-[#334155] leading-relaxed">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Trust Section */}
            <div className="bg-gradient-to-b from-[#F8FAFC] to-white py-20">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="bg-white rounded-3xl p-12 shadow-xl border border-[#E2E8F0]">
                            <div className="flex items-center justify-center gap-3 mb-6">
                                <div className="w-12 h-12 bg-gradient-to-br from-[#22D3EE] to-[#1F3C88] rounded-xl flex items-center justify-center">
                                    <CheckCircle className="w-6 h-6 text-white" />
                                </div>
                                <h3 className="text-[#1F3C88] text-2xl">Designed for Students & Developers</h3>
                            </div>
                            <p className="text-[#334155] text-lg leading-relaxed max-w-2xl mx-auto mb-8">
                                Whether you're building for college, learning on your own, or creating portfolio projects—this tool helps you stop overthinking and start coding.
                            </p>

                            <div className="flex flex-wrap justify-center gap-4 text-sm text-[#64748B]">
                                <span className="flex items-center gap-2">
                                    <CheckCircle className="w-4 h-4 text-[#22D3EE]" />
                                    Free forever
                                </span>
                                <span className="flex items-center gap-2">
                                    <CheckCircle className="w-4 h-4 text-[#22D3EE]" />
                                    No signup required
                                </span>
                                <span className="flex items-center gap-2">
                                    <CheckCircle className="w-4 h-4 text-[#22D3EE]" />
                                    AI-powered matching
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Final CTA */}
            <div className="container mx-auto px-4 py-20">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-[#1F3C88] text-4xl lg:text-5xl mb-6">
                        Ready to Build Something?
                    </h2>
                    <p className="text-xl text-[#334155] mb-10 max-w-2xl mx-auto">
                        Stop wondering what to build. Let AI find your perfect project match in minutes.
                    </p>

                    <button
                        onClick={onGetStarted}
                        className="group relative px-10 py-5 bg-gradient-to-r from-[#1F3C88] to-[#22D3EE] text-white rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 text-xl hover:scale-105"
                    >
                        <span className="relative z-10 flex items-center gap-3 text-white">
                            ✨ Generate My Project Idea
                            <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-[#22D3EE] to-[#7C6CF6] rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </button>

                    <p className="text-sm text-[#64748B] mt-6">
                        💡 You can refine your idea anytime with AI
                    </p>
                </div>
            </div>

        </div>
    );
}
