// About page
const AboutPage = () => (
  <main className="page-fade">
    <section style={{ paddingTop: 80, paddingBottom: 56 }}>
      <div className="container" style={{ maxWidth: 880 }}>
        <div className="eyebrow" style={{ marginBottom: 14 }}>Chi siamo</div>
        <h1 style={{ fontSize: "clamp(36px, 4vw, 56px)" }}>Un laboratorio per ripensare l'AI come materia politica.</h1>
        <p className="lede" style={{ marginTop: 28 }}>
          Post/Human Policy Lab è un osservatorio-laboratorio indipendente. Pubblica analisi, costruisce strumenti interattivi, ospita spazi deliberativi. Lavora per chi opera o vota nell'area del riformismo italiano di centro-sinistra e nell'alveo del Partito Popolare Europeo.
        </p>
      </div>
    </section>

    <hr className="rule-soft" />

    <section style={{ paddingTop: 64, paddingBottom: 64 }}>
      <div className="container" style={{ maxWidth: 880 }}>
        <div className="eyebrow" style={{ marginBottom: 12 }}>Perché esiste</div>
        <h2 style={{ fontSize: 32, marginBottom: 24 }}>Lo spazio del riformismo tecnologicamente alfabetizzato.</h2>
        <div className="flex col gap-5">
          <p style={{ fontSize: 17, lineHeight: 1.7, color: "var(--ink-2)" }}>
            In Italia e nello spazio riformista europeo esistono due spazi discorsivi dominanti sull'AI, entrambi insoddisfacenti: il techno-ottimismo divulgativo, che racconta l'AI come inevitabile e benefica; e il techno-allarmismo difensivo, che la tratta come minaccia da contenere con strumenti novecenteschi.
          </p>
          <p style={{ fontSize: 17, lineHeight: 1.7, color: "var(--ink-2)" }}>
            Lo spazio vuoto è quello del riformismo tecnologicamente alfabetizzato: un discorso che riconosce la portata sistemica delle trasformazioni in corso, le guarda senza isteria e senza entusiasmo, e prova a derivarne policy concrete coerenti con una tradizione di democrazia costituzionale, economia sociale di mercato, universalismo redistributivo moderato.
          </p>
        </div>
      </div>
    </section>

    <section style={{ paddingTop: 32, paddingBottom: 64 }}>
      <div className="container" style={{ maxWidth: 880 }}>
        <div className="eyebrow" style={{ marginBottom: 12 }}>Valori</div>
        <h2 style={{ fontSize: 32, marginBottom: 32 }}>Cinque principi che ci orientano.</h2>
        <div className="flex col gap-5">
          {[
            { t: "Onestà epistemica", d: "Ogni affermazione ha uno status chiaro: fatto verificabile, proiezione probabilistica, opinione firmata, scenario ipotetico. Niente certezze che non sono tali." },
            { t: "Accessibilità senza dumbing down", d: "Si spiegano i termini tecnici la prima volta. Non si rinuncia alla precisione per paura del lettore." },
            { t: "Rifiuto del moralismo", d: "Si discutono trade-off, non si fanno sermoni. I lettori non sono da redimere, sono da informare e attrezzare." },
            { t: "Diffidenza verso il consensus tech", d: "La narrativa dominante — accelerazionista o precauzionista — è sempre da interrogare. Le tesi scomode ma argomentate hanno priorità sulle convergenze comode." },
            { t: "Pragmatismo istituzionale", d: "Il punto di arrivo è sempre cosa si può fare, con quali strumenti, in quale orizzonte. Le analisi che finiscono in generica denuncia hanno valore limitato." },
          ].map((v, i) => (
            <div key={i} className="flex gap-5">
              <div className="mono" style={{ fontSize: 14, color: "var(--accent)", minWidth: 40, paddingTop: 4 }}>0{i + 1}</div>
              <div>
                <h4 style={{ marginBottom: 6 }}>{v.t}</h4>
                <p className="text-mute" style={{ fontSize: 15 }}>{v.d}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section style={{ paddingTop: 32, paddingBottom: 64, background: "var(--bg-deep)", padding: "64px 0" }}>
      <div className="container" style={{ maxWidth: 880 }}>
        <div className="eyebrow" style={{ marginBottom: 12 }}>Rapporto con MondoDem</div>
        <h2 style={{ fontSize: 28, marginBottom: 20 }}>Indipendenti, in dialogo.</h2>
        <p style={{ fontSize: 16, lineHeight: 1.7, color: "var(--ink-2)" }}>
          Post/Human Policy Lab è un progetto indipendente ispirato allo spirito di MondoDem e in dialogo con esso. Non è un'emanazione formale, non usa il brand MondoDem nel proprio logo, non ne condivide la governance. Ci sono cross-posting selettivi (in particolare la serie <em>Goodbye Human</em>), reciproche segnalazioni, possibili eventi congiunti.
        </p>
      </div>
    </section>

    <section style={{ paddingTop: 64, paddingBottom: 64 }}>
      <div className="container" style={{ maxWidth: 880 }}>
        <div className="eyebrow" style={{ marginBottom: 12 }}>Cosa non siamo</div>
        <h2 style={{ fontSize: 28, marginBottom: 24 }}>Per evitare drift.</h2>
        <ul style={{ paddingLeft: 0, listStyle: "none" }}>
          {[
            "Un blog di opinione personale",
            "Una testata di attualità tech generalista",
            "Un canale di advocacy per una singola posizione politica",
            "Un collettore di hot take su lancio di prodotti AI",
            "Un sito di recensioni di strumenti AI",
            "Un think tank aziendale mascherato da indie",
          ].map((t, i) => (
            <li key={i} className="flex gap-3" style={{ padding: "14px 0", borderBottom: "1px solid var(--rule-soft)", fontSize: 16 }}>
              <span className="mono text-mute-2" style={{ minWidth: 32 }}>—</span>
              <span style={{ color: "var(--ink-2)" }}>{t}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>

    <section style={{ paddingTop: 32, paddingBottom: 96 }}>
      <div className="container" style={{ maxWidth: 880 }}>
        <div className="eyebrow" style={{ marginBottom: 12 }}>Contatti</div>
        <h2 style={{ fontSize: 28, marginBottom: 20 }}>Scrivici.</h2>
        <div className="flex gap-8" style={{ flexWrap: "wrap" }}>
          <div>
            <div className="mono text-mute-2" style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 6 }}>Editoriale</div>
            <a href="mailto:redazione@posthumanlab.eu" className="text-accent" style={{ fontSize: 16 }}>redazione@posthumanlab.eu</a>
          </div>
          <div>
            <div className="mono text-mute-2" style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 6 }}>Stampa</div>
            <a href="mailto:press@posthumanlab.eu" className="text-accent" style={{ fontSize: 16 }}>press@posthumanlab.eu</a>
          </div>
          <div>
            <div className="mono text-mute-2" style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 6 }}>Tecnico</div>
            <a href="mailto:tech@posthumanlab.eu" className="text-accent" style={{ fontSize: 16 }}>tech@posthumanlab.eu</a>
          </div>
        </div>
      </div>
    </section>
  </main>
);

// Journal page (simplified — list of articles)
const JournalPage = () => (
  <main className="page-fade">
    <section style={{ paddingTop: 64, paddingBottom: 32 }}>
      <div className="container">
        <div className="eyebrow" style={{ marginBottom: 14 }}>Journal · journal.posthumanlab.eu</div>
        <h1 style={{ fontSize: "clamp(36px, 4vw, 52px)" }}>Le analisi del Lab.</h1>
        <p className="lede" style={{ marginTop: 20, maxWidth: 720 }}>
          Articoli, saggi brevi, policy brief, scenari narrativi. Distribuiti via Substack, sindacati su questo sito.
        </p>
        <div className="flex gap-3" style={{ marginTop: 32 }}>
          <a href="#" className="btn btn-primary">Iscriviti gratis</a>
          <a href="#" className="btn btn-ghost">Vai a Substack →</a>
        </div>
      </div>
    </section>
    <hr className="rule-soft" />
    <section style={{ paddingTop: 56, paddingBottom: 80 }}>
      <div className="container">
        <div className="flex gap-2" style={{ marginBottom: 32, flexWrap: "wrap" }}>
          {["Tutti", "Impatto domestico", "Architettura europea", "Geopolitica", "Goodbye Human"].map((t, i) => (
            <button key={i} className={"btn " + (i === 0 ? "btn-primary" : "btn-ghost")} style={{ padding: "7px 14px", fontSize: 13 }}>{t}</button>
          ))}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
          {ARTICLES.map((a, i) => <ArticleCard key={i} article={a} />)}
        </div>
      </div>
    </section>
  </main>
);

Object.assign(window, { AboutPage, JournalPage });
