import React from 'react';
import { Meteor } from 'meteor/meteor';
import Dropzone from 'react-dropzone';
import { Products } from '../api/products';

export default class ImageDropZone extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: '',
      files: [],
      images:this.props.images,
      dropzoneRef: null
    };
  }
  componentDidMount() {
    console.log('Image dropzone mount', this.props.productId);
  }
  componentWillUnmount() {
    console.log('Image dropzone unmount', this.props.productId);
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
 
        const images = this.state.images;
        images.push(res.public_id);
        this.setState({ files, images });

        Meteor.call('products.updateImages', this.props.productId, images, (error, result) => {
          console.log('Product update images result', error, result);
        });
      });
    });

  }
  deleteImage(public_id) {
    const files = this.state.files;
    let removeIndex = files.map(function (file) { return file.public_id; }).indexOf(public_id);
    ~removeIndex && window.URL.revokeObjectURL(files[removeIndex].preview) && files.splice(removeIndex, 1);

    const images = this.state.images;
    removeIndex = images.indexOf(public_id);
    ~removeIndex && images.splice(removeIndex, 1);

    this.setState({ files, images });

    Meteor.call('products.updateImages', this.props.productId, images, (error, result) => {
      console.log('Product update images result', error, result);
    });

    Cloudinary.delete(public_id, (res, err) => {
      console.log("Delete Error: ", err);
      console.log("Delete Result: ", res);
    });
  }
  renderImages() {
    if (this.state.images.length === 0) {
      return (
        <div className="drop-zone--empty">
          <div className="drop-zone--empty__content">
            <img src="/images/upload-cloud.png" width="200rem" />
            <p>Drop your images to upload</p>
          </div>
        </div>
      )
    } else {
      return this.state.images.map((public_id) => {
        return (
          <div className="drop-zone__image-container" key={public_id} >
            <img width='200' height='200' src={Cloudinary._helpers.url(public_id, {
              hash: {
                width: 200,
                height: 200,
                crop: "fill"
              }
            })} />
            <img className="drop-zone__delete-button" src="/images/x-mark-3-xxl.png" width="20rem" onClick={(e) => this.deleteImage(public_id)} />
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
              Browse...
            </button>
          </div>
          {this.renderImages()}
        </Dropzone>
      </div>
    )
  }
}