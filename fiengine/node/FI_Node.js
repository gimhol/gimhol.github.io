import Vector2D from '../math/Vector2D'
import Size2D from '../math/Size2D'

export default class FI_Node {
  constructor(){
    this.children = []
    this.components = []
    this.actions = []
    this.level    = 0;
    this.parent   = null;
    this.position = new Vector2D(0,0);
    this.anchor   = new Vector2D(0.5,0.5);
    this.size     = new Size2D(0, 0);
    this.scale    = new Vector2D(1,1);
    this.rotation = 0;

    this.enable = 1;
    this.invisible = 1;
  }
  getLevel(){return this.level}
  setLevel(v){this.level=v}

  getPositionX(){return this.position.x}
  setPositionX(v){this.position.x = v; return this.position.x}
  tranPositionX(v){this.position.x += v; return this.position.x}

  getPositionY(){return this.position.y}
  setPositionY(v){this.position.y = v; return this.position.y}
  tranPositionY(v){this.position.y += v; return this.position.y}

  getPosition(){return this.position}
  setPosition(v){this.position = v}

  getRotation(){return this.rotation}
  setRotation(v){this.rotation = v; return this.rotation}
  tranRotation(v){this.rotation += v; return this.rotation}

  _onAdded(){
    this.hasAdded = true
    this.mountAllComponent()
    this.onAdded()
  }
  _onRemoved(){
    this.hasAdded = false
    this.onRemoved()
  }

  onAdded(){}
  onRemoved(){}
  onUpdate(){}

  addChild(child){
    if(child.getParent()){
      return console.warn('has been added !')
    }
    this.children.push(child)
    child.setLevel(this.level+1)
    child._onAdded()
  }
  mountAllComponent(){
    this.components.map((component)=>component.setNode(this));
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
  addComponent(component){
    this.components.push(component)
    this.hasAdded && component.setNode(this)
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
    if(!this.enable){
      return
    }
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
    if(!this.invisible){
      return
    }
    ctx.translate(this.position.x, this.position.y);
    ctx.rotate(this.rotation * Math.PI / 180);
    ctx.scale(this.scale.x,this.scale.y);
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
