class SingletonCls {
  static getInstance(){
    if(!this._instance){
      this._instance = new this();
    }
    return this._instance;
  }
  static deleteInstance(){
    delete this._instance;
  }
}
export default SingletonCls;
