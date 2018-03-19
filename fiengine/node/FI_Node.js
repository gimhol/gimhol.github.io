import FI_Object from '../base/FI_Object'
import FI_Component from '../base/FI_Component'
/*

Very simple lifeCycle:
  constructed
  |
  _onAdded
  |
  _onUpdate <---
  |            |
  _onDraw   ---
  |
  _onRemoved
*/

export default class FI_Node extends FI_Object{
  constructor(){
    super();
    this.children = []
    this.components = []
    this.actions = []
    this.level    = 0;
    this.parent   = null;
    this.enable = true;
    this.visible = 1;

    this.hasAdded = false;
  }

  addComponent(component){
    if( !component instanceof FI_Component ){
      console.log(`"addComponent fail! This is not a component! "`)
      return;
    }
    this.components.push(component);
    component._setNode(this);
    this.hasAdded && component._onMount();
    return component
  }

  removeComponent(component){
    for(var i=0;i<this.components.length;++i){
      if(this.components[i]==component){
        this.components.splice(i,1);
        component.hasMounted && component._onUnmount()
        return;
      }
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

  addChild(child){
    if(child.parent){
      return console.warn('has been added !')
    }
    this.children.push(child)
    child.parent = this;
    child.setLevel(this.level+1)
    child._onAdded()
    return child
  }

  removeChild(child){
    for(var i=0;i<this.children.length;++i){
      if(this.children[i]==child){
        this.children.splice(i,1).onRemoved()
        return;
      }
    }
  }

  _onAdded(){
    this.hasAdded = true
    this._mountAllComponent();
    this.onAdded && this.onAdded();
  }
  _onRemoved(){
    this.hasAdded = false
    this._removeAllComponents();
    this.onRemoved && this.onRemoved();
  }

  _onUpdate(deltaTime){
    this.onUpdate && this.onUpdate(deltaTime);
  }

  _onRender(ctx){
    this.onRender && this.onRender(ctx);
  }

  _onEnable(){
    this.onEnable && this.onEnable();
  }

  _onDisable(){
    this.onDisable && this.onDisable();
  }

  _mountAllComponent(){
    this.components.map((component)=>!component.hasMounted && component._onMount());
  }
  _removeAllComponents(){
    this.components.map((component)=>component.hasMounted && component._onUnmount());
    this.components = [];
  }
  _setAllComponentsEnable(enable){
    this.components.map((component)=>component.setEnable(enable));
  }
}
FI_Object.BindDirtyIntHandler(FI_Node,'Level');
FI_Object.BindDirtyBoolHandler(FI_Node,'Enable');
FI_Object.BindDirtyBoolHandler(FI_Node,'Visible');
