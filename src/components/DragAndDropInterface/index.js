import React from 'react';
import PropTypes from 'prop-types';
import { MdPhotoLibrary } from 'react-icons/md';

import { classes } from './styles';
import { FILE_UPLOAD_TYPE, DND_TRIGGER } from '../../utils/Constants';

export class DragAndDropInterface extends React.PureComponent {
  state = {
    highlight: false,
  };

  fileFormats = Object.values(FILE_UPLOAD_TYPE);

  static propTypes = {
    onFileChange: PropTypes.func.isRequired,
    triggerType: PropTypes.string,
    visible: PropTypes.bool.isRequired,
    onRequestClose: PropTypes.func.isRequired,
  };

  /**
   * @param {event} event
   *        dragEnter event
   *
   * @description This function is called during a dragEnter
   */
  handleDragEnter = event => {
    event.stopPropagation();
    event.preventDefault();
    this.setState({
      highlight: true,
    });
  };

  /**
   * @param {event} event
   *        dragOver event
   *
   * @description This function is called during a drag over
   */
  handleDragOver = event => {
    event.stopPropagation();
    event.preventDefault();
    this.setState({
      highlight: true,
    });
  };

  /**
   * @param {event} event
   *        dragLeave event
   *
   * @description This function is called during a drag leave
   */
  handleDragLeave = event => {
    event.stopPropagation();
    event.preventDefault();
    this.setState(
      {
        highlight: false,
      },
      () => {
        this.props.triggerType === DND_TRIGGER.FILE_DRAG &&
          this.props.onRequestClose();
      },
    );
  };

  /**
   * @param {event} event
   *        drop event
   *
   * @description This function is called during a file drop event
   */
  handleDrop = event => {
    event.stopPropagation();
    event.preventDefault();
    const dt = event.dataTransfer;
    const files = dt.files;
    this.setState({ highlight: false });
    this.props.onFileChange && this.props.onFileChange(files[0]);
  };

  render() {
    let { highlight } = this.state;

    return (
      this.props.visible && (
        <React.Fragment>
          <div className={classes.fadeContainer} />
          <div
            onDragEnter={this.handleDragEnter}
            onDragOver={this.handleDragOver}
            onDragLeave={this.handleDragLeave}
            onDrop={this.handleDrop}
            className={classes.dndContainer}
            onClick={this.props.onRequestClose}>
            <div
              style={{
                border: `1.5px dashed ${highlight ? '#3b5580' : '#bdbdbd'}`,
              }}
              className={classes.dndRelativeContainer}>
              <MdPhotoLibrary
                style={{
                  fontSize: 40,
                  color: `${highlight ? '#3b5580' : '#bdbdbd'}`,
                }}
              />
              <React.Fragment>
                <span className={classes.boldText}>Select your file</span>
                <span className={classes.mediumText}>
                  Or Drag and Drop a file
                </span>
              </React.Fragment>
            </div>
          </div>
        </React.Fragment>
      )
    );
  }
}
