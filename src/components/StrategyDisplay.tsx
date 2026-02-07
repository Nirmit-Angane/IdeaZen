import { useState } from 'react';
import { ChevronDown, ChevronUp, Target, Zap, AlertTriangle, CheckCircle2, Clock, Users, Play } from 'lucide-react';
import type { HackathonStrategy } from '../types';

interface StrategyDisplayProps {
  strategy: HackathonStrategy;
  onStartTracking: () => void;
}

export function StrategyDisplay({ strategy, onStartTracking }: StrategyDisplayProps) {
  const [expandedRiskSection, setExpandedRiskSection] = useState<string | null>(null);

  const toggleRiskSection = (section: string) => {
    setExpandedRiskSection(expandedRiskSection === section ? null : section);
  };

  const getRiskColor = (probability: string, impact: string) => {
    if (probability === 'high' || impact === 'high') return 'text-red-600 bg-red-50';
    if (probability === 'medium' || impact === 'medium') return 'text-orange-600 bg-orange-50';
    return 'text-yellow-600 bg-yellow-50';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section with Winning Angle */}
        <div className="bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl p-8 md:p-12 text-white mb-8 shadow-2xl">
          <div className="flex items-start gap-4 mb-6">
            <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm">
              <Target className="w-8 h-8" />
            </div>
            <div className="flex-1">
              <h1 className="text-3xl md:text-4xl font-bold mb-2">Your Winning Strategy</h1>
              <p className="text-orange-100 text-lg">Hackathon Battle Plan</p>
            </div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
            <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
              <Zap className="w-6 h-6" />
              Winning Angle
            </h2>
            <p className="text-xl md:text-2xl font-medium leading-relaxed">
              {strategy.winningAngle}
            </p>
          </div>
        </div>

        {/* Why This Wins Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <div className="bg-orange-100 p-2 rounded-lg">
              <CheckCircle2 className="w-6 h-6 text-orange-600" />

            </div>
            Why This Wins
          </h2>
          <div className="space-y-4">
            {strategy.whyThisWins.map((reason, index) => (
              <div key={index} className="flex items-start gap-3 p-4 bg-green-50 rounded-lg border border-green-200">
                <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <p className="text-gray-700">{reason}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Critical Success Factors */}
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <div className="bg-purple-100 p-2 rounded-lg">
              <Target className="w-6 h-6 text-purple-600" />
            </div>
            Critical Success Factors
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {strategy.criticalSuccessFactors.map((factor, index) => (
              <div key={index} className="flex items-start gap-3 p-4 bg-purple-50 rounded-lg border border-purple-200">
                <div className="bg-purple-600 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 text-sm font-bold">
                  {index + 1}
                </div>
                <p className="text-gray-700">{factor}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Smart Scope Recommendations */}
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Smart Scope Recommendations</h2>
          
          {/* Visual Percentage Overview */}
          <div className="mb-8">
            <div className="flex items-center gap-2 h-8 rounded-lg overflow-hidden">
              <div className="bg-green-600 h-full flex items-center justify-center text-white text-sm font-semibold px-3" style={{ width: '60%' }}>
                MUST 60%
              </div>
              <div className="bg-blue-600 h-full flex items-center justify-center text-white text-sm font-semibold px-3" style={{ width: '25%' }}>
                SHOULD 25%
              </div>
              <div className="bg-yellow-600 h-full flex items-center justify-center text-white text-sm font-semibold px-3" style={{ width: '15%' }}>
                NICE 15%
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-2 text-center">
              Time allocation across feature priorities
            </p>
          </div>
          
          {/* MUST BUILD - 60% */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold text-green-700 flex items-center gap-2">
                <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                MUST BUILD
              </h3>
              <div className="flex items-center gap-3">
                <span className="text-sm font-semibold text-green-700 bg-green-100 px-3 py-1 rounded-full">60%</span>
                <span className="text-sm text-gray-500">{strategy.scope.mustBuild.length} features</span>
              </div>
            </div>
            <div className="space-y-3">
              {strategy.scope.mustBuild.map((item, index) => (
                <div key={index} className="p-4 bg-green-50 rounded-lg border-l-4 border-green-600">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 mb-1">{item.feature}</h4>
                      <p className="text-sm text-gray-600 mb-2">{item.reason}</p>
                      {item.dependencies.length > 0 && (
                        <p className="text-xs text-gray-500">
                          Dependencies: {item.dependencies.join(', ')}
                        </p>
                      )}
                    </div>
                    <div className="flex items-center gap-1 text-sm text-gray-600 flex-shrink-0">
                      <Clock className="w-4 h-4" />
                      {item.estimatedHours}h
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* SHOULD BUILD - 25% */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold text-blue-700 flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                SHOULD BUILD
              </h3>
              <div className="flex items-center gap-3">
                <span className="text-sm font-semibold text-blue-700 bg-blue-100 px-3 py-1 rounded-full">25%</span>
                <span className="text-sm text-gray-500">{strategy.scope.shouldBuild.length} features</span>
              </div>
            </div>
            <div className="space-y-3">
              {strategy.scope.shouldBuild.map((item, index) => (
                <div key={index} className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-600">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 mb-1">{item.feature}</h4>
                      <p className="text-sm text-gray-600 mb-2">{item.reason}</p>
                      {item.dependencies.length > 0 && (
                        <p className="text-xs text-gray-500">
                          Dependencies: {item.dependencies.join(', ')}
                        </p>
                      )}
                    </div>
                    <div className="flex items-center gap-1 text-sm text-gray-600 flex-shrink-0">
                      <Clock className="w-4 h-4" />
                      {item.estimatedHours}h
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* NICE TO HAVE - 15% */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold text-yellow-700 flex items-center gap-2">
                <div className="w-3 h-3 bg-yellow-600 rounded-full"></div>
                NICE TO HAVE
              </h3>
              <div className="flex items-center gap-3">
                <span className="text-sm font-semibold text-yellow-700 bg-yellow-100 px-3 py-1 rounded-full">15%</span>
                <span className="text-sm text-gray-500">{strategy.scope.niceToHave.length} features</span>
              </div>
            </div>
            <div className="space-y-3">
              {strategy.scope.niceToHave.map((item, index) => (
                <div key={index} className="p-4 bg-yellow-50 rounded-lg border-l-4 border-yellow-600">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 mb-1">{item.feature}</h4>
                      <p className="text-sm text-gray-600 mb-2">{item.reason}</p>
                      {item.dependencies.length > 0 && (
                        <p className="text-xs text-gray-500">
                          Dependencies: {item.dependencies.join(', ')}
                        </p>
                      )}
                    </div>
                    <div className="flex items-center gap-1 text-sm text-gray-600 flex-shrink-0">
                      <Clock className="w-4 h-4" />
                      {item.estimatedHours}h
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* DON'T BUILD */}
          {strategy.scope.dontBuild.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold text-red-700 flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-600 rounded-full"></div>
                  DON'T BUILD
                </h3>
                <span className="text-sm text-gray-500">{strategy.scope.dontBuild.length} items</span>
              </div>
              <div className="space-y-2">
                {strategy.scope.dontBuild.map((item, index) => (
                  <div key={index} className="p-3 bg-red-50 rounded-lg border-l-4 border-red-600">
                    <p className="text-gray-700 line-through">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Risk Assessment Accordion */}
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <div className="bg-red-100 p-2 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
            Risk Assessment
          </h2>

          {/* Technical Risks */}
          <div className="mb-4">
            <button
              onClick={() => toggleRiskSection('technical')}
              className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <div className="flex items-center gap-3">
                <AlertTriangle className="w-5 h-5 text-orange-600" />
                <span className="font-semibold text-gray-900">Technical Risks</span>
                <span className="text-sm text-gray-500">({strategy.risks.technical.length})</span>
              </div>
              {expandedRiskSection === 'technical' ? (
                <ChevronUp className="w-5 h-5 text-gray-600" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-600" />
              )}
            </button>
            {expandedRiskSection === 'technical' && (
              <div className="mt-3 space-y-3 pl-4">
                {strategy.risks.technical.map((risk, index) => (
                  <div key={index} className={`p-4 rounded-lg ${getRiskColor(risk.probability, risk.impact)}`}>
                    <div className="flex items-start justify-between mb-2">
                      <p className="font-medium">{risk.description}</p>
                      <div className="flex gap-2 text-xs flex-shrink-0 ml-4">
                        <span className="px-2 py-1 bg-white rounded">P: {risk.probability}</span>
                        <span className="px-2 py-1 bg-white rounded">I: {risk.impact}</span>
                      </div>
                    </div>
                    <p className="text-sm mt-2">
                      <span className="font-semibold">Mitigation:</span> {risk.mitigation}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Time Risks */}
          <div className="mb-4">
            <button
              onClick={() => toggleRiskSection('time')}
              className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-orange-600" />
                <span className="font-semibold text-gray-900">Time Risks</span>
                <span className="text-sm text-gray-500">({strategy.risks.time.length})</span>
              </div>
              {expandedRiskSection === 'time' ? (
                <ChevronUp className="w-5 h-5 text-gray-600" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-600" />
              )}
            </button>
            {expandedRiskSection === 'time' && (
              <div className="mt-3 space-y-3 pl-4">
                {strategy.risks.time.map((risk, index) => (
                  <div key={index} className={`p-4 rounded-lg ${getRiskColor(risk.probability, risk.impact)}`}>
                    <div className="flex items-start justify-between mb-2">
                      <p className="font-medium">{risk.description}</p>
                      <div className="flex gap-2 text-xs flex-shrink-0 ml-4">
                        <span className="px-2 py-1 bg-white rounded">P: {risk.probability}</span>
                        <span className="px-2 py-1 bg-white rounded">I: {risk.impact}</span>
                      </div>
                    </div>
                    <p className="text-sm mt-2">
                      <span className="font-semibold">Mitigation:</span> {risk.mitigation}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Team Risks */}
          <div>
            <button
              onClick={() => toggleRiskSection('team')}
              className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <div className="flex items-center gap-3">
                <Users className="w-5 h-5 text-orange-600" />
                <span className="font-semibold text-gray-900">Team Risks</span>
                <span className="text-sm text-gray-500">({strategy.risks.team.length})</span>
              </div>
              {expandedRiskSection === 'team' ? (
                <ChevronUp className="w-5 h-5 text-gray-600" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-600" />
              )}
            </button>
            {expandedRiskSection === 'team' && (
              <div className="mt-3 space-y-3 pl-4">
                {strategy.risks.team.map((risk, index) => (
                  <div key={index} className={`p-4 rounded-lg ${getRiskColor(risk.probability, risk.impact)}`}>
                    <div className="flex items-start justify-between mb-2">
                      <p className="font-medium">{risk.description}</p>
                      <div className="flex gap-2 text-xs flex-shrink-0 ml-4">
                        <span className="px-2 py-1 bg-white rounded">P: {risk.probability}</span>
                        <span className="px-2 py-1 bg-white rounded">I: {risk.impact}</span>
                      </div>
                    </div>
                    <p className="text-sm mt-2">
                      <span className="font-semibold">Mitigation:</span> {risk.mitigation}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Hour-by-Hour Roadmap Visualization */}
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <div className="bg-orange-100 p-2 rounded-lg">
              <Clock className="w-6 h-6 text-orange-600" />
            </div>
            Hour-by-Hour Execution Roadmap
          </h2>
          
          <div className="space-y-6">
            {strategy.roadmap.map((phase, index) => {
              const isCheckpoint = phase.phaseNumber % 6 === 0 || phase.phaseNumber === strategy.roadmap.length;
              
              return (
                <div key={phase.phaseNumber} className="relative">
                  {/* Phase Card */}
                  <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-6 border-2 border-orange-200">
                    {/* Phase Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="bg-orange-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg">
                            {phase.phaseNumber}
                          </div>
                          <div>
                            <h3 className="text-xl font-bold text-gray-900">{phase.title}</h3>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <Clock className="w-4 h-4" />
                              <span className="font-semibold">Hours {phase.hourRange}</span>
                              {phase.bufferHours > 0 && (
                                <span className="ml-2 px-2 py-0.5 bg-yellow-100 text-yellow-700 rounded-full text-xs font-semibold">
                                  +{phase.bufferHours}h buffer
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                        <p className="text-gray-700 ml-13">{phase.description}</p>
                      </div>
                    </div>

                    {/* Work Streams - Parallel Tasks by Team Member */}
                    <div className="mt-4 space-y-3">
                      <h4 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        Parallel Work Streams
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                        {phase.workStreams.map((stream, streamIndex) => (
                          <div
                            key={streamIndex}
                            className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm"
                          >
                            <div className="flex items-center justify-between mb-3">
                              <div className="flex items-center gap-2">
                                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                                  {stream.teamMember.charAt(0).toUpperCase()}
                                </div>
                                <span className="font-semibold text-gray-900 capitalize">
                                  {stream.teamMember}
                                </span>
                              </div>
                              <span className="text-xs text-gray-500 flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {stream.estimatedHours}h
                              </span>
                            </div>
                            <ul className="space-y-1.5">
                              {stream.tasks.map((task, taskIndex) => (
                                <li key={taskIndex} className="text-sm text-gray-700 flex items-start gap-2">
                                  <span className="text-orange-500 mt-1">•</span>
                                  <span className="flex-1">{task}</span>
                                </li>
                              ))}
                            </ul>
                            {stream.dependencies.length > 0 && (
                              <div className="mt-3 pt-3 border-t border-gray-100">
                                <p className="text-xs text-gray-500">
                                  <span className="font-semibold">Depends on:</span> {stream.dependencies.join(', ')}
                                </p>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Checkpoint Marker */}
                    {isCheckpoint && (
                      <div className="mt-4 p-3 bg-green-50 border-l-4 border-green-500 rounded">
                        <div className="flex items-start gap-2">
                          <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="font-semibold text-green-900 text-sm">Checkpoint Validation</p>
                            <p className="text-sm text-green-700 mt-1">{phase.checkpoint}</p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Break Reminders */}
                    {phase.breaks.length > 0 && (
                      <div className="mt-4 space-y-2">
                        {phase.breaks.map((breakItem, breakIndex) => (
                          <div
                            key={breakIndex}
                            className={`p-3 rounded-lg border-l-4 ${
                              breakItem.mandatory
                                ? 'bg-red-50 border-red-500'
                                : 'bg-blue-50 border-blue-500'
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              <Clock className={`w-4 h-4 ${breakItem.mandatory ? 'text-red-600' : 'text-blue-600'}`} />
                              <span className={`text-sm font-semibold ${
                                breakItem.mandatory ? 'text-red-900' : 'text-blue-900'
                              }`}>
                                {breakItem.mandatory ? '⚠️ Mandatory Break' : 'Recommended Break'}
                              </span>
                              <span className={`text-xs ${
                                breakItem.mandatory ? 'text-red-700' : 'text-blue-700'
                              }`}>
                                After hour {breakItem.afterHour} • {breakItem.duration} min • {breakItem.type}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Connector Line to Next Phase */}
                  {index < strategy.roadmap.length - 1 && (
                    <div className="flex justify-center py-2">
                      <div className="w-0.5 h-6 bg-gradient-to-b from-orange-300 to-orange-400"></div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Roadmap Summary */}
          <div className="mt-8 p-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-200">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Roadmap Summary</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600">
                  {strategy.roadmap.length}
                </div>
                <div className="text-sm text-gray-600 mt-1">Total Phases</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600">
                  {strategy.roadmap.reduce((sum, phase) => {
                    const [start, end] = phase.hourRange.split('-').map(h => parseInt(h));
                    return sum + (end - start);
                  }, 0)}h
                </div>
                <div className="text-sm text-gray-600 mt-1">Work Hours</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-600">
                  {strategy.roadmap.reduce((sum, phase) => sum + phase.bufferHours, 0)}h
                </div>
                <div className="text-sm text-gray-600 mt-1">Buffer Time</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">
                  {strategy.roadmap.filter((phase, index) => 
                    phase.phaseNumber % 6 === 0 || index === strategy.roadmap.length - 1
                  ).length}
                </div>
                <div className="text-sm text-gray-600 mt-1">Checkpoints</div>
              </div>
            </div>
          </div>
        </div>

        {/* Start Tracking CTA */}
        <div className="bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl p-8 text-center shadow-2xl">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Ready to Execute Your Winning Strategy?
          </h2>
          <p className="text-orange-100 mb-6 max-w-2xl mx-auto">
            Start tracking your progress with our live dashboard. Monitor your team, track milestones, and get AI-powered alerts to stay on schedule.
          </p>
          <button
            onClick={onStartTracking}
            className="bg-white text-orange-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-orange-50 transition-colors shadow-lg flex items-center gap-3 mx-auto"
          >
            <Play className="w-6 h-6" />
            Start Tracking Progress
          </button>
        </div>
      </div>
    </div>
  );
}
