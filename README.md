# Nuxt Minimal Starter

Look at the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.


# funzionamento del SSR

## Scenario A: Primo caricamento della pagina o Reload (F5)

Il <script setup> della pagina viene eseguito sul SERVER.
useFetch esegue una chiamata di funzione diretta sul SERVER.
Il console.log nel <script setup> appare nel TERMINALE.
Il browser riceve una pagina HTML già completa di dati.

## Scenario B: Navigazione tramite <NuxtLink>

Il <script setup> della pagina viene eseguito nel BROWSER.
useFetch esegue una vera chiamata di rete dal BROWSER verso l'endpoint API.
Il codice dell'endpoint API (/server/api/...) viene eseguito sul SERVER.
Il console.log nel <script setup> appare nella CONSOLE DEL BROWSER (F12).

È la domanda più importante di tutte. Capire a cosa serve questa architettura "universale" (dove lo stesso codice può girare su server e client) è la chiave per apprezzare la vera potenza di Nuxt.

Non è una complicazione inutile, ma è la soluzione a problemi enormi che affliggono lo sviluppo web da anni. I vantaggi sono enormi e toccano tre aree principali: l'esperienza dell'utente, l'ottimizzazione per i motori di ricerca (SEO) e la vita dello sviluppatore (tu!).

1. Vantaggio per l'Utente: Il Meglio dei Due Mondi (Velocità e Fluidità)
Senza Nuxt, di solito devi scegliere tra due tipi di siti:

Sito Tradizionale (es. WordPress, PHP): Veloce al primo caricamento perché il server invia HTML già pronto. Però, ogni click su un link ricarica l'intera pagina da zero. L'esperienza è lenta e "scattosa".
Single-Page App (es. Vue/React "puri"): Dopo un primo caricamento lento (una pagina bianca con un'icona che gira), la navigazione interna è super fluida, istantanea, come un'app desktop. Però la prima impressione è di lentezza.
Nuxt ti dà entrambi i vantaggi e nessuno degli svantaggi:

Primo Caricamento Veloce (grazie all'SSR): Quando un utente visita il tuo sito, il server invia subito una pagina HTML completa e visibile. L'utente vede immediatamente il contenuto, percependo il sito come velocissimo.
Navigazione Fluida (grazie al Client-Side Routing): Dopo il primo caricamento, quando l'utente clicca sui <NuxtLink>, Nuxt prende il controllo e si comporta come una SPA, cambiando le pagine istantaneamente senza ricaricare tutto.
In pratica: offri la velocità di un sito classico al primo impatto e la fluidità di un'app moderna per tutto il resto.

2. Vantaggio per il Business: Essere Trovati su Google (SEO Perfetta)
Questo è un vantaggio enorme e spesso il motivo principale per cui si sceglie Nuxt.

Il Problema delle SPA: Un'applicazione Vue "normale" (client-side rendered) invia a Google una pagina quasi vuota, con solo un tag <div id="app"></div>. Google deve eseguire tutto il tuo JavaScript per capire cosa c'è nella pagina. Spesso lo fa male o non lo fa affatto. Risultato: la tua pagina è invisibile su Google.
La Soluzione di Nuxt (SSR): Nuxt serve a Google una pagina HTML completa, con tutti i testi, i titoli e i link, proprio come la vedrebbe un utente. Google la legge, la capisce e la indicizza perfettamente.
In pratica: Nuxt ti dà una SEO di altissimo livello senza che tu debba fare nulla di speciale.

3. Vantaggio per Te, lo Sviluppatore (Developer Experience)
Questa architettura ti semplifica enormemente la vita.

Un Unico Linguaggio e Progetto: Scrivi tutto (il frontend che l'utente vede, la logica di rendering, gli endpoint API) in un unico linguaggio (TypeScript) e un unico framework (Vue/Nuxt). Non devi più gestire un progetto frontend separato da un progetto backend in un altro linguaggio (es. PHP, Java, Python).
Condivisione del Codice: Puoi definire tipi, funzioni e logiche una sola volta e usarle sia sul server che sul client. L'esempio perfetto è il nostro:
type Task: L'hai definito una volta in server/database/schema.ts.
L'hai usato nel backend (Drizzle lo usa per le query).
L'hai usato nel frontend (in useFetch<Task[]>) per avere l'autocompletamento.
Se domani cambi la struttura di Task, la modifichi in un solo posto e TypeScript ti avviserà di tutti i punti da correggere, sia nel client che nel server. Questo riduce drasticamente gli errori.
Configurazione Semplificata: Nuxt gestisce tutta la complessità di "compilare" il tuo codice per due ambienti diversi (server e client). Tu devi solo concentrarti sullo scrivere la tua applicazione.
