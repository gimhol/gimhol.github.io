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

let body = document.getElementsByTagName("body")[0]
body.style.margin = '0px'

var scale = 1
var canvas = document.createElement('canvas')
canvas.style.background = 'black'
canvas.width = 1000 * scale;
canvas.height = 1000 * scale;
canvas.style.width = '1000px';
canvas.style.height = '1000px';
console.log(canvas.getContext('2d'))
body.appendChild(canvas)

var bb = new Blackboard(canvas)
var pointer_event = false

canvas.addEventListener('mousedown',(e)=>{
    pointer_event && e.buttons == 0 && bb["toolDown"](e.offsetX * scale,e.offsetY * scale)
})
canvas.addEventListener('mousemove',(e)=>{
    pointer_event && bb[e.buttons == 1?"toolDraw":"toolMove"](e.offsetX * scale,e.offsetY * scale)
})
canvas.addEventListener('mouseup',  (e)=>{
    pointer_event && e.button == 0 && bb["toolDone"](e.offsetX * scale,e.offsetY * scale)
})
canvas.addEventListener('pointerdown',(e)=>{
    pointer_event = true
    e.buttons == 1 && bb["toolDown"](e.offsetX * scale,e.offsetY * scale)
})
canvas.addEventListener('pointermove',(e)=>{
    e.buttons == 1 &&  bb[e.buttons == 1?"toolDraw":"toolMove"](e.offsetX * scale,e.offsetY * scale)
})
canvas.addEventListener('pointerup',  (e)=>{
    pointer_event = false
    e.button == 0 &&  bb["toolDone"](e.offsetX * scale,e.offsetY * scale)
})



let toolBtns:Array<HTMLButtonElement> = []
let toolBtnDatas = [
    ["pen",ToolType.Pen],
    ["picker",ToolType.Picker]
]
function addToolButton(text:string, toolType:ToolType):HTMLButtonElement{
    var btn = document.createElement('button')
    btn.innerText = text
    btn.addEventListener('click',()=>{
        bb.setToolType(toolType)
    })
    body.appendChild(btn)
    return btn
}
toolBtnDatas.map((pair)=>{
    toolBtns.push(addToolButton(<string>pair[0],<ToolType>pair[1]))
})