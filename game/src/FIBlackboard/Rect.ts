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
	setXYWH(x:number, y:number, w:number, h:number){ this.x = x; this.y = y; this.w = w; this.h = h; }
	getXYWH():Array<number>{ return [ this.x, this.y, this.w, this.h ] }
	getLTRB():Array<number>{ return [ this.x, this.y, this.w + this.x, this.h + this.y ] }
    containXY(x:number, y:number):boolean{
        return x >= this.x && x <= this.x + this.w && y >= this.y && y <= this.y + this.h
    }
	collide(other:Rect){
		return !(
            this.getRight() < other.getLeft() || 
            this.getBottom() < other.getTop() || 
            this.getLeft() > other.getRight() || 
            this.getTop() > other.getBottom())
	}
	collideLTRB(left:number,top:number,right:number,bottom:number){
		return !(this.getRight() < left || this.getBottom() < top || this.getLeft() > right || this.getTop() > bottom)
	}
	collidedLTRB(left:number,top:number,right:number,bottom:number):Rect{
		let l = Math.max(left,this.getLeft())
		let r = Math.min(right,this.getRight())
		let t = Math.max(top,this.getTop())
		let b = Math.min(bottom,this.getBottom())
		return new Rect(l,t,r-l,b-t)
	}
    isIntersect(other:Rect){
        let zx = Math.abs(this.x + this.x + this.w - other.x - other.x - other.w);
        let x  = Math.abs(this.x - this.x - this.w) + Math.abs(other.x - other.x - other.w);
        let zy = Math.abs(this.y + this.y + this.h - other.y - other.y - other.h);
        let y  = Math.abs(this.y - this.y - this.h) + Math.abs(other.y - other.y - other.h);
        return zx <= x && zy <= y
    }
}