// Bussola AI — interactive quiz
const { useState: useStateB, useReducer: useReducerB, useEffect: useEffectB } = React;

const computeArchetype = (answers) => {
  const totals = { accel: 0, stato: 0, univ: 0, coop: 0 };
  answers.forEach((idx, qi) => {
    if (idx == null) return;
    const w = BUSSOLA_QUESTIONS[qi].options[idx].w;
    Object.keys(totals).forEach((k) => { totals[k] += w[k]; });
  });
  const max = BUSSOLA_QUESTIONS.length * 2;
  const norm = {
    accel: totals.accel / max,
    stato: totals.stato / max,
    univ: totals.univ / max,
    coop: totals.coop / max,
  };
  let best = BUSSOLA_ARCHETYPES[0], bestD = Infinity;
  BUSSOLA_ARCHETYPES.forEach((a) => {
    const tp = { accel: a.pos.accel / 2, stato: a.pos.stato / 2, univ: a.pos.univ / 2, coop: a.pos.coop / 2 };
    const d = Math.sqrt(Object.keys(tp).reduce((s, k) => s + Math.pow(tp[k] - norm[k], 2), 0));
    if (d < bestD) { bestD = d; best = a; }
  });
  return { archetype: best, vector: norm, raw: totals };
};

const BussolaPage = () => {
  const [step, setStep] = useStateB("intro"); // intro | quiz | result
  const [answers, setAnswers] = useStateB(Array(BUSSOLA_QUESTIONS.length).fill(null));
  const [qIdx, setQIdx] = useStateB(0);

  const result = step === "result" ? computeArchetype(answers) : null;

  const select = (i) => {
    const next = [...answers];
    next[qIdx] = i;
    setAnswers(next);
    setTimeout(() => {
      if (qIdx < BUSSOLA_QUESTIONS.length - 1) setQIdx(qIdx + 1);
      else setStep("result");
    }, 220);
  };

  if (step === "intro") {
    return (
      <main className="page-fade">
        <section style={{ paddingTop: 80, paddingBottom: 80 }}>
          <div className="container" style={{ maxWidth: 780, textAlign: "center" }}>
            <div className="eyebrow" style={{ marginBottom: 16 }}>Bussola AI · v 1.0</div>
            <h1 style={{ fontSize: "clamp(40px, 5vw, 60px)" }}>Dove ti collochi nello spazio politico dell'AI?</h1>
            <p className="lede" style={{ marginTop: 24 }}>
              16 domande, 4 assi, 8 archetipi. Nessuna registrazione, nessuna mail richiesta. Le risposte aggregate (anonime) diventano un articolo trimestrale.
            </p>
            <div className="flex gap-3 justify-center" style={{ marginTop: 36 }}>
              <button className="btn btn-primary" onClick={() => setStep("quiz")}>Inizia il quiz →</button>
              <a href="#/bussola/metodologia" className="btn btn-ghost">Metodologia</a>
            </div>
            <div style={{ marginTop: 64 }}>
              <div className="eyebrow" style={{ marginBottom: 18 }}>I quattro assi</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
                {BUSSOLA_AXES.map((a) => (
                  <div key={a.key} style={{ padding: "18px 16px", border: "1px solid var(--rule-soft)", borderRadius: 6, textAlign: "left" }}>
                    <div className="mono" style={{ fontSize: 11, color: "var(--accent-ink)", letterSpacing: "0.08em", marginBottom: 6 }}>{a.label.toUpperCase()}</div>
                    <div className="text-mute" style={{ fontSize: 12 }}>vs {a.opposite}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
    );
  }

  if (step === "quiz") {
    const q = BUSSOLA_QUESTIONS[qIdx];
    const progress = ((qIdx + 1) / BUSSOLA_QUESTIONS.length) * 100;
    return (
      <main className="page-fade">
        <section style={{ paddingTop: 48, paddingBottom: 80, minHeight: "70vh" }}>
          <div className="container" style={{ maxWidth: 780 }}>
            <div className="flex justify-between items-center" style={{ marginBottom: 16 }}>
              <div className="mono" style={{ fontSize: 12, color: "var(--ink-3)", letterSpacing: "0.08em" }}>
                DOMANDA {String(qIdx + 1).padStart(2, "0")} / {String(BUSSOLA_QUESTIONS.length).padStart(2, "0")}
              </div>
              <div className="flex gap-2">
                {qIdx > 0 && <button className="btn btn-ghost" style={{ padding: "6px 12px", fontSize: 12 }} onClick={() => setQIdx(qIdx - 1)}>← Indietro</button>}
                <button className="btn btn-ghost" style={{ padding: "6px 12px", fontSize: 12 }} onClick={() => { setStep("intro"); setQIdx(0); setAnswers(Array(BUSSOLA_QUESTIONS.length).fill(null)); }}>Ricomincia</button>
              </div>
            </div>
            <div style={{ height: 3, background: "var(--bg-deep)", borderRadius: 2, marginBottom: 40, overflow: "hidden" }}>
              <div style={{ width: `${progress}%`, height: "100%", background: "var(--accent)", transition: "width 280ms ease" }} />
            </div>
            <h2 style={{ fontSize: "clamp(24px, 2.4vw, 32px)", marginBottom: 32, lineHeight: 1.25 }}>{q.q}</h2>
            <div className="flex col gap-3">
              {q.options.map((o, i) => (
                <button
                  key={i}
                  className="card card-hover"
                  style={{
                    textAlign: "left", padding: "20px 22px",
                    border: answers[qIdx] === i ? "2px solid var(--accent)" : "1px solid var(--rule)",
                    background: answers[qIdx] === i ? "var(--accent-soft)" : "var(--bg-elev)",
                    cursor: "pointer", transition: "all 160ms ease",
                  }}
                  onClick={() => select(i)}
                >
                  <div className="flex gap-3 items-start">
                    <div className="mono" style={{ fontSize: 11, color: "var(--ink-3)", marginTop: 3, minWidth: 18 }}>{String.fromCharCode(65 + i)}</div>
                    <div style={{ fontSize: 16, color: "var(--ink-2)" }}>{o.t}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>
      </main>
    );
  }

  // result
  const r = result;
  const radarValues = BUSSOLA_AXES.map((a) => axisTo100(r.vector[a.key] * 2));

  return (
    <main className="page-fade">
      <section style={{ paddingTop: 48, paddingBottom: 32 }}>
        <div className="container">
          <div className="eyebrow" style={{ marginBottom: 14 }}>Risultato Bussola AI · {new Date().toLocaleDateString("it-IT", { day: "2-digit", month: "short", year: "numeric" })}</div>
          <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 56, alignItems: "start" }}>
            <div>
              <div className="badge badge-accent" style={{ marginBottom: 16 }}>Il tuo archetipo</div>
              <h1 style={{ fontSize: "clamp(36px, 4vw, 52px)" }}>{r.archetype.name}</h1>
              <blockquote style={{ fontFamily: "var(--serif)", fontSize: 22, fontStyle: "italic", color: "var(--ink-2)", margin: "28px 0", paddingLeft: 20, borderLeft: "3px solid var(--accent)", lineHeight: 1.4 }}>
                «{r.archetype.quote}»
              </blockquote>
              <p style={{ fontSize: 17, lineHeight: 1.7, color: "var(--ink-2)" }}>{r.archetype.desc}</p>
              <div style={{ marginTop: 32, padding: 20, background: "var(--bg-deep)", borderRadius: 6 }}>
                <div className="eyebrow" style={{ marginBottom: 10 }}>Famiglie politiche più vicine</div>
                <div className="flex gap-2">
                  {r.archetype.near.map((g) => <span key={g} className="badge">{g}</span>)}
                </div>
              </div>
              <div className="flex gap-3" style={{ marginTop: 32, flexWrap: "wrap" }}>
                <button className="btn btn-primary">Condividi risultato</button>
                <button className="btn btn-ghost" onClick={() => { setStep("intro"); setQIdx(0); setAnswers(Array(BUSSOLA_QUESTIONS.length).fill(null)); }}>Rifai il quiz</button>
                <a href="#/journal" className="btn btn-link">Iscriviti al Journal →</a>
              </div>
            </div>

            <div className="card" style={{ padding: 28 }}>
              <div className="eyebrow" style={{ marginBottom: 8 }}>Posizione sui 4 assi</div>
              <div className="text-mute" style={{ fontSize: 13, marginBottom: 8 }}>Il tuo profilo, sovrapposto alla media dei rispondenti.</div>
              <RadarChart axes={BUSSOLA_AXES} values={radarValues} compareValues={[58, 62, 64, 70]} compareLabel="Media" size={360} />
              <div className="flex gap-4 justify-center" style={{ fontSize: 11.5, color: "var(--ink-3)", marginTop: 4 }}>
                <span><span style={{ display: "inline-block", width: 10, height: 10, background: "var(--accent)", marginRight: 6, borderRadius: 2, verticalAlign: "middle" }}></span>Tu</span>
                <span><span style={{ display: "inline-block", width: 10, height: 10, border: "1px dashed var(--ink-3)", marginRight: 6, borderRadius: 2, verticalAlign: "middle" }}></span>Media (n=2.847)</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <hr className="rule-soft" style={{ marginTop: 56 }} />

      <section style={{ paddingTop: 56, paddingBottom: 80 }}>
        <div className="container">
          <SectionHead eyebrow="Confronto" title="Vicini sulla bussola" kicker="Altri archetipi a distanza ridotta dalla tua posizione." />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
            {BUSSOLA_ARCHETYPES.filter((a) => a.id !== r.archetype.id).slice(0, 3).map((a) => (
              <div key={a.id} className="card" style={{ padding: 22 }}>
                <h4 style={{ marginBottom: 10, fontFamily: "var(--serif)", fontSize: 18, fontWeight: 500 }}>{a.name}</h4>
                <p className="text-mute" style={{ fontSize: 14 }}>{a.desc.slice(0, 130)}…</p>
                <div className="flex gap-2" style={{ marginTop: 14 }}>
                  {a.near.slice(0, 2).map((g) => <span key={g} className="badge" style={{ fontSize: 9.5 }}>{g}</span>)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

window.BussolaPage = BussolaPage;
