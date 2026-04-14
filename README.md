# Noderax Docs

Public documentation site for Noderax, built with Next.js, Fumadocs, and
OpenNext Cloudflare.

## Scope

This repo is the long-form docs surface for:

- installer-managed self-hosted control-plane setup and operations
- operator workflows in the web dashboard
- generated API reference from a checked-in OpenAPI snapshot
- architecture and release notes for the current platform line

## Commands

```bash
pnpm install
pnpm sync:openapi
pnpm typecheck
pnpm build
```

## OpenAPI sync

The docs site does not read a live Swagger endpoint. It expects a checked-in
schema snapshot at `openapi/openapi.json`.

To refresh it from a sibling checkout:

```bash
pnpm sync:openapi
```

That command runs `pnpm openapi:export` in `../noderax-api` when available and
copies the exported schema into this repo.

## Deployment

The project mirrors the Cloudflare/OpenNext deployment model used by the
marketing site.
