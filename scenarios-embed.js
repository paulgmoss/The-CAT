/* CAT — reusable single-pathway scenario browser, embedded in the pathway guide pages.
   Same visual language as scenarios.html's renderer, filtered to one pathway, no pathway switcher.
   Requires window.RAW_CONTEXTS + window.ZONES + window.CONTEXT_META (scenarios-data.js + scenarios-zones.js)
   and scenarios-tokens-final.css loaded on the page. */
(function () {
  function esc(s) { return String(s == null ? '' : s); }

  function shots(sc) {
    if (sc.tableShotBeforeSrc) return { before: sc.tableShotBeforeSrc, after: sc.tableShotAfterSrc || null };
    if (sc.newDesign && sc.newDesign.images) {
      const im = sc.newDesign.images;
      return { before: im[0] && im[0].src, after: (im[2] || im[1] || {}).src || null };
    }
    if (sc.confirmation) return { before: null, after: sc.confirmation.imageSrc };
    return { before: null, after: null };
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
      <span style="font-weight:600; font-size:${n === 3 ? '19px' : '15px'}; letter-spacing:-0.01em;">${esc(title)}</span>
    </div>`;
  }

  function renderExpanded(sc) {
    const z = window.ZONES[sc.id], s = shots(sc);
    return `<div style="border-top:1px solid var(--color-border-subtle); padding:28px 24px 36px; display:flex; flex-direction:column; gap:20px;">
      <div style="display:grid; grid-template-columns:1.1fr 0.9fr; gap:28px; align-items:stretch;">
        <div style="display:flex; flex-direction:column; gap:14px; min-width:0;">
          ${zoneLabel(1, 'The context')}
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

  function renderCard(sc, openId) {
    const z = window.ZONES[sc.id], open = openId === sc.id;
    return `<div style="background:var(--color-bg-surface); border:1px solid ${open ? 'var(--cat-violet-500)' : 'var(--color-border-subtle)'}; border-radius:var(--radius-md); box-shadow:var(--shadow-panel); overflow:hidden;">
      <div data-toggle="${sc.id}" style="display:flex; align-items:center; gap:18px; padding:18px 24px; cursor:pointer;">
        <div style="width:52px; height:52px; flex-shrink:0; border-radius:50%; overflow:hidden; background:var(--color-bg-surface-muted);">
          <img src="${sc.avatarSrc}" alt="${esc(sc.name)}" style="width:52px; height:52px; object-fit:cover; display:block;">
        </div>
        <div style="flex:1; min-width:0; display:flex; flex-direction:column; gap:6px;">
          <div style="display:flex; align-items:center; gap:10px; flex-wrap:wrap;">
            <span style="font-weight:650; font-size:18px;">${esc(sc.name)}</span>
            <span style="font:var(--text-tag); letter-spacing:var(--tracking-tag); padding:4px 11px; border-radius:var(--radius-pill); background:var(--color-badge-bg); color:var(--color-badge-text);">${esc(sc.discipline)}</span>
          </div>
          <p style="font-size:14px; line-height:1.5; margin:0; color:var(--color-text-muted); text-wrap:pretty;">${esc(z.summary)}</p>
        </div>
        <span style="font-size:20px; color:var(--color-text-muted); font-family:var(--font-mono); transform:rotate(${open ? 180 : 0}deg); transition:transform 200ms ease-out; display:inline-block; flex-shrink:0;">⌄</span>
      </div>
      ${open ? renderExpanded(sc) : ''}
    </div>`;
  }

  window.mountScenarioEmbed = function (containerId, pathway) {
    const root = document.getElementById(containerId);
    if (!root) return;
    const RAW = window.RAW_CONTEXTS, ZONES = window.ZONES, META = window.CONTEXT_META;
    const contexts = RAW.map((ctx) => ({
      ...ctx,
      scenarios: ctx.scenarios.filter((sc) => ZONES[sc.id] && ZONES[sc.id].pathway === pathway),
    })).filter((ctx) => ctx.scenarios.length);
    if (!contexts.length) return;

    const state = { ctx: contexts[0].id, open: null };

    function renderContextTabs() {
      return contexts.map((ctx) => {
        const on = ctx.id === state.ctx;
        return `<button data-ctx="${ctx.id}" style="cursor:pointer; text-align:left; padding:16px 20px; border-radius:var(--radius-md); border:1px solid ${on ? 'var(--c-red)' : 'var(--color-border-subtle)'}; background:${on ? 'var(--c-red)' : 'var(--color-bg-surface)'}; color:${on ? '#fff' : 'var(--color-text-primary)'}; display:flex; flex-direction:column; gap:6px; transition:background 180ms ease-out, border-color 180ms ease-out;">
          <span style="font-weight:600; font-size:16px; letter-spacing:-0.01em;">${esc(ctx.title)}</span>
        </button>`;
      }).join('');
    }

    function renderBody() {
      const ctx = contexts.find((c) => c.id === state.ctx);
      const m = META[state.ctx];
      return `<div style="display:flex; flex-direction:column; gap:20px;">
        <p style="font:var(--text-body-sm); color:var(--color-text-muted); margin:0; max-width:72ch;">${esc(m.blurb)}</p>
        <div style="display:flex; flex-direction:column; gap:14px;">${ctx.scenarios.map((sc) => renderCard(sc, state.open)).join('')}</div>
      </div>`;
    }

    function render() {
      root.innerHTML = `
        <div style="display:flex; flex-direction:column; gap:20px;">
          <div style="display:grid; grid-template-columns:repeat(${contexts.length}, 1fr); gap:10px;">${renderContextTabs()}</div>
          ${renderBody()}
        </div>`;
    }

    render();

    root.addEventListener('click', (e) => {
      const z = e.target.closest('img.zoom-img');
      if (z) { openLightbox(z.src); return; }
      const c = e.target.closest('[data-ctx]');
      if (c) { state.ctx = c.getAttribute('data-ctx'); state.open = null; render(); return; }
      const t = e.target.closest('[data-toggle]');
      if (t) {
        const id = t.getAttribute('data-toggle');
        const opening = state.open !== id;
        state.open = opening ? id : null;
        render();
        if (opening) {
          requestAnimationFrame(() => {
            const el = root.querySelector(`[data-toggle="${id}"]`);
            if (el) {
              const navH = document.querySelector('.site-nav')?.offsetHeight || 0;
              const top = el.getBoundingClientRect().top + window.scrollY - navH - 16;
              window.scrollTo({ top, behavior: 'smooth' });
            }
          });
        }
      }
    });
  };

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
})();
