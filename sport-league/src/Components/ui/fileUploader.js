import React from "react";
import { firebase } from "../../firebase";
import FileUploader from "react-firebase-file-uploader";
import { CircularProgress } from "@material-ui/core";

class Fileuploader extends React.Component {
  state = {
    name: "",
    isUploading: false,
    fileUrl: ""
  };

  static getDerivedStateFromProps(props, state) {
    if (props.defaultImg) {
      return (state = {
        name: props.defaultImgName,
        fileUrl: props.defaultImg
      });
    }
    return null;
  }

  handleUploadStart = () => {
    this.setState({
      isUploading: true
    });
  };

  handleUploadError = () => {
    this.setState({
      isUploading: false
    });
  };

  handleUploadSuccess = filename => {
    this.setState({
      name: filename,
      isUploading: false
    });

    firebase
      .storage()
      .ref(this.props.dir)
      .child(filename)
      .getDownloadURL()
      .then(url => {
        this.setState({
          fileUrl: url
        });
      });

    this.props.filename(filename);
  };

  uploadAgain = () => {
    this.setState({
      name: "",
      isUploading: false,
      fileUrl: ""
    });
    this.props.resetImg();
  };

  render() {
    return (
      <div>
        {!this.state.fileUrl ? (
          <div>
            <div className="label_inputs">{this.props.tag}</div>
            <FileUploader
              accept="image/*"
              name="image"
              randomizeFilename
              storageRef={firebase.storage().ref(this.props.dir)}
              onUploadStart={this.handleUploadStart}
              onUploadError={this.handleUploadError}
              onUploadSuccess={this.handleUploadSuccess}
            />
          </div>
        ) : (
          <div className="image_upload_container">
            <img
              src={this.state.fileUrl}
              alt={this.state.name}
              style={{ width: "100%" }}
            />
            <button className="remove" onClick={this.uploadAgain}>
              Remove
            </button>
          </div>
        )}

        {this.state.isUploading ? (
          <div
            className="progress"
            style={{
              textAlign: "center",
              margin: "30px 0"
            }}
          >
            <CircularProgress style={{ color: "#98c6e9" }} thickness={7} />
          </div>
        ) : null}
      </div>
    );
  }
}

export default Fileuploader;
