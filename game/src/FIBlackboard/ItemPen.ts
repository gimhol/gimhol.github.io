import Item from './Item'
import ItemPenData from './ItemPenData'

export default class ItemPen extends Item {
    coords: Array<number>
    constructor(){
        super()
        this.setData(new ItemPenData)
        this.coords = []
    }
    toolMove(x:number,y:number){ 
        super.toolMove(x,y); 
    }
	toolDown(x:number,y:number){ 
        super.toolDown(x,y)
        this.coords.push(x) 
        this.coords.push(y)
        this.setX(x)
        this.setY(y)
        this.setW(0)
        this.setH(0)
        this.setDirty(true)
        this.update()

    }
	toolDraw(x:number,y:number){ 
        super.toolDraw(x,y)
        this.coords.push(x) 
        this.coords.push(y) 

        this.setLeft(Math.min(x ,this.getLeft()))
        this.setTop(Math.min(y ,this.getTop()))
        this.setRight(Math.max(x, this.getRight()))
        this.setBottom(Math.max(y, this.getBottom()))

        this.setDirty(true)
        this.update()

    }
	toolDone(x:number,y:number){ 
        super.toolDone(x,y); 
        this.getBlackboard().unsetEditingItem(this)

        this.setDirty(true)
        this.update()
    }
	paint(ctx:CanvasRenderingContext2D ){
        ctx.strokeStyle = 'white'
        ctx.setLineDash([]);
        ctx.lineWidth = 4
        ctx.lineCap = "round"
        ctx.lineJoin = "round"
        if(this.coords.length > 4){
            ctx.beginPath();
            ctx.moveTo(this.coords[0],this.coords[1])
            for(let i = 0;i < this.coords.length; i+=2){
                let x = this.coords[i];
                let y = this.coords[i+1];
                if(false){
                    ctx.lineTo(x,y)
                }else if(i <= this.coords.length - 2 && i >= 2){
                    let prev_x = this.coords[i-2];
                    let prev_y = this.coords[i-1];
                    let dx = (x+prev_x)/2
                    let dy = (y+prev_y)/2
                    let cx1 = prev_x
                    let cy1 = prev_y
                    let cx2 = prev_x
                    let cy2 = prev_y
                    ctx.bezierCurveTo(cx1,cy1,cx2,cy2,dx,dy)
                }else{
                    ctx.lineTo(x,y)
                }
            }
            ctx.stroke();
            ctx.closePath()
        }
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