export default class Rect{
  static intersectWith(r1,r2){
    var l = Math.max( r1.x, r2.x );
    var r = Math.min( r1.x + r1.w, r2.x + r2.w);
    var w = r-l;
    if(w < 0)
      return null;

    var t = Math.max( r1.y, r2.y );
    var b = Math.min( r1.y + r1.h, r2.y + r2.h);
    var h = b-t;
    if(h < 0)
      return null;

    return new Rect(l, t, w, h);
  }
  constructor(x,y,w,h){
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }
  intersectWith(r){
    return Rect.intersectWith(this,r);
  }
}
