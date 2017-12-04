export default class FI_Node {
  constructor(){
    this.children = []
    this.components = []

    this.position = { x:0, y:0 };
    this.anchor   = { x:0.5, y:0.5 };
    this.size     = { width: 0, height: 0 };
    this.scale    = { x:1 , y:1 };
    this.rotate   = 0;
  }
  addComponent(component){
    this.components.push(component)
    component.setNode(this)
  }
  getAnchorOffset(){
    return {
      x: this.anchor.x * this.size.width,
      y: this.anchor.y * this.size.height
    }
  }
  draw(ctx){
    ctx.translate(this.position.x, this.position.y);
    ctx.rotate(this.rotate * Math.PI / 180);
    ctx.scale(this.scale.x,this.scale.y);
    //ctx.translate(-this.position.x, -this.position.y);


    ctx.save()
    for(var i in this.components){
      this.components[i].draw(ctx);
      ctx.restore()
      ctx.save()
    }
    for(var i in this.children){
      this.children[i].draw(ctx);
      ctx.restore()
      ctx.save()
    }
    ctx.restore()
  }
}
