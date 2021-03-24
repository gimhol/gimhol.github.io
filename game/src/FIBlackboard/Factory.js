export default class BbFactory {
	createItemId(type){ return ''+type+'_'+new Date().getTime() }
	createItemData(type){ return null }
	createItem(type){ return null }
}