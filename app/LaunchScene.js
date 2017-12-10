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
    this.pressUp = 0;
    this.pressDown = 0;
    this.pressRight = 0;
    this.pressLeft = 0;
    this.pressJump = 0;
    this.pressAttack = 0;
    this.pressFn = 0;

    this.playerFace = 1;
  }

  onUpdate(dt){
    var ground = 500
    if(this.pressJump == 1){
      ++this.pressJump
      this.actor2d.jump()
    }
    this.playerFace = (this.pressRight-this.pressLeft) || this.playerFace
    if(this.pressAttack == 1 && !this.shotting){
      //++this.pressAttack
      this.shotting = true
      if(this.pressFn == 1){
        this.rightShot()
      }else{
        this.leftShot()
      }
    }
    this.actor2d.walk(this.pressRight-this.pressLeft)
  }
  createBullet(angle){
    var a = new FI_Node()
    a.size = {width: 25, height: 25}
    a.position = {x: this.player.getPositionX(), y: this.player.getPositionY()}
    a.addComponent(new FI_Image('../textures/moon_1024.jpg'))

    var mover = a.addComponent( new FI_Mover() )
    var sp = 1600
    mover.tranVelocityX(Math.sin(angle)*1600)
    mover.tranVelocityY(Math.cos(angle)*1600)
    a.addAction(new FI_RotationBy(10000,10000))

    this.addChild(a)
  }
  getShotAngle(){
    var du = this.pressDown - this.pressUp
    var lr = this.pressRight - this.pressLeft
    var a = 90;
    if( lr == 1 ){
      if(du == 1){
        a -= 45
      }else if(du == -1){
        a += 45
      }
    }
    else if(lr == -1){
      a = -90
      if(du == 1){
        a += 45
      }else if(du == -1){
        a -= 45
      }
    }
    else if(du == 1){
      a = 0
    }else if(du == -1){
      a = 180
    }
    return a
  }
  rightShot(){
    var a = this.getShotAngle()
    this.createBullet((a+10)*Math.PI/180)
    this.createBullet(a*Math.PI/180)
    this.createBullet((a-10)*Math.PI/180)
    setTimeout(()=>{
      this.shotting = false
    },500)
  }
  leftShot(){
    this.count = this.count || 0
    this.count++
    var a = this.getShotAngle()
    this.createBullet(a*Math.PI/180)
    if( this.count < 3){
      setTimeout(this.leftShot.bind(this),100)
    }else{

      setTimeout(()=>{
        this.shotting = false
        this.count = 0
      },500)
    }
  }
  onAdded(){
    var svg = document.createElement('svg');

    KeyboardCenter.getInstance().addListener('keydown',(e)=>{
      switch(e.key){
        case 'w':
          if(this.pressUp < 1) this.pressUp = 1
          break;
        case 's':
          if(this.pressDown < 1) this.pressDown = 1
          break;
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
        case 'l':
          if(this.pressFn < 1) this.pressFn = 1;
          break;
      }
    })
    KeyboardCenter.getInstance().addListener('keyup',(e)=>{
      switch(e.key){
        case 'w':
          if(this.pressUp > 0) this.pressUp = 0
          break;
        case 's':
          if(this.pressDown > 0) this.pressDown = 0
          break;
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
        case 'l':
          if(this.pressFn > 0) this.pressFn = 0
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
    var image = new FI_Image('../textures/genji.jpg')
    var frame = null
    frame = new FI_Frame()
    frame.init( image,250,{ x:0, y:0, width:80, height:80 })
    animation.addFrame(frame)
    frame = new FI_Frame()
    frame.init( image,250,{ x:80, y:0, width:80, height:80 })
    animation.addFrame(frame)
    frame = new FI_Frame()
    frame.init( image,250,{ x:160, y:0, width:80, height:80 })
    animation.addFrame(frame)
    frame = new FI_Frame()
    frame.init( image,250,{ x:80, y:0, width:80, height:80 })
    animation.addFrame(frame)
    animation.setLoop(0)
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
