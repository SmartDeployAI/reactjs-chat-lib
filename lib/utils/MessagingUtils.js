"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseMessageDate = parseMessageDate;
exports.parseMessageList = parseMessageList;

var _Constants = require("./Constants");

/**
 * @returns String
 * @param {Date} date
 *        date message was created
 *
 * @description this function returns the time in a 12 hour format
 */
function parseMessageDate(date) {
  return new Date(date).toLocaleString("default", {
    hour: "numeric",
    minute: "numeric",
    hour12: true
  });
}
/**
 * @returns {Array}
 * @param {Array} messages
 *        An array of messages
 *
 * @description this function parses the message list preformatting it by the date.
 */

function parseMessageList(messages) {
  var currentDate = null;
  return messages.reduce(function(acc, message) {
    var createdAt = new Date(message.createdAt),
      monthName = createdAt.toLocaleString("default", {
        month: "short"
      }),
      date = createdAt.getDate();

    if (date !== currentDate) {
      acc.push({
        id: "".concat(createdAt),
        type: _Constants.MESSAGE_TYPE.DATESEPARATOR,
        date: "".concat(monthName, " ").concat(date)
      });
    }

    acc.push(message);
    currentDate = date;
    return acc;
  }, []);
}
