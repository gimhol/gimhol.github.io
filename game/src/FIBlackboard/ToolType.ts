export default class ToolType {
    _value:Number
    _desc:String
    constructor(value:Number, desc:String){
        this._value = value
        this._desc = desc
    }
    value():Number{ return this._value; }
    desc():String{ return this._desc; }

    static Invalid: ToolType
    static Pen: ToolType
}
ToolType.Invalid = new ToolType(0, "Invalid")
ToolType.Pen = new ToolType(1, "Pen")