// Input manager: keyboard and mouse
export class Input {
  constructor(canvas){
    this.keys = new Set();
    this.mouse = {x:0,y:0,down:false};
    this._onKeyDown = e=>{ this.keys.add(e.key); };
    this._onKeyUp = e=>{ this.keys.delete(e.key); };
    this._onMouseMove = e=>{
      const rect = (this._canvas||canvas).getBoundingClientRect();
      this.mouse.x = e.clientX - rect.left;
      this.mouse.y = e.clientY - rect.top;
    };
    this._onMouseDown = ()=>{ this.mouse.down = true };
    this._onMouseUp = ()=>{ this.mouse.down = false };
    this.bind(canvas);
  }
  bind(canvas){
    this._canvas = canvas;
    window.addEventListener('keydown', this._onKeyDown);
    window.addEventListener('keyup', this._onKeyUp);
    canvas.addEventListener('mousemove', this._onMouseMove);
    canvas.addEventListener('mousedown', this._onMouseDown);
    window.addEventListener('mouseup', this._onMouseUp);
  }
  destroy(){
    window.removeEventListener('keydown', this._onKeyDown);
    window.removeEventListener('keyup', this._onKeyUp);
    this._canvas.removeEventListener('mousemove', this._onMouseMove);
    this._canvas.removeEventListener('mousedown', this._onMouseDown);
    window.removeEventListener('mouseup', this._onMouseUp);
  }
  isKeyDown(key){ return this.keys.has(key) }
}
