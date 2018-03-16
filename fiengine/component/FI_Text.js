import FI_Component from './FI_Component'

import Vector2D from '../math/Vector2D'

import Size2D from '../math/Size2D'

export default class FI_Text extends FI_Component{
  constructor(uri){
    super()
    this.content = 'Hello'
    this.anchor = new Vector2D(0,0.5)
    this.fontSize = 24
    this.fontSizeUnit = 'px'
    this.fontFamily = 'Arial'
    this.textAlign = 'center'
    this.fillStyle = 'white'
    this.strokeStyle = 'gray'
    this.offset = new Vector2D(0,0)
    this.size = new Size2D(0,this.fontSize)
  }
  onMount(){

  }
  _onSizeChange(w,h){
    this.setSizeWH(w,h);
    this.onSizeChange && this.onSizeChange(this)
  }
  _onRender(ctx){
    ctx.fillStyle = this.fillStyle
    ctx.strokeStyle = this.strokeStyle
    ctx.font = this.fontSize + this.fontSizeUnit + ' ' + this.fontFamily
    ctx.textAlign = this.textAlign

    var size = ctx.measureText(this.content);
    if(size.width != this.size.width || size.height != this.size.height){
      this._onSizeChange(size.width,this.fontSize)
    }
    this.fillStyle && ctx.fillText(this.content,this.offset.x+this.anchor.x*this.size.width,this.offset.y+this.anchor.y*this.size.height)
    this.strokeStyle && ctx.strokeText(this.content,this.offset.x+this.anchor.x*this.size.width,this.offset.y+this.anchor.y*this.size.height)
  }
}
Vector2D.BindAllHandler(FI_Text,'Offset');
Size2D.BindMemberHandler(FI_Text,'Size',true);
Size2D.BindWHHandle(FI_Text,'Size');
Size2D.BindClassHandle(FI_Text,'Size');
