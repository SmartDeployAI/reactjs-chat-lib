"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.classes = undefined;

var _typestyle = require("typestyle");

var _Constants = require("../../utils/Constants");

var classes = (exports.classes = (0, _typestyle.stylesheet)({
  container: {
    position: "fixed",
    zIndex: 2000000,
    bottom: 0,
    height: 0,
    overflow: "visible",
    display: "flex",
    flexWrap: "nowrap",
    alignItems: "flex-end",
    flexDirection: "row-reverse",
    width: "100%",
    right: _Constants.Constants.CHAT_OVERLAY_HORIZONTAL_SPACING
  }
}));
