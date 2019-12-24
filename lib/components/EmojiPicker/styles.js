"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.classes = undefined;

var _typestyle = require("typestyle");

var _Constants = require("../../utils/Constants");

var classes = (exports.classes = (0, _typestyle.stylesheet)({
  emojiPicker: {
    overflow: "auto",
    width: "100%",
    maxHeight: "calc(100% - 40px)",
    boxSizing: "border-box",
    padding: "15px",
    paddingTop: 0
  },
  emojiPickerCategory: {
    display: "flex",
    flexWrap: "wrap"
  },
  emojiPickerCategoryTitle: {
    minWidth: "100%",
    color: "#232333",
    fontWeight: 500,
    fontSize: 13,
    padding: "10px 6px",
    background: "#fff",
    letterSpacing: 1,
    position: "sticky",
    top: 0
  },
  emojiPickerEmoji: {
    margin: "5px",
    width: "30px",
    lineHeight: "30px",
    textAlign: "center",
    cursor: "pointer",
    verticalAlign: "middle",
    fontSize: "28px",
    transition: "transform 60ms ease-out,-webkit-transform 60ms ease-out",
    transitionDelay: "60ms",
    $nest: {
      "&&::hover": {
        transform: "scale(1.4)"
      }
    }
  },
  popupWindow: {
    position: "fixed",
    width: "150px"
  },
  popupInner: {
    position: "absolute",
    bottom: "60px",
    right: "100px",
    width: "330px",
    zIndex: "6",
    transition: "0.2s ease-in-out",
    margin: "auto",
    borderRadius: "10px",
    background: "white",
    padding: "0px 5px 5px 5px",
    maxHeight: "260px",
    height: "260px",
    boxSizing: "border-box",
    boxShadow: "0px 7px 40px 2px rgba(148, 149, 150, 0.3)"
  },
  popupWindowCointainerClosed: {
    opacity: "0",
    visibility: "hidden",
    bottom: "14px"
  },
  popupWindowSearch: {
    width: "290px",
    boxSizing: "border-box",
    margin: "auto",
    display: "block",
    borderWidth: "0px 0px 1px 0px",
    color: "#565867",
    paddingLeft: "25px",
    height: "40px",
    fontSize: "14px",
    backgroundImage:
      "url(https://js.intercomcdn.com/images/search@2x.32fca88e.png)",
    backgroundSize: "16px 16px",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "0 12px",
    outline: "none"
  }
}));
