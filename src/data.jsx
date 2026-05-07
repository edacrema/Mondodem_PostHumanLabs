// Centralized data for the prototype
const ARTICLES = [
  {
    title: "L'AI Act è entrato in vigore. Adesso comincia il difficile.",
    excerpt: "Diciotto mesi dopo la pubblicazione, l'implementazione nazionale del regolamento europeo si scontra con tre nodi: autorità competenti, sandbox industriali, regimi di responsabilità. Una mappa dello stato dell'arte in Italia.",
    author: "G. Caruso",
    date: "12 Apr 2026",
    minutes: 14,
    tag: "Architettura europea",
    featured: true,
  },
  {
    title: "Lavoro: l'esposizione non è il destino",
    excerpt: "I dati Felten 2024 incrociati con la struttura occupazionale italiana raccontano una geografia inattesa. Il Sud è meno esposto del Nord, ma è anche meno preparato a complementare. Cosa significa per il welfare.",
    author: "M. Donati",
    date: "04 Apr 2026",
    minutes: 11,
    tag: "Impatto domestico",
  },
  {
    title: "Compute sovrano: cosa abbiamo imparato dai primi due anni di EuroHPC AI Factories",
    excerpt: "Sei nodi attivi, due in costruzione. La capacità c'è, l'accesso è il problema vero. Un'inchiesta ai bandi, ai tempi e ai criteri di assegnazione.",
    author: "L. Bertolini",
    date: "28 Mar 2026",
    minutes: 18,
    tag: "Architettura europea",
  },
  {
    title: "Goodbye Human / 7 — Quando il modello diventa controparte",
    excerpt: "Settima puntata della serie. La negoziazione algoritmica nei contratti di servizio: tre casi italiani recenti, un quadro giurisprudenziale che non c'è ancora.",
    author: "G. Caruso",
    date: "21 Mar 2026",
    minutes: 9,
    tag: "Geopolitica",
    crossPost: "MEGATREND",
  },
  {
    title: "L'AI nelle aule giudiziarie: tre scenari per la Cassazione",
    excerpt: "Dal supporto motivazionale al triage del contenzioso. Cosa è già praticabile, cosa richiede una norma, cosa è prematuro. Con un'intervista a un magistrato della IV sezione.",
    author: "S. Romano",
    date: "14 Mar 2026",
    minutes: 13,
    tag: "Impatto domestico",
  },
  {
    title: "TSMC Arizona, Samsung Texas, Intel Ohio: la mappa dei semiconduttori 2026",
    excerpt: "Aggiornamento al Q1 2026 della catena di approvvigionamento dei chip avanzati. Tre numeri che spiegano perché la sovranità tecnologica europea passa ancora per Taiwan.",
    author: "L. Bertolini",
    date: "07 Mar 2026",
    minutes: 16,
    tag: "Geopolitica",
  },
];

// ===== BUSSOLA =====
const BUSSOLA_AXES = [
  { key: "accel", label: "Accelerazione", opposite: "Precauzione" },
  { key: "stato", label: "Stato", opposite: "Mercato" },
  { key: "univ", label: "Universalismo", opposite: "Selettività" },
  { key: "coop", label: "Cooperazione", opposite: "Sovranismo" },
];

const BUSSOLA_QUESTIONS = [
  {
    q: "Sull'AI Act, dopo 18 mesi di applicazione, l'orientamento corretto è:",
    options: [
      { t: "Stretta sui modelli di frontiera, allargamento della class-action", w: { accel: -2, stato: 2, univ: 1, coop: 1 } },
      { t: "Mantenere il framework attuale, accelerare l'implementazione", w: { accel: 1, stato: 1, univ: 1, coop: 2 } },
      { t: "Sandbox più ampie e meno reporting per le PMI europee", w: { accel: 2, stato: -1, univ: 0, coop: 1 } },
      { t: "Sospensione di alcuni obblighi per tutelare la competitività", w: { accel: 2, stato: -2, univ: -1, coop: -1 } },
    ],
  },
  {
    q: "Sulla redistribuzione del valore creato dall'AI:",
    options: [
      { t: "Tassa sull'uso di capitale algoritmico, finanziamento del welfare", w: { accel: -1, stato: 2, univ: 2, coop: 1 } },
      { t: "Reddito di transizione condizionato a formazione", w: { accel: 0, stato: 1, univ: 2, coop: 0 } },
      { t: "Detrazioni a chi assume umani anziché automatizzare", w: { accel: -1, stato: 1, univ: 0, coop: 0 } },
      { t: "Mercato del lavoro flessibile, niente nuove imposte", w: { accel: 2, stato: -2, univ: -2, coop: 0 } },
    ],
  },
  {
    q: "Sulla sovranità computazionale europea:",
    options: [
      { t: "Operatore pubblico europeo del compute, accesso garantito", w: { accel: 0, stato: 2, univ: 1, coop: 2 } },
      { t: "Espansione EuroHPC + bandi industriali condizionati", w: { accel: 1, stato: 1, univ: 1, coop: 2 } },
      { t: "Partnership preferenziale con player US sotto regole UE", w: { accel: 1, stato: 0, univ: 0, coop: 1 } },
      { t: "Mercato aperto, non ha senso 'fare in casa'", w: { accel: 2, stato: -2, univ: -1, coop: -2 } },
    ],
  },
  {
    q: "Sulla scuola pubblica e l'AI generativa in classe:",
    options: [
      { t: "Divieto fino alla secondaria, formazione massiccia docenti", w: { accel: -2, stato: 1, univ: 1, coop: 0 } },
      { t: "Linee guida nazionali + sperimentazione regolata", w: { accel: 0, stato: 1, univ: 1, coop: 1 } },
      { t: "Autonomia scolastica e platform agnosticism", w: { accel: 1, stato: -1, univ: 0, coop: 0 } },
      { t: "Adozione massima, è una competenza chiave del 21° secolo", w: { accel: 2, stato: -1, univ: -1, coop: 0 } },
    ],
  },
  {
    q: "Sull'uso dell'AI nei concorsi pubblici e nella selezione del personale:",
    options: [
      { t: "Vietare lo screening automatico, mantenere giudizio umano", w: { accel: -2, stato: 2, univ: 2, coop: 0 } },
      { t: "Audit obbligatori, trasparenza dell'algoritmo", w: { accel: 0, stato: 2, univ: 2, coop: 1 } },
      { t: "Linee guida settoriali, niente divieti generali", w: { accel: 1, stato: 0, univ: 0, coop: 0 } },
      { t: "Lasciare al datore di lavoro, opt-out individuale", w: { accel: 2, stato: -2, univ: -2, coop: 0 } },
    ],
  },
  {
    q: "Sulla disinformazione AI-generata in periodo elettorale:",
    options: [
      { t: "Watermark obbligatorio, sanzioni alle piattaforme", w: { accel: -1, stato: 2, univ: 1, coop: 2 } },
      { t: "Trasparenza inserzioni, fact-checking finanziato pubblicamente", w: { accel: 0, stato: 1, univ: 1, coop: 2 } },
      { t: "Auto-regolazione delle piattaforme con codici di condotta", w: { accel: 1, stato: -1, univ: 0, coop: 0 } },
      { t: "Free speech assoluto, no intervento", w: { accel: 2, stato: -2, univ: -1, coop: -1 } },
    ],
  },
  {
    q: "Sulla cooperazione UE-USA in materia di safety e governance dei modelli di frontiera:",
    options: [
      { t: "Trattato vincolante con audit reciproci", w: { accel: -1, stato: 1, univ: 1, coop: 2 } },
      { t: "Accordi tecnici settoriali sui rischi catastrofici", w: { accel: 0, stato: 1, univ: 1, coop: 2 } },
      { t: "Posizione autonoma UE, dialogo informale", w: { accel: 0, stato: 1, univ: 0, coop: 0 } },
      { t: "L'UE deve regolare per i suoi cittadini, basta", w: { accel: 0, stato: 1, univ: 0, coop: -2 } },
    ],
  },
  {
    q: "Sull'AI nei sistemi d'arma autonomi:",
    options: [
      { t: "Moratoria internazionale vincolante, anche unilaterale UE", w: { accel: -2, stato: 1, univ: 2, coop: 2 } },
      { t: "Convenzione internazionale sotto egida ONU", w: { accel: -1, stato: 1, univ: 1, coop: 2 } },
      { t: "Standard NATO, controllo umano significativo", w: { accel: 0, stato: 1, univ: 0, coop: 1 } },
      { t: "Capacità autonome nazionali, è guerra ibrida", w: { accel: 2, stato: 0, univ: -1, coop: -2 } },
    ],
  },
  {
    q: "Sulla protezione dei dati di training degli LLM:",
    options: [
      { t: "Opt-in esplicito per ogni opera, compensazione", w: { accel: -2, stato: 1, univ: 1, coop: 0 } },
      { t: "Licenze collettive, equo compenso a categoria", w: { accel: 0, stato: 1, univ: 2, coop: 1 } },
      { t: "Eccezione text-and-data-mining estesa con opt-out", w: { accel: 1, stato: 0, univ: 0, coop: 0 } },
      { t: "Fair use stile USA, nessun obbligo", w: { accel: 2, stato: -1, univ: -1, coop: -1 } },
    ],
  },
  {
    q: "Sulla responsabilità civile per danni causati da sistemi AI:",
    options: [
      { t: "Responsabilità oggettiva del produttore, fondo solidaristico", w: { accel: -1, stato: 2, univ: 2, coop: 1 } },
      { t: "Inversione onere della prova per categorie di rischio", w: { accel: 0, stato: 2, univ: 1, coop: 1 } },
      { t: "Diritto comune con linee guida settoriali", w: { accel: 1, stato: 0, univ: 0, coop: 0 } },
      { t: "Disclaimer e accettazione utente", w: { accel: 2, stato: -1, univ: -2, coop: 0 } },
    ],
  },
  {
    q: "Sull'AI nella sanità pubblica:",
    options: [
      { t: "Solo in strutture pubbliche, no privatizzazione di fatto", w: { accel: -1, stato: 2, univ: 2, coop: 0 } },
      { t: "Investimento pubblico massiccio, algoritmi pubblici", w: { accel: 1, stato: 2, univ: 2, coop: 1 } },
      { t: "Partnership con aziende, regole stringenti", w: { accel: 1, stato: 0, univ: 1, coop: 1 } },
      { t: "Mercato delle soluzioni, scelta del medico", w: { accel: 2, stato: -2, univ: -1, coop: 0 } },
    ],
  },
  {
    q: "Sui chip avanzati e l'export control:",
    options: [
      { t: "Allineamento totale con USA, divieti estesi", w: { accel: 0, stato: 1, univ: 0, coop: 1 } },
      { t: "Lista UE autonoma, basata su valutazione strategica", w: { accel: 0, stato: 2, univ: 0, coop: 1 } },
      { t: "Export controls solo su dual-use militare evidente", w: { accel: 1, stato: 0, univ: 0, coop: 0 } },
      { t: "Mercato libero, gli embarghi danneggiano l'Europa", w: { accel: 2, stato: -2, univ: 0, coop: -1 } },
    ],
  },
  {
    q: "Sui programmi di formazione professionale per la transizione AI:",
    options: [
      { t: "Diritto soggettivo alla formazione, finanziato dallo Stato", w: { accel: -1, stato: 2, univ: 2, coop: 0 } },
      { t: "Conti individuali di apprendimento permanente", w: { accel: 1, stato: 1, univ: 2, coop: 1 } },
      { t: "Voucher selettivi su settori a rischio", w: { accel: 1, stato: 0, univ: 0, coop: 0 } },
      { t: "Iniziativa privata, mercato della formazione", w: { accel: 2, stato: -2, univ: -2, coop: 0 } },
    ],
  },
  {
    q: "Sul dibattito pubblico sui rischi esistenziali (x-risk) dell'AI:",
    options: [
      { t: "È prioritario, va finanziata ricerca AI safety", w: { accel: -2, stato: 1, univ: 1, coop: 2 } },
      { t: "Rilevante ma non prioritario rispetto ai rischi presenti", w: { accel: 0, stato: 1, univ: 1, coop: 1 } },
      { t: "Distrazione dai problemi reali del lavoro e del welfare", w: { accel: 0, stato: 1, univ: 1, coop: 0 } },
      { t: "Sci-fi accademica, non serve a niente", w: { accel: 2, stato: -1, univ: 0, coop: 0 } },
    ],
  },
  {
    q: "Sulla posizione del PD/area riformista italiana sull'AI nei prossimi 24 mesi:",
    options: [
      { t: "Ambizione costituzionale: nuovo articolo sui diritti algoritmici", w: { accel: -1, stato: 2, univ: 2, coop: 1 } },
      { t: "Pacchetto policy: lavoro, scuola, sanità, infrastrutture", w: { accel: 1, stato: 1, univ: 2, coop: 1 } },
      { t: "Posizionamento europeo, ruolo di mediazione tra USA e Cina", w: { accel: 1, stato: 1, univ: 0, coop: 2 } },
      { t: "Tema secondario, priorità classiche del riformismo", w: { accel: 0, stato: 1, univ: 1, coop: 0 } },
    ],
  },
];

const BUSSOLA_ARCHETYPES = [
  {
    id: "costituzionalista",
    name: "Il/la Costituzionalista Algoritmico",
    pos: { accel: -1, stato: 2, univ: 2, coop: 1 },
    quote: "I diritti precedono la tecnologia. Adattare il primo termine al secondo è un errore di categoria.",
    desc: "Vede nell'AI una nuova frontiera dove riaffermare le garanzie costituzionali del Novecento. Crede in una funzione regolatoria forte, in obblighi di trasparenza vincolanti e in un ruolo dell'Unione come standard-setter globale. Diffidente verso il consensus tech, ottimista sulla capacità delle istituzioni democratiche di adattarsi.",
    near: ["S&D", "Greens"],
  },
  {
    id: "industrialista",
    name: "Il/la Industrialista Europeo/a",
    pos: { accel: 1, stato: 1, univ: 1, coop: 2 },
    quote: "L'Europa non si difende restando indietro. Si difende costruendo.",
    desc: "Convinto/a che la sovranità tecnologica europea richieda investimenti pubblici massicci, partnership coordinate, e un'alleanza atlantica matura. Pragmatico/a sui trade-off: accetta deroghe regolatorie mirate se servono a costruire capacità.",
    near: ["S&D", "Renew", "PPE riformatore"],
  },
  {
    id: "welfarista",
    name: "Il/la Welfarista 4.0",
    pos: { accel: 0, stato: 2, univ: 2, coop: 0 },
    quote: "La domanda non è se ci ruberà il lavoro. È chi paga la transizione.",
    desc: "Vede l'AI principalmente come questione redistributiva. Priorità: formazione permanente come diritto, fondi solidaristici sui guadagni di produttività, protezioni per le categorie esposte. Meno interessato/a alla geopolitica.",
    near: ["S&D", "Sinistra europea"],
  },
  {
    id: "atlantista",
    name: "L'Atlantista Tecnologico",
    pos: { accel: 1, stato: 0, univ: 0, coop: 2 },
    quote: "Il mondo libero ha un'unica frontiera tecnologica. È meglio difenderla insieme.",
    desc: "L'asse transatlantico è l'orizzonte naturale. Allineamento con USA su export controls, standard di safety, governance dei modelli di frontiera. Fiducia limitata nelle istituzioni globali, fiducia alta nelle istituzioni occidentali.",
    near: ["PPE", "Renew"],
  },
  {
    id: "pragmatico",
    name: "Il/la Pragmatico/a Centrista",
    pos: { accel: 1, stato: 1, univ: 0, coop: 1 },
    quote: "La buona policy è un'arte di compromessi. La cattiva è una collezione di principi.",
    desc: "Caso per caso, settore per settore. Diffidente verso le impostazioni totali, sia accelerazioniste sia precauzioniste. Coerente con la tradizione riformista italiana di mediazione, attento/a alla fattibilità amministrativa.",
    near: ["Renew", "PPE"],
  },
  {
    id: "tecno-skeptic",
    name: "Il/la Techno-Scettico/a",
    pos: { accel: -2, stato: 1, univ: 1, coop: 0 },
    quote: "Non tutto ciò che è possibile è desiderabile. Anzi, quasi mai.",
    desc: "Crede che l'hype dell'AI superi largamente la sostanza, e che il costo sociale dell'adozione sia sottostimato. Favorevole a moratorie selettive, opposto/a all'AI in scuola e sanità senza forti garanzie.",
    near: ["Sinistra europea", "Greens"],
  },
  {
    id: "libertario",
    name: "Il/la Libertario/a Digitale",
    pos: { accel: 2, stato: -2, univ: -1, coop: 0 },
    quote: "Lo Stato non è qualificato a decidere quale software puoi usare.",
    desc: "Posizione minoritaria nell'area riformista ma rilevante. Diffida dell'iper-regolazione, vede l'AI Act come freno alla competitività, predilige soluzioni di mercato e responsabilità individuale.",
    near: ["Renew liberale", "ECR"],
  },
  {
    id: "globalista",
    name: "Il/la Globalista Cooperativo/a",
    pos: { accel: 0, stato: 1, univ: 1, coop: 2 },
    quote: "I problemi planetari richiedono governance planetaria. Anche quando è scomodo.",
    desc: "Punta su trattati internazionali vincolanti, governance globale dei modelli di frontiera, accordi multilaterali su safety e disarmo algoritmico. Critico/a verso l'unilateralismo, anche quello europeo.",
    near: ["S&D", "Greens"],
  },
];

// ===== ATLAS =====
const ATLAS_DIMENSIONS = [
  { key: "regulatory", label: "Regolazione" },
  { key: "industrial", label: "Industria" },
  { key: "frontier", label: "Frontier" },
  { key: "talent", label: "Talento" },
  { key: "military", label: "Militare" },
  { key: "geo", label: "Geopolitica" },
];

const ATLAS_COUNTRIES = [
  { code: "US", name: "Stati Uniti", regulatory: 48, industrial: 96, frontier: 98, talent: 92, military: 95, geo: 94, x: 86, y: 38, blurb: "Egemone tecnologico-industriale, regolazione frammentata a livello federale, dominio sui modelli di frontiera attraverso 4-5 laboratori privati con backing pubblico crescente.", sources: ["Stanford HAI", "ETO CSET", "OECD.AI"] },
  { code: "CN", name: "Cina", regulatory: 72, industrial: 88, frontier: 78, talent: 82, military: 88, geo: 90, x: 75, y: 42, blurb: "Pianificazione industriale aggressiva, regolazione interna selettiva e veloce, gap nella frontier mitigato da scala dei dati e capacità computazionale crescente.", sources: ["ETO CSET", "Tortoise"] },
  { code: "DE", name: "Germania", regulatory: 78, industrial: 62, frontier: 48, talent: 64, military: 38, geo: 56, x: 50, y: 35, blurb: "Pilastro industriale UE, integrazione AI nel manifatturiero avanzata, frontier debole, dipendenza da compute esterno significativa.", sources: ["OECD.AI", "EU AI Watch"] },
  { code: "FR", name: "Francia", regulatory: 82, industrial: 64, frontier: 68, talent: 72, military: 62, geo: 70, x: 49, y: 38, blurb: "Polo francese di frontier (Mistral, Hugging Face), spinta sovranista UE, capacità militare integrata, ambizione di leadership regolatoria.", sources: ["OECD.AI", "Stanford HAI"] },
  { code: "IT", name: "Italia", regulatory: 70, industrial: 48, frontier: 32, talent: 56, military: 42, geo: 44, x: 51, y: 42, blurb: "Implementazione AI Act in corso, capacità industriale concentrata in nicchie (manifatturiero, sanità), frontier marginale, talento in fuga.", sources: ["INAPP", "OECD.AI"] },
  { code: "UK", name: "Regno Unito", regulatory: 62, industrial: 70, frontier: 72, talent: 78, military: 70, geo: 72, x: 47, y: 33, blurb: "Approccio regolatorio leggero post-Brexit, ecosistema frontier solido (DeepMind), ponte tra regimi USA e UE.", sources: ["Stanford HAI", "Tortoise"] },
  { code: "ES", name: "Spagna", regulatory: 72, industrial: 50, frontier: 36, talent: 58, military: 32, geo: 40, x: 47, y: 40, blurb: "Sandbox AI Act ospitata, capacità industriale media, ambizione di hub digitale Mediterraneo.", sources: ["OECD.AI"] },
  { code: "NL", name: "Paesi Bassi", regulatory: 76, industrial: 68, frontier: 52, talent: 70, military: 40, geo: 60, x: 51, y: 33, blurb: "ASML è asset geopolitico critico, ricerca AI solida, posizione UE pragmatica.", sources: ["OECD.AI", "ETO CSET"] },
  { code: "PL", name: "Polonia", regulatory: 64, industrial: 46, frontier: 28, talent: 52, military: 70, geo: 58, x: 53, y: 35, blurb: "Frontiera est UE, investimenti militari in crescita, ambizione di hub regionale, talento abbondante ma ancora periferico.", sources: ["OECD.AI", "ETO CSET"] },
  { code: "SE", name: "Svezia", regulatory: 74, industrial: 60, frontier: 50, talent: 72, military: 36, geo: 46, x: 53, y: 30, blurb: "Tradizione di innovazione, capacità manifatturiera selettiva, ricerca AI di qualità, scala limitata.", sources: ["OECD.AI"] },
  { code: "IL", name: "Israele", regulatory: 50, industrial: 78, frontier: 70, talent: 84, military: 92, geo: 76, x: 56, y: 44, blurb: "Densità di talento estrema, integrazione militare-civile, frontier dual-use, posizionamento geopolitico instabile.", sources: ["Stanford HAI", "Tortoise"] },
  { code: "JP", name: "Giappone", regulatory: 58, industrial: 76, frontier: 58, talent: 72, military: 50, geo: 64, x: 84, y: 41, blurb: "Approccio regolatorio leggero, integrazione robotica avanzata, frontier in ricostruzione, alleanza atlantica solida.", sources: ["Stanford HAI", "OECD.AI"] },
  { code: "KR", name: "Corea del Sud", regulatory: 62, industrial: 82, frontier: 64, talent: 78, military: 60, geo: 66, x: 83, y: 41, blurb: "Capacità chip (Samsung, SK Hynix), investimenti R&D aggressivi, vulnerabilità geopolitica.", sources: ["ETO CSET", "Tortoise"] },
  { code: "IN", name: "India", regulatory: 44, industrial: 56, frontier: 46, talent: 80, military: 50, geo: 64, x: 75, y: 47, blurb: "Talento abbondante a livello globale, frontier nazionale in costruzione, posizione geopolitica equidistante.", sources: ["Stanford HAI", "ETO CSET"] },
  { code: "SG", name: "Singapore", regulatory: 70, industrial: 64, frontier: 54, talent: 74, military: 42, geo: 56, x: 80, y: 51, blurb: "Hub regionale, regolazione pragmatica, capacità di attrazione talento, scala fisica limitata.", sources: ["OECD.AI", "Tortoise"] },
  { code: "AE", name: "Emirati Arabi Uniti", regulatory: 44, industrial: 58, frontier: 52, talent: 60, military: 50, geo: 64, x: 67, y: 47, blurb: "Investimenti sovrani aggressivi, frontier nazionale (Falcon, G42), posizione geopolitica multilaterale.", sources: ["Tortoise", "Stanford HAI"] },
  { code: "CA", name: "Canada", regulatory: 68, industrial: 60, frontier: 70, talent: 78, military: 38, geo: 52, x: 22, y: 32, blurb: "Tradizione di ricerca AI di altissimo livello (Mila, Vector), capacità industriale media, allineamento atlantico.", sources: ["Stanford HAI", "OECD.AI"] },
  { code: "BR", name: "Brasile", regulatory: 50, industrial: 38, frontier: 26, talent: 50, military: 28, geo: 42, x: 35, y: 58, blurb: "Mercato interno significativo, capacità di frontier limitata, posizione geopolitica autonoma.", sources: ["OECD.AI"] },
  { code: "AU", name: "Australia", regulatory: 60, industrial: 48, frontier: 40, talent: 62, military: 56, geo: 58, x: 88, y: 65, blurb: "Allineamento AUKUS, ricerca solida, scala industriale limitata.", sources: ["Stanford HAI", "OECD.AI"] },
  { code: "EU", name: "Unione Europea", regulatory: 92, industrial: 64, frontier: 56, talent: 70, military: 50, geo: 68, x: 50, y: 36, blurb: "Aggregato istituzionale: leadership regolatoria globale (AI Act), capacità industriale media, frontier in costruzione, sovranità computazionale come tema centrale.", sources: ["EU AI Watch", "OECD.AI"], aggregate: true },
];

// ===== AGORA =====
const AGORA_CYCLE = {
  id: "ciclo-04",
  question: "L'AI nei concorsi pubblici: quale linea per l'area riformista?",
  description: "Tre regioni italiane hanno introdotto sistemi di pre-screening AI nei concorsi della pubblica amministrazione. La Corte Costituzionale ha accettato un ricorso. Cosa dovrebbe sostenere l'area riformista nei prossimi 6 mesi: divieto, audit obbligatorio, linee guida sperimentali?",
  opensAt: "20 Apr 2026",
  closesAt: "20 Mag 2026",
  daysLeft: 13,
  participants: 287,
  tags: ["divieto", "audit", "trasparenza", "sperimentazione", "diritti del lavoratore", "efficienza amministrativa", "discriminazione", "responsabilità"],
};

const AGORA_PAST = [
  {
    slug: "ciclo-03",
    title: "Welfare e produttività AI: chi paga la transizione?",
    period: "Feb 2026",
    participants: 412,
    excerpt: "412 risposte raccolte. L'analisi ha individuato 6 cluster di posizioni con un nodo centrale: la legittimità di una redistribuzione fiscale dei guadagni di produttività AI verso il welfare.",
    clusters: 6,
  },
  {
    slug: "ciclo-02",
    title: "AI generativa nella scuola pubblica: dal divieto alla pedagogia",
    period: "Dic 2025",
    participants: 356,
    excerpt: "Il dibattito ha rivelato una distanza generazionale interna all'area riformista: i docenti sono più precauzionisti, gli amministratori più pragmatici.",
    clusters: 5,
  },
  {
    slug: "ciclo-01",
    title: "Sovranità computazionale: cosa può ancora fare l'Europa?",
    period: "Ott 2025",
    participants: 198,
    excerpt: "Primo ciclo. Le risposte si sono divise tra ambizione industriale autonoma e pragmatismo atlantista, con un terzo asse minoritario favorevole a partnership con player non-UE non-US.",
    clusters: 4,
  },
];

// ===== IMPACT EXPLORER =====
const PROFESSIONS = [
  { code: "2611", name: "Avvocato/a", isco: "2611", exposure: 82, complement: 68, wage: 12, narrative: "Alta esposizione ai modelli generativi (drafting, ricerca giurisprudenziale, analisi contrattuale), ma forte complementarità con il giudizio professionale e la relazione con il cliente. Effetto netto: ristrutturazione interna delle attività, polarizzazione tra ruoli high-end e attività commodificate." },
  { code: "2330", name: "Insegnante scuola secondaria", isco: "2330", exposure: 64, complement: 78, wage: 4, narrative: "Esposizione media: la valutazione, la preparazione di materiali e la correzione sono parzialmente automatizzabili. La relazione pedagogica resta umana. La posta in gioco è la riconfigurazione del mestiere, non la sostituzione." },
  { code: "7223", name: "Operaio specializzato manifatturiero", isco: "7223", exposure: 28, complement: 42, wage: -2, narrative: "Esposizione bassa nelle mansioni fisico-manuali, alta nei sistemi di controllo qualità integrati. La posta in gioco è la complementarità con sistemi cyber-fisici, non la sostituzione cognitiva." },
  { code: "3322", name: "Rappresentante commerciale", isco: "3322", exposure: 76, complement: 52, wage: -8, narrative: "Esposizione alta: lead generation, qualificazione, follow-up sono in larga parte automatizzabili. Complementarità sostanziale solo nelle relazioni high-touch B2B." },
  { code: "2411", name: "Commercialista", isco: "2411", exposure: 88, complement: 60, wage: 6, narrative: "Esposizione altissima sulle attività ripetitive (dichiarazioni, riconciliazioni, reportistica), forte complementarità sulla consulenza strategica. La professione si bipartisce." },
  { code: "2221", name: "Infermiere/a", isco: "2221", exposure: 38, complement: 70, wage: 3, narrative: "Esposizione medio-bassa, complementarità alta. L'AI assiste nella diagnostica, nel monitoraggio e nella documentazione, liberando tempo per la relazione con il paziente. Il rischio è l'intensificazione, non la sostituzione." },
  { code: "2654", name: "Giornalista", isco: "2654", exposure: 84, complement: 50, wage: -10, narrative: "Esposizione alta sulle attività di sintesi, traduzione, prima stesura. Complementarità debole se non sull'inchiesta originale e l'analisi firmata. Pressione strutturale forte sul mestiere." },
  { code: "2512", name: "Sviluppatore software", isco: "2512", exposure: 86, complement: 80, wage: 8, narrative: "Esposizione altissima ma complementarità altissima: i pair programming AI accelerano l'output di sviluppatori esperti, mentre la fascia junior subisce pressione sul mercato." },
  { code: "5223", name: "Addetto/a alle vendite", isco: "5223", exposure: 42, complement: 38, wage: -6, narrative: "Esposizione media (gestione magazzino, raccomandazione prodotti automatizzata), complementarità limitata. Polarizzazione tra ruoli relazionali e ruoli logistici." },
  { code: "2310", name: "Docente universitario/a", isco: "2310", exposure: 70, complement: 72, wage: 5, narrative: "Forte esposizione sulla didattica (preparazione, correzione, sintesi letteratura), forte complementarità sulla ricerca e supervisione. Riconfigurazione del mestiere già in corso." },
  { code: "3115", name: "Tecnico ingegnere meccanico", isco: "3115", exposure: 52, complement: 68, wage: 4, narrative: "Esposizione media sui calcoli e simulazioni, complementarità alta sulla progettazione integrata. Il mestiere si avvicina a quello dell'ingegnere senior." },
  { code: "1211", name: "Dirigente / Manager", isco: "1211", exposure: 56, complement: 86, wage: 10, narrative: "Esposizione media sulle attività analitiche, complementarità altissima sulla decisione strategica. Effetto netto positivo sui salari di fascia alta." },
];

const ITALY_REGIONS = ["Nord", "Centro", "Sud e isole"];
const EDUCATION_LEVELS = ["Diploma o inferiore", "Laurea triennale", "Laurea magistrale o oltre"];

Object.assign(window, {
  ARTICLES, BUSSOLA_AXES, BUSSOLA_QUESTIONS, BUSSOLA_ARCHETYPES,
  ATLAS_DIMENSIONS, ATLAS_COUNTRIES, AGORA_CYCLE, AGORA_PAST,
  PROFESSIONS, ITALY_REGIONS, EDUCATION_LEVELS,
});
