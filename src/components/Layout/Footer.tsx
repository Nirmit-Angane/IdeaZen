import { Github, Twitter } from 'lucide-react';

export function Footer() {
    return (
        <footer className="border-t border-slate-200 bg-white/50 backdrop-blur-sm mt-auto">
            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                    <div className="text-sm text-slate-500">
                        © {new Date().getFullYear()} IdeaZen. All rights reserved.
                    </div>

                    <div className="flex space-x-6">
                        <a href="#" className="text-slate-400 hover:text-primary-blue transition-colors">
                            <Github className="h-5 w-5" />
                        </a>
                        <a href="#" className="text-slate-400 hover:text-accent-cyan transition-colors">
                            <Twitter className="h-5 w-5" />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
