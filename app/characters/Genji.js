import FI_Node from '../../fiengine/node/FI_Node'
import FI_Actor2D from '../component/FI_Actor2D'
import FI_Rect from '../../fiengine/math/Rect'
import FI_Mover from '../../fiengine/component/FI_Mover'
import FI_Animator from '../../fiengine/component/animation/FI_Animator'

import AnimationCreator from '../../fiengine/helper/AnimationCreator'

export default class Genji extends FI_Node{
  constructor(){
    super()
    this.gavity = 60

    this.size.width = 100
    this.size.height = 100
    this.position.x = 400
    this.position.y = 300
    this.anchor.x = 0.5
    this.anchor.y = 0

    var actor2d = new FI_Actor2D();
    actor2d.setMover( new FI_Mover() )
    actor2d.setRect( new FI_Rect(0,0,100,100))
    actor2d.setGavity(this.gavity)
    actor2d.setGround(500)
    actor2d.setJumpSpeed(-1000)
    actor2d.setWalkSpeed(500)
    actor2d.setWalkAcc(50)
    this.actor2d = this.addComponent(actor2d)

    this.animator = this.addComponent(new FI_Animator())
    this.animator.addAnimationWithData({
      name: 'genji_standing',
      loop: 0,
      duration: 120,
      image: '../textures/template.png',
      frames: [
        { rect: { x:0, y:0, width:79, height:79 } },
        { rect: { x:80, y:0, width:79, height:79 } },
        { rect: { x:160, y:0, width:79, height:79 } },
        { rect: { x:240, y:0, width:79, height:79 } }
      ]
    })
    this.animator.addAnimationWithData({
      name: 'genji_walking',
      loop: 0,
      duration: 60,
      image: '../textures/template.png',
      frames: [
        { rect: { x:0, y:160, width:79, height:79 } },
        { rect: { x:80, y:160, width:79, height:79 } },
        { rect: { x:160, y:160, width:79, height:79 } },
        { rect: { x:80, y:160, width:79, height:79 } }
      ]
    })
    this.animator.playAnaimtion('genji_standing')
  }

  jump(){
    this.actor2d.jump()
  }
  walk(direction){
    if(direction){
      this.animator.playAnaimtion('genji_walking')
      this.animator.flap.x = direction
    }
    else{
      this.animator.playAnaimtion('genji_standing')
    }
    this.actor2d.walk(direction)
  }
}
