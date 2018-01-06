import FI_Scene from '../fiengine/node/FI_Scene'
import FI_Node from '../fiengine/node/FI_Node'
import FI_Image from '../fiengine/component/FI_Image'
import FI_Mover from '../fiengine/component/FI_Mover'
import FI_Touchable from '../fiengine/component/FI_Touchable'
import { FI_RotationBy } from '../fiengine/action/FI_Rotation'
import KeyboardCenter from '../fiengine/input/KeyboardCenter'

import FI_Frame from '../fiengine/component/animation/FI_Frame'
import FI_Animation from '../fiengine/component/animation/FI_Animation'
import FI_InputResponser from '../fiengine/component/FI_InputResponser'

import FI_Actor2D from './component/FI_Actor2D'
import AnimationCreator from '../fiengine/helper/AnimationCreator'
import FI_Text from '../fiengine/component/FI_Text'
import MainScene from './scenes/MainScene'
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
    this.ud = 0
    this.lr = 0
    this.playerFace = 1;
  }

  onUpdate(dt){
    var ground = 500
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
    var du = this.ud
    var lr = this.lr
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
    var animation = AnimationCreator.createWithData({
      name: 'genji_standing',
      loop: 0,
      duration: 250,
      image: '../textures/genji.jpg',
      frames: [
        { rect: { x:0, y:0, width:80, height:80 } },
        { rect: { x:80, y:0, width:80, height:80 } },
        { rect: { x:160, y:0, width:80, height:80 } },
        { rect: { x:80, y:0, width:80, height:80 } }
      ]
    })
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
    this.player.addComponent(new FI_Text())
    var inputResponser = this.addComponent(new FI_InputResponser())
    inputResponser.onKeyPress('k', ()=>this.actor2d.jump())
    inputResponser.onDirectionKeepPress('w','s',(direction,dt)=>{
      direction /= (direction?Math.abs(direction):1)
      this.ud = direction;
    })
    inputResponser.onDirectionKeepPress('a','d',(direction,dt)=>{
      direction /= (direction?Math.abs(direction):1)
      this.lr = direction
      this.playerFace = direction
      this.actor2d.walk(direction)
    })
    inputResponser.onKeyPress('l', ()=>{this.pressFn=1})
    inputResponser.onKeyRelease('l', ()=>{this.pressFn=1})
    inputResponser.onKeyKeepPress('j',()=>{
      if(!this.shotting){
        this.shotting = true
        if(this.pressFn == 1)
          this.rightShot()
        else
          this.leftShot()
      }
    })
    //this.goto(MainScene)
  }
  onRemoved(){

  }
}
