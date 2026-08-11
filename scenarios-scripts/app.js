/* CAT — Scenarios page renderer. Three-zone accordion design.
   Content: window.ZONES + window.CONTEXT_META. Screenshots: window.RAW_CONTEXTS. */
(function () {
  const RAW = window.RAW_CONTEXTS, ZONES = window.ZONES, META = window.CONTEXT_META;

  const state = { ctx: 'verifying', pathway: 'A', open: null };

  function esc(s) { return String(s == null ? '' : s); }

  function shots(sc) {
    // Resolve original / revised tool screenshots from whichever shape the source data uses.
    if (sc.tableShotBeforeSrc) return { before: sc.tableShotBeforeSrc, after: sc.tableShotAfterSrc || null };
    if (sc.newDesign && sc.newDesign.images) {
      const im = sc.newDesign.images;
      return { before: im[0] && im[0].src, after: (im[2] || im[1] || {}).src || null };
    }
    if (sc.confirmation) return { before: null, after: sc.confirmation.imageSrc };
    return { before: null, after: null };
  }

  function groups(ctxId) {
    const ctx = RAW.find((c) => c.id === ctxId);
    const out = { A: [], B: [] };
    ctx.scenarios.forEach((sc) => {
      const z = ZONES[sc.id];
      if (z) out[z.pathway].push(sc);
    });
    return out;
  }

  function renderContextTabs() {
    return RAW.map((ctx) => {
      const on = ctx.id === state.ctx;
      const m = META[ctx.id];
      const g = groups(ctx.id);
      const n = g.A.length + g.B.length;
      return `<button data-ctx="${ctx.id}" style="cursor:pointer; text-align:left; padding:18px 22px; border-radius:var(--radius-md); border:1px solid ${on ? 'var(--c-red)' : 'var(--color-border-subtle)'}; background:${on ? 'var(--c-red)' : 'var(--color-bg-surface)'}; color:${on ? '#fff' : 'var(--color-text-primary)'}; display:flex; flex-direction:column; gap:6px; transition:background 180ms ease-out, border-color 180ms ease-out;">
        <span style="font-weight:600; font-size:17px; letter-spacing:-0.01em;">${esc(ctx.title)}</span>
      </button>`;
    }).join('');
  }

  function renderPathwayTabs(g) {
    return ['A', 'B'].map((p) => {
      const on = p === state.pathway;
      const n = g[p].length;
      const dis = n === 0;
      return `<button data-pathway="${p}" ${dis ? 'disabled' : ''} style="cursor:${dis ? 'default' : 'pointer'}; padding:9px 18px; border-radius:var(--radius-pill); font-family:var(--font-mono); font-size:12px; letter-spacing:0.08em; text-transform:uppercase; font-weight:600; border:1.5px solid ${on ? 'var(--cat-violet-500)' : 'var(--cat-navy-950)'}; background:${on ? 'var(--cat-violet-500)' : 'transparent'}; color:${on ? '#fff' : dis ? 'var(--color-text-muted)' : 'var(--cat-navy-950)'}; opacity:${dis ? 0.45 : 1};">Pathway ${p}</button>`;
    }).join('');
  }

  function statBlock(label, value, note, variant) {
    const after = variant === 'after';
    return `<div style="padding:${after ? '18px 20px' : '12px 14px'}; background:${after ? 'var(--cat-violet-500)' : 'var(--color-bg-surface-muted)'}; border-radius:var(--radius-sm);">
      <div style="font:var(--text-data-label); color:${after ? 'rgba(255,255,255,0.78)' : 'var(--color-text-muted)'}; margin-bottom:4px;">${esc(label)}</div>
      <div style="font:var(--text-data-value); font-size:${after ? '20px' : '16px'}; ${after ? 'font-weight:600;' : ''} color:${after ? '#fff' : 'var(--color-text-primary)'}; line-height:1.35;">${esc(value)}</div>
      <div style="font-size:13px; line-height:1.5; color:${after ? 'rgba(255,255,255,0.85)' : 'var(--color-text-muted)'}; margin-top:4px;">${esc(note)}</div>
    </div>`;
  }

  function img(src, alt, h, muted) {
    if (!src) return '';
    const hRule = typeof h === 'string' ? h : `height:${h}px;`;
    return `<img src="${src}" alt="${esc(alt)}" class="zoom-img" style="width:100%; ${hRule} object-fit:contain; display:block; border-radius:10px; background:var(--color-bg-surface-muted); cursor:zoom-in; ${muted ? 'filter:saturate(0.25) opacity(0.82); border:1px solid var(--color-border-subtle);' : 'border:2px solid var(--cat-violet-500);'}">`;
  }

  function zoneLabel(n, title, accent) {
    return `<div style="display:flex; align-items:baseline; gap:10px; margin-bottom:14px;">
      <span style="font-family:var(--font-mono); font-size:11px; font-weight:600; letter-spacing:0.1em; color:${accent || 'var(--color-text-muted)'};">ZONE ${n}</span>
      <span style="font-weight:600; font-size:${n === 3 ? '19px' : '15px'}; letter-spacing:-0.01em;">${esc(title)}</span>
    </div>`;
  }

  function renderExpanded(sc) {
    const z = ZONES[sc.id], s = shots(sc);
    return `<div style="border-top:1px solid var(--color-border-subtle); padding:28px 24px 36px; display:flex; flex-direction:column; gap:20px;">

      <div style="display:grid; grid-template-columns:1.1fr 0.9fr; gap:28px; align-items:stretch;">
        <div style="display:flex; flex-direction:column; gap:14px; min-width:0;">
          ${zoneLabel(1, 'The situation')}
          <div style="display:grid; grid-template-columns:132px 1fr; gap:16px; align-items:start;">
            <img src="${sc.avatarSrc}" alt="${esc(sc.name)}" style="width:132px; height:168px; object-fit:cover; border-radius:10px; background:var(--color-bg-surface-muted); display:block;">
            <div style="display:flex; flex-direction:column; gap:10px; min-width:0;">
              <p style="font:var(--text-body-sm); margin:0; line-height:1.55;">${esc(z.z1.context)}</p>
              <p style="font:var(--text-body-sm); margin:0; line-height:1.55; color:var(--color-text-muted);">${esc(z.z1.rationale)}</p>
            </div>
          </div>
          ${statBlock(z.z1.statLabel, z.z1.statValue, z.z1.statNote, 'before')}
        </div>
        <div style="display:flex; align-items:stretch;">
          ${img(s.before, sc.name + ' — original mapping', 'height:100%; min-height:280px;', true)}
        </div>
      </div>

      <div style="border-left:3px solid var(--cat-violet-500); background:var(--color-bg-surface-muted); padding:22px 24px; border-radius:0 var(--radius-sm) var(--radius-sm) 0; display:grid; grid-template-columns:${z.z3.textOnly ? '1fr' : '0.95fr auto 1.35fr'}; gap:20px; align-items:stretch;">
        <div style="display:flex; flex-direction:column; gap:12px;">
          <div>
            ${zoneLabel(2, z.z2label || 'The gap', 'var(--cat-violet-500)')}
            <p style="font:var(--text-body-sm); margin:0; line-height:1.65;">${esc(z.z2)}</p>
          </div>
          ${z.z3.textOnly ? '' : `
          <div style="font-size:22px; color:var(--cat-violet-500); line-height:1; text-align:center;">↓</div>
          ${statBlock(z.z3.statLabel, z.z3.statValue, z.z3.statNote, 'after')}`}
        </div>
        ${z.z3.textOnly ? '' : `
        <div style="font-size:28px; color:var(--cat-violet-500); line-height:1; display:flex; align-items:center;">→</div>
        <div style="display:flex; align-items:stretch;">
          ${img(s.after, sc.name + ' — revised mapping', 'height:100%; min-height:420px;', false)}
        </div>`}
      </div>

      <div>
        ${zoneLabel(3, 'The impact', 'var(--cat-violet-500)')}
        <div style="display:flex; flex-direction:column; gap:24px;">
          ${z.z3.note ? `<p style="font:var(--text-body-sm); margin:0; line-height:1.65; max-width:78ch; color:var(--color-text-muted);">${esc(z.z3.note)}</p>` : ''}
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:24px 32px;">
            ${z.z3.impacts.map((i) => `
              <div style="display:flex; flex-direction:column; gap:8px;">
                <span style="font-family:var(--font-mono); font-size:11px; font-weight:600; letter-spacing:0.09em; text-transform:uppercase; color:var(--color-accent-highlight);">${esc(i.label)}</span>
                <p style="font:var(--text-body-sm); margin:0; line-height:1.6;"><strong style="font-weight:650;">${esc(i.lead)}</strong> ${esc(i.text)}</p>
              </div>`).join('')}
          </div>
        </div>
      </div>
    </div>`;
  }

  function renderCard(sc) {
    const z = ZONES[sc.id], open = state.open === sc.id;
    return `<div style="background:var(--color-bg-surface); border:1px solid ${open ? 'var(--cat-violet-500)' : 'var(--color-border-subtle)'}; border-radius:var(--radius-md); box-shadow:var(--shadow-panel); overflow:hidden;">
      <div data-toggle="${sc.id}" style="display:flex; align-items:center; gap:18px; padding:18px 24px; cursor:pointer;">
        <div style="width:52px; height:52px; flex-shrink:0; border-radius:50%; overflow:hidden; background:var(--color-bg-surface-muted);">
          <img src="${sc.avatarSrc}" alt="${esc(sc.name)}" style="width:52px; height:52px; object-fit:cover; display:block;">
        </div>
        <div style="flex:1; min-width:0; display:flex; flex-direction:column; gap:6px;">
          <div style="display:flex; align-items:center; gap:10px; flex-wrap:wrap;">
            <span style="font-weight:650; font-size:18px;">${esc(sc.name)}</span>
            <span style="font:var(--text-tag); letter-spacing:var(--tracking-tag); padding:4px 11px; border-radius:var(--radius-pill); background:var(--color-badge-bg); color:var(--color-badge-text);">${esc(sc.discipline)}</span>
            <span style="font-family:var(--font-mono); font-size:11px; letter-spacing:0.08em; text-transform:uppercase; color:var(--cat-violet-500); font-weight:600;">Pathway ${z.pathway}</span>
          </div>
          <p style="font-size:14px; line-height:1.5; margin:0; color:var(--color-text-muted); text-wrap:pretty;">${esc(z.summary)}</p>
        </div>
        <span style="font-size:20px; color:var(--color-text-muted); font-family:var(--font-mono); transform:rotate(${open ? 180 : 0}deg); transition:transform 200ms ease-out; display:inline-block; flex-shrink:0;">⌄</span>
      </div>
      ${open ? renderExpanded(sc) : ''}
    </div>`;
  }

  function renderBody() {
    const ctx = RAW.find((c) => c.id === state.ctx), m = META[state.ctx], g = groups(state.ctx);
    const list = g[state.pathway];
    return `<div style="display:flex; flex-direction:column; gap:24px;">
      <div>
        <h2 style="font:var(--text-h2); margin:0 0 8px;">${esc(m.label)}</h2>
        <p style="font:var(--text-body-sm); color:var(--color-text-muted); margin:0; max-width:72ch;">${esc(m.blurb)}</p>
      </div>
      <div style="display:flex; gap:8px; flex-wrap:wrap;">${renderPathwayTabs(g)}</div>
      ${list.length ?
        `<div style="display:flex; flex-direction:column; gap:14px;">${list.map(renderCard).join('')}</div>` :
        `<div style="border:1px dashed var(--color-border-subtle); border-radius:var(--radius-md); padding:36px 28px; background:var(--color-bg-surface);">
          <p style="font:var(--text-display-italic); color:var(--color-text-muted); margin:0;">No Pathway ${state.pathway} scenarios in this context yet.</p>
        </div>`}
    </div>`;
  }

  function render() {
    document.getElementById('scenarios-root').innerHTML = `
      <div style="min-height:100vh; background:var(--color-bg-page); font-family:var(--font-sans); color:var(--color-text-primary);">
        <div style="max-width:var(--maxw); margin:0 auto; padding:64px var(--gutter) 32px;">
          <h1 style="font:var(--text-h1); margin:0 0 16px; max-width:820px;">How educators can use the <span class="cat-letter">C</span><span class="cat-letter">A</span><span class="cat-letter">T</span></h1>
          <p style="font:var(--text-display-italic); color:var(--color-text-muted); margin:0; max-width:640px; font-size:24px;">Ten scenarios. Find and read the scenario that best aligns with your situation.</p>
        </div>
        <div style="max-width:var(--maxw); margin:0 auto; padding:0 var(--gutter);">
          <div style="display:grid; grid-template-columns:repeat(3, 1fr); gap:12px;">${renderContextTabs()}</div>
        </div>
        <div style="max-width:var(--maxw); margin:0 auto; padding:40px var(--gutter) 96px;">${renderBody()}</div>
      </div>`;
  }

  function ensureLightbox() {
    let lb = document.getElementById('scenarios-lightbox');
    if (lb) return lb;
    lb = document.createElement('div');
    lb.id = 'scenarios-lightbox';
    lb.style.cssText = 'position:fixed; inset:0; z-index:999; background:rgba(20,15,80,0.82); display:none; align-items:center; justify-content:center; padding:40px; cursor:zoom-out;';
    lb.innerHTML = '<img id="scenarios-lightbox-img" style="width:90vw; height:90vh; object-fit:contain; border-radius:12px; box-shadow:0 20px 60px rgba(0,0,0,0.4); cursor:default;">' +
      '<button id="scenarios-lightbox-close" aria-label="Close" style="position:fixed; top:24px; right:32px; width:40px; height:40px; border-radius:50%; border:none; background:rgba(255,255,255,0.15); color:#fff; font-size:22px; line-height:1; cursor:pointer;">&times;</button>';
    document.body.appendChild(lb);
    lb.addEventListener('click', (e) => { if (e.target.id !== 'scenarios-lightbox-img') closeLightbox(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeLightbox(); });
    return lb;
  }
  function openLightbox(src) { const lb = ensureLightbox(); document.getElementById('scenarios-lightbox-img').src = src; lb.style.display = 'flex'; }
  function closeLightbox() { const lb = document.getElementById('scenarios-lightbox'); if (lb) lb.style.display = 'none'; }

  function firstPathway() {
    const g = groups(state.ctx);
    if (!g[state.pathway].length) state.pathway = g.A.length ? 'A' : 'B';
  }

  function applyHash() {
    const id = location.hash.replace('#', '');
    if (id && RAW.some((c) => c.id === id)) { state.ctx = id; state.open = null; firstPathway(); }
  }

  function init() {
    applyHash();
    render();
    window.addEventListener('hashchange', () => { applyHash(); render(); });
    document.getElementById('scenarios-root').addEventListener('click', (e) => {
      const z = e.target.closest('img.zoom-img');
      if (z) { openLightbox(z.src); return; }
      const c = e.target.closest('[data-ctx]');
      if (c) { state.ctx = c.getAttribute('data-ctx'); state.open = null; firstPathway(); render(); return; }
      const p = e.target.closest('[data-pathway]');
      if (p && !p.disabled) { state.pathway = p.getAttribute('data-pathway'); state.open = null; render(); return; }
      const t = e.target.closest('[data-toggle]');
      if (t) {
        const id = t.getAttribute('data-toggle');
        const opening = state.open !== id;
        state.open = opening ? id : null;
        render();
        if (opening) {
          requestAnimationFrame(() => {
            const el = document.querySelector(`[data-toggle="${id}"]`);
            if (el) {
              const navH = document.querySelector('.site-nav')?.offsetHeight || 0;
              const top = el.getBoundingClientRect().top + window.scrollY - navH - 16;
              window.scrollTo({ top, behavior: 'smooth' });
            }
          });
        }
      }
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
