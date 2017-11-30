import React, { Component } from 'react';
import { AbsoluteFill } from './GlobalStyles';

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
  componentWillMount(){
    var lastTimestamp = 0
    this.looper = (timestamp)=>{
      this.loop(timestamp-lastTimestamp)
      lastTimestamp = timestamp;
      window.requestAnimationFrame(this.looper)
    }
    this.looper(0);
  }
  loop(dt){
    console.log(dt)
  }

  render(){

    return (
      <div style={styles.root}>
        {'Hello'}
      </div>
    )
  }
}
