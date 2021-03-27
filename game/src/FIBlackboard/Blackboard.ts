import ToolType from './ToolType'
import ItemPen from './ItemPen'
import Item from './Item'
import Utils from './Utils'
import Factory from './Factory'

export default class Blackboard {
    canvas: HTMLCanvasElement
    ctx: CanvasRenderingContext2D
    toolType: ToolType
    editingItem: Item
    items: Array<Item>
    dirty:boolean
    dirtyLeft:number
    dirtyTop:number
    dirtyRight:number
    dirtyBottom:number
    factory:Factory
	constructor(canvas:HTMLCanvasElement){
        this.canvas = canvas
        this.ctx = canvas.getContext('2d')
        this.toolType = ToolType.Pen
        this.items = []
        this.dirtyLeft = 0
        this.dirtyTop = 0
        this.dirtyRight = 0
        this.dirtyBottom = 0
        this.factory = new Factory()
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
        setInterval(()=>this.tryUpdate(),30)
    }

    addItem(item:Item){
        if(!!item.blackboard)
            return console.warn('[Blackboard::addItem] this item is already added to blackboard!')
        this.items.push(item)
        item.setBlackboard(this)
        this.setDirty(true,item.getLeft(),item.getTop(),item.getRight(),item.getBottom())
    }
    toolMove(x:number,y:number){
        this.editingItem && this.editingItem.toolMove(x,y)
    }
	toolDown(x:number,y:number){
        this.editingItem = this.factory.createItem(this.toolType)
        if(!this.editingItem)
            return;
        this.addItem(this.editingItem);
        this.editingItem && this.editingItem.toolDown(x,y)
    }
	toolDraw(x:number,y:number){
        this.editingItem && this.editingItem.toolDraw(x,y)
    }
	toolDone(x:number,y:number){
        this.editingItem && this.editingItem.toolDone(x,y)
    }
    unsetEditingItem(item:Item){
        if(this.editingItem == item)
            delete this.editingItem
    }
    tryUpdate(){
        if(!this.dirty)
            return
        this.paint(this.ctx,this.dirtyLeft, this.dirtyTop, this.dirtyRight, this.dirtyBottom)
        this.setDirty(false)
    }
    setDirty(dirty:boolean,left:number = 0,top:number = 0,right:number = 0,bottom:number = 0){
        this.dirty = dirty 
		if(this.dirty){
            // console.log(...arguments)
            if(right <= left || bottom <= top) {
                this.dirtyLeft 	= 0
				this.dirtyRight = this.canvas.width
				this.dirtyTop = 0
				this.dirtyBottom = this.canvas.height
            } else if(this.dirtyRight <= this.dirtyLeft || this.dirtyBottom <= this.dirtyTop ){
                this.dirtyLeft = left
                this.dirtyTop = top
                this.dirtyRight = right
                this.dirtyBottom = bottom
            }else{
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
    paint(ctx:CanvasRenderingContext2D,left:number = 0,top:number = 0,right:number = 0,bottom:number = 0){
        var t = new Date().getTime()
        ctx.fillStyle="black";
        if(right <= left || bottom <= top){
            ctx.clearRect(0,0,this.canvas.width,this.canvas.height)
        } else {
            ctx.clearRect(left, top, right-left, bottom-top)
        }
        var paintItemCount = 0
        this.items.map((item,i)=>{
            var collided = item.collide(left, top, right, bottom)
            if(item.dirty || collided   ){
                // console.log(i,item.dirty,collided,left,top,right, bottom)
                item.paint(ctx, left, top, right, bottom)
                item.setDirty(false);
                ++paintItemCount
            }
        })

        // this.ctx.strokeStyle = "red"
        // this.ctx.moveTo(1000,500);
        // this.ctx.bezierCurveTo(500,1000,500,1000,1000,1000)
        // this.ctx.stroke()

        // console.log("paint time use:%d. paint item count:%d", new Date().getTime() - t, paintItemCount)
    }
}