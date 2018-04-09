var appDiv = document.createElement('div');
document.getElementsByTagName("body")[0].appendChild(appDiv);

import React from 'react';
import ReactDOM from 'react-dom';
import Main from './app/Main.js';
ReactDOM.render(<Main/>,appDiv);
