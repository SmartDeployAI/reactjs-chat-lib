"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.classes = undefined;

var _typestyle = require("typestyle");

var _Constants = require("../../utils/Constants");

var classes = (exports.classes = (0, _typestyle.stylesheet)({
  /** Chat Window Container */
  container: {
    display: "flex",
    flexDirection: "column",
    height: _Constants.Constants.CHAT_WINDOW_HEIGHT_SIZE,
    maxHeight: "calc(100vh - ".concat(
      _Constants.Constants.MAXIMUM_SPACING_OF_WINDOW_FROM_TOP,
      "px)"
    ),
    width: _Constants.Constants.CHAT_WINDOW_WIDTH_SIZE,
    background: "linear-gradient(to bottom, transparent 2px, #fff 2px)",
    borderRadius: "2px 2px 0 0",
    boxShadow: "0 0 0 1px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.2)",
    marginLeft: _Constants.Constants.DISTANCE_BETWEEN_CHAT_WINDOWS,
    transitionTimingFunction: "cubic-bezier(0, 0, 0.2, 1)",
    transitionDuration: "167ms",
    fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif"
  },

  /** Chat Window Header */
  header: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    padding: "0 12px",
    height: 42,
    position: "relative",
    borderBottom: "1px solid rgba(0,0,0,.15)",
    borderRadius: "2px 2px 0 0",
    background: "#3b5580",
    flexShrink: "0 !important"
  },
  headerDetails: {
    display: "flex",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    marginRight: "4px",
    position: "relative",
    flexDirection: "column !important"
  },
  headerFlex: {
    overflow: "hidden !important",
    textOverflow: "ellipsis !important",
    display: "flex !important",
    flexDirection: "column"
  },
  heading: {
    color: "#fff",
    overflow: "hidden !important",
    textOverflow: "ellipsis !important",
    fontSize: "14px",
    fontWeight: 500,
    lineHeight: "1.42857",
    margin: 0,
    $nest: {
      "& a": {
        textDecoration: "none"
      },
      "& a:hover": {
        textDecoration: "underline"
      }
    }
  },
  headerControls: {
    transitionTimingFunction: "cubic-bezier(.4,0,.2,1)",
    transitionDuration: "167ms",
    marginLeft: "auto",
    flexShrink: "0",
    opacity: "1",
    position: "relative",
    display: "flex !important",
    alignItems: "center !important"
  },
  headerButton: {
    height: "32px",
    width: "32px",
    backgroundColor: "transparent",
    borderRadius: "50%",
    transitionTimingFunction: "cubic-bezier(.4,0,.2,1)",
    transitionDuration: "167ms",
    alignItems: "center",
    border: "none",
    boxSizing: "border-box",
    cursor: "pointer",
    fontFamily: "inherit",
    fontWeight: "600",
    display: "inline-flex",
    justifyContent: "center",
    maxWidth: "480px",
    overflow: "hidden",
    outlineWidth: "2px",
    transitionProperty: "background-color,box-shadow,color",
    verticalAlign: "middle",
    fontSize: "12px",
    minHeight: "24px",
    lineHeight: "20px",
    padding: "2px 8px"
  },
  iconWrapper: {
    width: "16px",
    height: "16px",
    margin: "0",
    display: "inline-block",
    overflow: "hidden",
    position: "relative",
    color: "#fff"
  },
  icon: {
    color: "#fff"
  },
  activeContainer: {
    display: "flex",
    alignItems: "center",
    $nest: {
      "& span": {
        fontSize: 11,
        color: "#fff"
      }
    }
  },
  activeIcon: {
    background: "#469a1f",
    marginRight: 5,
    width: 6,
    height: 6,
    borderRadius: "50%"
  },

  /** Chat Window Body */
  contentWrapper: {
    flexGrow: "1",
    minHeight: "0",
    position: "relative !important",
    flexDirection: "column !important",
    display: "flex !important"
  },
  chatContainer: {
    flexDirection: "column",
    overflowY: "hidden",
    transitionTimingFunction: "cubic-bezier(.4,0,.2,1)",
    transitionDuration: "167ms",
    flex: "1 0 0px",
    position: "relative !important",
    display: "flex !important",
    marginTop: "auto !important"
  },
  conversationContainer: {
    minHeight: "auto",
    display: "flex",
    flexDirection: "column",
    flexGrow: "1",
    justifyContent: "flex-start",
    overflowY: "auto",
    width: "100% !important"
  },
  conversationListContent: {
    minHeight: "auto",
    padding: "8px 0 0",
    listStyle: "none !important",
    width: "100% !important",
    margin: "0"
  },
  chatWindowMinimized: {
    transitionTimingFunction: "cubic-bezier(.4,0,1,1)",
    transitionDuration: "167ms",
    transform: "translateY(100%) translateY(-43px)",
    width: _Constants.Constants.CHAT_WINDOW_WIDTH_MINIMIZED_SIZE
  }
}));
