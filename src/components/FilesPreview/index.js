import React from 'react';
import PropTypes from 'prop-types';
import { MdClose, MdCached as MdRetry } from 'react-icons/md';
import { classes as classNames } from 'typestyle';

import { classes } from './styles';
import { FILE_UPLOAD_TYPE } from '../../utils/Constants';

/**
 * @module
 *
 * @description This component handles the preview of files in the chat
 * For now, it supports the preview of just image files as this is what we handle at the moment
 */
export class FilesPreview extends React.PureComponent {
  state = {
    files: [],
  };

  static propTypes = {
    files: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        file: PropTypes.any.isRequired,
      }),
    ).isRequired,
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

  componentDidUpdate(prevProps) {
    if (prevProps.files.length !== this.props.files.length) {
      if (this.props.files.length > prevProps.files.length) {
        /**
         * @description
         * When this occurs it means that a new file has been added
         * For performance purposes, we only try to obtain the base64
         * encoding of the last file added and add it to file in our state
         *
         * Also we want to do the necessary encoding only if
         * the file format is supported by our system
         */
        let { file, id } = this.props.files[this.props.files.length - 1],
          fileReader = new FileReader();

        if (Object.values(FILE_UPLOAD_TYPE).indexOf(file.type) !== -1) {
          fileReader.onload = event => {
            this.setState(prevState => ({
              files: [
                ...prevState.files,
                {
                  id,
                  name: file.name,
                  size: file.size,
                  type: file.type,
                  base64: event.target.result,
                },
              ],
            }));
          };
          fileReader.readAsDataURL(file);
        }
      } else if (this.props.files.length < prevProps.files.length) {
        /**
         * @description
         * When this occurs it means that a file has been removed
         * To adequately remove the missing file, we need to check
         * for the file that is missing and remove it from our state
         *
         * However this is done appropriately since we use a timestamp ID and not an index ID
         * therefore ReactJs will not destroy and create any list of file preview :-)
         */
        let ArrayOfIds = this.props.files.map(file => file.id);
        this.setState(prevState => ({
          files: prevState.files.filter(
            file => ArrayOfIds.indexOf(file.id) !== -1,
          ),
        }));
      }
    }
  }

  renderFilePreview = id => {
    let { filesUploadProps } = this.props,
      _filesUploadProps = filesUploadProps || {},
      uploadProps = _filesUploadProps[id] || {},
      previewText = '';

    if (uploadProps.error === true && uploadProps.isUploading === false) {
      previewText =
        uploadProps.errorHelperText || 'The upload failed. Please try again.';
    } else if (uploadProps.done === true && uploadProps.isUploading === false) {
      previewText = 'Attached';
    } else if (uploadProps.done === false && uploadProps.isUploading === true) {
      previewText = 'Uploading...';
    }

    return (
      <span
        className={classNames(
          classes.previewAttachedText,
          uploadProps.error === true &&
            uploadProps.isUploading === false &&
            classes.previewErrorText,
          uploadProps.isUploading === true && classes.previewUploadingText,
        )}>
        {previewText}
      </span>
    );
  };

  renderProgressBar = id => {
    let { filesUploadProps } = this.props,
      _filesUploadProps = filesUploadProps || {},
      uploadProps = _filesUploadProps[id] || {};

    if (uploadProps.progress === undefined) {
      return;
    } else if (
      uploadProps.progress !== undefined &&
      typeof uploadProps.progress !== 'number'
    ) {
      throw new Error(
        'Progress value for image upload must be a number between 0 and 1',
      );
    }

    return uploadProps.progress === undefined ||
      uploadProps.done === true ||
      uploadProps.error === true ? null : (
      <div className={classes.progressBar}>
        <div
          className={classes.progressValue}
          style={{ width: `${uploadProps.progress * 100}%` }}
        />
      </div>
    );
  };

  render() {
    let { filesUploadProps } = this.props,
      _filesUploadProps = filesUploadProps || {};

    return (
      <React.Fragment>
        {this.state.files.map(file => (
          <figure key={file.id} className={classes.fileContainer}>
            <div className={classes.previewImageContainer}>
              <img className={classes.previewImage} src={file.base64} />
            </div>
            <figcaption className={classes.previewCaptionContainer}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <span className={classes.previewName}>{file.name}</span>
                <div className={classes.dotSeperator} />
                <span className={classes.previewSize}>
                  {Math.round(file.size / 1000)} KB
                </span>
              </div>
              {this.renderFilePreview(file.id)}
              {this.renderProgressBar(file.id)}
            </figcaption>
            <div style={{ display: 'flex' }}>
              {_filesUploadProps[file.id] &&
                _filesUploadProps[file.id].error === true &&
                _filesUploadProps[file.id].isUploading === false && (
                  <MdRetry
                    onClick={() => this.props.onRetryFileUpload(file.id)}
                    className={classes.previewActionBtn}
                    style={{ marginRight: 2 }}
                  />
                )}
              <MdClose
                className={classes.previewActionBtn}
                onClick={() => this.props.onRemoveFile(file.id)}
              />
            </div>
          </figure>
        ))}
      </React.Fragment>
    );
  }
}
