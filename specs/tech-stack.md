# Post/Human Policy Lab — Tech Stack

> Documento tecnico. Descrive architettura, scelte di stack, trade-off noti e vincoli operativi. Fonte di verità per decisioni implementative. Deve essere aggiornato ogni volta che si aggiunge una dipendenza significativa.

---

## Principio architetturale

Due superfici distinte, un solo dominio apparente:

```
                    posthumanlab.eu
                          │
         ┌────────────────┼────────────────┐
         │                                 │
   /journal/*                      /, /bussola, /atlas,
   (Substack custom              /agora, /impact, /about
    domain)                           (Astro su Vercel)
         │                                 │
   Contenuti editoriali:            Moduli interattivi,
   articoli, newsletter,            homepage, identità
   commenti, abbonamenti            visiva del Lab
```

**Il lettore percepisce un solo sito.** Sotto il cofano, Substack gestisce tutto ciò che è testo editoriale e distribuzione; l'app Astro gestisce tutto ciò che è interattivo e tutto ciò che richiede identità visiva distintiva.

Questa separazione consente:
- Velocità di pubblicazione massima (zero CMS da amministrare)
- Ownership dell'interattività (tutti i moduli girano su codice nostro)
- Sovranità parziale mitigabile con backup periodici degli articoli

---

## Frontend (sito moduli)

### Framework: Astro 5+
Content-first, zero-JavaScript-by-default. Le pagine statiche (homepage, about, landing dei moduli) si servono come HTML puro. I componenti interattivi sono "islands" React idratate solo dove servono. Risultato: Lighthouse performance vicino a 100, SEO eccellente.

Perché non Next.js: ottimo framework, ma per un sito con 70% contenuto statico e 30% interattivo spedisce più JavaScript del necessario. Astro è più aderente al caso d'uso.

### UI library: React 19 (solo nelle islands)
Scelta standard per i componenti interattivi. Tutti i moduli sono React puro, stateful, lato client salvo dove esplicitato.

### Styling: Tailwind CSS 4
Configurazione con design tokens custom (colori, tipografia, spacing) definiti nel file `src/styles/tokens.css`. Niente componenti Tailwind UI o simili — l'identità visiva è progettata ad hoc.

### Font
- Headline: un serif contemporaneo (candidati: Fraunces, Newsreader, Literata) per segnalare serietà editoriale
- Body: un sans-serif neutro leggibile (candidati: Inter, Geist, Manrope)
- Mono: per dati numerici e codice (JetBrains Mono o Geist Mono)

Decisione finale in fase di design system.

### Icons
lucide-react. Coerente, permissivo di licenza, integrazione trasparente.

### Animazioni
Framer Motion solo dove strettamente necessario (transizioni di stato nella Bussola, reveal della mappa Atlas). Niente animazioni decorative.

---

## Editoriale

### Substack
Publication nativa del Lab. Tutti gli articoli live qui. Newsletter di iscrizione gestita nativamente.

**Custom domain**: `posthumanlab.eu/journal` (piano Substack con custom domain, ~50€/anno o incluso in piano paid).

**Import su homepage**: la homepage del sito Astro legge il feed RSS pubblico di Substack a ogni build (ISR ogni 10 minuti via Vercel) e mostra gli ultimi N post come card. Non salva nulla — solo fetch e render.

### Backup sovranità
Script Python settimanale che:
1. Scarica tutti i post via API/RSS Substack
2. Li converte in markdown versionato
3. Committa su un repo Git privato (`posthuman-archive`)

Questo garantisce che in caso di disservizi o policy changes Substack, l'archivio completo esiste in forma portabile.

### Brevo (email transazionali)
Già configurato per altri progetti (MENAMOSE, Zetakappa). Qui serve per:
- Conferma ricezione risposte Agora
- Notifica di pubblicazione report al partecipante
- Invio risultato Impact Explorer via email (opzionale)

Non sostituisce Substack per la newsletter.

---

## Backend

### Supabase
Backend-as-a-service basato su Postgres managed. Gestisce:

**Database Postgres**
Schemi principali (definiti in `supabase/migrations/`):
- `bussola_responses` — risposte anonime al quiz, per analytics aggregata
- `agora_cycles` — cicli deliberativi (domanda, date, stato)
- `agora_responses` — risposte individuali con tag, stato moderazione
- `agora_reports` — report finali pubblicati per ciclo
- `impact_queries` — log anonimo di query (per migliorare il dataset nel tempo)
- `atlas_countries` — dati paesi (in alternativa a JSON versionato, da decidere)

**Auth**
Serve solo per l'area admin. Provider: magic link email. Nessuna auth utente pubblica — tutte le interazioni pubbliche sono anonime o semi-anonime (solo email opzionale per Agora).

**Row Level Security (RLS)**
Attivo su tutte le tabelle. Letture pubbliche solo dove esplicito (es. report Agora pubblicati). Scritture vincolate via API route Astro con validazione.

**Edge Functions**
Per logica che richiede server (es. generazione PNG shareable della Bussola via satori; rate limiting sulle submission Agora).

### Vercel
Hosting del frontend Astro. Deploy automatico da Git. Edge CDN globale inclusa. Preview deployment per ogni PR.

Piano: Hobby (gratuito) per l'MVP. Upgrade a Pro (~20€/mese) solo se traffico lo giustifica.

### Pipeline dati esterna (Agora clustering)
Per il clustering delle risposte Agora (mensile, non real-time) si usa uno script Python separato eseguito on-demand:

```
input: dump risposte ciclo N da Supabase
  ↓
embedding (OpenAI text-embedding-3-small o Voyage voyage-3)
  ↓
clustering (hdbscan o sklearn agglomerative)
  ↓
sintesi per cluster (LLM: Claude Sonnet 4.7 via API)
  ↓
output: markdown del report + metadata clusters
  ↓
revisione editoriale manuale
  ↓
publish su Substack (cross-post) + sito
```

Il codice vive in un repo separato `posthuman-agora-pipeline` per tenere il sito frontend pulito. Esecuzione locale o su GitHub Actions schedulate.

---

## Moduli interattivi — librerie specifiche

### Bussola AI
- State: `useReducer` React puro o Zustand se si complica
- Visualizzazione risultato: `recharts` per radar chart
- Generazione PNG shareable: `@vercel/og` + `satori` su Edge Function
- Storage aggregato anonimo: Supabase `bussola_responses`

### Atlas AI
- Mappa: `react-simple-maps` (su d3-geo)
- Alternativa: vanilla d3 + TopoJSON se serve più controllo
- Radar paese: `recharts`
- Dataset: JSON versionato in `src/data/atlas/` (più semplice e trasparente del DB per un dataset curato manualmente trimestralmente)

### Agora
- Form: React + Zod per validazione
- Rate limiting: Upstash Redis (free tier) via middleware
- Captcha light: hCaptcha o Turnstile Cloudflare
- Lettura report pubblicati: contenuto markdown in repo o in Supabase

### Impact Explorer
- Form multistep: custom con React Hook Form
- Engine calcolo: funzione pura TypeScript con coefficienti da JSON
- Dataset: JSON versionato, aggiornabile, con citazioni incorporate
- Visualizzazione: `recharts` + tabelle statiche

---

## Data sources e integrazioni esterne

### Atlas AI — fonti dati
- OECD.AI Policy Observatory (API pubblica)
- Stanford HAI AI Index (report annuale, dati scaricabili)
- Tortoise Global AI Index (accesso parziale gratuito)
- ETO Country Activity Tracker — CSET
- Our World in Data (dove pertinente)

Estrazione manuale ogni trimestre, normalizzazione a scala 0-100 per dimensione, note di metodo pubbliche.

### Impact Explorer — fonti dati
- Felten, Raj, Seamans — *Occupational Heterogeneity in Exposure to Generative AI* (2023-24)
- Eloundou et al. — *GPTs are GPTs* (2023)
- IMF — *Gen-AI: Artificial Intelligence and the Future of Work* (2024)
- OECD — *Employment Outlook* capitoli AI (2023-25)
- INAPP — rapporti Italia (dove disponibili)

Ogni coefficiente ha una citazione esplicita nel dataset e visibile all'utente nell'output.

### Bussola AI — fonti posizioni di confronto
- Votazioni del Parlamento Europeo su AI Act e regolamenti correlati (dati HowTheyVote.eu, Parltrack)
- Programmi elettorali 2024 dei principali partiti italiani ed europei
- Dichiarazioni ufficiali di gruppo (S&D, PPE, Renew, ECR, Greens) su dossier AI

---

## Dominio e DNS

**Dominio primario**: `posthumanlab.eu` (da registrare — Cloudflare Registrar o Porkbun consigliati per prezzo/affidabilità).

**Split custom domain configurazione**:
- Root `posthumanlab.eu` → Vercel (Astro)
- Sottopath `/journal` → Substack custom domain (via redirect o reverse proxy)

Substack supporta custom domain solo a livello di root o sottodominio, non sottopath diretto. La soluzione corretta è:
- `posthumanlab.eu` → Vercel (Astro)
- `journal.posthumanlab.eu` → Substack custom domain

Percepibilmente equivalente a uno split di path per l'utente, con minor complessità di routing.

**DNS**: Cloudflare. Gestione centralizzata, TTL basso durante setup, full proxy dove possibile, DNS-only per Substack (richiesto).

---

## Sicurezza baseline

- HTTPS ovunque (gestito da Vercel + Cloudflare)
- Secrets via environment variables Vercel, mai in repo
- Supabase RLS attivo e testato su ogni tabella
- CSP header restrittivo
- Rate limiting su endpoint Agora e Bussola submit
- Captcha su submission pubbliche
- Dipendenze aggiornate (Dependabot o Renovate)
- Niente PII stored by design — l'email Agora è opzionale e separata dalla risposta testuale una volta inviata la notifica

---

## Dev tooling

- **Package manager**: pnpm
- **Node**: LTS corrente (v22+)
- **TypeScript**: strict mode attivo ovunque
- **Lint**: ESLint + Prettier, config condivisa
- **Git**: convenzione `main` come branch di default, feature branch per PR significative. Durante l'MVP, push diretti su `main` ammessi solo dal solo committer.
- **CI**: GitHub Actions — type check + build + test su ogni PR
- **Testing**: Vitest per logica pura (engine Bussola, calcolo Impact Explorer). Playwright per smoke test dei flussi critici, non E2E completi.

---

## Costi stimati — regime piccolo (primi 12 mesi)

| Voce | Costo annuale | Note |
|---|---|---|
| Dominio `.eu` | ~15€ | Cloudflare Registrar |
| Vercel Hobby | 0€ | Sufficiente fino a 100k visitatori/mese |
| Supabase Free | 0€ | Free tier copre 500MB DB, 50k auth users |
| Substack | 0€ o ~50€ | Gratis base; custom domain se si paga il piano |
| Brevo | 0€ | Free tier copre 300 email/giorno |
| Cloudflare | 0€ | Piano Free sufficiente |
| OpenAI/Anthropic API | ~30-100€ | Solo per clustering Agora mensile |
| **Totale** | **~100-200€/anno** | Scalabile se necessario |

Tutto il resto (asset editoriali, tempo) è lavoro.

---

## Non usiamo (e perché no)

- **WordPress**: troppa manutenzione, plugin hell, non coerente con l'identità del progetto
- **Sanity / Contentful / altri CMS headless**: Substack risolve il problema editoriale meglio e con meno setup
- **Framework JS pesanti con SSR completo (Next.js App Router)**: overshoot per il caso d'uso
- **Firebase**: Supabase è più affine al progetto (SQL-first, open source, RLS)
- **Amazon Amplify / AWS diretto**: troppa superficie di configurazione per il valore ottenuto
- **Analytics Google**: usiamo Plausible o Umami (privacy-first, no cookie banner imposto)

---

## Versione e revisioni

| Versione | Data | Note |
|---|---|---|
| 0.1 | 2026-04-18 | Prima stesura |

Revisione obbligatoria: a ogni fine di fase roadmap, o quando si aggiunge una dipendenza che costa >50€/anno o introduce vendor lock-in significativo.
