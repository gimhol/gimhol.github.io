import ToolType from './ToolType'
import ItemPen from './ItemPen'
import Item from './Item'
import Utils from './Utils'

export default class Blackboard {
    canvas: HTMLCanvasElement
    ctx: CanvasRenderingContext2D
    toolType: ToolType
    editingItem: Item
    items: Array<Item>
    dirtyLeft:number
    dirtyTop:number
    dirtyRight:number
    dirtyBottom:number
	constructor(canvas:HTMLCanvasElement){
        this.canvas = canvas
        this.ctx = canvas.getContext('2d')
        this.toolType = ToolType.Pen
        this.items = []
        this.dirtyLeft = 0
        this.dirtyTop = 0
        this.dirtyRight = 0
        this.dirtyBottom = 0

        for(let i = 0; i < 8; ++i){
            let item = new ItemPen;
            item.toolDown(0, 0);
            for(let j = 0; j < 100; ++j){
                item.toolDraw(Math.random()*50, Math.random()*50);
            }
            item.toolDone(0,0);
            this.addItem(item);
        }
        setInterval(()=>this.tryUpdate(),16)
    }

    addItem(item:Item){
        if(!!item.blackboard)
            return console.warn('[Blackboard::addItem] this item is already added to blackboard!')
        
        this.items.push(item)
        item.setBlackboard(this)
        this.update(item.getLeft(),item.getTop(),item.getRight(),item.getBottom())
    }
    toolMove(x:number,y:number){
        this.editingItem && this.editingItem.toolMove(x,y)
    }
	toolDown(x:number,y:number){
        this.editingItem = new ItemPen
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
        if(this.dirtyRight <= this.dirtyLeft || this.dirtyBottom <= this.dirtyTop )
            return
        this.paint(this.ctx,this.dirtyLeft, this.dirtyTop, this.dirtyRight, this.dirtyBottom)
        this.dirtyLeft = 0
        this.dirtyTop = 0
        this.dirtyRight = 0
        this.dirtyBottom = 0
    }
    update(left:number = 0,top:number = 0,right:number = 0,bottom:number = 0){
        if(right <= left || bottom <= top)
            return
        this.dirtyLeft = Math.min(this.dirtyLeft,left)
        this.dirtyTop = Math.min(this.dirtyTop,top)
        this.dirtyRight = Math.max(this.dirtyRight,right)
        this.dirtyBottom = Math.max(this.dirtyBottom,bottom)
    }
    paint(ctx:CanvasRenderingContext2D,left:number = 0,top:number = 0,right:number = 0,bottom:number = 0){
        ctx.fillStyle="black";
        if(right <= left || bottom <= top){
            ctx.clearRect(0,0,this.canvas.width,this.canvas.height)
        } else {
            ctx.clearRect(left, top, right-left, bottom-top)
        }
        this.items.map((item)=>{
            if(item.dirty || item.collide(left, top, right, bottom)){
                item.paint(ctx, left, top, right, bottom)
                item.setDirty(false);
            }
        })
        
        this.ctx.strokeStyle = "red"
        this.ctx.moveTo(1000,500);
        this.ctx.bezierCurveTo(500,1000,500,1000,1000,1000)
        this.ctx.stroke()
    }
}