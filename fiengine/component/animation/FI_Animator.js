import FI_Component from '../FI_Component'
import AnimationCreator from '../../helper/AnimationCreator'
import Vector2D from '../../math/Vector2D'
export default class FI_Animator extends FI_Component{

  constructor(){
    super()
    this.animations = {}
    this.scale = new Vector2D(1,1);
    this.flap = new Vector2D(1,1);
  }
  /**
   * 设置缩放系数
   * @param {Vector2D} scale 缩放系数
   */
  setScale(scale){
    this.scale = scale;
    this.curAnimation && this.curAnimation.setScale(scale);
  }
  /**
   * 设置翻转系数
   * @param {Vector2D} flap 翻转系数
   */
  setFlap(flap){
    this.flap = flap;
    this.curAnimation && this.curAnimation.setFlap(flap);
  }
  onMount(){
    for(var key in this.animations){
      !this.animations[key].hasMounted() && this.animations[key].setNode(this.node)
    }
  }
  addAnimationWithData(data){
    var animation = AnimationCreator.createWithData(data)
    this.hasMounted() && !animation.hasMounted() && animation.setNode(this.node)
    this.animations[data.name] = animation;
  }

  playAnaimtion(name){
    this.curAnimation = this.animations[name];
    this.curAnimation.play();
    this.curAnimation.setScale(this.scale);
    this.curAnimation.setFlap(this.flap);
  }
  setScaleX(x){

  }
  _update(dt){
    this.curAnimation && this.curAnimation._update(dt)
  }
  _draw(ctx){
    this.curAnimation && this.curAnimation._draw(ctx)
  }

}
