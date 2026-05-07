// Homepage
const HomePage = () => {
  return (
    <main className="page-fade">
      {/* Hero — identitario, niente Bussola qui */}
      <section style={{ paddingTop: 88, paddingBottom: 88, borderBottom: "1px solid var(--rule)" }}>
        <div className="container">
          <div className="flex gap-2" style={{ marginBottom: 28 }}>
            <span className="badge badge-accent">v 1.0 · in linea</span>
            <span className="badge">est. 2026</span>
            <span className="badge">indipendente</span>
          </div>
          <div style={{ maxWidth: 980 }}>
            <div className="eyebrow" style={{ marginBottom: 18, fontSize: 13 }}>Post/Human Policy Lab</div>
            <h1 style={{ fontSize: "clamp(48px, 6.4vw, 92px)", lineHeight: 1.02, letterSpacing: "-0.025em" }}>
              Osservatorio<br />
              <span style={{ color: "var(--accent)" }}>—laboratorio</span> indipendente<br />
              sull'AI come materia politica.
            </h1>
            <p className="lede" style={{ marginTop: 36, maxWidth: 740, fontSize: 22 }}>
              Analisi e strumenti interattivi sull'impatto politico, economico, sociale e geopolitico dell'intelligenza artificiale. Per chi opera o vota nell'area del riformismo italiano ed europeo.
            </p>
            <div className="flex gap-3" style={{ marginTop: 40, flexWrap: "wrap" }}>
              <a href="#/journal" className="btn btn-primary">Iscriviti al Journal</a>
              <a href="#/bussola" className="btn btn-ghost">Esplora gli strumenti ↓</a>
            </div>
          </div>
          {/* Mini stat strip */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 0, marginTop: 72, borderTop: "1px solid var(--rule-soft)" }}>
            {[
            { n: "4", l: "strumenti interattivi" },
            { n: "20+", l: "paesi mappati nell'Atlas" },
            { n: "200+", l: "professioni nell'Impact Explorer" },
            { n: "1×", l: "domanda deliberativa al mese" }].
            map((s, i) =>
            <div key={i} style={{ padding: "28px 24px 0 0", borderRight: i < 3 ? "1px solid var(--rule-soft)" : "none" }}>
                <div className="mono" style={{ fontSize: 36, fontWeight: 500, color: "var(--accent)", letterSpacing: "-0.02em" }}>{s.n}</div>
                <div className="text-mute" style={{ fontSize: 13, marginTop: 6 }}>{s.l}</div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Latest articles */}
      <section style={{ paddingTop: 80, paddingBottom: 80 }}>
        <div className="container">
          <SectionHead
            eyebrow="Journal · Substack RSS"
            title="Ultimi articoli"
            kicker="Cadenza 2-4 contenuti al mese. Analisi, saggi brevi e scenari sull'impatto politico dell'AI.">
            <a href="#/journal" className="btn btn-ghost">Tutti gli articoli →</a>
          </SectionHead>
          <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 24, marginBottom: 24 }}>
            <ArticleCard article={ARTICLES[0]} featured />
            <div className="flex col gap-4" style={{ height: "100%" }}>
              <ArticleCard article={ARTICLES[1]} />
              <ArticleCard article={ARTICLES[2]} />
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
            {ARTICLES.slice(3, 6).map((a, i) => <ArticleCard key={i} article={a} />)}
          </div>
        </div>
      </section>

      {/* === SEZIONE STRUMENTI === */}
      <section style={{ paddingTop: 56, paddingBottom: 24, borderTop: "1px solid var(--rule)" }}>
        <div className="container">
          <div style={{ textAlign: "center" }}>
            <div className="eyebrow" style={{ fontSize: 14, letterSpacing: "0.18em" }}>Partecipa in prima persona al Post/Human Lab</div>
          </div>
        </div>
      </section>

      {/* — Bussola AI — */}
      <ToolSection
        index="01"
        kicker="Quiz · 15 domande"
        name="Bussola AI"
        title="Dove ti collochi nello spazio politico dell'AI riformista?"
        body="Quindici domande, quattro assi (Accelerazione/Precauzione, Stato/Mercato, Universalismo/Selettività, Sovranismo/Cooperazione), otto archetipi narrativi. Confronto con le posizioni di partito a Strasburgo. Risultato condivisibile come immagine."
        bullets={[
        "8 archetipi · da Costituzionalista Algoritmico a Libertario Digitale",
        "Confronto con votazioni PE su AI Act e dossier correlati",
        "Compilabile in 4-6 minuti · risultato shareable"]
        }
        cta={{ to: "/bussola", label: "Apri la Bussola" }}
        preview={<BussolaPreview />} />
      

      {/* — Atlas AI — */}
      <ToolSection
        index="02"
        kicker="Mappa · 20+ paesi"
        name="Atlas AI"
        title="Dove sta ciascun paese, su sei dimensioni dell'AI."
        body="Una mappa coropletica di 20 paesi più l'aggregato UE, su sei dimensioni: regolazione, capacità industriale, frontier, talento, militare, posizionamento geopolitico. Ogni dato cita la fonte. Aggiornamento trimestrale."
        bullets={[
        "Dataset versionato · OECD.AI, Stanford HAI, ETO/CSET, Tortoise",
        "Confronto sovrapposto fino a 3 paesi · radar a 6 dimensioni",
        "Metodologia pubblica e verificabile"]
        }
        cta={{ to: "/atlas", label: "Apri l'Atlas" }}
        preview={<AtlasPreview />}
        flip />
      

      {/* — Agora — */}
      <ToolSection
        index="03"
        kicker="Deliberazione · 1 al mese"
        name="Agora"
        title="Una domanda al mese. Centinaia di voci. Un report firmato dal Lab."
        body="Ogni mese una domanda controversa per l'area riformista. Le risposte vengono raccolte, clusterizzate (embedding + HDBSCAN), sintetizzate in un report editoriale che restituisce la geografia del dissenso senza piallarla."
        bullets={[
        "Form anonimo · 500 caratteri · 3 tag · Turnstile",
        "Pipeline di clustering documentata · pubblicabile",
        "Report cross-postato su Substack · archivio permanente"]
        }
        cta={{ to: "/agora", label: "Apri l'Agora" }}
        preview={<AgoraPreview />} />
      

      {/* — Impact Explorer — */}
      <ToolSection
        index="04"
        kicker="Strumento personale"
        name="Impact Explorer"
        title="Quanto l'AI tocca la tua professione, davvero."
        body="Un form multistep restituisce tre indicatori — esposizione, complementarità, probabilità di aumento salariale — sulla tua professione, modulati per regione, età e istruzione. Coefficienti da Felten/Eloundou/IMF/OECD/INAPP, ogni numero cita la fonte."
        bullets={[
        "200+ professioni ISCO-08 · 21 regioni italiane",
        "Output con intervalli di confidenza, mai stime puntuali secche",
        "Mappa policy: quali proposte riformiste sono pertinenti per te"]
        }
        cta={{ to: "/impact", label: "Apri l'Impact Explorer" }}
        preview={<ImpactPreview />}
        flip />
      

      {/* Manifesto strip */}
      <section style={{ paddingTop: 88, paddingBottom: 88, background: "var(--bg-deep)", borderTop: "1px solid var(--rule)" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 64 }}>
            <div>
              <div className="eyebrow" style={{ marginBottom: 12 }}>Manifesto</div>
              <h2 style={{ fontSize: 32 }}>Il riformismo tecnologicamente alfabetizzato.</h2>
            </div>
            <div className="flex col gap-5">
              <p className="lede dropcap">
                In Italia e nello spazio riformista europeo esistono due spazi discorsivi dominanti sull'AI, entrambi insoddisfacenti: il techno-ottimismo divulgativo e il techno-allarmismo difensivo. Il Lab occupa lo spazio vuoto: un discorso che riconosce la portata sistemica delle trasformazioni in corso, le guarda senza isteria e senza entusiasmo, e prova a derivarne policy concrete.
              </p>
              <p className="text-mute" style={{ fontSize: 16 }}>
                Coerenti con una tradizione di democrazia costituzionale, economia sociale di mercato, universalismo redistributivo moderato. Il Lab non dà per scontato che la categoria di "umano" come soggetto politico del costituzionalismo novecentesco sopravviva invariata. Ma non accetta nemmeno il postumano come destino.
              </p>
              <a href="#/about" className="btn btn-link" style={{ alignSelf: "flex-start" }}>Leggi la mission →</a>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter wide */}
      <section style={{ paddingTop: 80, paddingBottom: 80 }}>
        <div className="container">
          <div className="card" style={{ padding: 56, textAlign: "center", background: "var(--bg-elev)" }}>
            <div className="eyebrow" style={{ marginBottom: 14 }}>Iscriviti al Journal</div>
            <h2 style={{ fontSize: 36, maxWidth: 760, margin: "0 auto 16px" }}>Due-quattro contenuti al mese. Onestà epistemica, niente clickbait.</h2>
            <p className="lede" style={{ maxWidth: 580, margin: "0 auto 28px" }}>Articoli, saggi brevi, policy brief, scenari narrativi. Distribuiti via Substack. Iscrizione gratuita.</p>
            <div style={{ maxWidth: 480, margin: "0 auto" }}>
              <NewsletterMini />
            </div>
          </div>
        </div>
      </section>
    </main>);

};

// =====================================================
// ToolSection — sezione dedicata per ogni strumento
// =====================================================
const ToolSection = ({ index, kicker, name, title, body, bullets, cta, preview, flip = false }) => {
  return (
    <section style={{ paddingTop: 72, paddingBottom: 72, borderTop: "1px solid var(--rule-soft)" }}>
      <div className="container">
        <div style={{ display: "grid", gridTemplateColumns: flip ? "1.05fr 1fr" : "1fr 1.05fr", gap: 64, alignItems: "center" }}>
          {flip && <div style={{ order: 1 }}>{preview}</div>}
          <div>
            <div className="flex items-center gap-3" style={{ marginBottom: 18 }}>
              <span className="mono" style={{ fontSize: 13, color: "var(--accent)", letterSpacing: "0.1em", fontWeight: 500 }}>{index}</span>
              <span style={{ width: 28, height: 1, background: "var(--rule)" }}></span>
              <span className="mono text-mute" style={{ fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase" }}>{kicker}</span>
              <span className="badge badge-live">live</span>
            </div>
            <h2 style={{ fontFamily: "var(--serif)", fontSize: "clamp(30px, 3.4vw, 44px)", lineHeight: 1.08, letterSpacing: "-0.015em", marginBottom: 8 }}>
              <span style={{ color: "var(--accent)" }}>{name}.</span> {title}
            </h2>
            <p className="lede" style={{ marginTop: 18, fontSize: 18 }}>{body}</p>
            <ul style={{ listStyle: "none", padding: 0, margin: "26px 0 0", display: "flex", flexDirection: "column", gap: 10 }}>
              {bullets.map((b, i) =>
              <li key={i} className="flex items-start gap-3" style={{ fontSize: 14.5, color: "var(--ink-2)" }}>
                  <span className="mono" style={{ color: "var(--accent)", fontSize: 12, marginTop: 4, minWidth: 18 }}>→</span>
                  <span>{b}</span>
                </li>
              )}
            </ul>
            <div style={{ marginTop: 32 }}>
              <a href={"#" + cta.to} className="btn btn-primary">{cta.label} →</a>
            </div>
          </div>
          {!flip && <div>{preview}</div>}
        </div>
      </div>
    </section>);

};

// ============== PREVIEWS — uno per strumento ==============

const BussolaPreview = () => {
  // Compass with example archetype constellation (the old hero ornament, repurposed)
  return (
    <div className="card" style={{ padding: 28, background: "var(--bg-elev)" }}>
      <div className="flex justify-between items-center" style={{ marginBottom: 14 }}>
        <div className="mono" style={{ fontSize: 11, letterSpacing: "0.1em", color: "var(--ink-3)" }}>FIG · BUSSOLA / 2 ASSI VISIBILI SU 4</div>
        <div className="mono" style={{ fontSize: 11, color: "var(--ink-4)" }}>n = 1 247</div>
      </div>
      <svg viewBox="0 0 400 400" width="100%" style={{ display: "block" }}>
        <defs>
          <pattern id="grid-bus" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="var(--rule-soft)" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="400" height="400" fill="url(#grid-bus)" />
        {[160, 120, 80, 40].map((r, i) =>
        <circle key={i} cx="200" cy="200" r={r} fill="none" stroke="var(--rule)" strokeWidth="0.8" />
        )}
        <line x1="40" y1="200" x2="360" y2="200" stroke="var(--ink-2)" strokeWidth="1" />
        <line x1="200" y1="40" x2="200" y2="360" stroke="var(--ink-2)" strokeWidth="1" />
        <text x="200" y="32" textAnchor="middle" fontSize="10" fontFamily="JetBrains Mono" fill="var(--ink-3)" letterSpacing="2">ACCELERAZIONE</text>
        <text x="200" y="378" textAnchor="middle" fontSize="10" fontFamily="JetBrains Mono" fill="var(--ink-3)" letterSpacing="2">PRECAUZIONE</text>
        <text x="36" y="200" textAnchor="end" fontSize="10" fontFamily="JetBrains Mono" fill="var(--ink-3)" letterSpacing="2" transform="rotate(-90 36 200)">STATO</text>
        <text x="364" y="200" textAnchor="start" fontSize="10" fontFamily="JetBrains Mono" fill="var(--ink-3)" letterSpacing="2" transform="rotate(90 364 200)">MERCATO</text>
        {[
        { x: 245, y: 135, l: "Industrialista" },
        { x: 162, y: 158, l: "Costituzionalista" },
        { x: 142, y: 175, l: "Welfarista" },
        { x: 250, y: 230, l: "Atlantista" },
        { x: 285, y: 285, l: "Libertario" },
        { x: 175, y: 270, l: "Techno-scettico" }].
        map((p, i) =>
        <g key={i}>
            <circle cx={p.x} cy={p.y} r="5" fill="var(--accent)" opacity="0.85" />
            <text x={p.x + 9} y={p.y + 3} fontSize="10.5" fontFamily="Inter" fill="var(--ink-2)">{p.l}</text>
          </g>
        )}
      </svg>
    </div>);

};

const AtlasPreview = () => {
  // World-map-ish abstract: country dots with size/opacity per dim, like the Atlas page
  const dim = "frontier";
  const top = [...ATLAS_COUNTRIES].filter((c) => !c.aggregate).sort((a, b) => b[dim] - a[dim]).slice(0, 12);
  return (
    <div className="card" style={{ padding: 28, background: "var(--bg-elev)" }}>
      <div className="flex justify-between items-center" style={{ marginBottom: 14 }}>
        <div className="mono" style={{ fontSize: 11, letterSpacing: "0.1em", color: "var(--ink-3)" }}>FIG · ATLAS / DIM. FRONTIER</div>
        <div className="mono" style={{ fontSize: 11, color: "var(--ink-4)" }}>scala 0—100</div>
      </div>
      <svg viewBox="0 0 400 220" width="100%" style={{ display: "block" }}>
        {/* Stylised continents */}
        <g fill="var(--rule-soft)" opacity="0.7">
          <path d="M 40 60 L 110 50 L 130 80 L 120 130 L 80 140 L 50 110 Z" />
          <path d="M 150 55 L 240 50 L 260 90 L 245 120 L 200 130 L 165 100 Z" />
          <path d="M 270 55 L 360 60 L 370 110 L 340 140 L 295 130 L 275 95 Z" />
          <path d="M 175 145 L 215 145 L 225 185 L 195 200 L 170 180 Z" />
        </g>
        {ATLAS_COUNTRIES.filter((c) => !c.aggregate).map((c) => {
          const r = 1.4 + c[dim] / 100 * 5;
          const op = 0.3 + c[dim] / 100 * 0.7;
          return (
            <circle
              key={c.code}
              cx={c.x / 100 * 400}
              cy={c.y / 100 * 220 + 30}
              r={r}
              fill="var(--accent)"
              opacity={op} />);


        })}
      </svg>
      <div className="flex gap-1" style={{ flexWrap: "wrap", marginTop: 16 }}>
        {top.slice(0, 6).map((c) =>
        <span key={c.code} className="mono" style={{ fontSize: 11, padding: "4px 8px", background: "var(--bg-deep)", borderRadius: 4, color: "var(--ink-2)" }}>
            {c.code} <span style={{ color: "var(--accent)" }}>{c[dim]}</span>
          </span>
        )}
      </div>
    </div>);

};

const AgoraPreview = () => {
  return (
    <div className="card" style={{ padding: 28, background: "var(--bg-elev)" }}>
      <div className="flex justify-between items-center" style={{ marginBottom: 16 }}>
        <div className="mono" style={{ fontSize: 11, letterSpacing: "0.1em", color: "var(--accent)" }}>CICLO ATTIVO · {AGORA_CYCLE.id.toUpperCase()}</div>
        <div className="mono" style={{ fontSize: 11, color: "var(--ink-4)" }}>{AGORA_CYCLE.daysLeft} giorni rimanenti</div>
      </div>
      <p style={{ fontFamily: "var(--serif)", fontSize: 22, lineHeight: 1.25, marginBottom: 16, letterSpacing: "-0.01em" }}>
        "{AGORA_CYCLE.question}"
      </p>
      <div className="flex gap-1" style={{ flexWrap: "wrap", marginBottom: 20 }}>
        {AGORA_CYCLE.tags.slice(0, 5).map((t) =>
        <span key={t} className="mono" style={{ fontSize: 10.5, padding: "4px 9px", background: "var(--bg-deep)", borderRadius: 999, color: "var(--ink-2)", letterSpacing: "0.04em" }}>#{t}</span>
        )}
      </div>
      <div style={{ borderTop: "1px solid var(--rule-soft)", paddingTop: 16 }}>
        <div className="flex justify-between items-baseline">
          <div>
            <div className="mono" style={{ fontSize: 28, fontWeight: 500, color: "var(--accent)" }}>{AGORA_CYCLE.participants}</div>
            <div className="text-mute" style={{ fontSize: 12, marginTop: 2 }}>partecipanti finora</div>
          </div>
          <div style={{ flex: 1, marginLeft: 24 }}>
            {/* progress bar of cycle */}
            <div style={{ height: 6, background: "var(--bg-deep)", borderRadius: 3, overflow: "hidden" }}>
              <div style={{ width: "57%", height: "100%", background: "var(--accent)" }}></div>
            </div>
            <div className="flex justify-between mono" style={{ fontSize: 10.5, color: "var(--ink-4)", marginTop: 6 }}>
              <span>{AGORA_CYCLE.opensAt}</span>
              <span>{AGORA_CYCLE.closesAt}</span>
            </div>
          </div>
        </div>
      </div>
    </div>);

};

const ImpactPreview = () => {
  // A horizontal bar per dimension, shaped like the result page
  const rows = [
  { l: "Esposizione", v: 72, ci: [62, 80] },
  { l: "Complementarità", v: 58, ci: [48, 67] },
  { l: "Prob. salario ↑", v: 41, ci: [30, 53] }];

  return (
    <div className="card" style={{ padding: 28, background: "var(--bg-elev)" }}>
      <div className="flex justify-between items-center" style={{ marginBottom: 14 }}>
        <div className="mono" style={{ fontSize: 11, letterSpacing: "0.1em", color: "var(--ink-3)" }}>FIG · IMPACT EXPLORER / OUTPUT</div>
        <div className="mono" style={{ fontSize: 11, color: "var(--ink-4)" }}>ISCO 2611</div>
      </div>
      <div style={{ marginBottom: 18 }}>
        <div style={{ fontFamily: "var(--serif)", fontSize: 18, marginBottom: 4 }}>Avvocato/a · Lombardia</div>
        <div className="text-mute" style={{ fontSize: 13 }}>40-49 anni · laurea magistrale</div>
      </div>
      <div className="flex col gap-4">
        {rows.map((r, i) =>
        <div key={i}>
            <div className="flex justify-between items-baseline" style={{ marginBottom: 6 }}>
              <span style={{ fontSize: 13, color: "var(--ink-2)" }}>{r.l}</span>
              <span className="mono" style={{ fontSize: 14, fontWeight: 500, color: "var(--accent)" }}>{r.v}<span style={{ color: "var(--ink-4)", fontWeight: 400, fontSize: 11 }}>/100</span></span>
            </div>
            <div style={{ position: "relative", height: 8, background: "var(--bg-deep)", borderRadius: 4, overflow: "hidden" }}>
              {/* CI band */}
              <div style={{ position: "absolute", left: r.ci[0] + "%", width: r.ci[1] - r.ci[0] + "%", height: "100%", background: "var(--accent)", opacity: 0.25 }}></div>
              {/* point estimate */}
              <div style={{ position: "absolute", left: r.v + "%", top: -2, width: 2, height: 12, background: "var(--accent)" }}></div>
            </div>
            <div className="mono text-mute" style={{ fontSize: 10.5, marginTop: 4 }}>IC 90% [{r.ci[0]}–{r.ci[1]}]</div>
          </div>
        )}
      </div>
      <div className="text-mute" style={{ fontSize: 12, marginTop: 20, paddingTop: 16, borderTop: "1px solid var(--rule-soft)" }}>
        Felten et al. 2023 · Eloundou et al. 2023 · INAPP 2024
      </div>
    </div>);

};

window.HomePage = HomePage;