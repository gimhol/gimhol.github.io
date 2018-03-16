import FI_Component from './FI_Component'
import KeyboardCenter from '../input/KeyboardCenter'

// 静默: 0
// 按下: 1 （ after + 1）
// 按着：2
// 抬起：
export default class FI_InputResponser extends FI_Component{
  constructor(){
    super()
  }

  onMount(){
    this._initKeyboard();
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

    this.dclisteners = {}
    this.dckeytimess = {}
  }

  _onKeyDown(e){
    if( typeof this.foucsingKeys[e.key] === 'number'){
      switch( this.foucsingKeys[e.key] ){
        case -1:  // 保持松开
        case 0:   // 抬起
          this.foucsingKeys[e.key] = 1;
          this.dckeytimess[e.key] && this.dckeytimess[e.key].push(e.timeStamp)
          break;
      }
    }
  }
  _onKeyUp(e){
    if( typeof this.foucsingKeys[e.key] === 'number'){
      switch( this.foucsingKeys[e.key] ){
        case 1: // 按下
        case 2: // 按着
          this.foucsingKeys[e.key] = 0;
          this.dckeytimess[e.key] && this.dckeytimess[e.key].push(e.timeStamp)
          break;
      }
    }
  }
  onKeyDoubleClick(k,func){
    this.foucsingKeys[k] = -1;
    this.dclisteners[k] = func
    this.dckeytimess[k] = []
  }
  onKeyPress(k,func){
    this.foucsingKeys[k] = -1;
    this.plisteners[k] = func
  }
  onKeyRelease(k,func){
    this.foucsingKeys[k] = -1;
    this.rlisteners[k] = func
  }
  onKeyKeepPress(k,func){
    this.foucsingKeys[k] = -1;
    this.klisteners[k] = func
  }
  onDirectionKeepPress(a,b,func){
    this.foucsingKeys[a] = -1;
    this.foucsingKeys[b] = -1;
    this.dklisteners[a+'_'+b] = func
  }
  _onUpdate(dt){
    if( this.isListeningKeyboard ){
      for(var k in this.dklisteners){
        var ab = k.split('_');
        this.dklisteners[k](this.foucsingKeys[ab[1]]-this.foucsingKeys[ab[0]],dt)
      }
      for(var k in this.foucsingKeys){

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
        if(this.dckeytimess[k] && this.dckeytimess[k].length == 4){
          var totalUseTime = this.dckeytimess[k][3] - this.dckeytimess[k][0]
          if(totalUseTime <= 500){
            this.dclisteners[k] && this.dclisteners[k]()
          }
          this.dckeytimess[k] = [];
        }
      }
    }
  }

  // _onRender(ctx){
  // }
}
