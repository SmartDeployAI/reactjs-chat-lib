import React from 'react';
import PropTypes from 'prop-types';

import { classes } from './styles';

export class TopAvatar extends React.PureComponent {
  render() {
    const {
      avatar,
      userName,
      subtitle,
      isOnline,
      agentId,
      onProfileClick,
    } = this.props;

    return (
      <div className={classes.profileWrapper}>
        <div className={classes.profileEntity}>
          <a
            style={{ cursor: onProfileClick ? 'pointer' : 'unset' }}
            onClick={
              onProfileClick ? () => onProfileClick(agentId) : () => null
            }>
            <div className={classes.imgContainer} type="circle">
              <div className={classes.imgContainerWrapper}>
                <img className={classes.avatar} alt={userName} src={avatar} />
                {isOnline && <div className={classes.onlineStatus} />}
              </div>
            </div>
          </a>
          <div className={classes.avatarContent}>
            <a
              onClick={
                onProfileClick ? () => onProfileClick(agentId) : () => null
              }
              style={{ cursor: onProfileClick ? 'pointer' : 'unset' }}
              className={classes.titleLink}>
              {userName}
            </a>
            <div className={classes.subtitle}>
              <div title={subtitle}>{subtitle}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

TopAvatar.propTypes = {
  onProfileClick: PropTypes.func,
  agentId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  avatar: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  isOnline: PropTypes.bool,
};
