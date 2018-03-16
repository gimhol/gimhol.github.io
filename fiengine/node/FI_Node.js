import FI_Object from '../base/FI_Object'

/*

LifeCycle:
  constructed

  _onAdded
  _onEnable

  _onUpdate
  _onDraw

  _onDisable
  _onRemoved
*/


export default class FI_Node extends FI_Object{
  constructor(){
    super();
    this.children = []
    this.components = []
    this.actions = []
    this.level    = 0;
    this.parent   = null;
    this.enable = false;
    this.visible = 1;

    this.hasAdded = false;
  }

  _onAdded(){}
  _onRemoved(){}
  _onEnable(){}
  _onDisable(){}
  _onUpdate(){}
  _onRender(){}

  // abstract !
  _update(dt){}
  _draw(ctx){}
}
FI_Object.BindDirtyIntHandler(FI_Node,'Level');
FI_Object.BindDirtyBoolHandler(FI_Node,'Enable');
FI_Object.BindDirtyBoolHandler(FI_Node,'Visible');
