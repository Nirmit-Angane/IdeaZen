import { Server, Database, Globe } from 'lucide-react';

export function ServerNodeLoader() {
    return (
        <div className="relative w-64 h-64">
            {/* Central Server */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                <div className="w-16 h-16 bg-white rounded-xl shadow-xl flex items-center justify-center border border-slate-100">
                    <Server className="w-8 h-8 text-primary-blue animate-pulse" />
                </div>
            </div>

            {/* Orbiting Elements */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 animate-float">
                <div className="w-12 h-12 bg-white rounded-lg shadow-lg flex items-center justify-center">
                    <Database className="w-6 h-6 text-accent-purple" />
                </div>
            </div>

            <div className="absolute bottom-0 right-1/4 animate-float" style={{ animationDelay: '1s' }}>
                <div className="w-12 h-12 bg-white rounded-lg shadow-lg flex items-center justify-center">
                    <Globe className="w-6 h-6 text-accent-cyan" />
                </div>
            </div>

            {/* Connecting Lines (Simulated) */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
                <line x1="50%" y1="50%" x2="50%" y2="10%" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" className="text-slate-400" />
                <line x1="50%" y1="50%" x2="75%" y2="90%" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" className="text-slate-400" />
            </svg>
        </div>
    );
}
