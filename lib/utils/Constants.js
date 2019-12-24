"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var Constants = (exports.Constants = {
  CHAT_WINDOW_WIDTH_SIZE: 336,
  CHAT_WINDOW_HEIGHT_SIZE: 400,
  DISTANCE_BETWEEN_CHAT_WINDOWS: 16,
  MAXIMUM_SPACING_OF_WINDOW_FROM_TOP: 90,
  CHAT_OVERLAY_HORIZONTAL_SPACING: 16,
  CHAT_WINDOW_WIDTH_MINIMIZED_SIZE: 200
});
var WINDOW_ENLARGEMENT_TYPE = (exports.WINDOW_ENLARGEMENT_TYPE = {
  NORMAL: "normal",
  MINIMIZED: "minimized",
  MAXIMIZED: "maximized"
});
var MESSAGE_TYPE = (exports.MESSAGE_TYPE = {
  EMOJI: "emoji",
  TEXT: "text",
  FILES: "files",
  DATESEPARATOR: "date-separator"
});
var FILE_UPLOAD_TYPE = (exports.FILE_UPLOAD_TYPE = {
  JPEG_IMAGES: "image/jpeg",
  JPG_IMAGES: "image/jpg",
  PNG_IMAGES: "image/png"
});
var DND_TRIGGER = (exports.DND_TRIGGER = {
  NATIVE_FILE_SELECTOR: "native_file_selector",
  FILE_DRAG: "file_drag"
});
