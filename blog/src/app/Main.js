import React, { Component } from 'react'
import marked from 'marked'
import Catalog from '../base/CatalogNode'
import PDFView from '../components/PDFView'
import MarkDownView from '../components/MarkDownView'
class CatalogNode {
  constructor(level){
    this.parent = null;
    this.level = Number(level);
    this.children = []
    this.open = true
  }
  hasParent(){
    return this.parent === null
  }
  addChild(child){
    var parent = this;
    while(parent){
      if(parent.level < child.level){
        parent.children.push(child);
        child.parent = parent
        break;
      }
      parent = parent.parent
    }
    return child;
  }

  getRoot(){
    var ret = this;
    while(ret.parent){
      ret = ret.parent
    }
    return ret;
  }
  getName(){
    if(!this.parent){
      return 'catalog_0'
    }else{
      for(var i = 0; i < this.parent.children.length; ++i){
        if(this.parent.children[i]==this){
          return this.parent.getName()+'_'+i
        }
      }
    }
  }
}

export default class Main extends Component{
  async componentDidMount(){
    this.forceUpdate()
  }

  pickCatalog(node){
    var catalogNode = new CatalogNode(0);
    for(var i = 0; i < node.childNodes.length; ++i){
      var child = node.childNodes[i]
      var { tagName } = child;
      if( tagName && tagName.match(/H[1-6]/)){
        var level = tagName[1];
        catalogNode = catalogNode.addChild(new CatalogNode(level))
        child.id = catalogNode.getName();
        catalogNode.title = child.innerHTML;
      }
    }
    this.catalogNode = catalogNode.getRoot()
  }

  renderCatalogNode(catalogNode,idx){
    return (
      <div key={idx} style={{display:'flex',flexDirection:'column',userSelect:"none"}}>
        {
          catalogNode.parent &&
          <div style={{display:'flex',cursor:'pointer'}}>
            {
              <div
              style={catalogNode.children.length>0?null:{color:'transparent'}}
              onClick={()=>{
                catalogNode.open = !catalogNode.open
                this.forceUpdate();
              }}>
              {catalogNode.open?'○':'●'}
              </div>
            }
            <div onClick={()=>{
              window.location.hash = catalogNode.getName()
            }}>
            {catalogNode.title}
            </div>
          </div>
        }
        {
          catalogNode.open &&
          <div style={{display:'flex',flexDirection:'column',paddingLeft:20}}>
            {catalogNode.children.map(this.renderCatalogNode.bind(this))}
          </div>
        }
      </div>
    )
  }
  onGetMDContent(){

  }
  render(){
    return (
      <div ref={'root'} style={{display:'flex',height:'100%',position:'absolute'}}>

{
  // <div ref={'catalog'} style={{flex:1}}>
  // {this.catalogNode && this.renderCatalogNode(this.catalogNode)}
  // </div>
}

        <MarkDownView url='/res/md/test.md' onGetContent={this.onGetMDContent.bind(this)}style={{flex:1,overflow:'auto'}}/>
        <PDFView url='/res/pdf/test.pdf' defaultPageScale={1} pageNumber={1} style={{alignSelf:'flex-start'}}/>

      </div>
    )
  }
}
