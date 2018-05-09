import React, { Component } from 'react'
import marked from 'marked'
class MarkDownView extends Component{
  onGetContent(xmlhttp){
    if (xmlhttp.readyState==4 && xmlhttp.status==200){
      this.refs.content.innerHTML = marked(xmlhttp.responseText);
      this.props.onGetContent && this.props.onGetContent(xmlhttp.responseText)
    }
  }
  componentWillMount(){
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = this.onGetContent.bind(this,xmlhttp);
    xmlhttp.open("GET",this.props.url,true);
    xmlhttp.send();
  }
  render(){
    var props = {
      style : this.props.style
    }
    return (
      <div ref={'content'} {...props}/>
    )
  }
}

export default MarkDownView;
