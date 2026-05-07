// Impact Explorer — multistep form
const { useState: useStateI } = React;

const ImpactPage = () => {
  const [step, setStep] = useStateI(1);
  const [profession, setProfession] = useStateI(null);
  const [search, setSearch] = useStateI("");
  const [region, setRegion] = useStateI(ITALY_REGIONS[0]);
  const [age, setAge] = useStateI(35);
  const [education, setEducation] = useStateI(EDUCATION_LEVELS[1]);
  const [emailSave, setEmailSave] = useStateI("");

  const filtered = PROFESSIONS.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()));

  // Region/age/education modulators
  const regionMod = region === "Nord" ? 1.05 : region === "Centro" ? 1.0 : 0.92;
  const eduMod = education === EDUCATION_LEVELS[0] ? 0.85 : education === EDUCATION_LEVELS[1] ? 1.0 : 1.12;
  const ageMod = age < 30 ? 1.08 : age < 50 ? 1.0 : 0.92;

  const result = profession ? {
    exposure: Math.round(profession.exposure * regionMod),
    complement: Math.round(profession.complement * eduMod),
    wage: Math.round(profession.wage * ageMod * eduMod),
  } : null;

  const reset = () => { setStep(1); setProfession(null); setSearch(""); };

  return (
    <main className="page-fade">
      <section style={{ paddingTop: 48, paddingBottom: 24 }}>
        <div className="container">
          <div className="eyebrow" style={{ marginBottom: 14 }}>Impact Explorer · v 1.0 · 247 professioni</div>
          <h1 style={{ fontSize: "clamp(36px, 4vw, 52px)" }}>Quanto è esposta<br/>la tua professione all'AI?</h1>
          <p className="lede" style={{ marginTop: 20, maxWidth: 720 }}>
            Stima personalizzata su tre indicatori: esposizione, complementarità, effetto salariale atteso. Basata su Felten et al. (2024), Eloundou et al. (2023), IMF (2024), OECD Employment Outlook (2023-25), INAPP.
          </p>
        </div>
      </section>

      <hr className="rule-soft" />

      <section style={{ paddingTop: 48, paddingBottom: 80 }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: step === 4 ? "1fr" : "320px 1fr", gap: 40 }}>
            {step !== 4 && (
              <div>
                <div className="eyebrow" style={{ marginBottom: 16 }}>Step {step} di 3</div>
                <div className="flex col gap-2">
                  {[
                    { n: 1, t: "Professione" },
                    { n: 2, t: "Profilo demografico" },
                    { n: 3, t: "Conferma e calcola" },
                  ].map((s) => (
                    <div key={s.n} className="flex gap-3 items-center" style={{
                      padding: "14px 18px",
                      borderRadius: 6,
                      background: step === s.n ? "var(--accent-soft)" : "transparent",
                      border: step === s.n ? "1px solid var(--accent)" : "1px solid var(--rule-soft)",
                    }}>
                      <div className="mono" style={{
                        width: 28, height: 28, borderRadius: 50,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        background: step >= s.n ? "var(--accent)" : "var(--bg-deep)",
                        color: step >= s.n ? "#fff" : "var(--ink-3)",
                        fontSize: 12, fontWeight: 600,
                      }}>{s.n}</div>
                      <div style={{ fontSize: 14, fontWeight: step === s.n ? 600 : 400, color: step >= s.n ? "var(--ink)" : "var(--ink-3)" }}>{s.t}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div>
              {step === 1 && (
                <div>
                  <h2 style={{ fontSize: 26, marginBottom: 8 }}>La tua professione</h2>
                  <p className="text-mute" style={{ marginBottom: 24 }}>Cerca per nome o codice ISCO-08.</p>
                  <input
                    type="text"
                    placeholder="Es. avvocato, infermiere, sviluppatore…"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    style={{ marginBottom: 16 }}
                  />
                  <div className="flex col" style={{ maxHeight: 360, overflow: "auto", border: "1px solid var(--rule-soft)", borderRadius: 6 }}>
                    {filtered.map((p) => (
                      <button
                        key={p.code}
                        onClick={() => setProfession(p)}
                        style={{
                          padding: "14px 18px",
                          textAlign: "left",
                          border: 0,
                          borderBottom: "1px solid var(--rule-soft)",
                          background: profession?.code === p.code ? "var(--accent-soft)" : "transparent",
                          cursor: "pointer",
                          display: "flex", justifyContent: "space-between", alignItems: "center",
                        }}
                      >
                        <span style={{ fontSize: 14, color: "var(--ink-2)" }}>{p.name}</span>
                        <span className="mono" style={{ fontSize: 11, color: "var(--ink-3)" }}>ISCO {p.isco}</span>
                      </button>
                    ))}
                    {filtered.length === 0 && <div style={{ padding: 32, textAlign: "center", color: "var(--ink-3)", fontSize: 14 }}>Nessun risultato</div>}
                  </div>
                  <div className="flex justify-end" style={{ marginTop: 24 }}>
                    <button className="btn btn-primary" disabled={!profession} style={{ opacity: !profession ? 0.5 : 1 }} onClick={() => setStep(2)}>Continua →</button>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div>
                  <h2 style={{ fontSize: 26, marginBottom: 8 }}>Profilo demografico</h2>
                  <p className="text-mute" style={{ marginBottom: 32 }}>Servono solo come modulatori statistici. Nessun dato viene salvato.</p>

                  <div className="flex col gap-6">
                    <div>
                      <div className="eyebrow" style={{ marginBottom: 10 }}>Area geografica</div>
                      <div className="flex gap-2" style={{ flexWrap: "wrap" }}>
                        {ITALY_REGIONS.map((r) => (
                          <button key={r} onClick={() => setRegion(r)} className="btn" style={{
                            padding: "10px 16px", fontSize: 13,
                            background: region === r ? "var(--accent)" : "var(--bg-elev)",
                            color: region === r ? "#fff" : "var(--ink-2)",
                            border: region === r ? "1px solid var(--accent)" : "1px solid var(--rule)",
                          }}>{r}</button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <div className="eyebrow" style={{ marginBottom: 10 }}>Età · <span className="mono" style={{ color: "var(--accent-ink)" }}>{age} anni</span></div>
                      <input type="range" min="18" max="70" value={age} onChange={(e) => setAge(+e.target.value)} style={{ accentColor: "var(--accent)" }} />
                      <div className="flex justify-between mono" style={{ fontSize: 10, color: "var(--ink-3)" }}>
                        <span>18</span><span>70</span>
                      </div>
                    </div>

                    <div>
                      <div className="eyebrow" style={{ marginBottom: 10 }}>Livello di istruzione</div>
                      <div className="flex gap-2" style={{ flexWrap: "wrap" }}>
                        {EDUCATION_LEVELS.map((e) => (
                          <button key={e} onClick={() => setEducation(e)} className="btn" style={{
                            padding: "10px 16px", fontSize: 13,
                            background: education === e ? "var(--accent)" : "var(--bg-elev)",
                            color: education === e ? "#fff" : "var(--ink-2)",
                            border: education === e ? "1px solid var(--accent)" : "1px solid var(--rule)",
                          }}>{e}</button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between" style={{ marginTop: 32 }}>
                    <button className="btn btn-ghost" onClick={() => setStep(1)}>← Indietro</button>
                    <button className="btn btn-primary" onClick={() => setStep(3)}>Continua →</button>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div>
                  <h2 style={{ fontSize: 26, marginBottom: 8 }}>Riepilogo</h2>
                  <p className="text-mute" style={{ marginBottom: 24 }}>Verifica e calcola.</p>

                  <div className="card" style={{ padding: 24, marginBottom: 24 }}>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 20 }}>
                      <Field label="Professione" value={profession?.name} mono={`ISCO ${profession?.isco}`} />
                      <Field label="Area" value={region} />
                      <Field label="Età" value={`${age} anni`} />
                      <Field label="Istruzione" value={education} />
                    </div>
                  </div>

                  <div style={{ marginBottom: 24 }}>
                    <div className="eyebrow" style={{ marginBottom: 8 }}>Email · opzionale, per ricevere il report</div>
                    <input type="email" placeholder="email@esempio.it" value={emailSave} onChange={(e) => setEmailSave(e.target.value)} />
                  </div>

                  <div className="flex justify-between">
                    <button className="btn btn-ghost" onClick={() => setStep(2)}>← Indietro</button>
                    <button className="btn btn-primary" onClick={() => setStep(4)}>Calcola impatto →</button>
                  </div>
                </div>
              )}

              {step === 4 && (
                <ImpactResult profession={profession} result={result} region={region} age={age} education={education} onReset={reset} />
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

const Field = ({ label, value, mono }) => (
  <div>
    <div className="eyebrow" style={{ marginBottom: 4 }}>{label}</div>
    <div style={{ fontSize: 16, color: "var(--ink)", fontWeight: 500 }}>{value}</div>
    {mono && <div className="mono" style={{ fontSize: 11, color: "var(--ink-3)" }}>{mono}</div>}
  </div>
);

const ImpactResult = ({ profession, result, region, age, education, onReset }) => {
  const interpretation = (v, type) => {
    if (type === "exposure") return v >= 70 ? "alta" : v >= 40 ? "media" : "bassa";
    if (type === "complement") return v >= 70 ? "alta" : v >= 40 ? "media" : "bassa";
    return null;
  };
  return (
    <div>
      <div className="eyebrow" style={{ marginBottom: 14 }}>Risultato Impact Explorer</div>
      <div className="flex gap-3 items-baseline" style={{ marginBottom: 8, flexWrap: "wrap" }}>
        <h1 style={{ fontSize: "clamp(32px, 3.5vw, 44px)" }}>{profession.name}</h1>
        <span className="mono badge">ISCO {profession.isco}</span>
      </div>
      <p className="text-mute" style={{ fontSize: 14, marginBottom: 32 }}>{region} · {age} anni · {education}</p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 32 }}>
        <Indicator
          label="Esposizione"
          value={result.exposure}
          unit="/100"
          desc={`Esposizione ${interpretation(result.exposure, "exposure")} ai modelli generativi nelle attività quotidiane.`}
          color="var(--accent-2)"
        />
        <Indicator
          label="Complementarità"
          value={result.complement}
          unit="/100"
          desc={`Complementarità ${interpretation(result.complement, "complement")}: capacità di amplificare il valore del lavoro umano.`}
          color="var(--accent)"
        />
        <Indicator
          label="Effetto salariale atteso"
          value={result.wage}
          unit="%"
          signed
          desc={result.wage > 5 ? "Pressione netta positiva nel medio termine." : result.wage < -3 ? "Pressione netta negativa, attenta gestione della transizione." : "Effetto netto contenuto, ristrutturazione interna del mestiere."}
          color={result.wage > 0 ? "var(--good)" : "var(--warn)"}
        />
      </div>

      <div className="card" style={{ padding: 28, marginBottom: 24 }}>
        <div className="eyebrow" style={{ marginBottom: 10 }}>Narrazione personalizzata</div>
        <p style={{ fontSize: 16, lineHeight: 1.65, color: "var(--ink-2)" }}>{profession.narrative}</p>
        <div style={{ marginTop: 24, padding: 20, background: "var(--bg-deep)", borderRadius: 6, fontSize: 13, color: "var(--ink-3)", fontFamily: "var(--serif)", fontStyle: "italic" }}>
          Le stime sono probabilistiche e si basano su correlazioni storiche e modelli prospettici. L'esposizione non è destino: la complementarità — la capacità di lavorare <em>con</em> il sistema — è una variabile di policy, non solo individuale.
        </div>
      </div>

      <div className="card" style={{ padding: 28, marginBottom: 24 }}>
        <div className="eyebrow" style={{ marginBottom: 14 }}>Mappa policy · proposte riformiste pertinenti</div>
        <div className="flex col gap-3">
          {[
            { n: "01", t: "Conti individuali di apprendimento permanente", d: "Diritto soggettivo a 80 ore/anno di formazione finanziata, portabili tra contratti." },
            { n: "02", t: "Audit obbligatorio sui sistemi di selezione del personale", d: "Trasparenza algoritmica nei processi che impattano direttamente il tuo settore." },
            { n: "03", t: "Fondo solidaristico settoriale", d: "Meccanismo redistributivo sui guadagni di produttività AI verso categorie esposte." },
          ].map((p) => (
            <div key={p.n} className="flex gap-4">
              <div className="mono" style={{ fontSize: 13, color: "var(--accent)", minWidth: 32, paddingTop: 3 }}>{p.n}</div>
              <div>
                <div style={{ fontSize: 15, fontWeight: 500, marginBottom: 2 }}>{p.t}</div>
                <div className="text-mute" style={{ fontSize: 13.5 }}>{p.d}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-3" style={{ marginTop: 32, flexWrap: "wrap" }}>
        <button className="btn btn-primary">Condividi PNG</button>
        <button className="btn btn-ghost">Salva report via email</button>
        <button className="btn btn-ghost" onClick={onReset}>Rifai con altra professione</button>
        <a href="#/journal" className="btn btn-link">Iscriviti al Journal →</a>
      </div>
    </div>
  );
};

const Indicator = ({ label, value, unit, desc, color, signed }) => (
  <div className="card" style={{ padding: 24, position: "relative", overflow: "hidden" }}>
    <div className="eyebrow" style={{ marginBottom: 12 }}>{label}</div>
    <div className="flex items-baseline gap-2" style={{ marginBottom: 12 }}>
      <span className="mono" style={{ fontSize: 48, fontWeight: 500, color: color, lineHeight: 1 }}>
        {signed && value > 0 ? "+" : ""}{value}
      </span>
      <span className="mono text-mute" style={{ fontSize: 14 }}>{unit}</span>
    </div>
    <div style={{ height: 4, background: "var(--bg-deep)", borderRadius: 2, marginBottom: 12, overflow: "hidden" }}>
      <div style={{
        width: `${Math.min(100, Math.abs(value) * (signed ? 4 : 1))}%`,
        height: "100%", background: color, transition: "width 600ms ease",
      }} />
    </div>
    <p className="text-mute" style={{ fontSize: 13 }}>{desc}</p>
  </div>
);

window.ImpactPage = ImpactPage;
