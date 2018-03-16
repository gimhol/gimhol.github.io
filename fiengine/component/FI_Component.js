export default class FI_Component {
  constructor(){
    this.enable = true;
  }

  // LifeCycle
  _onMount(){
    this.onMount && this.onMount();
  }
  _onUnmount(){
    this.onUnmount && this.onUnmount();
  }
  _onDisable(){
    this.onDisable && this.onDisable();
  }
  _onEnable(){
    this.onEnable && this.onEnable();
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

  hasMounted(){ return !!this.node }

  setNode(node){
    if(!node){
      return console.warn('FI_Component','can not mount on invaild node! node:',node)
    }
    else if(this.node){
      return console.warn('FI_Component','Component has been mounted!')
    }
    this.node = node
    this._onMount()
  }
  getNode(){ return this.node }
  _onUpdate(){}
  _onRender(){}
  debugDraw(){}




}
