export default class FI_Action {
  onAssign(){}
  onFinish(){}
  setNode(node){
    this.node = node
    this.onAssign()
  }
  _onUpdate(){}
}
