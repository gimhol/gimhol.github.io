import FI_Scene from '../fiengine/node/FI_Node'
import FI_Node from '../fiengine/node/FI_Node'
import FI_Image from '../fiengine/component/FI_Image'
import FI_Mover from '../fiengine/component/FI_Mover'
import FI_Touchable from '../fiengine/component/FI_Touchable'
import { FI_RotationBy } from '../fiengine/action/FI_Rotation'
import KeyboardCenter from '../fiengine/input/KeyboardCenter'

import FI_Frame from '../fiengine/component/animation/FI_Frame'
import FI_Animation from '../fiengine/component/animation/FI_Animation'
export default class LaunchScene extends FI_Scene{
  constructor(){
    super()
    this.gavity = 60;
    this.speedY = 0;
    this.pressRight = 0;
    this.pressLeft = 0;
  }

  onUpdate(dt){
    var ground = 500
    if(this.pressUp == 1){
      ++this.pressUp
      this.playerMover.setVelocityY(-1000)
    }
    var curY = this.player.getPositionY()
    var curVY = 0
    if( curY < ground){
      curVY = this.playerMover.tranVelocityY(this.gavity)
    }
    if( curY+curVY > ground){
      this.player.setPositionY(ground)
      this.playerMover.setVelocityY(0)
    }
    var maxVX = 500;
    var accX = 100;
    var diff = this.pressRight - this.pressLeft
    if(diff){
      var vx = this.playerMover.getVelocityX()
      this.playerMover.tranVelocityX( diff*( accX - Math.abs(vx*accX/maxVX) ) );
      if(diff > 0 && vx < 0 || diff < 0 && vx > 0){
        this.playerMover.decayVelocityX( accX )
      }
    }else{
      this.playerMover.decayVelocityX( accX )
    }
  }

  onAdded(){
    KeyboardCenter.getInstance().addListener('keydown',(e)=>{
      switch(e.code){
        case 'KeyA':
          if(this.pressLeft < 1) this.pressLeft = 1
          break;
        case 'KeyD':
          if(this.pressRight < 1) this.pressRight = 1
          break;
        case 'KeyW':
          if(this.pressUp < 1) this.pressUp = 1;
          break;
      }
    })
    KeyboardCenter.getInstance().addListener('keyup',(e)=>{
      switch(e.code){
        case 'KeyA':
          this.pressLeft = 0
          break;
        case 'KeyD':
          this.pressRight = 0
          break;
        case 'KeyW':
          this.pressUp = 0;
          break;
      }
    })


    this.player = new FI_Node()
    this.player.size = {width: 100, height: 100}
    this.player.position = {x: 400, y: 300}
    this.player.anchor = {x:0.5, y:0}
    this.playerMover = this.player.addComponent(new FI_Mover())

    var animation = new FI_Animation()
    var image = new FI_Image('../textures/moon_1024.jpg')
    var frame = null
    for(var i=0;i<100;++i){
      frame = new FI_Frame()
      frame.init( image,10,{ x:i, y:0, width:10, height:10 })
      animation.addFrame(frame)
    }
    animation.setLoop(10)
    animation.play()

    this.player.addComponent(animation)
    this.addChild(this.player)



    // var a = new FI_Node()
    // a.size = {width: 250, height: 250}
    // a.position = {x: 250, y: 250}
    // a.scale = {x:0.5,y:0.5}
    // //a.rotation = 3
    // a.addComponent(new FI_Image('../textures/moon_1024.jpg'))
    // a.addAction(new FI_RotationBy(180,2500))
    // a.addComponent(new FI_Touchable())
    // this.addChild(a)
  }
  onRemoved(){

  }
}
