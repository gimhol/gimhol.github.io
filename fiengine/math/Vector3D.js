import FI_Object from '../base/FI_Object';
import Size3D from './Size3D'
export default class Vector3D extends FI_Object{
  constructor(x,y,z){
    super();
    this.setX(x);
    this.setY(y);
    this.setZ(z);
  }
  // x y
  setXYZ(x,y,z){
    this._setNumber('x',x);
    this._setNumber('y',y);
    this._setNumber('z',z);
  }
  tranXYZ(x,y,z){
    this._tranNumber('x',x);
    this._tranNumber('y',y);
    this._tranNumber('z',z);
  }

  // class
  assigned(v){
    if( v instanceof Vector3D){
      this.x = v.x;
      this.y = v.y;
      this.z = v.y;
    }
  }
  copy(){
    return new Vector3D(this.x, this.y, this.z)
  }
  tran(){
    if( v instanceof Vector3D){
      this.tranXYZ(v.x,v.y,v.z);
    }
  }
  multiply(v){
    this.multiplyXYZ(v,v,v);
  }
  multiplyXYZ(x,y,z){
    this._multiplyNumber('x',x);
    this._multiplyNumber('y',y);
    this._multiplyNumber('z',z);
  }

  // TO OTHER CLASS
  toSize(){
    return new Size3D(this.x,this.y,this.z)
  }
  toObject(){
    return {x:this.x, y:this.y, z:this.z};
  }
  toString(){
    return `Vector3D(${this.x},${this.y},${this.z})`
  }
  toArray(){
    return [this.x, this.y, this.z]
  }
}
FI_Object.BindNumberHandler(Vector3D,'X')
FI_Object.BindNumberHandler(Vector3D,'Y')
FI_Object.BindNumberHandler(Vector3D,'Z')

Vector3D.BindAllHandler = function(cls,name,ignoreNameInMethod){
  var lowerName = FI_Object.FirstLetterLower(name)
  var dirtyName = 'is'+[name]+'Dirty'
  if( ignoreNameInMethod ){
    name = '' ;
  }
  cls.prototype['get'+name+'X'] = function () { return this[lowerName].getX(); };
  cls.prototype['set'+name+'X'] = function (v) { this[dirtyName] = true; return this[lowerName].setX(v); };
  cls.prototype['tran'+name+'X'] = function (v) { this[dirtyName] = true; return this[lowerName].tranX(v); };

  cls.prototype['get'+name+'Y'] = function () { return this[lowerName].getY(); };
  cls.prototype['set'+name+'Y'] = function (v) { this[dirtyName] = true; return this[lowerName].setY(v); };
  cls.prototype['tran'+name+'Y'] = function (v) { this[dirtyName] = true; return this[lowerName].tranY(v); };

  cls.prototype['get'+name+'Z'] = function () { return this[lowerName].getZ(); };
  cls.prototype['set'+name+'Z'] = function (v) { this[dirtyName] = true; return this[lowerName].setZ(v); };
  cls.prototype['tran'+name+'Z'] = function (v) { this[dirtyName] = true; return this[lowerName].tranZ(v); };


  cls.prototype['get'+name+'XYZ'] = function () { return this[lowerName].getXYZ(); };
  cls.prototype['set'+name+'XYZ'] = function (x,y,z) { this[dirtyName] = true; return this[lowerName].setXYZ(x,y,z); };
  cls.prototype['tran'+name+'XYZ'] = function (x,y,z) { this[dirtyName] = true; return this[lowerName].tranXYZ(x,y,z); };

  cls.prototype['get'+name] = function () { return this[lowerName].copy(); };
  cls.prototype['set'+name] = function (v) { this[dirtyName] = true; return this[lowerName].assigned(v); };
  cls.prototype['tran'+name] = function (v) { this[dirtyName] = true; return this[lowerName].tran(v); };

  cls.prototype['_done'+name+'Dirty'] = function() { this[dirtyName] = false; }
}
