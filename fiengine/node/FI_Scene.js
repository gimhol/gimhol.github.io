import FI_Node from './FI_Node'
import SceneKeeper from '../keepers/SceneKeeper'
import Engine from '../Engine'
export default class FI_Scene extends FI_Node{
  constructor(){
    super()
    var size = Engine.getInstance().getSize()
    this.setWidth(size.width)
    this.setHeight(size.height)
  }
  goto(sceneCls){
    SceneKeeper.getInstance().push(new sceneCls())
  }
}
