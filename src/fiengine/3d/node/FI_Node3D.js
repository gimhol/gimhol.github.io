import FI_Node from '../../node/FI_Node'
import {mat4,quat,quat4} from '../../utils/gl-matrix'
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
    this.rotation = new FI_Vector3D(0,0,0);

    this.rotationQuat = [];
    this.transfrom = mat4.create();
  }
  _getParentMatrix(){
    var parentMatrix = null;
    if(!this.parent){
      parentMatrix = mat4.create();
    }else{
      parentMatrix = this.parent.matrix
    }
    return parentMatrix;
  }
  _onUpdate(deltaTime){
    this.children.map((child)=>child._onUpdate(deltaTime));
  }
  _onRender(gl){
    var parentMatrix = this._getParentMatrix();

    mat4.copy(this.matrix,parentMatrix)

    quat.fromEuler(this.rotationQuat, this.rotation.x, this.rotation.y, this.rotation.z)
    mat4.fromRotationTranslationScale(
      this.transfrom,
      this.rotationQuat,
      this.position.toArray(),
      this.scale.toArray()
    )
    mat4.multiply(this.matrix, this.matrix, this.transfrom);

    GLHelper.uniformModelViewMatrix(this.matrix);

    this.onRender && this.onRender(gl);
    this.children.map((child)=>child._onRender(gl));
  }
}
FI_Vector3D.BindAllHandler(Node3D,'Position');
FI_Vector3D.BindAllHandler(Node3D,'Scale');
FI_Vector3D.BindAllHandler(Node3D,'Rotation');
