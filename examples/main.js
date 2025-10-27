import Engine from '../src/capjs/engine.js';
import { Scene } from '../src/capjs/scene.js';
import { Entity } from '../src/capjs/entity.js';
import { Vec2 } from '../src/capjs/math.js';

const canvas = document.getElementById('game');
const engine = new Engine({canvas, width:800, height:600, pixelRatio:1});

class Player extends Entity{
  constructor(){
    super({pos:{x:100,y:100}, size:{w:32,h:32}, color:'#0f0'});
  }
  update(dt){
    const input = engine.input;
    const speed = 200;
    this.vel.x = 0; this.vel.y = 0;
    if (input.isKeyDown('ArrowLeft') || input.isKeyDown('a')) this.vel.x = -speed;
    if (input.isKeyDown('ArrowRight')|| input.isKeyDown('d')) this.vel.x = speed;
    if (input.isKeyDown('ArrowUp')   || input.isKeyDown('w')) this.vel.y = -speed;
    if (input.isKeyDown('ArrowDown') || input.isKeyDown('s')) this.vel.y = speed;
    super.update(dt);
    // clamp to screen
    this.pos.x = Math.max(0, Math.min(engine.width - this.size.w, this.pos.x));
    this.pos.y = Math.max(0, Math.min(engine.height - this.size.h, this.pos.y));
  }
}

class Box extends Entity{
  constructor(x,y){ super({pos:{x,y}, size:{w:48,h:48}, color:'#f90'}) }
}

const scene = new Scene();
const player = new Player();
scene.add(player);
scene.add(new Box(300,200));
scene.add(new Box(400,300));

scene.onCollision = (a,b)=>{
  // simple collision feedback: tint colliding entities
  a.color = '#ff5'; b.color = '#5ff';
  setTimeout(()=>{ if (a) a.color='#f90'; if (b) b.color='#f90' }, 120);
};

engine.setScene(scene);
engine.start();

// expose for dev console
window.cap = {engine, scene, player};
