import FI_Component from '../FI_Component'
import Vector2D from '../../math/Vector2D'
import FI_Image from '../FI_Image'
export default class FI_Frame extends FI_Image{
  constructor(){
    super(null)
    this.scale = new Vector2D(1,1);
    this.flap = new Vector2D(1,1);
  }
  init(image,duration,texRect){
    this.setDuration(duration)
    this.setImage(image)
    this.setTexRect(texRect)
  }
  setDuration(duration){this.duration = duration}
  getDuration(){ return this.duration }

}
