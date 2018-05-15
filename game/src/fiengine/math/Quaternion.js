import { quat } from '../utils/gl-matrix'
import Vector3D from './Vector3D'

export default class Quaternion extends Array{
  constructor(){
    super();
    this.push(0);
    this.push(0);
    this.push(0);
    this.push(1);
  }
  x(){return this[0];}
  y(){return this[1];}
  z(){return this[2];}
  w(){return this[3];}
  setX(value){this[0] = value;}
  setY(value){this[1] = value;}
  setZ(value){this[2] = value;}
  setW(value){this[3] = value;}

  setEuler(v){
    quat.setEuler(this, v.x, v.y, v.z);
  }
  setEulerXYZ(x,y,z){
    quat.fromEuler(this, x, y, z);
  }
}

Quaternion.fromEuler = function(v){
  var ret = new Quaternion();
  quat.fromEuler(ret, v.x, v.y, v.z);
  return ret;
}
