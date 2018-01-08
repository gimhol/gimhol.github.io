import FI_Component from './FI_Component'
import imageKeeper from '../keepers/ImageKeeper'

export default class FI_Text extends FI_Component{
  constructor(uri){
    super()
    this.content = 'Hello'
    this.anchor = {x:0,y:0}
    this.fontSize = '36px'
    this.fontFamily = 'Arial'
    this.textAlign = 'center'
    this.offset = {x:0, y:0}
    this.size = {width:0, height:0}
  }
  onMount(){

  }
  setWidth(){

  }
  _onSizeChange(size){
    this.size = size
    this.onSizeChange && this.onSizeChange(this)
  }
  draw(ctx){
    ctx.fillStyle = 'white'
    ctx.strokeStyle = 'gray'
    ctx.font = this.fontSize + ' ' + this.fontFamily
    ctx.textAlign = this.textAlign

    var size = ctx.measureText(this.content);
    if(size.width != this.size.width || size.height != this.size.height){
      this._onSizeChange(size)
    }
    ctx.fillText(this.content,this.offset.x,this.offset.y)
    ctx.strokeText(this.content,this.offset.x,this.offset.y)
  }
}
