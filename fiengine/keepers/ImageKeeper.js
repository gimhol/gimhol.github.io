import * as Utils from '../utils'
class ImageKeeper {
  constructor(){
    this.images = {}
  }
  firstLoadImage(uri){
    return new Promise((resolve,reject)=>{
      var image = new Image()
      image.src = uri
      image.onload = ()=>{
        for(var i in this.images[uri]){
          this.images[uri][i].onload(image)
        }
        this.images[uri] = image
        return resolve(image)
      }
      image.onerror = (err)=>{
        for(var i in this.images[uri]){
          this.images[uri][i].onerror(err)
        }
        delete this.images[uri];
        return reject(err)
      }
    })
  }
  loadImage(uri){
    return new Promise((resolve,reject)=>{
      this.images[uri].push({
        onload:resolve,
        onerror:reject,
      })
    })
  }
  getImage(uri){
    var image = this.images[uri]
    //not exist
    if( !image ){
      this.images[uri] = []
      return this.firstLoadImage(uri)
    }
    //loading.
    else if( Utils.isArray(image) ){
      return this.loadImage(uri)
    }
    //already loaded.
    else {
      return Promise.resolve(image)
    }
  }
}
export default new ImageKeeper();
