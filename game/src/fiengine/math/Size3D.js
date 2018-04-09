import FI_Object from '../base/FI_Object';

export default class Size3D extends FI_Object{
  constructor(width,height,depth){
    super();
    this.setWidth(width);
    this.setHeight(height);
    this.setDepth(depth);
  }

  // both
  getWHD(){
    return {width:this.width, height:this.height, depth: this.depth};
  }
  setWHD(w,h,d){
    this._setNumber('width',w);
    this._setNumber('height',h);
    this._setNumber('depth',d);
  }
  tranWHD(w,h,d){
    this._tranNumber('width',w);
    this._tranNumber('height',h);
    this._tranNumber('depth',d);
  }

  // class
  assigned(v){
    if( v instanceof Size3D){
      this.width = v.width;
      this.height = v.height;
      this.depth = v.depth
    }
  }
  copy(){
    return new Size3D(this.width, this.height,this.depth)
  }
  tran(){
    if( v instanceof Size3D){
      this.tranWH(v.width,v.height,v.depth);
    }
  }

  toArray(){
    return [this.width,this.height,this.depth]
  }
}
FI_Object.BindNumberHandler(Size3D,'Width')
FI_Object.BindNumberHandler(Size3D,'Height')
FI_Object.BindNumberHandler(Size3D,'Depth')
Size3D.BindMemberHandler = function(cls,name,ignoreNameInMethod){
  var lowerName = FI_Object.FirstLetterLower(name)
  var dirtyName = 'is'+[name]+'Dirty'
  if( ignoreNameInMethod ){
    name = '' ;
  }
  cls.prototype['get'+name+'Width'] = function () { return this[lowerName].getWidth(); };
  cls.prototype['set'+name+'Width'] = function (v) { this[dirtyName]=true;return this[lowerName].setWidth(v); };
  cls.prototype['tran'+name+'Width'] = function (v) { this[dirtyName]=true;return this[lowerName].tranWidth(v); };
  cls.prototype['get'+name+'Height'] = function () { return this[lowerName].getHeight(); };
  cls.prototype['set'+name+'Height'] = function (v) { this[dirtyName]=true;return this[lowerName].setHeight(v); };
  cls.prototype['tran'+name+'Height'] = function (v) { this[dirtyName]=true;return this[lowerName].tranHeight(v); };
  cls.prototype['get'+name+'Depth'] = function () { return this[lowerName].getDepth(); };
  cls.prototype['set'+name+'Depth'] = function (v) { this[dirtyName]=true;return this[lowerName].setDepth(v); };
  cls.prototype['tran'+name+'Depth'] = function (v) { this[dirtyName]=true;return this[lowerName].tranDepth(v); };
  cls.prototype['_done'+name+'Dirty'] = function() { this[dirtyName] = false; }
}
Size3D.BindWHHandle = function(cls,name,ignoreNameInMethod){
  var lowerName = FI_Object.FirstLetterLower(name)
  var dirtyName = 'is'+[name]+'Dirty'
  if( ignoreNameInMethod ){
    name = '' ;
  }
  cls.prototype['get'+name+'WHD'] = function () { return this[lowerName].getWH(); };
  cls.prototype['set'+name+'WHD'] = function (x,y,z) { this[dirtyName]=true;return this[lowerName].setWHD(x,y,z); };
  cls.prototype['tran'+name+'WHD'] = function (x,y,z) { this[dirtyName]=true;return this[lowerName].tranWHD(x,y,z); };
  cls.prototype['_done'+name+'Dirty'] = function() { this[dirtyName] = false; }
}
Size3D.BindClassHandle = function(cls,name,ignoreNameInMethod){
  var lowerName = FI_Object.FirstLetterLower(name)
  var dirtyName = 'is'+[name]+'Dirty'
  if( ignoreNameInMethod ){
    name = '' ;
  }
  cls.prototype['get'+name] = function () { return this[lowerName].copy(); };
  cls.prototype['set'+name] = function (v) { this[dirtyName]=true;return this[lowerName].assigned(v); };
  cls.prototype['tran'+name] = function (v) { this[dirtyName]=true;return this[lowerName].tran(v); };
  cls.prototype['_done'+name+'Dirty'] = function() { this[dirtyName] = false; }
}
Size3D.BindAllHandler = function(cls,name,ignoreNameInMethod){
  Size3D.BindMemberHandler(cls,name,ignoreNameInMethod);
  Size3D.BindClassHandle(cls,name,ignoreNameInMethod);
  Size3D.BindClassHandle(cls,name,ignoreNameInMethod);
}
