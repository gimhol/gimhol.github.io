import FI_Component from '../FI_Component'
import Vector2D from '../../math/Vector2D'
export default class FI_Animation extends FI_Component{
  constructor(){
    super()
    this.frames = []
    this.curIndex = 0
    this.curTime = 0
    this.isAutoReset = true
    this.loop = 0
    this.curLoop = 0

    this.scale = new Vector2D(1,1);
    this.flap = new Vector2D(1,1);
  }
  /**
   * 设置缩放系数
   * @param {Vector2D} scale 缩放系数
   */
  setScale(scale){
    this.scale = scale;
    this.curFrame && this.curFrame.setScale(scale)
  }
  /**
   * 设置翻转系数
   * @param {Vector2D} flap 翻转系数
   */
  setFlap(flap){
    this.flap = flap;
    this.curFrame && this.curFrame.setFlap(flap)
  }

  addFrame(frame){
    this.frames.push(frame)
    this.hasMounted() && frame.setNode(this.node)
  }
  onMount(){
    this.frames.map((frame)=>{
      frame.setNode(this.getNode())
    })
  }
  play(){ this.playing = true }
  stop(){ this.playing = false }
  setAutoReset(v){ this.isAutoReset = v }
  setLoop(v){ this.loop = v }

  onLoopFinish(){}
  onFinish(){}

  _update(dt){
    if(this.playing){
      var curFrame = this.frames[this.curIndex]
      if( curFrame ){
        this.curTime += dt;
        curFrame._update(dt)
        var diff = this.curTime - curFrame.getDuration()
        if(diff >= 0){
          this.curTime = 0;
          var newIndex = this.curIndex+1
          if( newIndex >= this.frames.length){
            if(this.loop == 0 ){
              newIndex = 0
            }
            else if(this.curLoop >= this.loop){
              this.curLoop += 1
              newIndex = 0
            }else{
              newIndex = this.frames.length - 1
              this.stop()
            }
          }
          if(newIndex !== this.curIndex){
            this.curIndex = newIndex
            this.curFrame = this.frames[newIndex]
            this.curFrame.setScale(this.scale)
            this.curFrame.setFlap(this.flap)
          }
        }
      }
    }
  }
  _draw(ctx){
    this.curFrame && this.curFrame._draw(ctx);
  }
}
