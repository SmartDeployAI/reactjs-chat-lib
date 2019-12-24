"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.classes = undefined;

var _dndRelativeContainer;

var _typestyle = require("typestyle");

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

var classes = (exports.classes = (0, _typestyle.stylesheet)({
  fadeContainer: {
    position: "absolute",
    width: "inherit",
    height: "inherit",
    background: "#fff",
    marginTop: 43,
    opacity: 0.9,
    zIndex: 1000
  },
  dndContainer: {
    position: "absolute",
    width: "inherit",
    height: "inherit",
    background: "transparent",
    marginTop: 43,
    zIndex: 2000,
    padding: 2,
    boxSizing: "border-box",
    paddingBottom: 45
  },
  dndRelativeContainer:
    ((_dndRelativeContainer = {
      width: "100%",
      position: "relative",
      height: "calc(100%)",
      boxSizing: "border-box"
    }),
    _defineProperty(_dndRelativeContainer, "boxSizing", "border-box"),
    _defineProperty(_dndRelativeContainer, "borderRadius", 2),
    _defineProperty(_dndRelativeContainer, "display", "flex"),
    _defineProperty(_dndRelativeContainer, "flexDirection", "column"),
    _defineProperty(_dndRelativeContainer, "justifyContent", "center"),
    _defineProperty(_dndRelativeContainer, "alignItems", "center"),
    _dndRelativeContainer),
  boldText: {
    fontWeight: 500,
    fontSize: 17,
    marginTop: 15,
    marginBottom: 5,
    color: "#232333"
  },
  mediumText: {
    fontWeight: "light",
    fontSize: 14,
    color: "#232333"
  }
}));
