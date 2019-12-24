"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.classes = undefined;

var _typestyle = require("typestyle");

var classes = (exports.classes = (0, _typestyle.stylesheet)({
  fileContainer: {
    padding: "8px 12px",
    width: "inherit",
    margin: 0,
    borderTop: "1px solid rgba(0,0,0,.1)",
    background: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between"
  },
  previewImageContainer: {
    height: 40,
    width: 40,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: 0
  },
  previewImage: {
    height: 34.2,
    width: 40,
    borderRadius: 6,
    border: "4px solid transparent",
    boxSizing: "border-box"
  },
  previewCaptionContainer: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    padding: "0px 8px"
  },
  previewName: {
    fontSize: 12,
    fontWeight: 500,
    color: "rgba(0,0,0,.9)"
  },
  dotSeperator: {
    background: "rgba(0,0,0,.6)",
    margin: "0px 5px",
    height: 3,
    width: 3,
    borderRadius: "50%"
  },
  previewSize: {
    fontSize: 12.5,
    fontWeight: "light",
    color: "rgba(0,0,0,.6)"
  },
  previewAttachedText: {
    fontSize: 12,
    fontWeight: 400,
    color: "rgba(0,0,0,.6)",
    marginTop: 2
  },
  previewErrorText: {
    fontWeight: 600,
    color: "#d32f2f"
  },
  previewUploadingText: {
    fontWeight: 500,
    color: "#3b5580"
  },
  previewActionBtn: {
    fontSize: 16,
    color: "rgba(0,0,0,.9)",
    cursor: "pointer"
  },
  progressBar: {
    background: "#F1F1F1",
    height: 4,
    marginTop: 2,
    width: "100%"
  },
  progressValue: {
    border: "none",
    height: 4,
    background: "#3b5580"
  }
}));
