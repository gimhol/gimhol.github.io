class Listener {
  constructor(name){
    this.name = name;
  }
  removeSelf(){

  }
}
export default class KeyboardCenter {
  static getInstance(){
    if(!this.instance){
      this.instance = new KeyboardCenter();
    }
    return this.instance;
  }
  constructor(){
    this.listeners = {
      keydown: [],
      keyup: []
    }
  }
  launch(){
    document.addEventListener('keydown', this.onKeyDown.bind(this), false );
    document.addEventListener('keyup', this.onKeyUp.bind(this), false);
  }
  onKeyDown(e){
    var listenerArr = this.listeners['keydown']
    for(var i in listenerArr){
      listenerArr[i].func(e)
    }
  }
  onKeyUp(e){
    var listenerArr = this.listeners['keyup']
    for(var i in listenerArr){
      listenerArr[i].func(e)
    }
  }
  addListener(eventName, func){
    var listenerArr = this.listeners[eventName]
    if( !listenerArr ){
      return;
    }
    var listener = new Listener(eventName);
    listener.func = func;
    listenerArr.push(listener)
    return listener
  }
}
