var appDiv = document.createElement('div')
document.getElementsByTagName("body")[0].appendChild(appDiv)

// import Engine from './fiengine/Engine'
// import SceneKeeper from './fiengine/keepers/SceneKeeper'
// import KeyboardCenter from './fiengine/input/KeyboardCenter'
// import MouseCenter from './fiengine/input/MouseCenter'

// import LaunchScene from './app/scenes/LaunchScene'
// import MainScene from './app/scenes/MainScene'
// import ButtonDemoScene from './app/scenes/ButtonDemoScene'

// Engine.getInstance()
//   .launch(appDiv)
//   .setSize(1366,768);

// KeyboardCenter.getInstance().launch();
// MouseCenter.getInstance().launch();
// SceneKeeper.run(new LaunchScene());

import Blackboard from './FIBlackboard/Blackboard'
import ToolType from './FIBlackboard/ToolType'

var canvas = document.createElement('canvas')
canvas.style.background = 'black'
canvas.width = 1000;
canvas.height = 1000;
canvas.style.width = '1000px';
canvas.style.height = '1000px';
console.log(canvas.getContext('2d'))

var bb = new Blackboard(canvas)
canvas.addEventListener('mousedown',(e)=>  bb["toolDown"](e.offsetX,e.offsetY))
canvas.addEventListener('mousemove',(e)=>  bb[e.buttons == 1?"toolDraw":"toolMove"](e.offsetX,e.offsetY))
canvas.addEventListener('mouseup',  (e)=>  bb["toolDone"](e.offsetX,e.offsetY))
document.getElementsByTagName("body")[0].appendChild(canvas)