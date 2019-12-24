"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MessageList = undefined;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactLinkify = require("react-linkify");

var _reactLinkify2 = _interopRequireDefault(_reactLinkify);

var _typestyle = require("typestyle");

var _styles = require("./styles");

var _MessagingUtils = require("../../utils/MessagingUtils");

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

var MessageList =
  /*#__PURE__*/
  (exports.MessageList = (function(_React$PureComponent) {
    _inherits(MessageList, _React$PureComponent);

    function MessageList() {
      var _getPrototypeOf2;

      var _this;

      _classCallCheck(this, MessageList);

      for (
        var _len = arguments.length, args = new Array(_len), _key = 0;
        _key < _len;
        _key++
      ) {
        args[_key] = arguments[_key];
      }

      _this = _possibleConstructorReturn(
        this,
        (_getPrototypeOf2 = _getPrototypeOf(MessageList)).call.apply(
          _getPrototypeOf2,
          [this].concat(args)
        )
      );

      _defineProperty(
        _assertThisInitialized(_this),
        "fileFormats",
        Object.values(_Constants.FILE_UPLOAD_TYPE)
      );

      _defineProperty(_assertThisInitialized(_this), "renderEmoji", function(
        text
      ) {
        return _react2["default"].createElement(
          "p",
          {
            className: (0, _typestyle.classes)(
              _styles.classes.emojiMessage,
              _styles.classes.msgContainer
            )
          },
          text
        );
      });

      _defineProperty(_assertThisInitialized(_this), "renderText", function(
        text
      ) {
        return _react2["default"].createElement(
          "p",
          {
            className: (0, _typestyle.classes)(_styles.classes.msgContainer)
          },
          text
        );
      });

      _defineProperty(_assertThisInitialized(_this), "renderFiles", function(
        text,
        files
      ) {
        return _react2["default"].createElement(
          "div",
          {
            style: {
              display: "flex",
              flexDirection: "column"
            }
          },
          text
            ? _react2["default"].createElement(
                "p",
                {
                  className: (0, _typestyle.classes)(
                    _styles.classes.msgContainer
                  )
                },
                text
              )
            : _react2["default"].createElement("br", null),
          _react2["default"].createElement(
            "div",
            {
              style: {
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
              }
            },
            files.map(function(file, i) {
              return _this.fileFormats.indexOf(file.type) !== -1
                ? _react2["default"].createElement(
                    "div",
                    {
                      key: i,
                      className: _styles.classes.imageContainer
                    },
                    _react2["default"].createElement(
                      "a",
                      {
                        href: file.url,
                        target: "_blank"
                      },
                      _react2["default"].createElement("img", {
                        src: file.url
                      })
                    )
                  )
                : null;
            })
          )
        );
      });

      _defineProperty(_assertThisInitialized(_this), "renderMessage", function(
        type,
        text,
        files
      ) {
        switch (type) {
          case _Constants.MESSAGE_TYPE.EMOJI:
            return _this.renderEmoji(text);

          case _Constants.MESSAGE_TYPE.TEXT:
            return _this.renderText(text);

          case _Constants.MESSAGE_TYPE.FILES:
            return _this.renderFiles(text, files);
        }
      });

      return _this;
    }

    _createClass(MessageList, [
      {
        key: "render",
        value: function render() {
          var _this2 = this;

          var _this$props = this.props,
            messages = _this$props.messages,
            agentId = _this$props.agentId,
            agentName = _this$props.agentName,
            agentAvatar = _this$props.agentAvatar,
            senderId = _this$props.senderId,
            senderAvatar = _this$props.senderAvatar,
            senderName = _this$props.senderName,
            onProfileClick = _this$props.onProfileClick;
          return _react2["default"].createElement(
            "div",
            null,
            _react2["default"].createElement(
              "div",
              {
                className: _styles.classes.msgBox
              },
              (0, _MessagingUtils.parseMessageList)(messages).map(function(
                message
              ) {
                var text = message.text,
                  id = message.id,
                  createdAt = message.createdAt,
                  date = message.date,
                  type = message.type,
                  user = message.user,
                  files = message.files;
                user = user || {};
                var _user = user,
                  name = _user.name,
                  avatar = _user.avatar,
                  userId = _user.id;

                if (agentId === userId) {
                  name = name || agentName;
                  avatar = avatar || agentAvatar;
                } else if (senderId === userId) {
                  name = name || senderName;
                  avatar = avatar || senderAvatar;
                }

                return type === _Constants.MESSAGE_TYPE.DATESEPARATOR
                  ? _react2["default"].createElement(
                      "time",
                      {
                        key: id,
                        className: _styles.classes.messagingListTimeHeading
                      },
                      date
                    )
                  : _react2["default"].createElement(
                      "div",
                      {
                        key: id
                      },
                      _react2["default"].createElement(
                        "a",
                        {
                          style: {
                            cursor: onProfileClick ? "pointer" : "unset"
                          },
                          onClick: onProfileClick
                            ? function() {
                                return onProfileClick(userId);
                              }
                            : function() {
                                return null;
                              },
                          className: _styles.classes.profileLink
                        },
                        _react2["default"].createElement("img", {
                          className: _styles.classes.profilePic,
                          title: name,
                          alt: name,
                          src: avatar
                        })
                      ),
                      _react2["default"].createElement(
                        "div",
                        {
                          className: _styles.classes.profileTitleWrapper
                        },
                        _react2["default"].createElement(
                          "a",
                          {
                            style: {
                              cursor: onProfileClick ? "pointer" : "unset"
                            },
                            onClick: onProfileClick
                              ? function() {
                                  return onProfileClick(userId);
                                }
                              : function() {
                                  return null;
                                },
                            className: _styles.classes.titleLink
                          },
                          _react2["default"].createElement(
                            "span",
                            {
                              className: _styles.classes.title
                            },
                            name
                          )
                        ),
                        _react2["default"].createElement("div", {
                          className: _styles.classes.dotSeperator
                        }),
                        _react2["default"].createElement(
                          "time",
                          {
                            className: _styles.classes.time
                          },
                          (0, _MessagingUtils.parseMessageDate)(createdAt)
                        )
                      ),
                      _react2["default"].createElement(
                        _reactLinkify2["default"],
                        {
                          properties: {
                            target: "_blank"
                          }
                        },
                        _this2.renderMessage(type, text, files)
                      )
                    );
              })
            )
          );
        }
      }
    ]);

    return MessageList;
  })(_react2["default"].PureComponent));

MessageList.propTypes = {
  messages: _propTypes2["default"].arrayOf(
    _propTypes2["default"].shape({
      id: _propTypes2["default"].oneOfType([
        _propTypes2["default"].string,
        _propTypes2["default"].number
      ]),
      text: _propTypes2["default"].string.isRequired,
      files: _propTypes2["default"].arrayOf(
        _propTypes2["default"].shape({
          type: _propTypes2["default"].string.isRequired,
          url: _propTypes2["default"].string.isRequired
        })
      ),
      type: _propTypes2["default"].oneOf(["text", "emoji"]),
      createdAt: function createdAt(props, propName, componentName) {
        if (!(props[propName] instanceof Date)) {
          return new Error(
            "Invalid prop "
              .concat(propName, " supplied to ")
              .concat(componentName, ". Validation failed.")
          );
        }
      },
      user: _propTypes2["default"].shape({
        id: _propTypes2["default"].oneOfType([
          _propTypes2["default"].string,
          _propTypes2["default"].number
        ]).isRequired,
        name: _propTypes2["default"].string,
        avatar: _propTypes2["default"].string
      })
    })
  ),
  agentId: _propTypes2["default"].oneOfType([
    _propTypes2["default"].string,
    _propTypes2["default"].number
  ]).isRequired,
  agentAvatar: _propTypes2["default"].string,
  agentName: _propTypes2["default"].string,
  senderId: _propTypes2["default"].oneOfType([
    _propTypes2["default"].string,
    _propTypes2["default"].number
  ]).isRequired,
  senderAvatar: _propTypes2["default"].string,
  senderName: _propTypes2["default"].string,
  onProfileClick: _propTypes2["default"].func
};
