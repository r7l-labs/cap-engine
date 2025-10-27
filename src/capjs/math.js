// Lightweight math utilities
export class Vec2 {
  constructor(x=0,y=0){this.x=x;this.y=y}
  copy(){return new Vec2(this.x,this.y)}
  add(v){this.x+=v.x;this.y+=v.y;return this}
  sub(v){this.x-=v.x;this.y-=v.y;return this}
  scale(s){this.x*=s;this.y*=s;return this}
  length(){return Math.hypot(this.x,this.y)}
  normalize(){const l=this.length()||1;this.x/=l;this.y/=l;return this}
}

export function clamp(v,min,max){return Math.max(min,Math.min(max,v))}
