import Engine from '../src/capjs/engine.js';
import { Scene } from '../src/capjs/scene.js';
import { Entity } from '../src/capjs/entity.js';

const canvas = document.getElementById('game');
const engine = new Engine({canvas, width:480, height:320, pixelRatio:1});

class Cursor extends Entity{
  constructor(){
    super({pos:{x:0,y:0}, size:{w:8,h:8}, color:'#0ff'},);
  }
  update(dt){
    const m = engine.input.mouse;
    this.pos.x = m.x - this.size.w/2;
    this.pos.y = m.y - this.size.h/2;
    this.color = m.down ? '#ff0' : '#0ff';
  }
}

const scene = new Scene();
const cursor = new Cursor();
scene.add(cursor);

// show a clickable box
class ClickBox extends Entity{
  constructor(x,y){ super({pos:{x,y}, size:{w:120,h:60}, color:'#f06'}) }
  update(dt){
    // nothing
  }
}
const box = new ClickBox(180,120);
scene.add(box);

canvas.addEventListener('click', ()=>{
  // simple feedback: teleport box to random pos
  box.pos.x = Math.random() * (engine.width - box.size.w);
  box.pos.y = Math.random() * (engine.height - box.size.h);
});

engine.setScene(scene);
engine.start();

window.cap = {engine, scene};
