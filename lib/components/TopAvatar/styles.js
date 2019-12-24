"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.classes = undefined;

var _typestyle = require("typestyle");

var _Constants = require("../../utils/Constants");

var classes = (exports.classes = (0, _typestyle.stylesheet)({
  headerDetails: {
    display: "flex",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    marginRight: "4px",
    padding: "4px 4px 4px 1px",
    position: "relative",
    flexDirection: "row!important",
    alignItems: "center!important"
  },
  avatarWrapper: {
    width: "32px",
    height: "32px",
    display: "flex",
    position: "relative"
  },
  avatar: {
    width: "56px",
    height: "56px",
    boxSizing: "border-box",
    backgroundClip: "content-box",
    border: "2px solid transparent",
    borderRadius: "49.9%",
    maxHeight: "100%",
    maxWidth: "100%",
    verticalAlign: "bottom"
  },
  onlineStatus: {
    background: "#469a1f",
    width: "8px",
    height: "8px",
    borderRadius: "50%",
    flexShrink: "0",
    transition: "background 167ms ease-in-out",
    boxSizing: "border-box",
    animation: "fade-in 167ms ease-in",
    bottom: "2px",
    right: "8px",
    position: "absolute",
    boxShadow: "0 0 0 2px #fff"
  },
  avatarHeadingWrapper: {
    maxWidth: "230px",
    overflow: "hidden!important",
    textOverflow: "ellipsis!important",
    whiteSpace: "nowrap!important",
    marginLeft: "8px!important",
    background: "0 0",
    border: "none",
    padding: "0",
    cursor: "pointer"
  },
  avatarHeading: {
    color: "#fff",
    overflow: "hidden!important",
    textOverflow: "ellipsis!important",
    fontSize: "13px",
    lineHeight: "1.42857",
    fontWeight: "600"
  },
  profileWrapper: {
    paddingRight: "12px !important",
    paddingLeft: "12px !important"
  },
  profileEntity: {
    overflowWrap: "break-word !important",
    wordWrap: "break-word !important",
    wordBreak: "break-word !important",
    display: "flex",
    position: "relative"
  },
  profileLink: {
    backgroundColor: "transparent",
    border: "0",
    color: "#0073b1",
    margin: "0",
    fontSize: "100%",
    verticalAlign: "baseline",
    background: "0 0"
  },
  avatarContent: {
    paddingLeft: "6px",
    alignSelf: "center",
    position: "relative"
  },
  titleLink: {
    color: "#000",
    backgroundColor: "transparent",
    border: "0",
    fontWeight: 500,
    margin: "0",
    fontSize: 15.5,
    verticalAlign: "baseline",
    background: "0 0",
    textDecoration: "none"
  },
  subtitle: {
    margin: "0 auto",
    display: "-webkit-box",
    webkitLineClamp: "2",
    webkitBoxOrient: "vertical",
    overflow: "hidden",
    textOverflow: "ellipsis",
    maxHeight: "4rem",
    fontSize: 13.5,
    lineHeight: "1.42857",
    fontWeight: 400,
    color: "rgba(0,0,0,.9)"
  },
  imgContainerWrapper: {
    width: "56px",
    height: "56px",
    display: "flex",
    position: "relative"
  },
  imgContainer: {
    position: "relative",
    flexShrink: "0"
  }
}));
