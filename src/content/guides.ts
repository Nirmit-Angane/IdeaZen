export interface Guide {
  slug: string;
  title: string;
  description: string;
  /** Direct answer shown first, 40 to 60 words. */
  answer: string;
  sections: { h: string; p?: string[]; ul?: string[]; ol?: string[] }[];
}

export const GUIDES: Guide[] = [
  {
    slug: 'choose-a-portfolio-project',
    title: 'How to choose a portfolio project',
    description: 'Pick a project that shows the skills an employer is hiring for and that you can finish. A short checklist with examples by level.',
    answer:
      'Choose a project you can finish in two to six weeks, that uses the stack in the jobs you want, and that has at least one hard part you can explain. A small finished project beats a large abandoned one every time.',
    sections: [
      {
        h: 'Start from the job, not the idea',
        p: ['Read five job posts for the role you want. Note the languages, frameworks and practices that repeat. Your project should use two or three of them, not all of them.'],
      },
      {
        h: 'Check it against four questions',
        ol: [
          'Can I get a working version in two weeks? If not, cut scope until you can.',
          'Is there one part that is genuinely hard, such as sync, auth, search or scheduling?',
          'Can someone use it from a link, without installing anything?',
          'Will I be able to explain every decision in an interview?',
        ],
      },
      {
        h: 'What to avoid',
        ul: [
          'Tutorial clones with only the colours changed.',
          'Projects that depend on a paid API you cannot afford to keep running.',
          'Ideas so big that the demo is a screenshot.',
        ],
      },
      {
        h: 'Make it finishable',
        p: ['Write the smallest version that is still useful and call it the MVP. Put everything else in a "later" list. Ship the MVP, then add one feature at a time.'],
      },
      {
        h: 'Present it',
        ul: ['A README with a screenshot, a live link and the three hardest problems you solved.', 'A short note on what you would change with more time.', 'Tests for the logic that matters most.'],
      },
    ],
  },
  {
    slug: '48-hour-hackathon-plan',
    title: 'A 48-hour hackathon plan',
    description: 'How to split 48 hours between scoping, building, polishing and presenting, and what to cut when you fall behind.',
    answer:
      'Spend the first three hours on scope and a clickable skeleton, build the core flow until about hour 30, freeze features at hour 36, and keep the last 12 hours for polish, deployment and the demo. Teams usually lose by building too much.',
    sections: [
      {
        h: 'Hours 0 to 3: scope',
        ul: ['Write one sentence: who has what problem and what your project does about it.', 'List features, then cut to the one flow a judge will see.', 'Agree on stack and who owns what. Use tools everyone already knows.'],
      },
      {
        h: 'Hours 3 to 30: build the core flow end to end',
        p: ['Get a thin version working from input to result first, even if it is ugly. Add depth after the whole path works. Commit often and deploy early so deployment surprises appear on day one.'],
      },
      {
        h: 'Hour 36: feature freeze',
        p: ['After this, only fix bugs and polish. Cut anything half-working. A smaller demo that never fails beats a bigger one that sometimes does.'],
      },
      {
        h: 'Hours 36 to 48: polish and present',
        ul: ['Record a backup video of the demo.', 'Write the README and submission text while the team still has energy.', 'Rehearse the demo twice with a timer.', 'Sleep at least a few hours if you can; tired teams demo badly.'],
      },
      {
        h: 'What to cut first when behind',
        ul: ['Settings pages and account management', 'Edge-case handling that the demo will not touch', 'Second and third integrations', 'Animations'],
      },
    ],
  },
  {
    slug: 'how-long-should-a-portfolio-project-take',
    title: 'How long should a portfolio project take?',
    description: 'Realistic time ranges for beginner, intermediate and advanced portfolio projects, and how to estimate your own.',
    answer:
      'A beginner project is usually one to two weeks of part-time work, an intermediate project three to four weeks, and an advanced project five to eight. These are rough ranges; double your first estimate if you have not built something similar before.',
    sections: [
      {
        h: 'Rough ranges',
        ul: ['Beginner: 1 to 2 weeks, one core skill, small scope.', 'Intermediate: 3 to 4 weeks, auth or persistence, deployed.', 'Advanced: 5 to 8 weeks, concurrency, reliability or scale concerns, with tests and a write-up.'],
      },
      {
        h: 'Why estimates are wrong',
        p: ['Most overruns come from setup, deployment, data modelling and the last 20 percent of polish, not from the feature you were excited about. Plan time for these explicitly.'],
      },
      {
        h: 'A simple way to estimate',
        ol: ['List the tasks in the smallest steps you can.', 'Give each task a time in hours, rounding up.', 'Add 30 percent for things you cannot foresee.', 'Divide by the hours per week you really have, not the hours you hope for.'],
      },
      {
        h: 'When to stop',
        p: ['If a project passes its planned time by half, cut scope instead of extending the deadline. Finishing and presenting something smaller is worth more than still working on it next month.'],
      },
    ],
  },
];

export const getGuide = (slug: string) => GUIDES.find((g) => g.slug === slug);
