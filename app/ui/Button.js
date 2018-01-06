import FI_Node from '../../fiengine/node/FI_Node'
import FI_Text from '../../fiengine/component/FI_Text'
import FI_Touchable from '../../fiengine/component/FI_Touchable'

export default class Button extends FI_Node{
  constructor(textContent){
    super()
    this.textContent = textContent
  }
  onAdded(){
    var textNode = this.addChild(new FI_Node())

    var textComponent = textNode.addComponent(new FI_Text())
    textComponent.content = this.textContent
    textComponent.onSizeChange = (t)=>{
      this.size.width = t.size.width
    }

    var touchableComponent = this.addComponent(new FI_Touchable())
    touchableComponent.onMouseIn = (t)=>{
      t.node.scale.x = 1.1
      t.node.scale.y = 1.1
    }
    touchableComponent.onMouseOut = (t)=>{
      t.node.scale.x = 1.0
      t.node.scale.y = 1.0
    }
    touchableComponent.onMouseDown = (t)=>{
      t.node.scale.x = 1.0
      t.node.scale.y = 1.0
    }
    touchableComponent.onMouseUp = (t)=>{
      t.node.scale.x = 1.1
      t.node.scale.y = 1.1
    }
  }
}
