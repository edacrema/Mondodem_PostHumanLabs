# Post/Human Policy Lab — Roadmap

> Roadmap operativa pensata per essere eseguita in parte manualmente (fase 0) e in parte delegata a un agente coding tipo Claude Code. Ogni task è progettato per essere scopable in una singola sessione di lavoro (1-3 ore).

---

## Principi per l'agente coding

Prima di iniziare qualsiasi task, l'agente deve:

1. **Leggere `mission.md`** quando la decisione ha implicazioni editoriali, di tono o di posizionamento.
2. **Leggere `tech-stack.md`** quando la decisione ha implicazioni implementative (scelta libreria, schema dati, dipendenze).
3. **Non introdurre dipendenze non previste** in `tech-stack.md` senza dichiararlo esplicitamente nel commit message e aggiornare il documento.
4. **Seguire la convenzione di branch**: `feature/fase-N-task-N.N-breve-descrizione` per ogni task.
5. **Aprire PR con descrizione esplicita** anche per push diretti: cosa è stato fatto, quali criteri di accettazione sono stati soddisfatti, cosa resta aperto.
6. **Quando un task eccede lo scope, non allargarlo**: completare ciò che serve per il task e aprire un task follow-up documentato.
7. **Commit atomici** con messaggi scritti al presente imperativo italiano o inglese, coerenti con lo stile scelto a fase 1.

Il file `CLAUDE.md` alla root del repo deve includere:
```markdown
# Istruzioni per l'agente

Leggi sempre `mission.md` e `tech-stack.md` prima di iniziare.
Segui le convenzioni in `roadmap.md`.
Non introdurre dipendenze non documentate.
```

---

## Fase 0 — Bootstrap infrastrutturale

**Fuori Claude Code.** Tutto lavoro manuale, ~3-4 ore totali spalmate su 1-2 giorni.

### Task

- **0.1** Registrare dominio `posthumanlab.eu` (Cloudflare Registrar o Porkbun)
- **0.2** Creare account Cloudflare e spostare DNS del dominio su Cloudflare
- **0.3** Creare Substack publication "Post/Human Policy Lab"
- **0.4** Configurare custom domain Substack su `journal.posthumanlab.eu`
- **0.5** Creare progetto Supabase (region: EU — Francoforte o Irlanda)
- **0.6** Creare account Vercel e connetterlo a GitHub
- **0.7** Creare repo GitHub privato `posthuman-web` (frontend Astro) e `posthuman-agora-pipeline` (clustering)
- **0.8** Creare repo GitHub privato `posthuman-archive` per backup Substack
- **0.9** Verificare account Brevo esistente o creare nuovo

### Criterio di accettazione fase 0
- Domain risolve, DNS gestito da Cloudflare
- Substack funzionante con custom domain
- Supabase accessibile con URL e anon key salvati in 1Password/bitwarden
- Repo GitHub creati e vuoti (solo README + CLAUDE.md placeholder)

---

## Fase 1 — Shell editoriale e homepage

**Obiettivo**: sito pubblicamente visitabile con homepage, about, CTA newsletter, fetch RSS da Substack, identità visiva definita. Nessun modulo interattivo ancora.

**Prerequisiti**: fase 0 completa.

### Task

#### 1.1 Scaffolding Astro + configurazione base
- Creare progetto Astro 5 con TypeScript strict
- Configurare pnpm, ESLint, Prettier, Vitest
- Integrare Tailwind CSS 4
- Aggiungere `@astrojs/react` per le islands
- Configurare path aliases (`@/components`, `@/lib`, `@/data`)
- Configurare `.env.example` con variabili previste
- Commit iniziale con struttura cartelle `src/{pages,components,layouts,lib,styles,data}`

**Accettazione**: `pnpm dev` avvia il server, pagina `index.astro` vuota renderizza.

#### 1.2 Design system minimale
- Definire design tokens in `src/styles/tokens.css`: palette colori (con modalità light e dark se prevista), scala tipografica, spacing, border radius
- Scegliere e importare fonti (serif headline, sans-serif body, mono numeri)
- Creare componenti base in `src/components/ui/`: `Button`, `Card`, `Badge`, `Container`, `Prose`
- Creare pagina `/style-guide` (solo accessibile in dev) per visualizzarli

**Accettazione**: style guide visibile in dev, componenti documentati con esempi.

#### 1.3 Layout principale e navigazione
- `src/layouts/Base.astro` con slot contenuto, meta SEO base, OG tags
- Componente `Header` con logo/wordmark, nav (Home, Journal, Bussola, Atlas, Agora, Impact, Chi siamo)
- Componente `Footer` con link social, email contatto, menzione rapporto con MondoDem, copyright, link privacy
- Logo provvisorio (testo stilizzato o SVG minimale) — definitivo più avanti

**Accettazione**: layout riusabile, header responsive (desktop + mobile), footer stabile.

#### 1.4 Homepage
- Hero con claim forte: titolo + sottotitolo + 2 CTA (Iscriviti al Journal, Prova la Bussola)
- Sezione "Ultimi articoli" che fetcha feed RSS Substack lato server (ISR ogni 10 minuti), mostra 6 card con titolo, estratto, autore, data, link
- Sezione "Esplora il Lab" con le 4 card dei moduli (Bussola, Atlas, Agora, Impact) — per ora Bussola cliccabile, altri con label "in arrivo"
- Sezione "Chi siamo" breve + link a /about

**Accettazione**: homepage carica in <1s, Lighthouse performance >90, feed RSS parsed correttamente.

#### 1.5 Pagina /about
- Contenuto derivato da `mission.md` (versione user-facing, più breve)
- Sezione "Rapporto con MondoDem" esplicita
- Sezione "Contatti"
- Eventuale sezione "Team" (vuota inizialmente o con singola firma)

**Accettazione**: pagina statica renderizzata, contenuto markdown gestibile da file `src/content/about.md`.

#### 1.6 Embed newsletter Substack
- Componente `NewsletterForm` con embed ufficiale Substack (iframe o custom con endpoint API)
- Inserimento su homepage, footer, e fine di ogni pagina modulo

**Accettazione**: form funzionante, subscriptions arrivano su Substack.

#### 1.7 SEO baseline
- `sitemap.xml` auto-generato (@astrojs/sitemap)
- `robots.txt`
- Meta tags per ogni pagina (title, description, OG, Twitter Card)
- Favicon + app icons
- Dati strutturati JSON-LD base (Organization)

**Accettazione**: pagine indicizzabili, meta corretti verificabili via inspector.

#### 1.8 Deploy su Vercel
- Connettere repo a Vercel
- Configurare variabili ambiente (Supabase URL/keys, Substack RSS URL)
- Configurare custom domain `posthumanlab.eu`
- Verificare redirect `www → apex`
- Verificare certificato HTTPS

**Accettazione**: `https://posthumanlab.eu` live, tutte le pagine accessibili, performance mantenute in prod.

### Criterio di accettazione fase 1
- Sito pubblico live con homepage, about, newsletter funzionante
- Ultimi articoli dal Substack visibili e cliccabili
- Lighthouse: Performance >90, Accessibility >95, SEO >95
- Primo post Substack pubblicato (task editoriale, non coding)

---

## Fase 2 — Bussola AI

**Obiettivo**: primo modulo interattivo funzionante. Quiz, calcolo posizionamento, archetipi, condivisione.

**Prerequisiti**: fase 1 completa.

### Task

#### 2.1 Schema dati Bussola
- Definire in `src/data/bussola/questions.ts` la struttura tipizzata: domanda, 4 opzioni, ciascuna con vettore di peso sugli assi (Accelerazione/Precauzione, Stato/Mercato, Universalismo/Selettività, Sovranismo/Cooperazione)
- Definire in `src/data/bussola/archetypes.ts` gli 8-10 archetipi con nome, descrizione, posizione target nei 4 assi, tono (ironico ma riconoscibile)
- Definire funzione pura `computeArchetype(answers): Archetype` con test Vitest

**Accettazione**: dati popolati con 15-20 domande e 8-10 archetipi; funzione di calcolo testata con almeno 5 casi.

**Nota editoriale**: domande e archetipi richiedono passaggio editoriale del nucleo prima di essere considerate definitive. L'agente può produrre una prima bozza ragionata, ma il go/no-go è editoriale.

#### 2.2 Quiz component
- Componente React `<Bussola />` in `src/components/bussola/`
- Stato con `useReducer`: index corrente, risposte date, navigation
- UI: card per domanda, 4 bottoni risposta, progress bar, bottone "indietro"
- Transizioni fluide tra domande (Framer Motion)
- Responsive mobile-first

**Accettazione**: quiz completabile da cima a fondo, possibilità di tornare indietro, stato persistito in sessionStorage per evitare perdita accidentale.

#### 2.3 Schermata risultato
- Radar chart dei 4 assi (recharts)
- Scheda archetipo con nome, descrizione, quote
- Indicazione posizioni prossime (altri partiti/archetipi vicini sulla bussola)
- Comparazione con media risposte pubbliche (se dati aggregati disponibili)
- CTA: condividi + iscriviti al Journal

**Accettazione**: risultato visibile, radar readable, testi editorialmente revisionati.

#### 2.4 Storage risposte su Supabase
- Migration `bussola_responses` con: id, created_at, answers (jsonb), archetype, region (da IP → country, no city), user_agent hash
- API route Astro `/api/bussola/submit` che valida e insert
- RLS: insert pubblico, select solo admin
- Rate limiting base (1 submission per IP ogni 10 minuti)

**Accettazione**: submit funziona, dati appaiono in Supabase, RLS testato.

#### 2.5 PNG shareable
- Edge function Vercel con `@vercel/og` + `satori`
- Template PNG con: nome archetipo, radar minimal, brand Lab, hashtag
- URL endpoint: `/api/bussola/share/[resultId].png`
- Meta OG dinamici sulla pagina risultato per preview social

**Accettazione**: PNG generato e servito, preview corretto su Twitter/X, LinkedIn, WhatsApp.

#### 2.6 Dashboard aggregata (admin)
- Pagina `/admin/bussola` con auth Supabase magic link
- Statistiche: numero risposte, distribuzione archetipi, distribuzione per asse, heatmap temporale
- Export CSV
- **Non pubblica**: i dati aggregati diventano un articolo editoriale trimestrale, non un dashboard live pubblico

**Accettazione**: dashboard accessibile solo con login, statistiche aggiornate in tempo reale.

### Criterio di accettazione fase 2
- Bussola completabile e condivisibile live in produzione
- Almeno 50 risposte raccolte in periodo di test (invito community ristretta)
- Primo articolo editoriale "Cosa dice la Bussola" pianificato per T+90 giorni

---

## Fase 3 — Agora

**Obiettivo**: prima domanda deliberativa live, raccolta risposte, pipeline clustering, pubblicazione report.

**Prerequisiti**: fase 1. Parallelizzabile con fase 2 se risorse disponibili.

### Task

#### 3.1 Schema dati Agora
- Migration Supabase: `agora_cycles` (id, question, description, opens_at, closes_at, status), `agora_responses` (id, cycle_id, text, tags[], email_opt_in, created_at, moderation_status), `agora_reports` (id, cycle_id, published_at, markdown, metadata jsonb)
- RLS: insert pubblico su responses, select pubblico su cycles attivi e reports pubblicati
- Indice su `cycle_id` e `moderation_status`

**Accettazione**: schema applicato, migrations versionate, RLS testato.

#### 3.2 Pagina `/agora` pubblica
- Se esiste ciclo attivo: mostra domanda, descrizione, contatore giorni rimanenti, form
- Se non esiste ciclo attivo: mostra "Prossima domanda tra X giorni" + archivio report passati
- Archivio: lista link ai report pubblicati

**Accettazione**: pagina reattiva allo stato del ciclo, navigation corretta.

#### 3.3 Form risposta
- Textarea 500 caratteri con counter live
- Multi-select 3 tag da una lista predefinita (tag specifici per ciclo, definiti dal nucleo editoriale)
- Campo email opzionale ("ricevi il report quando pubblicato")
- Checkbox consenso trattamento
- Captcha Turnstile Cloudflare
- Validazione client + server (Zod)

**Accettazione**: submit funziona, rate limiting attivo, email opt-in corretto.

#### 3.4 Admin moderation view
- Pagina `/admin/agora` con auth
- Lista risposte del ciclo corrente con stato (pending, approved, rejected, spam)
- Possibilità di bulk-approve, quick reject
- Filtri per tag

**Accettazione**: flusso di moderazione usabile, moderation log tracciato.

#### 3.5 Pipeline clustering (repo separato)
- Repo `posthuman-agora-pipeline`
- Script Python con CLI: `python cluster.py --cycle-id=X`
- Step: fetch da Supabase → embedding → clustering → sintesi LLM per cluster → output markdown + JSON metadata
- Logging completo, rerun idempotente
- Instruzioni README per esecuzione locale

**Accettazione**: script produce report markdown coerente su dataset di test (almeno 30 risposte).

#### 3.6 Pubblicazione report
- Workflow: output script clustering → revisione editoriale manuale → upload markdown su Substack come post (cross-post) → update Supabase `agora_reports` con link
- Pagina `/agora/report/[slug]` su sito che rimanda al post Substack con intro e metadata (numero partecipanti, distribuzione cluster)

**Accettazione**: primo report pubblicato, flusso documentato.

#### 3.7 Notifiche email
- Template Brevo per conferma ricezione
- Template Brevo per notifica pubblicazione report
- Trigger su insert approved / update report status

**Accettazione**: email arrivano, template coerenti con identità del Lab.

### Criterio di accettazione fase 3
- Primo ciclo Agora completato con almeno 50 risposte
- Report pubblicato e linkato
- Pipeline documentata e riproducibile

---

## Fase 4 — Atlas AI

**Obiettivo**: mappatura interattiva degli stati lungo dimensioni AI regolatoria, industriale, frontier, talent, militare, geopolitica.

**Prerequisiti**: fase 1.

### Task

#### 4.1 Dataset base
- File `src/data/atlas/countries.json` con struttura tipizzata
- Popolamento iniziale: 30 paesi più rilevanti (USA, Cina, UE27 aggregata + top 10 singoli stati membri, UK, Giappone, Corea, India, Israele, Singapore, Emirati, ecc.)
- Per ogni paese: dati su 6 dimensioni (0-100), fonti citate, ultima revisione
- Schema di metadati (metodologia, data cutoff, version)

**Accettazione**: dataset popolato, schema validato Zod, metadati completi.

**Nota**: popolamento dati richiede ricerca editoriale seria. L'agente può impostare struttura e popolare alcuni paesi a esempio; il resto è lavoro editoriale.

#### 4.2 Mappa interattiva
- Componente `<Atlas />` con `react-simple-maps`
- Coropletica con gradient per dimensione selezionata
- Hover: tooltip con nome paese + valore dimensione
- Click: apre panel laterale o modale con scheda completa paese

**Accettazione**: mappa renderizzata, hover/click funzionali, performante anche su mobile.

#### 4.3 Scheda paese
- Radar chart 6 dimensioni (recharts)
- Testo narrativo breve (1-2 paragrafi) editoriale per paese
- Citazioni fonti per ogni dato
- Link articoli correlati sul Journal (fetch da RSS filtrato per tag paese)

**Accettazione**: scheda leggibile, citazioni verificabili.

#### 4.4 Dimension selector e confronto
- Selector delle 6 dimensioni sopra la mappa, con update live del gradient
- Modalità "confronto": selezione fino a 3 paesi, radar sovrapposti
- URL shareable con stato (`?dim=regulatory&compare=US,CN,IT`)

**Accettazione**: selector reattivo, confronto corretto, URL funzionante.

#### 4.5 Metodologia pubblica
- Pagina `/atlas/metodologia` con spiegazione dettagliata di come ogni dimensione è calcolata, quali fonti, come sono normalizzate, quando sono aggiornate
- Link alla metodologia visibile ovunque appaia il dato

**Accettazione**: pagina dettagliata, niente black box.

### Criterio di accettazione fase 4
- Atlas live con almeno 25 paesi popolati
- Metodologia pubblica e verificabile
- Prima revisione trimestrale pianificata

---

## Fase 5 — Impact Explorer

**Obiettivo**: strumento personale per esplorare esposizione all'AI nella propria professione.

**Prerequisiti**: fase 1.

### Task

#### 5.1 Dataset coefficienti
- File `src/data/impact/occupations.json` con: codice ISCO-08, nome IT, coefficienti (esposizione, complementarità, probabilità aumento salariale), fonte primaria
- Integrazione con NACE per settore
- Modulatori: regione (Nord/Centro/Sud), età, educazione
- Citazioni incorporate

**Accettazione**: dataset per almeno 200 professioni comuni in Italia, con fonti.

**Nota**: costruzione dataset richiede 2-3 settimane di lavoro editoriale. L'agente può impostare struttura, caricare dati da fonti scaricabili (es. Felten et al. dataset), normalizzare.

#### 5.2 Form multistep
- Step 1: professione (autocomplete su ISCO) + settore (NACE)
- Step 2: area geografica, età, livello istruzione
- Step 3: preferenze opzionali (email per salvataggio report)
- Progress visibile, back/forward, validazione per step

**Accettazione**: form completabile, validazione robusta.

#### 5.3 Engine di calcolo
- Funzione pura TypeScript `computeImpact(profile): ImpactResult`
- Test Vitest con almeno 10 casi
- Output: tre indicatori con intervalli di confidenza, breakdown per dimensione, policy suggerite dal cluster di appartenenza

**Accettazione**: engine testato, output deterministico, fallback per professioni non in dataset.

#### 5.4 Schermata risultato
- Tre indicatori principali con visualizzazione chiara
- Narrazione testuale personalizzata (template con slot)
- "Mappa policy": quali proposte riformiste sono pertinenti per il tuo cluster (breve descrizione + link articoli correlati)
- CTA: condividi, salva per email, iscriviti al Journal

**Accettazione**: risultato coerente, linguaggio probabilistico non deterministico.

#### 5.5 PNG shareable + email
- PNG risultato via satori/@vercel/og
- Email con report completo in HTML via Brevo

**Accettazione**: PNG coerente con brand, email deliverable.

### Criterio di accettazione fase 5
- Impact Explorer live
- Almeno 200 professioni coperte
- Disclaimer metodologico chiaro e visibile

---

## Fase 6 — Polish e operations

**Obiettivo**: consolidamento, analytics, backup, accessibilità, monitoring.

**Prerequisiti**: fasi 1-5 completate.

### Task

#### 6.1 Analytics privacy-first
- Installare Plausible (cloud a pagamento) o Umami (self-hosted su Supabase)
- Tracking eventi custom: completamento Bussola, submit Agora, completamento Impact Explorer, click su articoli
- Dashboard aggregata accessibile al nucleo editoriale

**Accettazione**: analytics funzionanti, nessun cookie di tracking, banner minimale o assente.

#### 6.2 Backup Substack automatico
- Script Python schedulato su GitHub Actions (settimanale)
- Scarica post via API Substack / RSS
- Converte in markdown con frontmatter
- Committa su `posthuman-archive` repo privato

**Accettazione**: backup funzionante, test di ripristino eseguito una volta.

#### 6.3 Performance audit
- Lighthouse CI su PR principali
- Budget performance: LCP <2s, CLS <0.1, FID <100ms
- Image optimization (Astro Image + formati moderni)

**Accettazione**: tutte le pagine pubbliche rispettano il budget.

#### 6.4 Accessibility audit
- Test manuale con screen reader (VoiceOver / NVDA) su flussi critici
- Contrast ratio AA su tutto il sito
- Navigazione da tastiera completa
- ARIA labels dove necessario

**Accettazione**: WCAG 2.1 AA compliant sui flussi principali.

#### 6.5 Monitoring e uptime
- Uptime monitoring (Better Stack free o UptimeRobot)
- Alert su Slack/Telegram del fondatore
- Error tracking (Sentry free tier)

**Accettazione**: alert funzionanti, incidenti tracciati.

#### 6.6 Documentazione developer
- `README.md` completo del repo `posthuman-web` con: setup, sviluppo locale, deployment, convenzioni
- `CONTRIBUTING.md` se si accettano contributi esterni
- Aggiornamento `CLAUDE.md` con pattern di lavoro maturati nelle fasi precedenti

**Accettazione**: nuovo developer (o nuova sessione agente) può fare setup da zero in <30 minuti.

### Criterio di accettazione fase 6
- Operativamente stabile, con monitoring attivo
- Backup testato
- Documentazione completa

---

## Stime temporali realistiche

Assumendo lavoro part-time (10-15 ore/settimana) del fondatore, con ausilio agente coding:

| Fase | Durata stimata |
|---|---|
| Fase 0 | 2-3 giorni (sparsi) |
| Fase 1 | 3-4 settimane |
| Fase 2 | 3-4 settimane |
| Fase 3 | 4-5 settimane (incluso primo ciclo completo) |
| Fase 4 | 4-6 settimane (data-heavy) |
| Fase 5 | 6-8 settimane (dataset più gravoso) |
| Fase 6 | 2-3 settimane |
| **Totale MVP→Completo** | **~6-9 mesi** |

MVP pubblicabile (fasi 1 + 2) realisticamente in **~6-8 settimane** di lavoro part-time.

Parallelizzazione possibile:
- Fasi 2, 3, 4 possono procedere in parallelo se il carico editoriale lo permette
- Fase 5 è bloccata dal dataset, indipendente dal resto

---

## Decisioni ancora aperte

Elenco volutamente esplicito delle cose da decidere prima di chiudere le relative fasi:

1. **Font definitivi** (fase 1.2)
2. **Logo e wordmark definitivi** (fase 1.3) — va commissionato a designer
3. **Lista finale domande Bussola** (fase 2.1) — editoriale
4. **Lista finale archetipi Bussola** (fase 2.1) — editoriale
5. **Prima domanda Agora** (fase 3) — editoriale
6. **Livello affiliazione con MondoDem** (globale) — vedi `mission.md`
7. **Governance editoriale allargata** (globale) — composizione nucleo
8. **Plausible cloud vs Umami self-hosted** (fase 6.1)

---

## Versione e revisioni

| Versione | Data | Note |
|---|---|---|
| 0.1 | 2026-04-18 | Prima stesura |

Revisione obbligatoria a fine di ogni fase, con aggiornamento di stime e decisioni aperte.
