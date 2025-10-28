import { aabbIntersect } from './entity.js';
import { Entity } from './entity.js';

/**
 * Scene class that manages game entities and their lifecycle
 * 
 * @example
 * // Create a scene
 * const scene = new Scene();
 * 
 * // Add some entities
 * const player = scene.createEntity({
 *   pos: { x: 100, y: 100 },
 *   color: '#ff0000'
 * });
 * 
 * // Handle collisions
 * scene.onCollision = (entity1, entity2) => {
 *   console.log(`Collision between ${entity1.name} and ${entity2.name}`);
 * };
 */
export class Scene {
  constructor(){
    this.entities = [];
    this._engine = null;
  }

  /**
   * Create and add a new entity to the scene
   * @param {Object} opts - Entity options
   * @returns {Entity} The created entity
   */
  createEntity(opts={}) {
    const entity = new Entity(opts);
    this.add(entity);
    return entity;
  }

  /**
   * Add an existing entity to the scene
   * @param {Entity} entity - The entity to add
   * @returns {Entity} The added entity
   */
  add(entity){
    this.entities.push(entity);
    if (entity.onAttach) entity.onAttach(this);
    return entity;
  }

  /**
   * Remove an entity from the scene
   * @param {Entity} entity - The entity to remove
   */
  remove(entity){
    const i = this.entities.indexOf(entity);
    if (i>=0) this.entities.splice(i,1);
  }

  /**
   * Find an entity by name
   * @param {string} name - The name of the entity to find
   * @returns {Entity|null} The found entity or null
   */
  findByName(name) {
    return this.entities.find(e => e.name === name);
  }

  /**
   * Get all entities that collide with the given entity
   * @param {Entity} entity - The entity to check collisions for
   * @returns {Entity[]} Array of colliding entities
   */
  getCollisions(entity) {
    return this.entities.filter(e => 
      e !== entity && 
      e.collider && 
      entity.collider && 
      aabbIntersect(e.bounds(), entity.bounds())
    );
  }

  /**
   * Update scene and all entities
   * @param {number} dt - Delta time in seconds
   */
  update(dt){
    // Update all entities
    for (const e of this.entities) e.update(dt);

    // Check collisions
    for (let i=0;i<this.entities.length;i++){
      for (let j=i+1;j<this.entities.length;j++){
        const a = this.entities[i];
        const b = this.entities[j];
        if (a.collider && b.collider && aabbIntersect(a.bounds(), b.bounds())){
          if (this.onCollision) this.onCollision(a,b);
        }
      }
    }
  }

  /**
   * Render scene and all entities
   * @param {CanvasRenderingContext2D} ctx - Canvas rendering context
   */
  render(ctx){
    for (const e of this.entities) e.render(ctx);
  }
}
