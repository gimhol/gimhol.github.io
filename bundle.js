/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FI_Node = function () {
  function FI_Node() {
    _classCallCheck(this, FI_Node);

    this.children = [];
    this.components = [];
    this.actions = [];

    this.parent = null;
    this.position = { x: 0, y: 0 };
    this.anchor = { x: 0.5, y: 0.5 };
    this.size = { width: 0, height: 0 };
    this.scale = { x: 1, y: 1 };
    this.rotation = 0;
  }

  _createClass(FI_Node, [{
    key: 'onAdded',
    value: function onAdded() {}
  }, {
    key: 'onRemoved',
    value: function onRemoved() {}
  }, {
    key: 'onUpdate',
    value: function onUpdate() {}
  }, {
    key: 'addChild',
    value: function addChild(child) {
      if (child.getParent()) {
        return console.warn('has been added !');
      }
      this.children.push(child);
      child.onAdded();
    }
  }, {
    key: 'removeChild',
    value: function removeChild(child) {
      for (var i = 0; i < this.children.length; ++i) {
        if (this.children[i] == child) {
          this.children.splice(i, 1).onRemoved();
          return;
        }
      }
    }
  }, {
    key: 'getParent',
    value: function getParent() {
      return this.parent;
    }
  }, {
    key: 'setRotation',
    value: function setRotation(rotation) {
      this.rotation = rotation;
    }
  }, {
    key: 'getRotation',
    value: function getRotation() {
      return this.rotation;
    }
  }, {
    key: 'addComponent',
    value: function addComponent(component) {
      this.components.push(component);
      component.setNode(this);
      return component;
    }
  }, {
    key: 'addAction',
    value: function addAction(action) {
      this.actions.push(action);
      action.setNode(this);
      return action;
    }
  }, {
    key: 'removeAction',
    value: function removeAction(action) {
      for (var i = 0; i < this.actions.length; ++i) {
        if (this.actions[i] == action) {
          this.actions.splice(i, 1);
          return;
        }
      }
    }
  }, {
    key: 'getAnchorOffset',
    value: function getAnchorOffset() {
      return {
        x: this.anchor.x * this.size.width,
        y: this.anchor.y * this.size.height
      };
    }
  }, {
    key: 'update',
    value: function update(dt) {
      this.onUpdate(dt);
      for (var i in this.actions) {
        this.actions[i].update(dt);
      }
      for (var i in this.components) {
        this.components[i].update(dt);
      }
      for (var i in this.children) {
        this.children[i].update(dt);
      }
    }
  }, {
    key: 'draw',
    value: function draw(ctx) {
      ctx.translate(this.position.x, this.position.y);
      ctx.rotate(this.rotation * Math.PI / 180);
      ctx.scale(this.scale.x, this.scale.y);
      //ctx.translate(-this.position.x, -this.position.y);
      ctx.save();
      for (var i in this.components) {
        this.components[i].draw(ctx);
        ctx.restore();
        ctx.save();
      }
      for (var i in this.children) {
        this.children[i].draw(ctx);
        ctx.restore();
        ctx.save();
      }
      ctx.restore();
    }
  }, {
    key: 'debugDraw',
    value: function debugDraw(ctx) {}
  }]);

  return FI_Node;
}();

exports.default = FI_Node;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _FI_Component2 = __webpack_require__(2);

var _FI_Component3 = _interopRequireDefault(_FI_Component2);

var _ImageKeeper = __webpack_require__(8);

var _ImageKeeper2 = _interopRequireDefault(_ImageKeeper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FI_Image = function (_FI_Component) {
  _inherits(FI_Image, _FI_Component);

  function FI_Image(uri) {
    _classCallCheck(this, FI_Image);

    var _this = _possibleConstructorReturn(this, (FI_Image.__proto__ || Object.getPrototypeOf(FI_Image)).call(this));

    _this.imageUri = uri;
    return _this;
  }

  _createClass(FI_Image, [{
    key: 'onMount',
    value: function onMount() {
      this.loadImage(this.imageUri);
    }
  }, {
    key: 'loadImage',
    value: async function loadImage(uri) {
      try {
        this.image = await _ImageKeeper2.default.getImage(uri);
        this.texRect = { x: 0, y: 0, width: this.image.width, height: this.image.height };
      } catch (err) {
        console.warn(err);
      }
    }
  }, {
    key: 'draw',
    value: function draw(ctx) {
      if (this.image) {
        var anchorOffset = this.node.getAnchorOffset();
        ctx.drawImage(this.image, this.texRect.x, this.texRect.y, this.texRect.width, this.texRect.height, -anchorOffset.x, -anchorOffset.y, this.node.size.width, this.node.size.height);
      }
    }
  }]);

  return FI_Image;
}(_FI_Component3.default);

exports.default = FI_Image;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FI_Component = function () {
  function FI_Component() {
    _classCallCheck(this, FI_Component);
  }

  _createClass(FI_Component, [{
    key: 'onMount',
    value: function onMount() {}
  }, {
    key: 'onUnmount',
    value: function onUnmount() {}
  }, {
    key: 'setNode',
    value: function setNode(node) {
      if (this.node) {
        return console.warn('Component has been mounted!');
      }
      this.node = node;
      this.onMount();
    }
  }, {
    key: 'getNode',
    value: function getNode() {
      return this.node;
    }
  }, {
    key: 'update',
    value: function update() {}
  }, {
    key: 'draw',
    value: function draw() {}
  }, {
    key: 'debugDraw',
    value: function debugDraw() {}
  }]);

  return FI_Component;
}();

exports.default = FI_Component;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _FI_Component2 = __webpack_require__(2);

var _FI_Component3 = _interopRequireDefault(_FI_Component2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FI_Touchable = function (_FI_Component) {
  _inherits(FI_Touchable, _FI_Component);

  function FI_Touchable() {
    _classCallCheck(this, FI_Touchable);

    return _possibleConstructorReturn(this, (FI_Touchable.__proto__ || Object.getPrototypeOf(FI_Touchable)).apply(this, arguments));
  }

  _createClass(FI_Touchable, [{
    key: 'onMount',
    value: function onMount() {
      this.size = this.node.size;
      this.position = { x: 0, y: 0 };
    }
  }, {
    key: 'draw',
    value: function draw(ctx) {
      this.debugDraw(ctx);
    }
  }, {
    key: 'debugDraw',
    value: function debugDraw(ctx) {
      var anchorOffset = this.node.getAnchorOffset();
      ctx.strokeStyle = 'red';
      ctx.lineWidth = 5;
      ctx.strokeRect(this.position.x - anchorOffset.x, this.position.y - anchorOffset.y, this.size.width, this.size.height);
    }
  }]);

  return FI_Touchable;
}(_FI_Component3.default);

exports.default = FI_Touchable;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FI_RotationTo = exports.FI_RotationBy = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _FI_Action3 = __webpack_require__(10);

var _FI_Action4 = _interopRequireDefault(_FI_Action3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FI_RotationBy = exports.FI_RotationBy = function (_FI_Action) {
  _inherits(FI_RotationBy, _FI_Action);

  function FI_RotationBy(value, duration) {
    _classCallCheck(this, FI_RotationBy);

    var _this = _possibleConstructorReturn(this, (FI_RotationBy.__proto__ || Object.getPrototypeOf(FI_RotationBy)).call(this));

    _this.value = value;
    _this.duration = duration;
    _this.time = duration;
    return _this;
  }

  _createClass(FI_RotationBy, [{
    key: 'onAssign',
    value: function onAssign() {
      this.endValue = this.node.getRotation() + this.value;
      this.speed = this.value / this.duration;
    }
  }, {
    key: 'onFinish',
    value: function onFinish() {
      this.node.setRotation(this.endValue);
      this.node.removeAction(this);
    }
  }, {
    key: 'update',
    value: function update(dt) {
      var cur = this.node.getRotation();
      this.node.setRotation(cur + this.speed * dt);
      this.time -= dt;
      if (this.time <= 0) {
        this.onFinish();
      }
    }
  }]);

  return FI_RotationBy;
}(_FI_Action4.default);

var FI_RotationTo = exports.FI_RotationTo = function (_FI_Action2) {
  _inherits(FI_RotationTo, _FI_Action2);

  function FI_RotationTo() {
    _classCallCheck(this, FI_RotationTo);

    return _possibleConstructorReturn(this, (FI_RotationTo.__proto__ || Object.getPrototypeOf(FI_RotationTo)).call(this));
  }

  _createClass(FI_RotationTo, [{
    key: 'onAssign',
    value: function onAssign() {
      this.node = node;
    }
  }, {
    key: 'update',
    value: function update(dt) {}
  }]);

  return FI_RotationTo;
}(_FI_Action4.default);

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _FI_Node2 = __webpack_require__(0);

var _FI_Node3 = _interopRequireDefault(_FI_Node2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SceneKeeper = function (_FI_Node) {
  _inherits(SceneKeeper, _FI_Node);

  function SceneKeeper() {
    _classCallCheck(this, SceneKeeper);

    return _possibleConstructorReturn(this, (SceneKeeper.__proto__ || Object.getPrototypeOf(SceneKeeper)).apply(this, arguments));
  }

  _createClass(SceneKeeper, [{
    key: 'run',
    value: function run(scene) {
      this.addChild(scene);
    }
  }], [{
    key: 'getInstance',
    value: function getInstance() {
      if (!this.instance) {
        this.instance = new SceneKeeper();
      }
      return this.instance;
    }
  }]);

  return SceneKeeper;
}(_FI_Node3.default);

exports.default = SceneKeeper;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _Engine = __webpack_require__(7);

var _Engine2 = _interopRequireDefault(_Engine);

var _SceneKeeper = __webpack_require__(5);

var _SceneKeeper2 = _interopRequireDefault(_SceneKeeper);

var _LaunchScene = __webpack_require__(11);

var _LaunchScene2 = _interopRequireDefault(_LaunchScene);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var appDiv = document.getElementById('app'); // import React from 'react';
// import ReactDOM from 'react-dom';
// import App from './app/App.js';
// ReactDOM.render(<App/>, document.getElementById('app'));
// //

var canvas = document.createElement('canvas');
appDiv.appendChild(canvas);
_Engine2.default.getInstance().launch(canvas).setSize(800, 600).setBackgroundColor('black');

_SceneKeeper2.default.getInstance().run(new _LaunchScene2.default());

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _FI_Node = __webpack_require__(0);

var _FI_Node2 = _interopRequireDefault(_FI_Node);

var _FI_Image = __webpack_require__(1);

var _FI_Image2 = _interopRequireDefault(_FI_Image);

var _FI_Touchable = __webpack_require__(3);

var _FI_Touchable2 = _interopRequireDefault(_FI_Touchable);

var _FI_Rotation = __webpack_require__(4);

var _SceneKeeper = __webpack_require__(5);

var _SceneKeeper2 = _interopRequireDefault(_SceneKeeper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Engine = function () {
  _createClass(Engine, null, [{
    key: 'getInstance',
    value: function getInstance() {
      if (!this.instance) {
        this.instance = new Engine();
      }
      return this.instance;
    }
  }]);

  function Engine() {
    _classCallCheck(this, Engine);

    this.lastUpdateTime = 0;
    this.rootNode = new _FI_Node2.default();
    this.rootNode.children.push(_SceneKeeper2.default.getInstance());
  }

  _createClass(Engine, [{
    key: 'getSize',
    value: function getSize() {
      return {
        width: this.canvas.width,
        height: this.canvas.height
      };
    }
  }, {
    key: 'setSize',
    value: function setSize(w, h) {
      this.canvas.width = w;
      this.canvas.height = h;
      return this;
    }
  }, {
    key: 'setBackgroundColor',
    value: function setBackgroundColor(bc) {
      this.backgroundColor = bc;
      return this;
    }
  }, {
    key: 'launch',
    value: function launch(canvas) {
      this.canvas = canvas;
      this.setSize(800, 600);
      this.setBackgroundColor('white');
      this.ctx = this.canvas.getContext('2d');
      this.looper(0);
      return this;
    }
  }, {
    key: 'looper',
    value: function looper(updateTime) {
      this.update(updateTime - this.lastUpdateTime);
      this.draw();
      this.lastUpdateTime = updateTime;
      window.requestAnimationFrame(this.looper.bind(this));
    }
  }, {
    key: 'update',
    value: function update(dt) {
      this.rootNode.update(dt);
    }
  }, {
    key: 'draw',
    value: function draw() {
      var ctx = this.ctx;
      this.ctx.fillStyle = this.backgroundColor;
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
      ctx.save();
      this.rootNode.draw(ctx);
      ctx.restore();
    }
  }]);

  return Engine;
}();

exports.default = Engine;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _utils = __webpack_require__(9);

var Utils = _interopRequireWildcard(_utils);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ImageKeeper = function () {
  function ImageKeeper() {
    _classCallCheck(this, ImageKeeper);

    this.images = {};
  }

  _createClass(ImageKeeper, [{
    key: 'firstLoadImage',
    value: function firstLoadImage(uri) {
      var _this = this;

      return new Promise(function (resolve, reject) {
        var image = new Image();
        image.src = uri;
        image.onload = function () {
          for (var i in _this.images[uri]) {
            _this.images[uri][i].onload(image);
          }
          _this.images[uri] = image;
          return resolve(image);
        };
        image.onerror = function (err) {
          for (var i in _this.images[uri]) {
            _this.images[uri][i].onerror(err);
          }
          delete _this.images[uri];
          return reject(err);
        };
      });
    }
  }, {
    key: 'loadImage',
    value: function loadImage(uri) {
      var _this2 = this;

      return new Promise(function (resolve, reject) {
        _this2.images[uri].push({
          onload: resolve,
          onerror: reject
        });
      });
    }
  }, {
    key: 'getImage',
    value: function getImage(uri) {
      var image = this.images[uri];
      //not exist
      if (!image) {
        this.images[uri] = [];
        return this.firstLoadImage(uri);
      }
      //loading.
      else if (Utils.isArray(image)) {
          return this.loadImage(uri);
        }
        //already loaded.
        else {
            return Promise.resolve(image);
          }
    }
  }]);

  return ImageKeeper;
}();

exports.default = new ImageKeeper();

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var getClassName = exports.getClassName = function getClassName(a) {
  return Object.prototype.toString.call(a);
};

var isArray = exports.isArray = function isArray(a) {
  return getClassName(a) === '[object Array]';
};

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FI_Action = function () {
  function FI_Action() {
    _classCallCheck(this, FI_Action);
  }

  _createClass(FI_Action, [{
    key: "onAssign",
    value: function onAssign() {}
  }, {
    key: "onFinish",
    value: function onFinish() {}
  }, {
    key: "setNode",
    value: function setNode(node) {
      this.node = node;
      this.onAssign();
    }
  }, {
    key: "update",
    value: function update() {}
  }]);

  return FI_Action;
}();

exports.default = FI_Action;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _FI_Node = __webpack_require__(0);

var _FI_Node2 = _interopRequireDefault(_FI_Node);

var _FI_Image = __webpack_require__(1);

var _FI_Image2 = _interopRequireDefault(_FI_Image);

var _FI_Touchable = __webpack_require__(3);

var _FI_Touchable2 = _interopRequireDefault(_FI_Touchable);

var _FI_Rotation = __webpack_require__(4);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LaunchScene = function (_FI_Scene) {
  _inherits(LaunchScene, _FI_Scene);

  function LaunchScene() {
    _classCallCheck(this, LaunchScene);

    return _possibleConstructorReturn(this, (LaunchScene.__proto__ || Object.getPrototypeOf(LaunchScene)).apply(this, arguments));
  }

  _createClass(LaunchScene, [{
    key: 'onUpdate',
    value: function onUpdate(dt) {}
  }, {
    key: 'onAdded',
    value: function onAdded() {
      var a = new _FI_Node2.default();
      a.size = { width: 250, height: 250 };
      a.position = { x: 250, y: 250 };
      a.scale = { x: 0.5, y: 0.5
        //a.rotation = 3
      };a.addComponent(new _FI_Image2.default('../textures/moon_1024.jpg'));

      this.addChild(a);

      var a = new _FI_Node2.default();
      a.size = { width: 250, height: 250 };
      a.position = { x: 0, y: 250 };
      a.scale = { x: 0.5, y: 0.5
        //a.rotation = 3
      };a.addComponent(new _FI_Image2.default('../textures/moon_1024.jpg'));
      a.addAction(new _FI_Rotation.FI_RotationBy(180, 2500));
      a.addComponent(new _FI_Touchable2.default());
      this.addChild(a);
    }
  }, {
    key: 'onRemoved',
    value: function onRemoved() {}
  }]);

  return LaunchScene;
}(_FI_Node2.default);

exports.default = LaunchScene;

/***/ })
/******/ ]);