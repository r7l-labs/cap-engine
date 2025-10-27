// Minimal resource loader (images)
export class Resources {
  constructor(){ this.images = new Map() }
  loadImage(name, src){
    return new Promise((resolve,reject)=>{
      const img = new Image();
      img.onload = ()=>{ this.images.set(name,img); resolve(img) };
      img.onerror = reject;
      img.src = src;
    });
  }
  getImage(name){ return this.images.get(name) }
  loadAll(list){
    // list = [{name,src}, ...]
    return Promise.all(list.map(i=>this.loadImage(i.name,i.src)));
  }
}
