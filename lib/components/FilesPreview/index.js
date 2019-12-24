"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FilesPreview = undefined;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _md = require("react-icons/md");

var _typestyle = require("typestyle");

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
 * @description This component handles the preview of files in the chat
 * For now, it supports the preview of just image files as this is what we handle at the moment
 */
var FilesPreview =
  /*#__PURE__*/
  (exports.FilesPreview = (function(_React$PureComponent) {
    _inherits(FilesPreview, _React$PureComponent);

    function FilesPreview() {
      var _getPrototypeOf2;

      var _this;

      _classCallCheck(this, FilesPreview);

      for (
        var _len = arguments.length, args = new Array(_len), _key = 0;
        _key < _len;
        _key++
      ) {
        args[_key] = arguments[_key];
      }

      _this = _possibleConstructorReturn(
        this,
        (_getPrototypeOf2 = _getPrototypeOf(FilesPreview)).call.apply(
          _getPrototypeOf2,
          [this].concat(args)
        )
      );

      _defineProperty(_assertThisInitialized(_this), "state", {
        files: []
      });

      _defineProperty(
        _assertThisInitialized(_this),
        "renderFilePreview",
        function(id) {
          var filesUploadProps = _this.props.filesUploadProps,
            _filesUploadProps = filesUploadProps || {},
            uploadProps = _filesUploadProps[id] || {},
            previewText = "";

          if (uploadProps.error === true && uploadProps.isUploading === false) {
            previewText =
              uploadProps.errorHelperText ||
              "The upload failed. Please try again.";
          } else if (
            uploadProps.done === true &&
            uploadProps.isUploading === false
          ) {
            previewText = "Attached";
          } else if (
            uploadProps.done === false &&
            uploadProps.isUploading === true
          ) {
            previewText = "Uploading...";
          }

          return _react2["default"].createElement(
            "span",
            {
              className: (0, _typestyle.classes)(
                _styles.classes.previewAttachedText,
                uploadProps.error === true &&
                  uploadProps.isUploading === false &&
                  _styles.classes.previewErrorText,
                uploadProps.isUploading === true &&
                  _styles.classes.previewUploadingText
              )
            },
            previewText
          );
        }
      );

      _defineProperty(
        _assertThisInitialized(_this),
        "renderProgressBar",
        function(id) {
          var filesUploadProps = _this.props.filesUploadProps,
            _filesUploadProps = filesUploadProps || {},
            uploadProps = _filesUploadProps[id] || {};

          if (uploadProps.progress === undefined) {
            return;
          } else if (
            uploadProps.progress !== undefined &&
            typeof uploadProps.progress !== "number"
          ) {
            throw new Error(
              "Progress value for image upload must be a number between 0 and 1"
            );
          }

          return uploadProps.progress === undefined ||
            uploadProps.done === true ||
            uploadProps.error === true
            ? null
            : _react2["default"].createElement(
                "div",
                {
                  className: _styles.classes.progressBar
                },
                _react2["default"].createElement("div", {
                  className: _styles.classes.progressValue,
                  style: {
                    width: "".concat(uploadProps.progress * 100, "%")
                  }
                })
              );
        }
      );

      return _this;
    }

    _createClass(FilesPreview, [
      {
        key: "componentDidUpdate",
        value: function componentDidUpdate(prevProps) {
          var _this2 = this;

          if (prevProps.files.length !== this.props.files.length) {
            if (this.props.files.length > prevProps.files.length) {
              /**
               * @description
               * When this occurs it means that a new file has been added
               * For performance purposes, we only try to obtain the base64
               * encoding of the last file added and add it to file in our state
               *
               * Also we want to do the necessary encoding only if
               * the file format is supported by our system
               */
              var _this$props$files = this.props.files[
                  this.props.files.length - 1
                ],
                file = _this$props$files.file,
                id = _this$props$files.id,
                fileReader = new FileReader();

              if (
                Object.values(_Constants.FILE_UPLOAD_TYPE).indexOf(
                  file.type
                ) !== -1
              ) {
                fileReader.onload = function(event) {
                  _this2.setState(function(prevState) {
                    return {
                      files: [].concat(_toConsumableArray(prevState.files), [
                        {
                          id: id,
                          name: file.name,
                          size: file.size,
                          type: file.type,
                          base64: event.target.result
                        }
                      ])
                    };
                  });
                };

                fileReader.readAsDataURL(file);
              }
            } else if (this.props.files.length < prevProps.files.length) {
              /**
               * @description
               * When this occurs it means that a file has been removed
               * To adequately remove the missing file, we need to check
               * for the file that is missing and remove it from our state
               *
               * However this is done appropriately since we use a timestamp ID and not an index ID
               * therefore ReactJs will not destroy and create any list of file preview :-)
               */
              var ArrayOfIds = this.props.files.map(function(file) {
                return file.id;
              });
              this.setState(function(prevState) {
                return {
                  files: prevState.files.filter(function(file) {
                    return ArrayOfIds.indexOf(file.id) !== -1;
                  })
                };
              });
            }
          }
        }
      },
      {
        key: "render",
        value: function render() {
          var _this3 = this;

          var filesUploadProps = this.props.filesUploadProps,
            _filesUploadProps = filesUploadProps || {};

          return _react2["default"].createElement(
            _react2["default"].Fragment,
            null,
            this.state.files.map(function(file) {
              return _react2["default"].createElement(
                "figure",
                {
                  key: file.id,
                  className: _styles.classes.fileContainer
                },
                _react2["default"].createElement(
                  "div",
                  {
                    className: _styles.classes.previewImageContainer
                  },
                  _react2["default"].createElement("img", {
                    className: _styles.classes.previewImage,
                    src: file.base64
                  })
                ),
                _react2["default"].createElement(
                  "figcaption",
                  {
                    className: _styles.classes.previewCaptionContainer
                  },
                  _react2["default"].createElement(
                    "div",
                    {
                      style: {
                        display: "flex",
                        alignItems: "center"
                      }
                    },
                    _react2["default"].createElement(
                      "span",
                      {
                        className: _styles.classes.previewName
                      },
                      file.name
                    ),
                    _react2["default"].createElement("div", {
                      className: _styles.classes.dotSeperator
                    }),
                    _react2["default"].createElement(
                      "span",
                      {
                        className: _styles.classes.previewSize
                      },
                      Math.round(file.size / 1000),
                      " KB"
                    )
                  ),
                  _this3.renderFilePreview(file.id),
                  _this3.renderProgressBar(file.id)
                ),
                _react2["default"].createElement(
                  "div",
                  {
                    style: {
                      display: "flex"
                    }
                  },
                  _filesUploadProps[file.id] &&
                    _filesUploadProps[file.id].error === true &&
                    _filesUploadProps[file.id].isUploading === false &&
                    _react2["default"].createElement(_md.MdCached, {
                      onClick: function onClick() {
                        return _this3.props.onRetryFileUpload(file.id);
                      },
                      className: _styles.classes.previewActionBtn,
                      style: {
                        marginRight: 2
                      }
                    }),
                  _react2["default"].createElement(_md.MdClose, {
                    className: _styles.classes.previewActionBtn,
                    onClick: function onClick() {
                      return _this3.props.onRemoveFile(file.id);
                    }
                  })
                )
              );
            })
          );
        }
      }
    ]);

    return FilesPreview;
  })(_react2["default"].PureComponent));

_defineProperty(FilesPreview, "propTypes", {
  files: _propTypes2["default"].arrayOf(
    _propTypes2["default"].shape({
      id: _propTypes2["default"].number.isRequired,
      file: _propTypes2["default"].any.isRequired
    })
  ).isRequired,
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
