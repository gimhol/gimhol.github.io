import { FI_RotationBy } from '../../fiengine/action/FI_Rotation'
import KeyboardCenter from '../../fiengine/input/KeyboardCenter'

import AnimationCreator from '../../fiengine/helper/AnimationCreator'
import FI_Actor2D from '../component/FI_Actor2D'
import Button from '../ui/Button'
import Genji from '../characters/Genji'
import MainScene from './MainScene'

import {
  FI_SceneKeeper,
  FI_Scene,
  FI_Node2D,
  FI_Image,
  FI_Mover,
  FI_Touchable,
  FI_Text,
  FI_Draw,

  FI_Animation,
  FI_Frame,
  FI_Rect,
  FI_Vector2D,
  FI_InputResponser
} from '../../fiengine/Root'

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
  }

  onUpdate(dt){
    var ground = 500
  }
  createBullet(angle){
    var a = new FI_Node2D()
    a.setSizeWH(25,25)
    a.setPosition(this.genji.getPosition());
    a.addComponent(new FI_Image('./res/textures/moon_1024.jpg'))

    var mover = a.addComponent( new FI_Mover() )
    var sp = 1600
    mover.tranVelocityX(Math.sin(angle)*1600)
    mover.tranVelocityY(Math.cos(angle)*1600)
    a.addAction(new FI_RotationBy(10000,10000))
    console.log(a)
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
    this.stage2D = new FI_Node2D()
    var draw = this.stage2D.addComponent(new FI_Draw())
    var r1 = new FI_Rect(0,600,1000,100)
    var r2 = new FI_Rect(10,610,900,50)
    var r3 = r1.intersectWith(r2)
    draw.add({
      type: 'lines',
      color: '#FF0000',
      stroke: true,
      fill: true,
      width: 1,
      points:[
        new FI_Vector2D(0,0),
        new FI_Vector2D(100,100),
        new FI_Vector2D(100,0)
      ],
    })
    draw.add({
      color: '#FF0000',
      stroke: true,
      fill: true,
      type: 'rect',
      x:r1.x,y:r1.y,w:r1.w,h:r1.h
    })
    draw.add({
      color: '#FF0000',
      stroke: true,
      fill: true,
      type: 'rect',
      x:r2.x,y:r2.y,w:r2.w,h:r2.h
    })
    r3 && draw.add({
      color: '#00FF00',
      stroke: true,
      fill: true,
      type: 'rect',
      x:r3.x,y:r3.y,w:r3.w,h:r3.h
    })

    this.addChild(this.stage2D)
    this.genji = this.addChild(new Genji())

    this.buttonLayer = new FI_Node2D();
    this.buttonLayer.setPositionXY(300,0);

    var button = new Button('Sprite & Action');
    button.setPositionXY(400,300);
    this.buttonLayer.addChild(button);

    var button = new Button('Button');
    button.setPositionXY(400,350);
    button.onMouseUp = ()=>{
      this.inner2D.setScaleXY( this.inner2D.getScaleX()*0.8,1)
      //FI_SceneKeeper.getInstance().push(new MainScene());
    }
    this.buttonLayer.addChild(button);

    this.addChild(this.buttonLayer)

    var inputResponser = this.addComponent(new FI_InputResponser())
    inputResponser.onKeyPress('k', ()=>this.genji.jump())
    inputResponser.onDirectionKeepPress('w','s',(direction,dt)=>{
      direction /= (direction?Math.abs(direction):1)
      this.ud = direction;
    })
    inputResponser.onDirectionKeepPress('a','d',(direction,dt)=>{
      direction /= (direction?Math.abs(direction):1)
      if( !this.genji.isRunning ){
        this.lr = direction

        this.genji.walk(direction)
      }else if(this.lr == -1*direction){
        this.lr = direction

        this.genji.stopRunning()
      }
    })

    inputResponser.onKeyDoubleClick('a',()=>{
      !this.genji.isRunning && this.genji.run(-1)
    })
    inputResponser.onKeyDoubleClick('d',()=>{
      !this.genji.isRunning && this.genji.run(1)
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

  }
  onRemoved(){

  }
}
