import Blackboard from "./Blackboard"
import Item from "./Item"
import ItemData from "./ItemData"
import ToolType from "./ToolType"
import FIArray from "./FIArray"


export default class Picker extends Item{
    constructor(blackboard: Blackboard){
        super()
        this.setBlackboard(blackboard)
        this.setData(new ItemData(ToolType.Picker))
        this._state = Picker.STATE_NONE
    }
    isPicking(){ return this._state == Picker.STATE_PICKING }
    start(){
        super.start()
        
    }
    onUpdate(){
        super.onUpdate()
        if(this._pickerL === this.getLeft() && 
            this._pickerT === this.getTop() && 
            this._pickerR === this.getRight() && 
            this._pickerB === this.getBottom())
            return
        if(this._state != Picker.STATE_PICKING)
            return
        this.setDirty(true,
            Math.min(this._pickerL,this._prevPickerL),
            Math.min(this._pickerT,this._prevPickerT),
            Math.max(this._pickerR,this._prevPickerR),
            Math.max(this._pickerB,this._prevPickerB))
        this._prevPickerL = 0
        this._prevPickerT = 0
        this._prevPickerR = 0
        this._prevPickerB = 0
        this.setXYWH(
            this._pickerL,
            this._pickerT,
            this._pickerR - this._pickerL,
            this._pickerB - this._pickerT)
        this._items = this.blackboard.setSelectedRect(this.data.geo)
    }
    stop(){
        super.stop()
        
        this._state = Picker.STATE_NONE
        this.setXYWH(0,0,0,0)
        this.setDirty(true,
            this._prevPickerL,
            this._prevPickerT,
            this._prevPickerR,
            this._prevPickerB)
        this._pickerL = 0
        this._pickerT = 0
        this._pickerR = 0
        this._pickerB = 0
        this._prevPickerL = 0
        this._prevPickerT = 0
        this._prevPickerR = 0
        this._prevPickerB = 0
    }
    toolDown(x:number,y:number){
        this._items = new FIArray<Item>()
        this._pickerBeginX = x
        this._pickerBeginY = y
        this._pickerL = x
        this._pickerT = y
        this._pickerR = x
        this._pickerB = y
        this._prevPickerL = x
        this._prevPickerT = y
        this._prevPickerR = x
        this._prevPickerB = y
        this.setXYWH(x,y,0,0)

        let item = this.blackboard.items.lastOrNull((item)=>item.data.geo.containXY(x,y))
        if (null != item) {
            if (item.isSelected()) {
                this._items = this.blackboard.selectedItems()
                this._state = Picker.STATE_PICKED
            } else {
                this.blackboard.deselectAll()
                this._items = new FIArray<Item>()
                this._items.push(item)
                item.select()
            }
            this._state = Picker.STATE_PICKED
        } else {
            this.blackboard.deselectAll()
            this._state = Picker.STATE_PICKING
            this.start()
        }
    }
    toolDraw(x:number,y:number){
        this._pickerL = Math.min(x,this._pickerBeginX)
        this._pickerT = Math.min(y,this._pickerBeginY)
        this._pickerR = Math.max(x,this._pickerBeginX)
        this._pickerB = Math.max(y,this._pickerBeginY)
        if(this._state == Picker.STATE_PICKED){

        }
    }
    toolDone(x:number,y:number){
        this.setDirty(true,...this.getLTRB())
        this.stop()
    }
    paint(ctx:CanvasRenderingContext2D, left:number = 0, top:number = 0, right:number = 0, bottom:number = 0){
        if(!this.data.geo.isValid())
            return
        this.blackboard.ctx.lineWidth = 1
        this.blackboard.ctx.strokeStyle = "red"
        this.blackboard.ctx.setLineDash([])
        this.blackboard.ctx.strokeRect(
            this.getX(),
            this.getY(),
            this.getW()-1,
            this.getH()-1)
        if(this._prevPickerL >= this._prevPickerR || this._prevPickerT >= this._prevPickerB){
            this._prevPickerL = this.data.geo.getLeft() - 1
            this._prevPickerT = this.data.geo.getTop() - 1
            this._prevPickerR = this.data.geo.getRight() + 1
            this._prevPickerB = this.data.geo.getBottom() + 1
        }else{
            this._prevPickerL = Math.min(this.data.geo.getLeft() - 1,this._prevPickerL)
            this._prevPickerT = Math.min(this.data.geo.getTop() - 1,this._prevPickerT)
            this._prevPickerR = Math.max(this.data.geo.getRight() + 1,this._prevPickerR)
            this._prevPickerB = Math.max(this.data.geo.getBottom() + 1,this._prevPickerB)
        }
    }

    _state:number
    _pickerBeginX: number
    _pickerBeginY: number 
    _pickerL: number
    _pickerT: number
    _pickerR: number
    _pickerB: number

    _prevPickerL: number
    _prevPickerT: number
    _prevPickerR: number
    _prevPickerB: number

    _items: FIArray<Item>
    static STATE_NONE: number
    static STATE_PICKING: number
    static STATE_PICKED: number
}

Picker.STATE_NONE = 0
Picker.STATE_PICKING = 1
Picker.STATE_PICKED = 2