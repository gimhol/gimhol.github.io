import FI_Scene from '../../fiengine/node/FI_Scene'
export default class MainScene extends FI_Scene{
  constructor(){
    super()
  }
  onAdded(){
    console.log('Hello')
  }
}
