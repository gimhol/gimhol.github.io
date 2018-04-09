import FI_Node3D from './FI_Node3D'
import { mat4 } from '../../utils/gl-matrix'

import GLHelper from '../glHelper'

export default class FI_Camera3D extends FI_Node3D{
  constructor(){
    super();
    this.aspect = 0
    this.fieldOfView = 45 * Math.PI / 180;
    this.zNear = 0.1;
    this.zFar = 1000.0;
    this.projectionMatrix = mat4.create();

    this.yaw = 0;
  }
  setNear(value){
    this.zNear = value;
  }
  setFar(value){
    this.zFar = value;
  }
  setYaw(value){
    this.yaw = value
  }

  _onCameraLooking(gl){
    this.aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
    mat4.perspective(
      this.projectionMatrix,
      this.fieldOfView,
      this.aspect,
      this.zNear,
      this.zFar
    );
    mat4.rotate(this.projectionMatrix, this.projectionMatrix, this.yaw, [0,1,0])
    mat4.translate(this.projectionMatrix, this.projectionMatrix, this.position.toArray());
    gl.uniformMatrix4fv(
      GLHelper.uniformLocations.projectionMatrix,false,this.projectionMatrix
    );
  }
}
