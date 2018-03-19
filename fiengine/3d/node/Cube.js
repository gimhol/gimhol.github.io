import FI_Object from '../../base/FI_Object'
import {mat4} from '../../utils/gl-matrix'
import GLHelper from '../glHelper'
import {
  FI_Vector3D
} from '../../math/Root'
export default class Cube extends FI_Object{
  constructor(){
    super()
    this.matrix = mat4.create();
    this.position = new FI_Vector3D(0,0,-16);
    this.scale = new FI_Vector3D(1,1,1);

    this.vertixPositions = [
      // Front face
      -1.0, -1.0,  1.0,
       1.0, -1.0,  1.0,
       1.0,  1.0,  1.0,
      -1.0,  1.0,  1.0,

      // Back face
      -1.0, -1.0, -1.0,
      -1.0,  1.0, -1.0,
       1.0,  1.0, -1.0,
       1.0, -1.0, -1.0,

      // Top face
      -1.0,  1.0, -1.0,
      -1.0,  1.0,  1.0,
       1.0,  1.0,  1.0,
       1.0,  1.0, -1.0,

      // Bottom face
      -1.0, -1.0, -1.0,
       1.0, -1.0, -1.0,
       1.0, -1.0,  1.0,
      -1.0, -1.0,  1.0,

      // Right face
       1.0, -1.0, -1.0,
       1.0,  1.0, -1.0,
       1.0,  1.0,  1.0,
       1.0, -1.0,  1.0,

      // Left face
      -1.0, -1.0, -1.0,
      -1.0, -1.0,  1.0,
      -1.0,  1.0,  1.0,
      -1.0,  1.0, -1.0
    ];

    var faceColors = [
      [1.0,  1.0,  1.0,  1.0],    // Front face: white
      [1.0,  0.0,  0.0,  1.0],    // Back face: red
      [0.0,  1.0,  0.0,  1.0],    // Top face: green
      [0.0,  0.0,  1.0,  1.0],    // Bottom face: blue
      [1.0,  1.0,  0.0,  1.0],    // Right face: yellow
      [1.0,  0.0,  1.0,  1.0]     // Left face: purple
    ];
    this.vertixColors = [];
    for (var j = 0; j < faceColors.length; ++j) {
      const c = faceColors[j];
      this.vertixColors = this.vertixColors.concat(c, c, c, c);
    }
  }
  initBuffers(gl){
    // 顶点坐标缓冲
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertixPositions), gl.STATIC_DRAW);

    // 顶点颜色缓冲
    const colorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertixColors), gl.STATIC_DRAW);

    // 顶点坐标索引缓冲
    const indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    // This array defines each face as two triangles, using the
    // indices into the vertex array to specify each triangle's
    // position.
    const indices = [
      0,  1,  2,      0,  2,  3,    // front
      4,  5,  6,      4,  6,  7,    // back
      8,  9,  10,     8,  10, 11,   // top
      12, 13, 14,     12, 14, 15,   // bottom
      16, 17, 18,     16, 18, 19,   // right
      20, 21, 22,     20, 22, 23,   // left
    ];
    // Now send the element array to GL
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);

    this.buffers = {
      position: positionBuffer,
      color: colorBuffer,
      indices: indexBuffer,
    };
    return this.buffers;
  }
  _onUpdate(deltaTime){
    // Set the drawing position to the "identity" point, which is
    // the center of the scene.

    var parentMatrix = null;
    if(!this.parent){
      parentMatrix = mat4.create();
    }else{
      console.log(this)
      parentMatrix = this.parent.matrix
    }

    // Now move the drawing position a bit to where we want to
    // start drawing the square.
    mat4.translate(this.matrix,parentMatrix,this.position.toArray());
    mat4.scale(this.matrix,this.matrix,this.scale.toArray());

    //mat4.rotate(this.matrix,this.matrix,10,[0, 0, 1]);
    //mat4.rotate(this.matrix,this.matrix,10,[0, 1, 0]);

    GLHelper.uniformModelViewMatrix(this.matrix);
  }
  _onRender(gl){
    // Tell WebGL how to pull out the positions from the position
    // buffer into the vertexPosition attribute
    GLHelper.bindVertexPositionBuffer(this.buffers.position);
    // Tell WebGL how to pull out the colors from the color buffer
    // into the vertexColor attribute.
    GLHelper.bindVertexColorBuffer(this.buffers.color);
    // Tell WebGL which indices to use to index the vertices
    GLHelper.bindVertexIndexBuffer(this.buffers.indices);
    GLHelper.drawElements('TRIANGLES',36,'UNSIGNED_SHORT',0);
  }
}
