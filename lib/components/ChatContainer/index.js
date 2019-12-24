"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ChatContainer = undefined;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _styles = require("./styles");

var _ChatWindow = require("../ChatWindow");

var _withInjectedPropsHOC = require("../withInjectedPropsHOC");

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

function _toConsumableArray(arr) {
  return (
    _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread()
  );
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
}

function _iterableToArray(iter) {
  if (
    Symbol.iterator in Object(iter) ||
    Object.prototype.toString.call(iter) === "[object Arguments]"
  )
    return Array.from(iter);
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }
    return arr2;
  }
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

/**
 * @module
 * @description This component is a parent component that manages and houses all chat windows within the application.
 * This component manages all the chat windows including scheduling task to hide and open a new window
 * if needs arises.
 */
var ChatContainer =
  /*#__PURE__*/
  (exports.ChatContainer = (function(_React$PureComponent) {
    _inherits(ChatContainer, _React$PureComponent);

    function ChatContainer(props) {
      var _this;

      _classCallCheck(this, ChatContainer);

      _this = _possibleConstructorReturn(
        this,
        _getPrototypeOf(ChatContainer).call(this, props)
      );

      _defineProperty(
        _assertThisInitialized(_this),
        "allWindowsHaveUnsentContent",
        function() {
          var activeChatWindows = _this.state.activeChatWindows,
            result = true,
            foundWindow = null;
          /**
           * Here we check if a window has content that has been sent;
           * we then return a reference to this window
           */

          var _iteratorNormalCompletion = true;
          var _didIteratorError = false;
          var _iteratorError = undefined;

          try {
            for (
              var _iterator = activeChatWindows[Symbol.iterator](), _step;
              !(_iteratorNormalCompletion = (_step = _iterator.next()).done);
              _iteratorNormalCompletion = true
            ) {
              var _window = _step.value;

              if (!_window.ref.current.hasUnsentContent()) {
                result = false;
                foundWindow = _window;
                break;
              }
            }
          } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion && _iterator["return"] != null) {
                _iterator["return"]();
              }
            } finally {
              if (_didIteratorError) {
                throw _iteratorError;
              }
            }
          }

          return {
            result: result,
            foundWindow: foundWindow
          };
        }
      );

      _defineProperty(
        _assertThisInitialized(_this),
        "reshuffleWindow",
        function(newId) {
          var CHAT_WINDOW_WIDTH_SIZE =
              _Constants.Constants.CHAT_WINDOW_WIDTH_SIZE,
            CHAT_WINDOW_WIDTH_MINIMIZED_SIZE =
              _Constants.Constants.CHAT_WINDOW_WIDTH_MINIMIZED_SIZE,
            NORMAL = _Constants.WINDOW_ENLARGEMENT_TYPE.NORMAL,
            ref = _react2["default"].createRef(),
            Window = (0, _withInjectedPropsHOC.withInjectedProps)(
              _ChatWindow.ChatWindow,
              {
                closeWindowfn: _this.handleCloseWindow,
                handleEnlargementfn: _this.handleWindowEnlargement,
                _id: newId,
                ref: ref
              }
            );

          var _this$allWindowsHaveU = _this.allWindowsHaveUnsentContent(),
            result = _this$allWindowsHaveU.result,
            foundWindow = _this$allWindowsHaveU.foundWindow; // If a window does not have unsent content, result: false is returned,
          // which allows us to get a reference to this window and swap it out for the new window.

          if (result === false) {
            var enlargementType = foundWindow.ref.current.getEnlargementType(),
              activeChatWindows = _this.state.activeChatWindows.filter(function(
                window
              ) {
                return window.id !== foundWindow.id;
              });

            activeChatWindows.push({
              id: newId,
              component: Window,
              ref: ref
            });

            _this.setState(function(prevState) {
              return {
                activeChatWindows: activeChatWindows,
                windowSize:
                  prevState.windowSize +
                  (enlargementType === NORMAL
                    ? CHAT_WINDOW_WIDTH_SIZE
                    : CHAT_WINDOW_WIDTH_MINIMIZED_SIZE) -
                  CHAT_WINDOW_WIDTH_SIZE
              };
            });
          }
        }
      );

      _defineProperty(_assertThisInitialized(_this), "createWindow", function(
        id
      ) {
        var CHAT_WINDOW_WIDTH_SIZE =
            _Constants.Constants.CHAT_WINDOW_WIDTH_SIZE,
          DISTANCE_BETWEEN_CHAT_WINDOWS =
            _Constants.Constants.DISTANCE_BETWEEN_CHAT_WINDOWS,
          ref = _react2["default"].createRef(),
          Window = (0, _withInjectedPropsHOC.withInjectedProps)(
            _ChatWindow.ChatWindow,
            {
              closeWindowfn: _this.handleCloseWindow,
              handleEnlargementfn: _this.handleWindowEnlargement,
              _id: id,
              ref: ref
            }
          );

        _this.setState(function(prevState) {
          return {
            windowSize:
              prevState.windowSize -
              (CHAT_WINDOW_WIDTH_SIZE + DISTANCE_BETWEEN_CHAT_WINDOWS),
            activeChatWindows: [].concat(
              _toConsumableArray(prevState.activeChatWindows),
              [
                {
                  id: id,
                  component: Window,
                  ref: ref
                }
              ]
            )
          };
        });
      });

      _defineProperty(
        _assertThisInitialized(_this),
        "handleCloseWindow",
        function(id) {
          var window = _this.getWindow(id).ref.current,
            hasUnSentContent = window.hasUnsentContent(); // If the window to be closed has contents that has not been sent then call the onRequestClose
          // function passing control back to the caller applicatioon else call the closeWindow function

          if (hasUnSentContent) {
            _this.props.onRequestClose &&
              _this.props.onRequestClose(function() {
                return _this.closeWindow(id);
              });
          } else {
            _this.closeWindow(id);
          }
        }
      );

      _defineProperty(_assertThisInitialized(_this), "closeWindow", function(
        id
      ) {
        var CHAT_WINDOW_WIDTH_SIZE =
            _Constants.Constants.CHAT_WINDOW_WIDTH_SIZE,
          DISTANCE_BETWEEN_CHAT_WINDOWS =
            _Constants.Constants.DISTANCE_BETWEEN_CHAT_WINDOWS,
          CHAT_WINDOW_WIDTH_MINIMIZED_SIZE =
            _Constants.Constants.CHAT_WINDOW_WIDTH_MINIMIZED_SIZE,
          NORMAL = _Constants.WINDOW_ENLARGEMENT_TYPE.NORMAL,
          window = _this.getWindow(id).ref.current,
          enlargementType = window.getEnlargementType();

        _this.setState(function(prevState) {
          return {
            activeChatWindows: prevState.activeChatWindows.filter(function(
              window
            ) {
              return window.id !== id;
            }),
            windowSize:
              prevState.windowSize +
              (enlargementType === NORMAL
                ? CHAT_WINDOW_WIDTH_SIZE
                : CHAT_WINDOW_WIDTH_MINIMIZED_SIZE) +
              DISTANCE_BETWEEN_CHAT_WINDOWS
          };
        });
      });

      _defineProperty(
        _assertThisInitialized(_this),
        "handleEnlargmentForSingleWindow",
        function(additionalWindowPixels, callback) {
          _this.setState(
            function(prevState) {
              return {
                windowSize: prevState.windowSize + additionalWindowPixels
              };
            },
            function() {
              return callback();
            }
          );
        }
      );

      _defineProperty(
        _assertThisInitialized(_this),
        "handleEnlargmentForMultipleWindow",
        function(id, callback, additionalWindowPixels) {
          var NORMAL = _Constants.WINDOW_ENLARGEMENT_TYPE.NORMAL,
            foundNormalWindow = false;
          var _iteratorNormalCompletion2 = true;
          var _didIteratorError2 = false;
          var _iteratorError2 = undefined;

          try {
            for (
              var _iterator2 = _this.state.activeChatWindows[Symbol.iterator](),
                _step2;
              !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done);
              _iteratorNormalCompletion2 = true
            ) {
              var _window2 = _step2.value;

              if (
                _window2.id !== id &&
                _window2.ref.current.getEnlargementType() === NORMAL
              ) {
                _window2.ref.current.setEnlargementType();

                foundNormalWindow = true;
                break;
              }
            }
          } catch (err) {
            _didIteratorError2 = true;
            _iteratorError2 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
                _iterator2["return"]();
              }
            } finally {
              if (_didIteratorError2) {
                throw _iteratorError2;
              }
            }
          }

          if (foundNormalWindow === false) {
            _this.setState(function(prevState) {
              return {
                windowSize: prevState.windowSize + additionalWindowPixels
              };
            });
          }

          callback();
        }
      );

      _defineProperty(
        _assertThisInitialized(_this),
        "handleWindowEnlargement",
        function(id, callback) {
          var window = _this.getWindow(id),
            expansionType = window.ref.current.getEnlargementType(),
            CHAT_WINDOW_WIDTH_MINIMIZED_SIZE =
              _Constants.Constants.CHAT_WINDOW_WIDTH_MINIMIZED_SIZE,
            CHAT_WINDOW_WIDTH_SIZE =
              _Constants.Constants.CHAT_WINDOW_WIDTH_SIZE,
            CHAT_OVERLAY_HORIZONTAL_SPACING =
              _Constants.Constants.CHAT_OVERLAY_HORIZONTAL_SPACING,
            NORMAL = _Constants.WINDOW_ENLARGEMENT_TYPE.NORMAL,
            MINIMIZED = _Constants.WINDOW_ENLARGEMENT_TYPE.MINIMIZED,
            additionalWindowPixels =
              expansionType === NORMAL
                ? CHAT_WINDOW_WIDTH_SIZE - CHAT_WINDOW_WIDTH_MINIMIZED_SIZE
                : CHAT_WINDOW_WIDTH_MINIMIZED_SIZE - CHAT_WINDOW_WIDTH_SIZE;

          if (expansionType === MINIMIZED) {
            if (
              CHAT_WINDOW_WIDTH_SIZE - CHAT_WINDOW_WIDTH_MINIMIZED_SIZE >=
              _this.state.windowSize - CHAT_OVERLAY_HORIZONTAL_SPACING * 2
            ) {
              _this.handleEnlargmentForMultipleWindow(
                id,
                callback,
                additionalWindowPixels
              );
            } else {
              _this.handleEnlargmentForSingleWindow(
                additionalWindowPixels,
                callback
              );
            }
          } else {
            _this.handleEnlargmentForSingleWindow(
              additionalWindowPixels,
              callback
            );
          }
        }
      );

      _defineProperty(_assertThisInitialized(_this), "getWindow", function(id) {
        return _this.state.activeChatWindows.find(function(window) {
          return window.id === id;
        });
      });

      _defineProperty(
        _assertThisInitialized(_this),
        "resetChatContainer",
        function() {
          _this.setState({
            windowSize:
              window.innerWidth -
              (_this.props.rightHorizontalOverlaySpacing ||
                _Constants.Constants.CHAT_OVERLAY_HORIZONTAL_SPACING),
            activeChatWindows: []
          });
        }
      );

      if (props.hashKey && typeof props.hashKey !== "string") {
        throw new Error(
          "An hash key must be passed to ChatContainer. You can import hashKeyFunction or use any hash you feel comfortable with"
        );
      }

      var _ref = _react2["default"].createRef(),
        _Window = (0, _withInjectedPropsHOC.withInjectedProps)(
          _ChatWindow.ChatWindow,
          {
            closeWindowfn: _this.handleCloseWindow,
            handleEnlargementfn: _this.handleWindowEnlargement,
            _id: _this.props.currentAgentId,
            ref: _ref
          }
        ),
        pixelsToRemove = _this.props.currentAgentId
          ? _Constants.Constants.CHAT_WINDOW_WIDTH_SIZE +
            _Constants.Constants.DISTANCE_BETWEEN_CHAT_WINDOWS +
            (_this.props.rightHorizontalOverlaySpacing ||
              _Constants.Constants.CHAT_OVERLAY_HORIZONTAL_SPACING)
          : _this.props.rightHorizontalOverlaySpacing ||
            _Constants.Constants.CHAT_OVERLAY_HORIZONTAL_SPACING;

      _this.state = {
        windowSize: window.innerWidth - pixelsToRemove,
        activeChatWindows: _this.props.currentAgentId
          ? [
              {
                id: _this.props.currentAgentId,
                component: _Window,
                ref: _ref
              }
            ]
          : []
      };
      return _this;
    }

    _createClass(ChatContainer, [
      {
        key: "componentDidUpdate",
        value: function componentDidUpdate(prevProps) {
          var window = this.getWindow(this.props.currentAgentId),
            CHAT_WINDOW_WIDTH_SIZE =
              _Constants.Constants.CHAT_WINDOW_WIDTH_SIZE,
            DISTANCE_BETWEEN_CHAT_WINDOWS =
              _Constants.Constants.DISTANCE_BETWEEN_CHAT_WINDOWS,
            CHAT_OVERLAY_HORIZONTAL_SPACING =
              _Constants.Constants.CHAT_OVERLAY_HORIZONTAL_SPACING;

          if (
            prevProps.hashKey !== this.props.hashKey &&
            this.props.hashKey.trim().length > 0 &&
            this.props.currentAgentId.trim().length > 0
          ) {
            if (window === undefined) {
              if (
                this.state.windowSize >
                CHAT_WINDOW_WIDTH_SIZE +
                  DISTANCE_BETWEEN_CHAT_WINDOWS +
                  CHAT_OVERLAY_HORIZONTAL_SPACING
              ) {
                this.createWindow(this.props.currentAgentId);
              } else {
                /**
                 * !!!IMPORTANT
                 * Here we want to check each of the windows to see which is empty
                 * @see ChatContainer.reshuffleWindow
                 */
                this.reshuffleWindow(this.props.currentAgentId);
              }
            } else {
              /**
               * Add focus to the chat window currently clicked using the reference
               * to the chat window
               */
              window.ref.current.forceWindowFocus();
            }
          }
        }
        /**
         * @typedef {Object} Found
         * @property {boolean} result - boolean indicating if all windows have unsent contents
         * @property {Object} foundWindow - reference to window with sent content i.e empty message box or null otherwise
         *
         *
         * @returns {Found}
         *          The result of checking if all windows have unsent contents.
         * @description This function checks and returns result as true if all windows has contents
         * that has not been sent.
         */
      },
      {
        key: "render",
        value: function render() {
          if (typeof this.props.children === "function") {
            return _react2["default"].createElement(
              "div",
              {
                className: _styles.classes.container,
                style: {
                  right:
                    this.props.rightHorizontalOverlaySpacing ||
                    _Constants.Constants.CHAT_OVERLAY_HORIZONTAL_SPACING
                }
              },
              this.props.children(this.state.activeChatWindows)
            );
          }

          return null;
        }
      }
    ]);

    return ChatContainer;
  })(_react2["default"].PureComponent));

_defineProperty(ChatContainer, "propTypes", {
  currentAgentId: _propTypes2["default"].string.isRequired,
  hashKey: _propTypes2["default"].string.isRequired,
  onRequestClose: _propTypes2["default"].func.isRequired,
  rightHorizontalOverlaySpacing: _propTypes2["default"].number
});

_defineProperty(ChatContainer, "defaultProps", {
  currentAgentId: ""
});
