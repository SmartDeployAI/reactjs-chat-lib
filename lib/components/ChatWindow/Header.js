"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _fa = require("react-icons/fa");

var _styles = require("./styles");

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var Header = function Header(_ref) {
  var onProfileClick = _ref.onProfileClick,
    userName = _ref.userName,
    onClose = _ref.onClose,
    onMinimize = _ref.onMinimize,
    isOnline = _ref.isOnline,
    agentId = _ref.agentId;
  return _react2["default"].createElement(
    "header",
    {
      className: _styles.classes.header
    },
    _react2["default"].createElement(
      "section",
      {
        className: _styles.classes.headerDetails
      },
      _react2["default"].createElement(
        "div",
        {
          className: _styles.classes.headerFlex
        },
        _react2["default"].createElement(
          "h4",
          {
            className: _styles.classes.heading
          },
          onProfileClick
            ? _react2["default"].createElement(
                "a",
                {
                  onClick: onProfileClick
                    ? function() {
                        return onProfileClick(agentId);
                      }
                    : function() {
                        return null;
                      },
                  target: "_blank",
                  style: {
                    color: "#fff",
                    cursor: "pointer"
                  }
                },
                _react2["default"].createElement("span", null, userName)
              )
            : _react2["default"].createElement(
                "span",
                {
                  style: {
                    color: "#fff"
                  }
                },
                userName
              )
        ),
        isOnline &&
          _react2["default"].createElement(
            "div",
            {
              className: _styles.classes.activeContainer
            },
            _react2["default"].createElement("div", {
              className: _styles.classes.activeIcon
            }),
            _react2["default"].createElement("span", null, "Active now")
          )
      )
    ),
    _react2["default"].createElement(
      "section",
      {
        className: _styles.classes.headerControls
      },
      _react2["default"].createElement(
        "button",
        {
          className: _styles.classes.headerButton,
          onClick: onMinimize
        },
        _react2["default"].createElement(
          "span",
          {
            className: _styles.classes.iconWrapper
          },
          _react2["default"].createElement(_fa.FaMinus, null)
        )
      ),
      _react2["default"].createElement(
        "button",
        {
          className: _styles.classes.headerButton,
          onClick: onClose
        },
        _react2["default"].createElement(
          "span",
          {
            className: _styles.classes.iconWrapper
          },
          _react2["default"].createElement(_fa.FaTimes, null)
        )
      )
    )
  );
};

Header.propTypes = {
  agentId: _propTypes2["default"].oneOfType([
    _propTypes2["default"].string,
    _propTypes2["default"].number
  ]).isRequired,
  onProfileClick: _propTypes2["default"].func,
  userName: _propTypes2["default"].string.isRequired,
  onClose: _propTypes2["default"].func.isRequired,
  onMinimize: _propTypes2["default"].func.isRequired,
  isOnline: _propTypes2["default"].bool.isRequired
};
exports["default"] = Header;
