import React from 'react';
import { Meteor } from 'meteor/meteor';
import Dropzone from 'react-dropzone';

export default class ImageDropZone extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: '',
      files: [],
      dropzoneRef: null
    };
  }
  componentWillUnmount() {
    const files = this.state.files;
    files.forEach((file) => {
      window.URL.revokeObjectURL(file.preview);
    });
  }
  handleDrop(files) {
    console.log("File dropped:", files)
    files.forEach((file) => {
      Cloudinary.upload(file, (err, res) => {
        console.log("Upload Error: ", err);
        console.log("Upload Result: ", res);
        file.public_id = res.public_id;
        const files = this.state.files;
        files.push(file);
        this.setState({ files });
      });
    });

  }
  deleteImage(file) {
    const files = this.state.files;
    var removeIndex = files.map(function (file) { return file.public_id; }).indexOf(file.public_id);
    ~removeIndex && files.splice(removeIndex, 1);
    this.setState({ files });
    Cloudinary.delete(file.public_id, (err, res) => {
      console.log("Delete Error: ", err);
      console.log("Delete Result: ", res);
    });
  }
  renderImages() {
    if (this.state.files.length === 0) {
      return (
        <div className="drop-zone--empty">
          <div className="drop-zone--empty__content">
            <img src="/images/upload-cloud.png" width="200rem" />
            <p>Drop your images to upload</p>
          </div>
        </div>
      )
    } else {
      return this.state.files.map((file) => {
        return (
          <div className="drop-zone__image-container" key={file.public_id} >
            <img width='200' height='200' src={Cloudinary._helpers.url(file.public_id, {
              hash: {
                width: 200,
                height: 200,
                crop: "fill"
              }
            })} />
            <img className="drop-zone__delete-button" src="/images/x-mark-3-xxl.png" width="20rem" onClick={(e) => this.deleteImage(file)} />
          </div>
        )
      });
    }
  }
  render() {
    return (
      <div>
        <Dropzone
          onDrop={this.handleDrop.bind(this)}
          ref={(node) => { this.dropzoneRef = node; }}
          multiple
          disableClick
          accept="image/*"
          className="drop-zone"
        >
          <div className="drop-zone__topbar">
            <button className="button" onClick={() => { this.dropzoneRef.open() }}>
              Add images
            </button>
          </div>
          {this.renderImages()}
        </Dropzone>
      </div>
    )
  }
}