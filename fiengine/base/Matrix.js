export default class Matrix {
  constructor(cols,rows,elements){
    this.cols = Math.floor(cols)
    this.rows = Math.floor(rows)
    if( elements.length != this.cols * this.rows ){
      console.error('Matrix','number of elements is not correct!')
    }
    this.elements = elements.map((element)=>{
      var ret = Number(element)
      if( isNaN(ret) ){
        console.error('Matrix','element is not correct !')
      }
      return ret;
    })
  }
  copy(){
    return new Matrix(this.cols,this.rows,this.elements.map(element=>element))
  }
  setElement(x,y,v){
    this.elements[y*this.cols + x] = v
  }
  getElement(x,y){
    return this.elements[y*this.cols + x]
  }
  tranElement(x,y,v){
    return this.elements[y*this.cols + x] += v
  }
  add(m){
    if( !this._additiveWith(m) ){
      console.error('Matrix','fail to add')
    }
    return new Matrix(this.cols,this.rows,this.elements.map((element,idx)=>(element+m.elements[idx])))
  }
  sub(m){
    if( !this._additiveWith(m) ){
      console.error('Matrix','fail to sub')
    }

    return new this.__proto__.constructor(this.cols, this.rows, this.elements.map((element,idx)=>(element-m.elements[idx])))
  }
  _additiveWith(m){
    return this.cols === m.cols && this.rows === m.rows
  }
  multiply(m){
    if(typeof m === 'number'){
      return new Matrix(this.cols,this.rows,this.elements.map((element,idx)=>(element*m)))
    }
    if(this.rows != m.cols || m.rows != this.cols){
      console.log(this,m)
      return console.error('Matrix','fail to multiply')
    }
    var elements = []
    var cols = m.cols;
    var rows = this.rows;
    for(var y = 0; y < rows ; ++y ){
      for(var x = 0; x < cols ; ++x ){
        var element = 0
        for(var i = 0; i < this.cols; ++i ){
          element += this.getElement(i,y)*m.getElement(x,i)
        }
        elements.push(element)
      }
    }
    return new Matrix(cols,rows,elements)
  }
  toString(){
    var ret = ''
    for(var y = 0; y < this.rows ; ++y ){
      for(var x = 0; x < this.cols ; ++x ){
        ret += this.elements[y*this.cols + x]
        if(x != this.cols-1){
          ret += ','
        }
      }
      if(y != this.rows-1){
        ret += '\n'
      }
    }
    return ret
  }
}
