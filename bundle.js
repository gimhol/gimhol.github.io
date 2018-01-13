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
/******/ 	return __webpack_require__(__webpack_require__.s = 22);
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
    key: 'hasMounted',
    value: function hasMounted() {
      return !!this.node;
    }
  }, {
    key: 'setNode',
    value: function setNode(node) {
      if (!node) {
        return console.warn('FI_Component', 'can not mount on invaild node! node:', node);
      } else if (this.node) {
        return console.warn('FI_Component', 'Component has been mounted!');
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
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Vector2D = __webpack_require__(2);

var _Vector2D2 = _interopRequireDefault(_Vector2D);

var _Size2D = __webpack_require__(24);

var _Size2D2 = _interopRequireDefault(_Size2D);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FI_Node = function () {
  function FI_Node() {
    _classCallCheck(this, FI_Node);

    this.children = [];
    this.components = [];
    this.actions = [];
    this.level = 0;
    this.parent = null;
    this.position = new _Vector2D2.default(0, 0);
    this.anchor = new _Vector2D2.default(0.5, 0.5);
    this.size = new _Size2D2.default(0, 0);
    this.scale = new _Vector2D2.default(1, 1);
    this.rotation = 0;

    this.enable = 1;
    this.invisible = 1;
  }

  _createClass(FI_Node, [{
    key: 'getLevel',
    value: function getLevel() {
      return this.level;
    }
  }, {
    key: 'setLevel',
    value: function setLevel(v) {
      this.level = v;
    }
  }, {
    key: 'getScaleX',
    value: function getScaleX() {
      return this.scale.x;
    }
  }, {
    key: 'setScaleX',
    value: function setScaleX(v) {
      this.scale.x = v;return this.scale.x;
    }
  }, {
    key: 'tranScaleX',
    value: function tranScaleX(v) {
      this.scale.x += v;return this.scale.x;
    }
  }, {
    key: 'getScaleY',
    value: function getScaleY() {
      return this.scale.y;
    }
  }, {
    key: 'setScaleY',
    value: function setScaleY(v) {
      this.scale.y = v;return this.scale.y;
    }
  }, {
    key: 'tranScaleY',
    value: function tranScaleY(v) {
      this.scale.y += v;return this.scale.y;
    }
  }, {
    key: 'getPositionX',
    value: function getPositionX() {
      return this.position.x;
    }
  }, {
    key: 'setPositionX',
    value: function setPositionX(v) {
      this.position.x = v;return this.position.x;
    }
  }, {
    key: 'tranPositionX',
    value: function tranPositionX(v) {
      this.position.x += v;return this.position.x;
    }
  }, {
    key: 'getPositionY',
    value: function getPositionY() {
      return this.position.y;
    }
  }, {
    key: 'setPositionY',
    value: function setPositionY(v) {
      this.position.y = v;return this.position.y;
    }
  }, {
    key: 'tranPositionY',
    value: function tranPositionY(v) {
      this.position.y += v;return this.position.y;
    }
  }, {
    key: 'getPosition',
    value: function getPosition() {
      return this.position;
    }
  }, {
    key: 'setPosition',
    value: function setPosition(v) {
      this.position = v;
    }
  }, {
    key: 'getRotation',
    value: function getRotation() {
      return this.rotation;
    }
  }, {
    key: 'setRotation',
    value: function setRotation(v) {
      this.rotation = v;return this.rotation;
    }
  }, {
    key: 'tranRotation',
    value: function tranRotation(v) {
      this.rotation += v;return this.rotation;
    }
  }, {
    key: '_onAdded',
    value: function _onAdded() {
      this.hasAdded = true;
      this.mountAllComponent();
      this.onAdded();
    }
  }, {
    key: '_onRemoved',
    value: function _onRemoved() {
      this.hasAdded = false;
      this.onRemoved();
    }
  }, {
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
      child.parent = this;
      child.setLevel(this.level + 1);
      child._onAdded();
      return child;
    }
  }, {
    key: 'mountAllComponent',
    value: function mountAllComponent() {
      var _this = this;

      this.components.map(function (component) {
        return component.setNode(_this);
      });
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
    key: 'addComponent',
    value: function addComponent(component) {
      this.components.push(component);
      this.hasAdded && component.setNode(this);
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
    key: 'removeAllActions',
    value: function removeAllActions() {
      this.actions = [];
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
      if (!this.enable) {
        return;
      }
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
      if (!this.invisible) {
        return;
      }
      ctx.translate(this.position.x, this.position.y);
      ctx.rotate(this.rotation * Math.PI / 180);
      ctx.scale(this.scale.x, this.scale.y);
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
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Vector2D = function Vector2D(x, y) {
  _classCallCheck(this, Vector2D);

  this.x = x;
  this.y = y;
};

exports.default = Vector2D;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _FI_Component2 = __webpack_require__(0);

var _FI_Component3 = _interopRequireDefault(_FI_Component2);

var _ImageKeeper = __webpack_require__(4);

var _ImageKeeper2 = _interopRequireDefault(_ImageKeeper);

var _Vector2D = __webpack_require__(2);

var _Vector2D2 = _interopRequireDefault(_Vector2D);

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
    _this.texRect = null;
    _this.scale = new _Vector2D2.default(1, 1);
    _this.flap = new _Vector2D2.default(1, 1);
    return _this;
  }
  /**
   * 设置缩放系数
   * @param {Vector2D} scale 缩放系数
   */


  _createClass(FI_Image, [{
    key: 'setScale',
    value: function setScale(scale) {
      this.scale = scale;
    }
    /**
     * 设置翻转系数
     * @param {Vector2D} flap 翻转系数
     */

  }, {
    key: 'setFlap',
    value: function setFlap(flap) {
      this.flap = flap;
    }
  }, {
    key: 'onMount',
    value: function onMount() {
      this.loadImage(this.imageUri);
    }
  }, {
    key: 'loadImage',
    value: async function loadImage(uri) {
      try {
        this.image = await _ImageKeeper2.default.getImage(uri);
        this.texRect = this.texRect || { x: 0, y: 0, width: this.image.width, height: this.image.height };
      } catch (err) {
        console.warn(err);
      }
    }
  }, {
    key: 'setTexRect',
    value: function setTexRect(x, y, width, height) {
      this.texRect = { x: x, y: y, width: width, height: height };
    }
  }, {
    key: 'draw',
    value: function draw(ctx) {
      if (this.image && this.texRect) {
        var anchorOffset = this.node.getAnchorOffset();
        ctx.scale(this.scale.x * this.flap.x, this.scale.y * this.flap.y);
        ctx.drawImage(this.image, this.texRect.x, this.texRect.y, this.texRect.width, this.texRect.height, -anchorOffset.x, -anchorOffset.y, this.node.size.width, this.node.size.height);
      }
    }
  }]);

  return FI_Image;
}(_FI_Component3.default);

exports.default = FI_Image;

/***/ }),
/* 4 */
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
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _FI_Component2 = __webpack_require__(0);

var _FI_Component3 = _interopRequireDefault(_FI_Component2);

var _MouseCenter = __webpack_require__(10);

var _MouseCenter2 = _interopRequireDefault(_MouseCenter);

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
    key: 'setOnClickFunc',
    value: function setOnClickFunc(func) {
      this.onClick = func;
    }
  }, {
    key: 'onMount',
    value: function onMount() {
      _MouseCenter2.default.getInstance().addListener('mousedown', this._onMouseDown.bind(this), this.node.getLevel());
      _MouseCenter2.default.getInstance().addListener('mouseup', this._onMouseUp.bind(this), this.node.getLevel());
      _MouseCenter2.default.getInstance().addListener('mousemove', this._onMouseMove.bind(this), this.node.getLevel());
    }
  }, {
    key: '_onMouseMove',
    value: function _onMouseMove(e) {
      var anchorOffset = this.node.getAnchorOffset();
      var l = this.transform.e - anchorOffset.x;
      var r = l + this.node.size.width;
      var t = this.transform.f - anchorOffset.y;
      var b = t + this.node.size.height;
      if (e.clientX >= l && e.clientX <= r && e.clientY >= t && e.clientY <= b) {
        !this.isMouseOnMe && this.onMouseOut && this.onMouseIn(this);
        this.isMouseOnMe = true;
      } else {
        this.isMouseOnMe && this.onMouseOut && this.onMouseOut(this);
        this.isMouseOnMe = false;
      }
    }
  }, {
    key: '_onMouseDown',
    value: function _onMouseDown(e) {
      this.isMouseOnMe && this.onMouseDown && this.onMouseDown(this);
    }
  }, {
    key: '_onMouseUp',
    value: function _onMouseUp(e) {
      this.isMouseOnMe && this.onMouseUp && this.onMouseUp(this);
    }
  }, {
    key: 'draw',
    value: function draw(ctx) {
      this.debugDraw(ctx);
      this.transform = ctx.getTransform();
    }
  }]);

  return FI_Touchable;
}(_FI_Component3.default);

exports.default = FI_Touchable;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _FI_Node2 = __webpack_require__(1);

var _FI_Node3 = _interopRequireDefault(_FI_Node2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SceneKeeper = function (_FI_Node) {
  _inherits(SceneKeeper, _FI_Node);

  _createClass(SceneKeeper, null, [{
    key: 'getInstance',
    value: function getInstance() {
      if (!this.instance) {
        this.instance = new SceneKeeper();
      }
      return this.instance;
    }
  }]);

  function SceneKeeper() {
    _classCallCheck(this, SceneKeeper);

    var _this = _possibleConstructorReturn(this, (SceneKeeper.__proto__ || Object.getPrototypeOf(SceneKeeper)).call(this));

    _this.curIndex = 0;
    return _this;
  }

  _createClass(SceneKeeper, [{
    key: 'run',
    value: function run(scene) {
      this.addChild(scene);
    }
  }, {
    key: 'push',
    value: function push(scene) {
      //this.children[this.curIndex].invisible = 0;
      ++this.curIndex;
      this.addChild(scene);
    }
  }, {
    key: 'back',
    value: function back() {}
  }]);

  return SceneKeeper;
}(_FI_Node3.default);

exports.default = SceneKeeper;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _EventCenter2 = __webpack_require__(11);

var _EventCenter3 = _interopRequireDefault(_EventCenter2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var KeyboardCenter = function (_EventCenter) {
  _inherits(KeyboardCenter, _EventCenter);

  function KeyboardCenter() {
    _classCallCheck(this, KeyboardCenter);

    return _possibleConstructorReturn(this, (KeyboardCenter.__proto__ || Object.getPrototypeOf(KeyboardCenter)).call(this));
  }

  _createClass(KeyboardCenter, [{
    key: 'launch',
    value: function launch() {
      document.addEventListener('keydown', this.onKeyDown.bind(this), false);
      document.addEventListener('keyup', this.onKeyUp.bind(this), false);
    }
  }, {
    key: 'onKeyDown',
    value: function onKeyDown(e) {
      this.dispatch('keydown', e);
    }
  }, {
    key: 'onKeyUp',
    value: function onKeyUp(e) {
      this.dispatch('keyup', e);
    }
  }, {
    key: 'onUpdate',
    value: function onUpdate(dt) {}
  }]);

  return KeyboardCenter;
}(_EventCenter3.default);

exports.default = KeyboardCenter;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _FI_Image = __webpack_require__(3);

var _FI_Image2 = _interopRequireDefault(_FI_Image);

var _FI_Frame = __webpack_require__(16);

var _FI_Frame2 = _interopRequireDefault(_FI_Frame);

var _FI_Animation = __webpack_require__(17);

var _FI_Animation2 = _interopRequireDefault(_FI_Animation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AnimationCreator = function () {
  function AnimationCreator() {
    _classCallCheck(this, AnimationCreator);

    this.imagesCache = {};
  }

  _createClass(AnimationCreator, [{
    key: 'getImage',
    value: function getImage(imageSrc) {
      if (!this.imagesCache[imageSrc]) {
        this.imagesCache[imageSrc] = new _FI_Image2.default(imageSrc);
      }
      return this.imagesCache[imageSrc];
    }
  }, {
    key: 'createWithData',
    value: function createWithData(animationData) {
      var _this = this;

      var ret = new _FI_Animation2.default();
      animationData.frames.map(function (frameData, idx) {
        var frame = new _FI_Frame2.default();
        frame.init(_this.getImage(frameData.image || animationData.image), frameData.duration || animationData.duration, frameData.rect);
        ret.addFrame(frame);
      });
      ret.setLoop(animationData.loop);
      return ret;
    }
  }]);

  return AnimationCreator;
}();

exports.default = new AnimationCreator();

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

var trackTransform = exports.trackTransform = function trackTransform(ctx) {
    var svg = document.createElementNS("http://www.w3.org/2000/svg", 'svg');
    var xform = svg.createSVGMatrix();
    var savedTransforms = [];

    ctx.getTransform = function () {
        return xform;
    };

    var save = ctx.save;
    ctx.save = function () {
        savedTransforms.push(xform.translate(0, 0));
        return save.call(ctx);
    };

    var restore = ctx.restore;
    ctx.restore = function () {
        xform = savedTransforms.pop();
        return restore.call(ctx);
    };

    var scale = ctx.scale;
    ctx.scale = function (sx, sy) {
        xform = xform.scaleNonUniform(sx, sy);
        return scale.call(ctx, sx, sy);
    };

    var rotate = ctx.rotate;
    ctx.rotate = function (deg) {
        xform = xform.rotate(deg);
        return rotate.call(ctx, deg);
    };

    var translate = ctx.translate;
    ctx.translate = function (dx, dy) {
        xform = xform.translate(dx, dy);
        return translate.call(ctx, dx, dy);
    };

    var transform = ctx.transform;
    ctx.transform = function (a, b, c, d, e, f) {
        var m2 = svg.createSVGMatrix();
        m2.a = a;m2.b = b;m2.c = c;m2.d = d;m2.e = e;m2.f = f;
        xform = xform.multiply(m2);
        return transform.call(ctx, a, b, c, d, e, f);
    };

    var setTransform = ctx.setTransform;
    ctx.setTransform = function (a, b, c, d, e, f) {
        xform.a = a;
        xform.b = b;
        xform.c = c;
        xform.d = d;
        xform.e = e;
        xform.f = f;
        return setTransform.call(ctx, a, b, c, d, e, f);
    };

    var pt = svg.createSVGPoint();
    //通过原坐标系点x，y求对应当前坐标系的坐标值
    ctx.transformedPoint = function (x, y) {
        pt.x = x;pt.y = y;
        return pt.matrixTransform(xform.inverse());
    };
    var pt2 = svg.createSVGPoint();
    //当前坐标系中的的xy还原到原坐标系坐标值
    ctx.transformedPoint2 = function (x, y) {
        pt2.x = x;pt2.y = y;
        return pt2.matrixTransform(xform);
    };
    var clearRect = ctx.clearRect;
    ctx.clearRect = function (x, y, w, h) {
        ctx.save();
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        clearRect.call(ctx, x, y, w, h);
        ctx.restore();
    };
};

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _EventCenter2 = __webpack_require__(11);

var _EventCenter3 = _interopRequireDefault(_EventCenter2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MouseCenter = function (_EventCenter) {
  _inherits(MouseCenter, _EventCenter);

  function MouseCenter() {
    _classCallCheck(this, MouseCenter);

    return _possibleConstructorReturn(this, (MouseCenter.__proto__ || Object.getPrototypeOf(MouseCenter)).call(this));
  }

  _createClass(MouseCenter, [{
    key: 'launch',
    value: function launch() {
      document.addEventListener('mousedown', this.onMouseDown.bind(this), false);
      document.addEventListener('mouseup', this.onMouseUp.bind(this), false);
      document.addEventListener('mousemove', this.onMouseMove.bind(this), false);
    }
  }, {
    key: 'onMouseDown',
    value: function onMouseDown(e) {
      this.dispatch('mousedown', e);
    }
  }, {
    key: 'onMouseUp',
    value: function onMouseUp(e) {
      this.dispatch('mouseup', e);
    }
  }, {
    key: 'onMouseMove',
    value: function onMouseMove(e) {
      this.dispatch('mousemove', e);
    }
  }]);

  return MouseCenter;
}(_EventCenter3.default);

exports.default = MouseCenter;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _SingletonCls2 = __webpack_require__(25);

var _SingletonCls3 = _interopRequireDefault(_SingletonCls2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Listener = function () {
  function Listener(name, func, priority) {
    _classCallCheck(this, Listener);

    this.name = name;
    this.func = func;
    this.priority = priority;
  }

  _createClass(Listener, [{
    key: 'removeSelf',
    value: function removeSelf() {}
  }]);

  return Listener;
}();

var EventCenter = function (_SingletonCls) {
  _inherits(EventCenter, _SingletonCls);

  function EventCenter() {
    _classCallCheck(this, EventCenter);

    var _this = _possibleConstructorReturn(this, (EventCenter.__proto__ || Object.getPrototypeOf(EventCenter)).call(this));

    _this.listeners = {};
    return _this;
  }

  _createClass(EventCenter, [{
    key: 'dispatch',
    value: function dispatch(eventName, data) {
      var arr = this.getListeners(eventName);
      for (var i in arr) {
        if (arr[i].func(data)) {
          break;
        }
      }
    }
  }, {
    key: 'getListeners',
    value: function getListeners(eventName) {
      return this.listeners[eventName];
    }
  }, {
    key: 'addListener',
    value: function addListener(eventName, func, priority) {
      var listenerArr = this.listeners[eventName] || [];
      if (!listenerArr) {
        return;
      }
      var listener = new Listener(eventName, func, priority);
      listenerArr.push(listener);
      listenerArr.sort(function (a, b) {
        return b.priority - a.priority;
      });
      this.listeners[eventName] = listenerArr;
      return listener;
    }
  }, {
    key: 'update',
    value: function update(dt) {
      this.opUpdate && this.opUpdate(dt);
    }
  }]);

  return EventCenter;
}(_SingletonCls3.default);

exports.default = EventCenter;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FI_RotationTo = exports.FI_RotationBy = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _FI_Action3 = __webpack_require__(13);

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
/* 13 */
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
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Matrix = function () {
  function Matrix(cols, rows, elements) {
    _classCallCheck(this, Matrix);

    this.cols = Math.floor(cols);
    this.rows = Math.floor(rows);
    if (elements.length != this.cols * this.rows) {
      console.error('Matrix', 'number of elements is not correct!');
    }
    this.elements = elements.map(function (element) {
      var ret = Number(element);
      if (isNaN(ret)) {
        console.error('Matrix', 'element is not correct !');
      }
      return ret;
    });
  }

  _createClass(Matrix, [{
    key: 'copy',
    value: function copy() {
      return new Matrix(this.cols, this.rows, this.elements.map(function (element) {
        return element;
      }));
    }
  }, {
    key: 'setElement',
    value: function setElement(x, y, v) {
      this.elements[y * this.cols + x] = v;
    }
  }, {
    key: 'getElement',
    value: function getElement(x, y) {
      return this.elements[y * this.cols + x];
    }
  }, {
    key: 'tranElement',
    value: function tranElement(x, y, v) {
      return this.elements[y * this.cols + x] += v;
    }
  }, {
    key: 'add',
    value: function add(m) {
      if (!this._additiveWith(m)) {
        console.error('Matrix', 'fail to add');
      }
      return new Matrix(this.cols, this.rows, this.elements.map(function (element, idx) {
        return element + m.elements[idx];
      }));
    }
  }, {
    key: 'sub',
    value: function sub(m) {
      if (!this._additiveWith(m)) {
        console.error('Matrix', 'fail to sub');
      }

      return new this.__proto__.constructor(this.cols, this.rows, this.elements.map(function (element, idx) {
        return element - m.elements[idx];
      }));
    }
  }, {
    key: '_additiveWith',
    value: function _additiveWith(m) {
      return this.cols === m.cols && this.rows === m.rows;
    }
  }, {
    key: 'multiply',
    value: function multiply(m) {
      if (typeof m === 'number') {
        return new Matrix(this.cols, this.rows, this.elements.map(function (element, idx) {
          return element * m;
        }));
      }
      if (this.rows != m.cols || m.rows != this.cols) {
        console.log(this, m);
        return console.error('Matrix', 'fail to multiply');
      }
      var elements = [];
      var cols = m.cols;
      var rows = this.rows;
      for (var y = 0; y < rows; ++y) {
        for (var x = 0; x < cols; ++x) {
          var element = 0;
          for (var i = 0; i < this.cols; ++i) {
            element += this.getElement(i, y) * m.getElement(x, i);
          }
          elements.push(element);
        }
      }
      return new Matrix(cols, rows, elements);
    }
  }, {
    key: 'toString',
    value: function toString() {
      var ret = '';
      for (var y = 0; y < this.rows; ++y) {
        for (var x = 0; x < this.cols; ++x) {
          ret += this.elements[y * this.cols + x];
          if (x != this.cols - 1) {
            ret += ',';
          }
        }
        if (y != this.rows - 1) {
          ret += '\n';
        }
      }
      return ret;
    }
  }]);

  return Matrix;
}();

exports.default = Matrix;

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _FI_Component2 = __webpack_require__(0);

var _FI_Component3 = _interopRequireDefault(_FI_Component2);

var _Vector2D = __webpack_require__(2);

var _Vector2D2 = _interopRequireDefault(_Vector2D);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FI_Mover = function (_FI_Component) {
  _inherits(FI_Mover, _FI_Component);

  function FI_Mover() {
    _classCallCheck(this, FI_Mover);

    var _this = _possibleConstructorReturn(this, (FI_Mover.__proto__ || Object.getPrototypeOf(FI_Mover)).call(this));

    _this.velocity = new _Vector2D2.default(0, 0);
    return _this;
  }

  _createClass(FI_Mover, [{
    key: 'getVelocity',
    value: function getVelocity() {
      return this.velocity;
    }
  }, {
    key: 'setVelocity',
    value: function setVelocity(x, y) {
      this.velocity = new _Vector2D2.default(x, y);
    }
  }, {
    key: 'tranVelocity',
    value: function tranVelocity(x, y) {
      this.velocity.x += x;
      this.velocity.y += y;
      return this.velocity;
    }
  }, {
    key: 'getVelocityX',
    value: function getVelocityX() {
      return this.velocity.x;
    }
  }, {
    key: 'setVelocityX',
    value: function setVelocityX(v) {
      this.velocity.x = v;return this.velocity.x;
    }
  }, {
    key: 'tranVelocityX',
    value: function tranVelocityX(v) {
      this.velocity.x += v;return this.velocity.x;
    }
  }, {
    key: 'decayVelocityX',
    value: function decayVelocityX(v) {
      if (this.velocity.x > 0) {
        this.velocity.x -= Math.abs(v);
        this.velocity.x = Math.max(0, this.velocity.x);
      } else if (this.velocity.x < 0) {
        this.velocity.x += Math.abs(v);
        this.velocity.x = Math.min(0, this.velocity.x);
      }
    }
  }, {
    key: 'getVelocityY',
    value: function getVelocityY() {
      return this.velocity.y;
    }
  }, {
    key: 'setVelocityY',
    value: function setVelocityY(v) {
      this.velocity.y = v;return this.velocity.y;
    }
  }, {
    key: 'tranVelocityY',
    value: function tranVelocityY(v) {
      this.velocity.y += v;return this.velocity.y;
    }
  }, {
    key: 'decayVelocityY',
    value: function decayVelocityY(v) {
      if (this.velocity.y > 0) {
        this.velocity.y -= Math.abs(v);
        this.velocity.y = Math.max(0, this.velocity.y);
      } else if (this.velocity.y < 0) {
        this.velocity.y += Math.abs(v);
        this.velocity.y = Math.min(0, this.velocity.y);
      }
    }
  }, {
    key: 'onMount',
    value: function onMount() {}
  }, {
    key: 'update',
    value: function update(dt) {
      this.node.tranPositionX(this.velocity.x * dt / 1000);
      this.node.tranPositionY(this.velocity.y * dt / 1000);
    }
  }, {
    key: 'draw',
    value: function draw(ctx) {}
  }]);

  return FI_Mover;
}(_FI_Component3.default);

exports.default = FI_Mover;

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _FI_Component2 = __webpack_require__(0);

var _FI_Component3 = _interopRequireDefault(_FI_Component2);

var _Vector2D = __webpack_require__(2);

var _Vector2D2 = _interopRequireDefault(_Vector2D);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FI_Frame = function (_FI_Component) {
  _inherits(FI_Frame, _FI_Component);

  function FI_Frame() {
    _classCallCheck(this, FI_Frame);

    var _this = _possibleConstructorReturn(this, (FI_Frame.__proto__ || Object.getPrototypeOf(FI_Frame)).call(this));

    _this.scale = new _Vector2D2.default(1, 1);
    _this.flap = new _Vector2D2.default(1, 1);
    return _this;
  }
  /**
   * 设置缩放系数
   * @param {Vector2D} scale 缩放系数
   */


  _createClass(FI_Frame, [{
    key: 'setScale',
    value: function setScale(scale) {
      this.scale = scale;
      this.image && this.image.setScale(scale);
    }
    /**
     * 设置翻转系数
     * @param {Vector2D} flap 翻转系数
     */

  }, {
    key: 'setFlap',
    value: function setFlap(flap) {
      this.flap = flap;
      this.image && this.image.setFlap(flap);
    }
  }, {
    key: 'init',
    value: function init(image, duration, texRect) {
      this.setDuration(duration);
      this.setImage(image);
      this.setTexRect(texRect);
    }
  }, {
    key: 'setImage',
    value: function setImage(image) {
      this.image = image;
      this.hasMounted() && image && image.setNode(this.getNode());
    }
  }, {
    key: 'setDuration',
    value: function setDuration(duration) {
      this.duration = duration;
    }
  }, {
    key: 'getDuration',
    value: function getDuration() {
      return this.duration;
    }
  }, {
    key: 'setTexRect',
    value: function setTexRect(texRect) {
      this.texRect = texRect;
    }
  }, {
    key: 'onMount',
    value: function onMount() {
      this.image && !this.image.hasMounted() && this.image.setNode(this.getNode());
    }
  }, {
    key: 'update',
    value: function update(dt) {}
  }, {
    key: 'draw',
    value: function draw(ctx) {
      if (this.image) {
        this.texRect && this.image.setTexRect(this.texRect.x, this.texRect.y, this.texRect.width, this.texRect.height);
        this.image.draw(ctx);
      }
    }
  }]);

  return FI_Frame;
}(_FI_Component3.default);

exports.default = FI_Frame;

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _FI_Component2 = __webpack_require__(0);

var _FI_Component3 = _interopRequireDefault(_FI_Component2);

var _Vector2D = __webpack_require__(2);

var _Vector2D2 = _interopRequireDefault(_Vector2D);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FI_Animation = function (_FI_Component) {
  _inherits(FI_Animation, _FI_Component);

  function FI_Animation() {
    _classCallCheck(this, FI_Animation);

    var _this = _possibleConstructorReturn(this, (FI_Animation.__proto__ || Object.getPrototypeOf(FI_Animation)).call(this));

    _this.frames = [];
    _this.curIndex = 0;
    _this.curTime = 0;
    _this.isAutoReset = true;
    _this.loop = 0;
    _this.curLoop = 0;

    _this.scale = new _Vector2D2.default(1, 1);
    _this.flap = new _Vector2D2.default(1, 1);
    return _this;
  }
  /**
   * 设置缩放系数
   * @param {Vector2D} scale 缩放系数
   */


  _createClass(FI_Animation, [{
    key: 'setScale',
    value: function setScale(scale) {
      this.scale = scale;
      this.curFrame && this.curFrame.setScale(scale);
    }
    /**
     * 设置翻转系数
     * @param {Vector2D} flap 翻转系数
     */

  }, {
    key: 'setFlap',
    value: function setFlap(flap) {
      this.flap = flap;
      this.curFrame && this.curFrame.setFlap(flap);
    }
  }, {
    key: 'addFrame',
    value: function addFrame(frame) {
      this.frames.push(frame);
      this.hasMounted() && frame.setNode(this.node);
    }
  }, {
    key: 'onMount',
    value: function onMount() {
      var _this2 = this;

      this.frames.map(function (frame) {
        frame.setNode(_this2.getNode());
      });
    }
  }, {
    key: 'play',
    value: function play() {
      this.playing = true;
    }
  }, {
    key: 'stop',
    value: function stop() {
      this.playing = false;
    }
  }, {
    key: 'setAutoReset',
    value: function setAutoReset(v) {
      this.isAutoReset = v;
    }
  }, {
    key: 'setLoop',
    value: function setLoop(v) {
      this.loop = v;
    }
  }, {
    key: 'onLoopFinish',
    value: function onLoopFinish() {}
  }, {
    key: 'onFinish',
    value: function onFinish() {}
  }, {
    key: 'update',
    value: function update(dt) {
      if (this.playing) {
        var curFrame = this.frames[this.curIndex];
        if (curFrame) {
          this.curTime += dt;
          curFrame.update(dt);
          var diff = this.curTime - curFrame.getDuration();
          if (diff >= 0) {
            this.curTime = 0;
            var newIndex = this.curIndex + 1;
            if (newIndex >= this.frames.length) {
              if (this.loop == 0) {
                newIndex = 0;
              } else if (this.curLoop >= this.loop) {
                this.curLoop += 1;
                newIndex = 0;
              } else {
                newIndex = this.frames.length - 1;
                this.stop();
              }
            }
            if (newIndex !== this.curIndex) {
              this.curIndex = newIndex;
              this.curFrame = this.frames[newIndex];
              this.curFrame.setScale(this.scale);
              this.curFrame.setFlap(this.flap);
            }
          }
        }
      }
    }
  }, {
    key: 'draw',
    value: function draw(ctx) {
      this.curFrame && this.curFrame.draw(ctx);
    }
  }]);

  return FI_Animation;
}(_FI_Component3.default);

exports.default = FI_Animation;

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _FI_Component2 = __webpack_require__(0);

var _FI_Component3 = _interopRequireDefault(_FI_Component2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FI_Actor2D = function (_FI_Component) {
  _inherits(FI_Actor2D, _FI_Component);

  function FI_Actor2D() {
    _classCallCheck(this, FI_Actor2D);

    var _this = _possibleConstructorReturn(this, (FI_Actor2D.__proto__ || Object.getPrototypeOf(FI_Actor2D)).call(this));

    _this.jumpable = false;
    _this.walkDirection = 0;
    _this.jumpSpeed = 0;
    _this.walkSpeed = 0;
    _this.walkAcc = 0;
    _this.gavity = 0;
    _this.ground = 0;
    return _this;
  }

  _createClass(FI_Actor2D, [{
    key: 'jump',
    value: function jump() {
      this.jumpable && this.mover.setVelocityY(this.jumpSpeed);
    }
  }, {
    key: 'walk',
    value: function walk(direction) {
      this.walkDirection = direction ? direction / Math.abs(direction) : 0;
    }
  }, {
    key: 'setJumpSpeed',
    value: function setJumpSpeed(v) {
      this.jumpSpeed = v;
    }
  }, {
    key: 'setWalkSpeed',
    value: function setWalkSpeed(v) {
      this.walkSpeed = Math.abs(v);
    }
  }, {
    key: 'setWalkAcc',
    value: function setWalkAcc(v) {
      this.walkAcc = Math.abs(v);
    }
  }, {
    key: 'setGavity',
    value: function setGavity(v) {
      this.gavity = v;
    }
  }, {
    key: 'setGround',
    value: function setGround(v) {
      this.ground = v;
    }
  }, {
    key: 'setMover',
    value: function setMover(c) {
      this.mover = c;
    }
  }, {
    key: 'setRect',
    value: function setRect(r) {
      this.rect = r;
    }
  }, {
    key: 'onMount',
    value: function onMount() {
      this.mover && this.mover.setNode(this.getNode());
    }
  }, {
    key: 'update',
    value: function update(dt) {
      if (!this.mover) {
        return;
      }
      this.mover.update(dt);
      var curY = this.node.getPositionY();
      var curVY = 0;
      if (curY < this.ground) {

        curVY = this.mover.tranVelocityY(this.gavity) * dt / 1000;
        this.jumpable = false;
      }
      if (curY + curVY > this.ground) {
        this.node.setPositionY(this.ground);
        this.mover.setVelocityY(0);
        this.jumpable = true;
      }

      var diff = this.walkDirection;
      var maxVX = this.walkSpeed;
      var accX = this.walkAcc;
      if (maxVX && accX) {
        if (diff) {
          var vx = this.mover.getVelocityX();
          this.mover.tranVelocityX(diff * (accX - Math.abs(vx * accX / maxVX)));
          if (diff > 0 && vx < 0 || diff < 0 && vx > 0) {
            this.mover.decayVelocityX(accX);
          }
        } else {
          this.mover.decayVelocityX(accX);
        }
      }
    }
  }]);

  return FI_Actor2D;
}(_FI_Component3.default);

exports.default = FI_Actor2D;

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _FI_Component2 = __webpack_require__(0);

var _FI_Component3 = _interopRequireDefault(_FI_Component2);

var _ImageKeeper = __webpack_require__(4);

var _ImageKeeper2 = _interopRequireDefault(_ImageKeeper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FI_Text = function (_FI_Component) {
  _inherits(FI_Text, _FI_Component);

  function FI_Text(uri) {
    _classCallCheck(this, FI_Text);

    var _this = _possibleConstructorReturn(this, (FI_Text.__proto__ || Object.getPrototypeOf(FI_Text)).call(this));

    _this.content = 'Hello';
    _this.anchor = { x: 0, y: 0 };
    _this.fontSize = 36;
    _this.fontSizeUnit = 'px';
    _this.fontFamily = 'Arial';
    _this.textAlign = 'center';
    _this.fillStyle = 'white';
    _this.strokeStyle = 'gray';
    _this.offset = { x: 0, y: 0 };
    _this.size = { width: 0, height: 0 };
    return _this;
  }

  _createClass(FI_Text, [{
    key: 'onMount',
    value: function onMount() {}
  }, {
    key: 'setWidth',
    value: function setWidth() {}
  }, {
    key: '_onSizeChange',
    value: function _onSizeChange(size) {
      this.size = size;
      this.onSizeChange && this.onSizeChange(this);
    }
  }, {
    key: 'draw',
    value: function draw(ctx) {
      ctx.fillStyle = this.fillStyle;
      ctx.strokeStyle = this.strokeStyle;
      ctx.font = this.fontSize + this.fontSizeUnit + ' ' + this.fontFamily;
      ctx.textAlign = this.textAlign;

      var size = ctx.measureText(this.content);
      if (size.width != this.size.width || size.height != this.size.height) {
        this._onSizeChange(size);
      }
      this.fillStyle && ctx.fillText(this.content, this.offset.x, this.offset.y);
      this.strokeStyle && ctx.strokeText(this.content, this.offset.x, this.offset.y);
    }
  }]);

  return FI_Text;
}(_FI_Component3.default);

exports.default = FI_Text;

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _FI_Scene2 = __webpack_require__(29);

var _FI_Scene3 = _interopRequireDefault(_FI_Scene2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MainScene = function (_FI_Scene) {
  _inherits(MainScene, _FI_Scene);

  function MainScene() {
    _classCallCheck(this, MainScene);

    return _possibleConstructorReturn(this, (MainScene.__proto__ || Object.getPrototypeOf(MainScene)).call(this));
  }

  _createClass(MainScene, [{
    key: 'onAdded',
    value: function onAdded() {
      console.log('Hello');
    }
  }]);

  return MainScene;
}(_FI_Scene3.default);

exports.default = MainScene;

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Rect = function () {
  _createClass(Rect, null, [{
    key: "intersectWith",
    value: function intersectWith(r1, r2) {
      var l = Math.max(r1.x, r2.x);
      var r = Math.min(r1.x + r1.w, r2.x + r2.w);
      var w = r - l;
      if (w < 0) return null;

      var t = Math.max(r1.y, r2.y);
      var b = Math.min(r1.y + r1.h, r2.y + r2.h);
      var h = b - t;
      if (h < 0) return null;

      return new Rect(l, t, w, h);
    }
  }]);

  function Rect(x, y, w, h) {
    _classCallCheck(this, Rect);

    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }

  _createClass(Rect, [{
    key: "intersectWith",
    value: function intersectWith(r) {
      return Rect.intersectWith(this, r);
    }
  }]);

  return Rect;
}();

exports.default = Rect;

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _Engine = __webpack_require__(23);

var _Engine2 = _interopRequireDefault(_Engine);

var _SceneKeeper = __webpack_require__(6);

var _SceneKeeper2 = _interopRequireDefault(_SceneKeeper);

var _KeyboardCenter = __webpack_require__(7);

var _KeyboardCenter2 = _interopRequireDefault(_KeyboardCenter);

var _MouseCenter = __webpack_require__(10);

var _MouseCenter2 = _interopRequireDefault(_MouseCenter);

var _LaunchScene = __webpack_require__(27);

var _LaunchScene2 = _interopRequireDefault(_LaunchScene);

var _MainScene = __webpack_require__(20);

var _MainScene2 = _interopRequireDefault(_MainScene);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import React from 'react';
// import ReactDOM from 'react-dom';
// import App from './app/App.js';
// ReactDOM.render(<App/>, document.getElementById('app'));
// //

var appDiv = document.getElementById('app');
var canvas = document.createElement('canvas');
appDiv.appendChild(canvas);
_Engine2.default.getInstance().launch(canvas).setSize(800, 600).setBackgroundColor('black');

_KeyboardCenter2.default.getInstance().launch();
_MouseCenter2.default.getInstance().launch();
_SceneKeeper2.default.getInstance().run(new _LaunchScene2.default());

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _FI_Node = __webpack_require__(1);

var _FI_Node2 = _interopRequireDefault(_FI_Node);

var _FI_Image = __webpack_require__(3);

var _FI_Image2 = _interopRequireDefault(_FI_Image);

var _FI_Touchable = __webpack_require__(5);

var _FI_Touchable2 = _interopRequireDefault(_FI_Touchable);

var _FI_Rotation = __webpack_require__(12);

var _SceneKeeper = __webpack_require__(6);

var _SceneKeeper2 = _interopRequireDefault(_SceneKeeper);

var _utils = __webpack_require__(9);

var Utils = _interopRequireWildcard(_utils);

var _Matrix = __webpack_require__(14);

var _Matrix2 = _interopRequireDefault(_Matrix);

var _Matrix2D = __webpack_require__(26);

var _Matrix2D2 = _interopRequireDefault(_Matrix2D);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var m1 = new _Matrix2D2.default();
var m2 = new _Matrix2D2.default();

console.log(m1.multiply(2).toString());
console.log(m1.translate(100, 99).toString());

// console.log(m1.translate(100,100).toString())
// console.log(m1.add(m2).toString())
// console.log(m1.sub(m2).toString())

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
      this.ctxTracker = Utils.trackTransform(this.ctx);

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

      ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      ctx.fillStyle = this.backgroundColor;
      ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
      ctx.save();
      this.rootNode.draw(ctx);
      ctx.restore();
    }
  }]);

  return Engine;
}();

exports.default = Engine;

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Size2D = function Size2D(w, h) {
  _classCallCheck(this, Size2D);

  this.width = w;
  this.height = h;
};

exports.default = Size2D;

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SingletonCls = function () {
  function SingletonCls() {
    _classCallCheck(this, SingletonCls);
  }

  _createClass(SingletonCls, null, [{
    key: "getInstance",
    value: function getInstance() {
      if (!this.instance) {
        this.instance = new this();
      }
      return this.instance;
    }
  }, {
    key: "deleteInstance",
    value: function deleteInstance() {
      delete this.instance;
    }
  }]);

  return SingletonCls;
}();

exports.default = SingletonCls;

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Matrix = __webpack_require__(14);

var _Matrix2 = _interopRequireDefault(_Matrix);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Matrix2D = function () {
  function Matrix2D() {
    _classCallCheck(this, Matrix2D);

    this.matrix = new _Matrix2.default(3, 3, [1, 0, 0, 0, 1, 0, 0, 0, 1]);
  }

  _createClass(Matrix2D, [{
    key: 'translate',
    value: function translate(x, y) {
      var ret = new Matrix2D();
      ret.matrix = this.matrix.copy();
      ret.matrix.tranElement(0, 2, x);
      ret.matrix.tranElement(1, 2, y);
      return ret;
    }
  }, {
    key: 'toString',
    value: function toString() {
      return this.matrix.toString();
    }
  }, {
    key: 'multiply',
    value: function multiply(m) {
      var ret = new Matrix2D();
      ret.matrix = this.matrix.multiply(typeof m === 'number' ? m : m.matrix);
      return ret;
    }
  }]);

  return Matrix2D;
}();

exports.default = Matrix2D;

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _FI_Node = __webpack_require__(1);

var _FI_Node2 = _interopRequireDefault(_FI_Node);

var _FI_Image = __webpack_require__(3);

var _FI_Image2 = _interopRequireDefault(_FI_Image);

var _FI_Mover = __webpack_require__(15);

var _FI_Mover2 = _interopRequireDefault(_FI_Mover);

var _FI_Touchable = __webpack_require__(5);

var _FI_Touchable2 = _interopRequireDefault(_FI_Touchable);

var _FI_Rotation = __webpack_require__(12);

var _KeyboardCenter = __webpack_require__(7);

var _KeyboardCenter2 = _interopRequireDefault(_KeyboardCenter);

var _FI_Frame = __webpack_require__(16);

var _FI_Frame2 = _interopRequireDefault(_FI_Frame);

var _FI_Animation = __webpack_require__(17);

var _FI_Animation2 = _interopRequireDefault(_FI_Animation);

var _FI_InputResponser = __webpack_require__(28);

var _FI_InputResponser2 = _interopRequireDefault(_FI_InputResponser);

var _FI_Actor2D = __webpack_require__(18);

var _FI_Actor2D2 = _interopRequireDefault(_FI_Actor2D);

var _AnimationCreator = __webpack_require__(8);

var _AnimationCreator2 = _interopRequireDefault(_AnimationCreator);

var _FI_Text = __webpack_require__(19);

var _FI_Text2 = _interopRequireDefault(_FI_Text);

var _MainScene = __webpack_require__(20);

var _MainScene2 = _interopRequireDefault(_MainScene);

var _Button = __webpack_require__(30);

var _Button2 = _interopRequireDefault(_Button);

var _FI_Draw = __webpack_require__(32);

var _FI_Draw2 = _interopRequireDefault(_FI_Draw);

var _Rect = __webpack_require__(21);

var _Rect2 = _interopRequireDefault(_Rect);

var _Genji = __webpack_require__(33);

var _Genji2 = _interopRequireDefault(_Genji);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LaunchScene = function (_FI_Scene) {
  _inherits(LaunchScene, _FI_Scene);

  function LaunchScene() {
    _classCallCheck(this, LaunchScene);

    var _this = _possibleConstructorReturn(this, (LaunchScene.__proto__ || Object.getPrototypeOf(LaunchScene)).call(this));

    _this.gavity = 60;
    _this.speedY = 0;
    _this.pressUp = 0;
    _this.pressDown = 0;
    _this.pressRight = 0;
    _this.pressLeft = 0;
    _this.pressJump = 0;
    _this.pressAttack = 0;
    _this.pressFn = 0;
    _this.ud = 0;
    _this.lr = 0;
    _this.playerFace = 1;
    return _this;
  }

  _createClass(LaunchScene, [{
    key: 'onUpdate',
    value: function onUpdate(dt) {
      var ground = 500;
    }
  }, {
    key: 'createBullet',
    value: function createBullet(angle) {
      var a = new _FI_Node2.default();
      a.size = { width: 25, height: 25 };
      a.position = { x: this.player.getPositionX(), y: this.player.getPositionY() };
      a.addComponent(new _FI_Image2.default('../textures/moon_1024.jpg'));

      var mover = a.addComponent(new _FI_Mover2.default());
      var sp = 1600;
      mover.tranVelocityX(Math.sin(angle) * 1600);
      mover.tranVelocityY(Math.cos(angle) * 1600);
      a.addAction(new _FI_Rotation.FI_RotationBy(10000, 10000));

      this.addChild(a);
    }
  }, {
    key: 'getShotAngle',
    value: function getShotAngle() {
      var du = this.ud;
      var lr = this.lr;
      var a = 90;
      if (lr == 1) {
        if (du == 1) {
          a -= 45;
        } else if (du == -1) {
          a += 45;
        }
      } else if (lr == -1) {
        a = -90;
        if (du == 1) {
          a += 45;
        } else if (du == -1) {
          a -= 45;
        }
      } else if (du == 1) {
        a = 0;
      } else if (du == -1) {
        a = 180;
      }
      return a;
    }
  }, {
    key: 'rightShot',
    value: function rightShot() {
      var _this2 = this;

      var a = this.getShotAngle();
      this.createBullet((a + 10) * Math.PI / 180);
      this.createBullet(a * Math.PI / 180);
      this.createBullet((a - 10) * Math.PI / 180);
      setTimeout(function () {
        _this2.shotting = false;
      }, 500);
    }
  }, {
    key: 'leftShot',
    value: function leftShot() {
      var _this3 = this;

      this.count = this.count || 0;
      this.count++;
      var a = this.getShotAngle();
      this.createBullet(a * Math.PI / 180);
      if (this.count < 3) {
        setTimeout(this.leftShot.bind(this), 100);
      } else {

        setTimeout(function () {
          _this3.shotting = false;
          _this3.count = 0;
        }, 500);
      }
    }
  }, {
    key: 'onAdded',
    value: function onAdded() {
      var _this4 = this;

      this.stage2D = new _FI_Node2.default();
      var draw = this.stage2D.addComponent(new _FI_Draw2.default());

      var r1 = new _Rect2.default(0, 600, 1000, 100);
      var r2 = new _Rect2.default(10, 610, 900, 50);
      var r3 = r1.intersectWith(r2);
      draw.add({
        color: '#FF0000',
        width: 1,
        close: true,
        type: 'lines',
        points: [{ x: 0, y: 0 }, { x: 100, y: 100 }, { x: 100, y: 0 }]
      });
      draw.add({
        color: '#FF0000',
        style: 'stroke',
        type: 'rect',
        x: r1.x, y: r1.y, w: r1.w, h: r1.h
      });
      draw.add({
        color: '#FF0000',
        style: 'stroke',
        type: 'rect',
        x: r2.x, y: r2.y, w: r2.w, h: r2.h
      });
      r3 && draw.add({
        color: '#00FF00',
        style: 'fill',
        type: 'rect',
        x: r3.x, y: r3.y, w: r3.w, h: r3.h
      });

      this.addChild(this.stage2D);
      this.genji = this.addChild(new _Genji2.default());

      var button = new _Button2.default('Sprite & Action');
      button.size = { width: 100, height: 100 };
      button.position = { x: 400, y: 300 };
      this.addChild(button);

      this.player = new _FI_Node2.default();
      this.player.size = { width: 100, height: 100 };
      this.player.position = { x: 400, y: 300 };
      this.player.anchor = { x: 0.5, y: 0 };

      var actor2d = new _FI_Actor2D2.default();
      actor2d.setMover(new _FI_Mover2.default());
      actor2d.setRect(new _Rect2.default(0, 0, 100, 100));
      actor2d.setGavity(this.gavity);
      actor2d.setGround(500);
      actor2d.setJumpSpeed(-1000);
      actor2d.setWalkSpeed(500);
      actor2d.setWalkAcc(50);

      this.actor2d = this.player.addComponent(actor2d);
      var animation = _AnimationCreator2.default.createWithData({
        name: 'genji_standing',
        loop: 0,
        duration: 250,
        image: '../textures/genji.jpg',
        frames: [{ rect: { x: 0, y: 0, width: 80, height: 80 } }, { rect: { x: 80, y: 0, width: 80, height: 80 } }, { rect: { x: 160, y: 0, width: 80, height: 80 } }, { rect: { x: 80, y: 0, width: 80, height: 80 } }]
      });
      animation.play();
      this.addChild(this.player);

      this.player.addComponent(animation);

      var t = this.player.addComponent(new _FI_Touchable2.default());
      t.setOnClickFunc(function () {
        console.log('player');
      });

      var a = new _FI_Node2.default();
      a.size = { width: 50, height: 50 };
      a.position = { x: 50, y: 50 };
      a.addComponent(new _FI_Image2.default('../textures/moon_1024.jpg'));
      a.setRotation(45);
      var t = a.addComponent(new _FI_Touchable2.default());
      t.setOnClickFunc(function () {
        console.log('weapon');
      });
      this.player.addChild(a);

      var inputResponser = this.addComponent(new _FI_InputResponser2.default());
      inputResponser.onKeyPress('k', function () {
        return _this4.genji.jump();
      });
      inputResponser.onDirectionKeepPress('w', 's', function (direction, dt) {
        direction /= direction ? Math.abs(direction) : 1;
        _this4.ud = direction;
      });
      inputResponser.onDirectionKeepPress('a', 'd', function (direction, dt) {
        direction /= direction ? Math.abs(direction) : 1;
        _this4.lr = direction;
        _this4.playerFace = direction;
        _this4.genji.walk(direction);
      });
      inputResponser.onKeyPress('l', function () {
        _this4.pressFn = 1;
      });
      inputResponser.onKeyRelease('l', function () {
        _this4.pressFn = 1;
      });
      inputResponser.onKeyKeepPress('j', function () {
        if (!_this4.shotting) {
          _this4.shotting = true;
          if (_this4.pressFn == 1) _this4.rightShot();else _this4.leftShot();
        }
      });
    }
  }, {
    key: 'onRemoved',
    value: function onRemoved() {}
  }]);

  return LaunchScene;
}(_FI_Node2.default);

exports.default = LaunchScene;

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _FI_Component2 = __webpack_require__(0);

var _FI_Component3 = _interopRequireDefault(_FI_Component2);

var _KeyboardCenter = __webpack_require__(7);

var _KeyboardCenter2 = _interopRequireDefault(_KeyboardCenter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FI_InputResponser = function (_FI_Component) {
  _inherits(FI_InputResponser, _FI_Component);

  function FI_InputResponser() {
    _classCallCheck(this, FI_InputResponser);

    return _possibleConstructorReturn(this, (FI_InputResponser.__proto__ || Object.getPrototypeOf(FI_InputResponser)).call(this));
  }

  _createClass(FI_InputResponser, [{
    key: 'onMount',
    value: function onMount() {
      _KeyboardCenter2.default.getInstance().addListener('keydown', this._onKeyDown.bind(this), false);
      _KeyboardCenter2.default.getInstance().addListener('keyup', this._onKeyUp.bind(this), false);
      this.foucsingKeys = {};
      this.plisteners = {};
      this.klisteners = {};
      this.rlisteners = {};
      this.dklisteners = {};
    }
  }, {
    key: '_onKeyDown',
    value: function _onKeyDown(e) {
      if (typeof this.foucsingKeys[e.key] === 'number' && this.foucsingKeys[e.key] < 1) {
        this.foucsingKeys[e.key] = 1;
      }
    }
  }, {
    key: '_onKeyUp',
    value: function _onKeyUp(e) {
      if (typeof this.foucsingKeys[e.key] === 'number' && this.foucsingKeys[e.key] > 0) {
        this.foucsingKeys[e.key] = 0;
      }
    }
  }, {
    key: 'onKeyPress',
    value: function onKeyPress(k, func) {
      this.foucsingKeys[k] = 0;
      this.plisteners[k] = func;
    }
  }, {
    key: 'onKeyRelease',
    value: function onKeyRelease(k, func) {
      this.foucsingKeys[k] = 0;
      this.rlisteners[k] = func;
    }
  }, {
    key: 'onKeyKeepPress',
    value: function onKeyKeepPress(k, func) {
      this.foucsingKeys[k] = 0;
      this.klisteners[k] = func;
    }
  }, {
    key: 'onDirectionKeepPress',
    value: function onDirectionKeepPress(a, b, func) {
      this.foucsingKeys[a] = 0;
      this.foucsingKeys[b] = 0;
      this.dklisteners[a + '_' + b] = func;
    }
  }, {
    key: 'update',
    value: function update(dt) {
      for (var k in this.dklisteners) {
        var ab = k.split('_');
        this.dklisteners[k](this.foucsingKeys[ab[1]] - this.foucsingKeys[ab[0]], dt);
      }
      for (var k in this.foucsingKeys) {
        if (this.foucsingKeys[k]) {
          switch (this.foucsingKeys[k]) {
            case 0:
              //释放
              this.foucsingKeys[k]--;
              this.rlisteners[k] && this.rlisteners[k](dt);
              break;
            case 1:
              //按下
              this.foucsingKeys[k]++;
              this.plisteners[k] && this.plisteners[k](dt);
              break;
            case 2:
              //保持按下
              this.klisteners[k] && this.klisteners[k](dt);
              break;
          }
        }
      }
    }

    // draw(ctx){
    // }

  }]);

  return FI_InputResponser;
}(_FI_Component3.default);

exports.default = FI_InputResponser;

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _FI_Node2 = __webpack_require__(1);

var _FI_Node3 = _interopRequireDefault(_FI_Node2);

var _SceneKeeper = __webpack_require__(6);

var _SceneKeeper2 = _interopRequireDefault(_SceneKeeper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FI_Scene = function (_FI_Node) {
  _inherits(FI_Scene, _FI_Node);

  function FI_Scene() {
    _classCallCheck(this, FI_Scene);

    return _possibleConstructorReturn(this, (FI_Scene.__proto__ || Object.getPrototypeOf(FI_Scene)).apply(this, arguments));
  }

  _createClass(FI_Scene, [{
    key: 'goto',
    value: function goto(sceneCls) {
      _SceneKeeper2.default.getInstance().push(new sceneCls());
    }
  }]);

  return FI_Scene;
}(_FI_Node3.default);

exports.default = FI_Scene;

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _FI_Node2 = __webpack_require__(1);

var _FI_Node3 = _interopRequireDefault(_FI_Node2);

var _FI_Text = __webpack_require__(19);

var _FI_Text2 = _interopRequireDefault(_FI_Text);

var _FI_Touchable = __webpack_require__(5);

var _FI_Touchable2 = _interopRequireDefault(_FI_Touchable);

var _FI_Scale = __webpack_require__(31);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Button = function (_FI_Node) {
  _inherits(Button, _FI_Node);

  function Button(textContent) {
    _classCallCheck(this, Button);

    var _this = _possibleConstructorReturn(this, (Button.__proto__ || Object.getPrototypeOf(Button)).call(this));

    _this.textContent = textContent;
    return _this;
  }

  _createClass(Button, [{
    key: 'onAdded',
    value: function onAdded() {
      var _this2 = this;

      var inner = this.addChild(new _FI_Node3.default());
      var textNode = inner.addChild(new _FI_Node3.default());

      var textComponent = textNode.addComponent(new _FI_Text2.default());
      textComponent.content = this.textContent;
      textComponent.onSizeChange = function (t) {
        _this2.size.width = t.size.width;
      };

      var touchableComponent = this.addComponent(new _FI_Touchable2.default());
      touchableComponent.onMouseIn = function (t) {
        inner.removeAllActions();
        inner.addAction(new _FI_Scale.FI_ScaleTo(1.1, 1.1, 250));
      };
      touchableComponent.onMouseOut = function (t) {
        inner.removeAllActions();
        inner.addAction(new _FI_Scale.FI_ScaleTo(1, 1, 250));
      };
      touchableComponent.onMouseDown = function (t) {
        inner.removeAllActions();
        inner.addAction(new _FI_Scale.FI_ScaleTo(1, 1, 75));
      };
      touchableComponent.onMouseUp = function (t) {
        inner.removeAllActions();
        inner.addAction(new _FI_Scale.FI_ScaleTo(1.1, 1.1, 75));
      };
    }
  }]);

  return Button;
}(_FI_Node3.default);

exports.default = Button;

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FI_ScaleTo = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _FI_Action2 = __webpack_require__(13);

var _FI_Action3 = _interopRequireDefault(_FI_Action2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FI_ScaleTo = exports.FI_ScaleTo = function (_FI_Action) {
  _inherits(FI_ScaleTo, _FI_Action);

  function FI_ScaleTo(x, y, duration) {
    _classCallCheck(this, FI_ScaleTo);

    var _this = _possibleConstructorReturn(this, (FI_ScaleTo.__proto__ || Object.getPrototypeOf(FI_ScaleTo)).call(this));

    _this.valueX = x;
    _this.valueY = y;
    _this.duration = duration;
    _this.time = duration;
    return _this;
  }

  _createClass(FI_ScaleTo, [{
    key: 'onAssign',
    value: function onAssign() {
      this.speedX = (this.valueX - this.node.getScaleX()) / this.duration;
      this.speedY = (this.valueY - this.node.getScaleY()) / this.duration;
    }
  }, {
    key: 'onFinish',
    value: function onFinish() {
      this.node.setScaleX(this.valueX);
      this.node.setScaleY(this.valueY);
      this.node.removeAction(this);
    }
  }, {
    key: 'update',
    value: function update(dt) {
      this.node.tranScaleX(this.speedX * dt);
      this.node.tranScaleY(this.speedY * dt);
      this.time -= dt;
      if (this.time <= 0) {
        this.onFinish();
      }
    }
  }]);

  return FI_ScaleTo;
}(_FI_Action3.default);

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _FI_Component2 = __webpack_require__(0);

var _FI_Component3 = _interopRequireDefault(_FI_Component2);

var _ImageKeeper = __webpack_require__(4);

var _ImageKeeper2 = _interopRequireDefault(_ImageKeeper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FI_Draw = function (_FI_Component) {
  _inherits(FI_Draw, _FI_Component);

  function FI_Draw() {
    _classCallCheck(this, FI_Draw);

    var _this = _possibleConstructorReturn(this, (FI_Draw.__proto__ || Object.getPrototypeOf(FI_Draw)).call(this));

    _this.items = [];
    return _this;
  }

  _createClass(FI_Draw, [{
    key: 'add',
    value: function add(arr) {
      this.items.push(arr);
      return arr;
    }
  }, {
    key: 'remove',
    value: function remove(arr) {
      for (var i = 0; i < this.items.length; ++i) {
        if (this.items[i] === arr) {
          this.items.splice(i, 1);
          break;
        }
      }
    }
  }, {
    key: 'onMount',
    value: function onMount() {}
  }, {
    key: 'draw',
    value: function draw(ctx) {
      this.items.map(function (itemData) {
        var color = itemData.color,
            width = itemData.width,
            close = itemData.close,
            style = itemData.style,
            type = itemData.type;


        style = style || 'stroke';

        if (color) ctx[style + 'Style'] = color;
        if (width) ctx.lineWidth = width;

        switch (type) {
          case 'lines':
            ctx.beginPath();
            var points = itemData.points;

            points.map(function (pointData, idx) {
              idx === 0 ? ctx.moveTo(pointData.x, pointData.y) : ctx.lineTo(pointData.x, pointData.y);
            });
            close && ctx.closePath();
            ctx[style]();
            break;
          case 'rect':
            var x = itemData.x,
                y = itemData.y,
                w = itemData.w,
                h = itemData.h;

            ctx[style + 'Rect'](x, y, w, h);
            break;
        }
      });
    }
  }]);

  return FI_Draw;
}(_FI_Component3.default);

exports.default = FI_Draw;

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _FI_Node2 = __webpack_require__(1);

var _FI_Node3 = _interopRequireDefault(_FI_Node2);

var _FI_Actor2D = __webpack_require__(18);

var _FI_Actor2D2 = _interopRequireDefault(_FI_Actor2D);

var _Rect = __webpack_require__(21);

var _Rect2 = _interopRequireDefault(_Rect);

var _FI_Mover = __webpack_require__(15);

var _FI_Mover2 = _interopRequireDefault(_FI_Mover);

var _FI_Animator = __webpack_require__(34);

var _FI_Animator2 = _interopRequireDefault(_FI_Animator);

var _AnimationCreator = __webpack_require__(8);

var _AnimationCreator2 = _interopRequireDefault(_AnimationCreator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Genji = function (_FI_Node) {
  _inherits(Genji, _FI_Node);

  function Genji() {
    _classCallCheck(this, Genji);

    var _this = _possibleConstructorReturn(this, (Genji.__proto__ || Object.getPrototypeOf(Genji)).call(this));

    _this.gavity = 60;

    _this.size.width = 100;
    _this.size.height = 100;
    _this.position.x = 400;
    _this.position.y = 300;
    _this.anchor.x = 0.5;
    _this.anchor.y = 0;

    var actor2d = new _FI_Actor2D2.default();
    actor2d.setMover(new _FI_Mover2.default());
    actor2d.setRect(new _Rect2.default(0, 0, 100, 100));
    actor2d.setGavity(_this.gavity);
    actor2d.setGround(500);
    actor2d.setJumpSpeed(-1000);
    actor2d.setWalkSpeed(500);
    actor2d.setWalkAcc(50);
    _this.actor2d = _this.addComponent(actor2d);

    _this.animator = _this.addComponent(new _FI_Animator2.default());
    _this.animator.addAnimationWithData({
      name: 'genji_standing',
      loop: 0,
      duration: 120,
      image: '../textures/template.png',
      frames: [{ rect: { x: 0, y: 0, width: 79, height: 79 } }, { rect: { x: 80, y: 0, width: 79, height: 79 } }, { rect: { x: 160, y: 0, width: 79, height: 79 } }, { rect: { x: 240, y: 0, width: 79, height: 79 } }]
    });
    _this.animator.addAnimationWithData({
      name: 'genji_walking',
      loop: 0,
      duration: 60,
      image: '../textures/template.png',
      frames: [{ rect: { x: 0, y: 160, width: 79, height: 79 } }, { rect: { x: 80, y: 160, width: 79, height: 79 } }, { rect: { x: 160, y: 160, width: 79, height: 79 } }, { rect: { x: 80, y: 160, width: 79, height: 79 } }]
    });
    _this.animator.playAnaimtion('genji_standing');
    return _this;
  }

  _createClass(Genji, [{
    key: 'jump',
    value: function jump() {
      this.actor2d.jump();
    }
  }, {
    key: 'walk',
    value: function walk(direction) {
      if (direction) {
        this.animator.playAnaimtion('genji_walking');
        this.animator.flap.x = direction;
      } else {
        this.animator.playAnaimtion('genji_standing');
      }
      this.actor2d.walk(direction);
    }
  }]);

  return Genji;
}(_FI_Node3.default);

exports.default = Genji;

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _FI_Component2 = __webpack_require__(0);

var _FI_Component3 = _interopRequireDefault(_FI_Component2);

var _AnimationCreator = __webpack_require__(8);

var _AnimationCreator2 = _interopRequireDefault(_AnimationCreator);

var _Vector2D = __webpack_require__(2);

var _Vector2D2 = _interopRequireDefault(_Vector2D);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FI_Animator = function (_FI_Component) {
  _inherits(FI_Animator, _FI_Component);

  function FI_Animator() {
    _classCallCheck(this, FI_Animator);

    var _this = _possibleConstructorReturn(this, (FI_Animator.__proto__ || Object.getPrototypeOf(FI_Animator)).call(this));

    _this.animations = {};
    _this.scale = new _Vector2D2.default(1, 1);
    _this.flap = new _Vector2D2.default(1, 1);
    return _this;
  }
  /**
   * 设置缩放系数
   * @param {Vector2D} scale 缩放系数
   */


  _createClass(FI_Animator, [{
    key: 'setScale',
    value: function setScale(scale) {
      this.scale = scale;
      this.curAnimation && this.curAnimation.setScale(scale);
    }
    /**
     * 设置翻转系数
     * @param {Vector2D} flap 翻转系数
     */

  }, {
    key: 'setFlap',
    value: function setFlap(flap) {
      this.flap = flap;
      this.curAnimation && this.curAnimation.setFlap(flap);
    }
  }, {
    key: 'onMount',
    value: function onMount() {
      for (var key in this.animations) {
        !this.animations[key].hasMounted() && this.animations[key].setNode(this.node);
      }
    }
  }, {
    key: 'addAnimationWithData',
    value: function addAnimationWithData(data) {
      var animation = _AnimationCreator2.default.createWithData(data);
      this.hasMounted() && !animation.hasMounted() && animation.setNode(this.node);
      this.animations[data.name] = animation;
    }
  }, {
    key: 'playAnaimtion',
    value: function playAnaimtion(name) {
      this.curAnimation = this.animations[name];
      this.curAnimation.play();
      this.curAnimation.setScale(this.scale);
      this.curAnimation.setFlap(this.flap);
    }
  }, {
    key: 'setScaleX',
    value: function setScaleX(x) {}
  }, {
    key: 'update',
    value: function update(dt) {
      this.curAnimation && this.curAnimation.update(dt);
    }
  }, {
    key: 'draw',
    value: function draw(ctx) {
      this.curAnimation && this.curAnimation.draw(ctx);
    }
  }]);

  return FI_Animator;
}(_FI_Component3.default);

exports.default = FI_Animator;

/***/ })
/******/ ]);