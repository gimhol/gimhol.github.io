import FI_Node from '../node/FI_Node'

export default class SceneKeeper extends FI_Node{
  static getInstance(){
    if(!this.instance){
      this.instance = new SceneKeeper()
    }
    return this.instance;
  }
  constructor(){
    super()
    this.curIndex = 0;
    this.enable = true;
  }
  run(scene){
    this.addChild(scene)
  }
  push(scene){
    // this.children[this.curIndex].invisible = 0;
    this.children[this.curIndex].setEnable(false);
    this.children[this.curIndex].setVisible(false);
    ++this.curIndex;
    this.addChild(scene)
  }
  back(){

  }
}
