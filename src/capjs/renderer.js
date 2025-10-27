// Renderer wrapper for canvas 2D context
export class Renderer {
  constructor(canvas){
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.clearColor = '#000';
  }
  clear(){
    const c = this.ctx;
    c.save();
    c.fillStyle = this.clearColor;
    c.fillRect(0,0,this.canvas.width,this.canvas.height);
    c.restore();
  }
  setSize(w,h){
    this.canvas.width = w; this.canvas.height = h;
  }
}
