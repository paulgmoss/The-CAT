/* CAT — Scenarios page renderer (vanilla JS, delegated events) */
(function () {
  const RAW_CONTEXTS = window.RAW_CONTEXTS;

  const state = {
    open: { sarah: true, maya: true, james: true },
    activeContext: 'verifying',
  };

  function esc(s) {
    return String(s == null ? '' : s);
  }

  function renderTabs() {
    return RAW_CONTEXTS.map((ctx) => {
      const isActive = ctx.id === state.activeContext;
      const bg = isActive ? 'var(--cat-navy-950)' : 'transparent';
      const color = isActive ? '#fff' : 'var(--color-text-primary)';
      const border = isActive ? 'var(--cat-navy-950)' : 'var(--color-border-subtle)';
      const eyebrowShort = ctx.eyebrow.split(' — ')[0];
      return `
        <div data-tab="${ctx.id}" style="cursor:pointer; padding:12px 24px; border-radius:var(--radius-pill); font:var(--text-body-sm); font-weight:600; letter-spacing:0.01em; background:${bg}; color:${color}; border:1px solid ${border}; transition:background 200ms ease-out, color 200ms ease-out;">
          <span style="font-family:var(--font-mono); font-weight:600; margin-right:8px; opacity:0.7;">${esc(eyebrowShort)}</span>${esc(ctx.title)}
        </div>`;
    }).join('');
  }

  function renderBullets(bullets) {
    return `<div style="display:grid; grid-template-columns:repeat(3, 1fr); gap:24px;">
      ${bullets.map((b) => `
        <div style="display:flex; flex-direction:column; gap:6px;">
          <span style="font:var(--text-tag); color:var(--color-accent-highlight); letter-spacing:var(--tracking-tag); text-transform:uppercase;">${esc(b.label)}</span>
          <p style="font:var(--text-body-sm); margin:0; line-height:1.55;">${esc(b.text)}</p>
        </div>`).join('')}
    </div>`;
  }

  function renderWhatChanged(paragraphs) {
    return `<div style="margin-top:8px;">
      <div style="font-family:var(--font-mono); font-weight:600; font-size:15px; letter-spacing:0.04em; color:var(--color-accent-highlight); margin-bottom:12px;">What the mapping is really recording</div>
      ${paragraphs.map((p) => `<p style="font:var(--text-body-sm); color:var(--color-text-primary); margin:0 0 14px; line-height:1.55;">${esc(p)}</p>`).join('')}
    </div>`;
  }

  function renderImpactBand(sc) {
    return `<div style="${sc.showInlineImages ? 'border-top:1px solid var(--color-border-subtle); padding-top:28px; ' : ''}display:flex; flex-direction:column; gap:20px;">
      <div style="font:var(--text-kicker-mono); color:var(--color-text-muted); letter-spacing:0.04em;">The impact of the change</div>
      ${renderBullets(sc.bullets)}
      ${renderWhatChanged(sc.whatChangedParagraphs)}
    </div>`;
  }

  function renderStatBlock(sc, variant) {
    // variant: 'before' | 'after'
    const isAfter = variant === 'after';
    const bg = isAfter ? 'var(--cat-violet-500)' : 'var(--color-bg-surface-muted)';
    const labelColor = isAfter ? 'rgba(255,255,255,0.75)' : 'var(--color-text-muted)';
    const valueColor = isAfter ? '#fff' : 'var(--color-text-primary)';
    const noteColor = isAfter ? '#fff' : 'var(--color-text-muted)';

    if (sc.hasCloTable) {
      const note = isAfter ? sc.cloTable.afterNote : sc.cloTable.beforeNote;
      return `<div style="padding:12px 14px; background:${bg}; border-radius:var(--radius-sm);">
        <div style="font:var(--text-data-label); color:${labelColor}; margin-bottom:6px;">${esc(sc.cloTable.metricLabel)}</div>
        <div style="font:var(--text-body-sm); font-size:13px; color:${noteColor};">${esc(note)}</div>
      </div>`;
    }
    const value = isAfter ? sc.stat.after : sc.stat.before;
    const note = isAfter ? sc.stat.afterNote : sc.stat.beforeNote;
    return `<div style="padding:12px 14px; background:${bg}; border-radius:var(--radius-sm);">
      <div style="font:var(--text-data-label); color:${labelColor}; margin-bottom:2px;">${esc(sc.stat.metricLabel)}</div>
      <div style="font:var(--text-data-value); color:${valueColor}; font-size:17px; ${isAfter ? 'font-weight:600;' : ''}">${esc(value)}</div>
      <div style="font:var(--text-body-sm); font-size:13px; color:${noteColor}; margin-top:2px;">${esc(note)}</div>
    </div>`;
  }

  function zoomImg(src, alt, height) {
    height = height || 340;
    return `<img src="${src}" alt="${esc(alt)}" class="zoom-img" style="width:100%; height:${height}px; object-fit:contain; border-radius:10px; display:block; background:var(--color-bg-surface-muted); cursor:zoom-in;">`;
  }

  function renderCloRevealWeights(sc) {
    if (!sc.cloReveal.beforeRows) return '';
    return `
      <div style="padding:12px 14px; background:var(--color-bg-surface-muted); border-radius:var(--radius-sm);">
        <div style="font:var(--text-data-label); color:var(--color-text-muted); margin-bottom:6px;">${esc(sc.cloReveal.beforeWeights)}</div>
        ${sc.cloReveal.beforeRows.map((r) => `<div style="display:flex; justify-content:space-between; gap:12px; font:var(--text-data-value); color:var(--color-text-primary); font-size:15px;"><span>${esc(r.name)}</span><span>${esc(r.pct)}</span></div>`).join('')}
      </div>
      <div style="padding:12px 14px; background:var(--cat-violet-500); border-radius:var(--radius-sm);">
        <div style="font:var(--text-data-label); color:rgba(255,255,255,0.75); margin-bottom:6px;">${esc(sc.cloReveal.afterWeights)}</div>
        ${sc.cloReveal.afterRows.map((r) => `<div style="display:flex; justify-content:space-between; gap:12px; font:var(--text-data-value); color:#fff; font-size:15px; font-weight:600;"><span>${esc(r.name)}</span><span>${esc(r.pct)}</span></div>`).join('')}
      </div>`;
  }

  function renderExpanded(sc) {
    const initial = sc.name.charAt(0);
    const isDefaultReveal = !sc.hasCloReveal && !sc.hasNewDesignReveal && !sc.hasConfirmationReveal;
    sc.showFullWidthImages = isDefaultReveal && sc.imagesFullWidth !== false;
    sc.showInlineImages = isDefaultReveal && sc.imagesFullWidth === false;
    return `
      <div style="border-top:1px solid var(--color-border-subtle); padding:32px 24px 40px;">
        <div style="display:flex; flex-direction:column; gap:40px;">

          <div style="display:flex; gap:40px; align-items:flex-start;">
            <img src="${sc.avatarSrc}" alt="${esc(sc.name)}" style="width:280px; height:460px; flex-shrink:0; object-fit:cover; border-radius:12px; background:var(--color-bg-surface-muted);">
            <div style="flex:1; min-width:0; display:flex; flex-direction:column; gap:20px;">
              <div>
                <div style="font:var(--text-kicker-mono); color:var(--color-text-muted); letter-spacing:0.04em; margin-bottom:8px;">Course context</div>
                <p style="font:var(--text-body-sm); margin:0; line-height:1.6;">${esc(sc.courseContext)}</p>
              </div>
              <div>
                <div style="font:var(--text-kicker-mono); color:var(--color-text-muted); letter-spacing:0.04em; margin-bottom:8px;">The rationale for entering the tool</div>
                <p style="font:var(--text-body-sm); margin:0; line-height:1.6;">${esc(sc.rationale)}</p>
              </div>
              ${sc.decision ? `
              <div>
                <div style="font:var(--text-kicker-mono); color:var(--color-text-muted); letter-spacing:0.04em; margin-bottom:8px;">${esc(sc.decision.title)}</div>
                <p style="font:var(--text-body-sm); margin:0; line-height:1.6;">${esc(sc.decision.text)}</p>
              </div>` : ''}
              ${sc.hasCloReveal ? `
              ${sc.tableShotBeforeSrc ? `
              <div style="display:flex; flex-direction:column; gap:10px;">
                <div style="font:var(--text-kicker-mono); color:var(--color-text-muted); letter-spacing:0.04em;">Table inputs from the tool</div>
                <div style="display:grid; grid-template-columns:1fr 1fr; gap:16px;">
                  <div style="display:flex; flex-direction:column; gap:10px;">
                    <span style="font:var(--text-tag); color:var(--color-text-muted); text-transform:uppercase; letter-spacing:var(--tracking-tag);">Original mapping — produces this implied weight</span>
                    ${renderStatBlock(sc, 'before')}
                    ${zoomImg(sc.tableShotBeforeSrc, sc.name + "'s original mapping")}
                  </div>
                  <div style="display:flex; flex-direction:column; gap:10px;">
                    <span style="font:var(--text-tag); color:var(--color-accent-highlight); text-transform:uppercase; letter-spacing:var(--tracking-tag);">Revised mapping — implied weight now shifts</span>
                    ${renderStatBlock(sc, 'after')}
                    ${zoomImg(sc.tableShotAfterSrc, sc.name + "'s revised mapping")}
                  </div>
                </div>
              </div>` : ''}` : ''}
              ${sc.showInlineImages ? `
              <div style="display:flex; flex-direction:column; gap:10px;">
                <div style="font:var(--text-kicker-mono); color:var(--color-text-muted); letter-spacing:0.04em;">Table inputs from the tool</div>
                <div style="display:grid; grid-template-columns:1fr 1fr; gap:16px;">
                  <div style="display:flex; flex-direction:column; gap:10px;">
                    <span style="font:var(--text-tag); color:var(--color-text-muted); text-transform:uppercase; letter-spacing:var(--tracking-tag);">Original mapping — produces this implied weight</span>
                    ${renderStatBlock(sc, 'before')}
                    ${zoomImg(sc.tableShotBeforeSrc, sc.name + "'s original mapping")}
                  </div>
                  <div style="display:flex; flex-direction:column; gap:10px;">
                    <span style="font:var(--text-tag); color:var(--color-accent-highlight); text-transform:uppercase; letter-spacing:var(--tracking-tag);">Revised mapping — implied weight now shifts</span>
                    ${renderStatBlock(sc, 'after')}
                    ${zoomImg(sc.tableShotAfterSrc, sc.name + "'s revised mapping")}
                  </div>
                </div>
              </div>` : ''}
                </div>
          </div>

          ${sc.showFullWidthImages ? `
          <div style="display:flex; flex-direction:column; gap:10px;">
            <div style="font:var(--text-kicker-mono); color:var(--color-text-muted); letter-spacing:0.04em;">Table inputs from the tool</div>
            <div style="display:grid; grid-template-columns:1fr 1fr; gap:24px;">
              <div style="display:flex; flex-direction:column; gap:10px;">
                <span style="font:var(--text-tag); color:var(--color-text-muted); text-transform:uppercase; letter-spacing:var(--tracking-tag);">Original mapping — produces this implied weight</span>
                ${renderStatBlock(sc, 'before')}
                ${zoomImg(sc.tableShotBeforeSrc, sc.name + "'s original mapping")}
              </div>
              <div style="display:flex; flex-direction:column; gap:10px;">
                <span style="font:var(--text-tag); color:var(--color-accent-highlight); text-transform:uppercase; letter-spacing:var(--tracking-tag);">Revised mapping — implied weight now shifts</span>
                ${renderStatBlock(sc, 'after')}
                ${zoomImg(sc.tableShotAfterSrc, sc.name + "'s revised mapping")}
              </div>
            </div>
          </div>` : ''}

          ${(sc.showFullWidthImages || sc.showInlineImages) ? `
          <div style="border-top:1px solid var(--color-border-subtle); padding-top:28px;">
            ${renderImpactBand(sc)}
          </div>` : ''}

          ${sc.hasCloReveal ? `
          <div style="border-top:1px solid var(--color-border-subtle); padding-top:28px; display:flex; flex-direction:column; gap:20px;">
            <div>
              <div style="font:var(--text-kicker-mono); color:var(--color-accent-highlight); letter-spacing:0.04em; margin-bottom:8px;">The insight</div>
              ${sc.cloReveal.insightParagraphs.map((p) => `<p style="font:var(--text-body-sm); margin:0 0 14px; line-height:1.6;">${esc(p)}</p>`).join('')}
            </div>
            <div>
              <div style="font:var(--text-kicker-mono); color:var(--color-accent-highlight); letter-spacing:0.04em; margin-bottom:8px;">The redirect</div>
              ${sc.cloReveal.redirectParagraphs.map((p) => `<p style="font:var(--text-body-sm); margin:0 0 14px; line-height:1.6;">${esc(p)}</p>`).join('')}
            </div>
          </div>` : ''}

          ${sc.hasNewDesignReveal ? `
          <div style="display:flex; flex-direction:column; gap:10px;">
            <div style="font:var(--text-kicker-mono); color:var(--color-text-muted); letter-spacing:0.04em;">From the tool — building the mapping and reading the rubric composition</div>
            <div style="display:grid; grid-template-columns:0.85fr 0.85fr 1.3fr; gap:16px;">
              ${sc.newDesign.images.map((img) => `
                <div style="display:flex; flex-direction:column; gap:10px; min-width:0;">
                  ${zoomImg(img.src, img.id, 320)}
                </div>`).join('')}
            </div>
          </div>
          <div style="border-top:1px solid var(--color-border-subtle); padding-top:28px; display:flex; flex-direction:column; gap:20px;">
            <div>
              <div style="font:var(--text-kicker-mono); color:var(--color-accent-highlight); letter-spacing:0.04em; margin-bottom:8px;">The rubric composition question</div>
              ${sc.newDesign.rubricParagraphs.map((p) => `<p style="font:var(--text-body-sm); margin:0 0 14px; line-height:1.6;">${esc(p)}</p>`).join('')}
            </div>
            <div>
              <div style="font:var(--text-kicker-mono); color:var(--color-accent-highlight); letter-spacing:0.04em; margin-bottom:8px;">What the new design process reveals</div>
              ${sc.newDesign.closingParagraphs.map((p) => `<p style="font:var(--text-body-sm); margin:0 0 14px; line-height:1.6;">${esc(p)}</p>`).join('')}
            </div>
          </div>` : ''}

          ${sc.hasConfirmationReveal ? `
          <div style="display:flex; flex-direction:column; gap:10px;">
            <span style="font:var(--text-tag); color:var(--color-accent-highlight); text-transform:uppercase; letter-spacing:var(--tracking-tag);">${esc(sc.confirmation.imageLabel)}</span>
            <div style="padding:12px 14px; background:var(--cat-violet-500); border-radius:var(--radius-sm); font:var(--text-data-value); color:#fff;">
              <div style="font:var(--text-data-label); color:rgba(255,255,255,0.75); margin-bottom:2px;">${esc(sc.confirmation.metricLabel)}</div>
              <div style="font-size:17px; font-weight:600;">${esc(sc.confirmation.value)}</div>
              <div style="font:var(--text-body-sm); font-size:13px; color:#fff; margin-top:2px;">${esc(sc.confirmation.note)}</div>
            </div>
            ${zoomImg(sc.confirmation.imageSrc, sc.confirmation.placeholder)}
          </div>
          <div style="border-top:1px solid var(--color-border-subtle); padding-top:28px; display:flex; flex-direction:column; gap:20px;">
            <div>
              <div style="font:var(--text-kicker-mono); color:var(--color-accent-highlight); letter-spacing:0.04em; margin-bottom:8px;">The confirmation</div>
              ${sc.confirmation.confirmationParagraphs.map((p) => `<p style="font:var(--text-body-sm); margin:0 0 14px; line-height:1.6;">${esc(p)}</p>`).join('')}
            </div>
            <div>
              <div style="font:var(--text-kicker-mono); color:var(--color-accent-highlight); letter-spacing:0.04em; margin-bottom:8px;">What the tool is building toward</div>
              ${sc.confirmation.buildingTowardParagraphs.map((p) => `<p style="font:var(--text-body-sm); margin:0 0 14px; line-height:1.6;">${esc(p)}</p>`).join('')}
            </div>
          </div>` : ''}

        </div>
      </div>`;
  }

  function renderScenarioCard(sc) {
    const isOpen = !!state.open[sc.id];
    const chevron = isOpen ? 'rotate(180deg)' : 'rotate(0deg)';
    return `
      <div style="background:var(--color-bg-surface); border:1px solid var(--color-border-subtle); border-radius:var(--radius-md); box-shadow:var(--shadow-panel); overflow:hidden;">
        <div data-toggle="${sc.id}" style="display:flex; align-items:center; justify-content:space-between; gap:16px; padding:16px 24px; cursor:pointer;">
          <div style="display:flex; align-items:center; gap:16px;">
            <div style="width:48px; height:48px; flex-shrink:0; border-radius:50%; overflow:hidden; background:var(--color-bg-surface-muted);">
              <img src="${sc.avatarSrc}" alt="${esc(sc.name)}" style="width:48px; height:48px; object-fit:cover; display:block;">
            </div>
            <div style="display:flex; flex-direction:column; gap:4px;">
              <span style="font-weight:600; font-size:17px;">${esc(sc.name)}</span>
              <div style="display:flex; align-items:center; gap:10px;">
                <span style="font:var(--text-tag); letter-spacing:var(--tracking-tag); padding:5px 12px; border-radius:var(--radius-pill); background:var(--color-badge-bg); color:var(--color-badge-text);">${esc(sc.discipline)}</span>
                <span style="font:var(--text-tag); color:var(--color-text-muted);">${esc(sc.pathway)}</span>
              </div>
            </div>
          </div>
          <span style="font-size:20px; color:var(--color-text-muted); font-family:var(--font-mono); transform:${chevron}; transition:transform 200ms ease-out; display:inline-block;">⌄</span>
        </div>
        ${isOpen ? renderExpanded(sc) : ''}
      </div>`;
  }

  function renderContext() {
    const ctx = RAW_CONTEXTS.find((c) => c.id === state.activeContext);
    if (!ctx) return '';
    const hasScenarios = ctx.scenarios.length > 0;
    const scenarioCountLabel = ctx.scenarios.length === 1 ? '1 scenario' : `${ctx.scenarios.length} scenarios`;
    return `
      <div style="display:flex; flex-direction:column; gap:24px;">
        <div style="padding-bottom:20px;">
          <div style="font:var(--text-kicker-mono); letter-spacing:0.04em; color:var(--color-accent-highlight); margin-bottom:8px;">${esc(ctx.eyebrow)}</div>
          <h2 style="font:var(--text-h2); margin:0 0 8px;">${esc(ctx.title)}</h2>
          <p style="font:var(--text-body-sm); color:var(--color-text-muted); margin:0; max-width:680px;">${esc(ctx.blurb)}</p>
          <span style="display:inline-block; font:var(--text-tag); color:#fff; background:var(--color-accent-highlight); letter-spacing:var(--tracking-tag); text-transform:uppercase; padding:5px 12px; border-radius:var(--radius-pill); margin-top:12px;">${scenarioCountLabel}</span>
        </div>
        ${hasScenarios ?
          `<div style="display:flex; flex-direction:column; gap:16px;">${ctx.scenarios.map((sc) => renderScenarioCard(sc)).join('')}</div>` :
          `<div style="border:1px solid var(--color-border-subtle); border-radius:var(--radius-md); padding:32px 24px; background:var(--color-bg-surface);">
            <p style="font:var(--text-display-italic); color:var(--color-text-muted); margin:0;">Scenarios for this pathway are being written — check back soon.</p>
          </div>`}
      </div>`;
  }

  function render() {
    const root = document.getElementById('scenarios-root');
    root.innerHTML = `
      <div style="min-height:100vh; background:var(--color-bg-page); font-family:var(--font-sans); color:var(--color-text-primary);">
        <div style="max-width:var(--maxw); margin:0 auto; padding:64px var(--gutter) 40px;">
          <h1 style="font:var(--text-h1); margin:0 0 16px; max-width:820px;">How educators use the <span class="cat-letter">C</span><span class="cat-letter">A</span><span class="cat-letter">T</span></h1>
          <p style="font:var(--text-display-italic); color:var(--color-text-muted); margin:0; max-width:640px; font-size:24px;">Real narratives of what the tool surfaces. Select the context your design need matches.</p>
        </div>
        <div style="max-width:var(--maxw); margin:0 auto; padding:8px var(--gutter) 0;">
          <div style="display:flex; gap:12px; flex-wrap:wrap; border-bottom:1px solid var(--color-border-subtle); padding-bottom:24px;">
            ${renderTabs()}
          </div>
        </div>
        <div style="max-width:var(--maxw); margin:0 auto; padding:40px var(--gutter) 96px; display:flex; flex-direction:column; gap:64px;">
          ${renderContext()}
        </div>
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
    lb.addEventListener('click', (e) => {
      if (e.target.id !== 'scenarios-lightbox-img') closeLightbox();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeLightbox();
    });
    return lb;
  }

  function openLightbox(src) {
    const lb = ensureLightbox();
    document.getElementById('scenarios-lightbox-img').src = src;
    lb.style.display = 'flex';
  }

  function closeLightbox() {
    const lb = document.getElementById('scenarios-lightbox');
    if (lb) lb.style.display = 'none';
  }

  function applyHash() {
    const id = location.hash.replace('#', '');
    if (id && RAW_CONTEXTS.some((c) => c.id === id)) {
      state.activeContext = id;
    }
  }

  function init() {
    applyHash();
    render();
    window.addEventListener('hashchange', () => { applyHash(); render(); });
    document.getElementById('scenarios-root').addEventListener('click', (e) => {
      const zoomEl = e.target.closest('img.zoom-img');
      if (zoomEl) {
        openLightbox(zoomEl.src);
        return;
      }
      const tabEl = e.target.closest('[data-tab]');
      if (tabEl) {
        state.activeContext = tabEl.getAttribute('data-tab');
        render();
        return;
      }
      const toggleEl = e.target.closest('[data-toggle]');
      if (toggleEl) {
        const id = toggleEl.getAttribute('data-toggle');
        state.open[id] = !state.open[id];
        render();
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
