import { Vec2 } from './math.js';

export class Entity {
  constructor(opts={}){
    this.pos = opts.pos ? new Vec2(opts.pos.x, opts.pos.y) : new Vec2();
    this.vel = opts.vel ? new Vec2(opts.vel.x, opts.vel.y) : new Vec2();
    this.size = opts.size || {w:16,h:16};
    this.color = opts.color || '#f00';
    this.collider = opts.collider !== undefined ? opts.collider : true;
    this.name = opts.name || 'entity';
    this._scene = null;
  }
  onAttach(scene){ this._scene = scene }
  update(dt) {
    // basic motion
    this.pos.x += this.vel.x * dt;
    this.pos.y += this.vel.y * dt;
  }
  render(ctx){
    ctx.fillStyle = this.color;
    ctx.fillRect(this.pos.x, this.pos.y, this.size.w, this.size.h);
  }
  bounds(){
    return {x:this.pos.x, y:this.pos.y, w:this.size.w, h:this.size.h};
  }
}

export function aabbIntersect(a,b){
  return a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;
}
