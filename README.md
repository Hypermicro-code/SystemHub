# SystemHub (MorningCoffee Labs) – Monorepo

Dette er monorepoet for MorningCoffee Labs-systemet. All kode samles her – apper i `/apps`, felles moduler i `/packages`. 
Målet er en ryddig, stabil grunnmur som bygges trinnvis (progress-app først), med GitHub Pages for visning.

## Struktur
- `/apps/progress` – Første app vi bygger og deploier.
- `/apps/estimates` – Kommer senere.
- `/packages/platform-shell` – Felles rammeverk (standalone + system via config).
- `/packages/table-core` – Låst (eksisterende kjerne).
- `/packages/toolbar-core` – Låst (eksisterende kjerne).
- `/packages/ui-kit` – Delte UI-komponenter.
- `/packages/platform-data` – SDK for cache/offline/sync.

## Byggesteg (kort)
1. Opprett grunnstruktur (denne versjonen).
2. Gjør `platform-shell` byggbar (kun eksportstub).
3. Sett opp enkel app i `apps/progress`.
4. Aktiver GitHub Pages (workflow).
5. Integrer shell i appen.
6. Rydd opp og dokumenter.

> Vi pauser alltid før kommandoer, secrets eller deploy-oppsett.
