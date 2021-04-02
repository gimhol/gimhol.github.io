
/*
Based on the Public Domain MaxRectanglesBinPack.cpp source by Jukka Jyl?nki
https://github.com/juj/RectangleBinPack/

Based on C# port by Sven Magnus 
http://unifycommunity.com/wiki/index.php?title=MaxRectanglesBinPack

Based on ActionScript3 port by DUZENGQIANG
http://www.duzengqiang.com/blog/post/971.html
This version is also public domain - do whatever you want with it.

Ported to TypeScript by Gim 2020/3/30
This version is also public domain - do whatever you want with it.
*/

import Rect from "./Rect"
export default class RectsBin {
    static BestShortSideFit:number
    static BestLongSideFit:number
    static BestAreaFit:number
    static BottomLeftRule:number
    static ContactPointRule:number
    binWidth:number
    binHeight:number
    allowRotate:boolean
    usedRectangles:Array<Rect>
    freeRectangles:Array<Rect>
    score1:number
    score2:number
    bestShortSideFit:number
    bestLongSideFit:number

    constructor(width:number, height:number, rotations:boolean = true){
        this.usedRectangles = []
        this.freeRectangles = []
        this.score1 = 0
        this.score2 = 0
        this.init(width, height, rotations)
    }

    init(width:number, height:number, rotations:boolean = true) {
        if( !this.isPowerOfTwo(width) || !this.isPowerOfTwo(height))
            throw new Error("Must be 2,4,8,16,32,...512,1024,...")
        this.binWidth = width
        this.binHeight = height
        this.allowRotate = rotations
        var n = new Rect(0,0,width,height)
        this.freeRectangles.push(n)
    }
    isPowerOfTwo(nums:number):boolean{
        return 0===(nums&nums-1)
    }
    insert(width:number, height:number, method:number):Rect {
        var newNode = new Rect()
        this.score1 = 0
        this.score2 = 0
        switch(method) {
        case RectsBin.BestShortSideFit:
            newNode = this.findPositionForNewNodeBestShortSideFit(width, height)
            break
        case RectsBin.BottomLeftRule:
            newNode = this.findPositionForNewNodeBottomLeft(width, height, this.score1, this.score2)
            break
        case RectsBin.ContactPointRule: 
            newNode = this.findPositionForNewNodeContactPoint(width, height, this.score1)
            break
        case RectsBin.BestLongSideFit:
            newNode = this.findPositionForNewNodeBestLongSideFit(width, height, this.score2, this.score1) 
            break
        case RectsBin.BestAreaFit:
            newNode = this.findPositionForNewNodeBestAreaFit(width, height, this.score1, this.score2)
            break
    }
        if (newNode.h == 0)
            return newNode
        this.placeRectangle(newNode)
        return newNode
    }
    insert2( rectangles:Array<Rect>, dst:Array<Rect>, method:number) {
        dst.length = 0
        while(rectangles.length > 0) {
            var bestScore1 = Number.MAX_VALUE
            var bestScore2 = Number.MAX_VALUE
            var bestRectangleIndex = -1
            var bestNode:Rect = new Rect()
            for(var i = 0; i < rectangles.length; ++i) {
                var score1 = 0
                var score2 = 0
                var newNode = this.scoreRectangle(rectangles[i].w,rectangles[i].h, method, score1, score2)
                if (score1 < bestScore1 || (score1 == bestScore1 && score2 < bestScore2)) {
                    bestScore1 = score1
                    bestScore2 = score2
                    bestNode = newNode
                    bestRectangleIndex = i
                }
           }
           if (bestRectangleIndex == -1)
                return
           this.placeRectangle(bestNode)
           rectangles.splice(bestRectangleIndex,1)
       }
   }
   
    placeRectangle(node:Rect) {
        var numRectanglesToProcess = this.freeRectangles.length
        for(var i = 0; i < numRectanglesToProcess; i++) {
            if (this.splitFreeNode(this.freeRectangles[i], node)) {
                this.freeRectangles.splice(i,1)
                --i
                --numRectanglesToProcess
           }
       }
       this.pruneFreeList()
       this.usedRectangles.push(node)
    }
   
    scoreRectangle( width:number, height:number, method:number, score1:number, score2:number):Rect {
        var newNode:Rect = new Rect()
        score1 = Number.MAX_VALUE
        score2 = Number.MAX_VALUE
        switch(method) {
        case RectsBin.BestShortSideFit: 
            newNode = this.findPositionForNewNodeBestShortSideFit(width, height)
            break
        case RectsBin.BottomLeftRule: 
            newNode = this.findPositionForNewNodeBottomLeft(width, height, score1,score2)
            break
        case RectsBin.ContactPointRule: 
            newNode = this.findPositionForNewNodeContactPoint(width, height, score1)
            score1 = -score1 // Reverse since we are minimizing, but for contact point score bigger is better.
            break
        case RectsBin.BestLongSideFit: 
            newNode = this.findPositionForNewNodeBestLongSideFit(width, height, score2, score1)
            break
        case RectsBin.BestAreaFit: 
            newNode = this.findPositionForNewNodeBestAreaFit(width, height, score1, score2)
            break
        }
        // Cannot fit the current Rectangle.
        if (newNode.h == 0) {
            score1 = Number.MAX_VALUE
            score2 = Number.MAX_VALUE
        }
       return newNode
    }
   
    /// Computes the ratio of used surface area.
    occupancy():number {
        var usedSurfaceArea = 0
        for(var i = 0; i < this.usedRectangles.length; i++)
            usedSurfaceArea += this.usedRectangles[i].w * this.usedRectangles[i].h
        return usedSurfaceArea / (this.binWidth * this.binHeight)
    }
       
    findPositionForNewNodeBottomLeft(width:number, height:number, bestY:number, bestX:number) {
        var bestNode:Rect = new Rect()
        bestY = Number.MAX_VALUE
        var rect:Rect
        var topSideY:number
        for(var i = 0; i <  this.freeRectangles.length; i++) {
            rect = this.freeRectangles[i]
            // Try to place the Rectangle in upright (non-flipped) orientation.
            if (rect.w >= width && rect.h >= height) {
                topSideY = rect.y + height
                if (topSideY < bestY || (topSideY == bestY && rect.x < bestX)) {
                    bestNode.x = rect.x
                    bestNode.y = rect.y
                    bestNode.w = width
                    bestNode.h = height
                    bestY = topSideY
                    bestX = rect.x
                }
           }
           if (this.allowRotate && rect.w >= height && rect.h >= width) {
                topSideY = rect.y + width
                if (topSideY < bestY || (topSideY == bestY && rect.x < bestX)) {
                    bestNode.x = rect.x
                    bestNode.y = rect.y
                    bestNode.w = height
                    bestNode.h = width
                    bestY = topSideY
                    bestX = rect.x
                }
           }
       }
       return bestNode
    }
    findPositionForNewNodeBestShortSideFit(width:number, height:number):Rect {
        var bestNode:Rect = new Rect()
        this.bestShortSideFit = Number.MAX_VALUE
        this.bestLongSideFit = this.score2
        var rect:Rect
        var leftoverHoriz:number
        var leftoverVert:number
        var shortSideFit:number
        var longSideFit:number
     
        for(var i = 0; i < this.freeRectangles.length; i++) {
            rect = this.freeRectangles[i]
            // Try to place the Rectangle in upright (non-flipped) orientation.
            if (rect.w >= width && rect.h >= height) {
                leftoverHoriz = Math.abs(rect.w - width)
                leftoverVert = Math.abs(rect.h - height)
                shortSideFit = Math.min(leftoverHoriz, leftoverVert)
                longSideFit = Math.max(leftoverHoriz, leftoverVert)
                if (shortSideFit < this.bestShortSideFit || (shortSideFit == this.bestShortSideFit && longSideFit < this.bestLongSideFit)) {
                    bestNode.x = rect.x
                    bestNode.y = rect.y
                    bestNode.w = width
                    bestNode.h = height
                    this.bestShortSideFit = shortSideFit
                    this.bestLongSideFit = longSideFit
                }
            }
            var flippedLeftoverHoriz:number
            var flippedLeftoverVert:number
            var flippedShortSideFit:number
            var flippedLongSideFit:number
            if (this.allowRotate && rect.w >= height && rect.h >= width) {
                var flippedLeftoverHoriz = Math.abs(rect.w - height)
                var flippedLeftoverVert = Math.abs(rect.h - width)
                var flippedShortSideFit = Math.min(flippedLeftoverHoriz, flippedLeftoverVert)
                var flippedLongSideFit = Math.max(flippedLeftoverHoriz, flippedLeftoverVert)
             
               if (flippedShortSideFit < this.bestShortSideFit || (flippedShortSideFit == this.bestShortSideFit && flippedLongSideFit < this.bestLongSideFit)) {
                    bestNode.x = rect.x
                    bestNode.y = rect.y
                    bestNode.w = height
                    bestNode.h = width
                    this.bestShortSideFit = flippedShortSideFit
                    this.bestLongSideFit = flippedLongSideFit
                }
            }
        }
        return bestNode
    }
   
    findPositionForNewNodeBestLongSideFit(width:number, height:number, bestShortSideFit:number, bestLongSideFit:number):Rect {
        var bestNode:Rect = new Rect()
        //memset(&bestNode, 0, sizeof(Rectangle))
        bestLongSideFit = Number.MAX_VALUE
        var rect:Rect
        var leftoverHoriz:number
        var leftoverVert:number
        var shortSideFit:number
        var longSideFit:number
        for(var i = 0; i < this.freeRectangles.length; i++) {
            rect = this.freeRectangles[i]
            // Try to place the Rectangle in upright (non-flipped) orientation.
            if (rect.w >= width && rect.h >= height) {
                leftoverHoriz = Math.abs(rect.w - width)
                leftoverVert = Math.abs(rect.h - height)
                shortSideFit = Math.min(leftoverHoriz, leftoverVert)
                longSideFit = Math.max(leftoverHoriz, leftoverVert)
                if (longSideFit < bestLongSideFit || (longSideFit == bestLongSideFit && shortSideFit < bestShortSideFit)) {
                    bestNode.x = rect.x
                    bestNode.y = rect.y
                    bestNode.w = width
                    bestNode.h = height
                    bestShortSideFit = shortSideFit
                    bestLongSideFit = longSideFit
                }
           }
           if (this.allowRotate && rect.w >= height && rect.h >= width) {
                leftoverHoriz = Math.abs(rect.w - height)
                leftoverVert = Math.abs(rect.h - width)
                shortSideFit = Math.min(leftoverHoriz, leftoverVert)
                longSideFit = Math.max(leftoverHoriz, leftoverVert)
                if (longSideFit < bestLongSideFit || (longSideFit == bestLongSideFit && shortSideFit < bestShortSideFit)) {
                    bestNode.x = rect.x
                    bestNode.y = rect.x
                    bestNode.w = height
                    bestNode.h = width
                    bestShortSideFit = shortSideFit
                    bestLongSideFit = longSideFit
                }
           }
       }
       return bestNode
   }
   
    findPositionForNewNodeBestAreaFit(width:number, height:number, bestAreaFit:number, bestShortSideFit:number):Rect {
        var bestNode:Rect = new Rect()
        //memset(&bestNode, 0, sizeof(Rectangle))
        bestAreaFit = Number.MAX_VALUE
        var rect:Rect
        var leftoverHoriz:number
        var leftoverVert:number
        var shortSideFit:number
        var areaFit:number
       
        for(var i = 0; i < this.freeRectangles.length; i++) {
            rect = this.freeRectangles[i]
            areaFit = rect.w * rect.h - width * height
         
            // Try to place the Rectangle in upright (non-flipped) orientation.
            if (rect.w >= width && rect.h >= height) {
                leftoverHoriz = Math.abs(rect.w - width)
                leftoverVert = Math.abs(rect.h - height)
                shortSideFit = Math.min(leftoverHoriz, leftoverVert)
                if (areaFit < bestAreaFit || (areaFit == bestAreaFit && shortSideFit < bestShortSideFit)) {
                    bestNode.x = rect.x
                    bestNode.y = rect.y
                    bestNode.w = width
                    bestNode.h = height
                    bestShortSideFit = shortSideFit
                    bestAreaFit = areaFit
                }
           }
           
           if (this.allowRotate && rect.w >= height && rect.h >= width) {
                leftoverHoriz = Math.abs(rect.w - height)
                leftoverVert = Math.abs(rect.h - width)
                shortSideFit = Math.min(leftoverHoriz, leftoverVert)
                if (areaFit < bestAreaFit || (areaFit == bestAreaFit && shortSideFit < bestShortSideFit)) {
                    bestNode.x = rect.x
                    bestNode.y = rect.y
                    bestNode.w = height
                    bestNode.h = width
                    bestShortSideFit = shortSideFit
                    bestAreaFit = areaFit
                }
           }
       }
       return bestNode
   }
   
    /// Returns 0 if the two intervals i1 and i2 are disjoint, or the length of their overlap otherwise.
    commonIntervalLength(i1start:number, i1end:number, i2start:number, i2end:number):number {
        if (i1end < i2start || i2end < i1start)
            return 0
        return Math.min(i1end, i2end) - Math.max(i1start, i2start)
    }

    contactPointScoreNode(x:number, y:number, width:number, height:number):number {
       var score:number = 0
       if (x == 0 || x + width == this.binWidth)
            score += height
       if (y == 0 || y + height == this.binHeight)
            score += width
            var rect:Rect
        for(var i:number = 0; i < this.usedRectangles.length; i++) {
            rect = this.usedRectangles[i]
            if (rect.x == x + width || rect.x + rect.w == x)
                score += this.commonIntervalLength(rect.y, rect.y + rect.h, y, y + height)
            if (rect.y == y + height || rect.y + rect.h == y)
                score += this.commonIntervalLength(rect.x, rect.x + rect.w, x, x + width)
       }
       return score
    }
   
    findPositionForNewNodeContactPoint(width:number, height:number, bestContactScore:number):Rect {
        var bestNode:Rect = new Rect()
        // memset(&bestNode, 0, sizeof(Rectangle))
        bestContactScore = -1
    
        var rect:Rect
        var score:number
        for(var i:number = 0; i < this.freeRectangles.length; i++) {
            rect = this.freeRectangles[i]
            // Try to place the Rectangle in upright (non-flipped) orientation.
            if (rect.w >= width && rect.h >= height) {
                score = this.contactPointScoreNode(rect.x, rect.y, width, height)
                if (score > bestContactScore) {
                    bestNode.x = rect.x
                    bestNode.y = rect.y
                    bestNode.w = width
                    bestNode.h = height
                    bestContactScore = score
                }
            }
            if (this.allowRotate && rect.w >= height && rect.h >= width) {
                score = this.contactPointScoreNode(rect.x, rect.y, height, width)
                if (score > bestContactScore) {
                    bestNode.x = rect.x
                    bestNode.y = rect.y
                    bestNode.w = height
                    bestNode.h = width
                    bestContactScore = score
                }
            }
        }
        return bestNode
    }
    splitFreeNode(freeNode:Rect, usedNode:Rect):boolean {
        // Test with SAT if the Rectangles even intersect.
        if (usedNode.x >= freeNode.x + freeNode.w || usedNode.x + usedNode.w <= freeNode.x ||
            usedNode.y >= freeNode.y + freeNode.h || usedNode.y + usedNode.h <= freeNode.y)
            return false
        var newNode:Rect
        if (usedNode.x < freeNode.x + freeNode.w && usedNode.x + usedNode.w > freeNode.x) {
            // New node at the top side of the used node.
            if (usedNode.y > freeNode.y && usedNode.y < freeNode.y + freeNode.h) {
                newNode = freeNode.clone()
                newNode.h = usedNode.y - newNode.y
                this.freeRectangles.push(newNode)
            }
           
           // New node at the bottom side of the used node.
           if (usedNode.y + usedNode.h < freeNode.y + freeNode.h) {
                newNode = freeNode.clone()
                newNode.y = usedNode.y + usedNode.h
                newNode.h = freeNode.y + freeNode.h - (usedNode.y + usedNode.h)
                this.freeRectangles.push(newNode)
         }
       }
       
       if (usedNode.y < freeNode.y + freeNode.h && usedNode.y + usedNode.h > freeNode.y) {
            // New node at the left side of the used node.
            if (usedNode.x > freeNode.x && usedNode.x < freeNode.x + freeNode.w) {
                newNode = freeNode.clone()
                newNode.w = usedNode.x - newNode.x
                this.freeRectangles.push(newNode)
            }
           
            // New node at the right side of the used node.
            if (usedNode.x + usedNode.w < freeNode.x + freeNode.w) {
                newNode = freeNode.clone()
                newNode.x = usedNode.x + usedNode.w
                newNode.w = freeNode.x + freeNode.w - (usedNode.x + usedNode.w)
                this.freeRectangles.push(newNode)
            }
       }
       return true
    }
   
    pruneFreeList() {
        for(var i:number = 0; i < this.freeRectangles.length; i++){
            for(var j:number = i+1; j < this.freeRectangles.length; j++) {
                if (this.isContainedIn(this.freeRectangles[i], this.freeRectangles[j])) {
                    this.freeRectangles.splice(i,1)
                    break
                }
                if (this.isContainedIn(this.freeRectangles[j], this.freeRectangles[i])) {
                    this.freeRectangles.splice(j,1)
                }
            }
        }
    }
   
    isContainedIn(a:Rect, b:Rect):boolean {
        return a.x >= b.x && a.y >= b.y && a.x+a.w <= b.x+b.w && a.y+a.h <= b.y+b.h
    }
} 
RectsBin.BestShortSideFit = 0 ///< -BSSF: Positions the Rectangle against the short side of a free Rectangle into which it fits the best.
RectsBin.BestLongSideFit = 1  ///< -BLSF: Positions the Rectangle against the long side of a free Rectangle into which it fits the best.
RectsBin.BestAreaFit = 2      ///< -BAF: Positions the Rectangle into the smallest free Rectangle into which it fits.
RectsBin.BottomLeftRule = 3,  ///< -BL: Does the Tetris placement.
RectsBin.ContactPointRule = 4 ///< -CP: Choosest the placement where the Rectangle touches other Rectangles as much as possible.