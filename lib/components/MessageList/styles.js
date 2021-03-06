"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.classes = undefined;

var _typestyle = require("typestyle");

var _Constants = require("../../utils/Constants");

var classes = (exports.classes = (0, _typestyle.stylesheet)({
  msgBox: {
    marginBottom: "4px",
    display: "flex",
    flexDirection: "column",
    listStyle: "none",
    boxSizing: "border-box",
    position: "relative",
    padding: "0",
    margin: "0",
    width: "100%"
  },
  profileLink: {
    position: "absolute",
    left: 12
  },
  profilePic: {
    zIndex: "2",
    position: "static",
    opacity: "1",
    top: "0",
    left: "0",
    backgroundSize: "cover",
    border: "3px solid transparent",
    borderRadius: "49.9%",
    width: "40px",
    height: "40px",
    boxSizing: "border-box",
    backgroundClip: "content-box"
  },
  profileTitleWrapper: {
    padding: "0 0 0 60px",
    display: "flex",
    alignItems: "center"
  },
  title: {
    fontSize: "13px",
    lineHeight: "1.42857",
    fontWeight: 500,
    color: "rgba(0,0,0,.9)"
  },
  titleLink: {
    margin: "0",
    fontSize: "12px",
    verticalAlign: "baseline",
    background: "0 0",
    textDecoration: "none"
  },
  time: {
    fontSize: 12,
    fontWeight: "400",
    color: "rgba(0,0,0,.6)"
  },
  dotSeperator: {
    background: "rgba(0,0,0,.6)",
    margin: "0px 5px",
    height: 3,
    width: 3,
    borderRadius: "50%"
  },
  msgContainer: {
    padding: "0px 12px 20px 60px",
    color: "rgba(0,0,0,.9)",
    wordWrap: "break-word",
    whiteSpace: "pre-line",
    webkitFontSmoothing: "antialiased",
    fontSize: "12px",
    lineHeight: "1.42857",
    fontWeight: "400",
    margin: 0,
    marginTop: 5
  },
  emojiMessage: {
    fontSize: "2rem"
  },
  messagingListTimeHeading: {
    display: "flex",
    alignItems: "center",
    margin: "0 0 12px",
    padding: "12px 0",
    textTransform: "uppercase",
    letterSpacing: 1,
    clear: "both",
    fontSize: "0.8rem",
    lineHeight: 1.33333,
    fontWeight: 500,
    color: "rgba(0,0,0,.6)",
    $nest: {
      "&::before": {
        marginRight: 6,
        display: "block",
        content: "''",
        flexGrow: 1,
        borderTop: "1px solid rgba(0,0,0,.15)"
      },
      "&::after": {
        marginLeft: 6,
        display: "block",
        content: "''",
        flexGrow: 1,
        borderTop: "1px solid rgba(0,0,0,.15)"
      }
    }
  },
  imageContainer: {
    height: 190,
    minWidth: 100,
    maxWidth: 200,
    border: "1px solid #cdcfd2",
    borderRadius: 4,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    marginBottom: 10,
    $nest: {
      "& img": {
        height: "auto",
        maxHeight: 190,
        cursor: "pointer",
        maxWidth: "100%"
      }
    }
  }
}));
