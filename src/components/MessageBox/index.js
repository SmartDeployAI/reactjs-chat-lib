import React from 'react';
import PropTypes from 'prop-types';
import { classes as classNames } from 'typestyle';
import { MdAttachFile } from 'react-icons/md';

import EmojiPicker from '../EmojiPicker';
import { FilesPreview } from '../FilesPreview';
import PopUp from '../EmojiPicker/PopUp';
import { classes } from './styles';
import { MESSAGE_TYPE } from '../../utils/Constants';

/**
 * @module
 *
 * This is the message box of the Chat Window
 */
export class MessageBox extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      showEmoji: false,
      message: '',
      emojiFilter: '',
    };

    this.messageBoxRef = React.createRef();
    this.fileInputRef = React.createRef();
  }

  static propTypes = {
    onSetMessageBoxRef: PropTypes.func.isRequired,
    onSend: PropTypes.func.isRequired,
    agentId: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
      .isRequired,
    senderId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onOpenFileSelector: PropTypes.func,
    onClearAllFiles: PropTypes.func,
    onFileChange: PropTypes.func,
    onCloseFileSelector: PropTypes.func,
    onRemoveFile: PropTypes.func,
    onRetryFileUpload: PropTypes.func,
    filesUploadProps: PropTypes.objectOf(
      PropTypes.shape({
        isUploading: PropTypes.bool.isRequired,
        done: PropTypes.bool.isRequired,
        error: PropTypes.bool.isRequired,
        errorHelperText: PropTypes.string,
        progress: PropTypes.number,
      }),
    ),
  };

  componentDidMount() {
    this.emojiPickerButton = document.querySelector('#emoji-picker-button');
    this.props.onSetMessageBoxRef(this.messageBoxRef);
  }

  /**
   * @param {string} emoji
   *        This is the emoji selected
   *
   * @description This function adds the emoji to the message
   */
  handleEmojiClick = emoji => {
    this.setState(prevState => ({
      showEmoji: false,
      message: `${prevState.message}${emoji}`,
      emojiFilter: '',
    }));
  };

  /**
   * @param {event} e
   *        Event called when user types in the message box
   *
   * @description This function is fired when user types in message box
   */
  handleChange = e => {
    this.setState({ message: e.target.value });
  };

  /**
   * @param {event} e
   *        Event called when emoji picker is closed
   *
   * @description This funtion is called when picker is closed
   */
  closeEmojiPicker = e => {
    if (this.emojiPickerButton.contains(e.target)) {
      e.stopPropagation();
      e.preventDefault();
    }
    this.setState({ showEmoji: false, emojiFilter: '' });
  };

  /**
   * @description This function is called when user wants to toggle the visibility of the emoji picker
   */
  toggleEmojiState = () => {
    this.setState({
      showEmoji: !this.state.showEmoji,
    });
  };

  /**
   * @return String
   * @param {String} content
   *        the current string content of the message
   *
   * @description This returns the message format @see MESSAGE_TYPE
   */
  getMessageFormat = content => {
    if (this.props.files.length > 0) {
      return MESSAGE_TYPE.FILES;
    }
    return /[a-zA-Z0-9]+/.test(content)
      ? MESSAGE_TYPE.TEXT
      : MESSAGE_TYPE.EMOJI;
  };

  /**
   * @param {event} event
   *        event of filter change
   *
   * @description this is called when user types in search box of emoji picker
   */
  handleEmojiFilterChange = event => {
    const emojiFilter = event.target.value.toLowerCase();
    this.setState({ emojiFilter });
  };

  /**
   * @description called to reset file input
   */
  handleResetFileInput = () => {
    this.props.onOpenFileSelector();
    this.fileInputRef.current.value = null;
  };

  /**
   * @param {event} event
   *        event when file is selected
   *
   * @description this function handles selected file
   */
  handleSelectFile = event => {
    let file = event.target.files[0];
    this.props.onFileChange(file);
  };

  /**
   * @param {number} id
   *        The id of the file to remove
   *
   * @description This function handles file removal
   */
  handleFileRemove = id => {
    this.props.onRemoveFile(id);
  };

  /**
   * @param {event} e
   *        Event called with submit button
   *
   * @description This handles the submit click
   */
  handleSubmit = e => {
    e.preventDefault();
    if (this.state.message.trim().length === 0 && this.props.files.length === 0)
      return;
    let content = this.state.message;
    this.props.onSend({
      text: content.trim(),
      files: [...this.props.files],
      createdAt: `${new Date()}`,
      type: this.getMessageFormat(content),
      agentId: this.props.agentId,
      senderId: this.props.senderId,
    });
    this.setState({ message: '' }, () => this.messageBoxRef.current.focus());
    this.props.onClearAllFiles();
  };

  renderEmojiPopup = () => (
    <PopUp
      isOpen={this.state.showEmoji}
      onClickedOutside={this.closeEmojiPicker}
      onInputChange={this.handleEmojiFilterChange}>
      <EmojiPicker
        onPicked={this.handleEmojiClick}
        filter={this.state.emojiFilter}
      />
    </PopUp>
  );

  render() {
    return (
      <div>
        <FilesPreview
          files={this.props.files}
          onRetryFileUpload={this.props.onRetryFileUpload}
          filesUploadProps={this.props.filesUploadProps}
          onRemoveFile={this.handleFileRemove}
        />
        <form className={classes.messageBox} onSubmit={this.handleSubmit}>
          <div className={classes.textEditor}>
            <div className={classes.editor}>
              <textarea
                placeholder="Write a message..."
                onChange={this.handleChange}
                className={classes.editorBox}
                value={this.state.message}
                ref={this.messageBoxRef}
              />
            </div>
          </div>
          <footer className={classes.footer}>
            <div className={classes.IconsWrapper}>
              <button
                className={classes.toolboxItemBtn}
                style={{ fontSize: 17 }}
                type="button">
                <input
                  ref={this.fileInputRef}
                  onClick={this.handleResetFileInput}
                  onChange={this.handleSelectFile}
                  type="file"
                  className={classes.fileIcon}
                />
                <MdAttachFile style={{ transform: 'rotate(90deg)' }} />
              </button>
              <button
                id="emoji-picker-button"
                className={classes.toolboxItemBtn}
                type="button"
                onClick={this.toggleEmojiState}>
                <i className={classes.emojiIcon}>
                  <svg
                    viewBox="0 0 24 24"
                    width="24px"
                    height="24px"
                    x="0"
                    y="0"
                    preserveAspectRatio="xMinYMin meet"
                    className=""
                    focusable="false">
                    <path
                      d="M4.84,6A1.16,1.16,0,1,1,6,7.17,1.17,1.17,0,0,1,4.84,6ZM8,9.38a3.51,3.51,0,0,1-2.3-.81L4.87,9.86a4.87,4.87,0,0,0,6.25,0L10.3,8.58A3.51,3.51,0,0,1,8,9.38Zm2-4.55A1.17,1.17,0,1,0,11.16,6,1.17,1.17,0,0,0,10,4.83ZM8,2.88A5.12,5.12,0,1,1,2.88,8,5.12,5.12,0,0,1,8,2.88M8,1a7,7,0,1,0,7,7A7,7,0,0,0,8,1Z"
                      className=""
                      style={{ fillOpacity: '0.6' }}></path>
                  </svg>
                </i>
              </button>
            </div>
            <div className={classes.btnWrapper}>
              <div>
                <button
                  className={classNames(
                    classes.msgBtn,
                    this.state.message.trim().length === 0 &&
                      this.props.files.length === 0 &&
                      classes.msgBtnDisabled,
                  )}
                  type="submit"
                  disabled={
                    this.state.message.trim().length === 0 &&
                    this.props.files.length === 0
                  }>
                  Send
                </button>
              </div>
            </div>
          </footer>
        </form>
        {this.renderEmojiPopup()}
      </div>
    );
  }
}
