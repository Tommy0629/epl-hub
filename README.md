# EPL Hub · 2026/27

An unofficial English-language Premier League fan hub. Live data, auto-refreshed every 6 hours from the Premier League's public API.

## Pages
- **Home** — live Top 6 table, news, latest results
- **Standings** — full 20-club table with form guide
- **Fixtures** — latest results + upcoming fixtures with live kick-off countdown
- **Teams** — all 20 clubs with records and stadiums
- **Lab** — fan tools: Golden Boot race, end-of-season projection, schedule difficulty, head-to-head comparator

## Live data pipeline
`.github/workflows/refresh.yml` runs `scripts/refresh.py` every 6 hours, fetches standings/results/fixtures/scorers from footballapi.pulselive.com, commits `js/data.js` back to `main`, which triggers automatic redeploys on both Vercel and Cloudflare Pages.

## Deployed on
- Vercel: https://epl-hub-site.vercel.app
- Cloudflare Pages: https://epl-hub.pages.dev

Not affiliated with the Premier League.
