# API reference (core)

This document gives a quick overview of the core classes in `src/capjs`.

Engine
- new Engine({canvas, width, height, pixelRatio}) — creates the engine and renderer. Methods:
  - `start()` — starts the game loop
  - `stop()` — stops the game loop
  - `setScene(scene)` — attach a `Scene`

Scene
- new Scene() — manages `Entity` instances. Methods:
  - `add(entity)` — add an entity to the scene
  - `remove(entity)` — remove
  - `update(dt)` — updates entities and performs simple collision checks
  - `render(ctx)` — calls entities' `render`

Entity
- new Entity(opts) — base class for game objects. Common properties:
  - `pos`, `vel`, `size`, `color`, `collider`
  - `update(dt)` and `render(ctx)` should be overridden as needed.

Renderer
- new Renderer(canvas) — wrapper around a 2D canvas context. Methods include `clear()` and `setSize(w,h)`.

Input
- new Input(canvas) — basic input manager. Use `isKeyDown(key)` and read `mouse` state.

Resources
- new Resources() — simple image loader with `loadImage(name, src)` and `getImage(name)`.

Math
- Vec2 and `clamp` helper in `math.js`.

Notes
- The API is intentionally minimal so you can extend classes or add utilities quickly in your game code.
