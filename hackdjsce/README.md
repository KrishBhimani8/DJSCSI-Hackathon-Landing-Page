# HACKDJSCE — CSI DJSCE Hackathon Landing Page

## Overview
Landing page + registration backend for **HACKDJSCE**, a 24-hour problem-statement hackathon
organized by the **Computer Society of India, DJSCE chapter**. Teams pick a track/problem
statement and build a working solution within the time limit — no fixed creative theme.

## Features
- Full landing page: hero, about, problem statements (6 tracks), schedule, prizes, judging
  panel, rules, FAQ, registration.
- Working **registration form**, including problem-track selection, saved to a **local JSON
  file database** (`registrations.json`) — pure JavaScript, no native build tools, no external
  service or account needed.
- Scroll-reveal animations and mobile navigation, built with vanilla JS only.
- Fully responsive: single-column layout on mobile, fluid type, touch-friendly nav.

## Technologies & Libraries
- **Frontend:** HTML5, CSS3 (custom properties, no framework), vanilla JS.
  Fonts: Space Grotesk, Inter, JetBrains Mono.
- **Backend:** Node.js, Express, local JSON file storage (no database server or native
  dependencies required).

## Setup Instructions
```bash
npm install
npm start         # or: npm run dev (requires nodemon, auto-restarts on changes)
```
Visit `http://localhost:3000`. Registrations are stored in `registrations.json` in the project
root, created automatically on first run.

## Project Structure
```
hackdjsce/
├── public/
│   ├── index.html      # landing page markup
│   ├── styles.css       # all styling
│   └── script.js         # nav, reveals, form submit
├── server.js              # Express API + SQLite storage
├── package.json
├── .gitignore
└── README.md
```

## API
- `POST /api/register` — body: `{ teamName, leaderName, email, phone, college, teamSize, track, idea }`
- `GET /api/registrations` — lists stored registrations (most recent first)

## Screenshots
_Add screenshots of the running site here before submission._

## Deployment
Deploy to Render, Railway, or any Node host with a persistent disk (the JSON file needs a
writable filesystem). For serverless hosts, swap the JSON file for a hosted database instead.
