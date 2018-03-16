export default class FI_Action {
  onAssign(){}
  onFinish(){}
  _setNode(node){
    this.node = node
    this.onAssign()
  }
  _onUpdate(){}
}
