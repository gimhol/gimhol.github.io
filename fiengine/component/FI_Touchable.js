import FI_Component from './FI_Component'

export default class FI_Touchable extends FI_Component{
  onMount(){
    this.size = this.node.size
    this.position = {x:0, y: 0}
  }
  draw(ctx){
    this.debugDraw(ctx)
  }
  debugDraw(ctx){
    var anchorOffset = this.node.getAnchorOffset()
    ctx.strokeStyle = 'red'
    ctx.lineWidth = 5
    ctx.strokeRect(
      this.position.x-anchorOffset.x,
      this.position.y-anchorOffset.y,
      this.size.width,
      this.size.height
    )
  }
}
