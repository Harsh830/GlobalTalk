# GlobalTalk

GlobalTalk helps adults meet people around the world through respectful, interest-led conversations.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

- `artifacts/globaltalk` — responsive React/Vite app and public/authenticated route surface
- `artifacts/api-server/src/routes/globaltalk.ts` — app, matchmaking, chat, history, and safety endpoints
- `lib/api-spec/openapi.yaml` — source of truth for the API contract
- `lib/db/src/schema/index.ts` — relational schema for users, profiles, matches, messages, blocks, and reports

## Architecture decisions

- The first build uses a safe demo session and in-memory route state so the product loop is immediately previewable; production identity and realtime credentials remain server-side configuration work.
- The database schema is relational and ready for persistence, while LiveKit is intentionally not faked in the UI.
- Public profile surfaces exclude private contact and location details by design.

## Product

Landing, signup/login, onboarding, matching preferences, discovery, matchmaking, conversation shell, history, profile, settings, messages, safety guidance, and report/block flows are available. API routes and database tables cover the core product loop.

## User preferences

No additional preferences recorded.

## Gotchas

- Run API codegen after changing `lib/api-spec/openapi.yaml`.
- LiveKit and managed identity must be configured before enabling production video and account authentication.

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
