import FI_Component from './FI_Component'
import imageKeeper from '../keepers/ImageKeeper'
import Vector2D from '../math/Vector2D'
import Rect from '../math/Rect'
export default class FI_Image extends FI_Component{
  constructor(uri){
    super()
    this.imageUri = uri;
    this.texRect = null;
    this.scale = new Vector2D(1,1);
    this.flap = new Vector2D(1,1);
  }

  setScale(scale){ this.scale = scale; }

  setFlap(flap){ this.flap = flap; }

  onMount(){
    this.imageUri && this._loadImage(this.imageUri)
  }

  setTexRect(rect){
    this.texRect = rect;
  }

  setImage(image){
    this.image = image;
  }

  async _loadImage(uri){
    try{
      this.image = await imageKeeper.getImage(uri)
      this.texRect = this.texRect || { x:0, y:0, width:this.image.width, height:this.image.height };
    }
    catch(err){
      console.warn(err)
    }
  }

  _onRender(ctx){
    if( !super._onRender(ctx) ){
      return false;
    }
    if( this.image && this.texRect && this.node ){
      var anchorOffset = this.node.getAnchorOffset()
      ctx.scale(this.scale.x * this.flap.x, this.scale.y * this.flap.y)
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

    return true;
  }
}
