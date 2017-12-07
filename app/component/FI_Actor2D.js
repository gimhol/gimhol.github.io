import FI_Component from '../../fiengine/component/FI_Component'
export default class FI_Actor2D extends FI_Component {
  constructor(){
    super();
    this.jumpable = false;
    this.walkDirection = 0;
    this.jumpSpeed = 0;
    this.walkSpeed = 0;
    this.walkAcc = 0;
    this.gavity = 0;
    this.ground = 0;
  }
  jump(){
    this.jumpable && this.mover.setVelocityY(this.jumpSpeed)
  }
  walk(direction){
    this.walkDirection = direction? direction/Math.abs(direction): 0
  }
  setJumpSpeed(v){ this.jumpSpeed = v }
  setWalkSpeed(v){ this.walkSpeed = Math.abs(v) }
  setWalkAcc(v){ this.walkAcc = Math.abs(v) }
  setGavity(v){ this.gavity = v }
  setGround(v){ this.ground = v }
  setMover(c){
    this.mover = c;
  }
  onMount(){
    this.mover && this.mover.setNode(this.getNode())
  }
  update(dt){
    if(!this.mover){
      return
    }
    this.mover.update(dt)
    var curY = this.node.getPositionY()
    var curVY = 0
    if( curY < this.ground){

      curVY = this.mover.tranVelocityY(this.gavity)*dt/1000
      this.jumpable = false
    }
    if( curY + curVY > this.ground){
      this.node.setPositionY(this.ground)
      this.mover.setVelocityY(0)
      this.jumpable = true
    }


    var diff = this.walkDirection;
    var maxVX = this.walkSpeed;
    var accX = this.walkAcc;
    if(maxVX && accX){
      if(diff){
        var vx = this.mover.getVelocityX()
        this.mover.tranVelocityX( diff*( accX - Math.abs(vx*accX/maxVX) ) );
        if(diff > 0 && vx < 0 || diff < 0 && vx > 0){
          this.mover.decayVelocityX( accX )
        }
      }else{
        this.mover.decayVelocityX( accX )
      }
    }
  }
}
