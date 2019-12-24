import { stylesheet } from 'typestyle';
import { Constants } from '../../utils/Constants';

export const classes = stylesheet({
  container: {
    position: 'fixed',
    zIndex: 2000000,
    bottom: 0,
    height: 0,
    overflow: 'visible',
    display: 'flex',
    flexWrap: 'nowrap',
    alignItems: 'flex-end',
    flexDirection: 'row-reverse',
    width: '100%',
    right: Constants.CHAT_OVERLAY_HORIZONTAL_SPACING,
  },
});
