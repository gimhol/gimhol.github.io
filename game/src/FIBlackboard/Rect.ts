export default class Rect {
    x:number
    y:number
    w:number
    h:number
    constructor(x:number = 0,y:number = 0,w:number = 0,h:number = 0){
        this.x = x
        this.y = y
        this.w = w
        this.h = h
    }
    isValid():boolean{
        return this.x >= 0 && this.y >= 0 && this.w > 0 && this.h > 0
    }
    clone():Rect {
        return new Rect(this.x, this.y, this.w, this.h)
    }

	getLeft():number{ return this.x }
	setLeft(v:number){ this.w = this.x + this.w - v; this.x = v }
	getTop():number{ return this.y }
	setTop(v:number){ this.h = this.y + this.h - v; this.y = v }
	getRight():number{ return this.x + this.w }
	setRight(v:number){ this.w = v - this.x }
	getBottom():number{ return this.y + this.h }
	setBottom(v:number){ this.h = v - this.y }
}