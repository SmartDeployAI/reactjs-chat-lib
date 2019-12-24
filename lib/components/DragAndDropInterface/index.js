"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DragAndDropInterface = undefined;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _md = require("react-icons/md");

var _styles = require("./styles");

var _Constants = require("../../utils/Constants");

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

var DragAndDropInterface =
  /*#__PURE__*/
  (exports.DragAndDropInterface = (function(_React$PureComponent) {
    _inherits(DragAndDropInterface, _React$PureComponent);

    function DragAndDropInterface() {
      var _getPrototypeOf2;

      var _this;

      _classCallCheck(this, DragAndDropInterface);

      for (
        var _len = arguments.length, args = new Array(_len), _key = 0;
        _key < _len;
        _key++
      ) {
        args[_key] = arguments[_key];
      }

      _this = _possibleConstructorReturn(
        this,
        (_getPrototypeOf2 = _getPrototypeOf(DragAndDropInterface)).call.apply(
          _getPrototypeOf2,
          [this].concat(args)
        )
      );

      _defineProperty(_assertThisInitialized(_this), "state", {
        highlight: false
      });

      _defineProperty(
        _assertThisInitialized(_this),
        "fileFormats",
        Object.values(_Constants.FILE_UPLOAD_TYPE)
      );

      _defineProperty(
        _assertThisInitialized(_this),
        "handleDragEnter",
        function(event) {
          event.stopPropagation();
          event.preventDefault();

          _this.setState({
            highlight: true
          });
        }
      );

      _defineProperty(_assertThisInitialized(_this), "handleDragOver", function(
        event
      ) {
        event.stopPropagation();
        event.preventDefault();

        _this.setState({
          highlight: true
        });
      });

      _defineProperty(
        _assertThisInitialized(_this),
        "handleDragLeave",
        function(event) {
          event.stopPropagation();
          event.preventDefault();

          _this.setState(
            {
              highlight: false
            },
            function() {
              _this.props.triggerType === _Constants.DND_TRIGGER.FILE_DRAG &&
                _this.props.onRequestClose();
            }
          );
        }
      );

      _defineProperty(_assertThisInitialized(_this), "handleDrop", function(
        event
      ) {
        event.stopPropagation();
        event.preventDefault();
        var dt = event.dataTransfer;
        var files = dt.files;

        _this.setState({
          highlight: false
        });

        _this.props.onFileChange && _this.props.onFileChange(files[0]);
      });

      return _this;
    }

    _createClass(DragAndDropInterface, [
      {
        key: "render",
        value: function render() {
          var highlight = this.state.highlight;
          return (
            this.props.visible &&
            _react2["default"].createElement(
              _react2["default"].Fragment,
              null,
              _react2["default"].createElement("div", {
                className: _styles.classes.fadeContainer
              }),
              _react2["default"].createElement(
                "div",
                {
                  onDragEnter: this.handleDragEnter,
                  onDragOver: this.handleDragOver,
                  onDragLeave: this.handleDragLeave,
                  onDrop: this.handleDrop,
                  className: _styles.classes.dndContainer,
                  onClick: this.props.onRequestClose
                },
                _react2["default"].createElement(
                  "div",
                  {
                    style: {
                      border: "1.5px dashed ".concat(
                        highlight ? "#3b5580" : "#bdbdbd"
                      )
                    },
                    className: _styles.classes.dndRelativeContainer
                  },
                  _react2["default"].createElement(_md.MdPhotoLibrary, {
                    style: {
                      fontSize: 40,
                      color: "".concat(highlight ? "#3b5580" : "#bdbdbd")
                    }
                  }),
                  _react2["default"].createElement(
                    _react2["default"].Fragment,
                    null,
                    _react2["default"].createElement(
                      "span",
                      {
                        className: _styles.classes.boldText
                      },
                      "Select your file"
                    ),
                    _react2["default"].createElement(
                      "span",
                      {
                        className: _styles.classes.mediumText
                      },
                      "Or Drag and Drop a file"
                    )
                  )
                )
              )
            )
          );
        }
      }
    ]);

    return DragAndDropInterface;
  })(_react2["default"].PureComponent));

_defineProperty(DragAndDropInterface, "propTypes", {
  onFileChange: _propTypes2["default"].func.isRequired,
  triggerType: _propTypes2["default"].string,
  visible: _propTypes2["default"].bool.isRequired,
  onRequestClose: _propTypes2["default"].func.isRequired
});
