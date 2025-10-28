import Engine from '../src/capjs/engine.js';
import { Scene } from '../src/capjs/scene.js';
import { Entity } from '../src/capjs/entity.js';

const canvas = document.getElementById('game');
const engine = new Engine({canvas, width:320, height:240, pixelRatio:1});

// Create an offscreen sprite sheet (4 frames, 32x32)
function makeSpriteSheet(){
  const fw = 32, fh = 32, frames = 4;
  const oc = document.createElement('canvas');
  oc.width = fw * frames; oc.height = fh;
  const c = oc.getContext('2d');
  const colors = ['#e33','#3e3','#33e','#ee3'];
  for (let i=0;i<frames;i++){
    c.fillStyle = colors[i%colors.length];
    c.fillRect(i*fw+4,4,fw-8,fh-8);
    // add a small inner shape
    c.fillStyle = 'rgba(255,255,255,0.2)';
    c.fillRect(i*fw+10,10,12,12);
  }
  return {canvas:oc, fw, fh, frames};
}

class AnimatedEntity extends Entity{
  constructor(sheet, x,y){
    super({pos:{x,y}, size:{w:sheet.fw, h:sheet.fh}, color:'#fff'});
    this.sheet = sheet;
    this.frame = 0;
    this.time = 0;
    this.fps = 8;
  }
  update(dt){
    this.time += dt;
    const period = 1/this.fps;
    if (this.time >= period){
      this.time -= period;
      this.frame = (this.frame + 1) % this.sheet.frames;
    }
  }
  render(ctx){
    const s = this.sheet;
    ctx.drawImage(s.canvas, this.frame * s.fw, 0, s.fw, s.fh, this.pos.x, this.pos.y, s.fw, s.fh);
  }
}

const scene = new Scene();
const sheet = makeSpriteSheet();
for (let i=0;i<6;i++){
  const x = 20 + (i%3)*60;
  const y = 20 + Math.floor(i/3)*80;
  scene.add(new AnimatedEntity(sheet, x, y));
}

engine.setScene(scene);
engine.start();

window.cap = {engine, scene};
