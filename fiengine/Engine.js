import FI_Node from './node/FI_Node'
import FI_Image from './component/FI_Image'
import FI_Touchable from './component/FI_Touchable'
import {FI_RotationBy} from './action/FI_Rotation'
import SceneKeeper from './keepers/SceneKeeper'
import * as Utils from './utils'
import Matrix from './base/Matrix'
import Matrix2D from './base/Matrix2D'
var m1 = new Matrix2D()
var m2 = new Matrix2D()

console.log(m1.multiply(2).toString())
console.log(m1.translate(100,99).toString())

// console.log(m1.translate(100,100).toString())
// console.log(m1.add(m2).toString())
// console.log(m1.sub(m2).toString())

export default class Engine {
  static getInstance(){
    if(!this.instance){
      this.instance = new Engine()
    }
    return this.instance;
  }
  constructor(){
    this.lastUpdateTime = 0
    this.rootNode = new FI_Node()
    this.rootNode.children.push(SceneKeeper.getInstance())
  }
  getSize(){
    return {
      width: this.canvas.width,
      height: this.canvas.height,
    }
  }
  setSize(w,h){
    this.canvas.width = w;
    this.canvas.height = h;
    return this;
  }
  setBackgroundColor(bc){
    this.backgroundColor = bc;
    return this;
  }
  launch(canvas){
    this.canvas = canvas;
    this.setSize(800,600)
    this.setBackgroundColor('white')
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

    ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
    ctx.fillStyle=this.backgroundColor;
    ctx.fillRect(0,0,this.canvas.width,this.canvas.height)
    ctx.save();
    this.rootNode.draw(ctx);
    ctx.restore()
  }
}
