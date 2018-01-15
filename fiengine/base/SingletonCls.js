export default class SingletonCls {
  static getInstance(){
    if(!SingletonCls._instance){
      SingletonCls._instance = new SingletonCls();
    }
    return SingletonCls._instance;
  }
  static deleteInstance(){
    delete SingletonCls._instance;
  }
}
