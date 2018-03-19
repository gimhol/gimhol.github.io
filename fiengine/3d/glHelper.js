import {mat4} from '../utils/gl-matrix'
class GlHelper {
  static initShaderProgram(vsSource, fsSource) {
    const vertexShader = this.loadShader(this.gl.VERTEX_SHADER, vsSource);
    const fragmentShader = this.loadShader(this.gl.FRAGMENT_SHADER, fsSource);

    // 创建着色器程序
    const shaderProgram = this.gl.createProgram();
    this.gl.attachShader(shaderProgram, vertexShader);
    this.gl.attachShader(shaderProgram, fragmentShader);
    this.gl.linkProgram(shaderProgram);

    // 创建失败， alert
    if (!this.gl.getProgramParameter(shaderProgram, this.gl.LINK_STATUS)) {
      alert('Unable to initialize the shader program: ' + this.gl.getProgramInfoLog(shaderProgram));
      return null;
    }

    return shaderProgram;
  }

  static loadShader(type, source) {
    const shader = this.gl.createShader(type);

    // Send the source to the shader object
    this.gl.shaderSource(shader, source);

    // Compile the shader debug
    this.gl.compileShader(shader);

    // See if it compiled successfully
    if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
      alert('An error occurred compiling the shaders: ' + this.gl.getShaderInfoLog(shader));
      this.gl.deleteShader(shader);
      return null;
    }
    return shader;
  }

  static build(gl){
    this.gl = gl;
    this.shaderProgram = this.initShaderProgram(
      this.GlobalVertexShaderSource,
      this.GlobalFragmentShaderSource
    );
    this.attribLocations = {
      vertexPosition: this.gl.getAttribLocation(this.shaderProgram, 'aVertexPosition'),
      vertexColor: this.gl.getAttribLocation(this.shaderProgram, "aVertexColor"),
    };
    this.uniformLocations = {
      projectionMatrix: this.gl.getUniformLocation(this.shaderProgram, 'uProjectionMatrix'),
      modelViewMatrix: this.gl.getUniformLocation(this.shaderProgram, 'uModelViewMatrix'),
    };

    this.gl.useProgram(this.shaderProgram);
    this.setViewPort(this.gl.canvas.clientWidth, this.gl.canvas.clientHeight)
  }

  static bindVertexPositionBuffer(vertexPositions)    {
      const numComponents = 3;
      const type = this.gl.FLOAT;
      const normalize = false;
      const stride = 0;
      const offset = 0;
      this.gl.bindBuffer(this.gl.ARRAY_BUFFER, vertexPositions);
      this.gl.vertexAttribPointer(
          this.attribLocations.vertexPosition,
          numComponents,
          type,
          normalize,
          stride,
          offset);
      this.gl.enableVertexAttribArray(this.attribLocations.vertexPosition);
  }

    static bindVertexColorBuffer(vertexColors)        {
    const numComponents = 4;
    const type = this.gl.FLOAT;
    const normalize = false;
    const stride = 0;
    const offset = 0;
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, vertexColors);
    this.gl.vertexAttribPointer(
        this.attribLocations.vertexColor,
        numComponents,
        type,
        normalize,
        stride,
        offset);
    this.gl.enableVertexAttribArray(this.attribLocations.vertexColor);
  }

  static bindVertexIndexBuffer(indices){
    this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, indices);
  }

  static uniformModelViewMatrix(modelViewMatrix){
    this.gl.uniformMatrix4fv(
        this.uniformLocations.modelViewMatrix,
        false,
        modelViewMatrix);
  }

  static drawElements(elementType, vertexCount, dataType, offset){
    this.gl.drawElements(this.gl[elementType], vertexCount, this.gl[dataType], offset);
  }

  static setViewPort(w,h){
    this.gl.viewport(0,0,w,h)
  }

  static setUpProjection(){
    const aspect = this.gl.canvas.clientWidth / this.gl.canvas.clientHeight;
    const fieldOfView = 45 * Math.PI / 180;   // in radians
    const zNear = 0.1;
    const zFar = 100.0;
    const projectionMatrix = mat4.create();
    mat4.perspective(
      projectionMatrix,
      fieldOfView,
      aspect,
      zNear,
      zFar
    );
    mat4.rotate(projectionMatrix,projectionMatrix,a,[0, 0, 1]);
    mat4.rotate(projectionMatrix,projectionMatrix,a,[0, 1, 0]);
    this.gl.uniformMatrix4fv(
      this.uniformLocations.projectionMatrix,
      false,
      projectionMatrix
    );
    a+=0.010
  }
}
var a = 0
GlHelper.GlobalVertexShaderSource = `
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

GlHelper.GlobalFragmentShaderSource = `
  varying lowp vec4 vColor;
  void main() {
    gl_FragColor = vColor;
  }
`;
export default GlHelper;
