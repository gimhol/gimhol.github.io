import React, { Component } from 'react'

var styles = {
  root:{
    display:'flex',
    flexDirection:'column',
    userSelect:"none"
  },
  childrenContainer:{
    display:'flex',
    flexDirection:'column',
    paddingLeft:20
  }
}
class CatalogData {
  constructor(){
    this.index = 0;
    this.parent = null;
    this.title = "";
    this.children = [];
  }
  isEmpty(){
    return this.children.length === 0;
  }
  addChild(title){
    var child = new CatalogData(title)
    this.children.push(child)
    return child;
  }
  leave(){
    return this.parent;
  }
}

export default class Catalog extends Component{

  static createData(){
    return new CatalogData();
  }

  constructor(props){
    super(props)
  }

  onClickToggle(){
    catalogNode.open = !catalogNode.open
    this.forceUpdate();
  }

  onClick(){

  }

  render(){
    var isRoot = !this.props.parent;
    var isOpen = this.props.isOpen;
    var data = this.props.data;


    var title = data.title;
    var children = data.children;


    return(
      <div style={styles.root}>
        {
          <div
          style={catalogNode.children.length>0?null:{color:'transparent'}}
          onClick={this.onClickToggle.bind(this)}>
          {isOpen?'○':'●'}
          </div>
        }
        <div onClick={this.onClick.bind(this)}>{title}</div>

        {
          !isOpen ? null :
          <div style={styles.childrenContainer}>
            {children.map((data,idx)=><Catalog data={data}/>)}
          </div>
        }

      </div>
    )
  }


}
