import { stylesheet } from 'typestyle';

export const classes = stylesheet({
  fadeContainer: {
    position: 'absolute',
    width: 'inherit',
    height: 'inherit',
    background: '#fff',
    marginTop: 43,
    opacity: 0.9,
    zIndex: 1000,
  },
  dndContainer: {
    position: 'absolute',
    width: 'inherit',
    height: 'inherit',
    background: 'transparent',
    marginTop: 43,
    zIndex: 2000,
    padding: 2,
    boxSizing: 'border-box',
    paddingBottom: 45,
  },
  dndRelativeContainer: {
    width: '100%',
    position: 'relative',
    height: 'calc(100%)',
    boxSizing: 'border-box',
    boxSizing: 'border-box',
    borderRadius: 2,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  boldText: {
    fontWeight: 500,
    fontSize: 17,
    marginTop: 15,
    marginBottom: 5,
    color: '#232333',
  },
  mediumText: {
    fontWeight: 'light',
    fontSize: 14,
    color: '#232333',
  },
});
