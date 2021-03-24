import ToolType from './ToolType'
import Utils from './Utils'

export default class ItemData{
	type:ToolType
	id:string
	x:number
	y:number
	z:number
	w:number
	h:number
	selected:boolean
	constructor(type:ToolType){
		this.type = type
		this.id = ""
		this.x = 0
		this.y = 0
		this.z = 0
		this.w = 0
		this.h = 0
		this.selected = true
	}
	getSelected(){ return this.selected }
	setSelected(v){ this.selected = v }
	select(){ this.selected = true }
	deselect(){ this.selected = false }

	getType(){ return this.type }
	setType(v:ToolType){ this.type = v }
	
	getId():string{ return this.id }
	setId(v:string){ this.id = v }

	getX():number{ return this.x }
	setX(v:number){ this.x = v }

	getY():number{ return this.y }
	setY(v:number){ this.y = v }

	getZ():number{ return this.z }
	setZ(v:number){ this.z = v }

	getW():number{ return this.w }
	setW(v:number){ this.w = v }

	getH():number{ return this.h }
	setH(v:number){ this.h = v }

	getLeft():number{ return this.x }
	setLeft(v:number){ this.w = this.x + this.w - v; this.x = v }

	getTop():number{ return this.y }
	setTop(v:number){ this.h = this.y + this.h - v; this.y = v }

	getRight():number{ return this.x + this.w }
	setRight(v:number){ this.w = v - this.x }

	getBottom():number{ return this.y + this.h }
	setBottom(v:number){ this.h = v - this.y }
	
}