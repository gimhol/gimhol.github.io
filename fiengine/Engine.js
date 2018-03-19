import SingletonCls from './base/SingletonCls'
import SceneKeeper from './keepers/SceneKeeper'
import * as Utils from './utils'
import FI_Size2D from './math/Size2D'
import FI_Color4F from './math/Color4F';
import {mat4} from './utils/gl-matrix'
import GLHelper from './3d/glHelper'
import FI_Cube from './3d/object/Cube.js'
var aaa = 1;
export default class Engine extends SingletonCls{
  constructor(){
    super();
    this.setBackgroundColor(0,0,0);
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

    this.cube = new FI_Cube();
    this.cube.initBuffers(this.webgl)
    this.looper(0);
    return this;
  }

  drawScene(gl) {

    gl.clearColor(0.0, 0.0, 0.0, 1.0);  // Clear to black, fully opaque
    gl.clearDepth(1.0);                 // Clear everything
    gl.enable(gl.DEPTH_TEST);           // Enable depth testing
    gl.depthFunc(gl.LEQUAL);            // Near things obscure far things

    // Clear the canvas before we start drawing on it.
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    // Create a perspective matrix, a special matrix that is
    // used to simulate the distortion of perspective in a camera.
    // Our field of view is 45 degrees, with a width/height
    // ratio that matches the display size of the canvas
    // and we only want to see objects between 0.1 units
    // and 100 units away from the camera.

    const fieldOfView = 45 * Math.PI / 180;   // in radians
    const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
    const zNear = 0.1;
    const zFar = 100.0;
    const projectionMatrix = mat4.create();

    // note: glmatrix.js always has the first argument
    // as the destination to receive the result.
    mat4.perspective(projectionMatrix,
                     fieldOfView,
                     aspect,
                     zNear,
                     zFar);

    // Tell WebGL to use our program when drawing
    GLHelper.uniform(projectionMatrix);

    this.cube._onRender(gl)
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
    this.cube._onUpdate(dt);
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
