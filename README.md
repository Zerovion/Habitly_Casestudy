# Habitly — Case Study

This is the source for the interactive case study on [Habitly](https://habitly-psi.vercel.app), an AI-native habit tracking app. It's a standalone 3-file site (HTML/CSS/JS), separate from the actual product.

Live case study: https://zerovion.github.io/Habitly_Casestudy (update once deployed)
Habitly app: https://habitly-psi.vercel.app
Habitly source: https://github.com/Zerovion/Habitly

## What's in here

- `index.html` — the case study content (problem, research, architecture, AI strategy, RICE scoring, impact metrics, roadmap)
- `style.css` — dark glassmorphism design system
- `script.js` — Chart.js dashboards, GSAP scroll animations

## Running it locally

No build step, no dependencies to install. Just open `index.html` in a browser, or serve the folder:

```bash
python3 -m http.server 8000
```

Then visit `localhost:8000`.

## Why this exists

Habitly's README documents the product. This documents the *process* the decisions, tradeoffs, and reasoning behind building it, written up the way I'd walk someone through it in an interview.
