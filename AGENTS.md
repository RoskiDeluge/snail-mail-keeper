# Repository Guidelines

## Project Structure & Module Organization
- `server.js`: Express entry; serves API and production client build.
- `routes/`: API routes (`auth.js`, `users.js`, `contacts.js`, `subscriptions.js`).
- `models/`: Mongoose schemas (`User.js`, `Contact.js`).
- `middleware/`: Auth and subscription checks.
- `config/`: DB connector (`db.js`) and environment configs (`default.json`, `production.json`).
- `client/`: React app (CRA) with `src/` components, context, and `public/` assets.

## Build, Test, and Development Commands
- `npm install && npm run clientinstall`: Install server and client deps.
- `npm run dev`: Run API (nodemon) on `:6001` and CRA dev server concurrently.
- `npm run server`: Run only the API with reload.
- `npm run client`: Run only the React client (proxy points to `http://localhost:6001`).
- `npm run build --prefix client`: Build production client bundle.
- `npm start`: Start API; serves `client/build` in production.
- `npm test --prefix client`: Run client tests (Jest via CRA).

## Coding Style & Naming Conventions
- JavaScript/Node and React; 2‑space indent; keep semicolons; prefer double quotes.
- File naming: models `PascalCase` (e.g., `User.js`), routes/middleware lowercase.
- Variables/functions `camelCase`; React components `PascalCase`.
- Client linting uses CRA’s ESLint preset; align with it when editing `client/src`.

## Testing Guidelines
- Client: Jest + React Testing Library via CRA. Place tests as `*.test.js` alongside components or under `client/src/__tests__/`. Run with `npm test --prefix client`.
- API: No tests yet. If adding, prefer Jest + Supertest; mirror route structure under `routes/__tests__/` and aim for fast, isolated tests.

## Commit & Pull Request Guidelines
- Commits: concise, imperative subjects (e.g., `Fix nav import path`); group related changes.
- Branches: `feat/…`, `fix/…`, `chore/…`, `docs/…`.
- PRs: include a clear description, linked issues, test plan, and UI screenshots for client changes. Note API/DB changes and migration steps.

## Security & Configuration Tips
- Config uses `config` package: set `mongoURI` and `jwtSecret` in `config/*.json`. Do not commit secrets—prefer `config/local.json` (git‑ignored) or environment‑specific files.
- Default port is `6001`. Client dev proxies API per `client/package.json`.
- Auth token header is `x-auth-token`; login route is rate‑limited.
