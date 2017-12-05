import FI_Node from '../node/FI_Node'

export default class SceneKeeper extends FI_Node{
  static getInstance(){
    if(!this.instance){
      this.instance = new SceneKeeper()
    }
    return this.instance;
  }
  run(scene){
    this.addChild(scene)
  }
}
