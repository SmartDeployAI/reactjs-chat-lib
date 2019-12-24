"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MessageBox = undefined;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _typestyle = require("typestyle");

var _md = require("react-icons/md");

var _EmojiPicker = require("../EmojiPicker");

var _EmojiPicker2 = _interopRequireDefault(_EmojiPicker);

var _FilesPreview = require("../FilesPreview");

var _PopUp = require("../EmojiPicker/PopUp");

var _PopUp2 = _interopRequireDefault(_PopUp);

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
 * This is the message box of the Chat Window
 */
var MessageBox =
  /*#__PURE__*/
  (exports.MessageBox = (function(_React$PureComponent) {
    _inherits(MessageBox, _React$PureComponent);

    function MessageBox(props) {
      var _this;

      _classCallCheck(this, MessageBox);

      _this = _possibleConstructorReturn(
        this,
        _getPrototypeOf(MessageBox).call(this, props)
      );

      _defineProperty(
        _assertThisInitialized(_this),
        "handleEmojiClick",
        function(emoji) {
          _this.setState(function(prevState) {
            return {
              showEmoji: false,
              message: "".concat(prevState.message).concat(emoji),
              emojiFilter: ""
            };
          });
        }
      );

      _defineProperty(_assertThisInitialized(_this), "handleChange", function(
        e
      ) {
        _this.setState({
          message: e.target.value
        });
      });

      _defineProperty(
        _assertThisInitialized(_this),
        "closeEmojiPicker",
        function(e) {
          if (_this.emojiPickerButton.contains(e.target)) {
            e.stopPropagation();
            e.preventDefault();
          }

          _this.setState({
            showEmoji: false,
            emojiFilter: ""
          });
        }
      );

      _defineProperty(
        _assertThisInitialized(_this),
        "toggleEmojiState",
        function() {
          _this.setState({
            showEmoji: !_this.state.showEmoji
          });
        }
      );

      _defineProperty(
        _assertThisInitialized(_this),
        "getMessageFormat",
        function(content) {
          if (_this.props.files.length > 0) {
            return _Constants.MESSAGE_TYPE.FILES;
          }

          return /[a-zA-Z0-9]+/.test(content)
            ? _Constants.MESSAGE_TYPE.TEXT
            : _Constants.MESSAGE_TYPE.EMOJI;
        }
      );

      _defineProperty(
        _assertThisInitialized(_this),
        "handleEmojiFilterChange",
        function(event) {
          var emojiFilter = event.target.value.toLowerCase();

          _this.setState({
            emojiFilter: emojiFilter
          });
        }
      );

      _defineProperty(
        _assertThisInitialized(_this),
        "handleResetFileInput",
        function() {
          _this.props.onOpenFileSelector();

          _this.fileInputRef.current.value = null;
        }
      );

      _defineProperty(
        _assertThisInitialized(_this),
        "handleSelectFile",
        function(event) {
          var file = event.target.files[0];

          _this.props.onFileChange(file);
        }
      );

      _defineProperty(
        _assertThisInitialized(_this),
        "handleFileRemove",
        function(id) {
          _this.props.onRemoveFile(id);
        }
      );

      _defineProperty(_assertThisInitialized(_this), "handleSubmit", function(
        e
      ) {
        e.preventDefault();
        if (
          _this.state.message.trim().length === 0 &&
          _this.props.files.length === 0
        )
          return;
        var content = _this.state.message;

        _this.props.onSend({
          text: content.trim(),
          files: _toConsumableArray(_this.props.files),
          createdAt: "".concat(new Date()),
          type: _this.getMessageFormat(content),
          agentId: _this.props.agentId,
          senderId: _this.props.senderId
        });

        _this.setState(
          {
            message: ""
          },
          function() {
            return _this.messageBoxRef.current.focus();
          }
        );

        _this.props.onClearAllFiles();
      });

      _defineProperty(
        _assertThisInitialized(_this),
        "renderEmojiPopup",
        function() {
          return _react2["default"].createElement(
            _PopUp2["default"],
            {
              isOpen: _this.state.showEmoji,
              onClickedOutside: _this.closeEmojiPicker,
              onInputChange: _this.handleEmojiFilterChange
            },
            _react2["default"].createElement(_EmojiPicker2["default"], {
              onPicked: _this.handleEmojiClick,
              filter: _this.state.emojiFilter
            })
          );
        }
      );

      _this.state = {
        showEmoji: false,
        message: "",
        emojiFilter: ""
      };
      _this.messageBoxRef = _react2["default"].createRef();
      _this.fileInputRef = _react2["default"].createRef();
      return _this;
    }

    _createClass(MessageBox, [
      {
        key: "componentDidMount",
        value: function componentDidMount() {
          this.emojiPickerButton = document.querySelector(
            "#emoji-picker-button"
          );
          this.props.onSetMessageBoxRef(this.messageBoxRef);
        }
        /**
         * @param {string} emoji
         *        This is the emoji selected
         *
         * @description This function adds the emoji to the message
         */
      },
      {
        key: "render",
        value: function render() {
          return _react2["default"].createElement(
            "div",
            null,
            _react2["default"].createElement(_FilesPreview.FilesPreview, {
              files: this.props.files,
              onRetryFileUpload: this.props.onRetryFileUpload,
              filesUploadProps: this.props.filesUploadProps,
              onRemoveFile: this.handleFileRemove
            }),
            _react2["default"].createElement(
              "form",
              {
                className: _styles.classes.messageBox,
                onSubmit: this.handleSubmit
              },
              _react2["default"].createElement(
                "div",
                {
                  className: _styles.classes.textEditor
                },
                _react2["default"].createElement(
                  "div",
                  {
                    className: _styles.classes.editor
                  },
                  _react2["default"].createElement("textarea", {
                    placeholder: "Write a message...",
                    onChange: this.handleChange,
                    className: _styles.classes.editorBox,
                    value: this.state.message,
                    ref: this.messageBoxRef
                  })
                )
              ),
              _react2["default"].createElement(
                "footer",
                {
                  className: _styles.classes.footer
                },
                _react2["default"].createElement(
                  "div",
                  {
                    className: _styles.classes.IconsWrapper
                  },
                  _react2["default"].createElement(
                    "button",
                    {
                      className: _styles.classes.toolboxItemBtn,
                      style: {
                        fontSize: 17
                      },
                      type: "button"
                    },
                    _react2["default"].createElement("input", {
                      ref: this.fileInputRef,
                      onClick: this.handleResetFileInput,
                      onChange: this.handleSelectFile,
                      type: "file",
                      className: _styles.classes.fileIcon
                    }),
                    _react2["default"].createElement(_md.MdAttachFile, {
                      style: {
                        transform: "rotate(90deg)"
                      }
                    })
                  ),
                  _react2["default"].createElement(
                    "button",
                    {
                      id: "emoji-picker-button",
                      className: _styles.classes.toolboxItemBtn,
                      type: "button",
                      onClick: this.toggleEmojiState
                    },
                    _react2["default"].createElement(
                      "i",
                      {
                        className: _styles.classes.emojiIcon
                      },
                      _react2["default"].createElement(
                        "svg",
                        {
                          viewBox: "0 0 24 24",
                          width: "24px",
                          height: "24px",
                          x: "0",
                          y: "0",
                          preserveAspectRatio: "xMinYMin meet",
                          className: "",
                          focusable: "false"
                        },
                        _react2["default"].createElement("path", {
                          d:
                            "M4.84,6A1.16,1.16,0,1,1,6,7.17,1.17,1.17,0,0,1,4.84,6ZM8,9.38a3.51,3.51,0,0,1-2.3-.81L4.87,9.86a4.87,4.87,0,0,0,6.25,0L10.3,8.58A3.51,3.51,0,0,1,8,9.38Zm2-4.55A1.17,1.17,0,1,0,11.16,6,1.17,1.17,0,0,0,10,4.83ZM8,2.88A5.12,5.12,0,1,1,2.88,8,5.12,5.12,0,0,1,8,2.88M8,1a7,7,0,1,0,7,7A7,7,0,0,0,8,1Z",
                          className: "",
                          style: {
                            fillOpacity: "0.6"
                          }
                        })
                      )
                    )
                  )
                ),
                _react2["default"].createElement(
                  "div",
                  {
                    className: _styles.classes.btnWrapper
                  },
                  _react2["default"].createElement(
                    "div",
                    null,
                    _react2["default"].createElement(
                      "button",
                      {
                        className: (0, _typestyle.classes)(
                          _styles.classes.msgBtn,
                          this.state.message.trim().length === 0 &&
                            this.props.files.length === 0 &&
                            _styles.classes.msgBtnDisabled
                        ),
                        type: "submit",
                        disabled:
                          this.state.message.trim().length === 0 &&
                          this.props.files.length === 0
                      },
                      "Send"
                    )
                  )
                )
              )
            ),
            this.renderEmojiPopup()
          );
        }
      }
    ]);

    return MessageBox;
  })(_react2["default"].PureComponent));

_defineProperty(MessageBox, "propTypes", {
  onSetMessageBoxRef: _propTypes2["default"].func.isRequired,
  onSend: _propTypes2["default"].func.isRequired,
  agentId: _propTypes2["default"].oneOfType([
    _propTypes2["default"].string,
    _propTypes2["default"].number
  ]).isRequired,
  senderId: _propTypes2["default"].oneOfType([
    _propTypes2["default"].string,
    _propTypes2["default"].number
  ]),
  onOpenFileSelector: _propTypes2["default"].func,
  onClearAllFiles: _propTypes2["default"].func,
  onFileChange: _propTypes2["default"].func,
  onCloseFileSelector: _propTypes2["default"].func,
  onRemoveFile: _propTypes2["default"].func,
  onRetryFileUpload: _propTypes2["default"].func,
  filesUploadProps: _propTypes2["default"].objectOf(
    _propTypes2["default"].shape({
      isUploading: _propTypes2["default"].bool.isRequired,
      done: _propTypes2["default"].bool.isRequired,
      error: _propTypes2["default"].bool.isRequired,
      errorHelperText: _propTypes2["default"].string,
      progress: _propTypes2["default"].number
    })
  )
});
