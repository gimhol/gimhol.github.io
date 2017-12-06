import FI_Component from './FI_Component'
import imageKeeper from '../keepers/ImageKeeper'

export default class FI_Image extends FI_Component{
  constructor(uri){
    super()
    this.imageUri = uri;
    this.texRect = null
  }
  onMount(){
    this.loadImage(this.imageUri)
  }
  async loadImage(uri){
    try{
      this.image = await imageKeeper.getImage(uri)
      this.texRect = this.texRect || { x:0, y:0, width:this.image.width, height:this.image.height };
    }
    catch(err){
      console.warn(err)
    }
  }
  setTexRect(x,y,width,height){
    this.texRect = { x, y, width, height };
  }
  draw(ctx){
    if( this.image && this.texRect){
      var anchorOffset = this.node.getAnchorOffset()
      ctx.drawImage(this.image,
        this.texRect.x,
        this.texRect.y,
        this.texRect.width,
        this.texRect.height,
        -anchorOffset.x,
        -anchorOffset.y,
        this.node.size.width,
        this.node.size.height
      )
    }
  }
}
