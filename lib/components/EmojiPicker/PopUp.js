"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _styles = require("./styles");

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _typeof(obj) {
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj &&
        typeof Symbol === "function" &&
        obj.constructor === Symbol &&
        obj !== Symbol.prototype
        ? "symbol"
        : typeof obj;
    };
  }
  return _typeof(obj);
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  }
  return _assertThisInitialized(self);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf
    ? Object.getPrototypeOf
    : function _getPrototypeOf(o) {
        return o.__proto__ || Object.getPrototypeOf(o);
      };
  return _getPrototypeOf(o);
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError(
      "this hasn't been initialised - super() hasn't been called"
    );
  }
  return self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: { value: subClass, writable: true, configurable: true }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf =
    Object.setPrototypeOf ||
    function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };
  return _setPrototypeOf(o, p);
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}

var PopUp =
  /*#__PURE__*/
  (function(_React$PureComponent) {
    _inherits(PopUp, _React$PureComponent);

    function PopUp() {
      var _getPrototypeOf2;

      var _this;

      _classCallCheck(this, PopUp);

      for (
        var _len = arguments.length, args = new Array(_len), _key = 0;
        _key < _len;
        _key++
      ) {
        args[_key] = arguments[_key];
      }

      _this = _possibleConstructorReturn(
        this,
        (_getPrototypeOf2 = _getPrototypeOf(PopUp)).call.apply(
          _getPrototypeOf2,
          [this].concat(args)
        )
      );

      _defineProperty(
        _assertThisInitialized(_this),
        "interceptLauncherClick",
        function(e) {
          var isOpen = _this.props.isOpen;
          var clickedOutside = !_this.emojiPopup.contains(e.target) && isOpen;
          clickedOutside && _this.props.onClickedOutside(e);
        }
      );

      return _this;
    }

    _createClass(PopUp, [
      {
        key: "componentDidMount",
        value: function componentDidMount() {
          this.scLauncher = document.querySelector("#launcher");
          this.scLauncher.addEventListener(
            "click",
            this.interceptLauncherClick
          );
        }
      },
      {
        key: "componentWillUnmount",
        value: function componentWillUnmount() {
          this.scLauncher.removeEventListener(
            "click",
            this.interceptLauncherClick
          );
        }
      },
      {
        key: "render",
        value: function render() {
          var _this2 = this;

          var _this$props = this.props,
            isOpen = _this$props.isOpen,
            children = _this$props.children,
            onInputChange = _this$props.onInputChange;

          if (isOpen) {
            return _react2["default"].createElement(
              "div",
              {
                className: _styles.classes.popupWindow,
                style: {
                  zIndex: 2000000
                },
                ref: function ref(e) {
                  return (_this2.emojiPopup = e);
                }
              },
              _react2["default"].createElement(
                "div",
                {
                  className: _styles.classes.popupInner
                },
                _react2["default"].createElement("input", {
                  onChange: onInputChange,
                  className: _styles.classes.popupWindowSearch,
                  placeholder: "Search emoji..."
                }),
                children
              )
            );
          } else {
            return _react2["default"].createElement("div", null, "");
          }
        }
      }
    ]);

    return PopUp;
  })(_react2["default"].PureComponent);

exports["default"] = PopUp;
