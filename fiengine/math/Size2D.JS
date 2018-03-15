import FI_Object from '../base/FI_Object';

export default class Size2D extends FI_Object{
  constructor(width,height){
    super();
    this.setWidth(width);
    this.setHeight(height);
  }

  // both
  getWH(){
    return {width:this.width, height:this.height};
  }
  setWH(w,h){
    this._setNumber('width',w);
    this._setNumber('height',h);
  }
  tranWH(w,h){
    this._tranNumber('width',w);
    this._tranNumber('height',h);
  }

  // class
  assigned(v){
    if( v instanceof Size2D){
      this.width = v.width;
      this.height = v.height;
    }
  }
  copy(){
    return new Size2D(this.width, this.height)
  }
  tran(){
    if( v instanceof Size2D){
      this.tranWH(v.width,v.height);
    }
  }
}
FI_Object.BindNumberHandler(Size2D,'Width')
FI_Object.BindNumberHandler(Size2D,'Height')
Size2D.BindMemberHandler = function(cls,name,ignoreNameInMethod){
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
  cls.prototype['_done'+name+'Dirty'] = function() { this[dirtyName] = false; }
}
Size2D.BindWHHandle = function(cls,name,ignoreNameInMethod){
  var lowerName = FI_Object.FirstLetterLower(name)
  var dirtyName = 'is'+[name]+'Dirty'
  if( ignoreNameInMethod ){
    name = '' ;
  }
  cls.prototype['get'+name+'WH'] = function () { return this[lowerName].getWH(); };
  cls.prototype['set'+name+'WH'] = function (x,y) { this[dirtyName]=true;return this[lowerName].setWH(x,y); };
  cls.prototype['tran'+name+'WH'] = function (x,y) { this[dirtyName]=true;return this[lowerName].tranWH(x,y); };
  cls.prototype['_done'+name+'Dirty'] = function() { this[dirtyName] = false; }
}
Size2D.BindClassHandle = function(cls,name,ignoreNameInMethod){
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
Size2D.BindAllHandler = function(cls,name,ignoreNameInMethod){
  Size2D.BindMemberHandler(cls,name,ignoreNameInMethod);
  Size2D.BindClassHandle(cls,name,ignoreNameInMethod);
  Size2D.BindClassHandle(cls,name,ignoreNameInMethod);
}
