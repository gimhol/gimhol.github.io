import SingletonCls from './base/SingletonCls'
import SceneKeeper from './keepers/SceneKeeper'
import * as Utils from './utils'
import FI_Size2D from './math/Size2D'
import FI_Color4F from './math/Color4F';
import {mat4} from './utils/gl-matrix'
import GLHelper from './3d/glHelper'

export default class Engine extends SingletonCls{
  constructor(){
    super();
    this.setBackgroundColor(0,0,0.5);
    this.setSize(800,600);

    this.lastUpdateTime = 0;
  }
  getSize(){
    return this.size
  }
  setSize(width,height){
    this.size = new FI_Size2D(width,height);
    return this;
  }

  setBackgroundColor(r,g,b,a = 1){
    this.backgroundColor = new FI_Color4F(r,g,b,a);
    return this;
  }

  launch(container){

    this.canvas3d = document.createElement('canvas');
    this.canvas3d.style.position = 'absolute';
    container.appendChild(this.canvas3d);
    this.webgl = this.canvas3d.getContext('webgl');

    this.canvas2d = document.createElement('canvas');
    this.canvas2d.style.position = 'absolute'
    container.appendChild(this.canvas2d)


    this.setSize(800,600)
    this.ctx2d = this.canvas2d.getContext('2d');
    this.ctxTracker = Utils.trackTransform(this.ctx2d)

    GLHelper.build(this.webgl);

    this.looper(0);
    return this;
  }

  drawScene(gl) {
    gl.clearColor(...this.backgroundColor.toArray());  // Clear to black, fully opaque
    gl.clearDepth(1.0);                 // Clear everything
    gl.enable(gl.DEPTH_TEST);           // Enable depth testing
    gl.depthFunc(gl.LEQUAL);            // Near things obscure far things
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    GLHelper.setViewPort(this.size.width,this.size.height)
  }

  looper(updateTime){
    this._onUpdate(updateTime-this.lastUpdateTime)
    this._onRender()
    this.lastUpdateTime = updateTime;
    window.requestAnimationFrame(this.looper.bind(this))
  }

  _onUpdate(dt){
    if( this.canvas3d ){
      this.canvas3d.width = this.size.width;
      this.canvas3d.height = this.size.height;
    }
    if( this.canvas2d ){
      this.canvas2d.width = this.size.width;
      this.canvas2d.height = this.size.height;
    }

    SceneKeeper._onUpdate(dt);
  }
  _onRender(){
    if( this.ctx2d ){
      this.ctx2d.clearRect(0,0,...this.size.toArray());
    }

    if( this.mode === '2d'){
      if( this.ctx2d ){
        this.ctx2d.fillStyle = this.backgroundColor.toString();
        this.ctx2d.fillRect(0,0,...this.size.toArray());
      }
    }else{
      if( this.webgl ){
        this.drawScene(this.webgl);
      }
    }
    SceneKeeper._onRender(this.ctx2d, this.webgl);
  }

}
