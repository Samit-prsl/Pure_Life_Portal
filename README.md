<h1 align="center">PureLife Portal</h1>

<p align="center">
  Discover, create, and book health &amp; social-service events — with an AI assistant built in.
</p>

<p align="center">
  <a href="https://golang-rest.onrender.com/health"><img src="https://img.shields.io/badge/API-Render-2ecc71" alt="API status"></a>
  <a href="https://pure-life-portal-heal-ai.onrender.com/health"><img src="https://img.shields.io/badge/healAI-FastAPI-009688" alt="healAI status"></a>
  <img src="https://img.shields.io/badge/Next.js-13-black" alt="Next.js">
  <img src="https://img.shields.io/badge/Go-1.21-00ADD8" alt="Go">
  <img src="https://img.shields.io/badge/Python-3.10+-3776AB" alt="Python">
</p>

---

## Overview

PureLife Portal connects organizations that run medical/social-service events with people who want to attend them.

- **Attendees** browse events, book a spot, and track their bookings.
- **Organizers** create, update, and delete events and see who is attending.
- **Everyone** gets **healAI**, a chatbot assistant that can search events, check bookings, and (for organizers) create events — all through natural conversation.

## Features

| Area | What you can do |
|---|---|
| Events | List, search, view details, create, update, delete |
| Bookings | Book a spot, view "my bookings", organizers see attendees per event |
| Auth | Separate organizer & attendee registration/login, JWT-based, role-gated UI |
| healAI | Groq-powered chatbot with tool-calling (live platform data, never hallucinated) |
| Ops | `/health` endpoints on both services + a GitHub Actions keep-alive cron |

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 13 (Pages Router), TypeScript, Tailwind CSS, Axios |
| Backend API | Go 1.21, Gin, GORM (AutoMigrate) |
| AI service | Python, FastAPI, OpenAI SDK → Groq, psycopg |
| Database | PostgreSQL (local or Supabase) |
| Hosting | Render (both services), GitHub Actions (cron) |

## Architecture

```
                       ┌──────────────────────────────┐
                       │         Browser (:3000)       │
                       │      Next.js frontend         │
                       └───────┬──────────────┬────────┘
                               │              │
              REST + JWT       │              │  /chat (plain text)
                               ▼              ▼
                 ┌──────────────────┐   ┌──────────────────┐
                 │  Go API  (:5000) │   │ healAI (:8000)   │
                 │  Gin + GORM      │◄──│ FastAPI + tools  │
                 └────────┬─────────┘   └───┬─────────┬────┘
                          │                 │         │
                          ▼                 ▼         ▼
                    PostgreSQL         PostgreSQL   Groq LLM
```

## Prerequisites

- **Node.js ≥ 26** (see `frontend/.nvmrc`) — `nvm use`
- **Go ≥ 1.21**
- **Python ≥ 3.10**
- **PostgreSQL** — a local server or a free [Supabase](https://supabase.com) project
- A **Groq API key** — free at [console.groq.com](https://console.groq.com)

## Quick Start

Clone the repo, then run each service in its own terminal.

### 1. Database

Create an empty database (no migration step needed — the Go API runs GORM `AutoMigrate` on boot and creates all tables):

```sql
CREATE DATABASE purelife;
```

### 2. Backend API (Go) — terminal 1

```bash
cd backend
# create .env (see table below), then:
go run .
```

> Runs on `http://localhost:5000` by default (from `PORT` in `backend/.env`).

### 3. healAI service (Python) — terminal 2

```bash
cd healAI
python -m venv .venv
source .venv/bin/activate        # Windows: .venv\Scripts\activate
pip install -r requirements.txt
# create .env (see table below), then:
uvicorn main:app --port 8000
```

> Health check: `http://localhost:8000/health`

### 4. Frontend (Next.js) — terminal 3

```bash
cd frontend
npm install
# create .env.local (see table below), then:
npm run dev
```

> Open **http://localhost:3000**

## Environment Variables

### `backend/.env`

| Key | Example | Notes |
|---|---|---|
| `PORT` | `5000` | API port |
| `DB_URL` | `postgresql://user:pass@localhost:5432/purelife` | Postgres connection string |
| `SECRET_KEY` | `<random string>` | JWT signing secret — use a long random value |

### `healAI/.env`

| Key | Example | Notes |
|---|---|---|
| `PORT` | `8000` | Service port |
| `GROQ_API_KEY` | `gsk_...` | From console.groq.com |
| `GROQ_MODEL` | `openai/gpt-oss-120b` | Any Groq chat model |
| `DB_URL` | same as backend | Reads event data directly |
| `GO_API_URL` | `http://localhost:5000` | Go API base URL (create/book events) |
| `SECRET_KEY` | same as backend | Must match the Go API to verify JWTs |

### `frontend/.env.local`

| Key | Example | Notes |
|---|---|---|
| `NEXT_PUBLIC_API_URL` | `http://localhost:5000` | Go API base URL |
| `NEXT_PUBLIC_HEALAI_URL` | `http://localhost:8000` | healAI base URL |

> **Tip:** without `NEXT_PUBLIC_API_URL`, the frontend falls back to the production Render API — set it explicitly for local development.

## API Reference

Full request/response examples live in [`Postman Collections/Postman_Collections.json`](Postman%20Collections/Postman_Collections.json).

| Method | Route | Auth | Description |
|---|---|---|---|
| POST | `/register` | — | Attendee sign up |
| POST | `/login` | — | Attendee login → JWT |
| POST | `/orgRegister` | — | Organizer sign up |
| POST | `/orgLogin` | — | Organizer login → JWT |
| GET | `/events` | — | List events |
| GET | `/event/:id` | — | Event details |
| POST | `/postevent` | Bearer (org) | Create event |
| PUT | `/updatevent/:id` | Bearer (org) | Update event |
| DELETE | `/deletevent/:id` | Bearer (org) | Delete event |
| GET | `/userevent` | Bearer (user) | My bookings |
| POST | `/bookings/:id` | Bearer (user) | Book a spot |
| GET | `/attendingusers/:id` | Bearer (org) | Attendees for an event |
| GET | `/Getorg` | Bearer (org) | Organizer profile |
| GET | `/health` | — | Liveness probe |

**healAI service:** `GET /health` · `POST /chat` (`{message, history, token?, role?}` → `{reply}`)

## healAI Chatbot

The assistant is scoped strictly to the platform (events, bookings, accounts) and uses **tool calling** against live data — it never invents events or dates.

Tools by role:

- **Guest** — `list_events`, `get_event`
- **Attendee** — + `list_my_bookings`, `book_event`
- **Organizer** — + `create_event`

Replies are forced to plain text (no Markdown) so the chat UI stays clean.

## Deployment (Render)

Both services are deployed on Render:

| Service | URL |
|---|---|
| Go API | https://golang-rest.onrender.com |
| healAI | https://pure-life-portal-heal-ai.onrender.com |

Render free-tier instances sleep after ~15 minutes of inactivity. A GitHub Actions workflow — [`.github/workflows/keep-alive.yml`](.github/workflows/keep-alive.yml) — pings both `/health` endpoints **every 10 minutes** (with cold-start retries) so they stay awake.

- Manual trigger: **Actions → Keep-Alive → Run workflow**
- Optional repo variables (`Settings → Secrets and variables → Actions → Variables`): `GO_API_URL`, `HEALAI_URL` to override the built-in URLs.

## Project Structure

```
Pure_Life_Portal/
├── backend/                  # Go REST API (Gin + GORM)
│   ├── main.go               #   routes incl. GET /health
│   ├── Controllers/          #   handlers: auth, events, bookings
│   ├── middleware/           #   JWT auth
│   ├── models/               #   GORM models (auto-migrated)
│   └── Initializers/         #   DB + .env bootstrap
├── healAI/                   # FastAPI chatbot service
│   ├── main.py               #   /health + /chat endpoints
│   ├── chat.py               #   Groq loop, system prompt, tool dispatch
│   ├── tools.py              #   platform tools (SQL + Go API calls)
│   ├── config.py / db.py     #   env + Postgres helpers
│   └── requirements.txt
├── frontend/                 # Next.js app
│   └── src/
│       ├── pages/            #   routes: auth, events, bookings
│       ├── Components/       #   UI incl. HealAIChat.tsx
│       └── lib/              #   axios client, auth context, validation
├── Postman Collections/      # API collection
└── .github/workflows/        # keep-alive cron (CI)
```

## Security Notes

- **Never commit `.env` files.** `backend/.env` was previously tracked — it has been untracked, but if your repo was ever public, **rotate the database password and `SECRET_KEY`**.
- `SECRET_KEY` must be identical in `backend/.env` and `healAI/.env` (the Python service verifies the Go API's JWTs with it).


