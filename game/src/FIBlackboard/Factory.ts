
import ToolType from "./ToolType"
import ItemData from "./ItemData"
import Item from "./Item"
import ItemPenData from "./ItemPenData"
import ItemPen from "./ItemPen"
export default class Factory {
	dataClsMap: Map<number,new ()=>ItemData>
	itemClsMap: Map<number,new ()=>Item>
	constructor(){
		this.dataClsMap = new Map
		this.itemClsMap = new Map

		this.dataClsMap.set(ToolType.Pen.value(),ItemPenData)
		this.itemClsMap.set(ToolType.Pen.value(),ItemPen)
		console.log(this.itemClsMap.get(ToolType.Pen.value()))
	}
	createItemId(type:ToolType){ return ''+type+'_'+new Date().getTime() }
	createItemData(type:ToolType):ItemData { 
		const Cls = this.dataClsMap.get(type.value())
		return Cls?(new Cls):null
	}
	createItem(type:ToolType):Item{ 
		let data = this.createItemData(type)
		if(!data)
			return null
		const Cls = this.itemClsMap.get(type.value())
		if(!Cls)
			return null
		let item = new Cls
		item.setData(data)
		return item
	}
}