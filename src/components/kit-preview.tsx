import type { Kit } from '@/content/kits';

// A live, token-driven mock-up of each kit. Layout differs per kit; colours, type, radius, border and shadow come from its tokens.
const CSS = `
.kp{background:var(--k-bg);color:var(--k-ink);font-family:var(--k-body);font-size:var(--k-fs);line-height:1.5}
.kp *{box-sizing:border-box}
.kp h3,.kp .kp-d{font-family:var(--k-display);margin:0}
.kp .kp-mono{font-family:var(--k-mono)}
.kp .kp-muted{color:var(--k-muted)}
.kp .kp-surface{background:var(--k-surface);border:var(--k-bw) solid var(--k-line);border-radius:var(--k-r);box-shadow:var(--k-shadow)}
.kp .kp-btn{display:inline-flex;align-items:center;gap:8px;height:var(--k-h);padding:0 16px;border:var(--k-bw) solid var(--k-btn-border);border-radius:var(--k-r);background:var(--k-accent);color:var(--k-accent-ink);font:600 1em var(--k-body);box-shadow:var(--k-shadow)}
.kp .kp-btn2{background:var(--k-surface);color:var(--k-ink);border-color:var(--k-control)}
.kp .kp-hover{filter:brightness(.92)}
.kp .kp-focus{outline:2px solid var(--k-accent);outline-offset:2px}
.kp .kp-off{opacity:.45}
.kp .kp-input.kp-err{border-color:var(--k-danger)}
.kp .kp-danger{color:var(--k-danger);font-size:.85em}
.kp .kp-label{font-size:.85em;font-weight:600;display:block;margin-bottom:4px}
.kp .kp-input{height:var(--k-h);padding:0 12px;border:var(--k-bw) solid var(--k-control);border-radius:var(--k-r);background:var(--k-surface);color:var(--k-muted);display:flex;align-items:center}
.kp .kp-chip{display:inline-flex;align-items:center;gap:6px;border:1px solid var(--k-line);border-radius:calc(var(--k-r)/2 + 1px);padding:1px 8px;font-size:.8em}
.kp .kp-dot{width:7px;height:7px;border-radius:50%;background:var(--k-accent);display:inline-block}
.kp .kp-line{border-top:1px solid var(--k-line)}
.kp .kp-accent{color:var(--k-accent)}
`;

const rows = [
  ['INV-1042', 'Northwind Ltd', '12,480.00', 'Paid'],
  ['INV-1043', 'Acme Corp', '3,210.50', 'Due'],
  ['INV-1044', 'Globex', '8,975.00', 'Paid'],
  ['INV-1045', 'Initech', '1,640.25', 'Overdue'],
];

function Dashboard() {
  return (
    <div className="grid grid-cols-[150px_1fr] min-h-[360px]">
      <aside className="kp-surface !rounded-none !border-y-0 !border-l-0 p-3 space-y-1 text-[0.9em]">
        <p className="kp-d font-semibold mb-3">Ledger</p>
        {['Overview', 'Invoices', 'Customers', 'Reports'].map((n, i) => (
          <p key={n} className={`px-2 py-1 ${i === 1 ? 'font-semibold border-l-2 border-[var(--k-accent)]' : 'kp-muted'}`}>{n}</p>
        ))}
      </aside>
      <div className="p-4 space-y-4">
        <div className="grid grid-cols-3 gap-3">
          {[['Revenue', '48,210', '+4.2%'], ['Open invoices', '17', '-2'], ['Avg. days to pay', '21.4', '+0.8']].map(([l, v, d]) => (
            <div key={l} className="kp-surface p-3">
              <p className="kp-muted text-[0.8em]">{l}</p>
              <p className="kp-mono text-[1.6em] leading-tight">{v}</p>
              <p className="kp-mono kp-accent text-[0.8em]">{d}</p>
            </div>
          ))}
        </div>
        <div className="kp-surface overflow-hidden">
          <table className="w-full text-left text-[0.9em] [&_th]:px-2.5 [&_th]:py-2 [&_td]:px-2.5 [&_td]:py-2">
            <thead className="kp-muted text-[0.8em]"><tr><th className="font-medium">Invoice</th><th className="font-medium">Customer</th><th className="font-medium text-right">Amount</th><th className="font-medium">Status</th></tr></thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r[0]} className="kp-line">
                  <td className="kp-mono">{r[0]}</td><td>{r[1]}</td><td className="kp-mono text-right">{r[2]}</td>
                  <td><span className="kp-chip"><i className="kp-dot" />{r[3]}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex gap-2"><span className="kp-btn">New invoice</span><span className="kp-btn kp-btn2">Export CSV</span></div>
      </div>
    </div>
  );
}

function Notes() {
  return (
    <div className="grid grid-cols-[170px_1fr] min-h-[360px]">
      <aside className="p-4 space-y-3 text-[0.9em] border-r border-[var(--k-line)]">
        {['Reading list', 'Essay draft', 'Meeting notes', 'Recipes'].map((n, i) => (
          <p key={n} className={`pl-3 py-1 ${i === 1 ? 'font-semibold border-l-2 border-[var(--k-accent)]' : 'kp-muted'}`}>{n}</p>
        ))}
      </aside>
      <article className="p-8 max-w-[520px]">
        <p className="kp-muted text-[0.8em] mb-2">Edited 2 minutes ago</p>
        <h3 className="text-[2.1em] leading-tight font-medium">On keeping a commonplace book</h3>
        <p className="mt-4 kp-muted">The point is not to collect quotes, but to notice what keeps drawing you back. Write the passage, then one line about why it stayed with you.</p>
        <p className="mt-3">Revisit the page weekly. Link two ideas that rhyme. <span className="kp-accent underline underline-offset-4">See related notes</span></p>
        <div className="mt-5 space-y-2">
          {['Copy the passage', 'Add a one-line reaction', 'Tag it'].map((t, i) => (
            <p key={t} className="flex gap-3 items-center"><span className="inline-block size-4 border border-[var(--k-line)]" style={{ background: i === 0 ? 'var(--k-accent)' : 'transparent' }} />{t}</p>
          ))}
        </div>
        <div className="mt-6 flex gap-5 items-center"><span className="kp-btn">Save note</span><span className="kp-muted">#reading #essays</span></div>
      </article>
    </div>
  );
}

function Terminal() {
  return (
    <div className="p-5 min-h-[360px] grid gap-4 md:grid-cols-[1fr_240px]">
      <div className="space-y-4">
        <div className="kp-surface p-3">
          <div className="kp-input !border-0 !bg-transparent !px-0 kp-mono text-[0.9em]">› deploy --env production</div>
          <div className="kp-line mt-2 pt-2 space-y-1 kp-mono text-[0.85em]">
            {[['deploy production', '⌘D'], ['deploy staging', '⌘⇧D'], ['view logs', '⌘L'], ['rollback last release', '⌘Z']].map(([a, k], i) => (
              <p key={a} className="flex justify-between px-2 py-1" style={i === 0 ? { background: 'var(--k-bg)' } : undefined}>
                <span className={i === 0 ? 'kp-accent' : ''}>{a}</span><span className="kp-chip">{k}</span>
              </p>
            ))}
          </div>
        </div>
        <div className="kp-surface p-3 kp-mono text-[0.8em] leading-6">
          <p className="kp-muted">12:04:11  api  GET /v1/jobs 200 18ms</p>
          <p className="kp-muted">12:04:12  api  POST /v1/jobs 201 42ms</p>
          <p><span className="kp-accent">12:04:14  worker  retry 2/5 job_8f2a</span></p>
          <p className="kp-muted">12:04:15  api  GET /v1/jobs 200 16ms</p>
        </div>
      </div>
      <div className="space-y-3">
        <p className="kp-d font-semibold">Services</p>
        {[['api', 'healthy'], ['worker', 'degraded'], ['db', 'healthy']].map(([n, s]) => (
          <div key={n} className="kp-surface p-3 flex justify-between items-center"><span className="kp-mono">{n}</span><span className="kp-chip kp-mono"><i className="kp-dot" style={s === 'healthy' ? { background: 'var(--k-ink)', opacity: 0.5 } : undefined} />{s}</span></div>
        ))}
        <span className="kp-btn">Run check <span className="kp-chip !border-current">⌘R</span></span>
      </div>
    </div>
  );
}

function Landing() {
  return (
    <div className="p-6 sm:p-8 min-h-[360px]">
      <div className="flex items-center justify-between mb-8"><span className="kp-d font-bold text-[1.2em]">Launchpad</span><span className="flex items-center gap-5 text-[0.9em]"><span className="hidden sm:inline">Features</span><span className="hidden sm:inline">Pricing</span><span className="kp-btn !h-9">Join waitlist</span></span></div>
      <div className="grid md:grid-cols-[1.1fr_1fr] gap-8 items-center">
        <div>
          <h3 className="text-[2.6em] sm:text-[3.1em] leading-[1.02] font-extrabold tracking-tight">
            Ship the first version <span style={{ background: 'var(--k-accent2)', padding: '0 .15em' }}>this weekend</span>
          </h3>
          <p className="kp-muted mt-4 max-w-[40ch]">Plan, build and launch a small product with a checklist that tells you what to cut.</p>
          <div className="mt-6 flex gap-3 flex-wrap"><span className="kp-btn">Start free</span><span className="kp-btn kp-btn2">See a demo</span></div>
        </div>
        <div className="kp-surface p-4 space-y-2"><div className="kp-d font-bold">Launch checklist</div>{['Landing page live', 'Payments tested', 'First 10 users invited'].map((t, i) => <p key={t} className="flex gap-2 items-center"><span className="kp-dot" style={{ opacity: i < 2 ? 1 : 0.25 }} />{t}</p>)}</div>
      </div>
      <div className="grid sm:grid-cols-3 gap-4 mt-8">
        {[['Plan', 'Turn an idea into phases and tasks.'], ['Build', 'Follow one phase at a time.'], ['Launch', 'Cut scope, then ship.']].map(([h, d]) => (
          <div key={h} className="kp-surface p-4"><h3 className="font-bold text-[1.15em]">{h}</h3><p className="kp-muted text-[0.9em] mt-1">{d}</p></div>
        ))}
      </div>
    </div>
  );
}

const VIEW: Record<string, () => React.JSX.Element> = { ledger: Dashboard, marginalia: Notes, 'night-shift': Terminal, launchpad: Landing };

function kitVars(kit: Kit) {
  const t = kit.tokens;
  return {
    '--k-bg': t.bg, '--k-surface': t.surface, '--k-ink': t.ink, '--k-muted': t.muted, '--k-line': t.line,
    '--k-control': t.control, '--k-danger': t.danger,
    '--k-accent': t.accent, '--k-accent-ink': t.accentInk, '--k-accent2': t.accent2 ?? t.accent,
    '--k-r': kit.shape.radius, '--k-bw': kit.shape.border, '--k-shadow': kit.shape.shadow,
    '--k-btn-border': kit.shape.border === '2px' ? t.ink : 'transparent',
    '--k-h': kit.slug === 'launchpad' ? '44px' : kit.slug === 'marginalia' ? '40px' : '32px',
    '--k-fs': kit.slug === 'marginalia' ? '17px' : kit.slug === 'launchpad' ? '16px' : '14px',
    '--k-display': kit.fontVar.display, '--k-body': kit.fontVar.body, '--k-mono': kit.fontVar.mono,
  } as React.CSSProperties;
}

/** The states every control needs, drawn with the kit's own tokens so people can judge them before copying. */
export function KitStates({ kit }: { kit: Kit }) {
  return (
    <div className="kp rounded-[6px] border border-rule p-5 grid gap-6 sm:grid-cols-2" style={kitVars(kit)}>
      <style>{CSS}</style>
      <div className="space-y-4">
        <p className="kp-label">Buttons</p>
        <div className="flex flex-wrap gap-3 items-center">
          <span className="kp-btn">Default</span>
          <span className="kp-btn kp-hover">Hover</span>
          <span className="kp-btn kp-focus">Focus</span>
          <span className="kp-btn kp-off">Disabled</span>
        </div>
        <div className="flex flex-wrap gap-3 items-center">
          <span className="kp-btn kp-btn2">Secondary</span>
          <span className="kp-btn kp-btn2 kp-focus">Focus</span>
        </div>
      </div>
      <div className="space-y-3">
        <div><span className="kp-label">Default</span><div className="kp-input">Search invoices</div></div>
        <div><span className="kp-label">Focus</span><div className="kp-input kp-focus" style={{ color: 'var(--k-ink)' }}>acme</div></div>
        <div>
          <span className="kp-label">Error</span>
          <div className="kp-input kp-err" style={{ color: 'var(--k-ink)' }}>name@</div>
          <p className="kp-danger mt-1">✕ Enter an email like name@example.com</p>
        </div>
        <div className="kp-off"><span className="kp-label">Disabled</span><div className="kp-input">Not available</div></div>
      </div>
    </div>
  );
}

export function KitPreview({ kit, compact = false }: { kit: Kit; compact?: boolean }) {
  const View = VIEW[kit.slug] ?? Dashboard;
  const style = kitVars(kit);
  return (
    <div
      className={`kp overflow-hidden rounded-[6px] border border-rule ${compact ? 'max-h-[280px] pointer-events-none select-none' : ''}`}
      style={style}
      role="img"
      aria-label={`${kit.name} design preview`}
    >
      <style>{CSS}</style>
      <View />
    </div>
  );
}
