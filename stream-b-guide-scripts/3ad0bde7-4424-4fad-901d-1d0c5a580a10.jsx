/* CAT — Shared components: SiteNav, Footer, ScrollDemo scaffold */

// ─────────────────────────────────────────────────────────────
// SiteNav — persistent top nav for all pages
// ─────────────────────────────────────────────────────────────
function SiteNav({ current = "home" }) {
  const [scrolled, setScrolled] = React.useState(false);
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
  { id: 'home', label: 'Overview', href: 'index.html' },
  { id: 'stream-a', label: 'Pathway A guide', href: 'stream-a-guide.html' },
  { id: 'stream-b', label: 'Pathway B guide', href: 'stream-b-guide.html' },
  { id: 'research', label: 'Research', href: 'index.html#research' }];


  return (
    <header className={`site-nav ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="site-nav-inner container">
        <a href="index.html" className="site-brand">
          <span className="brand-mark" aria-hidden="true">
            <img src={window.__shots.catLogo} alt="The CAT" width="32" height="32" style={{ objectFit: 'contain', display: 'block' }} />
          </span>
          <span className="brand-text">
            <span className="brand-name">The CAT</span>
            <span className="brand-sub">Constructive Alignment Tool</span>
          </span>
        </a>
        <nav className="site-links">
          {links.map((l) =>
          <a key={l.id} href={l.href} className={`site-link ${current === l.id ? 'is-current' : ''}`}>
              {l.label}
            </a>
          )}
        </nav>
        <div className="site-cta">
          <a href="https://mediaproduction.adelaide.edu.au/pace-interactives/#/clos" target="_blank" rel="noopener" className="btn btn-primary btn-nav-a">
            Open Pathway A
            <svg className="arrow" width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 7h8m0 0L7.5 3.5M11 7l-3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </a>
          <a href="https://mediaproduction.adelaide.edu.au/pace-interactives/#/clos-inverse" target="_blank" rel="noopener" className="btn btn-primary btn-nav-b">
            Open Pathway B
            <svg className="arrow" width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 7h8m0 0L7.5 3.5M11 7l-3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </a>
        </div>
      </div>
    </header>);

}

// ─────────────────────────────────────────────────────────────
// SiteFooter
// ─────────────────────────────────────────────────────────────
function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-row">
          <div className="footer-brand">
            <div className="footer-mark">
              <img src={window.__shots.catLogo} alt="" width="40" height="40" style={{ objectFit: 'contain', display: 'block' }} />
            </div>
            <div className="footer-brand-text">
              <span className="footer-title">The Constructive Alignment Tool</span>
              <span className="footer-note">An educational research project exploring constructive alignment in higher education.</span>
            </div>
          </div>
        </div>
      </div>
    </footer>);

}

// ─────────────────────────────────────────────────────────────
// ScrollDemo — wraps a demo, auto-plays once when in view,
// provides replay via a ref. Children receive a `progress` (0..1)
// and `playing` prop via render prop.
// ─────────────────────────────────────────────────────────────
function ScrollDemo({ duration = 6, children, caption, label, height }) {
  const ref = React.useRef(null);
  const [progress, setProgress] = React.useState(1); // start at final frame so demo is always visible
  const [playing, setPlaying] = React.useState(false);
  const [played, setPlayed] = React.useState(false);
  const startRef = React.useRef(null);
  const rafRef = React.useRef(null);

  const start = React.useCallback(() => {
    setPlaying(true);
    setProgress(0);
    startRef.current = null;
    const step = (ts) => {
      if (startRef.current == null) startRef.current = ts;
      const t = (ts - startRef.current) / 1000;
      const p = Math.min(1, t / duration);
      setProgress(p);
      if (p < 1) {
        rafRef.current = requestAnimationFrame(step);
      } else {
        setPlaying(false);
      }
    };
    rafRef.current = requestAnimationFrame(step);
  }, [duration]);

  const replay = React.useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    start();
  }, [start]);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Delay start so Babel/React finish compiling before rAF kicks off
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !played) {
          setPlayed(true);
          setTimeout(() => start(), 600);
        }
      });
    }, { threshold: 0.15 });
    // Small initial delay before observing — prevents firing mid-compilation
    const timer = setTimeout(() => io.observe(el), 200);
    return () => {
      clearTimeout(timer);
      io.disconnect();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [played, start]);

  return (
    <div ref={ref} className="scroll-demo" style={height ? { minHeight: height } : undefined}>
      <div className="scroll-demo-stage">
        {typeof children === 'function' ? children({ progress, playing }) : children}
      </div>
      <div className="scroll-demo-strip">
        <div className="demo-label">
          <span className="demo-dot" style={{ background: playing ? 'var(--c-bright)' : 'var(--c-hairline-2)' }} />
          <span className="mono demo-label-text">{label}</span>
        </div>
        <div className="demo-caption">{caption}</div>
        <button className="replay-btn" onClick={replay}>
          <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
            <path d="M1 5.5a4.5 4.5 0 108.5-2M9.5 1.5V4H7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Replay
        </button>
      </div>
      <div className="scroll-demo-progress">
        <div className="scroll-demo-progress-fill" style={{ width: `${progress * 100}%` }} />
      </div>
    </div>);

}

// Utility easings for demos
const ease = {
  outCubic: (t) => 1 - Math.pow(1 - t, 3),
  inOutCubic: (t) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2,
  outQuart: (t) => 1 - Math.pow(1 - t, 4),
  outBack: (t) => {const c1 = 1.70158,c3 = c1 + 1;return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);}
};

// Lerp helper for keyframes: segment(progress, from, to, start, end, easeFn)
function seg(p, from, to, start, end, easeFn = ease.outCubic) {
  if (p <= start) return from;
  if (p >= end) return to;
  const local = (p - start) / (end - start);
  return from + (to - from) * easeFn(local);
}

Object.assign(window, { SiteNav, SiteFooter, ScrollDemo, ease, seg });