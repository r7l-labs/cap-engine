// Scene manages entities and lifecycle
import { aabbIntersect } from './entity.js';

export class Scene {
  constructor(){
    this.entities = [];
    this._engine = null;
  }
  add(entity){
    this.entities.push(entity);
    if (entity.onAttach) entity.onAttach(this);
    return entity;
  }
  remove(entity){
    const i = this.entities.indexOf(entity);
    if (i>=0) this.entities.splice(i,1);
  }
  update(dt){
    for (const e of this.entities) e.update(dt);
    // simple collision pass
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
  render(ctx){
    for (const e of this.entities) e.render(ctx);
  }
}
