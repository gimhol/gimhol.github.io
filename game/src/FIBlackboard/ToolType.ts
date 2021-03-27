export default class ToolType {
    _value:number
    _desc:string
    constructor(value:number, desc:string){
        this._value = value
        this._desc = desc
    }
    value():number{ return this._value; }
    desc():string{ return this._desc; }
    toString():string { return "["+this._value+"]"+this._desc}
    
    static Invalid: ToolType
    static Pen: ToolType
    static Picker: ToolType
}
ToolType.Invalid = new ToolType(0, "Invalid")
ToolType.Picker = new ToolType(1, "Picker")
ToolType.Pen = new ToolType(2, "Pen")