"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ChatWindow = undefined;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _typestyle = require("typestyle");

var _styles = require("./styles");

var _index = require("../TopAvatar/index");

var _index2 = require("../MessageList/index");

var _index3 = require("../MessageBox/index");

var _Constants = require("../../utils/Constants");

var _Header = require("./Header");

var _Header2 = _interopRequireDefault(_Header);

var _DragAndDropInterface = require("../DragAndDropInterface");

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
 *
 * @description This is the instance of a single chat window created between two parties
 * We treat each instance like a seperate component created within the React lifecycle
 * providing each instance with mount, update and uillUnmount lifecycles so the user can perform
 * any custom function in them
 */
var ChatWindow =
  /*#__PURE__*/
  (exports.ChatWindow = (function(_React$PureComponent) {
    _inherits(ChatWindow, _React$PureComponent);

    function ChatWindow(props) {
      var _this;

      _classCallCheck(this, ChatWindow);

      _this = _possibleConstructorReturn(
        this,
        _getPrototypeOf(ChatWindow).call(this, props)
      );

      _defineProperty(
        _assertThisInitialized(_this),
        "hasUnsentContent",
        function() {
          return _this.messageBoxRef.current.value.trim().length > 0;
        }
      );

      _defineProperty(
        _assertThisInitialized(_this),
        "getEnlargementType",
        function() {
          return _this.state.enlargementType;
        }
      );

      _defineProperty(
        _assertThisInitialized(_this),
        "setEnlargementType",
        function() {
          var MINIMIZED = _Constants.WINDOW_ENLARGEMENT_TYPE.MINIMIZED,
            NORMAL = _Constants.WINDOW_ENLARGEMENT_TYPE.NORMAL;

          _this.setState(
            function(prevState) {
              return {
                enlargementType:
                  prevState.enlargementType === NORMAL ? MINIMIZED : NORMAL
              };
            },
            function() {
              _this.state.enlargementType == NORMAL &&
                _this.messageBoxRef.current.focus();
            }
          );
        }
      );

      _defineProperty(_assertThisInitialized(_this), "closeWindow", function() {
        _this.props.closeWindowfn(_this.props._id);
      });

      _defineProperty(
        _assertThisInitialized(_this),
        "handleEnlargement",
        function() {
          _this.props.handleEnlargementfn(
            _this.props._id,
            _this.setEnlargementType
          );
        }
      );

      _defineProperty(
        _assertThisInitialized(_this),
        "handleOpenFileSelector",
        function() {
          _this.setState({
            isDnDVisible: true,
            dndTrigger: _Constants.DND_TRIGGER.NATIVE_FILE_SELECTOR
          });
        }
      );

      _defineProperty(
        _assertThisInitialized(_this),
        "handleCloseFileSelector",
        function() {
          _this.setState({
            isDnDVisible: false
          });
        }
      );

      _defineProperty(
        _assertThisInitialized(_this),
        "handleSelectFile",
        function(file) {
          if (
            file &&
            Object.values(_Constants.FILE_UPLOAD_TYPE).indexOf(file.type) !== -1
          ) {
            var id = Date.now();

            _this.setState(
              function(prevState) {
                return {
                  files: [].concat(_toConsumableArray(prevState.files), [
                    {
                      id: id,
                      file: file
                    }
                  ])
                };
              },
              function() {
                _this.handleCloseFileSelector();

                _this.props.onUploadFile &&
                  _this.props.onUploadFile({
                    id: id,
                    file: file
                  });
              }
            );
          }
        }
      );

      _defineProperty(
        _assertThisInitialized(_this),
        "handleFileRemove",
        function(id) {
          var file = _this.state.files.find(function(file) {
            return file.id === id;
          });

          _this.setState(
            function(prevState) {
              return {
                files: prevState.files.filter(function(file) {
                  return file.id !== id;
                })
              };
            },
            function() {
              _this.props.onRemoveFile && _this.props.onRemoveFile(file);
            }
          );
        }
      );

      _defineProperty(
        _assertThisInitialized(_this),
        "handleRetryFileUpload",
        function(id) {
          var file = _this.state.files.find(function(file) {
            return file.id === id;
          });

          _this.props.onRetryFileUpload && _this.props.onRetryFileUpload(file);
        }
      );

      _defineProperty(
        _assertThisInitialized(_this),
        "handleClearAllFiles",
        function() {
          _this.setState({
            files: []
          });
        }
      );

      _defineProperty(
        _assertThisInitialized(_this),
        "handleDragEnter",
        function(event) {
          event.stopPropagation();
          event.preventDefault();

          _this.setState({
            isDnDVisible: true,
            dndTrigger: _Constants.DND_TRIGGER.FILE_DRAG
          });
        }
      );

      _defineProperty(
        _assertThisInitialized(_this),
        "handleCloseDnD",
        function() {
          /**
           * @todo
           * This is a work around till we find a perfect way to close this when the
           * cancel button click in an input file is detected
           */
          _this.setState({
            isDnDVisible: false
          });
        }
      );

      _defineProperty(
        _assertThisInitialized(_this),
        "forceWindowFocus",
        function() {
          if (
            _this.getEnlargementType() ===
            _Constants.WINDOW_ENLARGEMENT_TYPE.MINIMIZED
          ) {
            _this.handleEnlargement();
          }

          _this.messageBoxRef.current.focus();
        }
      );

      _this.messageBoxRef = _react2["default"].createRef();
      _this.containerRef = _react2["default"].createRef();
      _this.state = {
        enlargementType: _Constants.WINDOW_ENLARGEMENT_TYPE.NORMAL,
        isDnDVisible: false,
        files: [],
        dndTrigger: ""
      };
      return _this;
    }

    _createClass(ChatWindow, [
      {
        key: "componentDidMount",
        value: function componentDidMount() {
          var _this$props = this.props,
            windowDidMount = _this$props.windowDidMount,
            agentProfile = _this$props.agentProfile,
            senderProfile = _this$props.senderProfile;
          windowDidMount &&
            windowDidMount({
              agentProfile: agentProfile,
              senderProfile: senderProfile
            }); //scroll to the bottom of the message list when the component mounts

          this.containerRef.current.scrollTo({
            top: this.containerRef.current.scrollHeight,
            left: 0,
            behaviour: "smooth"
          });
        }
      },
      {
        key: "componentDidUpdate",
        value: function componentDidUpdate(prevProps) {
          var _this$props2 = this.props,
            windowDidUpdate = _this$props2.windowDidUpdate,
            agentProfile = _this$props2.agentProfile,
            senderProfile = _this$props2.senderProfile,
            messages = _this$props2.messages; //Heuristic assume that the component updated iff the length of messages changes across intervals

          if (messages.length !== prevProps.messages.length) {
            windowDidUpdate &&
              windowDidUpdate({
                agentProfile: agentProfile,
                senderProfile: senderProfile,
                message: messages[messages.length - 1]
              });
            this.containerRef.current.scrollTo({
              top: this.containerRef.current.scrollHeight,
              left: 0,
              behaviour: "smooth"
            });
          }
        }
      },
      {
        key: "componentWillUnmount",
        value: function componentWillUnmount() {
          var _this$props3 = this.props,
            windowWillUnmount = _this$props3.windowWillUnmount,
            agentProfile = _this$props3.agentProfile,
            senderProfile = _this$props3.senderProfile;
          windowWillUnmount &&
            windowWillUnmount({
              agentProfile: agentProfile,
              senderProfile: senderProfile
            });
        }
        /**
         * @return {boolean}
         *
         * @description This function returns boolean value indicating if there are unsent contents or not
         */
      },
      {
        key: "render",
        value: function render() {
          var _this2 = this;

          var _this$props4 = this.props,
            _this$props4$agentPro = _this$props4.agentProfile,
            name = _this$props4$agentPro.name,
            avatar = _this$props4$agentPro.avatar,
            subtitle = _this$props4$agentPro.subtitle,
            isOnline = _this$props4$agentPro.isOnline,
            id = _this$props4$agentPro.id,
            messages = _this$props4.messages,
            onSend = _this$props4.onSend,
            senderProfile = _this$props4.senderProfile,
            onProfileClick = _this$props4.onProfileClick,
            filesUploadProps = _this$props4.filesUploadProps;
          messages = messages || [];
          return _react2["default"].createElement(
            "div",
            {
              id: "launcher",
              className: (0, _typestyle.classes)(
                _styles.classes.container,
                this.state.enlargementType ===
                  _Constants.WINDOW_ENLARGEMENT_TYPE.MINIMIZED &&
                  _styles.classes.chatWindowMinimized
              ),
              onDragEnter: this.handleDragEnter,
              onDragOver: this.handleDragEnter
            },
            _react2["default"].createElement(_Header2["default"], {
              onProfileClick: onProfileClick,
              onClose: this.closeWindow,
              onMinimize: this.handleEnlargement,
              userName: name,
              agentId: id,
              isOnline: isOnline
            }),
            _react2["default"].createElement(
              "div",
              {
                className: _styles.classes.contentWrapper
              },
              _react2["default"].createElement(
                "div",
                {
                  className: _styles.classes.chatContainer
                },
                _react2["default"].createElement(
                  "div",
                  {
                    ref: this.containerRef,
                    className: _styles.classes.conversationContainer
                  },
                  _react2["default"].createElement(
                    "ul",
                    {
                      className: _styles.classes.conversationListContent
                    },
                    _react2["default"].createElement(_index.TopAvatar, {
                      avatar: avatar,
                      agentId: id,
                      subtitle: subtitle,
                      userName: name,
                      onProfileClick: onProfileClick,
                      isOnline: isOnline
                    }),
                    _react2["default"].createElement(
                      "li",
                      null,
                      _react2["default"].createElement(_index2.MessageList, {
                        messages: messages,
                        agentId: id,
                        agentAvatar: avatar,
                        agentName: name,
                        onProfileClick: onProfileClick,
                        senderId: senderProfile.id,
                        senderAvatar: senderProfile.avatar,
                        senderName: senderProfile.name
                      })
                    )
                  )
                )
              )
            ),
            _react2["default"].createElement(_index3.MessageBox, {
              onSetMessageBoxRef: function onSetMessageBoxRef(ref) {
                return (_this2.messageBoxRef = ref);
              },
              onSend: onSend,
              files: this.state.files,
              onClearAllFiles: this.handleClearAllFiles,
              onRemoveFile: this.handleFileRemove,
              onOpenFileSelector: this.handleOpenFileSelector,
              onFileChange: this.handleSelectFile,
              onRetryFileUpload: this.handleRetryFileUpload,
              filesUploadProps: filesUploadProps,
              senderId: senderProfile.id,
              agentId: id
            }),
            _react2["default"].createElement(
              _DragAndDropInterface.DragAndDropInterface,
              {
                onRequestClose: this.handleCloseDnD,
                triggerType: this.state.dndTrigger,
                visible: this.state.isDnDVisible,
                onFileChange: this.handleSelectFile
              }
            )
          );
        }
      }
    ]);

    return ChatWindow;
  })(_react2["default"].PureComponent));

_defineProperty(ChatWindow, "propTypes", {
  windowDidMount: _propTypes2["default"].func,
  windowDidUpdate: _propTypes2["default"].func,
  windowWillUnmount: _propTypes2["default"].func,
  onSend: _propTypes2["default"].func.isRequired,
  onUploadFile: _propTypes2["default"].func,
  onProfileClick: _propTypes2["default"].func,
  onRemoveFile: _propTypes2["default"].func,
  onRetryFileUpload: _propTypes2["default"].func,
  agentProfile: _propTypes2["default"].shape({
    name: _propTypes2["default"].string,
    id: _propTypes2["default"].oneOfType([
      _propTypes2["default"].string,
      _propTypes2["default"].number
    ]).isRequired,
    avatar: _propTypes2["default"].string,
    isOnline: _propTypes2["default"].bool.isRequired,
    subtitle: _propTypes2["default"].string
  }),
  senderProfile: _propTypes2["default"].shape({
    name: _propTypes2["default"].string,
    id: _propTypes2["default"].oneOfType([
      _propTypes2["default"].string,
      _propTypes2["default"].number
    ]).isRequired,
    avatar: _propTypes2["default"].string,
    isOnline: _propTypes2["default"].bool,
    subtitle: _propTypes2["default"].string
  }),
  filesUploadProps: _propTypes2["default"].objectOf(
    _propTypes2["default"].shape({
      isUploading: _propTypes2["default"].bool.isRequired,
      done: _propTypes2["default"].bool.isRequired,
      error: _propTypes2["default"].bool.isRequired,
      errorHelperText: _propTypes2["default"].string,
      progress: _propTypes2["default"].number
    })
  ),
  messages: _propTypes2["default"].arrayOf(
    _propTypes2["default"].shape({
      id: _propTypes2["default"].oneOfType([
        _propTypes2["default"].string,
        _propTypes2["default"].number
      ]),
      type: _propTypes2["default"].oneOf(["text", "emoji"]).isRequired,
      text: _propTypes2["default"].string.isRequired,
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
  )
});
