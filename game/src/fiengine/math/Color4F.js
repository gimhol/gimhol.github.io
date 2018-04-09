import FI_Object from '../base/FI_Object';

export default class Color4F extends FI_Object{

  constructor(r,g,b,a){
    super();
    this.setR(r);
    this.setG(g);
    this.setB(b);
    this.setA(a);
  }

  // class
  assigned(v){
    if( v instanceof Color4F){
      this.r = v.r;
      this.g = v.g;
      this.b = v.b;
      this.a = v.a;
    }
  }
  copy(){
    return new Color4F(this.r, this.g, this.b, this.a)
  }
  toString(){
    return `rgba(${Math.floor(this.r*255)},${Math.floor(this.g*255)},${Math.floor(this.b*255)},${this.a})`
  }
  toArray(){
    return [this.r,this.g,this.b,this.a]
  }
}
FI_Object.BindNumberHandler(Color4F,'R')
FI_Object.BindNumberHandler(Color4F,'G')
FI_Object.BindNumberHandler(Color4F,'B')
FI_Object.BindNumberHandler(Color4F,'A')

Color4F.BindAllHandler = function(cls,name,ignoreNameInMethod){
  var lowerName = FI_Object.FirstLetterLower(name);
  cls.prototype['get'+name] = function () { return this[lowerName].copy(); };
  cls.prototype['set'+name] = function (v) { this[dirtyName] = true; return this[lowerName].assigned(v); };
}
