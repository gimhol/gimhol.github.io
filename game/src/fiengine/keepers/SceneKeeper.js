import FI_Node from '../node/FI_Node'

class SceneKeeper extends FI_Node{
  static getInstance(){
    if(!this.instance){
      this.instance = new SceneKeeper()
    }
    return this.instance;
  }
  constructor(){
    super()
    this.curIndex = 0;
  }
  run(scene){
    this.curScene = scene;
    this.addChild(scene)
  }
  push(scene){

    this.children[this.curIndex].setEnable(false);
    this.children[this.curIndex].setVisible(false);

    ++this.curIndex;
    this.curScene = this.children[this.curIndex]
    this.addChild(scene)
  }
  back(){

  }
  _onUpdate(deltaTime){
    this.curScene && this.curScene._onUpdate(deltaTime)
  }
  _onRender(ctx,gl){
    this.curScene && this.curScene._onRender(ctx,gl)
  }
}
export default new SceneKeeper();
