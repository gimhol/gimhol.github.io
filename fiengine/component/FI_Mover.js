import FI_Component from './FI_Component'

export default class FI_Mover extends FI_Component{
  constructor(){
    super()
    this.velocity = {x: 0, y: 0}
  }

  getVelocity(){ return this.velocity }
  setVelocity(x,y){ this.velocity = {x,y} }
  tranVelocity(x,y){
    this.velocity.x += x
    this.velocity.y += y
    return this.velocity;
  }

  getVelocityX(){ return this.velocity.x }
  setVelocityX(v){ this.velocity.x = v; return this.velocity.x }
  tranVelocityX(v){ this.velocity.x += v; return this.velocity.x }
  decayVelocityX(v){
    if(this.velocity.x > 0){
      this.velocity.x -= Math.abs(v)
      this.velocity.x = Math.max(0, this.velocity.x)
    }
    else if(this.velocity.x < 0){
      this.velocity.x += Math.abs(v)
      this.velocity.x = Math.min(0, this.velocity.x)
    }
  }

  getVelocityY(){ return this.velocity.y }
  setVelocityY(v){ this.velocity.y = v; return this.velocity.y }
  tranVelocityY(v){ this.velocity.y += v; return this.velocity.y  }
  decayVelocityY(v){
    if(this.velocity.y > 0){
      this.velocity.y -= Math.abs(v)
      this.velocity.y = Math.max(0, this.velocity.y)
    }
    else if(this.velocity.y < 0){
      this.velocity.y += Math.abs(v)
      this.velocity.y = Math.min(0, this.velocity.y)
    }
  }

  onMount(){

  }

  update(dt){
    this.node.tranPositionX(this.velocity.x*dt/1000)
    this.node.tranPositionY(this.velocity.y*dt/1000)
  }

  draw(ctx){
  }
}
