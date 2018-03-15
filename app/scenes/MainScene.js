import {
  FI_Scene,
  FI_Draw,
  FI_Node,
  FI_Touchable,
} from '../../fiengine/Root'

export default class MainScene extends FI_Scene{
  constructor(){
    super()
  }
  onAdded(){

    var padWidth = 600;
    var padHeight = 600;
    var dotCount = 500;

    this.pad0 = new FI_Node()
    this.pad0.setAnchorX(0)
    this.pad0.setAnchorY(0)
    this.pad0.setPositionX(50)
    this.pad0.setPositionY(50)
    this.pad0.setWidth(padWidth)
    this.pad0.setHeight(padHeight)

    this.pad1 = new FI_Node();
    this.pad1.setAnchorX(0)
    this.pad1.setAnchorY(0)
    this.pad1.setPositionX(padWidth+100)
    this.pad1.setPositionY(50)
    this.pad1.setWidth(padWidth)
    this.pad1.setHeight(padHeight)

    this.randomDots = [];

    var touchable0 = this.pad0.addComponent(new FI_Touchable())
    var touchable1 = this.pad1.addComponent(new FI_Touchable())

    touchable0.onMouseDown = (e)=>{
      var d1 = new Date().getTime()
      console.log(d1)

      var near = 0;
      var lmh = Math.abs(this.randomDots[0].x - e.x) + Math.abs(this.randomDots[0].y - e.y)
      for(var i = 1; i < this.randomDots.length; ++i){
        var mh = Math.abs(this.randomDots[i].x - e.x) + Math.abs(this.randomDots[i].y - e.y)
        if(mh < lmh){
          near = i;
          lmh = mh;
        }
        this.randomDots[i].fillStyle = 'white'
        this.randomDots[i].r = 2
      }
      this.randomDots[near].fillStyle = 'blue'
      this.randomDots[near].r = 5

      var d2 = new Date().getTime()
      console.log(d2)
    }

    var draw0 = this.pad0.addComponent(new FI_Draw())
    var draw1 = this.pad1.addComponent(new FI_Draw())
    var borderConfig = {
      type: 'rect', stroke: true, strokeStyle:'blue',
      x: 0, y: 0, w: padWidth, h: padHeight
    }
    draw0.add(borderConfig)
    var borderConfig2 = Object.assign({},borderConfig,{strokeStyle:'red'});
    draw1.add(borderConfig2)
    for(var i = 0; i<dotCount; ++i){
      var config = {
        type: 'circle',
        fillStyle: 'white',
        strokeStyle: 'orange',
        stroke: true,
        fill: true,
        x: Math.random()*padWidth,
        y: Math.random()*padHeight,
        r:2,
      }
      this.randomDots.push(config)
      draw0.add(config)

      var config2 = Object.assign({},config)
      draw1.add(config2)

    }
    this.draw0 = draw0
    this.draw1 = draw1
    this.addChild(this.pad0);
    this.addChild(this.pad1);
  }

  onUpdate(){

  }
}
