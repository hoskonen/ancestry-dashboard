# Ancestry Dashboard

Backend and dashboard project for the Ancestry RPG prototype.

The goal of this project is to collect and visualize gameplay data (telemetry) to support playtesting, balancing, and system design.

## Tech Stack

* Node.js + TypeScript
* Fastify (API)
* SQLite
* Angular

## Current Status

Initial backend setup:

* TypeScript project configured
* Fastify server running
* Health endpoint available

## Getting Started

Install dependencies:

```
npm install
```

Run development server:

```
npm run dev
```

Open in browser:

```
http://localhost:3000/health
```

## Roadmap

* [X] Event ingestion API
* [X] SQLite persistence
* [ ] Dashboard UI
* [ ] Godot integration (telemetry)

## Purpose

This project is part of a broader system where a game client (Godot) sends gameplay events to a backend service for analysis and tooling.

The backend is designed to be optional and does not affect core gameplay.

## Frontend

Located in `/frontend/ancestry-dashboard-ui`

Run:
cd frontend/ancestry-dashboard-ui
npm install
npm start
