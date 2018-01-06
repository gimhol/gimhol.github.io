import FI_Component from './FI_Component'
import MouseCenter from '../input/MouseCenter'
export default class FI_Touchable extends FI_Component{
  setOnClickFunc(func){
    this.onClick = func
  }
  onMount(){
    MouseCenter.getInstance().addListener('mousedown', this._onMouseDown.bind(this), this.node.getLevel() )
    MouseCenter.getInstance().addListener('mouseup', this._onMouseUp.bind(this), this.node.getLevel() )
    MouseCenter.getInstance().addListener('mousemove', this._onMouseMove.bind(this), this.node.getLevel())
  }
  _onMouseMove(e){
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
      !this.isMouseOnMe && this.onMouseOut && this.onMouseIn(this)
      this.isMouseOnMe = true
    }else{
      this.isMouseOnMe && this.onMouseOut && this.onMouseOut(this)
      this.isMouseOnMe = false
    }
  }
  _onMouseDown(e){
    this.isMouseOnMe && this.onMouseDown && this.onMouseDown(this)
  }
  _onMouseUp(e){
    this.isMouseOnMe && this.onMouseUp && this.onMouseUp(this)
  }
  draw(ctx){
    this.debugDraw(ctx)
    this.transform = ctx.getTransform()
  }
}
