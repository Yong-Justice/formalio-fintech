# Formalio — Business Operating System

Le système d'exploitation pour les PME informelles au Cameroun et en Afrique francophone. Comptabilité SYSCOHADA, conformité DGI, Score Mosika, MoMo Sync, et accès au crédit — en une seule application.

## Run & Operate

- `pnpm --filter @workspace/formalio run dev` — run the Formalio website (served at `/`)
- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Frontend: React 19 + Vite + TailwindCSS 4 + Framer Motion + Recharts
- Icons: Lucide React
- API: Express 5 (api-server artifact)
- DB: PostgreSQL + Drizzle ORM (api-server)
- Validation: Zod (`zod/v4`), `drizzle-zod`

## Where things live

- **Main website**: `artifacts/formalio/src/` — React + Vite app served at `/`
  - `src/components/LandingPage.tsx` — Public marketing page (hero, features, WhatsApp bot, accountant marketplace, pricing, testimonials, FAQ, footer)
  - `src/components/MobileApp.tsx` — Full interactive mobile app prototype (auth, dashboard, transactions, credit score, reports, tax, profile…)
  - `src/components/DesktopDashboard.tsx` — Web dashboard prototype
  - `src/components/AdminDashboard.tsx` — Admin analytics portal
  - `src/components/AccountantPortal.tsx` — Expert-comptable portal
  - `src/components/BankPortal.tsx` — Bank/MFI partner portal
  - `src/components/DesignSystem.tsx` — Design system reference
  - `src/data/demoData.ts` — All demo data (transactions, pricing, features, testimonials, FAQs)
  - `src/assets/` — Mascot PNG images (Mosika owl)
- **API server**: `artifacts/api-server/` — Express backend (optional for current prototype)
- **Mockup sandbox**: `artifacts/mockup-sandbox/` — Component preview server

## Architecture decisions

- 7-view prototype navigator in `App.tsx` using a floating Menu overlay — zero routing, pure state
- All pricing/features/FAQ data lives in `demoData.ts` — single source of truth for the UI
- FCFA formatting: always use French locale (`toLocaleString('fr-FR')`) + "FCFA" suffix; space as thousands separator (e.g., "45 000 FCFA"), never commas
- Mascot "Mosika" is a green owl brand character — PNG assets at `src/assets/`, animated via `AnimatedMascot.tsx`
- Design tokens defined in `@theme inline` block in `src/index.css`: Formalio Green (#059669), Forest Green, Gold, Surface palette

## Product

Formalio is a Business Operating System for Cameroon's 3M+ informal SMEs:
- **Comptabilité simplifiée** — transaction logging, voice input, receipt scanning
- **Rapports SYSCOHADA** — Bilan, Compte de Résultat, Tableau des Flux (SYSCOHADA 2016)
- **Score Mosika** — credit score (300–850) built from real transaction data, shared with partner banks
- **MoMo Sync** — MTN MoMo + Orange Money auto-import via NotchPay
- **Centre Fiscal** — TVA (19.25%) calculation, DGI deadlines, DSF reminders
- **Bot WhatsApp** — log transactions by WhatsApp message ("Vendu 45 000 FCFA de tissus")
- **Marketplace Comptables** — connect to ONECCA-certified accountants
- **Dossier Bancaire** — automated credit package for bank partners

## Pricing (per SRS)

- **Gratuit**: 0 FCFA/mois — 50 transactions, basic features, 1 business
- **Pro**: 8 000 FCFA/mois — unlimited transactions, full OHADA reports, MoMo sync, AI insights, 2 businesses
- **Premium**: 15 000 FCFA/mois — everything in Pro + multi-user, B2B API, dedicated accountant, 5+ businesses

## User preferences

- All changes from the SRS (Cahier de Charges v1) must be applied additively — never break existing prototype views
- FCFA amounts: always use French number format with space as thousands separator ("45 000 FCFA"), not commas
- Language: French primary, English secondary. UI text must be French unless specifically the English view
- SRS document: `attached_assets/Formalio_SRS_Cahier_de_Charges_v1_1778956031481.docx` (3597 lines)

## Gotchas

- Do not run `pnpm dev` at root — use the workflows (restart_workflow) to manage services
- The `api-server` artifact is not required for the current prototype — all data is mocked in `demoData.ts`
- `toLocaleString('fr-FR')` produces spaces as thousands separators on Node 24 — this is correct French behavior
- Hardcoded FCFA strings must use non-breaking space or regular space (never comma) as thousands separator
- The floating Menu overlay in `App.tsx` is intentional — it gives investors/demos access to all 7 views

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
- SRS Section 15.5: fintech UX patterns (FCFA format, confirmation dialogs, skeleton loaders, specific error messages)
- SRS Section 16: legal/compliance (OHADA, COBAC, ONECCA, DGI)
- SRS Section 13: pricing tiers (Gratuit/Pro/Premium) and NotchPay payment integration
