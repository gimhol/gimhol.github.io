export default class FI_Image {
  constructor(uri){
    var image = new Image()
    image.src = uri
    image.onload = ()=>{
      // this.size = { width: this.size.width || image.width, height: this.size.width || image.height };
      this.texRect = { x:0, y:0, width:image.width, height:image.height };
      this.image = image;
    }
  }
  setNode(node){
    this.node = node
  }
  draw(ctx){
    if( this.image ){
      var anchorOffset = this.node.getAnchorOffset()
      ctx.drawImage(this.image,
        this.texRect.x,
        this.texRect.y,
        this.texRect.width,
        this.texRect.height,
        -anchorOffset.x,
        -anchorOffset.y,
        this.node.size.width,
        this.node.size.height
      )
    }
  }
}
