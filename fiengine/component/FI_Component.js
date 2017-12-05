export default class FI_Component {
  onMount(){}
  onUnmount(){}

  setNode(node){
    if(this.node){
      return console.warn('Component has been mounted!')
    }
    this.node = node
    this.onMount()
  }
  getNode(){
    return this.node
  }
  update(){}
  draw(){}

  debugDraw(){}
}
