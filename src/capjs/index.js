// Entry point that exposes the public API for bundling
export { default as Engine } from './engine.js';
export { Scene } from './scene.js';
export { Entity, aabbIntersect } from './entity.js';
export { Renderer } from './renderer.js';
export { Input } from './input.js';
export { Resources } from './resources.js';
export { Vec2, clamp } from './math.js';

// also provide a default export for backward compatibility
import EngineDefault from './engine.js';
import { Scene as SceneDefault } from './scene.js';
const capjs = { Engine: EngineDefault, Scene: SceneDefault };
export default capjs;
