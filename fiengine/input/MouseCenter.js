import EventCenter from '../base/EventCenter'
export default class MouseCenter extends EventCenter{
  constructor(){
    super()
  }
  launch(){
    document.addEventListener('mousedown', this.onMouseDown.bind(this), false );
    document.addEventListener('mouseup', this.onMouseUp.bind(this), false);
  }
  onMouseDown(e){
    this.dispatch('mousedown',e)
  }
  onMouseUp(e){
    this.dispatch('mouseup',e)
  }
}
