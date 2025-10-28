import { Renderer } from './renderer.js';
import { Input } from './input.js';
import { Scene } from './scene.js';

/**
 * Main game engine class that handles the game loop, rendering, and input.
 * 
 * @example
 * // Create a simple game
 * const game = new Engine({
 *   width: 800,
 *   height: 600,
 *   backgroundColor: '#000'  // black background
 * });
 * 
 * // Start the game
 * game.start();
 */
export class Engine {
  /**
   * Create a new game engine
   * @param {Object} opts - Engine options
   * @param {HTMLCanvasElement|string} [opts.canvas] - Canvas element or selector
   * @param {number} [opts.width=800] - Canvas width
   * @param {number} [opts.height=600] - Canvas height
   * @param {number} [opts.pixelRatio=1] - Canvas pixel ratio
   * @param {string} [opts.backgroundColor='#000'] - Canvas background color
   */
  constructor({canvas, width=800, height=600, pixelRatio=1, backgroundColor='#000'}={}){
    // Setup canvas
    if (typeof canvas === 'string') canvas = document.querySelector(canvas);
    this.canvas = canvas || document.createElement('canvas');
    if (!this.canvas.parentElement) {
      document.body.appendChild(this.canvas);
    }

    // Setup core systems
    this.renderer = new Renderer(this.canvas);
    this.input = new Input(this.canvas);
    this.width = width;
    this.height = height;
    this.pixelRatio = pixelRatio;
    this.backgroundColor = backgroundColor;

    // Configure canvas size
    this.renderer.setSize(width * pixelRatio, height * pixelRatio);
    this.canvas.style.width = width + 'px';
    this.canvas.style.height = height + 'px';

    // Game state
    this._running = false;
    this._lastTime = 0;
    this.scene = null;
    this.dt = 0;

    // Setup default scene if none provided
    this.createScene();
  }

  /**
   * Create and set a new scene
   * @returns {Scene} The newly created scene
   */
  createScene() {
    const scene = new Scene();
    this.setScene(scene);
    return scene;
  }

  /**
   * Set the active scene
   * @param {Scene} scene - The scene to set as active
   */
  setScene(scene){
    this.scene = scene;
    if (scene) scene._engine = this;
  }

  /**
   * Start the game loop
   */
  start(){
    if (this._running) return;
    this._running = true;
    this._lastTime = performance.now();
    requestAnimationFrame(this._loop.bind(this));
  }

  /**
   * Stop the game loop
   */
  stop(){ 
    this._running = false 
  }

  /**
   * Get current input state
   * @param {string} key - Key to check (e.g., 'ArrowLeft', 'Space')
   * @returns {boolean} True if key is pressed
   */
  isKeyPressed(key) {
    return this.input.keys[key] === true;
  }

  /**
   * Get mouse position
   * @returns {{x: number, y: number}} Mouse coordinates
   */
  getMousePosition() {
    return this.input.mouse;
  }

  _loop(now){
    if (!this._running) return;
    const delta = (now - this._lastTime)/1000;
    this._lastTime = now;
    this.dt = delta;
    this.update(delta);
    this.render();
    requestAnimationFrame(this._loop.bind(this));
  }

  update(dt){ 
    if (this.scene && this.scene.update) this.scene.update(dt);
  }

  render(){
    const r = this.renderer;
    r.clear(this.backgroundColor);
    if (this.scene && this.scene.render) this.scene.render(r.ctx);
  }
}

export default Engine;
