import FI_Object from '../base/FI_Object';

export default class Vector2D extends FI_Object{
  constructor(x,y){
    super();
    this.setX(x);
    this.setY(y);
  }
  // x y
  getXY(){
    return {x:this.x, y:this.y};
  }
  setXY(x,y){
    this._setNumber('x',x);
    this._setNumber('y',y);
  }
  tranXY(x,y){
    this._tranNumber('x',x);
    this._tranNumber('y',y);
  }

  // class
  assigned(v){
    if( v instanceof Vector2D){
      this.x = v.x;
      this.y = v.y;
    }
  }
  copy(){
    return new Vector2D(this.x, this.y)
  }
  tran(){
    if( v instanceof Vector2D){
      this.tranXY(v.x,v.y);
    }
  }

  multiply(v){
    this.multiplyXY(v,v);
  }
  multiplyXY(x,y){
    this._multiplyNumber('x',x);
    this._multiplyNumber('y',y);
  }
}
FI_Object.BindNumberHandler(Vector2D,'X')
FI_Object.BindNumberHandler(Vector2D,'Y')

Vector2D.BindAllHandler = function(cls,name,ignoreNameInMethod){
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

  cls.prototype['get'+name+'XY'] = function () { return this[lowerName].getXY(); };
  cls.prototype['set'+name+'XY'] = function (x,y) { this[dirtyName] = true; return this[lowerName].setXY(x,y); };
  cls.prototype['tran'+name+'XY'] = function (x,y) { this[dirtyName] = true; return this[lowerName].tranXY(x,y); };

  cls.prototype['get'+name] = function () { return this[lowerName].copy(); };
  cls.prototype['set'+name] = function (v) { this[dirtyName] = true; return this[lowerName].assigned(v); };
  cls.prototype['tran'+name] = function (v) { this[dirtyName] = true; return this[lowerName].tran(v); };

  cls.prototype['_done'+name+'Dirty'] = function() { this[dirtyName] = false; }
}
