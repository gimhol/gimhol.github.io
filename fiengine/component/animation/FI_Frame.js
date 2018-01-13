import FI_Component from '../FI_Component'
import Vector2D from '../../math/Vector2D'
export default class FI_Frame extends FI_Component{
  constructor(){
    super()
    this.scale = new Vector2D(1,1);
    this.flap = new Vector2D(1,1);
  }
  /**
   * 设置缩放系数
   * @param {Vector2D} scale 缩放系数
   */
  setScale(scale){
    this.scale = scale;
    this.image && this.image.setScale(scale);
  }
  /**
   * 设置翻转系数
   * @param {Vector2D} flap 翻转系数
   */
  setFlap(flap){
    this.flap = flap;
    this.image && this.image.setFlap(flap);
  }
  init(image,duration,texRect){
    this.setDuration(duration)
    this.setImage(image)
    this.setTexRect(texRect)
  }
  setImage(image){
    this.image = image;
    this.hasMounted() && image && image.setNode(this.getNode())
  }
  setDuration(duration){this.duration = duration}
  getDuration(){ return this.duration }
  setTexRect(texRect){ this.texRect = texRect }
  onMount(){
    this.image && !this.image.hasMounted() && this.image.setNode(this.getNode())
  }
  update(dt){

  }
  draw(ctx){
    if(this.image){
      this.texRect && this.image.setTexRect(
        this.texRect.x,
        this.texRect.y,
        this.texRect.width,
        this.texRect.height,
      )
      this.image.draw(ctx)
    }
  }
}
