import ToolType from './ToolType'
import ItemPen from './ItemPen'
import Item from './Item'
import Utils from './Utils'
import Factory from './Factory'
import Picker from './Picker'
import Updater from './Updater'
import Rect from './Rect'
import FIArray from './FIArray'

export default class Blackboard {
    canvas: HTMLCanvasElement
    ctx: CanvasRenderingContext2D
    toolType: ToolType
    editingItem: Item
    items: FIArray<Item>
    dirty:boolean
    dirtyLeft:number
    dirtyTop:number
    dirtyRight:number
    dirtyBottom:number
    factory:Factory
    picker: Picker
    updaters: FIArray<Updater>

    pickerElement: HTMLElement
	constructor(canvas:HTMLCanvasElement){
        let div = document.createElement("div")
        div.style.background = '#55FFFF55'
        div.style.position = 'fixed'
        canvas.parentElement.append(div)
        this.pickerElement = div
        // canvas.style.position = 'fixed'

        this.canvas = canvas
        this.ctx = canvas.getContext('2d')
        this.toolType = ToolType.Pen
        this.items = new FIArray<Item>()
        this.dirtyLeft = 0
        this.dirtyTop = 0
        this.dirtyRight = 0
        this.dirtyBottom = 0
        this.factory = new Factory()
        this.picker = new Picker(this)
        this.updaters = new FIArray<Updater>()
        // var t = new Date().getTime()
        // for(let i = 0; i < 400; ++i){
        //     let item = this.factory.createItem(ToolType.Pen);
        //     item.toolDown(i*10+Math.random()*10, i*10+Math.random()*10);
        //     for(let j = 0; j < 100; ++j){
        //         item.toolDraw(i*10+Math.random()*10, i*10+Math.random()*10);
        //     }
        //     item.toolDone(i*10+Math.random()*10, i*10+Math.random()*10);
        //     this.addItem(item);
        // }
        // console.log("time use!", new Date().getTime() - t)
        // setTimeout(()=>{
        //     this.toolType = ToolType.Picker
        // },1000)
        setInterval(()=>this.tryUpdate(),1000/30)
    }
    addUpdater(v:Updater){
        this.updaters.filter((item)=>item === v)
		this.updaters.push(v)
    }
    removeUpdater(v:Updater){
        this.updaters.filter((item)=>item === v) 
    }
    setToolType(toolType:ToolType){
        if(toolType == this.toolType)
            return
        this.editingItem && this.editingItem.toolDone(this._mouseX,this._mouseY)
        this.unsetEditingItem(this.editingItem)

        this.toolType = toolType
        this.deselectAll()
    }
    addItem(item:Item){
        if(!!item.blackboard)
            return console.warn('[Blackboard::addItem] this item is already added to blackboard!')
        this.items.push(item)
        item.setBlackboard(this)
        this.setDirty(true,item.getLeft(),item.getTop(),item.getRight(),item.getBottom())
    }
    removeItem(item:Item){
        this.items.filter((v)=>item === v)
        this.updaters.filter((v)=>item === v)
        this.setDirty(true,...item.getLTRB())
    }
    _mouseX: number
    _mouseY: number
    toolMove(x:number,y:number){
        this._mouseX = x
        this._mouseY = y
        this.editingItem && this.editingItem.toolMove(x,y)
    }
	toolDown(x:number,y:number){
        this._mouseX = x
        this._mouseY = y
        switch(this.toolType){
            case ToolType.Picker:
                this.picker.toolDown(x,y)
                break
            default:
                this.editingItem = this.factory.createItem(this.toolType)
                if(!this.editingItem)
                    break;
                this.addItem(this.editingItem);
                this.editingItem && this.editingItem.toolDown(x,y)
                break
        }
    }
	toolDraw(x:number,y:number){
        this._mouseX = x
        this._mouseY = y
        switch(this.toolType){
            case ToolType.Picker:
                this.picker.toolDraw(x,y)
                break
            default:
                this.editingItem && this.editingItem.toolDraw(x,y)
                break
        }
    }
	toolDone(x:number,y:number){
        this._mouseX = x
        this._mouseY = y
        switch(this.toolType){
            case ToolType.Picker:
                this.picker.toolDone(x,y)
                break
            default:
                this.editingItem && this.editingItem.toolDone(x,y)
        }
    }
    unsetEditingItem(item:Item){
        if(this.editingItem == item)
            delete this.editingItem
    }
    tryUpdate(){
        for(let i = 0,len = this.updaters.length; i < len; ++i){
            this.updaters[i].onUpdate()
        }
        if(!this.dirty){
            if(this.pickerElement){
                this.pickerElement.style.left = '0px'
                this.pickerElement.style.top = '0px'
                this.pickerElement.style.width = '0px'
                this.pickerElement.style.height = '0px'
            }
            return
        }
        this.paint(this.ctx,this.dirtyLeft, this.dirtyTop, this.dirtyRight, this.dirtyBottom)
        if(this.pickerElement){
            this.pickerElement.style.left = ''+this.dirtyLeft+'px'
            this.pickerElement.style.top = ''+this.dirtyTop+'px'
            this.pickerElement.style.width = ''+(this.dirtyRight-this.dirtyLeft)+'px'
            this.pickerElement.style.height = ''+(this.dirtyBottom-this.dirtyTop)+'px'
        }
        this.setDirty(false)
    }
    setDirty(dirty:boolean, left:number = 0,top:number = 0,right:number = 0,bottom:number = 0){
        this.dirty = dirty 
		if(this.dirty){
            if(right <= left || bottom <= top) {
                console.trace("full dirty: ",arguments)
                this.dirtyLeft 	= 0
				this.dirtyRight = this.canvas.width
				this.dirtyTop = 0
				this.dirtyBottom = this.canvas.height
            } else if(this.dirtyRight <= this.dirtyLeft || this.dirtyBottom <= this.dirtyTop ){
                console.log("first dirty: ",arguments)
                this.dirtyLeft = left
                this.dirtyTop = top
                this.dirtyRight = right
                this.dirtyBottom = bottom
            }else{
                console.log("extend dirty: ",arguments)
                this.dirtyLeft = Math.min(this.dirtyLeft,left)
                this.dirtyTop = Math.min(this.dirtyTop,top)
                this.dirtyRight = Math.max(this.dirtyRight,right)
                this.dirtyBottom = Math.max(this.dirtyBottom,bottom)
            }
        }else{
			this.dirtyLeft = 0
			this.dirtyRight = 0
			this.dirtyTop = 0
			this.dirtyBottom = 0
        }
    }
    setSelectedRect(rect:Rect):FIArray<Item>{
        let ret = new FIArray<Item>()
        this.items.map((item)=>{
            let pre = item.isSelected()
            let cur = item.data.geo.collide(rect)
            if(cur)
                ret.push(item)
            if(pre == cur)
                return
            item.setSelected(cur)
        })
        return ret
    }
    deselectAll(){
        this.items.map((item)=>item.setSelected(false))
    }
	selectedItems():FIArray<Item>{ return this.items.filter((item)=>item.isSelected()) }
    paint(ctx:CanvasRenderingContext2D,left:number = 0,top:number = 0,right:number = 0,bottom:number = 0){
        var t = new Date().getTime()
        ctx.fillStyle="black";
        if(right <= left || bottom <= top){
            ctx.clearRect(0,0,this.canvas.width,this.canvas.height)
        } else {
            ctx.clearRect(left, top, right-left, bottom-top)
        }
        this.items.map((item,i)=>{
            var collided = item.collided(left, top, right, bottom)
            if(item.dirty || collided.isValid()){
                item.paint(ctx, collided.x, collided.y, collided.x + collided.w, collided.y + collided.h)
                item.setDirty(false)
            }
        })
        if(this.toolType === ToolType.Picker){
            this.picker.paint(ctx,left,top,right,bottom)
            this.picker.setDirty(false)
        }
        // this.ctx.strokeStyle = "red"
        // this.ctx.moveTo(1000,500);
        // this.ctx.bezierCurveTo(500,1000,500,1000,1000,1000)
        // this.ctx.stroke()
        // console.log("paint time use:%d. paint item count:%d", new Date().getTime() - t, paintItemCount)
    }
}