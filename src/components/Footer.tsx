import { Lightbulb, CheckCircle } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="container mx-auto px-4 py-12">
        {/* Main Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-[#1F3C88] to-[#3EC1D3] rounded-xl flex items-center justify-center">
              <Lightbulb className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-[#1F3C88]">IdeaZen</div>
              <div className="text-xs text-[#999]">
                AI Project Idea Generator
              </div>
            </div>
          </div>

          {/* Links */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
            <a
              href="#how-it-works"
              className="text-[#666] hover:text-[#3EC1D3] transition-colors"
            >
              How It Works
            </a>
            <a
              href="#"
              className="text-[#666] hover:text-[#3EC1D3] transition-colors"
            >
              About
            </a>
            <a
              href="#"
              className="text-[#666] hover:text-[#3EC1D3] transition-colors"
            >
              Privacy
            </a>
            <a
              href="#"
              className="text-[#666] hover:text-[#3EC1D3] transition-colors"
            >
              Terms
            </a>
          </div>
        </div>

        {/* Bottom */}
        <div className="text-center text-sm text-[#999]">
          <p>
            © {currentYear} AI Project Idea Generator. Designed
            for students & developers worldwide.
          </p>
        </div>
      </div>
    </footer>
  );
}