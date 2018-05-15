import { glMatrix , mat4} from '../utils/gl-matrix'

export default class Matrix4 extends glMatrix.ARRAY_TYPE{
  constructor(){
    super(16);
    this[0] = 1;
    this[1] = 0;
    this[2] = 0;
    this[3] = 0;
    this[4] = 0;
    this[5] = 1;
    this[6] = 0;
    this[7] = 0;
    this[8] = 0;
    this[9] = 0;
    this[10] = 1;
    this[11] = 0;
    this[12] = 0;
    this[13] = 0;
    this[14] = 0;
    this[15] = 1;
  }

  assigned(v){
    mat4.copy(this,v)
  }
  multiply(v){
    mat4.multiply(this, this, v);
  }
  rotationTranslationScale(r,t,s){
    mat4.fromRotationTranslationScale(this,r,t,s)
  }
  identity(){
    mat4.identity(this)
  }
}
