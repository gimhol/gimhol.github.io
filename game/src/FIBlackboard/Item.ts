import ItemData from './ItemData'
import ToolType from './ToolType'
import Blackboard from './Blackboard'
import CacheCanvas from './CacheCanvas'
import Rect from './Rect'
import OffscreenI from './Updater'
export default class Item implements OffscreenI{
	static cacheCanvases: Array<CacheCanvas>
    static cacheFloorWidth: number
    static cacheFloorHeight: number

    offscreenCanvas: HTMLCanvasElement
    offscreenCtx: CanvasRenderingContext2D
    offscreenX: number
    offscreenY: number

	data: ItemData
	blackboard: Blackboard
	dirty: boolean
	// dirtyLeft:number
	// dirtyTop:number
	// dirtyRight:number
	// dirtyBottom:number
	editing: boolean
	selected:boolean
	constructor() {
        this.data = null
		this.editing = false
		this.selected = false
		// this.dirtyLeft = 0
		// this.dirtyRight = 0
		// this.dirtyTop = 0
		// this.dirtyBottom = 0

		this.offscreenCanvas = document.createElement('canvas')
        this.offscreenCanvas.width = 1000   
        this.offscreenCanvas.height = 1000
        this.offscreenCtx = this.offscreenCanvas.getContext('2d')
        this.offscreenX = 0
        this.offscreenY = 0
    }
    moveTo(x:number, y:number){
        let dirtyL = Math.min(this.data.geo.x, x)
        let dirtyT = Math.min(this.data.geo.y, y)
        let dirtyR = Math.max(this.data.geo.x + this.data.geo.w, x + this.data.geo.w)
        let dirtyB = Math.max(this.data.geo.y + this.data.geo.h, y + this.data.geo.h)
        this.data.geo.x = x
        this.data.geo.y = y
        this.setDirty(true,dirtyL,dirtyT,dirtyR,dirtyB)
    }

    getBlackboard():Blackboard{ return this.blackboard }
    setBlackboard(v:Blackboard){ this.blackboard = v }

	setData(v:ItemData){ this.data = v }
	getData():ItemData{ return this.data }
	isSelected(){ return this.selected }
	setSelected(v:boolean){ 
		if(this.selected == v)
			return
		this.selected = v
		this.setDirty(true)
	}
	select(){ this.setSelected(true) }
	deselect(){ this.setSelected(false) }
	
	getType(){ return this.data.getType() }

    getId():string{ return this.data.getId() }
	setId(v:string){ this.data.setId(v) }

	getX():number{ return this.data.getX() }
	setX(v:number){ this.data.setX(v) }

	getY():number{ return this.data.getY() }
	setY(v:number){ this.data.setY(v) }

	getW():number{ return this.data.getW() }
	setW(v:number){ this.data.setW(v) }

	getH():number{ return this.data.getH() }
	setH(v:number){ this.data.setH(v) }

	getLeft():number{ return this.data.getLeft() }
	setLeft(v:number){ this.data.setLeft(v) }

	getTop():number{ return this.data.getTop() }
	setTop(v:number){ this.data.setTop(v) }

	getRight():number{ return this.data.getRight() }
	setRight(v:number){ this.data.setRight(v) }

	getBottom():number{ return this.data.getBottom() }
	setBottom(v:number){ this.data.setBottom(v) }
	
	setXYWH(x:number, y:number, w:number, h:number){ this.data.setXYWH(x,y,w,h) }
	getXYWH():Array<number>{ return this.data.getXYWH() }
	getLTRB():Array<number>{ return this.data.getLTRB() }

	setLTRB(l:number, t:number, r:number, b:number){
		this.data.geo.x = l
		this.data.geo.y = t
		this.data.geo.w = r-l
		this.data.geo.h = b-t
	}
	collide(left:number,top:number,right:number,bottom:number):boolean{
		return this.data.geo.collideLTRB(left,top,right,bottom)
	}
	collided(left:number,top:number,right:number,bottom:number):Rect{
		return this.data.geo.collidedLTRB(left,top,right,bottom)
	}
	setDirty(v:boolean, left:number = 0, top:number = 0, right:number = 0, bottom:number = 0){ 
		this.dirty = v 
		if(this.dirty){
			// if(right <= left || bottom <= top){
			// 	this.dirtyLeft 	= this.getLeft()
			// 	this.dirtyRight = this.getRight()
			// 	this.dirtyTop = this.getTop()
			// 	this.dirtyBottom = this.getBottom()
			// }else if(this.dirtyRight <= this.dirtyLeft || this.dirtyBottom <= this.dirtyTop){
			// 	this.dirtyLeft = left
			// 	this.dirtyRight = right
			// 	this.dirtyTop = top
			// 	this.dirtyBottom = bottom
			// }else {
			// 	this.dirtyLeft = Math.min(this.dirtyLeft,this.getLeft())
			// 	this.dirtyRight = Math.max(this.dirtyRight,this.getRight())
			// 	this.dirtyTop = Math.min(this.dirtyTop,this.getTop())
			// 	this.dirtyBottom = Math.max(this.dirtyBottom,this.getBottom())
			// }
			// this.blackboard && this.blackboard.setDirty(true,this.dirtyLeft, this.dirtyTop, this.dirtyRight, this.dirtyBottom)
			this.blackboard && this.blackboard.setDirty(true,left,top,right,bottom)
		}else{
			// this.dirtyLeft = 0
			// this.dirtyRight = 0
			// this.dirtyTop = 0
			// this.dirtyBottom = 0
		}
	}

    toolMove(x:number,y:number){ } //console.log('toolMove',this.getType(),x,y) }
	toolDown(x:number,y:number){ } //console.log('toolDown',this.getType(),x,y) }
	toolDraw(x:number,y:number){ } //console.log('toolDraw',this.getType(),x,y) }
	toolDone(x:number,y:number){ } //console.log('toolDone',this.getType(),x,y) }
	update(){
		
	}
	paint(ctx:CanvasRenderingContext2D,left:number = 0, top:number = 0, right:number = 0, bottom:number = 0){
		if(this.isSelected()) {
            ctx.setLineDash([4, 4])
            ctx.strokeStyle = 'white'
            ctx.lineWidth = 1
            ctx.beginPath()
			let l = this.getLeft()+1
			let t = this.getTop()+1
			let r = this.getRight()-1
			let b = this.getBottom()-1
            ctx.moveTo(l,t)
            ctx.lineTo(r,t)
            ctx.lineTo(r,b)
            ctx.lineTo(l,b)
            ctx.closePath()
            ctx.stroke()
        }
	}
	start(){ 
		console.log(this.blackboard.updaters)
		this.blackboard.updaters.removeOnce((item)=>item !== this) 
		this.blackboard.updaters.push(this)
	}
    onUpdate(){
        // console.log(this,"onUpdate()")
	}
    stop(){
		this.blackboard.updaters.removeOnce((item)=>item !== this) 
	}
}
Item.cacheCanvases = []
Item.cacheFloorWidth = 0
Item.cacheFloorHeight = 0