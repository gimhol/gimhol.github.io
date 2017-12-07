import EventCenter from '../base/EventCenter'
export default class KeyboardCenter extends EventCenter{
  constructor(){
    super()
  }
  launch(){
    document.addEventListener('keydown', this.onKeyDown.bind(this), false );
    document.addEventListener('keyup', this.onKeyUp.bind(this), false);
  }
  onKeyDown(e){
    this.dispatch('keydown',e)
  }
  onKeyUp(e){
    this.dispatch('keyup',e)
  }
}
