
var TextureLoader = function(){
  var _this = this;
  this.textures = {}
  this.listeners = []
  this.urlsBases = [
    '',
    'https://gimhol.github.io/',
  ];
  function addLoadEventListener(listener){
    _this.listeners.push(listener)
  };
  function removeLoadEventListener(listener){
    for(var i=0; i<_this.listeners.length;++i){
      if(_this.listeners[i] === listener){
        _this.listeners.splice(i,1)
        return;
      }
    }
  };
  function onLoadSuccess(name,url,texture){
    console.log(texture)
    _this.textures[name] = texture
    _this.listeners.map(function(listener,dx){
      typeof listener.onLoadSuccess === 'function' && listener.onLoadSuccess(name,url,texture)
    })
  };
  function onLoadProgressing(name,url,progress){
    console.log( progress.loaded + '/' + progress.total)
  };
  function onLoadFail(name,url,err){
    console.log(err)
  };
  function load(name,url,count){
    if(!count || count < 0)
      count = 0
    if(count < _this.urlsBases.length){
        imgUrl = _this.urlsBases[count] + url
    }
    var loader = new THREE.TextureLoader();
    loader.load(
      imgUrl,
      function(texture){ _this.onLoadSuccess(name,url,texture) },
      function(progress){ _this.onLoadProgressing(name,url,progress) },
      function (err){
        if(count < _this.urlsBases.length - 1){
          _this.load(name,url,count+1)
        }else{
          _this.onLoadFail(name,err)
        }
      }
    );
  }
  this.onLoadSuccess = onLoadSuccess;
  this.onLoadProgressing = onLoadProgressing;
  this.onLoadFail = onLoadFail;
  this.addLoadEventListener = addLoadEventListener;
  this.removeLoadEventListener = removeLoadEventListener;
  this.load = load;
}
