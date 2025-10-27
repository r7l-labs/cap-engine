import { Renderer } from './renderer.js';
import { Input } from './input.js';

export class Engine {
  constructor({canvas, width=800, height=600, pixelRatio=1}={}){
    if (typeof canvas === 'string') canvas = document.querySelector(canvas);
    this.canvas = canvas || document.createElement('canvas');
    this.renderer = new Renderer(this.canvas);
    this.input = new Input(this.canvas);
    this.width = width; this.height = height; this.pixelRatio = pixelRatio;
    this.renderer.setSize(width * pixelRatio, height * pixelRatio);
    this.canvas.style.width = width + 'px';
    this.canvas.style.height = height + 'px';

    this._running = false;
    this._lastTime = 0;
    this.scene = null;
    this.dt = 0;
  }
  setScene(scene){
    this.scene = scene;
    if (scene) scene._engine = this;
  }
  start(){
    this._running = true;
    this._lastTime = performance.now();
    requestAnimationFrame(this._loop.bind(this));
  }
  stop(){ this._running = false }
  _loop(now){
    if (!this._running) return;
    const delta = (now - this._lastTime)/1000;
    this._lastTime = now;
    this.dt = delta;
    this.update(delta);
    this.render();
    requestAnimationFrame(this._loop.bind(this));
  }
  update(dt){ if (this.scene && this.scene.update) this.scene.update(dt); }
  render(){
    const r = this.renderer;
    r.clear();
    if (this.scene && this.scene.render) this.scene.render(r.ctx);
  }
}

export default Engine;
