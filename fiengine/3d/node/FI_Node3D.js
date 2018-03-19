import FI_Node from '../../node/FI_Node'
import {mat4} from '../../utils/gl-matrix'
import GLHelper from '../glHelper'
import {
  FI_Vector3D
} from '../../math/Root'
export default class Node3D extends FI_Node{
  constructor(){
    super()
    this.matrix = mat4.create();
    this.position = new FI_Vector3D(0,0,0);
    this.scale = new FI_Vector3D(1,1,1);
  }
  _onUpdate(deltaTime){

    this.children.map((child)=>child._onUpdate(deltaTime));
  }
  _onRender(gl){
    var parentMatrix = null;
    if(!this.parent){
      parentMatrix = mat4.create();
    }else{

      parentMatrix = this.parent.matrix
    }
    // Now move the drawing position a bit to where we want to
    // start drawing the square.
    mat4.translate(this.matrix,parentMatrix,this.position.toArray());
    mat4.scale(this.matrix,this.matrix,this.scale.toArray());
    GLHelper.uniformModelViewMatrix(this.matrix);

    this.onRender && this.onRender(gl);
    this.children.map((child)=>child._onRender(gl));
  }
}
FI_Vector3D.BindAllHandler(Node3D,'Position');
FI_Vector3D.BindAllHandler(Node3D,'Scale');
