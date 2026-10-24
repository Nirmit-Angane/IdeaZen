// Hand-written library of project specs. These feed /ideas and /project-ideas/*.
// Each one is a reviewed starting point, not model output. Add more by appending to IDEAS.

export type Level = 'beginner' | 'intermediate' | 'advanced';

export interface CuratedIdea {
  slug: string;
  title: string;
  level: Level;
  /** keys of STACKS */
  stacks: string[];
  time: string;
  summary: string;
  whyBuildIt: string;
  features: string[];
  phases: { title: string; tasks: string[] }[];
  pitfalls: string[];
  skills: string[];
}

export const STACKS: Record<string, { name: string; blurb: string }> = {
  react: { name: 'React', blurb: 'Component-based UI projects that run in the browser.' },
  typescript: { name: 'TypeScript', blurb: 'Typed JavaScript projects, from small apps to services.' },
  nextjs: { name: 'Next.js', blurb: 'Full-stack React apps with server rendering and API routes.' },
  node: { name: 'Node.js', blurb: 'Backend services, APIs and real-time servers in JavaScript.' },
  python: { name: 'Python', blurb: 'Scripts, APIs and data projects in Python.' },
  sql: { name: 'SQL', blurb: 'Projects where the database design is the interesting part.' },
};

export const LEVELS: Record<Level, { name: string; blurb: string }> = {
  beginner: { name: 'Beginners', blurb: 'Small scope, one core skill at a time, finishable in 1 to 2 weeks.' },
  intermediate: { name: 'Intermediate developers', blurb: 'Real-world features: auth, persistence, deployment.' },
  advanced: { name: 'Advanced developers', blurb: 'Systems problems: concurrency, reliability, scale.' },
};

export const IDEAS: CuratedIdea[] = [
  {
    slug: 'habit-tracker-with-streaks', title: 'Habit tracker with streaks', level: 'beginner', stacks: ['react', 'typescript'], time: '1 to 2 weeks',
    summary: 'Track daily habits, tick them off, and see current and longest streaks. Data stays in localStorage.',
    whyBuildIt: 'Streak logic forces you to handle dates correctly, which is where most beginner apps go wrong. It is small enough to finish and polished enough to show.',
    features: ['Add, edit and archive habits', 'Daily check-in with one tap', 'Current and longest streak per habit', 'Weekly grid view', 'Persist to localStorage'],
    phases: [
      { title: 'Data model and state', tasks: ['Define Habit and CheckIn types', 'Write a pure function that computes the current streak from a list of dates', 'Unit-test streak edge cases: gaps, same day twice, month boundaries', 'Store state with useReducer and localStorage'] },
      { title: 'Core UI', tasks: ['Habit list with a check-in button', 'Add and edit form with validation', 'Empty state with a clear first action'] },
      { title: 'Streaks and history', tasks: ['Show current and longest streak', 'Build a 7-day grid per habit', 'Allow back-filling a missed day'] },
      { title: 'Polish and deploy', tasks: ['Keyboard and screen-reader pass', 'Responsive layout at 320px', 'Deploy to Vercel or Netlify', 'Write a README with a screenshot'] },
    ],
    pitfalls: ['Comparing dates with timestamps instead of calendar days, which breaks streaks across time zones', 'Storing derived streaks instead of computing them from check-ins'],
    skills: ['Date handling', 'Reducer-based state', 'Unit testing pure functions'],
  },
  {
    slug: 'expense-splitter', title: 'Expense splitter for a group trip', level: 'beginner', stacks: ['react', 'typescript'], time: '1 to 2 weeks',
    summary: 'Add people and expenses, then see who owes whom with the fewest payments.',
    whyBuildIt: 'The settle-up algorithm is a real problem with a clean solution, and money maths teaches you why floats are a trap.',
    features: ['Add people and shared expenses', 'Equal or custom split per expense', 'Running balance per person', 'Minimal settle-up suggestions', 'Export a summary as text'],
    phases: [
      { title: 'Model money safely', tasks: ['Store amounts as integer cents', 'Write split functions for equal and custom shares', 'Handle remainders so totals always add up'] },
      { title: 'Balances', tasks: ['Compute net balance per person', 'Test with 3 to 6 people and uneven splits'] },
      { title: 'Settle-up', tasks: ['Greedy match of biggest debtor to biggest creditor', 'Show the resulting payment list', 'Verify total paid equals total owed'] },
      { title: 'UI and ship', tasks: ['Expense form with validation', 'Copy-to-clipboard summary', 'Deploy and document the algorithm in the README'] },
    ],
    pitfalls: ['Using floating-point dollars, which leaves 1-cent errors', 'Forgetting to distribute the remainder cent when splitting evenly'],
    skills: ['Integer money handling', 'Greedy algorithms', 'Form validation'],
  },
  {
    slug: 'recipe-finder-with-public-api', title: 'Recipe finder using a public API', level: 'beginner', stacks: ['react'], time: '1 to 2 weeks',
    summary: 'Search recipes by ingredient, filter, and save favourites, using a free public recipe API.',
    whyBuildIt: 'It is the standard first project for fetching data, and the difference between a tutorial clone and a good one is loading, empty and error states.',
    features: ['Search by ingredient or name', 'Result list with images', 'Recipe detail page', 'Favourites saved locally', 'Loading, empty and error states'],
    phases: [
      { title: 'API exploration', tasks: ['Pick a free recipe API and read its rate limits', 'Call it with curl and inspect the response', 'Write a small typed client function'] },
      { title: 'Search and results', tasks: ['Debounced search input', 'Result grid with skeleton loading', 'Handle zero results and network errors'] },
      { title: 'Detail and favourites', tasks: ['Route per recipe', 'Favourite toggle persisted to localStorage', 'Favourites page'] },
      { title: 'Ship', tasks: ['Cache responses in memory', 'Accessibility check on images and buttons', 'Deploy and add a README'] },
    ],
    pitfalls: ['Firing a request on every keystroke', 'Never showing an error state, so failures look like an empty page'],
    skills: ['Fetching data', 'Debouncing', 'Routing'],
  },
  {
    slug: 'command-line-notes-tool', title: 'Command-line notes tool', level: 'beginner', stacks: ['python'], time: '1 week',
    summary: 'Add, list, search and delete notes from the terminal. Notes are stored in a local JSON file.',
    whyBuildIt: 'Argument parsing, file I/O and error handling in a project small enough to finish in a weekend, and you will actually use it.',
    features: ['add, list, search and delete commands', 'Tags on notes', 'Data stored in a JSON file in the home directory', 'Helpful error messages', 'Colour output'],
    phases: [
      { title: 'Storage', tasks: ['Define the note shape', 'Read and write JSON safely, creating the file if missing', 'Write functions with no printing so they are testable'] },
      { title: 'Commands', tasks: ['Use argparse subcommands', 'Implement add and list', 'Implement search and delete by id'] },
      { title: 'Quality', tasks: ['Tests with pytest and a temporary directory', 'Handle a corrupted JSON file without losing data', 'Add --help examples'] },
      { title: 'Package', tasks: ['Add pyproject.toml with a console script', 'Install with pipx', 'Publish the repo with a usage GIF'] },
    ],
    pitfalls: ['Writing the file in place, so a crash mid-write corrupts all notes', 'Mixing printing and logic so nothing can be tested'],
    skills: ['argparse', 'File I/O', 'pytest', 'Packaging'],
  },
  {
    slug: 'price-tracker-scraper', title: 'Price tracker with a polite scraper', level: 'beginner', stacks: ['python'], time: '2 weeks',
    summary: 'Track the price of a few products on a site that allows scraping and get a message when one drops.',
    whyBuildIt: 'You learn HTTP, HTML parsing and scheduling, plus the habits that keep a scraper legal and polite: robots.txt, rate limits and caching.',
    features: ['Add a product URL and target price', 'Fetch and parse the current price', 'Store price history in SQLite', 'Alert by email or Telegram when below target', 'Price history chart'],
    phases: [
      { title: 'Choose a source', tasks: ['Pick a site whose terms and robots.txt allow it', 'Check for an official API first', 'Save sample HTML for tests'] },
      { title: 'Parse and store', tasks: ['Fetch with requests and a custom User-Agent', 'Parse the price with BeautifulSoup', 'Insert into SQLite with a timestamp'] },
      { title: 'Schedule and alert', tasks: ['Run on a schedule with cron or GitHub Actions', 'Send the alert', 'Back off on errors'] },
      { title: 'Show history', tasks: ['Generate a chart with matplotlib', 'Document how to add a new site parser'] },
    ],
    pitfalls: ['Hammering a site with requests', 'Parsing with brittle selectors and no tests against saved HTML'],
    skills: ['HTTP', 'HTML parsing', 'SQLite', 'Scheduling'],
  },
  {
    slug: 'link-in-bio-page-builder', title: 'Link-in-bio page builder', level: 'intermediate', stacks: ['nextjs', 'typescript'], time: '3 weeks',
    summary: 'Users create a public page of links with a custom handle, themes and click counts.',
    whyBuildIt: 'Public dynamic routes, SEO metadata, auth and analytics in one product, with a visible result you can share.',
    features: ['Sign in and claim a handle', 'Drag to reorder links', 'Theme choices', 'Public page at /handle with metadata', 'Click counts per link'],
    phases: [
      { title: 'Auth and data', tasks: ['Set up Auth.js with GitHub login', 'Postgres schema for users, pages and links', 'Reserve handles and validate format'] },
      { title: 'Editor', tasks: ['Link CRUD with server actions', 'Drag-and-drop ordering', 'Live preview'] },
      { title: 'Public page', tasks: ['Dynamic route with static rendering and revalidation', 'OpenGraph image per page', 'Handle 404s and banned handles'] },
      { title: 'Analytics and launch', tasks: ['Count clicks through a redirect route', 'Rate limit the redirect', 'Deploy with environment variables documented'] },
    ],
    pitfalls: ['Letting users pick handles that collide with your own routes', 'Rendering user-provided URLs without checking the protocol'],
    skills: ['Auth', 'Dynamic routing', 'Server actions', 'SEO metadata'],
  },
  {
    slug: 'realtime-polling-app', title: 'Real-time polling app', level: 'intermediate', stacks: ['node', 'react', 'typescript'], time: '3 weeks',
    summary: 'Create a poll, share a link, and watch votes update live for everyone in the room.',
    whyBuildIt: 'WebSockets, shared state and abuse prevention in a product small enough to understand fully.',
    features: ['Create a poll with 2 to 8 options', 'Shareable link', 'Live vote counts over WebSockets', 'One vote per browser', 'Poll closes automatically'],
    phases: [
      { title: 'Server', tasks: ['Express or Fastify server with a poll store', 'REST endpoints to create and read polls', 'Validate all input with zod'] },
      { title: 'Realtime', tasks: ['Add WebSocket rooms per poll', 'Broadcast vote changes', 'Reconnect with backoff on the client'] },
      { title: 'Fair voting', tasks: ['Enforce one vote per browser with a cookie token', 'Rate limit votes per IP', 'Explain the limits honestly in the UI'] },
      { title: 'Ship', tasks: ['Persist polls to Postgres or SQLite', 'Load test with 200 simulated clients', 'Deploy to a host that supports WebSockets'] },
    ],
    pitfalls: ['Trusting vote counts sent by the client', 'Choosing a serverless host that cannot hold WebSocket connections'],
    skills: ['WebSockets', 'Input validation', 'Rate limiting', 'Load testing'],
  },
  {
    slug: 'job-application-tracker', title: 'Job application tracker', level: 'intermediate', stacks: ['nextjs', 'sql', 'typescript'], time: '3 to 4 weeks',
    summary: 'A kanban board for job applications with notes, contacts, reminders and a weekly summary.',
    whyBuildIt: 'Relational modelling, filters and reminders: the same patterns as most business CRUD apps, and you are the first real user.',
    features: ['Kanban columns by stage', 'Company, role, salary range, notes', 'Contacts linked to applications', 'Reminder emails for follow-ups', 'CSV export'],
    phases: [
      { title: 'Schema', tasks: ['Model applications, companies, contacts and events', 'Write migrations', 'Seed realistic data'] },
      { title: 'Board', tasks: ['Kanban UI with optimistic updates', 'Detail drawer with notes', 'Filters and search'] },
      { title: 'Reminders', tasks: ['Scheduled job to find overdue follow-ups', 'Send email with Resend', 'Unsubscribe link'] },
      { title: 'Quality', tasks: ['Integration tests for the stage-change logic', 'CSV export', 'Deploy with a managed Postgres'] },
    ],
    pitfalls: ['Storing stage as free text instead of an enum', 'Optimistic updates with no rollback on failure'],
    skills: ['Relational design', 'Migrations', 'Background jobs', 'Optimistic UI'],
  },
  {
    slug: 'api-rate-limiter-service', title: 'API rate limiter service', level: 'intermediate', stacks: ['node', 'typescript'], time: '2 to 3 weeks',
    summary: 'A small service that other apps call to check whether a key is over its limit, using Redis.',
    whyBuildIt: 'Rate limiting is a core backend skill and the algorithms (fixed window, sliding window, token bucket) have real trade-offs you can measure.',
    features: ['Check endpoint with a key and rule', 'Token bucket and sliding window algorithms', 'Per-key configuration', 'Response headers with remaining quota', 'Metrics endpoint'],
    phases: [
      { title: 'Algorithms in memory', tasks: ['Implement fixed window, sliding window and token bucket as pure classes', 'Test each with a fake clock'] },
      { title: 'Redis', tasks: ['Move state to Redis with Lua scripts for atomicity', 'Verify correctness under concurrent requests'] },
      { title: 'Service', tasks: ['HTTP API with auth for callers', 'Config per key', 'Standard RateLimit headers'] },
      { title: 'Prove it', tasks: ['Benchmark with autocannon', 'Write up the trade-offs between algorithms', 'Containerise with Docker Compose'] },
    ],
    pitfalls: ['Read-then-write in Redis without a script, which races under load', 'Using the server clock on multiple nodes without a shared time source'],
    skills: ['Redis', 'Concurrency', 'Benchmarking', 'Docker'],
  },
  {
    slug: 'fastapi-expense-api', title: 'Expense tracking API with FastAPI', level: 'intermediate', stacks: ['python', 'sql'], time: '3 weeks',
    summary: 'A documented REST API for expenses and budgets with auth, pagination and reports.',
    whyBuildIt: 'Shows you can design an API properly: validation, auth, pagination, migrations and tests, not just return JSON.',
    features: ['JWT auth', 'CRUD for expenses and categories', 'Monthly budget with alerts', 'Pagination and filtering', 'Report endpoint grouped by category'],
    phases: [
      { title: 'Foundations', tasks: ['FastAPI project layout', 'SQLAlchemy models and Alembic migrations', 'Pydantic schemas'] },
      { title: 'Auth', tasks: ['Password hashing with argon2', 'JWT access tokens', 'Per-user data isolation tests'] },
      { title: 'Features', tasks: ['Expense CRUD with filters', 'Cursor pagination', 'Report queries with GROUP BY'] },
      { title: 'Production', tasks: ['pytest with a test database', 'Dockerfile', 'CI in GitHub Actions', 'Deploy'] },
    ],
    pitfalls: ['Forgetting to scope every query to the current user', 'Offset pagination that gets slow and inconsistent on big tables'],
    skills: ['REST design', 'ORM and migrations', 'Auth', 'CI'],
  },
  {
    slug: 'collaborative-whiteboard', title: 'Collaborative whiteboard', level: 'advanced', stacks: ['typescript', 'node'], time: '6 to 8 weeks',
    summary: 'Multiple people draw on a shared canvas in real time, with undo and offline tolerance.',
    whyBuildIt: 'Conflict resolution is the hard part. Building it on a CRDT or operational model teaches distributed-state ideas you can discuss in interviews.',
    features: ['Shared canvas with shapes and freehand', 'Live cursors', 'Per-user undo', 'Reconnect without losing edits', 'Board persistence'],
    phases: [
      { title: 'Single-user canvas', tasks: ['Canvas rendering loop with hit testing', 'Shape model and selection', 'Local undo stack'] },
      { title: 'Sync model', tasks: ['Choose CRDT (Yjs or Automerge) or build last-writer-wins and compare', 'Server relay over WebSockets', 'Cursor presence'] },
      { title: 'Resilience', tasks: ['Offline edits merge on reconnect', 'Snapshot and compaction', 'Fuzz test with random concurrent edits'] },
      { title: 'Scale and ship', tasks: ['Load test 50 users per board', 'Persist to object storage or Postgres', 'Write an architecture doc'] },
    ],
    pitfalls: ['Syncing whole-document state on every change', 'Sharing one undo stack across users'],
    skills: ['CRDTs', 'WebSockets', 'Canvas', 'Fuzz testing'],
  },
  {
    slug: 'background-job-queue', title: 'Background job queue with retries', level: 'advanced', stacks: ['node', 'sql', 'typescript'], time: '5 to 6 weeks',
    summary: 'A job queue on Postgres with retries, backoff, scheduling and a small dashboard.',
    whyBuildIt: 'Queues are in almost every production system. Building one teaches locking, idempotency and failure handling at the root.',
    features: ['Enqueue with payload and priority', 'Workers claim jobs with SKIP LOCKED', 'Retries with exponential backoff', 'Delayed and recurring jobs', 'Dashboard of queued, running and failed jobs'],
    phases: [
      { title: 'Core queue', tasks: ['Jobs table and state machine', 'Claim with SELECT ... FOR UPDATE SKIP LOCKED', 'Worker loop with graceful shutdown'] },
      { title: 'Reliability', tasks: ['Retry policy and dead-letter state', 'Visibility timeout for crashed workers', 'Idempotency keys'] },
      { title: 'Scheduling', tasks: ['Delayed jobs', 'Cron-style recurring jobs without duplicates'] },
      { title: 'Observe', tasks: ['Dashboard with failure details', 'Metrics: throughput and latency', 'Chaos test: kill workers mid-job'] },
    ],
    pitfalls: ['Marking a job done before the work is committed', 'Retrying non-idempotent jobs and charging a customer twice'],
    skills: ['Postgres locking', 'Idempotency', 'Failure testing', 'Observability'],
  },
  {
    slug: 'rag-assistant-over-your-docs', title: 'Question answering over your own documents', level: 'advanced', stacks: ['python'], time: '5 to 6 weeks',
    summary: 'Ask questions about a folder of documents and get answers with citations, plus an evaluation set that tells you if it works.',
    whyBuildIt: 'Retrieval-augmented generation is common in industry, and most demos skip evaluation. Measuring answer quality is what makes this portfolio-worthy.',
    features: ['Ingest PDFs and markdown', 'Chunking and embeddings', 'Vector search with metadata filters', 'Answers with source citations', 'Evaluation harness with a question set'],
    phases: [
      { title: 'Ingest', tasks: ['Parse documents and keep page and section metadata', 'Compare chunk sizes and overlaps', 'Store embeddings in a vector database'] },
      { title: 'Retrieve', tasks: ['Top-k vector search', 'Add keyword search and combine', 'Re-rank results'] },
      { title: 'Answer', tasks: ['Prompt that requires citations', 'Refuse when sources do not contain the answer', 'Stream the response'] },
      { title: 'Evaluate', tasks: ['Write 50 questions with expected sources', 'Measure retrieval hit rate and answer accuracy', 'Report which change moved each number'] },
    ],
    pitfalls: ['Judging quality by trying a few questions by hand', 'Chunking that splits tables and code blocks in half'],
    skills: ['Embeddings', 'Retrieval', 'Evaluation', 'Prompting'],
  },
];

export const getIdea = (slug: string) => IDEAS.find((i) => i.slug === slug);
export const ideasFor = (stack?: string, level?: Level) =>
  IDEAS.filter((i) => (!stack || i.stacks.includes(stack)) && (!level || i.level === level));

/** Listing pages need enough content to be useful; thinner combinations are not generated. */
export const MIN_STACK_PAGE = 3;
export const MIN_COMBO_PAGE = 2;
export const stackPages = () => Object.keys(STACKS).filter((s) => ideasFor(s).length >= MIN_STACK_PAGE);
export const comboPages = () =>
  Object.keys(STACKS).flatMap((s) =>
    (Object.keys(LEVELS) as Level[]).filter((l) => ideasFor(s, l).length >= MIN_COMBO_PAGE).map((l) => ({ stack: s, level: l })),
  );
