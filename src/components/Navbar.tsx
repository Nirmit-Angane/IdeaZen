import {
  Lightbulb,
  Menu,
  X,
  Sparkles,
  Bookmark,
  HelpCircle,
  Home,
} from "lucide-react";
import { useState } from "react";

interface NavbarProps {
  onLogoClick?: () => void;
  onMyIdeasClick?: () => void;
  onGenerateClick?: () => void;
  currentPage?: "home" | "my-ideas" | "generate";
}

export function Navbar({
  onLogoClick,
  onMyIdeasClick,
  onGenerateClick,
  currentPage = "home",
}: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] =
    useState(false);

  const scrollToSection = (id: string) => {
    // If we're not on the home page, navigate home first
    if (currentPage !== "home") {
      onLogoClick?.();
      // Wait for navigation to complete, then scroll
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    } else {
      // Already on home page, just scroll
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-xl border-b border-gray-200/50 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 lg:h-24">
          {/* Logo Section - Left */}
          <button
            onClick={onLogoClick}
            className="flex items-center gap-3 group hover:opacity-90 transition-opacity duration-200"
          >
            <div className="relative">
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#1F3C88] to-[#22D3EE] rounded-2xl blur-md opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>

              {/* Icon container */}
              <div className="relative w-11 h-11 sm:w-12 sm:h-12 bg-gradient-to-br from-[#1F3C88] via-[#7C6CF6] to-[#22D3EE] rounded-2xl flex items-center justify-center shadow-md group-hover:shadow-lg group-hover:scale-105 transition-all duration-300">
                <Lightbulb className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
            </div>

            <div>
              <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-[#1F3C88] via-[#7C6CF6] to-[#22D3EE] bg-clip-text text-transparent">
                IdeaZen
              </h1>
              <p className="hidden sm:block text-xs text-[#64748B] font-medium -mt-0.5">
                AI Project Idea Generator
              </p>
            </div>
          </button>

          {/* Center Navigation - Desktop Only */}
          <div className="hidden lg:flex items-center gap-8">
            <button
              onClick={() => scrollToSection("how-it-works")}
              className="text-sm font-medium text-[#64748B] hover:text-[#1F3C88] transition-colors duration-200"
            >
              How It Works
            </button>
            <button
              onClick={() => scrollToSection("examples")}
              className="text-sm font-medium text-[#64748B] hover:text-[#1F3C88] transition-colors duration-200"
            >
              Examples
            </button>
            <button
              onClick={onMyIdeasClick}
              className={`text-sm font-medium transition-colors duration-200 ${
                currentPage === "my-ideas"
                  ? "text-[#1F3C88]"
                  : "text-[#64748B] hover:text-[#1F3C88]"
              }`}
            >
              My Ideas
            </button>
            <button
              onClick={() => scrollToSection("faq")}
              className="text-sm font-medium text-[#64748B] hover:text-[#1F3C88] transition-colors duration-200"
            >
              FAQ
            </button>
          </div>

          {/* Right Actions - Desktop */}
          <div className="hidden md:flex items-center gap-3">
            {/* Generate Idea Button - Primary CTA */}
            <button
              onClick={onGenerateClick}
              className="group relative px-6 py-3 bg-gradient-to-r from-[#1F3C88] via-[#7C6CF6] to-[#22D3EE] hover:from-[#1A3273] hover:via-[#6B5CE6] hover:to-[#1F9BB3] text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden font-semibold"
            >
              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700"></div>

              <span className="relative z-10 flex items-center gap-2">
                <Sparkles className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                Generate Idea
              </span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() =>
              setIsMobileMenuOpen(!isMobileMenuOpen)
            }
            className="md:hidden p-2.5 text-[#1F3C88] hover:bg-[#F8FAFC] rounded-xl transition-all duration-200 border border-transparent hover:border-gray-200"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden pb-6 px-2 border-t border-gray-100 mt-2 pt-6 animate-slideDown">
            <div className="flex flex-col gap-2">
              {/* How It Works */}
              <button
                onClick={() => scrollToSection("how-it-works")}
                className="w-full text-left px-5 py-4 text-[#64748B] hover:text-[#1F3C88] hover:bg-[#F8FAFC] rounded-xl transition-all duration-200 font-medium text-base"
              >
                How It Works
              </button>

              {/* Examples */}
              <button
                onClick={() => scrollToSection("examples")}
                className="w-full text-left px-5 py-4 text-[#64748B] hover:text-[#1F3C88] hover:bg-[#F8FAFC] rounded-xl transition-all duration-200 font-medium text-base"
              >
                Examples
              </button>

              {/* My Ideas - No icon */}
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onMyIdeasClick?.();
                }}
                className="w-full text-left px-5 py-4 text-[#64748B] hover:text-[#1F3C88] hover:bg-[#F8FAFC] rounded-xl transition-all duration-200 font-medium text-base"
              >
                My Ideas
              </button>

              {/* FAQ */}
              <button
                onClick={() => scrollToSection("faq")}
                className="w-full text-left px-5 py-4 text-[#64748B] hover:text-[#1F3C88] hover:bg-[#F8FAFC] rounded-xl transition-all duration-200 font-medium text-base"
              >
                FAQ
              </button>

              {/* Divider */}
              <div className="h-px bg-gray-200 my-3"></div>

              {/* Generate Idea - Primary CTA */}
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onGenerateClick?.();
                }}
                className="w-full px-5 py-4 bg-gradient-to-r from-[#1F3C88] via-[#7C6CF6] to-[#22D3EE] text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3 font-semibold text-base"
              >
                <Sparkles className="w-5 h-5" />
                Generate New Idea
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Slide down animation */}
      <style>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slideDown {
          animation: slideDown 0.2s ease-out;
        }
      `}</style>
    </nav>
  );
}