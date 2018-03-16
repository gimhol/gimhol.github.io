import FI_Component from './FI_Component'
import imageKeeper from '../keepers/ImageKeeper'

export default class FI_Draw extends FI_Component{
  constructor(){
    super()
    this.items = []
    this.isDirty = true;
  }
  add(arr){
    this.items.push(arr)
    return arr;
  }
  remove(arr){
    for(var i=0;i<this.items.length;++i){
      if(this.items[i]===arr){
        this.items.splice(i,1);
        break;
      }
    }
  }
  onMount(){
  }
  _draw(ctx){
    // if(!this.isDirty){
    //   return
    // }
    this.isDirty = false
    var anchorOffset = this.node.getAnchorOffset()
    this.items.map((itemData)=>{
      var { fill, stroke, fillStyle, strokeStyle, width, close, style, type} = itemData
      ctx.fillStyle = fillStyle || 'transparent'
      ctx.strokeStyle = strokeStyle || 'gray';
      ctx.lineWidth = width || 1;
      ctx.beginPath();
      switch(type){
        case 'lines':
          var { points } = itemData;
          points.map((pointData,idx)=>{
            idx === 0 ?
              ctx.moveTo(pointData.x - anchorOffset.x,pointData.y - anchorOffset.y):
              ctx.lineTo(pointData.x - anchorOffset.x,pointData.y - anchorOffset.y)
          })
          break;
        case 'rect':
          var { x,y,w,h } = itemData;
          ctx.rect(x - anchorOffset.x,y - anchorOffset.y,w,h)
          break;
        case 'circle':
          var { x, y, r } = itemData;
          ctx.arc(x - anchorOffset.x, y - anchorOffset.y, r, 0, 2*Math.PI);
          break;
      }
      stroke && ctx.stroke();
      fill && ctx.fill();
      close && ctx.closePath();
    })
  }
}
