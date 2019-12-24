"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hashFunction = hashFunction;

/**
 * This is an extremely simple hash function that the user could choose to call anytime
 * A message is clicked on the message list
 */
function hashFunction() {
  return Date.now();
}
