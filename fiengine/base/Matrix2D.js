import Matrix from './Matrix'
export default class Matrix2D{
  constructor(){
    this.matrix = new Matrix(3,3,[
      1,0,0,
      0,1,0,
      0,0,1
    ])
  }
  translate(x,y){
    var ret = new Matrix2D();
    ret.matrix = this.matrix.copy()
    ret.matrix.tranElement(0,2,x)
    ret.matrix.tranElement(1,2,y)
    return ret
  }
  toString(){
    return this.matrix.toString()
  }
  multiply(m){
    var ret = new Matrix2D();
    ret.matrix = this.matrix.multiply(typeof m==='number'?m:m.matrix)
    return ret
  }
}
