import FI_Component from './FI_Component'

export default class FI_RigidBody extends FI_Component{
  constructor(){
    super()
    this.velocity = {x: 0, y: 0}
  }

  getVelocity(){ return this.velocity }
  setVelocity(x,y){ this.velocity = {x,y} }
  tranVelocity(x,y){
    this.velocity.x += x
    this.velocity.y += y
  }

  getVelocityX(){ return this.velocity.x }
  setVelocityX(v){ this.velocity.x = v }
  tranVelocityX(v){ this.velocity.x += v }

  getVelocityY(){ return this.velocity.y }
  setVelocityY(v){ this.velocity.y = v }
  tranVelocityY(v){ this.velocity.y += v }

  onMount(){

  }

  update(dt){
    this.node.tranPositionX(this.velocity.x*dt/1000)
    this.node.tranPositionY(this.velocity.y*dt/1000)
  }

  draw(ctx){
  }
}
