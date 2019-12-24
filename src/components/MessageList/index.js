import React from 'react';
import PropTypes from 'prop-types';
import Linkify from 'react-linkify';
import { classes as classNames } from 'typestyle';

import { classes } from './styles';
import { parseMessageDate, parseMessageList } from '../../utils/MessagingUtils';
import { MESSAGE_TYPE, FILE_UPLOAD_TYPE } from '../../utils/Constants';

export class MessageList extends React.PureComponent {
  fileFormats = Object.values(FILE_UPLOAD_TYPE);

  renderEmoji = text => (
    <p className={classNames(classes.emojiMessage, classes.msgContainer)}>
      {text}
    </p>
  );

  renderText = text => (
    <p className={classNames(classes.msgContainer)}>{text}</p>
  );

  renderFiles = (text, files) => {
    return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {text ? (
          <p className={classNames(classes.msgContainer)}>{text}</p>
        ) : (
          <br />
        )}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
          {files.map((file, i) =>
            this.fileFormats.indexOf(file.type) !== -1 ? (
              <div key={i} className={classes.imageContainer}>
                <a href={file.url} target="_blank">
                  <img src={file.url} />
                </a>
              </div>
            ) : null,
          )}
        </div>
      </div>
    );
  };

  renderMessage = (type, text, files) => {
    switch (type) {
      case MESSAGE_TYPE.EMOJI:
        return this.renderEmoji(text);
      case MESSAGE_TYPE.TEXT:
        return this.renderText(text);
      case MESSAGE_TYPE.FILES:
        return this.renderFiles(text, files);
    }
  };

  render() {
    const {
      messages,
      agentId,
      agentName,
      agentAvatar,
      senderId,
      senderAvatar,
      senderName,
      onProfileClick,
    } = this.props;

    return (
      <div>
        <div className={classes.msgBox}>
          {parseMessageList(messages).map(message => {
            let { text, id, createdAt, date, type, user, files } = message;
            user = user || {};
            let { name, avatar, id: userId } = user;
            if (agentId === userId) {
              name = name || agentName;
              avatar = avatar || agentAvatar;
            } else if (senderId === userId) {
              name = name || senderName;
              avatar = avatar || senderAvatar;
            }

            return type === MESSAGE_TYPE.DATESEPARATOR ? (
              <time key={id} className={classes.messagingListTimeHeading}>
                {date}
              </time>
            ) : (
              <div key={id}>
                <a
                  style={{ cursor: onProfileClick ? 'pointer' : 'unset' }}
                  onClick={
                    onProfileClick ? () => onProfileClick(userId) : () => null
                  }
                  className={classes.profileLink}>
                  <img
                    className={classes.profilePic}
                    title={name}
                    alt={name}
                    src={avatar}
                  />
                </a>
                <div className={classes.profileTitleWrapper}>
                  <a
                    style={{ cursor: onProfileClick ? 'pointer' : 'unset' }}
                    onClick={
                      onProfileClick ? () => onProfileClick(userId) : () => null
                    }
                    className={classes.titleLink}>
                    <span className={classes.title}>{name}</span>
                  </a>
                  <div className={classes.dotSeperator} />
                  <time className={classes.time}>
                    {parseMessageDate(createdAt)}
                  </time>
                </div>
                <Linkify properties={{ target: '_blank' }}>
                  {this.renderMessage(type, text, files)}
                </Linkify>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

MessageList.propTypes = {
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      text: PropTypes.string.isRequired,
      files: PropTypes.arrayOf(
        PropTypes.shape({
          type: PropTypes.string.isRequired,
          url: PropTypes.string.isRequired,
        }),
      ),
      type: PropTypes.oneOf(['text', 'emoji']),
      createdAt: function(props, propName, componentName) {
        if (!(props[propName] instanceof Date)) {
          return new Error(
            `Invalid prop ${propName} supplied to ${componentName}. Validation failed.`,
          );
        }
      },
      user: PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
          .isRequired,
        name: PropTypes.string,
        avatar: PropTypes.string,
      }),
    }),
  ),
  agentId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  agentAvatar: PropTypes.string,
  agentName: PropTypes.string,
  senderId: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
  senderAvatar: PropTypes.string,
  senderName: PropTypes.string,
  onProfileClick: PropTypes.func,
};
