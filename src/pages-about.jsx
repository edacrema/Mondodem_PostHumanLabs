// About page
const AboutPage = () => (
  <main className="page-fade">
    <section style={{ paddingTop: 80, paddingBottom: 48 }}>
      <div className="container" style={{ maxWidth: 820 }}>
        <div className="eyebrow" style={{ marginBottom: 14 }}>Chi siamo</div>
        <h1 style={{ fontSize: "clamp(36px, 4vw, 56px)" }}>Uno spinoff di MondoDem dedicato all'intelligenza artificiale.</h1>
        <p className="lede" style={{ marginTop: 28 }}>
          Post/Human Policy Lab nasce come progetto spinoff di <a href="https://www.mondodem.it/" target="_blank" rel="noopener noreferrer" className="text-accent">MondoDem ↗</a> per dedicare uno spazio specifico all'analisi dell'impatto politico, economico, sociale e geopolitico dell'intelligenza artificiale.
        </p>
      </div>
    </section>

    <hr className="rule-soft" />

    <section style={{ paddingTop: 56, paddingBottom: 56 }}>
      <div className="container" style={{ maxWidth: 820 }}>
        <div className="eyebrow" style={{ marginBottom: 12 }}>Da dove veniamo</div>
        <h2 style={{ fontSize: 30, marginBottom: 20 }}>Una linea di ricerca che chiedeva un suo spazio.</h2>
        <div className="flex col gap-5">
          <p style={{ fontSize: 17, lineHeight: 1.7, color: "var(--ink-2)" }}>
            MondoDem è un'associazione di esperti di politica estera italiani di area progressista che si occupa di geopolitica. Lavorando sulle grandi linee di frattura internazionali — competizione tra potenze, ordine multilaterale, sovranità tecnologica europea — è emersa con crescente nitidezza la centralità dell'intelligenza artificiale: un dominio in cui si stanno ridisegnando equilibri di potere, capacità statuali e dipendenze industriali.
          </p>
          <p style={{ fontSize: 17, lineHeight: 1.7, color: "var(--ink-2)" }}>
            Post/Human Policy Lab nasce per dare a questo dominio uno spazio dedicato, con strumenti propri e un'attenzione continuativa. Pubblica analisi, costruisce strumenti interattivi (la Bussola, l'Atlas, l'Impact Explorer) e ospita spazi deliberativi (l'Agora). Mantiene una propria identità editoriale e operativa, restando in dialogo costante con MondoDem.
          </p>
        </div>
      </div>
    </section>

    <hr className="rule-soft" />

    <section style={{ paddingTop: 56, paddingBottom: 56 }}>
      <div className="container" style={{ maxWidth: 820 }}>
        <div className="eyebrow" style={{ marginBottom: 12 }}>A chi parliamo</div>
        <h2 style={{ fontSize: 30, marginBottom: 20 }}>Riformismo tecnologicamente alfabetizzato.</h2>
        <p style={{ fontSize: 17, lineHeight: 1.7, color: "var(--ink-2)" }}>
          Il discorso pubblico sull'AI oscilla tra techno-ottimismo divulgativo e allarmismo difensivo. Lo spazio che cerchiamo di abitare è un altro: quello di un riformismo che riconosce la portata sistemica delle trasformazioni in corso, le guarda senza isteria e senza entusiasmo, e prova a derivarne policy concrete coerenti con una tradizione di democrazia costituzionale, economia sociale di mercato e universalismo redistributivo moderato.
        </p>
      </div>
    </section>

    <hr className="rule-soft" />

    <section style={{ paddingTop: 56, paddingBottom: 96 }}>
      <div className="container" style={{ maxWidth: 820 }}>
        <div className="eyebrow" style={{ marginBottom: 12 }}>Contatti</div>
        <h2 style={{ fontSize: 28, marginBottom: 24 }}>Scrivici.</h2>
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
