import EventCenter from '../base/EventCenter'
import KeyboardCenter from './KeyboardCenter'
export default class InputCenter extends EventCenter{
  constructor(){
    KeyboardCenter.getInstance().addListener('keydown',this.onKeyDown.bind(this))
    this.focusingKey = {}
  }
  onKeyDown(e){

  }
  onKeyUp(e){

  }
  _onUpdate(dt){

  }
  onKeyPress(k,func){
    this.focusOn(k)
  }
}
