import {mat4} from '../utils/gl-matrix'
class GlHelper {
  constructor(){
    this.a = 0;
    this.GlobalVertexShaderSource = `
      attribute vec4 aVertexPosition;
      attribute vec4 aVertexColor;
      attribute vec2 aTextureCoord;
      uniform mat4 uModelViewMatrix;
      uniform mat4 uProjectionMatrix;
      varying lowp vec4 vColor;
      varying highp vec2 vTextureCoord;
      void main() {
        gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
        vColor = aVertexColor;
        vTextureCoord = aTextureCoord;
      }
    `;

    this.GlobalFragmentShaderSource = `
      varying highp vec2 vTextureCoord;
      uniform sampler2D uSampler;
      void main(void) {
        gl_FragColor = texture2D(uSampler, vTextureCoord);
      }
    `;
  }

  initShaderProgram(vsSource, fsSource) {
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

  loadShader(type, source) {
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

  build(gl){
    this.gl = gl;
    this.shaderProgram = this.initShaderProgram(
      this.GlobalVertexShaderSource,
      this.GlobalFragmentShaderSource
    );
    this.attribLocations = {
      vertexPosition: this.gl.getAttribLocation(this.shaderProgram, 'aVertexPosition'),
      vertexColor: this.gl.getAttribLocation(this.shaderProgram, "aVertexColor"),
      textureCoord: gl.getAttribLocation(this.shaderProgram, 'aTextureCoord'),
    };
    this.uniformLocations = {
      projectionMatrix: this.gl.getUniformLocation(this.shaderProgram, 'uProjectionMatrix'),
      modelViewMatrix: this.gl.getUniformLocation(this.shaderProgram, 'uModelViewMatrix'),
    };

    this.gl.useProgram(this.shaderProgram);
    this.setViewPort(this.gl.canvas.clientWidth, this.gl.canvas.clientHeight)
  }

  bindVertexPositionBuffer(vertexPositions)    {
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

  bindVertexColorBuffer(vertexColors)        {
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

  bindVertexIndexBuffer(indices){
    this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, indices);
  }
  loadTexture(url) {
    var gl = this.gl;
    const texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);

    // Because images have to be download over the internet
    // they might take a moment until they are ready.
    // Until then put a single pixel in the texture so we can
    // use it immediately. When the image has finished downloading
    // we'll update the texture with the contents of the image.
    const level = 0;
    const internalFormat = gl.RGBA;
    const width = 1;
    const height = 1;
    const border = 0;
    const srcFormat = gl.RGBA;
    const srcType = gl.UNSIGNED_BYTE;
    const pixel = new Uint8Array([0, 0, 255, 255]);  // opaque blue
    gl.texImage2D(gl.TEXTURE_2D, level, internalFormat,
                  width, height, border, srcFormat, srcType,
                  pixel);

    const image = new Image();
    image.onload = function() {
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texImage2D(gl.TEXTURE_2D, level, internalFormat,
                    srcFormat, srcType, image);

                    function isPowerOf2(value) {
                return (value & (value - 1)) == 0;
              }

      // WebGL1 has different requirements for power of 2 images
      // vs non power of 2 images so check if the image is a
      // power of 2 in both dimensions.
      if (isPowerOf2(image.width) && isPowerOf2(image.height)) {
         // Yes, it's a power of 2. Generate mips.
         gl.generateMipmap(gl.TEXTURE_2D);
      } else {
         // No, it's not a power of 2. Turn of mips and set
         // wrapping to clamp to edge
         gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
         gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
         gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      }
    };
    image.src = url;

    return texture;
  }
  bindTextureCoordBuffer(textureCoord){
    const numComponents = 2;
    const type = this.gl.FLOAT;
    const normalize = false;
    const stride = 0;
    const offset = 0;
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, textureCoord);
    this.gl.vertexAttribPointer(
        this.attribLocations.textureCoord,
        numComponents,
        type,
        normalize,
        stride,
        offset);
    this.gl.enableVertexAttribArray(
        this.attribLocations.textureCoord);
  }
  uniformModelViewMatrix(modelViewMatrix){
    this.gl.uniformMatrix4fv(
        this.uniformLocations.modelViewMatrix,
        false,
        modelViewMatrix);
  }

  drawElements(elementType, vertexCount, dataType, offset){
    this.gl.drawElements(this.gl[elementType], vertexCount, this.gl[dataType], offset);
  }

  setViewPort(w,h){
    this.gl.viewport(0,0,w,h);
    !this.sss && console.log(this.gl)
    this.sss = true
  }

  setUpProjection(){
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
    //mat4.rotate(projectionMatrix, projectionMatrix,this.a,[0, 0, 1]);
    //mat4.rotate(projectionMatrix, projectionMatrix,this.a,[0, 1, 0]);
    this.gl.uniformMatrix4fv(
      this.uniformLocations.projectionMatrix,
      false,
      projectionMatrix
    );
    this.a+=0.010
  }
}

export default new GlHelper();
