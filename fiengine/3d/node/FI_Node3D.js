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
  }
  _onUpdate(deltaTime){
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
