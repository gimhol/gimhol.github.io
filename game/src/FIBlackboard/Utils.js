export default class Utils{} 
Utils.makeGetter = function(cls,member){
	var memeberName = member.replace(member[0],member[0].toUpperCase())
	var getterName = 'get' + memeberName
	cls.prototype[getterName] = function(v){ return this[member] }
}
Utils.makeSetter = function(cls,member){
	var memeberName = member.replace(member[0],member[0].toUpperCase())
	var setterName = 'set' + memeberName
	cls.prototype[setterName] = function(v){ return this[member] }
}
Utils.makeGetterSetter = function(cls,member){
	var memeberName = member.replace(member[0],member[0].toUpperCase())
	var getterName = 'get' + memeberName
	cls.prototype[getterName] = function(v){ return this[member] }
	var setterName = 'set' + memeberName
	cls.prototype[setterName] = function(v){ return this[member] }
}
Utils.makeLogger = function(cls){
    cls.prototype.log = console.log
    cls.prototype.debug = console.debug
    cls.prototype.warn = console.warn
    cls.prototype.error = console.error
    cls.prototype.info = console.info
}