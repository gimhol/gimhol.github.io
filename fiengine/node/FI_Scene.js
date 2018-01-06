import FI_Node from './FI_Node'
import SceneKeeper from '../keepers/SceneKeeper'
export default class FI_Scene extends FI_Node{
  goto(sceneCls){
    SceneKeeper.getInstance().push(new sceneCls())
  }
}
