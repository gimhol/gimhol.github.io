import ItemData from './ItemData'
import ToolType from './ToolType'
import Blackboard from './Blackboard'
interface A{}
export default class Item{
	data: ItemData
	blackboard: Blackboard
	dirty: boolean
	dirtyLeft:number
	dirtyTop:number
	dirtyRight:number
	dirtyBottom:number
	editing: boolean
	selected:boolean
	constructor() {
        this.data = null
		this.editing = false
		this.selected = true
		this.dirtyLeft = 0
		this.dirtyRight = 0
		this.dirtyTop = 0
		this.dirtyBottom = 0
    }

    getBlackboard():Blackboard{ return this.blackboard }
    setBlackboard(v:Blackboard){ this.blackboard = v }

	setData(v:ItemData){ this.data = v }
	getData():ItemData{ return this.data }

	getSelected(){ return this.selected }
	setSelected(v:boolean){ this.selected = v }
	select(){ this.selected = true }
	deselect(){ this.selected = false }
	
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
	
	collide(left:number,top:number,right:number,bottom:number){
		return !(this.getRight() < left || this.getBottom() < top || this.getLeft() > right || this.getTop() > bottom)
	}
	setDirty(v:boolean, left:number = 0, top:number = 0, right:number = 0, bottom:number = 0){ 
		this.dirty = v 
		if(this.dirty){
			if(right <= left || bottom <= top){
				this.dirtyLeft 	= this.getLeft()
				this.dirtyRight = this.getRight()
				this.dirtyTop = this.getTop()
				this.dirtyBottom = this.getBottom()
			}else if(this.dirtyRight <= this.dirtyLeft || this.dirtyBottom <= this.dirtyTop){
				this.dirtyLeft = left
				this.dirtyRight = right
				this.dirtyTop = top
				this.dirtyBottom = bottom
			}else {
				this.dirtyLeft = Math.min(this.dirtyLeft,this.getLeft())
				this.dirtyRight = Math.max(this.dirtyRight,this.getRight())
				this.dirtyTop = Math.min(this.dirtyTop,this.getTop())
				this.dirtyBottom = Math.max(this.dirtyBottom,this.getBottom())
			}
		}else{
			this.dirtyLeft = 0
			this.dirtyRight = 0
			this.dirtyTop = 0
			this.dirtyBottom = 0
		}
	}

    toolMove(x:number,y:number){ } //console.log('toolMove',this.getType(),x,y) }
	toolDown(x:number,y:number){ } //console.log('toolDown',this.getType(),x,y) }
	toolDraw(x:number,y:number){ } //console.log('toolDraw',this.getType(),x,y) }
	toolDone(x:number,y:number){ } //console.log('toolDone',this.getType(),x,y) }
	update(){
		this.blackboard && this.blackboard.setDirty(true,this.dirtyLeft, this.dirtyTop, this.dirtyRight, this.dirtyBottom)
	}
	paint(ctx:CanvasRenderingContext2D,left:number = 0, top:number = 0, right:number = 0, bottom:number = 0){
		if(this.getSelected()) {
            ctx.setLineDash([4, 4])
            ctx.strokeStyle = 'white'
            ctx.lineWidth = 1
            ctx.lineCap = "round"
            ctx.lineJoin = "round"
            ctx.beginPath()
            ctx.moveTo(this.getLeft(),this.getTop())
            ctx.lineTo(this.getRight(),this.getTop())
            ctx.lineTo(this.getRight(),this.getBottom())
            ctx.lineTo(this.getLeft(),this.getBottom())
            ctx.closePath()
            ctx.stroke()
        }
	}
}