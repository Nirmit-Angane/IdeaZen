// Model output is untrusted: coerce it into the shapes the UI renders so a missing or
// differently-typed field never crashes a page.
import type { GeneratedProject, IdeaCard, TechStackItem, AltTechStackItem } from './types';
import type { HackathonRoadmap } from './hackathon-types';

// Every string is capped so a hijacked or runaway model response cannot smuggle long free-form text to the user.
const str = (v: unknown, d = ''): string => (typeof v === 'string' ? v : v == null ? d : String(v)).slice(0, 1200);
const arr = <T = any>(v: unknown): T[] => (Array.isArray(v) ? (v as T[]) : []);
const strs = (v: unknown): string[] => arr(v).map((x) => str(typeof x === 'object' && x ? (x as any).name ?? (x as any).task ?? JSON.stringify(x) : x)).filter(Boolean);
const num = (v: unknown, d = 0) => (typeof v === 'number' && isFinite(v) ? v : Number(v) || d);
const tier = (v: unknown) => (['Core', 'Enhanced', 'Stretch'].includes(str(v)) ? (str(v) as 'Core' | 'Enhanced' | 'Stretch') : 'Core');
const level3 = (v: unknown): 'High' | 'Medium' | 'Low' => (['High', 'Medium', 'Low'].includes(str(v)) ? (str(v) as any) : 'Medium');

function tech(v: unknown): TechStackItem[] {
  return arr(v).map((x: any) =>
    typeof x === 'string' ? { name: x, role: '', reason: '' } : { name: str(x?.name), role: str(x?.role), reason: str(x?.reason) },
  ).filter((x) => x.name);
}
function altTech(v: unknown): AltTechStackItem[] {
  return arr(v).map((x: any) =>
    typeof x === 'string' ? { name: x, role: '', whenToUse: '' } : { name: str(x?.name), role: str(x?.role), whenToUse: str(x?.whenToUse) },
  ).filter((x) => x.name);
}

export function normalizeProject(raw: any): GeneratedProject {
  const p = raw ?? {};
  return {
    title: str(p.title, 'Untitled project'),
    difficulty: str(p.difficulty, 'Intermediate'),
    difficultyScore: num(p.difficultyScore, 5),
    difficultyBreakdown: p.difficultyBreakdown,
    description: str(p.description),
    tagline: p.tagline ? str(p.tagline) : undefined,
    realWorldComparison: p.realWorldComparison ? str(p.realWorldComparison) : undefined,
    matchBreakdown: p.matchBreakdown
      ? { skillMatch: num(p.matchBreakdown.skillMatch), stackMatch: num(p.matchBreakdown.stackMatch), timeFit: num(p.matchBreakdown.timeFit), overall: num(p.matchBreakdown.overall), explanation: p.matchBreakdown.explanation }
      : undefined,
    reasoning: { skillFit: str(p.reasoning?.skillFit), stackFit: str(p.reasoning?.stackFit), growthOpportunity: str(p.reasoning?.growthOpportunity) },
    targetUser: p.targetUser ? str(p.targetUser) : undefined,
    features: arr(p.features).map((f: any) => (typeof f === 'string'
      ? { name: f, tier: 'Core' as const, description: '' }
      : { name: str(f?.name), tier: tier(f?.tier), description: str(f?.description), technicalNote: f?.technicalNote ? str(f.technicalNote) : undefined })).filter((f) => f.name),
    mvp: p.mvp ? { description: str(p.mvp.description), conditions: strs(p.mvp.conditions), demoScript: str(p.mvp.demoScript) } : undefined,
    techStack: { primary: tech(p.techStack?.primary), alternative: altTech(p.techStack?.alternative) },
    firstCommitGuide: p.firstCommitGuide
      ? {
          intro: str(p.firstCommitGuide.intro),
          steps: arr(p.firstCommitGuide.steps).map((s: any, i: number) => ({ step: i + 1, action: str(s?.action ?? s), note: s?.note ? str(s.note) : undefined })),
          firstGoal: str(p.firstCommitGuide.firstGoal),
        }
      : undefined,
    roadmap: arr(p.roadmap).map((r: any, i: number) => ({
      phase: str(r?.phase, String(i + 1)),
      title: str(r?.title, `Phase ${i + 1}`),
      weekRange: str(r?.weekRange),
      description: str(r?.description),
      duration: str(r?.duration),
      deliverable: str(r?.deliverable),
      tasks: strs(r?.tasks),
    })),
    skillOutcomes: { solidify: strs(p.skillOutcomes?.solidify), gainNew: strs(p.skillOutcomes?.gainNew) },
    pitfalls: arr(p.pitfalls).map((x: any) => ({ pitfall: str(x?.pitfall), why: str(x?.why), mitigation: str(x?.mitigation) })).filter((x) => x.pitfall),
    portfolioBlurb: p.portfolioBlurb ? str(p.portfolioBlurb) : undefined,
    resources: arr(p.resources)
      .map((x: any) => ({ title: str(x?.title), source: str(x?.source), url: str(x?.url), format: str(x?.format), timeEstimate: str(x?.timeEstimate), why: str(x?.why) }))
      .filter((x) => x.title),
    feasibility: level3(p.feasibility),
    timeFit: ['Comfortable', 'Tight', 'Challenging'].includes(str(p.timeFit)) ? p.timeFit : undefined,
    confidence: str(p.confidence),
  };
}

export function normalizeIdeas(raw: any): IdeaCard[] {
  return arr(raw).map((r) => {
    const p = normalizeProject(r);
    return {
      title: p.title, difficulty: p.difficulty, difficultyScore: p.difficultyScore, description: p.description,
      matchBreakdown: p.matchBreakdown, realWorldComparison: p.realWorldComparison, reasoning: p.reasoning,
      targetUser: p.targetUser, features: p.features, techStack: p.techStack, roadmap: p.roadmap,
      feasibility: p.feasibility, buildComplexity: level3(r?.buildComplexity),
      timeFit: (['Comfortable', 'Tight', 'Challenging'].includes(str(r?.timeFit)) ? r.timeFit : 'Tight') as IdeaCard['timeFit'],
    };
  }).filter((i) => i.title !== 'Untitled project');
}

export function normalizeHackathon(raw: any, title: string, timeline: string): HackathonRoadmap {
  const h = raw ?? {};
  return {
    title: str(h.title, title),
    timeline,
    feasibility: level3(h.feasibility),
    strategicAnalysis: {
      achievability: str(h.strategicAnalysis?.achievability),
      biggestRisk: h.strategicAnalysis?.biggestRisk ? str(h.strategicAnalysis.biggestRisk) : undefined,
      winningAngle: h.strategicAnalysis?.winningAngle ? str(h.strategicAnalysis.winningAngle) : undefined,
      skillGaps: strs(h.strategicAnalysis?.skillGaps),
      mitigations: strs(h.strategicAnalysis?.mitigations),
    },
    roadmap: arr(h.roadmap).map((r: any, i: number) => ({
      phase: str(r?.phase, String(i + 1)),
      title: r?.title ? str(r.title) : undefined,
      timeBlock: r?.timeBlock ? str(r.timeBlock) : undefined,
      goal: r?.goal ? str(r.goal) : undefined,
      tasks: arr(r?.tasks).map((t: any) => (typeof t === 'string'
        ? { task: t, assignedTo: '', duration: '' }
        : { task: str(t?.task), assignedTo: str(t?.assignedTo), duration: str(t?.duration) })).filter((t) => t.task),
    })),
    mvpScope: { mustHave: strs(h.mvpScope?.mustHave), niceToHave: strs(h.mvpScope?.niceToHave), cutIfNeeded: strs(h.mvpScope?.cutIfNeeded) },
    risks: arr(h.risks).map((x: any) => ({ risk: str(x?.risk), mitigation: str(x?.mitigation) })).filter((x) => x.risk),
    submissionChecklist: arr(h.submissionChecklist).map((x: any) => ({ item: str(x?.item), timeAllocation: str(x?.timeAllocation), critical: !!x?.critical, completed: false })).filter((x) => x.item),
    demoScript: { hook: str(h.demoScript?.hook), problem: str(h.demoScript?.problem), theWOW: str(h.demoScript?.theWOW), closing: str(h.demoScript?.closing) },
  };
}
