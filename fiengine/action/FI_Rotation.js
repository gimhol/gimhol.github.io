import FI_Action from './FI_Action'
export class FI_RotationBy extends FI_Action{
  constructor(value, duration){
    super()
    this.value = value;
    this.duration = duration;
    this.time = duration;
  }
  onAssign(){
    this.endValue = this.node.getRotation() + this.value;
    this.speed = this.value/this.duration;
  }
  onFinish(){
    this.node.setRotation(this.endValue)
    this.node.removeAction(this)
  }
  update(dt){
    var cur = this.node.getRotation()
    this.node.setRotation(cur+this.speed*dt)
    this.time -= dt
    if(this.time <= 0){
      this.onFinish()
    }
  }
}

export class FI_RotationTo extends FI_Action{
  constructor(){
    super()
  }
  onAssign(){
    this.node = node
  }
  update(dt){

  }
}
