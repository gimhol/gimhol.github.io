import FI_Component from './FI_Component'
import imageKeeper from '../keepers/ImageKeeper'

export default class FI_Draw extends FI_Component{
  constructor(){
    super()
    this.items = []
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
  draw(ctx){
    this.items.map((itemData)=>{
      var { color, width, close, style, type} = itemData

      style = style||'stroke'

      if(color) ctx[style+'Style'] = color;
      if(width) ctx.lineWidth = width;

      switch(type){
        case 'lines':
          ctx.beginPath();
          var { points } = itemData;
          points.map((pointData,idx)=>{
            idx === 0 ?
              ctx.moveTo(pointData.x,pointData.y):
              ctx.lineTo(pointData.x,pointData.y)
          })
          close && ctx.closePath();
          ctx[style]();
          break;
        case 'rect':
          var { x,y,w,h } = itemData;
          ctx[style+'Rect'](x,y,w,h)
          break;
      }

    })
  }
}
