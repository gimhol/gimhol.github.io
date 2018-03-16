import FI_Action from './FI_Action'
export class FI_ScaleTo extends FI_Action{
  constructor(x, y, duration){
    super()
    this.valueX = x;
    this.valueY = y;
    this.duration = duration;
    this.time = duration;
  }
  onAssign(){
    this.speedX = (this.valueX - this.node.getScaleX())/this.duration;
    this.speedY = (this.valueY - this.node.getScaleY())/this.duration;
  }
  onFinish(){
    this.node.setScaleX(this.valueX)
    this.node.setScaleY(this.valueY)
    this.node.removeAction(this)
  }
  _onUpdate(dt){
    this.node.tranScaleX(this.speedX*dt)
    this.node.tranScaleY(this.speedY*dt)
    this.time -= dt
    if(this.time <= 0){
      this.onFinish()
    }
  }
}
