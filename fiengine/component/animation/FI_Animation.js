import FI_Component from '../FI_Component'

export default class FI_Animation extends FI_Component{
  constructor(){
    super()
    this.frames = []
    this.curIndex = 0
    this.curTime = 0
    this.isAutoReset = true
    this.loop = 0
    this.curLoop = 0
  }
  addFrame(frame){
    this.frames.push(frame)
    if( this.hasMounted() ){
      frame.setNode(this.getNode())
    }
  }
  onMount(){
    this.frames.map((frame)=>{
      frame.setNode(this.getNode())
    })
  }
  play(){ this.playing = true }
  stop(){ this.playing = false }
  setAutoReset(v){ this.isAutoReset = v }
  setLoop(v){ this.loop = v }

  onLoopFinish(){}
  onFinish(){}

  update(dt){
    if(this.playing){
      var curFrame = this.frames[this.curIndex]
      if( curFrame ){
        this.curTime += dt;
        curFrame.update(dt)
        var diff = this.curTime - curFrame.getDuration()

        this.curIndex = this.curIndex+1
        if( this.curIndex >= this.frames.length){
          if(this.loop == 0 ){
            this.curIndex = 0
          }
          else if(this.curLoop >= this.loop){
            this.curLoop += 1
            this.curIndex = 0
          }else{
            this.curIndex = this.frames.length - 1
            this.stop()
          }
        }
      }
    }
  }
  draw(ctx){
    var curFrame = this.frames[this.curIndex]
    if( curFrame ){
      curFrame.draw(ctx);
    }
  }
}
