import React from 'react';
import { Meteor } from 'meteor/meteor';
import Modal from 'react-modal';
import ImageDropZone from './ImageDropZone';

export default class AddImage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false
        };
    }
    onSubmit(e) {
        console.log('Submit');
        e.preventDefault();
        this.setState({ isOpen: false});
        
    }
    openModal() {
        console.log('Open');
        //this.setState({ isOpen: false, error: '', url: '' });

    }
    closeModal() {
        console.log('Close');
        this.setState({ isOpen: false});
    }
    render() {
        return (
            <span>
                <button className="button" onClick={() => this.setState({ isOpen: true })}>+ Add Images</button>
                <Modal isOpen={this.state.isOpen}
                    contentLabel={this.props.productCode+'/'+this.props.productType+'/'+this.props.productSize}
                    onAfterOpen={this.openModal.bind(this)}
                    onRequestClose={this.closeModal.bind(this)}
                    className="boxed-view__bigbox"
                    overlayClassName="boxed-view boxed-view--modal">
                    <h1>{this.props.productCode+'/'+this.props.productType+'/'+this.props.productSize}</h1>
                    <ImageDropZone productId={this.props._id} images={this.props.images}/>
                    <form onSubmit={this.onSubmit.bind(this)} className="boxed-view__form">
                        <button className="button" >OK</button>
                    </form>
                </Modal>
            </span>
        );
    }
}
