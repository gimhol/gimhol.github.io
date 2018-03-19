import FI_Node2D from './FI_Node2D'
import SceneKeeper from '../keepers/SceneKeeper'
import Engine from '../Engine'
export default class FI_Scene extends FI_Node2D{
  constructor(){
    super()
    var size = Engine.getInstance().getSize()
    this.setWidth(size.width)
    this.setHeight(size.height)
  }
  goto(sceneCls){
    SceneKeeper.push(new sceneCls())
  }
}
