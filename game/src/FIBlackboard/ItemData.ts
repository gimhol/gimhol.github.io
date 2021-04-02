import ToolType from './ToolType'
import Rect from './Rect'

export default class ItemData{
	type:ToolType
	id:string
	z:number
	geo:Rect
	lineWidth:number
	strokeColor:string
	brushColor:string
	lineCap:CanvasLineCap
	lineJoin:CanvasLineJoin
	constructor(type:ToolType){
		this.type = type
		this.id = ""
		this.geo = new Rect(
			Number.MAX_VALUE,
			Number.MAX_VALUE,
			Number.MAX_VALUE,
			Number.MAX_VALUE)
		this.z = 0
		this.lineWidth = 4
		this.strokeColor = 'white'
		this.brushColor = 'white'
		this.lineCap = 'round'
		this.lineJoin = 'round'
	}

	getType(){ return this.type }
	setType(v:ToolType){ this.type = v }
	
	getZ():number{ return this.z }
	setZ(v:number){ this.z = v }

	getId():string{ return this.id }
	setId(v:string){ this.id = v }

	getX():number{ return this.geo.x }
	setX(v:number){ this.geo.x = v }

	getY():number{ return this.geo.y }
	setY(v:number){ this.geo.y = v }

	getW():number{ return this.geo.w }
	setW(v:number){ this.geo.w = v }

	getH():number{ return this.geo.h }
	setH(v:number){ this.geo.h = v }

	getLeft():number{ return this.geo.getLeft() }
	setLeft(v:number){ this.geo.setLeft(v) }

	getTop():number{ return this.geo.getTop() }
	setTop(v:number){ this.geo.setTop(v) }

	getRight():number{ return this.geo.getRight() }
	setRight(v:number){ this.geo.setRight(v) }

	getBottom():number{ return this.geo.getBottom() }
	setBottom(v:number){ this.geo.setBottom(v) }
	
}