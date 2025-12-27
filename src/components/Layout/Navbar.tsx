import { Lightbulb, Menu, X, Sparkles } from 'lucide-react';
import { useState } from 'react';

interface NavbarProps {
    onGenerateClick?: () => void; // Mapped from onLogoClick to match App.tsx
}

const NAV_LINKS = [
    { href: '#how-it-works', label: 'How It Works' },
    { href: '#features', label: 'Features' },
    { href: '#examples', label: 'Examples' },
    { href: '#faq', label: 'FAQ' }
];

const AIStatusBadge = ({
    size = 'sm'
}: {
    size?: 'sm' | 'md';
}) => {
    const isSmall = size === 'md';

    return (
        <div className={`flex items-center ${isSmall ? 'justify-center' : ''} gap-2 px-${isSmall ? '4' : '3'} py-${isSmall ? '3' : '1.5'} bg-gradient-to-r from-[#EAFBF1] to-[#DCFCE7] border border-[#86EFAC] rounded-${isSmall ? 'xl' : 'full'} ${isSmall ? 'mt-2' : 'shadow-sm'}`}>
            <div className="relative">
                <div className="w-2 h-2 bg-[#22C55E] rounded-full animate-pulse"></div>
                <div className="absolute inset-0 w-2 h-2 bg-[#22C55E] rounded-full animate-ping"></div>
            </div>
            <span className={`text-${isSmall ? 'sm' : 'xs'} text-[#16A34A] font-semibold`}>AI Ready</span>
        </div>
    );
};

export function Navbar({ onGenerateClick: onLogoClick }: NavbarProps) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-2xl border-b border-[#E2E8F0]/50 shadow-lg">
            <div className="container mx-auto px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">

                    {/* Logo */}
                    <button
                        onClick={onLogoClick}
                        className="flex items-center gap-3 group cursor-pointer"
                    >
                        <div className="relative">
                            <div className="w-12 h-12 bg-gradient-to-br from-[#1F3C88] via-[#2d5ac9] to-[#22D3EE] rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:scale-105 transition-all duration-300">
                                <Lightbulb className="w-6 h-6 text-white" />
                                <div className="absolute inset-0 bg-gradient-to-br from-[#1F3C88] to-[#22D3EE] rounded-2xl blur-lg opacity-0 group-hover:opacity-40 transition-opacity duration-300"></div>
                            </div>
                        </div>
                        <div>
                            <div className="leading-tight mb-0.5">
                                <span className="text-xl bg-gradient-to-r from-[#1F3C88] to-[#22D3EE] bg-clip-text text-transparent font-semibold">
                                    IdeaZen
                                </span>
                            </div>
                            <div className="text-[10px] text-[#7C6CF6] flex items-center gap-1 font-medium">
                                <Sparkles className="w-3 h-3" />
                                <span>AI-Powered</span>
                            </div>
                        </div>
                    </button>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-1 bg-[#F8FAFC] rounded-full p-1.5 border border-[#E2E8F0]">
                        {NAV_LINKS.map(link => (
                            <a
                                key={link.href}
                                href={link.href}
                                className="px-5 py-2 text-sm text-[#64748B] hover:text-[#1F3C88] hover:bg-white rounded-full transition-all duration-200 font-medium"
                            >
                                {link.label}
                            </a>
                        ))}
                    </div>

                    {/* Desktop Actions */}
                    <div className="hidden md:flex items-center gap-4">
                        <button
                            onClick={onLogoClick}
                            className="group relative px-6 py-2.5 bg-gradient-to-r from-[#1F3C88] to-[#22D3EE] hover:from-[#1A3273] hover:to-[#1F9BB3] text-white text-sm font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
                        >
                            <span className="relative z-10 flex items-center gap-2 text-white">
                                <Sparkles className="w-4 h-4" />
                                Generate Idea
                            </span>
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700"></div>
                        </button>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="md:hidden p-2.5 text-[#1F3C88] hover:bg-[#F8FAFC] rounded-xl transition-colors border border-transparent hover:border-[#E2E8F0]"
                    >
                        {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <div className="md:hidden py-6 border-t border-[#E2E8F0] animate-fadeIn">
                        <div className="flex flex-col gap-3">
                            {NAV_LINKS.map(link => (
                                <a
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="text-[#64748B] hover:text-[#1F3C88] transition-colors duration-200 py-3 px-4 hover:bg-[#F8FAFC] rounded-xl font-medium"
                                >
                                    {link.label}
                                </a>
                            ))}

                            <AIStatusBadge size="md" />

                            <button
                                onClick={() => {
                                    setIsMobileMenuOpen(false);
                                    onLogoClick?.();
                                }}
                                className="w-full mt-2 px-6 py-4 bg-gradient-to-r from-[#1F3C88] to-[#22D3EE] text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 font-medium"
                            >
                                <Sparkles className="w-5 h-5" />
                                Generate Project Idea
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}
