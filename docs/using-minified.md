# Using the bundled minified file (dist/capjs.min.js)

This page explains how to include the pre-built `dist/capjs.min.js` bundle in your project. The bundle is an IIFE that exposes a global `capjs` object (so it works offline and in environments that don't support ES modules).

1) Simple script tag (recommended for offline or plain HTML projects)

Place `capjs.min.js` next to your HTML file (or serve it from a static server), then include it before your application script so the global `capjs` is available.

```html
<!doctype html>
<html>
  <body>
    <canvas id="game" width="800" height="600"></canvas>

    <!-- load the bundled library (local copy) -->
    <script src="capjs.min.js"></script>

    <!-- your app script can now use the global `capjs` -->
    <script>
      const engine = new capjs.Engine({ canvas: document.getElementById('game'), width:800, height:600 });
      const scene = new capjs.Scene();
      engine.setScene(scene);
      engine.start();
    </script>
  </body>
</html>
```

2) Using the raw GitHub URL (online)

You can reference the raw file hosted in this repository if you prefer not to check the file into your project. Note: using `raw.githubusercontent.com` is convenient for demos but not recommended for production.

```html
<script src="https://raw.githubusercontent.com/r7l-labs/cap-engine/main/dist/capjs.min.js"></script>
```

3) Hosting on your own CDN or server

Upload `dist/capjs.min.js` to your CDN or static host and include it with a normal `<script src="...">` tag.

4) Loading in environments with script module loaders

Because the bundle is an IIFE (not an ES module), it doesn't support `import` syntax. If you need an ES module version, see the `src/capjs/index.js` source and consider building an ESM bundle (or using the source directly with native module imports). The `dist/capjs.js` (non-minified) file is also available if you prefer readable bundled code.

Notes and best practices
- Include the bundle before your application script so the global `capjs` is present.
- For offline use, keeping a local copy of `capjs.min.js` inside your project's `lib/` or `vendor/` folder is recommended.
- If you plan to load other scripts that depend on capjs asynchronously, ensure ordering or use a small loader to wait until `window.capjs` is defined.

Troubleshooting
- If `capjs` is undefined in your app, make sure `capjs.min.js` is loaded first and there are no network errors (check the browser console and network tab).
