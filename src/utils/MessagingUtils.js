import { MESSAGE_TYPE } from './Constants';

/**
 * @returns String
 * @param {Date} date
 *        date message was created
 *
 * @description this function returns the time in a 12 hour format
 */
export function parseMessageDate(date) {
  return new Date(date).toLocaleString('default', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });
}

/**
 * @returns {Array}
 * @param {Array} messages
 *        An array of messages
 *
 * @description this function parses the message list preformatting it by the date.
 */
export function parseMessageList(messages) {
  let currentDate = null;
  return messages.reduce((acc, message) => {
    let createdAt = new Date(message.createdAt),
      monthName = createdAt.toLocaleString('default', { month: 'short' }),
      date = createdAt.getDate();

    if (date !== currentDate) {
      acc.push({
        id: `${createdAt}`,
        type: MESSAGE_TYPE.DATESEPARATOR,
        date: `${monthName} ${date}`,
      });
    }
    acc.push(message);
    currentDate = date;
    return acc;
  }, []);
}
