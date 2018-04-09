export default class FI_Object{

}

FI_Object.FirstLetterLower = function(name){
  return name.substring(0,1).toLowerCase()+name.substring(1,name.length).toLowerCase();
}

FI_Object.BindIntHandler = function(cls,name){
  var lowerName = FI_Object.FirstLetterLower(name)

  cls.prototype._getInt = function(name){
    return Math.floor(this[name])
  }
  cls.prototype._setInt = function(name,v){
    if(typeof v === 'number'){
      this[name] = Math.floor(v);
    }
  }
  cls.prototype._tranInt = function(name,v){
    if(typeof v === 'number'){
      this[name] = Math.floor(this[name] + v);
    }
  }
  cls.prototype._multiplyInt = function(name,v){
    if(typeof v === 'number'){
      this[name] = Math.floor(this[name] * v);
    }
  }
  cls.prototype._dividedInt = function(name,v){
    if(typeof v === 'number'){
      this[name] = Math.floor(this[name] / v);
    }
  }

  cls.prototype['get'+name] = function () { return this._getInt(lowerName); };
  cls.prototype['set'+name] = function (v) { return this._setInt(lowerName,v); };
  cls.prototype['tran'+name] = function (v) { return this._tranInt(lowerName,v); };
}

FI_Object.BindDirtyIntHandler = function(cls,name){
  var lowerName = FI_Object.FirstLetterLower(name)
  var dirtyName = 'is'+[name]+'Dirty'
  cls.prototype._getInt = function(name){
    return Math.floor(this[name])
  }
  cls.prototype._setInt = function(name,v){
    if(typeof v === 'number' && v !== this[name]){
      this[dirtyName] = true;
      this[name] = Math.floor(v);
    }
  }
  cls.prototype._tranInt = function(name,v){
    if(typeof v === 'number' && v !== this[name]){
      this[dirtyName] = true;
      this[name] = Math.floor(this[name] + v);
    }
  }
  cls.prototype._multiplyInt = function(name,v){
    if(typeof v === 'number' && v !== this[name]){
      this[dirtyName] = true;
      this[name] = Math.floor(this[name] * v);
    }
  }
  cls.prototype._dividedInt = function(name,v){
    if(typeof v === 'number' && v !== this[name]){
      this[dirtyName] = true;
      this[name] = Math.floor(this[name] / v);
    }
  }

  cls.prototype['get'+name] = cls.prototype['get'+name] || function () { return this._getInt(lowerName); };
  cls.prototype['set'+name] = cls.prototype['set'+name] || function (v) { return this._setInt(lowerName,v); };
  cls.prototype['tran'+name] = cls.prototype['tran'+name] || function (v) { return this._tranInt(lowerName,v); };
  cls.prototype['_done'+name+'Dirty'] = cls.prototype['_done'+name+'Dirty'] || function() { this[dirtyName] = false; }
}

FI_Object.BindNumberHandler = function(cls,name){
  var lowerName = FI_Object.FirstLetterLower(name)
  cls.prototype._getNumber = function(name){
    return this[name]
  }
  cls.prototype._setNumber = function(name,v){
    if(typeof v === 'number'){
      this[name] = v;
    }
  }
  cls.prototype._tranNumber = function(name,v){
    if(typeof v === 'number'){
      this[name] += v;
    }
  }
  cls.prototype._multiplyNumber = function(name,v){
    if(typeof v === 'number'){
      this[name] *= v;
    }
  }
  cls.prototype._dividedNumber = function(name,v){
    if(typeof v === 'number'){
      this[name] /= v;
    }
  }
  cls.prototype['get'+name] = function () { return this._getNumber(lowerName); };
  cls.prototype['set'+name] = function (v) { return this._setNumber(lowerName,v); };
  cls.prototype['tran'+name] = function (v) { return this._tranNumber(lowerName,v); };
}

FI_Object.BindDirtyNumberHandler = function(cls,name){
  var lowerName = FI_Object.FirstLetterLower(name)
  var dirtyName = 'is'+[name]+'Dirty'
  cls.prototype._getNumber = function(name){
    return this[name]
  }
  cls.prototype._setNumber = function(name,v){
    if(typeof v === 'number' && v !== this[name]){
      this[dirtyName] = true;
      this[name] = v;
    }
  }
  cls.prototype._tranNumber = function(name,v){
    if(typeof v === 'number' && v !== this[name]){
      this[dirtyName] = true;
      this[name] += v;
    }
  }
  cls.prototype._multiplyNumber = function(name,v){
    if(typeof v === 'number' && v !== this[name]){
      this[dirtyName] = true;
      this[name] *= v;
    }
  }
  cls.prototype._dividedNumber = function(name,v){
    if(typeof v === 'number' && v !== this[name]){
      this[dirtyName] = true;
      this[name] /= v;
    }
  }
  cls.prototype['get'+name] = function () { return this._getNumber(lowerName); };
  cls.prototype['set'+name] = function (v) { return this._setNumber(lowerName,v); };
  cls.prototype['tran'+name] = function (v) { return this._tranNumber(lowerName,v); };
  cls.prototype['_done'+name+'Dirty'] = function() { this[dirtyName] = false; }
}


FI_Object.BindBoolHandler = function(cls,name){
  var lowerName = FI_Object.FirstLetterLower(name)
  cls.prototype['get'+name] = function () { return !!this[lowerName]; };
  cls.prototype['set'+name] = function (v) { this[lowerName] = !!v };
  cls.prototype['toggle'+name] = function (v) { this[lowerName] = !v };
}

FI_Object.BindDirtyBoolHandler = function(cls,name){
  var lowerName = FI_Object.FirstLetterLower(name)
  var dirtyName = 'is'+[name]+'Dirty'
  cls.prototype['get'+name] = cls.prototype['get'+name] || function () { return !!this[lowerName]; };
  cls.prototype['set'+name] = cls.prototype['set'+name] || function (v) { this[dirtyName] = true; this[lowerName] = !!v };
  cls.prototype['toggle'+name] = cls.prototype['toggle'+name] || function (v) { this[dirtyName] = true; this[lowerName] = !v };
  cls.prototype['_done'+name+'Dirty'] = cls.prototype['_done'+name+'Dirty'] || function() { this[dirtyName] = false; }
}
