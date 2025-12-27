import React, { useState } from 'react';
import { ArrowLeft, Check, ChevronRight } from 'lucide-react';
import { SkillLevel } from '../types';
import { cn } from '../lib/utils';

interface QuestionFlowProps {
    skillLevel: SkillLevel;
    onComplete: (inputs: any) => void;
}

const QUESTIONS = [
    {
        id: 'interests',
        title: 'What interests you the most?',
        subtitle: 'Pick up to 3 topics',
        multi: true,
        options: [
            { id: 'finance', label: 'Finance & Crypto', emoji: '💰' },
            { id: 'productivity', label: 'Productivity', emoji: '⚡' },
            { id: 'health', label: 'Health & Fitness', emoji: '🏃' },
            { id: 'social', label: 'Social Media', emoji: '📱' },
            { id: 'ecommerce', label: 'E-commerce', emoji: '🛍️' },
            { id: 'education', label: 'Education', emoji: '📚' },
            { id: 'gaming', label: 'Gaming', emoji: '🎮' },
            { id: 'ai', label: 'AI & Automation', emoji: '🤖' },
        ]
    },
    {
        id: 'timeCommitment',
        title: 'How much time can you commit?',
        subtitle: 'Be realistic about your schedule',
        multi: false,
        options: [
            { id: 'weekend', label: 'Just a Weekend', emoji: '📅' },
            { id: 'month', label: '1 - 2 weeks', emoji: '🗓️' },
            { id: 'quarter', label: '1 Month+', emoji: '📆' },
        ]
    }
];

export function QuestionFlow({ skillLevel, onComplete }: QuestionFlowProps) {
    const [step, setStep] = useState(0);
    const [answers, setAnswers] = useState<Record<string, any>>({});

    const currentQuestion = QUESTIONS[step];

    const handleOptionToggle = (optionId: string) => {
        const current = answers[currentQuestion.id] || [];

        if (currentQuestion.multi) {
            if (current.includes(optionId)) {
                setAnswers({ ...answers, [currentQuestion.id]: current.filter((id: string) => id !== optionId) });
            } else {
                if (current.length >= 3) return; // Max 3
                setAnswers({ ...answers, [currentQuestion.id]: [...current, optionId] });
            }
        } else {
            setAnswers({ ...answers, [currentQuestion.id]: [optionId] });
        }
    };

    const currentAnswer = answers[currentQuestion.id] || [];
    const canContinue = currentAnswer.length > 0;

    const handleNext = () => {
        if (step < QUESTIONS.length - 1) {
            setStep(step + 1);
        } else {
            onComplete(answers);
        }
    };

    return (
        <div className="max-w-2xl mx-auto py-12 animate-fade-in-up">
            {/* Progress Bar */}
            <div className="mb-8 relative h-2 bg-slate-200 rounded-full overflow-hidden">
                <div
                    className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary-blue to-accent-purple transition-all duration-500 ease-out"
                    style={{ width: `${((step + 1) / QUESTIONS.length) * 100}%` }}
                />
            </div>

            <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8 md:p-12 relative overflow-hidden">
                {/* Decorative background */}
                <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary-blue/5 rounded-full blur-3xl -z-10" />

                {/* Header */}
                <div className="mb-8">
                    <div className="inline-block px-4 py-1.5 rounded-full bg-slate-100 text-slate-600 font-medium text-sm mb-4">
                        Step {step + 1} of {QUESTIONS.length}
                    </div>
                    <h2 className="text-3xl font-bold text-slate-900 mb-2">{currentQuestion.title}</h2>
                    <p className="text-slate-500">{currentQuestion.subtitle}</p>
                </div>

                {/* Options */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                    {currentQuestion.options.map((option) => {
                        const isSelected = currentAnswer.includes(option.id);
                        return (
                            <button
                                key={option.id}
                                onClick={() => handleOptionToggle(option.id)}
                                className={cn(
                                    "flex items-center p-4 rounded-xl border-2 transition-all duration-200 text-left group hover:scale-[1.02]",
                                    isSelected
                                        ? "border-primary-blue bg-blue-50/50"
                                        : "border-slate-100 hover:border-slate-200 bg-white"
                                )}
                            >
                                <span className="text-2xl mr-4 group-hover:scale-110 transition-transform">{option.emoji}</span>
                                <span className={cn("font-medium", isSelected ? "text-primary-blue" : "text-slate-700")}>
                                    {option.label}
                                </span>
                                {isSelected && (
                                    <div className="ml-auto bg-primary-blue text-white rounded-full p-0.5">
                                        <Check className="w-3 h-3" />
                                    </div>
                                )}
                            </button>
                        );
                    })}
                </div>

                {/* Actions */}
                <div className="flex justify-end pt-4 border-t border-slate-100">
                    <button
                        onClick={handleNext}
                        disabled={!canContinue}
                        className={cn(
                            "flex items-center px-8 py-3 rounded-full font-semibold transition-all duration-200",
                            canContinue
                                ? "bg-primary-blue text-white shadow-lg hover:shadow-xl hover:scale-105"
                                : "bg-slate-100 text-slate-400 cursor-not-allowed"
                        )}
                    >
                        Continue
                        <ChevronRight className="ml-2 w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    );
}
