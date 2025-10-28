# Getting started

Prereqs

- A modern browser supporting ES modules.
- A static server to serve the `examples/` folder (or GitHub Pages).

Run locally

1. Install a static server if you don't have one: `npm install -g http-server`.
2. From repository root run:

```
npm run start
```

3. Open http://localhost:8080

Files of interest

- `src/capjs/` — the framework modules (Engine, Scene, Entity, Renderer, Input, Resources, Math)
- `examples/` — runnable demos showing how to use the framework

Quick demo

Open `examples/index.html`. The demo shows a movable player (arrow keys/WASD) and simple collision feedback.
