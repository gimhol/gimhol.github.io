import FI_Component from '../../base/FI_Component'
import MouseCenter from '../../input/MouseCenter'
export default class FI_Touchable extends FI_Component{

  onMount(){
    this.mousedownListener = MouseCenter.getInstance().addListener('mousedown', this._onGlobalMouseDown.bind(this), this.node.getLevel() )
    this.mouseupListener = MouseCenter.getInstance().addListener('mouseup', this._onGlobalMouseUp.bind(this), this.node.getLevel() )
    this.mousemoveListener = MouseCenter.getInstance().addListener('mousemove', this._onGlobalMouseMove.bind(this), this.node.getLevel())
  }

  onUnmount(){
    this.mousedownListener.removeSelf();
    this.mouseupListener.removeSelf();
    this.mousemoveListener.removeSelf();
  }
  _getCurrentIsMouseOnMe(e){
    if( !e || !this.transform){
      return false;
    }
    var anchorOffset = this.node.getAnchorOffset()
    var l = this.transform.e - anchorOffset.x* this.node.scale.x
    var r = l + this.node.size.width * this.node.scale.x
    var t = this.transform.f - anchorOffset.y* this.node.scale.y
    var b = t + this.node.size.height * this.node.scale.y
    this.mousePosition = {
      x:-this.transform.e+e.clientX,
      y:-this.transform.f+e.clientY
    }
    return e.clientX >= l &&
          e.clientX <= r &&
          e.clientY >= t &&
          e.clientY <= b;
  }
  _onGlobalMouseMove(e){
    if( !e ){
      return;
    }
    var curIsMouseOnMe = this._getCurrentIsMouseOnMe(e)
    if( curIsMouseOnMe ){
      !this.isMouseOnMe && this.onMouseOut && this.onMouseIn(this.mousePosition)
      this.isMouseOnMe = true
      this._onMouseMove(e)
    }else{
      this.isMouseOnMe && this.onMouseOut && this.onMouseOut(this.mousePosition)
      this.isMouseOnMe = false
    }
  }
  _onMouseMove(e){
    this.enable && this.onMouseMove && this.onMouseMove(this.mousePosition)
  }
  _onGlobalMouseDown(e){
    var curIsMouseOnMe = this._getCurrentIsMouseOnMe(e)
    this.enable && curIsMouseOnMe && this.onMouseDown && this.onMouseDown(this.mousePosition)
  }
  _onGlobalMouseUp(e){
    var curIsMouseOnMe = this._getCurrentIsMouseOnMe(e)
    this.enable && curIsMouseOnMe && this.onMouseUp && this.onMouseUp(this.mousePosition)
  }
  _onRender(ctx){
    this.debugDraw(ctx)
    this.transform = ctx.getTransform()
  }
}
