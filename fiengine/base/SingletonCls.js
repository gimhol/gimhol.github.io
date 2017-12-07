export default class SingletonCls {
  static getInstance(){
    if(!this.instance){
      this.instance = new this();
    }
    return this.instance;
  }
  static deleteInstance(){
    delete this.instance;
  }
}
