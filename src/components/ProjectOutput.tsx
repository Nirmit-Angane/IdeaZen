import { useState } from 'react';
import {
    RefreshCw, CheckCircle, AlertTriangle, Layers, Database,
    ExternalLink, Clock, Gauge, Target, Sparkles
} from 'lucide-react';
import { ProjectIdea } from '../types';
import { cn } from '../lib/utils';

interface ProjectOutputProps {
    project: ProjectIdea;
    onReset: () => void;
}

export function ProjectOutput({ project, onReset }: ProjectOutputProps) {
    const [activeTab, setActiveTab] = useState<'features' | 'tech' | 'roadmap'>('features');

    return (
        <div className="max-w-7xl mx-auto pb-12 animate-fade-in-up">
            {/* Hero Header */}
            <div className="relative rounded-3xl bg-slate-900 text-white p-8 md:p-12 overflow-hidden mb-8 shadow-2xl">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-primary-blue/30 to-accent-purple/30 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/4 pointer-events-none" />

                <div className="relative z-10">
                    <div className="flex flex-wrap gap-3 mb-6">
                        <Badge icon={Gauge} label={project.quickStats.difficulty} color="bg-blue-500/20 text-blue-200" />
                        <Badge icon={Clock} label={project.quickStats.timeline} color="bg-purple-500/20 text-purple-200" />
                        <Badge icon={Target} label={`Feasibility: ${project.quickStats.feasibility}`} color="bg-green-500/20 text-green-200" />
                    </div>

                    <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-blue-200">
                        {project.title}
                    </h1>
                    <p className="text-lg text-slate-300 max-w-3xl leading-relaxed">
                        {project.description}
                    </p>
                </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Left Column - Main Content */}
                <div className="lg:col-span-2 space-y-8">

                    {/* Match Scores */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <ScoreCard title="AI Confidence" value={project.scores.aiConfidence} color="text-green-600" />
                        <ScoreCard title="Match Score" value={project.scores.matchScore} color="text-primary-blue" />
                        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                            <div className="text-sm font-medium text-slate-500 mb-2">Est. Effort</div>
                            <div className="text-2xl font-bold text-slate-900">{project.scores.effort}</div>
                            <div className="w-full h-2 bg-slate-100 rounded-full mt-3 overflow-hidden">
                                <div
                                    className={cn("h-full rounded-full bg-gradient-to-r from-orange-400 to-red-500")}
                                    style={{ width: project.scores.effort === 'High' ? '75%' : project.scores.effort === 'Medium' ? '50%' : '25%' }}
                                />
                            </div>
                        </div>
                    </div>

                    {/* AI Reasoning */}
                    <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm">
                        <h3 className="flex items-center text-lg font-bold text-slate-900 mb-4">
                            <Sparkles className="w-5 h-5 text-accent-purple mr-2" />
                            Why this project?
                        </h3>
                        <ul className="space-y-3">
                            {project.reasoning.map((reason, idx) => (
                                <li key={idx} className="flex items-start text-slate-600">
                                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 shrink-0 mt-0.5" />
                                    {reason}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Tabbed Content */}
                    <div className="bg-white rounded-2xl border border-slate-100 shadow-lg overflow-hidden min-h-[400px]">
                        <div className="flex border-b border-slate-100">
                            <TabButton active={activeTab === 'features'} onClick={() => setActiveTab('features')} label="Key Features" icon={Layers} />
                            <TabButton active={activeTab === 'tech'} onClick={() => setActiveTab('tech')} label="Tech Stack" icon={Database} />
                            <TabButton active={activeTab === 'roadmap'} onClick={() => setActiveTab('roadmap')} label="Roadmap" icon={Clock} />
                        </div>

                        <div className="p-8">
                            {activeTab === 'features' && (
                                <div className="space-y-6 animate-fade-in-up">
                                    <h4 className="font-semibold text-slate-900">Core Implementation Steps</h4>
                                    <div className="grid gap-4">
                                        {project.coreFeatures.map((feature, idx) => (
                                            <div key={idx} className="flex items-center p-4 rounded-xl bg-slate-50 border border-slate-100">
                                                <div className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center text-sm font-bold text-slate-500 mr-4 shadow-sm">
                                                    {idx + 1}
                                                </div>
                                                <span className="font-medium text-slate-700">{feature}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {activeTab === 'tech' && (
                                <div className="animate-fade-in-up space-y-8">
                                    <div>
                                        <h4 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4">Primary Stack</h4>
                                        <div className="flex flex-wrap gap-3">
                                            {project.techStack.primary.map((tech) => (
                                                <span key={tech} className="px-4 py-2 rounded-lg bg-blue-50 text-blue-700 font-semibold border border-blue-100">
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4">Alternatives</h4>
                                        <div className="flex flex-wrap gap-3">
                                            {project.techStack.alternatives.map((tech) => (
                                                <span key={tech} className="px-4 py-2 rounded-lg bg-slate-50 text-slate-600 border border-slate-200">
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'roadmap' && (
                                <div className="space-y-6 animate-fade-in-up">
                                    {project.roadmap.map((phase, idx) => (
                                        <div key={idx} className="group flex items-start relative pl-8 pb-8 last:pb-0 border-l-2 border-slate-100 last:border-transparent">
                                            <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full border-2 border-white bg-primary-blue shadow-sm group-hover:scale-125 transition-transform" />
                                            <div>
                                                <div className="flex items-center mb-1">
                                                    <span className="text-sm font-bold text-primary-blue mr-3">{phase.phase}</span>
                                                    <span className="text-xs font-semibold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">{phase.duration}</span>
                                                </div>
                                                <h5 className="text-lg font-bold text-slate-900 mb-1">{phase.title}</h5>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Right Column - Sticky Actions */}
                <div className="space-y-6">
                    {/* What NOT to build */}
                    <div className="bg-amber-50 rounded-2xl p-6 border border-amber-100">
                        <h3 className="flex items-center text-lg font-bold text-amber-900 mb-4">
                            <AlertTriangle className="w-5 h-5 text-amber-600 mr-2" />
                            Avoid These Traps
                        </h3>
                        <ul className="space-y-3">
                            {project.whatNotToBuild.map((item, idx) => (
                                <li key={idx} className="text-amber-800 text-sm leading-relaxed list-disc list-inside">
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-lg sticky top-24">
                        <h3 className="font-bold text-slate-900 mb-4">Actions</h3>
                        <div className="space-y-3">
                            <button
                                onClick={onReset}
                                className="w-full flex items-center justify-center px-4 py-3 bg-slate-900 text-white rounded-xl font-medium hover:bg-slate-800 transition-colors shadow-lg hover:shadow-xl"
                            >
                                <RefreshCw className="w-4 h-4 mr-2" />
                                Generate New Idea
                            </button>
                            <button className="w-full flex items-center justify-center px-4 py-3 bg-white text-slate-700 border border-slate-200 rounded-xl font-medium hover:bg-slate-50 transition-colors">
                                <ExternalLink className="w-4 h-4 mr-2" />
                                Export to PDF
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function Badge({ icon: Icon, label, color }: { icon: any, label: string, color: string }) {
    return (
        <div className={cn("inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide", color)}>
            <Icon className="w-3 h-3 mr-1.5" />
            {label}
        </div>
    );
}

function ScoreCard({ title, value, color }: { title: string, value: number, color: string }) {
    return (
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
            <div className="text-sm font-medium text-slate-500 mb-2">{title}</div>
            <div className={cn("text-4xl font-bold", color)}>{value}%</div>
            <div className="w-full h-2 bg-slate-100 rounded-full mt-3 overflow-hidden">
                <div
                    className={cn("h-full rounded-full transition-all duration-1000 ease-out", color.replace('text-', 'bg-'))}
                    style={{ width: `${value}%` }}
                />
            </div>
        </div>
    );
}

function TabButton({ active, onClick, label, icon: Icon }: { active: boolean, onClick: () => void, label: string, icon: any }) {
    return (
        <button
            onClick={onClick}
            className={cn(
                "flex-1 flex items-center justify-center py-4 text-sm font-semibold transition-colors relative",
                active ? "text-primary-blue bg-blue-50/30" : "text-slate-500 hover:text-slate-700 hover:bg-slate-50"
            )}
        >
            <Icon className={cn("w-4 h-4 mr-2", active ? "text-primary-blue" : "text-slate-400")} />
            {label}
            {active && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-blue" />
            )}
        </button>
    );
}
