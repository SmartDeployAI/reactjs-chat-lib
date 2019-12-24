import React from 'react';
import PropTypes from 'prop-types';

import { classes } from './styles';
import { ChatWindow } from '../ChatWindow';
import { withInjectedProps } from '../withInjectedPropsHOC';
import { Constants, WINDOW_ENLARGEMENT_TYPE } from '../../utils/Constants';

/**
 * @module
 * @description This component is a parent component that manages and houses all chat windows within the application.
 * This component manages all the chat windows including scheduling task to hide and open a new window
 * if needs arises.
 */
export class ChatContainer extends React.PureComponent {
  constructor(props) {
    super(props);
    if (props.hashKey && typeof props.hashKey !== 'string') {
      throw new Error(
        'An hash key must be passed to ChatContainer. You can import hashKeyFunction or use any hash you feel comfortable with',
      );
    }

    let ref = React.createRef(),
      Window = withInjectedProps(ChatWindow, {
        closeWindowfn: this.handleCloseWindow,
        handleEnlargementfn: this.handleWindowEnlargement,
        _id: this.props.currentAgentId,
        ref,
      }),
      pixelsToRemove = this.props.currentAgentId
        ? Constants.CHAT_WINDOW_WIDTH_SIZE +
          Constants.DISTANCE_BETWEEN_CHAT_WINDOWS +
          (this.props.rightHorizontalOverlaySpacing ||
            Constants.CHAT_OVERLAY_HORIZONTAL_SPACING)
        : this.props.rightHorizontalOverlaySpacing ||
          Constants.CHAT_OVERLAY_HORIZONTAL_SPACING;

    this.state = {
      windowSize: window.innerWidth - pixelsToRemove,
      activeChatWindows: this.props.currentAgentId
        ? [{ id: this.props.currentAgentId, component: Window, ref }]
        : [],
    };
  }

  static propTypes = {
    currentAgentId: PropTypes.string.isRequired,
    hashKey: PropTypes.string.isRequired,
    onRequestClose: PropTypes.func.isRequired,
    rightHorizontalOverlaySpacing: PropTypes.number,
  };

  static defaultProps = {
    currentAgentId: '',
  };

  componentDidUpdate(prevProps) {
    let window = this.getWindow(this.props.currentAgentId),
      {
        CHAT_WINDOW_WIDTH_SIZE,
        DISTANCE_BETWEEN_CHAT_WINDOWS,
        CHAT_OVERLAY_HORIZONTAL_SPACING,
      } = Constants;

    if (
      prevProps.hashKey !== this.props.hashKey &&
      this.props.hashKey.trim().length > 0 &&
      this.props.currentAgentId.trim().length > 0
    ) {
      if (window === undefined) {
        if (
          this.state.windowSize >
          CHAT_WINDOW_WIDTH_SIZE +
            DISTANCE_BETWEEN_CHAT_WINDOWS +
            CHAT_OVERLAY_HORIZONTAL_SPACING
        ) {
          this.createWindow(this.props.currentAgentId);
        } else {
          /**
           * !!!IMPORTANT
           * Here we want to check each of the windows to see which is empty
           * @see ChatContainer.reshuffleWindow
           */
          this.reshuffleWindow(this.props.currentAgentId);
        }
      } else {
        /**
         * Add focus to the chat window currently clicked using the reference
         * to the chat window
         */
        window.ref.current.forceWindowFocus();
      }
    }
  }

  /**
   * @typedef {Object} Found
   * @property {boolean} result - boolean indicating if all windows have unsent contents
   * @property {Object} foundWindow - reference to window with sent content i.e empty message box or null otherwise
   *
   *
   * @returns {Found}
   *          The result of checking if all windows have unsent contents.
   * @description This function checks and returns result as true if all windows has contents
   * that has not been sent.
   */
  allWindowsHaveUnsentContent = () => {
    let { activeChatWindows } = this.state,
      result = true,
      foundWindow = null;

    /**
     * Here we check if a window has content that has been sent;
     * we then return a reference to this window
     */

    for (let window of activeChatWindows) {
      if (!window.ref.current.hasUnsentContent()) {
        result = false;
        foundWindow = window;
        break;
      }
    }
    return { result, foundWindow };
  };

  /**
   * @param {String} newId
   *        The id of the new window to be added. most times this is the agentId
   * @description
   * This resuffles the windows in the application
   * The function is generally responsible for hiding and showing windows when the user clicks on a new chat list item
   */
  reshuffleWindow = newId => {
    let {
        CHAT_WINDOW_WIDTH_SIZE,
        CHAT_WINDOW_WIDTH_MINIMIZED_SIZE,
      } = Constants,
      { NORMAL } = WINDOW_ENLARGEMENT_TYPE,
      ref = React.createRef(),
      Window = withInjectedProps(ChatWindow, {
        closeWindowfn: this.handleCloseWindow,
        handleEnlargementfn: this.handleWindowEnlargement,
        _id: newId,
        ref,
      });

    let { result, foundWindow } = this.allWindowsHaveUnsentContent();
    // If a window does not have unsent content, result: false is returned,
    // which allows us to get a reference to this window and swap it out for the new window.
    if (result === false) {
      let enlargementType = foundWindow.ref.current.getEnlargementType(),
        activeChatWindows = this.state.activeChatWindows.filter(
          window => window.id !== foundWindow.id,
        );

      activeChatWindows.push({ id: newId, component: Window, ref });
      this.setState(prevState => ({
        activeChatWindows,
        windowSize:
          prevState.windowSize +
          (enlargementType === NORMAL
            ? CHAT_WINDOW_WIDTH_SIZE
            : CHAT_WINDOW_WIDTH_MINIMIZED_SIZE) -
          CHAT_WINDOW_WIDTH_SIZE,
      }));
    }
  };

  /**
   * @param {String} id
   *        The id of the new window to be created, most often it will be the agentId passed to the lib.
   * @description This function creates a new window when called.
   */
  createWindow = id => {
    let { CHAT_WINDOW_WIDTH_SIZE, DISTANCE_BETWEEN_CHAT_WINDOWS } = Constants,
      ref = React.createRef(),
      Window = withInjectedProps(ChatWindow, {
        closeWindowfn: this.handleCloseWindow,
        handleEnlargementfn: this.handleWindowEnlargement,
        _id: id,
        ref,
      });

    this.setState(prevState => ({
      windowSize:
        prevState.windowSize -
        (CHAT_WINDOW_WIDTH_SIZE + DISTANCE_BETWEEN_CHAT_WINDOWS),
      activeChatWindows: [
        ...prevState.activeChatWindows,
        { id, component: Window, ref },
      ],
    }));
  };

  /**
   * @param {String | number} id
   *        The id of the window to close
   *
   * @description This function only handles closing windows when called
   * However it does not close the window by itself .. see closeWindow function for that
   */
  handleCloseWindow = id => {
    let window = this.getWindow(id).ref.current,
      hasUnSentContent = window.hasUnsentContent();

    // If the window to be closed has contents that has not been sent then call the onRequestClose
    // function passing control back to the caller applicatioon else call the closeWindow function
    if (hasUnSentContent) {
      this.props.onRequestClose &&
        this.props.onRequestClose(() => this.closeWindow(id));
    } else {
      this.closeWindow(id);
    }
  };

  /**
   * @param {String | number} id
   *        The id of the window to close
   *
   * @description This function closes a window.
   * We deference the window from the list of active windows and clean up its properties
   * while allocating more space to the windowSize property
   */
  closeWindow = id => {
    let {
        CHAT_WINDOW_WIDTH_SIZE,
        DISTANCE_BETWEEN_CHAT_WINDOWS,
        CHAT_WINDOW_WIDTH_MINIMIZED_SIZE,
      } = Constants,
      { NORMAL } = WINDOW_ENLARGEMENT_TYPE,
      window = this.getWindow(id).ref.current,
      enlargementType = window.getEnlargementType();

    this.setState(prevState => ({
      activeChatWindows: prevState.activeChatWindows.filter(
        window => window.id !== id,
      ),
      windowSize:
        prevState.windowSize +
        (enlargementType === NORMAL
          ? CHAT_WINDOW_WIDTH_SIZE
          : CHAT_WINDOW_WIDTH_MINIMIZED_SIZE) +
        DISTANCE_BETWEEN_CHAT_WINDOWS,
    }));
  };

  /**
   * @param {number} additionalWindowPixels
   *           This is the additional pixels deducatble or addable to the windowSize
   * @param {function} callback
   *           This is a function called after window size increment or decrement @see ChatWindow.setEnlargementType to understand the callbacks
   *
   * @description This function is only called when we need to set the enlargement type for a window
   * which is not dependent on other windows. i.e there is enough window space for increase or decrease.
   * We basically just add the additional pixels the window is going to take up or lose to the available
   * overall window size.
   */
  handleEnlargmentForSingleWindow = (additionalWindowPixels, callback) => {
    this.setState(
      prevState => ({
        windowSize: prevState.windowSize + additionalWindowPixels,
      }),
      () => callback(),
    );
  };

  /**
   * @param {number} id
   *        The id of the window to be enlarged
   * @param {function} callback
   *        Callback function @see ChatWindow.setEnlargementType to understand the callback
   * @param {number} additionalWindowPixels
   *        Additional pixels worth adding or deducting from the overall window size
   *
   * @description this is called when we need to enlarge a window and there is not enough space left to do that
   * This is therefore highly dependent on other windows.
   *
   * -> We check to see if there is a window in the NORMAL phase,
   * -> If (1) is true, we then set the enlargement type for that window. i.e minimize it giving the window to be
   *    enlarged enough space to do so.
   * -> If (1) is false, it means all windows are currently minimized. In this case, it means we have to fit this
   *    new enlargement window In.
   *
   *  The repercussion of the above scheme is that the windowSize can have some distorting values at times.
   *  since we try to [force-fit] the window to be enlarged if all windows are currently minimized
   */
  handleEnlargmentForMultipleWindow = (
    id,
    callback,
    additionalWindowPixels,
  ) => {
    let { NORMAL } = WINDOW_ENLARGEMENT_TYPE,
      foundNormalWindow = false;

    for (let window of this.state.activeChatWindows) {
      if (
        window.id !== id &&
        window.ref.current.getEnlargementType() === NORMAL
      ) {
        window.ref.current.setEnlargementType();
        foundNormalWindow = true;
        break;
      }
    }
    if (foundNormalWindow === false) {
      this.setState(prevState => ({
        windowSize: prevState.windowSize + additionalWindowPixels,
      }));
    }
    callback();
  };

  /**
   * @param {String} id
   *        The id of the window to be enlarged
   * @param {function} callback
   *        Callback function @see ChatWindow.setEnlargementType to understand the callback
   *
   * @description handles the window enlargement type of a chat window by calling appropriate enlarment functions
   *
   * If the window to be enlarged is in phase [MINIMIZED], we need to check if there is enough space
   * to put it in phase [MAXIMIZE], if true, then we lessen the available space through the handleSingleWindowEnlargement method
   * else we call the handleMultipleWindowEnlarment method (See description above)
   *
   * Its a very simple method that calls the appropriate method based on available space i.e windowSize
   */
  handleWindowEnlargement = (id, callback) => {
    let window = this.getWindow(id),
      expansionType = window.ref.current.getEnlargementType(),
      {
        CHAT_WINDOW_WIDTH_MINIMIZED_SIZE,
        CHAT_WINDOW_WIDTH_SIZE,
        CHAT_OVERLAY_HORIZONTAL_SPACING,
      } = Constants,
      { NORMAL, MINIMIZED } = WINDOW_ENLARGEMENT_TYPE,
      additionalWindowPixels =
        expansionType === NORMAL
          ? CHAT_WINDOW_WIDTH_SIZE - CHAT_WINDOW_WIDTH_MINIMIZED_SIZE
          : CHAT_WINDOW_WIDTH_MINIMIZED_SIZE - CHAT_WINDOW_WIDTH_SIZE;

    if (expansionType === MINIMIZED) {
      if (
        CHAT_WINDOW_WIDTH_SIZE - CHAT_WINDOW_WIDTH_MINIMIZED_SIZE >=
        this.state.windowSize - CHAT_OVERLAY_HORIZONTAL_SPACING * 2
      ) {
        this.handleEnlargmentForMultipleWindow(
          id,
          callback,
          additionalWindowPixels,
        );
      } else {
        this.handleEnlargmentForSingleWindow(additionalWindowPixels, callback);
      }
    } else {
      this.handleEnlargmentForSingleWindow(additionalWindowPixels, callback);
    }
  };

  /**
   * @return Object
   * @param {String} id
   *        The id of the window to get
   *
   * @description gets a window when the id is supplied
   */
  getWindow = id => {
    return this.state.activeChatWindows.find(window => window.id === id);
  };

  /**
   * @description this can be accessed as an imperative method to reset the ChatContainer component
   *
   */
  resetChatContainer = () => {
    this.setState({
      windowSize:
        window.innerWidth -
        (this.props.rightHorizontalOverlaySpacing ||
          Constants.CHAT_OVERLAY_HORIZONTAL_SPACING),
      activeChatWindows: [],
    });
  };

  render() {
    if (typeof this.props.children === 'function') {
      return (
        <div
          className={classes.container}
          style={{
            right:
              this.props.rightHorizontalOverlaySpacing ||
              Constants.CHAT_OVERLAY_HORIZONTAL_SPACING,
          }}>
          {this.props.children(this.state.activeChatWindows)}
        </div>
      );
    }

    return null;
  }
}
