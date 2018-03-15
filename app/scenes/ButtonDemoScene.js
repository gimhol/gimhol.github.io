import {
  FI_Scene,
  FI_Node,
  FI_Text,
} from '../../fiengine/Root';

export default class ButtonDemoScene extends FI_Scene {
  constructor(){
    super()
  }

  onAdded(){
    this.button0 = new FI_Node();
    var txt = this.button0.addComponent(new FI_Text());
    txt.content = "Test"
    this.setPositionXY(100,100)
    this.addChild(this.button0)
  }


}
