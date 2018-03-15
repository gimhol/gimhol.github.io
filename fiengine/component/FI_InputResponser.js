import FI_Component from './FI_Component'
import KeyboardCenter from '../input/KeyboardCenter'

export default class FI_InputResponser extends FI_Component{
  constructor(){
    super()
  }

  onMount(){

  }
  _initKeyboard(){
    if(this.isListeningKeyboard){
      return;
    }
    this.isListeningKeyboard = true
    KeyboardCenter.getInstance().addListener('keydown', this._onKeyDown.bind(this), false );
    KeyboardCenter.getInstance().addListener('keyup', this._onKeyUp.bind(this), false);
    this.foucsingKeys = {}
    this.plisteners = {}
    this.klisteners = {}
    this.rlisteners = {}
    this.dklisteners = {}
  }
  _onKeyDown(e){
    if( typeof this.foucsingKeys[e.key] === 'number' && this.foucsingKeys[e.key] < 1){
      this.foucsingKeys[e.key] = 1
    }
  }
  _onKeyUp(e){
    if( typeof this.foucsingKeys[e.key] === 'number' && this.foucsingKeys[e.key] > 0){
      this.foucsingKeys[e.key] = 0
    }
  }

  onKeyPress(k,func){
    this._initKeyboard();
    this.foucsingKeys[k] = 0;
    this.plisteners[k] = func
  }
  onKeyRelease(k,func){
    this._initKeyboard();
    this.foucsingKeys[k] = 0;
    this.rlisteners[k] = func
  }
  onKeyKeepPress(k,func){
    this._initKeyboard();
    this.foucsingKeys[k] = 0;
    this.klisteners[k] = func
  }
  onDirectionKeepPress(a,b,func){
    this._initKeyboard();
    this.foucsingKeys[a] = 0;
    this.foucsingKeys[b] = 0;
    this.dklisteners[a+'_'+b] = func
  }
  update(dt){
    if( this.isListeningKeyboard ){
      for(var k in this.dklisteners){
        var ab = k.split('_');
        this.dklisteners[k](this.foucsingKeys[ab[1]]-this.foucsingKeys[ab[0]],dt)
      }
      for(var k in this.foucsingKeys){
        if(this.foucsingKeys[k]){
          switch(this.foucsingKeys[k]){
            case 0: //释放
              this.foucsingKeys[k]--
              this.rlisteners[k] && this.rlisteners[k](dt)
              break;
            case 1: //按下
              this.foucsingKeys[k]++
              this.plisteners[k] && this.plisteners[k](dt)
              break;
            case 2: //保持按下
              this.klisteners[k] && this.klisteners[k](dt)
              break;
          }
        }
      }
    }
  }

  // draw(ctx){
  // }
}
