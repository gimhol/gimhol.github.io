import ItemData from './ItemData'
import ToolType from './ToolType';
import Blackboard from './Blackboard'
export default class BbItemBase {
	data: ItemData
	blackboard: Blackboard
	dirty: boolean
	dirtyLeft: number
	dirtyTop: number
	dirtyRight: number
	dirtyBottom: number
	editing: boolean
	constructor() {
        this.data = new ItemData(ToolType.Invalid)

		this.dirtyLeft = 0
		this.dirtyRight = 0
		this.dirtyTop = 0
		this.dirtyBottom = 0
    }

    getBlackboard():Blackboard{ return this.blackboard }
    setBlackboard(v:Blackboard){ this.blackboard = v; }

	setData(v:ItemData){ this.data = v; }
	getData():ItemData{ return this.data; }

	getSelected(){  return this.getData().getSelected(); }
	setSelected(v){ return this.getData().setSelected(v); }

	select(){ return this.getData().select(); }
	deselect(){ this.getData().deselect(); }

	getType(){ return this.getData().getType(); }

    getId():string{ return this.getData().getId(); }
	setId(v:string){ this.getData().setId(v); }

	getX():number{ return this.getData().getX(); }
	setX(v:number){ this.getData().setX(v); }

	getY():number{ return this.getData().getY(); }
	setY(v:number){ this.getData().setY(v); }

	getW():number{ return this.getData().getW(); }
	setW(v:number){ this.getData().setW(v); }

	getH():number{ return this.getData().getH(); }
	setH(v:number){ this.getData().setH(v); }

	getLeft():number{ return this.getData().getLeft(); }
	setLeft(v:number){ this.getData().setLeft(v); }

	getTop():number{ return this.getData().getTop(); }
	setTop(v:number){ this.getData().setTop(v); }

	getRight():number{ return this.getData().getRight(); }
	setRight(v:number){ this.getData().setRight(v); }

	getBottom():number{ return this.getData().getBottom(); }
	setBottom(v:number){ this.getData().setBottom(v); }
	
	collide(left:number,top:number,right:number,bottom:number){
		return !(this.getRight() < left || this.getBottom() < top || this.getLeft() > right || this.getTop() > bottom)
	}

	setDirty(v:boolean, left:number = 0, top:number = 0, right:number = 0, bottom:number = 0){ 
		this.dirty = v 
		if(this.dirty){
			if(right <= left || bottom <= top){
				this.dirtyLeft = this.getLeft()
				this.dirtyRight = this.getRight()
				this.dirtyTop = this.getTop()
				this.dirtyBottom = this.getBottom()
			}else{
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
		this.blackboard && this.blackboard.update(this.dirtyLeft, this.dirtyTop, this.dirtyRight, this.dirtyBottom)
	}
	paint(ctx:CanvasRenderingContext2D,left:number = 0, top:number = 0, right:number = 0, bottom:number = 0){}
}