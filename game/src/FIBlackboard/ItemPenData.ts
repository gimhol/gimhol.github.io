import ItemData from './ItemData'
import ToolType from './ToolType'
export default class ItemPenData extends ItemData {
    coords: Array<number>
    constructor(){
        super(ToolType.Pen)
        this.coords = []
    }
}