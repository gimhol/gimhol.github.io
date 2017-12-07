import FI_Component from './FI_Component'
import MouseCenter from '../input/MouseCenter'
export default class FI_Touchable extends FI_Component{
  setOnClickFunc(func){
    this.onClick = func
  }
  onMount(){
    MouseCenter.getInstance().addListener('mousedown', this.onMouseDown.bind(this), this.node.getLevel() )
    MouseCenter.getInstance().addListener('mouseup', this.onMouseUp.bind(this), this.node.getLevel() )
  }
  onMouseDown(e){

    var anchorOffset = this.node.getAnchorOffset()
    var l = this.transform.e - anchorOffset.x
    var r = l + this.node.size.width
    var t = this.transform.f - anchorOffset.y
    var b = t + this.node.size.height
    if(
      e.clientX >= l &&
      e.clientX <= r &&
      e.clientY >= t &&
      e.clientY <= b
    ){
      this.isMouseDownOnMe = true
      console.log(this.transform)
      console.log(this.transform.inverse())
      return true
    }
  }
  onMouseUp(e){
    if(!this.isMouseDownOnMe){
      return
    }
    this.isMouseDownOnMe = false
    var anchorOffset = this.node.getAnchorOffset()
    var l = this.transform.e - anchorOffset.x
    var r = l + this.node.size.width
    var t = this.transform.f - anchorOffset.y
    var b = t + this.node.size.height
    if(
      e.clientX >= l &&
      e.clientX <= r &&
      e.clientY >= t &&
      e.clientY <= b
    ){
      this.onClick(this)
    }
  }
  draw(ctx){
    this.debugDraw(ctx)
    this.transform = ctx.getTransform()
  }
}
