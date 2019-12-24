import React from 'react';
import PropTypes from 'prop-types';
import { FaMinus, FaTimes } from 'react-icons/fa';
import { classes } from './styles';

const Header = ({
  onProfileClick,
  userName,
  onClose,
  onMinimize,
  isOnline,
  agentId,
}) => {
  return (
    <header className={classes.header}>
      <section className={classes.headerDetails}>
        <div className={classes.headerFlex}>
          <h4 className={classes.heading}>
            {onProfileClick ? (
              <a
                onClick={
                  onProfileClick ? () => onProfileClick(agentId) : () => null
                }
                target="_blank"
                style={{ color: '#fff', cursor: 'pointer' }}>
                <span>{userName}</span>
              </a>
            ) : (
              <span style={{ color: '#fff' }}>{userName}</span>
            )}
          </h4>
          {isOnline && (
            <div className={classes.activeContainer}>
              <div className={classes.activeIcon} />
              <span>Active now</span>
            </div>
          )}
        </div>
      </section>
      <section className={classes.headerControls}>
        <button className={classes.headerButton} onClick={onMinimize}>
          <span className={classes.iconWrapper}>
            <FaMinus />
          </span>
        </button>

        <button className={classes.headerButton} onClick={onClose}>
          <span className={classes.iconWrapper}>
            <FaTimes />
          </span>
        </button>
      </section>
    </header>
  );
};

Header.propTypes = {
  agentId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onProfileClick: PropTypes.func,
  userName: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  onMinimize: PropTypes.func.isRequired,
  isOnline: PropTypes.bool.isRequired,
};

export default Header;
