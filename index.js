// import React from 'react';
// import ReactDOM from 'react-dom';
// import App from './app/App.js';
// ReactDOM.render(<App/>, document.getElementById('app'));
// //

import Engine from './fiengine/Engine'
import SceneKeeper from './fiengine/keepers/SceneKeeper'
import KeyboardCenter from './fiengine/input/KeyboardCenter'
import MouseCenter from './fiengine/input/MouseCenter'

import LaunchScene from './app/scenes/LaunchScene'
import MainScene from './app/scenes/MainScene'
import ButtonDemoScene from './app/scenes/ButtonDemoScene'

var appDiv = document.getElementById('app')

Engine.getInstance()
  .launch(appDiv)
  .setSize(1366,768);

KeyboardCenter.getInstance().launch();
MouseCenter.getInstance().launch();
SceneKeeper.getInstance().run(new LaunchScene());
