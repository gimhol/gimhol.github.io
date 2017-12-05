import FI_Scene from '../fiengine/node/FI_Node'
import FI_Node from '../fiengine/node/FI_Node'
import FI_Image from '../fiengine/component/FI_Image'
import FI_Mover from '../fiengine/component/FI_Mover'
import FI_Touchable from '../fiengine/component/FI_Touchable'
import { FI_RotationBy } from '../fiengine/action/FI_Rotation'
import KeyboardCenter from '../fiengine/input/KeyboardCenter'
export default class LaunchScene extends FI_Scene{
  constructor(){
    super()
    this.gavity = 600;
    this.speedY = 0;
    this.pressRight = 0;
    this.pressLeft = 0;
  }
  onUpdate(dt){

    this.playerMover.tranVelocityY(this.gavity)

    this.playerMover.tranVelocityX(
      (this.pressRight-this.pressLeft)*100
    )
  }
  onAdded(){
    KeyboardCenter.getInstance().addListener('keydown',(e)=>{
      switch(e.code){
        case 'a':
          this.pressLeft = 1
          break;
        case 'd':
          this.pressRight = 1
          break;
      }
    })
    KeyboardCenter.getInstance().addListener('keyup',(e)=>{
      switch(e.code){
        case 'a':
          this.pressLeft = 0
          break;
        case 'd':
          this.pressRight = 0
          break;
      }
    })


    this.player = new FI_Node()
    this.player.size = {width: 100, height: 100}
    this.player.position = {x: 400, y: 300}
    this.player.anchor = {x:0.5, y:0}
    this.playerMover = this.player.addComponent(new FI_Mover())
    this.playerMover.setVelocityY(-600)
    this.player.addComponent(new FI_Image('../textures/moon_1024.jpg'))
    this.addChild(this.player)



    var a = new FI_Node()
    a.size = {width: 250, height: 250}
    a.position = {x: 250, y: 250}
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
