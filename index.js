// import React from 'react';
// import ReactDOM from 'react-dom';
// import App from './app/App.js';
// ReactDOM.render(<App/>, document.getElementById('app'));
// //

import Engine from './fiengine/Engine'
import SceneKeeper from './fiengine/keepers/SceneKeeper'
import LaunchScene from './app/LaunchScene'
var appDiv = document.getElementById('app')
var canvas = document.createElement('canvas')
appDiv.appendChild(canvas)
Engine.getInstance()
  .launch(canvas)
  .setSize(800,600)
  .setBackgroundColor('black')

SceneKeeper.getInstance().run(new LaunchScene());
