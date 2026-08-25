# AGENTS.md

Guidance for AI coding agents working in this repository.

## Project

KillerBee: React admin dashboard prototype (2021) with login and general
settings pages. CRA 4 + TypeScript + styled-components. Era-pinned deps.

## Commands

```bash
yarn install
yarn start    # http://localhost:3000
```

## Structure

- `src/pages/Login`, `src/pages/GeneralSettings`
- `src/components`: Button, Header, Input, Modal, Select (reusable set)

## Rules for agents

- Docs-only maintenance phase: no dependency upgrades or runtime behavior changes
- Never commit `.env*`; only `.env.example` is tracked
