import SingletonCls from './base/SingletonCls'
import SceneKeeper from './keepers/SceneKeeper'
import * as Utils from './utils'
import FI_Size2D from './math/Size2D'
import FI_Color4F from './math/Color4F';
import {mat4} from './utils/gl-matrix'

import FI_Cube from './3DObject/Cube.js'
var aaa = 1;
export default class Engine extends SingletonCls{
  constructor(){
    super();
    this.setBackgroundColor(0,0,0);
    this.setMode('3d');
    this.setSize(800,600);

    this.lastUpdateTime = 0;
    this.rootNode = SceneKeeper.getInstance()
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
  setMode(value = '3d'){
    this.mode = value;
  }
  launch(container){

    if( this.mode === '3d' ){
      this.canvas3d = document.createElement('canvas');
      this.canvas3d.style.position = 'absolute';
      container.appendChild(this.canvas3d);
      this.webgl = this.canvas3d.getContext('webgl');
    }


    this.canvas2d = document.createElement('canvas');
    this.canvas2d.style.position = 'absolute'
    container.appendChild(this.canvas2d)


    this.setSize(800,600)
    this.ctx2d = this.canvas2d.getContext('2d');
    this.ctxTracker = Utils.trackTransform(this.ctx2d)

    const vsSource = `
      attribute vec4 aVertexPosition;
      attribute vec4 aVertexColor;
      uniform mat4 uModelViewMatrix;
      uniform mat4 uProjectionMatrix;
      varying lowp vec4 vColor;
      void main() {
        gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
        vColor = aVertexColor;
      }
    `;

    const fsSource = `
      varying lowp vec4 vColor;
      void main() {
        gl_FragColor = vColor;
      }
    `;

    const shaderProgram = this.initShaderProgram(this.webgl, vsSource, fsSource);

    this.programInfo = {
      program: shaderProgram,
      attribLocations: {
        vertexPosition: this.webgl.getAttribLocation(shaderProgram, 'aVertexPosition'),
        vertexColor: this.webgl.getAttribLocation(shaderProgram, "aVertexColor"),
      },
      uniformLocations: {
        projectionMatrix: this.webgl.getUniformLocation(shaderProgram, 'uProjectionMatrix'),
        modelViewMatrix: this.webgl.getUniformLocation(shaderProgram, 'uModelViewMatrix'),
      },
    };

    this.cube = new FI_Cube();

    // Here's where we call the routine that builds all the
    // objects we'll be drawing.
    this.buffers = this.cube.initBuffers(this.webgl);
    // Draw the scene
    console.log(this.buffers)



    this.looper(0);
    return this;
  }
  loadShader(gl, type, source) {
    const shader = gl.createShader(type);

    // Send the source to the shader object

    gl.shaderSource(shader, source);

    // Compile the shader program

    gl.compileShader(shader);

    // See if it compiled successfully

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      alert('An error occurred compiling the shaders: ' + gl.getShaderInfoLog(shader));
      gl.deleteShader(shader);
      return null;
    }

    return shader;
  }

  initShaderProgram(gl, vsSource, fsSource) {
    const vertexShader = this.loadShader(gl, gl.VERTEX_SHADER, vsSource);
    const fragmentShader = this.loadShader(gl, gl.FRAGMENT_SHADER, fsSource);

    // 创建着色器程序

    const shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);

    // 创建失败， alert
    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
      alert('Unable to initialize the shader program: ' + gl.getProgramInfoLog(shaderProgram));
      return null;
    }

    return shaderProgram;
  }

  initBuffers(gl) {
    // Create a buffer for the square's positions.
    const positionBuffer = gl.createBuffer();


    // Select the positionBuffer as the one to apply buffer
    // operations to from here out.
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

    // Now create an array of positions for the square.
    const positions = [
       1.0,  1.0,
      -1.0,  1.0,
       1.0, -1.0,
      -1.0, -1.0,
    ];

    // Now pass the list of positions into WebGL to build the
    // shape. We do this by creating a Float32Array from the
    // JavaScript array, then use it to fill the current buffer.
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

    const colorBuffer = gl.createBuffer();
    var colors = [
      1.0,  1.0,  1.0,  1.0,    // 白色
      1.0,  0.0,  0.0,  1.0,    // 红色
      0.0,  1.0,  0.0,  1.0,    // 绿色
      0.0,  0.0,  1.0,  1.0     // 蓝色
    ];

    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);


    return {
      position: positionBuffer,
      color: colorBuffer,
    };
  }

  drawScene(gl, programInfo, buffers, deltaTime) {
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

  // Set the drawing position to the "identity" point, which is
  // the center of the scene.
  const modelViewMatrix = mat4.create();

  // Now move the drawing position a bit to where we want to
  // start drawing the square.

  mat4.translate(modelViewMatrix,     // destination matrix
                 modelViewMatrix,     // matrix to translate
                 [-0.0, 0.0, -6.0]);  // amount to translate
  mat4.rotate(modelViewMatrix,  // destination matrix
              modelViewMatrix,  // matrix to rotate
              aaa,     // amount to rotate in radians
              [0, 0, 1]);       // axis to rotate around (Z)
  mat4.rotate(modelViewMatrix,  // destination matrix
              modelViewMatrix,  // matrix to rotate
              aaa * .7,// amount to rotate in radians
              [0, 1, 0]);       // axis to rotate around (X)

  // Tell WebGL how to pull out the positions from the position
  // buffer into the vertexPosition attribute
  {
    const numComponents = 3;
    const type = gl.FLOAT;
    const normalize = false;
    const stride = 0;
    const offset = 0;
    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.position);
    gl.vertexAttribPointer(
        programInfo.attribLocations.vertexPosition,
        numComponents,
        type,
        normalize,
        stride,
        offset);
    gl.enableVertexAttribArray(
        programInfo.attribLocations.vertexPosition);
  }

  // Tell WebGL how to pull out the colors from the color buffer
  // into the vertexColor attribute.
  {
    const numComponents = 4;
    const type = gl.FLOAT;
    const normalize = false;
    const stride = 0;
    const offset = 0;
    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.color);
    gl.vertexAttribPointer(
        programInfo.attribLocations.vertexColor,
        numComponents,
        type,
        normalize,
        stride,
        offset);
    gl.enableVertexAttribArray(
        programInfo.attribLocations.vertexColor);
  }

  // Tell WebGL which indices to use to index the vertices
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffers.indices);

  // Tell WebGL to use our program when drawing

  gl.useProgram(programInfo.program);

  // Set the shader uniforms

  gl.uniformMatrix4fv(
      programInfo.uniformLocations.projectionMatrix,
      false,
      projectionMatrix);
  gl.uniformMatrix4fv(
      programInfo.uniformLocations.modelViewMatrix,
      false,
      modelViewMatrix);

  {
    const vertexCount = 36;
    const type = gl.UNSIGNED_SHORT;
    const offset = 0;
    gl.drawElements(gl.TRIANGLES, vertexCount, type, offset);
  }

  // Update the rotation for the next _draw
  aaa += 0.01;
  // cubeRotation += deltaTime;
}

  looper(updateTime){
    this._update(updateTime-this.lastUpdateTime)
    this._draw()
    this.lastUpdateTime = updateTime;
    window.requestAnimationFrame(this.looper.bind(this))
  }

  _update(dt){
    if( this.canvas3d ){
      this.canvas3d.width = this.size.width;
      this.canvas3d.height = this.size.height;
    }

    if( this.canvas2d ){
      this.canvas2d.width = this.size.width;
      this.canvas2d.height = this.size.height;
    }
    if( this.rootNode ){
      this.rootNode._update(dt);
    }
  }
  _draw(){
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
        this.drawScene(this.webgl, this.programInfo, this.buffers);
      }
    }
    this.rootNode._draw(this.ctx2d);
  }

}
