import {
  FI_Vector2D,
  FI_Size2D
} from '../../math/Root'

import FI_Object from '../../base/FI_Object'
import FI_Node from '../../node/FI_Node'
export default class FI_Node2D extends FI_Node{
  constructor(){
    super();
    this.position = new FI_Vector2D(0,0);
    this.anchor   = new FI_Vector2D(0.5,0.5);
    this.size     = new FI_Size2D(0, 0);
    this.scale    = new FI_Vector2D(1,1);
    this.rotation = 0;
  }

  getAnchorOffset(){
    return {
      x: this.anchor.x * this.size.width,
      y: this.anchor.y * this.size.height
    }
  }

  addAction(action){
    this.actions.push(action)
    action._setNode(this)
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

  _onUpdate(dt){
    if( !super._onUpdate(dt) ){
      return false;
    }
    this.actions.map((action)=>action._onUpdate(dt));
    return true;
  }
  _onRender(ctx){
    if(!this.visible){
      return false
    }
    ctx.translate(this.position.x, this.position.y);
    ctx.rotate(this.rotation * Math.PI / 180);
    ctx.scale(this.scale.x,this.scale.y);
    ctx.save()
    this.components.map((component)=>{
      component._onRender(ctx);
      ctx.restore();
      ctx.save();
    });
    this.children.map((child)=>{
      child._onRender(ctx);
      ctx.restore();
      ctx.save();
    });
    ctx.restore();

    this._doneTransformsDirty();
    this._doneLevelDirty();
    this._doneEnableDirty();
    return true;
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
FI_Vector2D.BindAllHandler(FI_Node2D,'Position');
FI_Vector2D.BindAllHandler(FI_Node2D,'Scale');
FI_Vector2D.BindAllHandler(FI_Node2D,'Anchor');
FI_Size2D.BindMemberHandler(FI_Node2D,'Size',true);
FI_Size2D.BindWHHandle(FI_Node2D,'Size');
FI_Size2D.BindClassHandle(FI_Node2D,'Size');
FI_Object.BindDirtyNumberHandler(FI_Node2D,'Rotation');
