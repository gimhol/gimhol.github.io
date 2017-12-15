import FI_Image from '../component/FI_Image'
import FI_Frame from '../component/animation/FI_Frame'
import FI_Animation from '../component/animation/FI_Animation'

class AnimationCreator {
  constructor(){
    this.imagesCache = {}
  }
  getImage(imageSrc){
    if(!this.imagesCache[imageSrc]){
      this.imagesCache[imageSrc] = new FI_Image(imageSrc)
    }
    return this.imagesCache[imageSrc]
  }
  createWithData(animationData){
    var ret = new FI_Animation();
    animationData.frames.map((frameData,idx)=>{
      var frame = new FI_Frame()
      frame.init(
        this.getImage(frameData.image || animationData.image),
        frameData.duration || animationData.duration,
        frameData.rect
      )
      ret.addFrame(frame)
    })
    ret.setLoop(animationData.loop)
    return ret;
  }

}
export default new AnimationCreator()
