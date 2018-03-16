import Vector2D from '../math/Vector2D'
import Size2D from '../math/Size2D'
import FI_Object from '../base/FI_Object'
import FI_Node from './FI_Node'
export default class FI_Node2D extends FI_Node{
  constructor(){
    super();
    this.position = new Vector2D(0,0);
    this.anchor   = new Vector2D(0.5,0.5);
    this.size     = new Size2D(0, 0);
    this.scale    = new Vector2D(1,1);
    this.rotation = 0;
  }
  // LifeCycle
  _onAdded(){
    this.hasAdded = true
    this.mountAllComponent();
    this.setEnable(true);
    this.onAdded && this.onAdded();
  }
  _onRemoved(){
    this.hasAdded = false
    this.removeAllComponents();
    this.onRemoved && this.onRemoved();
  }
  _onDisable(){
    this.onDisable && this.onDisable();
    for(var i in this.components){
      this.components[i].setEnable(false);
    }
    for(var i in this.children){
      !this.children[i].setEnable(false);
    }
  }
  _onEnable(){
    this.onEnable && this.onEnable();
    for(var i in this.components){
      this.components[i].setEnable(true);
    }
    for(var i in this.children){
      !this.children[i].setEnable(true);
    }
  }

  setEnable(v){
    if(this.enable === !!v){
      return true;
    }
    this.enable = !!v
    if(this.enable){
      this._onEnable();
    }else{
      this._onDisable();
    }
  }

  getAnchorOffset(){
    return {
      x: this.anchor.x * this.size.width,
      y: this.anchor.y * this.size.height
    }
  }

  addChild(child){
    if(child.getParent()){
      return console.warn('has been added !')
    }
    this.children.push(child)
    child.parent = this;
    child.setLevel(this.level+1)
    child._onAdded()
    return child
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
  removeComponent(component){
    for(var i=0;i<this.components.length;++i){
      if(this.components[i]==component){
        this.components.splice(i,1);
        component.hasMounted() && component._onUnmount()
        return;
      }
    }
  }
  removeAllComponents(){
    for(var i=0;i<this.components.length;++i){
      this.components[i].hasMounted() && this.components[i]._onUnmount()
    }
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
  removeAllActions(){
    this.actions = []
  }

  _update(dt){
    if(!this.enable){
      return
    }
    this.onUpdate && this.onUpdate(dt);
    this.actions.map((action)=>action._update(dt));
    this.components.map((component)=>component._update(dt));
    this.children.map((child)=>child._update(dt));
  }
  _draw(ctx){
    if(!this.visible){
      return
    }
    ctx.translate(this.position.x, this.position.y);
    ctx.rotate(this.rotation * Math.PI / 180);
    ctx.scale(this.scale.x,this.scale.y);
    ctx.save()
    this.components.map((component)=>{
      component._draw(ctx);
      ctx.restore();
      ctx.save();
    });
    this.children.map((child)=>{
      child._draw(ctx);
      ctx.restore();
      ctx.save();
    });
    ctx.restore();

    this._doneTransformsDirty();
    this._doneLevelDirty();
    this._doneEnableDirty();
  }
  isTransformsDirty(){
    return this.isPositionDirty || this.isScaleDirty || this.isRotationDirty || this.isSizeDirty
  }
  _doneTransformsDirty(){
    this._donePositionDirty();
    this._doneScaleDirty();
    this._doneAnchorDirty();
    this._doneSizeDirty();
  }
  debugDraw(ctx){}
}
Vector2D.BindAllHandler(FI_Node2D,'Position');
Vector2D.BindAllHandler(FI_Node2D,'Scale');
Vector2D.BindAllHandler(FI_Node2D,'Anchor');
Size2D.BindMemberHandler(FI_Node2D,'Size',true);
Size2D.BindWHHandle(FI_Node2D,'Size');
Size2D.BindClassHandle(FI_Node2D,'Size');
FI_Object.BindDirtyNumberHandler(FI_Node2D,'Rotation');
