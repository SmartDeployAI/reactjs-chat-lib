"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _emojiJs = require("emoji-js");

var _emojiJs2 = _interopRequireDefault(_emojiJs);

var _emojiDataLib = require("./emojiDataLib");

var _emojiDataLib2 = _interopRequireDefault(_emojiDataLib);

var _styles = require("./styles");

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var emojiConvertor = new _emojiJs2["default"]();
emojiConvertor.init_env();

var EmojiPicker = function EmojiPicker(_ref) {
  var onPicked = _ref.onPicked,
    filter = _ref.filter;
  return _react2["default"].createElement(
    "div",
    {
      className: _styles.classes.emojiPicker
    },
    _emojiDataLib2["default"].map(function(category, i) {
      var filteredEmojis = category.emojis.filter(function(_ref2) {
        var name = _ref2.name;
        return name.includes(filter);
      });
      return _react2["default"].createElement(
        "div",
        {
          key: i,
          style: {
            display: "flex",
            position: "relative",
            flexDirection: "column"
          }
        },
        filteredEmojis.length > 0 &&
          _react2["default"].createElement(
            "div",
            {
              className: _styles.classes.emojiPickerCategoryTitle
            },
            category.name
          ),
        _react2["default"].createElement(
          "div",
          {
            className: _styles.classes.emojiPickerCategory
          },
          filteredEmojis.map(function(_ref3) {
            var _char = _ref3["char"],
              _name = _ref3._name;
            return _react2["default"].createElement(
              "span",
              {
                key: _char,
                className: _styles.classes.emojiPickerEmoji,
                onClick: function onClick() {
                  return onPicked(_char);
                }
              },
              _char
            );
          })
        )
      );
    })
  );
};

exports["default"] = EmojiPicker;
