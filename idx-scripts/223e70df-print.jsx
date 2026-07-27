/* CAT Landing page sections */

function Hero() {
  return (
    <section className="hero">
      <div className="container">
        <div className="hero-top">
          <div className="hero-top-left">
            <div className="hero-logo-center">
              <img className="hero-logo-img" src="data:image/png;base64,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" alt="" aria-hidden="true" />
              <h1 className="hero-title">
                The <span className="cat-letter">C</span>onstructive <span className="cat-letter">A</span>lignment <span className="cat-letter">T</span>ool
              </h1>
            </div>
            <p className="hero-sub">
              See a course the way students experience it.
            </p>
          </div>
          <div className="hero-top-right">
            <p className="hero-lede">
              A course is designed to work a certain way: each learning outcome given a certain weighting, taught and assessed accordingly. The CAT compares that weighting against the assignments, rubrics, and mapping that actually deliver it, and shows you exactly where things stand.
              It might confirm the design is working as intended. It might reveal a gap worth addressing. Either way, you'll
              know, rather than assume.
            </p>
            <div className="hero-top-actions">
              <p className="hero-research-note">
                <span className="hero-research-dot" aria-hidden="true"></span>
                The CAT is an educational research project. The tool is free to use; research participation is separate and voluntary. <a href="#research">About the research</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>);
}

function OverviewCells() {
  const contexts = [
    { num: '01', tag: 'Verification', title: 'Examine a course already in delivery', body: 'Check whether the CLO emphasis intended is what the assignments actually measure, a useful step before the course next runs.', contextId: 'verifying' },
    { num: '02', tag: 'Refinement', title: 'Test revisions before committing', body: 'See how a proposed change to an assignment, rubric, or CLO propagates through the rest of the course structure before you lock it in.', contextId: 'refining' },
    { num: '03', tag: 'New design', title: 'Build alignment from the start', body: 'Begin from whichever component is clearest, outcomes, assignments, or rubric criteria, and let the derivations scaffold the rest.', contextId: 'designing' },
  ];
  const terms = [
    { term: 'Course', def: 'A single taught unit, sometimes called a subject, paper, module, or unit of study depending on your institution. In this tool, one course = one set of CLOs and one assessment structure.' },
    { term: 'CLO', def: 'Course Learning Outcome. A statement of what a student is expected to demonstrate by the end of the course. Different institutions use LO, ULO, UO, or ILO for the same concept.' },
    { term: 'Assignment', def: 'Any summative assessment task, an essay, exam, project, presentation, portfolio, etc. The CAT treats each graded task as a single assignment with a percentage weight.' },
    { term: 'Rubric', def: 'The marking guide for an assignment. Each criterion in the rubric can be tagged to one or more CLOs. Pathway B uses these tags to calculate the implied CLO emphasis.' },
  ];
  const cells = [
    { key: 'what', num: '01', eyebrow: 'The tool', title: 'What the CAT does' },
    { key: 'when', num: '02', eyebrow: 'Start here', title: 'When to use it' },
    { key: 'why', num: '03', eyebrow: 'The payoff', title: 'Why it matters' },
  ];
  return (
    <section className="explore-band" id="how">
      <div className="container">
        <div className="explore-head">
          <span className="eyebrow explore-eyebrow" style={{fontSize:'22px',color:'#FFFFFF',fontWeight:800,letterSpacing:'0.02em'}}>01 · The best way to learn the CAT is to use it</span>
          <p className="explore-lede"></p>
        </div>
        {cells.map((c) => (
          <div key={c.key} style={{ marginTop: c.key === 'what' ? 0 : 40 }}>
            <div className="explore-tab is-active" style={{ cursor: 'default', marginBottom: 12 }}>
              <span className="explore-num mono">{c.num}</span>
              <span className="explore-trigger-text">
                <span className="explore-trigger-eyebrow mono">{c.eyebrow}</span>
                <span className="explore-trigger-title">{c.title}</span>
              </span>
            </div>
            <div className="explore-window" style={{ animation: 'none' }}>
              <div className="explore-panel-inner">
                {c.key === 'what' &&
                <React.Fragment>
                    <p className="explore-panel-sub">Two pathways, one relationship between outcomes and assessment.</p>
                    <div className="what-summary">
                      <p className="what-summary-text"><strong>Pathway A</strong> starts from your CLO weightings and mapping, and derives the assignment weights and rubric composition they imply.<br /><strong>Pathway B</strong> starts from your assignments and rubrics, and derives the CLO emphasis they actually deliver.</p>
                      <EssenceStage />
                      <div className="what-summary-insights">
                        <PrincipleAccordion title="A CLO's weighting is a claim about how much of the assessment measures it." triggerStyle={{color:'var(--c-red)',backgroundColor:'var(--c-red-soft)'}} tagColor="var(--c-red)" defaultOpen>
                          <p className="principle-body">If a learning outcome is <strong>40% of a course</strong>, then <strong>40% of the assessed marks</strong> should measure it. CLO weightings and the way they're distributed across assignments are two views of the same emphasis. The CAT makes that relationship explicit, and shows how closely the current design holds to it.</p>
                          <PrincipleWeightingViz />
                        </PrincipleAccordion>
                        <PrincipleAccordion title="The mapping and the teaching sequence are the same decision." triggerStyle={{color:'var(--c-red-2)',backgroundColor:'var(--c-red-2-soft)'}} tagColor="var(--c-red-2)" defaultOpen>
                          <p className="principle-body">Whatever approach you use to map a CLO, the highest value in its row marks where the outcome carries its greatest assessment demand. That is where the teaching sequence, the tutorial design, the lecture design, the LMS design, and any other resources tied to that outcome, must have done its most important work. Change the highest value and the teaching deadline moves. The mapping is not an administrative exercise, it is a commitment about how the course is taught, expressed as a number in a table.</p>
                          <div className="mapping-sequence-visual">
                            <img src="../uploads/CAT_Mapping_Sequence_v3.jpg" alt="Two mapping examples showing how the highest value in a CLO row sets the teaching deadline in the weekly coverage chart" />
                          </div>
                        </PrincipleAccordion>
                      </div>
                    </div>
                  </React.Fragment>}
                {c.key === 'when' &&
                <React.Fragment>
                    <p className="explore-panel-sub">Which of these matches where the course sits right now?</p>
                    <div className="explore-contexts">
                      {contexts.map((ctx, ci) => (
                        <a className="uci-card explore-uci" href={`scenarios.html#${ctx.contextId}`} key={ci}>
                          <span className="mono uci-num">{ctx.num}</span>
                          <div className="uci-tag mono">{ctx.tag}</div>
                          <h3 className="uci-title">{ctx.title}</h3>
                          <p className="uci-body">{ctx.body}</p>
                          <span className="uci-link mono">See real scenarios
                            <svg width="12" height="12" viewBox="0 0 14 14" fill="none"><path d="M3 7h8m0 0L7.5 3.5M11 7l-3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                          </span>
                        </a>
                      ))}
                    </div>
                    <div className="explore-terms" style={{backgroundColor:'#D315693D'}}>
                      <span className="explore-terms-label mono">Key terms used in this tool</span>
                      <div className="explore-terms-grid">
                        {terms.map((t, ti) => (
                          <div className="explore-term" key={ti}>
                            <span className="explore-term-name mono">{t.term}</span>
                            <span className="explore-term-def">{t.def}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </React.Fragment>}
                {c.key === 'why' &&
                <React.Fragment>
                    <p className="explore-panel-sub" style={{color:'#8E84E4',fontWeight:700}}>What clarity at the start leads to, for the educator and the student.</p>
                    <BenefitsWrap />
                  </React.Fragment>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>);
}

// ─── Theme visuals ───

function ClarityViz() {
  const intended = [{ n: 'Assignment 1', v: 30 }, { n: 'Assignment 2', v: 40 }, { n: 'Assignment 3', v: 30 }];
  const actual = [{ n: 'Assignment 1', v: 28 }, { n: 'Assignment 2', v: 47 }, { n: 'Assignment 3', v: 25 }];
  const colors = ['#140F50', '#5B3DF5', '#836BFF'];
  const boundary = (data) => data[0].v + data[1].v;
  const Row = ({ label, sub, data, showDrift }) => (
    <div className="clarity-row">
      <div className="clarity-row-label">{label}<span>{sub}</span></div>
      <div className="clarity-bar-wrap">
        <div className="clarity-bar">
          {data.map((d, i) => (
            <div key={i} className="clarity-seg" style={{ width: d.v + '%', background: colors[i] }}>
              {d.v} hrs
              <span className="clarity-seg-name">{d.n}</span>
            </div>
          ))}
        </div>
        <div className="clarity-bar-divider" style={{ left: boundary(data) + '%' }} />
        {showDrift && <span className="clarity-drift-tag" style={{ left: `calc(${boundary(data)}% - 8px)` }}>+7 hrs drift</span>}
      </div>
    </div>
  );
  return (
    <div className="clarity-viz">
      <span className="mono clarity-tag">Illustrative example · Verification</span>
      <Row label="Intended" sub="(100 hrs)" data={intended} />
      <Row label="Actual" sub="(100 hrs)" data={actual} showDrift />
      <p className="clarity-caption">The teaching academic intended the distribution to be as the top row, and importantly, resourced the course to run in that way. However, what the mapping revealed is that seven hours drifted into the middle task. The educator thought students had more time for the last task than what they actually had. This began to explain why students had not achieved as well as the educator thought they should have in their final assignment.</p>
    </div>
  );
}

function RubricViz() {
  return (
    <div className="confidence-viz">
      <div className="rubric-compare">
        <div className="rubric-compare-col">
          <span className="mono cv-label">Numeric rubric</span>
          <div className="rubric-crit-bar">
            <span style={{ width: '30%', background: '#5B3DF5' }}>30%</span>
            <span style={{ width: '70%', background: 'var(--c-bg-3)' }} />
          </div>
          <p className="rubric-compare-note">Criteria tagged to CLO1 sum to 30% of the marks.</p>
        </div>
        <div className="rubric-compare-col">
          <span className="mono cv-label">Qualitative marking guide</span>
          <div className="rubric-dots">
            {Array.from({ length: 10 }).map((_, i) => <i key={i} className={i < 3 ? 'is-on' : ''} />)}
          </div>
          <p className="rubric-compare-note">No marks tied to outcomes, so 3 of 10 questions target CLO1 instead.</p>
        </div>
      </div>
      <p className="clarity-caption">Same 30% figure, two different levers. It sets the target whether the rubric counts marks or not.</p>
    </div>
  );
}

function ResourcingViz() {
  const before = [{ w: 18, c: '#A99BF2' }, { w: 42, c: '#836BFF' }, { w: 25, c: '#5B3DF5' }, { w: 15, c: '#140F50' }];
  const after = [{ w: 25, c: '#A99BF2' }, { w: 25, c: '#836BFF' }, { w: 25, c: '#5B3DF5' }, { w: 25, c: '#140F50' }];
  const Row = ({ label, data }) => (
    <div className="cv-row">
      <span className="mono cv-label">{label}</span>
      <div className="cv-bar">{data.map((d, i) => <span key={i} style={{ width: d.w + '%', background: d.c }} />)}</div>
    </div>
  );
  return (
    <div className="confidence-viz">
      <Row label="Tutorial design allocated by guesswork" data={before} />
      <Row label="Tutorial design to match emphasis" data={after} />
    </div>
  );
}

function FairnessViz() {
  const colors = ['#A99BF2', '#836BFF', '#5B3DF5', '#140F50'];
  const before = [[45, 20, 20, 15], [40, 25, 20, 15], [45, 20, 20, 15], [42, 23, 20, 15], [45, 20, 20, 15], [40, 25, 20, 15]];
  const after = [[25, 25, 25, 25], [25, 25, 25, 25], [25, 25, 25, 25], [25, 25, 25, 25], [25, 25, 25, 25], [25, 25, 25, 25]];
  const Chart = ({ title, data }) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, flex: 1 }}>
      <span className="mono" style={{ fontSize: 11, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--c-muted)' }}>{title}</span>
      <div style={{ display: 'flex', gap: 4, alignItems: 'flex-end', height: 90 }}>
        {data.map((week, i) => (
          <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column-reverse', height: '100%', borderRadius: 3, overflow: 'hidden' }}>
            {week.map((v, j) => <div key={j} style={{ height: v + '%', background: colors[j] }} />)}
          </div>
        ))}
      </div>
    </div>
  );
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', gap: 24 }}>
        <Chart title="Before" data={before} />
        <Chart title="After" data={after} />
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px 14px' }}>
        {['CLO 1', 'CLO 2', 'CLO 3', 'CLO 4'].map((l, i) => (
          <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 10.5, color: 'var(--c-muted)' }}>
            <i style={{ width: 8, height: 8, borderRadius: 2, background: colors[i], display: 'inline-block' }} />{l}
          </span>
        ))}
      </div>
      <p style={{ margin: 0, fontFamily: 'var(--f-display)', fontStyle: 'italic', fontSize: 13.5, lineHeight: 1.5, color: 'var(--c-body)' }}>Each week carries a fixed teaching budget. Understanding where the emphasis needs to be means students have a fair chance at achieving what the course intends them to achieve.</p>
    </div>
  );
}

function ConfidencePoint({ tag, title, body, children }) {
  return (
    <div className="conf-point">
      <span className="mono conf-point-tag">{tag}</span>
      <h4 className="conf-point-title">{title}</h4>
      <p className="conf-point-body">{body}</p>
      {children && <div className="conf-point-viz">{children}</div>}
    </div>
  );
}

function BenefitsWrap() {
  return (
    <div className="benefits-wrap">
          <div className="theme-card full" id="stage-clarity">
            <div className="theme-main">
              <span className="theme-num mono">01</span>
              <h3 className="theme-title">See what is actually happening</h3>
              <p className="theme-body">
                A teaching academic designs a course to direct student effort a certain way, so much weight on each
                task. The CAT compares that intention against where students are actually spending
                their time, bringing clarity to whether the design is landing as planned or effort has
                quietly drifted elsewhere. Either way, it is verified, not assumed, and that is what
                everything else here is built on.
              </p>
            </div>
            <div className="theme-viz"><ClarityViz /></div>
          </div>

          <div className="theme-grid" id="stage-confidence">
            <div className="theme-card">
              <div className="theme-head"><span className="theme-num mono">02</span><h3 className="theme-title">Design rubrics and marking guides with confidence</h3></div>
              <p className="theme-body">
                Criteria mapped to 30% of a CLO means two things: rubric criteria tied to that
                outcome should sum to 30%, and, even without a numeric rubric, roughly 30% of the
                questions or tasks should target it. The emphasis is explicit before a single
                criterion is written.
              </p>
              <div className="theme-viz"><RubricViz /></div>
            </div>
            <div className="theme-card span-2">
              <div className="theme-head"><span className="theme-num mono">03</span><h3 className="theme-title">Test changes before students do</h3></div>
              <p className="theme-body">
                A change to a rubric, assignment weight or CLO mapping can be modelled and checked
                before the course goes live, so the first time it's tried isn't on a live cohort.
                Students aren't the pilot study.
              </p>
              <div className="theme-viz">
                <img className="theme-chart" src="../uploads/pasted-1784260324139-0.png" alt="Where CLO 1 lived in the course -- and where it now needs to live" />
                <p className="chart-explainer">A proposed change to CLO 1's weighting will clearly affect the design of the learning sequence, so the impact is visible before anything is touched.</p>
              </div>
            </div>
          </div>
          <div className="record-row">
            <div className="theme-card no-stretch record-partner">
              <div className="theme-head"><span className="theme-num mono">04</span><h3 className="theme-title">Put effort where it actually belongs</h3></div>
              <p className="theme-body">
                This isn't only about saving time, it's about being efficient with the effort that
                goes into building the course, tutorial design and how the LMS is designed. When
                resourcing for a topic matches its actual weight, students get a better deal.
              </p>
              <div className="theme-viz"><ResourcingViz /></div>
              <div className="theme-viz">
                <p className="chart-explainer">When the influence of an outcome is better understood across the course, how the related content should be resourced in an LMS is made more visible.</p>
                <img className="theme-chart theme-chart-wide" style={{ objectPosition: 'left center' }} src="../uploads/CAT_LMS_Resource_v3.jpg" alt="LMS resource coverage before and after -- distribution of week-by-week content across the semester" />
                <p className="chart-explainer">The visibility of the mapping of an outcome shows that it is assessed in all 3 assignments, and so should have some influence across the weekly LMS design, and not just in week 1.</p>
              </div>
            </div>
            <div className="theme-card record-fit">
              <div className="theme-head"><span className="theme-num mono">05</span><h3 className="theme-title">A record, ready when needed</h3></div>
              <p className="theme-body">
                A clear basis to bring to course review, accreditation, or a program director, plus a
                continuity record for handover and evidence of deliberate design for a teaching
                portfolio.
              </p>
              <div className="theme-viz">
                <img className="theme-chart theme-chart-record" src="../uploads/CAT_Record_v2.jpg" alt="CAT Pathway A export -- CLO weightings, mapping, assignment weightings and rubric composition" />
              </div>
            </div>
          </div>

          <div className="finale-row">
            <div className="theme-card finale-wide" id="stage-ease">
              <div className="theme-head"><span className="theme-num mono">06</span><h3 className="theme-title">A shared, evidence-led conversation</h3></div>
              <p className="theme-body">
                Carrying that clarity and confidence into the room changes the conversation with the
                curriculum designer, and their experience of it too. A common view of the same evidence
                turns the constructive alignment conversation into a shared look at the course, not a
                negotiation over opinion. It gives space to think a change through and see how it
                ripples across the whole course, in the room, together.
              </p>
              <div className="theme-viz">
                <img className="theme-chart theme-chart-short" src="../uploads/CAT_Collaboration_v2.jpg" alt="Teaching academic and curriculum designer looking at shared CLO weightings on one screen" />
                <p className="research-why">"A shared reference point that makes a hard conversation easier, for both people in the room."</p>
              </div>
            </div>

            <div className="theme-card full" id="stage-fairness">
              <div className="theme-main">
                <span className="theme-num mono">07</span>
                <h3 className="theme-title">The outcome that matters most</h3>
                <p className="theme-body">
                  A fair and efficient distribution of effort and resourcing across a course means students
                  can trust that the work they put in lands where it's meant to. No unexpected assessment
                  bunching, no hidden workload, and a clearer sense of why each task matters.
                </p>
              </div>
              <div className="theme-viz"><FairnessViz /></div>
            </div>
          </div>
    </div>);
}

function PrincipleAccordion({ title, children, defaultOpen, triggerStyle, titleStyle, tagColor }) {
  const [open, setOpen] = React.useState(true);
  return (
    <div className={`accordion-item principle-accordion-item ${open ? 'is-open' : ''}`}>
      <button className="accordion-trigger" onClick={() => setOpen(!open)} style={triggerStyle}>
        <span className="accordion-tag mono" style={{color:tagColor || '#836BFF',fontWeight:800}}>Principle</span>
        <span className="accordion-title-wrap">
          <span className="accordion-title" style={titleStyle}>{title}</span>
        </span>
        <svg className="accordion-chev" width="14" height="14" viewBox="0 0 12 12" fill="none"><path d="M2.5 4.5l3.5 3.5 3.5-3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </button>
      <div className="accordion-panel">
        <div className="accordion-panel-inner">
          <div className="accordion-panel-body principle-accordion-body">{children}</div>
        </div>
      </div>
    </div>
  );
}

function PrincipleWeightingViz() {
  const clos = [{ n: 'CLO 1', v: 40, c: '#140F50' }, { n: 'CLO 2', v: 30, c: '#1448FF' }, { n: 'CLO 3', v: 20, c: '#836BFF' }, { n: 'CLO 4', v: 10, c: '#3B2FAA' }];
  return (
    <div className="principle-visual">
      <div className="principle-cols">
        <div className="principle-col">
          <span className="mono principle-col-head">CLO weighting</span>
          {clos.map((c, i) => (
            <div className="principle-row" key={i}>
              <span className="mono principle-row-label">{c.n}</span>
              <div className="principle-bar"><div style={{ width: c.v + '%', background: c.c }} /></div>
              <span className="mono principle-row-val">{c.v}%</span>
            </div>
          ))}
        </div>
        <div className="principle-col">
          <span className="mono principle-col-head">Assignment emphasis</span>
          {clos.map((c, i) => (
            <div className="principle-row" key={i}>
              <span className="mono principle-row-label">{c.n}</span>
              <div className="principle-bar"><div style={{ width: c.v + '%', background: c.c }} /></div>
              <span className="mono principle-row-val">{c.v}%</span>
            </div>
          ))}
        </div>
      </div>
      <div className="principle-match mono">= the two distributions must match</div>
    </div>
  );
}

function IterationImage() {
  const rows = ['A1 Essay', 'A2 Project', 'A3 Exam'];
  const before = [30, 20, 50], after = [50, 100, 0];
  const Arrow = ({ color }) => (
    <div className="iter-img-arrow" aria-hidden="true">
      <svg width="26" height="16" viewBox="0 0 26 16" fill="none"><path d="M2 8h18m0 0l-5-5m5 5l-5 5" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
    </div>
  );
  return (
    <div className="iter-img">
      <div className="iter-img-col">
        <span className="mono iter-img-tag">Before · original mapping</span>
        {rows.map((r, i) => (
          <div className="iter-img-row" key={i}>
            <span className="mono iter-img-label">CLO1 → {r}</span>
            <div className="iter-img-bar"><div style={{ width: before[i] + '%', background: 'var(--c-muted)' }} /></div>
            <span className="mono iter-img-val">{before[i]}</span>
          </div>
        ))}
      </div>
      <Arrow color="var(--c-hairline-2)" />
      <div className="iter-img-col">
        <span className="mono iter-img-tag">Proposed change</span>
        {rows.map((r, i) => (
          <div className="iter-img-row" key={i}>
            <span className="mono iter-img-label">CLO1 → {r}</span>
            <div className="iter-img-bar">
              <div className="iter-img-ghost" style={{ width: before[i] + '%' }} />
              <div style={{ width: after[i] + '%', background: 'var(--c-purple)' }} />
            </div>
            <span className="mono iter-img-val" style={{ color: 'var(--c-purple)' }}>{after[i] - before[i] > 0 ? '+' : ''}{after[i] - before[i]}</span>
          </div>
        ))}
      </div>
      <Arrow color="var(--c-bright)" />
      <div className="iter-img-col">
        <span className="mono iter-img-tag">After · result</span>
        {rows.map((r, i) => (
          <div className="iter-img-row" key={i}>
            <span className="mono iter-img-label">CLO1 → {r}</span>
            <div className="iter-img-bar"><div style={{ width: after[i] + '%', background: 'var(--c-ink)' }} /></div>
            <span className="mono iter-img-val">{after[i]}</span>
          </div>
        ))}
        <p className="iter-img-note">CLO1's implied emphasis moves from 18% to 30%, now matching intent.</p>
      </div>
    </div>
  );
}

function StaticPanel({ label, caption, children }) {
  return (
    <div className="scroll-demo">
      <div className="scroll-demo-stage">{children}</div>
      <div className="scroll-demo-strip">
        <div className="demo-label"><span className="demo-dot" style={{ background: 'var(--c-hairline-2)' }} /><span className="mono demo-label-text">{label}</span></div>
        <div className="demo-caption">{caption}</div>
      </div>
    </div>
  );
}

function AccordionItem({ tag, title, note, defaultOpen, children }) {
  const [open, setOpen] = React.useState(!!defaultOpen);
  return (
    <div className={`accordion-item ${open ? 'is-open' : ''}`}>
      <button className="accordion-trigger" onClick={() => setOpen((o) => !o)} aria-expanded={open}>
        <span className="mono accordion-tag">{tag}</span>
        <span className="accordion-title-wrap">
          <span className="accordion-title">{title}</span>
          <span className="accordion-note">{note}</span>
        </span>
        <svg className="accordion-chev" width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 6l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </button>
      <div className="accordion-panel">
        <div className="accordion-panel-inner">
          <div className="accordion-panel-body">{children}</div>
        </div>
      </div>
    </div>);
}

function EssenceStage() {
  return (
    <div className="essence-stage">
      <HeroDemo progress={1} playing={false} />
    </div>);
}

function Research() {
  return (
    <section className="research" id="research">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">02 · Contributing to the research</span>
          <h2 className="section-title" style={{ fontSize: 40 }}><span style={{color:'#836BFF'}}>Help us research the effectiveness of the CAT</span></h2>
          <p className="section-lede" style={{ maxWidth: 720 }}>As a curriculum designer, you're the one who brings teaching academics to the CAT — and your work with them is what makes this research possible. <span className="research-pending-dot"></span><em>Ethics approval for this study is still pending.</em> For now, we're only gathering expressions of interest.</p>
          <p className="research-voluntary"><strong>Use of the tool is open and unconditional.</strong> Registering interest commits you to nothing, and research participation will always be entirely voluntary.</p>
        </div>

        <div className="research-grid">
          <div className="research-card is-dark">
            <div className="research-card-head">
              <span className="mono research-tag"></span>
              <h3 className="research-title">Stage 1 - Your experience as a curriculum designer</h3>
            </div>
            <p className="research-body">Once ethics approval is granted you will be invited to complete a brief anonymous survey about your confidence in supporting teaching academics through the constructive alignment process and your reflections on the tool itself. Register your interest now and we will be in touch once the study is live.</p>
            <a href="https://forms.office.com/Pages/ResponsePage.aspx?id=QN_Ns1SWJkqGoXecUfacSCALdXuuzT5Nr4z-edJ4AwRUMFMzWFVNVVhHOVc5UVNQUEczUkRQQ01DWi4u" target="_blank" rel="noopener" className="btn btn-primary btn-on-dark">
              Register your interest
              <svg className="arrow" width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 7h8m0 0L7.5 3.5M11 7l-3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </a>
          </div>
          <div className="research-card">
            <div className="research-card-head">
              <span className="mono research-tag"></span>
              <h3 className="research-title">Stage 2 - the Teaching Academic's experience</h3>
            </div>
            <p className="research-body">You also play a key role in a related but separate study. Before your next CAT-supported session, we will ask whether you would be willing to check if the teaching academic you are working with would like to participate in a short interview about their understanding of course design. The interview explores how their thinking about alignment develops through working with the CAT tool. Their participation is entirely separate from yours and entirely their choice.</p>
          </div>
        </div>

      </div>
    </section>);
}

Object.assign(window, { Hero, OverviewCells, Research });

