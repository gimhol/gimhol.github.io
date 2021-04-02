import Rect from './Rect'
import RectsBin from './RectsBin'

export default class CacheCanvas {
    canvas: HTMLCanvasElement
    ctx: CanvasRenderingContext2D
    rects: Map<String,Rect>
    bin: RectsBin
    constructor(floorW:number = 256, floorH:number = 256){
        let w = 256
        let h = 256
        while(w < floorW)
            w *= 2
        while(h < floorH)
            h *= 2
        this.canvas = document.createElement('canvas')
        document.body.append(this.canvas)

        this.canvas.width = w
        this.canvas.height = h
        this.canvas.style.background = 'lightgray'
        this.ctx = this.canvas.getContext('2d')
        this.rects = new Map<String,Rect>()
        this.bin = new RectsBin(
            this.canvas.width,
            this.canvas.height,
            false)
    }
    findEmptyRect(w:number, h:number):Rect{
        return this.bin.insert(w,h,RectsBin.BestAreaFit)
    }
    add(id:string, canvas:HTMLCanvasElement, x:number, y:number, w:number, h:number):Rect{
        let dst = this.findEmptyRect(w,h)
        if(!dst.isValid()) // no enough space for it
            return dst
        this.ctx.drawImage(canvas,x, y, w, h, dst.x, dst.y, dst.w, dst.h)
        this.rects.set(id, dst)
        return dst;
    }
    find(id:String):Rect{
        return this.rects.get(id)
    }
    remove(id:String):boolean{
        return this.rects.delete(id)
    }
    rename(oldId:String,newId:String):CacheCanvas{
        let rect = this.rects.get(oldId)
        this.rects.delete(oldId)
        this.rects.set(newId, rect)
        return this
    }
}
