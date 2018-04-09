import {
  FI_Node2D,
  FI_Text,
  FI_Touchable,
} from '../../fiengine/Root'

import { FI_ScaleTo } from '../../fiengine/action/FI_Scale'



export default class Button extends FI_Node2D{
  constructor(textContent){
    super()
    this.textContent = textContent
  }
  onAdded(){
    var inner = this.addChild(new FI_Node2D())
    var textNode = inner.addChild(new FI_Node2D())

    var textComponent = textNode.addComponent(new FI_Text())
    textComponent.content = this.textContent
    textComponent.onSizeChange = (t)=>{
      this.size.width = t.size.width
      this.size.height = t.size.height
    }
    var touchableComponent = this.addComponent(new FI_Touchable())
    touchableComponent.onMouseIn = (t)=>{
      inner.removeAllActions()
      inner.addAction(new FI_ScaleTo(1.1,1.1,250))
      this.onMouseIn && this.onMouseIn()
    }
    touchableComponent.onMouseOut = (t)=>{
      inner.removeAllActions()
      inner.addAction(new FI_ScaleTo(1,1,250))
      this.onMouseOut && this.onMouseOut()
    }
    touchableComponent.onMouseDown = (t)=>{
      inner.removeAllActions()
      inner.addAction(new FI_ScaleTo(1,1,50))
      this.onMouseDown && this.onMouseDown()
    }
    touchableComponent.onMouseUp = (t)=>{
      inner.removeAllActions()
      inner.addAction(new FI_ScaleTo(1.1,1.1,50))
      this.onMouseUp && this.onMouseUp()
    }
  }
}
