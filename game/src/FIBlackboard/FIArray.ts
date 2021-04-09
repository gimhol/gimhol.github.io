export default class FIArray<T> extends Array<T>{
    constructor() {
        super()
        Object.setPrototypeOf(this,FIArray.prototype)
    }
    firstOrNull(condition:(item:T)=>boolean):T{
        for(let i = 0, len = this.length; i < len; ++i){
            let item:T = this[i]
            if(condition(item))
                return item
        }
        return null
    }
    lastOrNull(predicate:(item:T)=>boolean):T{
        for(let i = this.length - 1; i >= 0; --i){
            let item = this[i]
            if(predicate(item))
                return item
        }
        return null
    }
    removeOnce(predicate:(item:T)=>boolean):T{
        for(let i = 0, len = this.length; i < len; ++i){
            let item = this[i]
            if(predicate(item)){
                this.splice(i,1)
                break
            }
        }
        return null
    }
    filter(predicate:(item:T, index: number, array: T[])=>boolean):FIArray<T> {
        super.filter
        let ret = new FIArray<T>()
        for(let i = 0, len = this.length; i < len; ++i){
            let item = this[i]
            if(predicate(item, i, this))
                ret.push(item)
        }
        return ret
    }
}
