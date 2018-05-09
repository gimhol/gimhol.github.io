import React, { Component } from 'react'

class PDFView extends Component{
  constructor(props){
    super(props);
    this.state = {
      pageScale: props.pageScale || props.defaultPageScale || 1,

      defaultPageScale: props.defaultPageScale || props.pageScale || 1,

      pageNumber: props.pageNumber || 1,

      url: props.url
    }
  }

  componentWillMount(){
    this.state.url && this.readPDF();
  }

  _nextPropToState(nextProps,key){
    if(nextProps[key] && nextProps[key] != this.state[key]){
      this.setState({[key]: nextProps[key]})
      return true;
    }
    return false
  }

  _isStateChanged(lastState, key){
    return this.state[key] && lastState[key] != this.state[key]
  }

  componentWillReceiveProps(nextProps){
    if(this._nextPropToState(nextProps,'url')){
      this.setState({pageNumber:1, pageScale:this.state.defaultPageScale})
    }else{
      this._nextPropToState(nextProps,'pageNumber');
      this._nextPropToState(nextProps,'pageScale');
    }
    this._nextPropToState(nextProps,'defaultPageScale');
  }

  componentDidUpdate(lastProps, lastState){
    if(this._isStateChanged(lastState,'url')){
      this.readPDF();
    }else if(
      this._isStateChanged(lastState,'pageNumber') ||
      this._isStateChanged(lastState,'pageScale')
    ){
      this.displayPage();
    }
  }
  async readPDF(){
    var { url } = this.state;
    try{
      this.doc = await PDFJS.getDocument(url);
      return this.displayPage();
    }
    catch(e){
      return Promise.reject(e);
    }
  }

  async displayPage(){
    var { pageNumber, pageScale } = this.state;
    try{
      var page = await this.doc.getPage(pageNumber);
    }
    catch(e){
      return Promise.reject(e);
    }
    var canvas = this.refs.canvas
    var viewport = page.getViewport(pageScale);
    canvas.height = viewport.height;
    canvas.width = viewport.width;

    var renderContext = {
        viewport,
        canvasContext: canvas.getContext('2d'),
    };
    return page.render(renderContext);
  }


  render(){
    var props = {
      style: this.props.style
    }
    return(
      <canvas ref={'canvas'} {...props}/>
    )
  }
}

export default PDFView
