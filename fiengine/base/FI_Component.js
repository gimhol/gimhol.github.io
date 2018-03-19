import FI_Node from '../node/FI_Node'
export default class FI_Component {

  constructor(){
    this.node = null;
    this.parent = null;
    this.children = []
    this.hasMounted = false;
    this.enable = true;
  }
  addChild(child){
    if( !child instanceof FI_Component){
      return console.warn(`"FI_Component.addChild" fail, this is not a FI_Component!`)
    }
    else if( child.parent !== null ){
      return console.warn(`"FI_Component.addChild" fail, this component has been added!`)
    }
    this.children.push(child);
    child.parent = this;
    this.hasMounted && child._tryToMount()
    return child;
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
  _tryToMount(){
    if( !this.hasMounted ){
      this._tryToSetNode(this.parent.node);
      this._onMount();
    }
  }
  _tryToSetNode(node){
    if( !this.node ){
      this._setNode(node);
    }
  }
  // LifeCycle
  _onMount(){
    this.hasMounted = true;
    this._mountAllChildren();
    this.onMount && this.onMount();
  }
  _onUnmount(){
    this.hasMounted = false;
    this.onUnmount && this.onUnmount();
  }
  _onDisable(){
    this.onDisable && this.onDisable();
  }
  _onEnable(){
    this.onEnable && this.onEnable();
  }
  _mountAllChildren(){
    this.children.map((child)=>child._tryToMount());
  }
  _setNode(node){
    if( !node instanceof FI_Node){
      return console.warn('FI_Component','can not mount on invaild node! node:',node)
    }
    this.node = node
    return node
  }

  _onUpdate(deltaTime){
    if( this.enable === false ){
      return false;
    }
    this.children.map((child)=>child._onUpdate(deltaTime));
    return true;
  }
  _onRender(context){
    if( this.enable === false ){
      return false;
    }
    this.children.map((child)=>child._onRender(context));
    return true;
  }
  debugDraw(){}
}
