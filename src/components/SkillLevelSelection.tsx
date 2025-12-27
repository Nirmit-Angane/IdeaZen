import React from 'react';
import { Rocket, Code2, Cpu, Check } from 'lucide-react';
import { SkillLevel } from '../types';
import { cn } from '../lib/utils';

interface SkillLevelSelectionProps {
    onSelect: (level: SkillLevel) => void;
}

export function SkillLevelSelection({ onSelect }: SkillLevelSelectionProps) {
    const levels: {
        id: SkillLevel;
        icon: React.ElementType;
        title: string;
        desc: string;
        color: string;
        borderColor: string;
        bgGradient: string;
    }[] = [
            {
                id: 'Beginner',
                icon: Rocket,
                title: 'Beginner',
                desc: 'I know the basics of HTML/CSS/JS but need help structuring a full app.',
                color: 'text-accent-cyan',
                borderColor: 'group-hover:border-accent-cyan',
                bgGradient: 'group-hover:from-accent-cyan/5 group-hover:to-transparent'
            },
            {
                id: 'Intermediate',
                icon: Code2,
                title: 'Intermediate',
                desc: 'I can build apps with React/Node but struggle with complex architecture.',
                color: 'text-primary-blue',
                borderColor: 'group-hover:border-primary-blue',
                bgGradient: 'group-hover:from-primary-blue/5 group-hover:to-transparent'
            },
            {
                id: 'Advanced',
                icon: Cpu,
                title: 'Advanced',
                desc: 'I want to build production-ready SaaS, handle scale, and complex algorithms.',
                color: 'text-accent-purple',
                borderColor: 'group-hover:border-accent-purple',
                bgGradient: 'group-hover:from-accent-purple/5 group-hover:to-transparent'
            }
        ];

    return (
        <div className="flex flex-col items-center justify-center min-h-[70vh] animate-fade-in-up">
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Choose Your Experience Level</h2>
                <p className="text-slate-500 max-w-xl mx-auto">
                    Honest self-assessment ensures we generate a project that challenges you without being overwhelming.
                </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 w-full max-w-5xl">
                {levels.map((level) => (
                    <button
                        key={level.id}
                        onClick={() => onSelect(level.id)}
                        className={cn(
                            "group relative flex flex-col items-start p-8 rounded-2xl bg-white border-2 border-slate-100 text-left transition-all duration-300 hover:-translate-y-2 hover:shadow-xl",
                            level.borderColor
                        )}
                    >
                        <div className={cn("absolute inset-0 rounded-2xl bg-gradient-to-br opacity-0 transition-opacity duration-300", level.bgGradient)} />

                        <div className={cn("p-4 rounded-xl bg-slate-50 mb-6 transition-colors group-hover:bg-white shadow-sm", level.color)}>
                            <level.icon className="w-8 h-8" />
                        </div>

                        <h3 className="text-xl font-bold text-slate-900 mb-2">{level.title}</h3>
                        <p className="text-slate-500 leading-relaxed mb-6">{level.desc}</p>

                        <div className="mt-auto flex items-center text-sm font-semibold text-slate-400 group-hover:text-slate-900 transition-colors">
                            Select Level <Check className="ml-2 w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                        </div>

                        {level.id === 'Beginner' && (
                            <span className="absolute top-4 right-4 bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded-full uppercase tracking-wide">
                                Recommended
                            </span>
                        )}
                    </button>
                ))}
            </div>
        </div>
    );
}
