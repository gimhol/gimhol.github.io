import FI_Component from './FI_Component'
import imageKeeper from '../keepers/ImageKeeper'

export default class FI_Text extends FI_Component{
  constructor(uri){
    super()
    this.content = 'Hello'
    this.anchor = {x:0,y:0}
    this.fontSize = 36
    this.fontSizeUnit = 'px'
    this.fontFamily = 'Arial'
    this.textAlign = 'center'
    this.fillStyle = 'white'
    this.strokeStyle = 'gray'
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
    ctx.fillStyle = this.fillStyle
    ctx.strokeStyle = this.strokeStyle
    ctx.font = this.fontSize + this.fontSizeUnit + ' ' + this.fontFamily
    ctx.textAlign = this.textAlign

    var size = ctx.measureText(this.content);
    if(size.width != this.size.width || size.height != this.size.height){
      this._onSizeChange(size)
    }
    this.fillStyle && ctx.fillText(this.content,this.offset.x,this.offset.y)
    this.strokeStyle && ctx.strokeText(this.content,this.offset.x,this.offset.y)
  }
}
