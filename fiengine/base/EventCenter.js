import SingletonCls from './SingletonCls'
class Listener {
  constructor(name,func,priority){
    this.name = name;
    this.func = func;
    this.priority = priority;
  }
  removeSelf(){
  }
}
export default class EventCenter extends SingletonCls{
  constructor(){
    super()
    this.listeners = {}
  }
  dispatch(eventName,data){
    var arr = this.getListeners(eventName)
    for(var i in arr){
      if(arr[i].func(data)){
        break;
      }
    }
  }
  getListeners(eventName){
    return this.listeners[eventName]
  }
  addListener(eventName, func, priority){
    var listenerArr = this.listeners[eventName] || []
    if( !listenerArr ){
      return;
    }
    var listener = new Listener(eventName,func,priority);
    listenerArr.push(listener)
    listenerArr.sort((a,b)=>(b.priority-a.priority))
    this.listeners[eventName] = listenerArr
    return listener
  }
}
