export default class FI_Node {
  constructor(){
    this.children = []
    this.components = []
    this.actions = []

    this.parent   = null;
    this.position = { x:0, y:0 };
    this.anchor   = { x:0.5, y:0.5 };
    this.size     = { width: 0, height: 0 };
    this.scale    = { x:1 , y:1 };
    this.rotation   = 0;
  }
  getPositionX(){return this.position.x}
  setPositionX(v){this.position.x = v}
  tranPositionX(v){this.position.x += v}
  getPositionY(){return this.position.y}
  setPositionY(v){this.position.y = v}
  tranPositionY(v){this.position.y += v}
  onAdded(){}
  onRemoved(){}
  onUpdate(){}
  addChild(child){
    if(child.getParent()){
      return console.warn('has been added !')
    }
    this.children.push(child)
    child.onAdded()
  }
  removeChild(child){
    for(var i=0;i<this.children.length;++i){
      if(this.children[i]==child){
        this.children.splice(i,1).onRemoved()
        return;
      }
    }
  }
  getParent(){
    return this.parent
  }
  setRotation(rotation){
    this.rotation = rotation;
  }
  getRotation(){
    return this.rotation;
  }
  addComponent(component){
    this.components.push(component)
    component.setNode(this)
    return component
  }
  addAction(action){
    this.actions.push(action)
    action.setNode(this)
    return action;
  }
  removeAction(action){
    for(var i=0;i<this.actions.length;++i){
      if(this.actions[i]==action){
        this.actions.splice(i,1)
        return;
      }
    }
  }
  getAnchorOffset(){
    return {
      x: this.anchor.x * this.size.width,
      y: this.anchor.y * this.size.height
    }
  }
  update(dt){
    this.onUpdate(dt);
    for(var i in this.actions){
      this.actions[i].update(dt)
    }
    for(var i in this.components){
      this.components[i].update(dt);
    }
    for(var i in this.children){
      this.children[i].update(dt);
    }
  }
  draw(ctx){
    ctx.translate(this.position.x, this.position.y);
    ctx.rotate(this.rotation * Math.PI / 180);
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

  debugDraw(ctx){

  }
}
