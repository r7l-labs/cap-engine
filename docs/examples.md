# Examples included

This repository includes a few small examples showing how to use capjs.

- `examples/index.html` (+ `main.js`) — basic demo with a player (WASD/arrow keys) and boxes with simple collision feedback.
- `examples/sprite.html` (+ `sprite.js`) — a self-contained sprite animation example that demonstrates how to build an animated entity without external assets.
- `examples/input.html` (+ `input.js`) — demonstrates input handling and mouse interaction.

Open any of these pages with a static server (see `getting-started.md`).

How the sprite example works (summary):
- `sprite.js` creates a small in-memory sprite sheet on an offscreen canvas, then uses `drawImage` slicing to animate frames inside a custom `AnimatedEntity` class.
