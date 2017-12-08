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
    this.pressJump = 0;
    this.pressAttack = 0;
  }

  onUpdate(dt){
    var ground = 500
    if(this.pressJump == 1){
      ++this.pressJump
      this.actor2d.jump()
    }
    if(this.pressAttack == 1 && !this.shotting){
      ++this.pressAttack
      this.shotting = true
      this.createBullet()
    }
    this.actor2d.walk(this.pressRight-this.pressLeft)
  }
  createBullet(){

    this.count = this.count || 0
    this.count++
    var a = new FI_Node()
    a.size = {width: 50, height: 50}
    a.position = {x: this.player.getPositionX(), y: this.player.getPositionY()}
    a.addComponent(new FI_Image('../textures/moon_1024.jpg'))

    var mover = a.addComponent( new FI_Mover() )
    mover.tranVelocityX(1600)
    a.addAction(new FI_RotationBy(10000,10000))

    this.addChild(a)

    console.log(this.count)
    if( this.count < 3){
      setTimeout(this.createBullet.bind(this),125)
    }else{
      this.shotting = false
      this.count = 0
    }
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
        case 'j':
          if(this.pressAttack < 1) this.pressAttack = 1;
          break;
        case 'k':
          if(this.pressJump < 1) this.pressJump = 1;
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
        case 'j':
          if(this.pressAttack > 0) this.pressAttack = 0;
          break;
        case 'k':
          if(this.pressJump > 0) this.pressJump = 0
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
    a.position = {x: 50, y: 50}
    a.addComponent(new FI_Image('../textures/moon_1024.jpg'))
    a.setRotation(45)
    var t = a.addComponent(new FI_Touchable())
    t.setOnClickFunc(()=>{
      console.log('weapon')
    })
    this.player.addChild(a)
  }
  onRemoved(){

  }
}
