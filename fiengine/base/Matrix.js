export default class Matrix {
  constructor(width,height,elements){
    this.width = Math.floor(width)
    this.height = Math.floor(height)
    if( elements.length != this.width * this.height ){
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
  add(m){
    return new Matrix(this.width,this.height,this.elements.map((element,idx)=>(element+m.elements[idx])))
  }
  sub(m){
    return new Matrix(this.width, this.height, this.elements.map((element,idx)=>(element-m.elements[idx])))
  }
  multiply(m){
    var elements = []

    

    return new Matrix(this.height, this.height, elements)
  }
  rotate(deg){

  }
  toString(){
    var ret = ''
    for(var y = 0; y < this.height ; ++y ){
      for(var x = 0; x < this.width ; ++x ){
        ret += this.elements[y*this.width + x]
        if(x != this.width-1){
          ret += ','
        }
      }
      if(y != this.height-1){
        ret += '\n'
      }
    }
    return ret
  }
}
