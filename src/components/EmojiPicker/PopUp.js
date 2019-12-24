import React from 'react';
import { classes } from './styles';

class PopUp extends React.PureComponent {
  componentDidMount() {
    this.scLauncher = document.querySelector('#launcher');
    this.scLauncher.addEventListener('click', this.interceptLauncherClick);
  }

  componentWillUnmount() {
    this.scLauncher.removeEventListener('click', this.interceptLauncherClick);
  }

  interceptLauncherClick = e => {
    const { isOpen } = this.props;
    const clickedOutside = !this.emojiPopup.contains(e.target) && isOpen;
    clickedOutside && this.props.onClickedOutside(e);
  };

  render() {
    const { isOpen, children, onInputChange } = this.props;

    if (isOpen) {
      return (
        <div
          className={classes.popupWindow}
          style={{ zIndex: 2000000 }}
          ref={e => (this.emojiPopup = e)}>
          <div className={classes.popupInner}>
            <input
              onChange={onInputChange}
              className={classes.popupWindowSearch}
              placeholder="Search emoji..."
            />
            {children}
          </div>
        </div>
      );
    } else {
      return <div>{''}</div>;
    }
  }
}

export default PopUp;
