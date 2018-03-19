import FI_Component from '../../../base/FI_Component'
import AnimationCreator from '../../../helper/AnimationCreator'
import Vector2D from '../../../math/Vector2D'
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
  async addAnimationWithData(data){
    var animation = await AnimationCreator.createWithData(data)
    this.addChild(animation);
    this.animations[data.name] = animation;
  }

  playAnaimtion(name){
    if(!this.animations[name]){
      return
    }
    this.curAnimation = this.animations[name];
    this.curAnimation.play();
    this.curAnimation.setScale(this.scale);
    this.curAnimation.setFlap(this.flap);
  }

  _onUpdate(dt){
    if( !this.enable ){
      return false;
    }
    this.curAnimation && this.curAnimation._onUpdate(dt);
    return true
  }

  _onRender(ctx){
    if( !this.enable ){
      return false;
    }
    this.curAnimation && this.curAnimation._onRender(ctx);
    return true
  }
}
