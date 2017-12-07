import FI_Scene from '../fiengine/node/FI_Node'
import FI_Node from '../fiengine/node/FI_Node'
import FI_Image from '../fiengine/component/FI_Image'
import FI_Mover from '../fiengine/component/FI_Mover'
import FI_Touchable from '../fiengine/component/FI_Touchable'
import { FI_RotationBy } from '../fiengine/action/FI_Rotation'
import KeyboardCenter from '../fiengine/input/KeyboardCenter'

import FI_Frame from '../fiengine/component/animation/FI_Frame'
import FI_Animation from '../fiengine/component/animation/FI_Animation'

import FI_Actor2D from './component/FI_Actor2D'
export default class LaunchScene extends FI_Scene{
  constructor(){
    super()
    this.gavity = 60;
    this.speedY = 0;
    this.pressRight = 0;
    this.pressLeft = 0;
    this.pressUp = 0;
  }

  onUpdate(dt){
    var ground = 500
    if(this.pressUp == 1){
      ++this.pressUp
      this.actor2d.jump()
    }
    this.actor2d.walk(this.pressRight-this.pressLeft)
  }

  onAdded(){
    var svg = document.createElement('svg');

    KeyboardCenter.getInstance().addListener('keydown',(e)=>{
      switch(e.key){
        case 'a':
          if(this.pressLeft < 1) this.pressLeft = 1
          break;
        case 'd':
          if(this.pressRight < 1) this.pressRight = 1
          break;
        case 'w':
          if(this.pressUp < 1) this.pressUp = 1;
          break;
      }
    })
    KeyboardCenter.getInstance().addListener('keyup',(e)=>{
      switch(e.key){
        case 'a':
          if(this.pressLeft > 0) this.pressLeft = 0
          break;
        case 'd':
          if(this.pressRight > 0) this.pressRight = 0
          break;
        case 'w':
          if(this.pressUp > 0) this.pressUp = 0
          break;
      }
    })


    this.player = new FI_Node()
    this.player.size = {width: 100, height: 100}
    this.player.position = {x: 400, y: 300}
    this.player.anchor = {x:0.5, y:0}

    var actor2d = new FI_Actor2D();
    actor2d.setMover( new FI_Mover() )
    actor2d.setGavity(this.gavity)
    actor2d.setGround(500)
    actor2d.setJumpSpeed(-1000)

    actor2d.setWalkSpeed(500)
    actor2d.setWalkAcc(50)

    this.actor2d = this.player.addComponent(actor2d)

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

    this.addChild(this.player)
    
    this.player.addComponent(animation)
    var t = this.player.addComponent(new FI_Touchable())
    t.setOnClickFunc(()=>{
      console.log('player')
    })







    var a = new FI_Node()
    a.size = {width: 50, height: 50}
    a.position = {x: 50, y: 30}
    a.addComponent(new FI_Image('../textures/moon_1024.jpg'))
    var t = a.addComponent(new FI_Touchable())
    t.setOnClickFunc(()=>{
      console.log('weapon')
    })
    this.player.addChild(a)
  }
  onRemoved(){

  }
}
