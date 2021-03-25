import Item from './Item'
import ItemPenData from './ItemPenData'

export default class ItemPen extends Item {
    coords: Array<number>

    offscreen: HTMLCanvasElement
    offscreenCtx: CanvasRenderingContext2D
    cached: boolean

    prevX: number
    prevY: number

    constructor(){
        super()
        this.setData(new ItemPenData)
        this.coords = []

        this.cached = false
        this.offscreen = document.createElement('canvas')
        this.offscreen.style.width = '1000px'
        this.offscreen.style.height = '1000px'
        this.offscreen.style.background = ''
        this.offscreen.width = 1000
        this.offscreen.height = 1000
        this.offscreenCtx = this.offscreen.getContext('2d')
    }
    toolMove(x:number,y:number){ 
        super.toolMove(x,y); 
    }
	toolDown(x:number,y:number){ 
        super.toolDown(x,y)
        this.editing = true
        this.coords.push(x) 
        this.coords.push(y)
        var halfLW = this.data.lineWidth / 2

        this.setX(x-halfLW)
        this.setY(y-halfLW)
        this.setW(this.data.lineWidth)
        this.setH(this.data.lineWidth)

        this.startOffscreen()
        this.setDirty(true,x-halfLW,y-halfLW, x+halfLW, y+halfLW)
        this.update()
        this.prevX = x;
        this.prevY = y;
    }
	toolDraw(x:number,y:number){ 
        super.toolDraw(x,y)

        if( Math.abs(x - this.prevX) + Math.abs(y - this.prevY) < 6)
            return console.log('???')

        console.log(x,y)

        this.coords.push(x) 
        this.coords.push(y) 
        var halfLW = this.data.lineWidth / 2
        this.setLeft(Math.min(x - halfLW,this.getLeft()))
        this.setTop(Math.min(y - halfLW,this.getTop()))
        this.setRight(Math.max(x + halfLW, this.getRight()))
        this.setBottom(Math.max(y + halfLW, this.getBottom()))
        this.setDirty(true,
            Math.min(this.prevX,x)-halfLW,
            Math.min(this.prevY,y)-halfLW,
            Math.max(this.prevX,x)+halfLW,
            Math.max(this.prevY,y)+halfLW)
        this.update()
        this.prevX = x;
        this.prevY = y;

    }
	toolDone(x:number,y:number){ 
        super.toolDone(x,y); 
        this.coords.push(x) 
        this.coords.push(y) 
        this.editing = false
        var halfLW = this.data.lineWidth / 2
        this.blackboard && this.blackboard.unsetEditingItem(this)
        this.endOffscreen()
        this.setDirty(true,
            Math.min(this.prevX,x)-halfLW,
            Math.min(this.prevY,y)-halfLW,
            Math.max(this.prevX,x)+halfLW,
            Math.max(this.prevY,y)+halfLW)
        this.update()
        this.prevX = x;
        this.prevY = y;
    }

    coordIdx: number
    offscreenInterval: number
    startOffscreen(){
        this.cached = false;
        this.offscreenCtx.strokeStyle = 'white'
        this.offscreenCtx.lineWidth = this.data.lineWidth
        this.offscreenCtx.lineCap = "round"
        this.offscreenCtx.lineJoin = "round"
        let x = this.coords[0]
        let y = this.coords[1]
        this.coordIdx = 2
        this.offscreenCtx.beginPath();
        this.offscreenCtx.moveTo(x,y)
        this.offscreenInterval = setInterval(this.updateOffsceen.bind(this),16)
    }
    updateOffsceen(){
        while(this.coordIdx < this.coords.length - 2){
            this.offscreenCtx.clearRect(this.getX(),this.getY(),this.getW(),this.getH())
            let x = this.coords[this.coordIdx];
            let y = this.coords[this.coordIdx+1];
            this.coordIdx += 2
            let prev_x = this.coords[this.coordIdx-2];
            let prev_y = this.coords[this.coordIdx-1];
            let dx = (x+prev_x)/2
            let dy = (y+prev_y)/2
            let cx1 = prev_x
            let cy1 = prev_y
            let cx2 = prev_x
            let cy2 = prev_y
            this.offscreenCtx.bezierCurveTo(cx1,cy1,cx2,cy2,dx,dy)
            // this.offscreenCtx.lineTo(dx,dy)
            this.offscreenCtx.stroke();
        }
    }
    endOffscreen(){
        clearInterval(this.offscreenInterval)
        this.updateOffsceen();
        this.cached = true;
        let x = this.coords[this.coordIdx];
        let y = this.coords[this.coordIdx+1];
        this.offscreenCtx.lineTo(x,y)
        this.offscreenCtx.stroke();
    }

	paint(ctx:CanvasRenderingContext2D,left:number = 0, top:number = 0, right:number = 0, bottom:number = 0){
        ctx.drawImage(this.offscreen,
            left, top, right-left, bottom-top,
            left, top, right-left, bottom-top)
        if(this.getSelected()) {
            ctx.setLineDash([4, 4]);
            ctx.strokeStyle = 'white'
            ctx.lineWidth = 1
            ctx.lineCap = "round"
            ctx.lineJoin = "round"
            ctx.beginPath();
            console.log(this.getLeft(),this.getTop())
            ctx.moveTo(this.getLeft(),this.getTop())
            ctx.lineTo(this.getRight(),this.getTop())
            ctx.lineTo(this.getRight(),this.getBottom())
            ctx.lineTo(this.getLeft(),this.getBottom())
            ctx.closePath()
            ctx.stroke();
        }
    }
}