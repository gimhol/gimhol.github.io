import FI_Image from '../2d/component/FI_Image'
import FI_Frame from '../2d/component/animation/FI_Frame'
import FI_Animation from '../2d/component/animation/FI_Animation'

import ImageKeeper from '../keepers/ImageKeeper'
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

  async createWithData(animationData){

    var animation = new FI_Animation();

    for(var i=0; i<animationData.frames.length; ++i){
      var frameData = animationData.frames[i];
      var frame = animation.addChild( new FI_Frame() );

      try{
        var image = await ImageKeeper.getImage(frameData.image || animationData.image);
        frame.init( image, frameData.duration || animationData.duration, frameData.rect );
      }
      catch(err){
        console.warn(err)
      }
    }
    animation.setLoop(animationData.loop)

    return animation;
  }

}
export default new AnimationCreator()
