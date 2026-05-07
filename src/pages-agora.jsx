// Agora — deliberative module
const { useState: useStateAg } = React;

const AgoraPage = ({ agoraState }) => {
  const [step, setStep] = useStateAg("compose"); // compose | sent
  const [text, setText] = useStateAg("");
  const [tags, setTags] = useStateAg([]);
  const [email, setEmail] = useStateAg("");
  const [consent, setConsent] = useStateAg(false);

  const toggleTag = (t) => {
    setTags((prev) => prev.includes(t) ? prev.filter((x) => x !== t) : prev.length < 3 ? [...prev, t] : prev);
  };

  const showActive = agoraState === "active";

  return (
    <main className="page-fade">
      <section style={{ paddingTop: 48, paddingBottom: 32 }}>
        <div className="container">
          <div className="eyebrow" style={{ marginBottom: 14 }}>Agora · spazio deliberativo del Lab</div>
          <h1 style={{ fontSize: "clamp(36px, 4vw, 52px)" }}>Una domanda al mese.<br/>La risposta la scriviamo insieme.</h1>
          <p className="lede" style={{ marginTop: 20, maxWidth: 760 }}>
            Ogni ciclo dura 30 giorni. Le risposte vengono raccolte, anonimizzate, clusterizzate, sintetizzate dal nucleo editoriale e pubblicate come report firmato dal Lab. Niente login, niente algoritmo invisibile, metodologia pubblica.
          </p>
        </div>
      </section>

      <hr className="rule-soft" />

      {showActive && (
        <section style={{ paddingTop: 56, paddingBottom: 32 }}>
          <div className="container">
            <div className="card" style={{ padding: 40, background: "var(--bg-elev)", border: "1px solid var(--rule)" }}>
              <div className="flex gap-2 items-center" style={{ marginBottom: 16 }}>
                <span className="badge badge-live">ciclo attivo</span>
                <span className="badge mono">{AGORA_CYCLE.id.toUpperCase()}</span>
                <span className="text-mute mono" style={{ fontSize: 11.5, letterSpacing: "0.06em" }}>
                  APERTO {AGORA_CYCLE.opensAt} → {AGORA_CYCLE.closesAt}
                </span>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: 48 }}>
                <div>
                  <h2 style={{ fontSize: 32, marginBottom: 16, lineHeight: 1.2 }}>{AGORA_CYCLE.question}</h2>
                  <p style={{ fontSize: 16, lineHeight: 1.7, color: "var(--ink-2)" }}>{AGORA_CYCLE.description}</p>

                  {step === "compose" ? (
                    <div style={{ marginTop: 32 }}>
                      <div className="eyebrow" style={{ marginBottom: 10 }}>La tua risposta · max 500 caratteri</div>
                      <textarea
                        rows="6"
                        maxLength="500"
                        placeholder="La cosa più importante da dire, dal tuo punto di vista. Anche un'osservazione laterale ben argomentata vale più di una posizione fatta di principi."
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        style={{ resize: "vertical", lineHeight: 1.55 }}
                      />
                      <div className="flex justify-between mono" style={{ fontSize: 11, color: "var(--ink-3)", marginTop: 6 }}>
                        <span>{text.length} / 500</span>
                        <span>~ {Math.ceil(text.length / 5)} parole</span>
                      </div>

                      <div className="eyebrow" style={{ marginTop: 24, marginBottom: 10 }}>Tag · scegline fino a 3</div>
                      <div className="flex gap-2" style={{ flexWrap: "wrap" }}>
                        {AGORA_CYCLE.tags.map((t) => (
                          <button
                            key={t}
                            onClick={() => toggleTag(t)}
                            className="badge"
                            style={{
                              cursor: "pointer",
                              fontSize: 11,
                              background: tags.includes(t) ? "var(--accent)" : "var(--bg-deep)",
                              color: tags.includes(t) ? "#fff" : "var(--ink-3)",
                              border: tags.includes(t) ? "1px solid var(--accent)" : "1px solid var(--rule-soft)",
                            }}
                          >
                            {t}
                          </button>
                        ))}
                      </div>

                      <div style={{ marginTop: 24 }}>
                        <div className="eyebrow" style={{ marginBottom: 10 }}>Email · opzionale, per ricevere il report</div>
                        <input type="email" placeholder="email@esempio.it (opzionale)" value={email} onChange={(e) => setEmail(e.target.value)} />
                      </div>

                      <label className="flex gap-2 items-start" style={{ marginTop: 20, cursor: "pointer", fontSize: 13, color: "var(--ink-2)" }}>
                        <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} style={{ width: "auto", marginTop: 2 }} />
                        <span>Acconsento al trattamento della risposta in forma anonima per l'elaborazione del report. L'email, se fornita, è separata dalla risposta dopo l'invio della notifica.</span>
                      </label>

                      <div className="flex gap-3" style={{ marginTop: 24 }}>
                        <button
                          className="btn btn-primary"
                          disabled={!text || !consent || tags.length === 0}
                          style={{ opacity: !text || !consent || tags.length === 0 ? 0.5 : 1 }}
                          onClick={() => setStep("sent")}
                        >
                          Invia risposta
                        </button>
                        <span className="text-mute" style={{ fontSize: 12, alignSelf: "center" }}>Verifica anti-bot Cloudflare Turnstile attiva</span>
                      </div>
                    </div>
                  ) : (
                    <div style={{ marginTop: 32, padding: 32, background: "var(--accent-soft)", borderRadius: 8, border: "1px solid var(--accent)" }}>
                      <div className="badge badge-accent" style={{ marginBottom: 12 }}>✓ ricevuta</div>
                      <h3 style={{ fontSize: 22, marginBottom: 10 }}>Grazie per il contributo.</h3>
                      <p style={{ fontSize: 15, color: "var(--ink-2)" }}>La risposta è entrata in moderazione. Verrà inclusa nel report del ciclo {AGORA_CYCLE.id}, atteso per giugno 2026{email ? ", che ti notificheremo all'indirizzo che hai indicato" : ""}. La pubblicazione finale avviene su Substack e su questa pagina.</p>
                      <button className="btn btn-ghost" style={{ marginTop: 20 }} onClick={() => { setStep("compose"); setText(""); setTags([]); setEmail(""); setConsent(false); }}>Invia un'altra risposta</button>
                    </div>
                  )}
                </div>

                <div>
                  <div style={{ padding: 20, background: "var(--bg-deep)", borderRadius: 6, marginBottom: 16 }}>
                    <div className="eyebrow" style={{ marginBottom: 12 }}>Stato del ciclo</div>
                    <div className="flex justify-between items-baseline" style={{ marginBottom: 4 }}>
                      <span className="mono" style={{ fontSize: 32, fontWeight: 500, color: "var(--accent)" }}>{AGORA_CYCLE.daysLeft}</span>
                      <span className="text-mute mono" style={{ fontSize: 11 }}>GIORNI ALLA CHIUSURA</span>
                    </div>
                    <hr className="rule-soft" style={{ margin: "16px 0" }} />
                    <div className="flex justify-between items-baseline" style={{ marginBottom: 4 }}>
                      <span className="mono" style={{ fontSize: 32, fontWeight: 500 }}>{AGORA_CYCLE.participants}</span>
                      <span className="text-mute mono" style={{ fontSize: 11 }}>PARTECIPANTI</span>
                    </div>
                  </div>
                  <div style={{ padding: 20, border: "1px solid var(--rule-soft)", borderRadius: 6 }}>
                    <div className="eyebrow" style={{ marginBottom: 12 }}>Pipeline</div>
                    {[
                      { t: "Raccolta risposte", on: true, active: true },
                      { t: "Moderazione (anti-spam, pertinenza)", on: false },
                      { t: "Embedding + clustering (HDBSCAN)", on: false },
                      { t: "Sintesi LLM per cluster", on: false },
                      { t: "Revisione editoriale", on: false },
                      { t: "Pubblicazione su Substack", on: false },
                    ].map((s, i) => (
                      <div key={i} className="flex gap-3 items-center" style={{ padding: "8px 0", fontSize: 13 }}>
                        <div style={{
                          width: 8, height: 8, borderRadius: 50,
                          background: s.active ? "var(--good)" : s.on ? "var(--accent)" : "var(--rule)",
                          boxShadow: s.active ? "0 0 0 4px color-mix(in oklab, var(--good), transparent 80%)" : "none",
                        }} />
                        <span style={{ color: s.on ? "var(--ink-2)" : "var(--ink-3)" }}>{s.t}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {!showActive && (
        <section style={{ paddingTop: 56, paddingBottom: 32 }}>
          <div className="container">
            <div className="card" style={{ padding: 56, textAlign: "center" }}>
              <div className="badge" style={{ marginBottom: 18 }}>tra cicli</div>
              <h2 style={{ fontSize: 32, marginBottom: 14 }}>Prossima domanda tra 9 giorni.</h2>
              <p className="lede" style={{ maxWidth: 580, margin: "0 auto" }}>Il prossimo ciclo aprirà il 15 maggio 2026. Iscriviti al Journal per ricevere la notifica.</p>
            </div>
          </div>
        </section>
      )}

      <hr className="rule-soft" style={{ marginTop: 56 }} />

      <section style={{ paddingTop: 56, paddingBottom: 80 }}>
        <div className="container">
          <SectionHead eyebrow="Archivio" title="Cicli precedenti" kicker="Ogni report contiene la metodologia di clustering, il dataset anonimizzato, l'analisi editoriale." />
          <div className="flex col gap-3">
            {AGORA_PAST.map((p, i) => (
              <a key={p.slug} href="#/agora" className="card card-hover flex justify-between items-center gap-6" style={{ padding: "24px 28px" }}>
                <div className="mono" style={{ fontSize: 11, color: "var(--accent-ink)", minWidth: 80, letterSpacing: "0.08em" }}>{p.slug.toUpperCase()}</div>
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontSize: 20, marginBottom: 6 }}>{p.title}</h3>
                  <p className="text-mute" style={{ fontSize: 14 }}>{p.excerpt}</p>
                </div>
                <div className="flex gap-6" style={{ minWidth: 200 }}>
                  <div>
                    <div className="mono" style={{ fontSize: 18, fontWeight: 500 }}>{p.participants}</div>
                    <div className="text-mute mono" style={{ fontSize: 10, letterSpacing: "0.08em" }}>PARTEC.</div>
                  </div>
                  <div>
                    <div className="mono" style={{ fontSize: 18, fontWeight: 500 }}>{p.clusters}</div>
                    <div className="text-mute mono" style={{ fontSize: 10, letterSpacing: "0.08em" }}>CLUSTER</div>
                  </div>
                  <div>
                    <div className="mono" style={{ fontSize: 13, color: "var(--ink-2)" }}>{p.period}</div>
                    <div className="text-accent mono" style={{ fontSize: 10, letterSpacing: "0.08em", marginTop: 4 }}>LEGGI →</div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

window.AgoraPage = AgoraPage;
