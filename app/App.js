import React, { Component } from 'react';
import Engine from './Engine'
const styles = {
  root:{
    position:'absolute',
    top:0,
    bottom:0,
    left:0,
    right:0,
    backgroundColor:'black',
  }
}

export default class App extends Component{
  constructor(props){
    super(props);
    this.gameEngine = Engine.getInstance();
  }
  onKeyDown(e){
    console.log(e)
  }
  onKeyUp(e){
    console.log(e)
  }
  componentDidMount(){
    this.gameEngine.launch(this.canvas)
    document.addEventListener('keydown',this.onKeyDown.bind(this))
    document.addEventListener('keyup',this.onKeyUp.bind(this))
  }
  render(){
    return (
      <div style={styles.root}>
        <canvas ref={(ref)=>{ this.canvas = ref }}/>
      </div>
    )
  }
}
