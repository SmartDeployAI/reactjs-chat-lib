"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TopAvatar = undefined;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

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

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError(
      "this hasn't been initialised - super() hasn't been called"
    );
  }
  return self;
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf
    ? Object.getPrototypeOf
    : function _getPrototypeOf(o) {
        return o.__proto__ || Object.getPrototypeOf(o);
      };
  return _getPrototypeOf(o);
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

var TopAvatar =
  /*#__PURE__*/
  (exports.TopAvatar = (function(_React$PureComponent) {
    _inherits(TopAvatar, _React$PureComponent);

    function TopAvatar() {
      _classCallCheck(this, TopAvatar);

      return _possibleConstructorReturn(
        this,
        _getPrototypeOf(TopAvatar).apply(this, arguments)
      );
    }

    _createClass(TopAvatar, [
      {
        key: "render",
        value: function render() {
          var _this$props = this.props,
            avatar = _this$props.avatar,
            userName = _this$props.userName,
            subtitle = _this$props.subtitle,
            isOnline = _this$props.isOnline,
            agentId = _this$props.agentId,
            onProfileClick = _this$props.onProfileClick;
          return _react2["default"].createElement(
            "div",
            {
              className: _styles.classes.profileWrapper
            },
            _react2["default"].createElement(
              "div",
              {
                className: _styles.classes.profileEntity
              },
              _react2["default"].createElement(
                "a",
                {
                  style: {
                    cursor: onProfileClick ? "pointer" : "unset"
                  },
                  onClick: onProfileClick
                    ? function() {
                        return onProfileClick(agentId);
                      }
                    : function() {
                        return null;
                      }
                },
                _react2["default"].createElement(
                  "div",
                  {
                    className: _styles.classes.imgContainer,
                    type: "circle"
                  },
                  _react2["default"].createElement(
                    "div",
                    {
                      className: _styles.classes.imgContainerWrapper
                    },
                    _react2["default"].createElement("img", {
                      className: _styles.classes.avatar,
                      alt: userName,
                      src: avatar
                    }),
                    isOnline &&
                      _react2["default"].createElement("div", {
                        className: _styles.classes.onlineStatus
                      })
                  )
                )
              ),
              _react2["default"].createElement(
                "div",
                {
                  className: _styles.classes.avatarContent
                },
                _react2["default"].createElement(
                  "a",
                  {
                    onClick: onProfileClick
                      ? function() {
                          return onProfileClick(agentId);
                        }
                      : function() {
                          return null;
                        },
                    style: {
                      cursor: onProfileClick ? "pointer" : "unset"
                    },
                    className: _styles.classes.titleLink
                  },
                  userName
                ),
                _react2["default"].createElement(
                  "div",
                  {
                    className: _styles.classes.subtitle
                  },
                  _react2["default"].createElement(
                    "div",
                    {
                      title: subtitle
                    },
                    subtitle
                  )
                )
              )
            )
          );
        }
      }
    ]);

    return TopAvatar;
  })(_react2["default"].PureComponent));

TopAvatar.propTypes = {
  onProfileClick: _propTypes2["default"].func,
  agentId: _propTypes2["default"].oneOfType([
    _propTypes2["default"].string,
    _propTypes2["default"].number
  ]),
  avatar: _propTypes2["default"].string.isRequired,
  userName: _propTypes2["default"].string.isRequired,
  subtitle: _propTypes2["default"].string.isRequired,
  isOnline: _propTypes2["default"].bool
};
