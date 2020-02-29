import FI_Node from '../../node/FI_Node'
import GLHelper from '../glHelper'
import {
  FI_Vector3D,
  FI_Quaternion,
  FI_Matrix4
} from '../../math/Root'
export default class Node3D extends FI_Node{
  constructor(){
    super()
    this.position = new FI_Vector3D(0,0,0);
    this.scale = new FI_Vector3D(1,1,1);
    this.rotation = new FI_Quaternion();
    this.transfrom = new FI_Matrix4();
  }
  setRotation(vector3){
    this.rotationQuat.setEuler(vector3)
  }
  setRotationXYZ(x,y,z){
    this.rotationQuat.setEulerXYZ(x,y,z)
  }
  _onUpdate(deltaTime){
    this.children.map((child)=>child._onUpdate(deltaTime));
  }
  _onRender(gl){
    if(this.parent){
      Node3D.tempMatrix.assigned(this.parent.transfrom);
    }else{
      Node3D.tempMatrix.identity()
    }
    this.transfrom.multiply(Node3D.tempMatrix);
    this.transfrom.rotationTranslationScale(
      this.rotation,
      this.position.toArray(),
      this.scale.toArray()
    );
    GLHelper.uniformModelViewMatrix(this.transfrom);

    this.onRender && this.onRender(gl);
    this.children.map((child)=>child._onRender(gl));
  }
}
FI_Vector3D.BindAllHandler(Node3D,'Position');
FI_Vector3D.BindAllHandler(Node3D,'Scale');

Node3D.tempMatrix = new FI_Matrix4();
