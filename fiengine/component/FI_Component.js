export default class FI_Component {
  onMount(){}
  onUnmount(){}
  hasMounted(){ return !!this.node }
  setNode(node){
    if(!node){
      return console.warn('FI_Component','can not mount on invaild node! node:',node)
    }
    else if(this.node){
      return console.warn('FI_Component','Component has been mounted!')
    }
    this.node = node
    this.onMount()
  }
  getNode(){ return this.node }
  update(){}
  draw(){}
  debugDraw(){}
}
