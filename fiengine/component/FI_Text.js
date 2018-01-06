import FI_Component from './FI_Component'
import imageKeeper from '../keepers/ImageKeeper'

export default class FI_Text extends FI_Component{
  constructor(uri){
    super()
    this.content = 'Hello'
    this.anchor = {x:0,y:0}
    this.fontSize = '72px'
    this.fontFamily = 'Arial'
    this.textAlign = 'left'
  }

  onMount(){

  }

  setWidth(){

  }

  draw(ctx){
    ctx.fillStyle = 'red'
    ctx.strokeStyle = 'blue'
    ctx.font = this.fontSize + ' ' + this.fontFamily
    var offsetX =  0//- 0.5 * ctx.measureText(this.content).width
    ctx.textAlign = this.textAlign
    ctx.fillText(this.content,offsetX,0)
    ctx.strokeText(this.content,offsetX,0)
  }
}
