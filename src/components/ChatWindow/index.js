import React from 'react';
import PropTypes from 'prop-types';
import { classes as classNames } from 'typestyle';

import { classes } from './styles';
import { TopAvatar } from '../TopAvatar/index';
import { MessageList } from '../MessageList/index';
import { MessageBox } from '../MessageBox/index';
import {
  WINDOW_ENLARGEMENT_TYPE,
  FILE_UPLOAD_TYPE,
  DND_TRIGGER,
} from '../../utils/Constants';
import Header from './Header';
import { DragAndDropInterface } from '../DragAndDropInterface';

/**
 * @module
 *
 * @description This is the instance of a single chat window created between two parties
 * We treat each instance like a seperate component created within the React lifecycle
 * providing each instance with mount, update and uillUnmount lifecycles so the user can perform
 * any custom function in them
 */
export class ChatWindow extends React.PureComponent {
  constructor(props) {
    super(props);
    this.messageBoxRef = React.createRef();
    this.containerRef = React.createRef();

    this.state = {
      enlargementType: WINDOW_ENLARGEMENT_TYPE.NORMAL,
      isDnDVisible: false,
      files: [],
      dndTrigger: '',
    };
  }

  static propTypes = {
    windowDidMount: PropTypes.func,
    windowDidUpdate: PropTypes.func,
    windowWillUnmount: PropTypes.func,
    onSend: PropTypes.func.isRequired,
    onUploadFile: PropTypes.func,
    onProfileClick: PropTypes.func,
    onRemoveFile: PropTypes.func,
    onRetryFileUpload: PropTypes.func,
    agentProfile: PropTypes.shape({
      name: PropTypes.string,
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      avatar: PropTypes.string,
      isOnline: PropTypes.bool.isRequired,
      subtitle: PropTypes.string,
    }),
    senderProfile: PropTypes.shape({
      name: PropTypes.string,
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      avatar: PropTypes.string,
      isOnline: PropTypes.bool,
      subtitle: PropTypes.string,
    }),
    filesUploadProps: PropTypes.objectOf(
      PropTypes.shape({
        isUploading: PropTypes.bool.isRequired,
        done: PropTypes.bool.isRequired,
        error: PropTypes.bool.isRequired,
        errorHelperText: PropTypes.string,
        progress: PropTypes.number,
      }),
    ),
    messages: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        type: PropTypes.oneOf(['text', 'emoji']).isRequired,
        text: PropTypes.string.isRequired,
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
  };

  componentDidMount() {
    let { windowDidMount, agentProfile, senderProfile } = this.props;

    windowDidMount && windowDidMount({ agentProfile, senderProfile });
    //scroll to the bottom of the message list when the component mounts
    this.containerRef.current.scrollTo({
      top: this.containerRef.current.scrollHeight,
      left: 0,
      behaviour: 'smooth',
    });
  }

  componentDidUpdate(prevProps) {
    let { windowDidUpdate, agentProfile, senderProfile, messages } = this.props;

    //Heuristic assume that the component updated iff the length of messages changes across intervals
    if (messages.length !== prevProps.messages.length) {
      windowDidUpdate &&
        windowDidUpdate({
          agentProfile,
          senderProfile,
          message: messages[messages.length - 1],
        });
      this.containerRef.current.scrollTo({
        top: this.containerRef.current.scrollHeight,
        left: 0,
        behaviour: 'smooth',
      });
    }
  }

  componentWillUnmount() {
    let { windowWillUnmount, agentProfile, senderProfile } = this.props;
    windowWillUnmount && windowWillUnmount({ agentProfile, senderProfile });
  }

  /**
   * @return {boolean}
   *
   * @description This function returns boolean value indicating if there are unsent contents or not
   */
  hasUnsentContent = () => {
    return this.messageBoxRef.current.value.trim().length > 0;
  };

  /**
   * @return String
   *
   * @description gets the window enlargement type . @see WINDOW_ENLARGEMENT_TYPE
   */
  getEnlargementType = () => {
    return this.state.enlargementType;
  };

  /**
   * @description This sets the window enlargement type and focuses on the message box if
   * enlargement is set to [NORMAL]
   */
  setEnlargementType = () => {
    let { MINIMIZED, NORMAL } = WINDOW_ENLARGEMENT_TYPE;
    this.setState(
      prevState => ({
        enlargementType:
          prevState.enlargementType === NORMAL ? MINIMIZED : NORMAL,
      }),
      () => {
        this.state.enlargementType == NORMAL &&
          this.messageBoxRef.current.focus();
      },
    );
  };

  /**
   * @description This closes the window by passing its ID to the parent close window function props
   */
  closeWindow = () => {
    this.props.closeWindowfn(this.props._id);
  };

  /**
   * @description This handles enlargement by passing its ID and a callback function @see ChatWindow.setEnlargementType
   * to the parent handle enlargement function props
   */
  handleEnlargement = () => {
    this.props.handleEnlargementfn(this.props._id, this.setEnlargementType);
  };

  /**
   * @description This is called when the native file selector is opened
   */
  handleOpenFileSelector = () => {
    this.setState({
      isDnDVisible: true,
      dndTrigger: DND_TRIGGER.NATIVE_FILE_SELECTOR,
    });
  };

  /**
   * @description This is called when the native file selector is closed
   */
  handleCloseFileSelector = () => {
    this.setState({
      isDnDVisible: false,
    });
  };

  /**
   * @param {File} file
   *        This is the file object returned by the native file picker
   *
   * @description function is called when a file is selected, we keep track of the file
   */
  handleSelectFile = file => {
    if (file && Object.values(FILE_UPLOAD_TYPE).indexOf(file.type) !== -1) {
      let id = Date.now();
      this.setState(
        prevState => ({
          files: [...prevState.files, { id, file }],
        }),
        () => {
          this.handleCloseFileSelector();
          this.props.onUploadFile && this.props.onUploadFile({ id, file });
        },
      );
    }
  };

  /**
   * @param {number} id
   *        The id of the file to remove
   *
   * @description This handles the removal of a file
   */
  handleFileRemove = id => {
    let file = this.state.files.find(file => file.id === id);
    this.setState(
      prevState => ({
        files: prevState.files.filter(file => file.id !== id),
      }),
      () => {
        this.props.onRemoveFile && this.props.onRemoveFile(file);
      },
    );
  };

  /**
   * @param {number} id
   *        This function is called when a retry is instantiated
   *
   * @description This function is called when a retry is triggered for file upload
   */
  handleRetryFileUpload = id => {
    let file = this.state.files.find(file => file.id === id);
    this.props.onRetryFileUpload && this.props.onRetryFileUpload(file);
  };

  /**
   * @description This clears all files
   */
  handleClearAllFiles = () => {
    this.setState({
      files: [],
    });
  };

  /**
   * @param {event} event
   *        Drag enter event
   *
   * @description This is called when a dragEnter is fired
   */
  handleDragEnter = event => {
    event.stopPropagation();
    event.preventDefault();
    this.setState({
      isDnDVisible: true,
      dndTrigger: DND_TRIGGER.FILE_DRAG,
    });
  };

  /**
   * @description this is called when we want to close the drag and drop interface
   */
  handleCloseDnD = () => {
    /**
     * @todo
     * This is a work around till we find a perfect way to close this when the
     * cancel button click in an input file is detected
     */
    this.setState({
      isDnDVisible: false,
    });
  };

  /**
   * @description This forces window focus by obtaining focus on the message box
   */
  forceWindowFocus = () => {
    if (this.getEnlargementType() === WINDOW_ENLARGEMENT_TYPE.MINIMIZED) {
      this.handleEnlargement();
    }
    this.messageBoxRef.current.focus();
  };

  render() {
    let {
      agentProfile: { name, avatar, subtitle, isOnline, id },
      messages,
      onSend,
      senderProfile,
      onProfileClick,
      filesUploadProps,
    } = this.props;
    messages = messages || [];

    return (
      <div
        id="launcher"
        className={classNames(
          classes.container,
          this.state.enlargementType === WINDOW_ENLARGEMENT_TYPE.MINIMIZED &&
            classes.chatWindowMinimized,
        )}
        onDragEnter={this.handleDragEnter}
        onDragOver={this.handleDragEnter}>
        <Header
          onProfileClick={onProfileClick}
          onClose={this.closeWindow}
          onMinimize={this.handleEnlargement}
          userName={name}
          agentId={id}
          isOnline={isOnline}
        />
        <div className={classes.contentWrapper}>
          <div className={classes.chatContainer}>
            <div
              ref={this.containerRef}
              className={classes.conversationContainer}>
              <ul className={classes.conversationListContent}>
                <TopAvatar
                  avatar={avatar}
                  agentId={id}
                  subtitle={subtitle}
                  userName={name}
                  onProfileClick={onProfileClick}
                  isOnline={isOnline}
                />
                <li>
                  <MessageList
                    messages={messages}
                    agentId={id}
                    agentAvatar={avatar}
                    agentName={name}
                    onProfileClick={onProfileClick}
                    senderId={senderProfile.id}
                    senderAvatar={senderProfile.avatar}
                    senderName={senderProfile.name}
                  />
                </li>
              </ul>
            </div>
          </div>
        </div>
        <MessageBox
          onSetMessageBoxRef={ref => (this.messageBoxRef = ref)}
          onSend={onSend}
          files={this.state.files}
          onClearAllFiles={this.handleClearAllFiles}
          onRemoveFile={this.handleFileRemove}
          onOpenFileSelector={this.handleOpenFileSelector}
          onFileChange={this.handleSelectFile}
          onRetryFileUpload={this.handleRetryFileUpload}
          filesUploadProps={filesUploadProps}
          senderId={senderProfile.id}
          agentId={id}
        />
        <DragAndDropInterface
          onRequestClose={this.handleCloseDnD}
          triggerType={this.state.dndTrigger}
          visible={this.state.isDnDVisible}
          onFileChange={this.handleSelectFile}
        />
      </div>
    );
  }
}
