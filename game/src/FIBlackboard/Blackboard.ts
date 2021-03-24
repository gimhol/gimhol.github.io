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
	constructor(canvas:HTMLCanvasElement){
        this.canvas = canvas
        this.ctx = canvas.getContext('2d')
        this.toolType = ToolType.Pen
        this.items = []
    }
	// setFactory(v){}
	// factory(){}
    // setToolType(toolType){}

    toolMove(x:number,y:number){
        this.editingItem && this.editingItem.toolMove(x,y)
    }
	toolDown(x:number,y:number){
        this.editingItem = new ItemPen
        this.editingItem.setBlackboard(this)
        this.editingItem && this.editingItem.toolDown(x,y)
        this.items.push(this.editingItem)
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
    update(){
        this.paint(this.ctx)
    }
    paint(ctx:CanvasRenderingContext2D){
        ctx.fillStyle="black";
        ctx.clearRect(0,0,this.canvas.width,this.canvas.height)
        this.items.map((item)=>item.paint(ctx))
    }
}