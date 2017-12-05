import FI_Scene from '../fiengine/node/FI_Node'
import FI_Node from '../fiengine/node/FI_Node'
import FI_Image from '../fiengine/component/FI_Image'
import FI_Touchable from '../fiengine/component/FI_Touchable'
import { FI_RotationBy } from '../fiengine/action/FI_Rotation'

export default class LaunchScene extends FI_Scene{
  onUpdate(dt){

  }
  onAdded(){
    var a = new FI_Node()
    a.size = {width: 250, height: 250}
    a.position = {x: 250, y: 250}
    a.scale = {x:0.5, y:0.5}
    //a.rotation = 3
    a.addComponent(new FI_Image('../textures/moon_1024.jpg'))

    this.addChild(a)

    var a = new FI_Node()
    a.size = {width: 250, height: 250}
    a.position = {x: 0, y: 250}
    a.scale = {x:0.5,y:0.5}
    //a.rotation = 3
    a.addComponent(new FI_Image('../textures/moon_1024.jpg'))
    a.addAction(new FI_RotationBy(180,2500))
    a.addComponent(new FI_Touchable())
    this.addChild(a)
  }
  onRemoved(){

  }
}
