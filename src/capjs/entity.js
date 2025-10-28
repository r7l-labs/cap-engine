import { Vec2 } from './math.js';

/**
 * A basic game entity with position, velocity, size, and collision detection.
 * 
 * @example
 * // Create a red square at position (100, 100)
 * const player = new Entity({
 *   pos: { x: 100, y: 100 },
 *   size: { w: 32, h: 32 },
 *   color: '#ff0000'
 * });
 * 
 * // Create a moving enemy
 * const enemy = new Entity({
 *   pos: { x: 200, y: 200 },
 *   vel: { x: 50, y: 0 },  // moves right at 50 pixels per second
 *   color: '#0000ff'
 * });
 */
export class Entity {
  /**
   * Create a new Entity
   * @param {Object} opts - Entity options
   * @param {Object} [opts.pos] - Initial position {x, y}
   * @param {Object} [opts.vel] - Initial velocity {x, y}
   * @param {Object} [opts.size] - Entity size {w, h}
   * @param {string} [opts.color] - Entity color (CSS color string)
   * @param {boolean} [opts.collider=true] - Whether entity participates in collision detection
   * @param {string} [opts.name] - Entity name for identification
   */
  constructor(opts={}){
    this.pos = opts.pos ? new Vec2(opts.pos.x, opts.pos.y) : new Vec2();
    this.vel = opts.vel ? new Vec2(opts.vel.x, opts.vel.y) : new Vec2();
    this.size = opts.size || {w:16,h:16};
    this.color = opts.color || '#f00';
    this.collider = opts.collider !== undefined ? opts.collider : true;
    this.name = opts.name || 'entity';
    this._scene = null;
  }

  /**
   * Called when entity is added to a scene
   * @param {Scene} scene - The scene this entity was added to
   */
  onAttach(scene){ 
    this._scene = scene;
  }

  /**
   * Update entity state
   * @param {number} dt - Time elapsed since last update in seconds
   */
  update(dt) {
    this.pos.x += this.vel.x * dt;
    this.pos.y += this.vel.y * dt;
  }

  /**
   * Render entity to canvas context
   * @param {CanvasRenderingContext2D} ctx - The canvas rendering context
   */
  render(ctx){
    ctx.fillStyle = this.color;
    ctx.fillRect(this.pos.x, this.pos.y, this.size.w, this.size.h);
  }

  /**
   * Get entity's bounding box for collision detection
   * @returns {Object} Bounding box {x, y, w, h}
   */
  bounds(){
    return {x:this.pos.x, y:this.pos.y, w:this.size.w, h:this.size.h};
  }

  /**
   * Set entity position
   * @param {number} x - X coordinate
   * @param {number} y - Y coordinate
   */
  setPosition(x, y) {
    this.pos.x = x;
    this.pos.y = y;
  }

  /**
   * Set entity velocity
   * @param {number} x - X velocity component
   * @param {number} y - Y velocity component
   */
  setVelocity(x, y) {
    this.vel.x = x;
    this.vel.y = y;
  }

  /**
   * Check if this entity collides with another entity
   * @param {Entity} other - The other entity to check collision with
   * @returns {boolean} True if entities collide
   */
  collidesWith(other) {
    if (!this.collider || !other.collider) return false;
    return aabbIntersect(this.bounds(), other.bounds());
  }
}

export function aabbIntersect(a,b){
  return a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;
}
