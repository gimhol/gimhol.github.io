import SingletonCls from './base/SingletonCls'
import SceneKeeper from './keepers/SceneKeeper'
import * as Utils from './utils'

export default class Engine extends SingletonCls{
  constructor(){
    super();
    this.lastUpdateTime = 0
    this.rootNode = SceneKeeper.getInstance()
  }
  getSize(){
    return {
      width: this.canvas.width,
      height: this.canvas.height,
    }

  }
  /**
   * 设置窗口大小
   * @param {Number} w [description]
   * @param {Number} h [description]
   */
  setSize(w,h){
    this.canvas.width = w;
    this.canvas.height = h;
    return this;
  }

  /**
   * 设置窗口底色。
   * @param {Color} value 背景颜色
   *
   * @return 本引擎实例。
   */
  setBackgroundColor(value = 'gray'){
    this.backgroundColor = value;
    return this;
  }
  launch(canvas){
    this.canvas = canvas;
    this.setSize(800,600)
    this.ctx = this.canvas.getContext('2d');
    this.ctxTracker = Utils.trackTransform(this.ctx)

    this.looper(0);
    return this;
  }

  looper(updateTime){
    this.update(updateTime-this.lastUpdateTime)
    this.draw()
    this.lastUpdateTime = updateTime;
    window.requestAnimationFrame(this.looper.bind(this))
  }

  update(dt){
    this.rootNode.update(dt);
  }
  draw(){
    var ctx = this.ctx
    ctx.clearRect(0,0, this.canvas.width,this.canvas.height);
    ctx.fillStyle = this.backgroundColor;
    ctx.fillRect(0,0, this.canvas.width,this.canvas.height)

    this.rootNode.draw(ctx);
  }
}
