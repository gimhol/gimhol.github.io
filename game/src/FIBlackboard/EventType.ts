export default class EventType {
    _value:number
    _desc:string
    constructor(value:number, desc:string){
        this._value = value
        this._desc = desc
    }
    value():number{ return this._value; }
    desc():string{ return this._desc; }
    toString():string { return "["+this._value+"]"+this._desc}
    
    static Invalid: EventType
    static ItemMoving: EventType
    static ItemMoved: EventType
    static ItemDeleted: EventType
    static PenDown: EventType
    static PenDraw: EventType
    static PenDone: EventType
    static TextAdded: EventType
    static TextChanged: EventType
    static TextDone: EventType
    static RectAdded: EventType
    static RectChanged: EventType
    static RectDone: EventType
    static EllipseAdded: EventType
    static EllipseChanged: EventType
    static EllipseDone: EventType
}

EventType.Invalid       = new EventType(0, "Invalid")

EventType.ItemMoving    = new EventType(1, "ItemMoving")
EventType.ItemMoved     = new EventType(2, "ItemMoved")
EventType.ItemDeleted   = new EventType(3, "ItemDeleted")

EventType.PenDown       = new EventType(1000, "PenDown")
EventType.PenDraw       = new EventType(1001, "PenDraw")
EventType.PenDone       = new EventType(1002, "PenDone")

EventType.TextAdded     = new EventType(2000, "TextAdded")
EventType.TextChanged   = new EventType(2001, "TextChanged")
EventType.TextDone      = new EventType(2002, "TextDone")

EventType.RectAdded     = new EventType(3000, "RectAdded")
EventType.RectChanged   = new EventType(3001, "RectChanged")
EventType.RectDone      = new EventType(3002, "RectDone")

EventType.EllipseAdded     = new EventType(4000, "EllipseAdded")
EventType.EllipseChanged   = new EventType(4001, "EllipseChanged")
EventType.EllipseDone      = new EventType(4002, "EllipseDone")