import FI_Component from './FI_Component'
import imageKeeper from '../keepers/ImageKeeper'
import Vector2D from '../math/Vector2D'
export default class FI_Image extends FI_Component{
  constructor(uri){
    super()
    this.imageUri = uri;
    this.texRect = null;
    this.scale = new Vector2D(1,1);
    this.flap = new Vector2D(1,1);
  }
  /**
   * 设置缩放系数
   * @param {Vector2D} scale 缩放系数
   */
  setScale(scale){ this.scale = scale; }
  /**
   * 设置翻转系数
   * @param {Vector2D} flap 翻转系数
   */
  setFlap(flap){ this.flap = flap; }

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
  _draw(ctx){
    if( this.image && this.texRect){
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
  }
}
