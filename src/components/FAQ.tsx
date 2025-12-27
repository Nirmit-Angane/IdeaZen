import { ChevronDown, Sparkles, DollarSign, UserX, GraduationCap, RefreshCw, Target, Shield, Zap, Clock, TrendingUp } from 'lucide-react';
import { useState } from 'react';

interface FAQItem {
  question: string;
  answer: string;
  icon: any;
  color: string;
}

const faqData: FAQItem[] = [
  {
    question: "Is this free?",
    answer: "Yes! IdeaZen is 100% free to use. No hidden fees, no premium tiers, no credit card required. We believe everyone should have access to quality project guidance, regardless of their budget. Generate unlimited ideas, save them locally, and use all features at no cost.",
    icon: DollarSign,
    color: "from-[#22C55E] to-[#16A34A]"
  },
  {
    question: "Do I need an account?",
    answer: "No account needed! We respect your privacy and keep things simple. All your saved ideas are stored locally in your browser using localStorage. This means no sign-ups, no passwords to remember, and no personal data stored on our servers. Just visit, generate, and save — it's that easy.",
    icon: UserX,
    color: "from-[#7C6CF6] to-[#9B8CFF]"
  },
  {
    question: "Is this suitable for college projects?",
    answer: "Absolutely! IdeaZen is perfect for college students looking for capstone projects, semester assignments, or portfolio pieces. Our AI considers your skill level and time availability to suggest projects that are academically valuable, technically challenging enough to demonstrate your skills, and feasible within typical semester timeframes.",
    icon: GraduationCap,
    color: "from-[#1F3C88] to-[#2563EB]"
  },
  {
    question: "Can I change ideas later?",
    answer: "Yes! You have complete flexibility. Use the 'AI Mentor Controls' to refine your idea, increase difficulty, or simplify it. You can also generate entirely new ideas based on the same inputs, or start over with different preferences. Save multiple ideas to 'My Ideas' and compare them side-by-side to find your perfect match.",
    icon: RefreshCw,
    color: "from-[#22D3EE] to-[#06B6D4]"
  },
  {
    question: "How accurate are the ideas?",
    answer: "Our AI analyzes your skill level, goals, time availability, and preferences to generate highly personalized project ideas. Each idea comes with a confidence score (typically 70-98%) indicating how well it matches your profile. We consider 50+ factors including technical complexity, learning impact, feasibility, and current industry trends to ensure relevant, achievable suggestions.",
    icon: Target,
    color: "from-[#FACC15] to-[#F59E0B]"
  },
  {
    question: "What skill levels are supported?",
    answer: "We support all skill levels from beginner to advanced. Beginners get projects focused on fundamentals with step-by-step roadmaps. Intermediate developers receive projects that challenge them with new technologies and patterns. Advanced users get complex, production-grade projects with distributed systems, AI integration, and scalable architectures.",
    icon: Zap,
    color: "from-[#F97316] to-[#EA580C]"
  },
  {
    question: "How long does it take to generate an idea?",
    answer: "Our AI typically generates a complete project blueprint in 3-5 seconds. This includes analyzing your inputs, validating feasibility, calculating complexity, selecting the optimal tech stack, and crafting a personalized roadmap with phases, timelines, and learning outcomes. You'll see real-time progress as the AI works.",
    icon: Clock,
    color: "from-[#8B5CF6] to-[#7C3AED]"
  },
  {
    question: "Is my data safe and private?",
    answer: "Your privacy is our priority. We don't collect, store, or share any personal information. All your preferences and saved ideas stay in your browser's local storage — we never see them. No tracking, no analytics on your project ideas, and no third-party data sharing. What you generate is yours alone.",
    icon: Shield,
    color: "from-[#EF4444] to-[#DC2626]"
  }
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 px-4 bg-gradient-to-b from-white via-[#F7F9FC] to-white">
      <div className="container mx-auto max-w-4xl">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-[#7C6CF6]/10 to-[#22D3EE]/10 border border-[#7C6CF6]/20 rounded-full mb-6">
            <Sparkles className="w-4 h-4 text-[#7C6CF6]" />
            <span className="text-sm font-semibold text-[#7C6CF6]">Frequently Asked Questions</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl text-[#1F3C88] mb-4 font-bold">
            Everything You Need to Know
          </h2>
          <p className="text-lg text-[#64748B] max-w-2xl mx-auto">
            Clear answers to common questions about IdeaZen, your AI project mentor
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {faqData.map((faq, index) => {
            const Icon = faq.icon;
            const isOpen = openIndex === index;
            
            return (
              <div
                key={index}
                className={`bg-white rounded-2xl border-2 transition-all duration-300 overflow-hidden ${
                  isOpen 
                    ? 'border-[#7C6CF6]/40 shadow-xl shadow-[#7C6CF6]/5' 
                    : 'border-gray-100 shadow-md hover:border-gray-200 hover:shadow-lg'
                }`}
              >
                {/* Question Header */}
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-4 sm:px-6 py-4 sm:py-5 flex items-center justify-between gap-3 sm:gap-4 text-left group"
                >
                  <div className="flex items-center gap-3 sm:gap-4 flex-1">
                    {/* Icon */}
                    <div className={`flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br ${faq.color} rounded-xl flex items-center justify-center shadow-md transition-transform duration-300 ${
                      isOpen ? 'scale-110' : 'group-hover:scale-105'
                    }`}>
                      <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                    
                    {/* Question Text */}
                    <h3 className={`text-base sm:text-lg md:text-xl font-semibold transition-colors ${
                      isOpen ? 'text-[#1F3C88]' : 'text-[#334155] group-hover:text-[#1F3C88]'
                    }`}>
                      {faq.question}
                    </h3>
                  </div>

                  {/* Chevron */}
                  <ChevronDown 
                    className={`w-5 h-5 sm:w-6 sm:h-6 text-[#7C6CF6] flex-shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {/* Answer Content */}
                <div 
                  className={`transition-all duration-300 ease-in-out ${
                    isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="px-4 sm:px-6 pb-4 sm:pb-6 pt-2">
                    <div className="pl-0 sm:pl-16 pr-0 sm:pr-4">
                      <p className="text-sm sm:text-base text-[#64748B] leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}