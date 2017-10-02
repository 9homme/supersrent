import React from 'react';
import { Link } from 'react-router-dom';
import { Accounts } from 'meteor/accounts-base';
import SimpleSchema from 'simpl-schema';
import { Products } from '../api/products';
import FlipMove from 'react-flip-move';
import AddImage from './AddImage';

export default class Admin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: '',
      products: []
    };
  }
  componentDidMount() {
    Meteor.subscribe('products');
    this.productsTracker = Tracker.autorun(() => {
      let products = Products.find({}).fetch();
      this.setState({ products });
    });
  }
  componentWillUnmount() {
    this.productsTracker.stop();
  }
  onSubmit(e) {
    e.preventDefault();

    let productCode = this.refs.productCode.value.trim();
    let productType = this.refs.productType.value.trim();
    let productSize = this.refs.productSize.value.trim();
    let pricePerDay = Number(this.refs.pricePerDay.value.trim());

    const product = {
      productCode,
      productType,
      productSize,
      pricePerDay
    };
    Meteor.call('products.insert', product, (error, result) => {
      console.log('Product insert result', error, result);
    });

  }
  removeProduct(_id) {
    Meteor.call('products.remove', _id, (error, result) => {
      console.log('Product remove result', error, result);
    });
  }
  renderProducts() {
    if (this.state.products.length === 0) {
      return <div className="item"><p className="item__status-message">No product found.</p></div>
    }
    else {
      return this.state.products.map((product) => {
        return (
          <div key={product._id} className="item">
            <img width='200' height='200' src={product.images.length > 0 ?Cloudinary._helpers.url(product.images[0], {
              hash: {
                width: 200,
                height: 200,
                crop: "fill"
              }
            }): '/images/x-mark-3-xxl.png'} />
            <h2>{product.productCode}/{product.productType}/{product.productSize}</h2>
            <h3>ราคาเช่า {product.pricePerDay} บาทต่อวัน</h3>
            <div className="item__control">
              <button className="button button--pill" onClick={() => { this.removeProduct(product._id) }}>Delete</button>
              <AddImage {...product}/>
            </div>
          </div>
        );
      });
    }
  }
  render() {
    return (
      <div>
        <h1>Admin</h1>
        {this.state.error ? <p>{this.state.error}</p> : undefined}
        <form onSubmit={this.onSubmit.bind(this)} noValidate className="boxed-view__form">
          <input type="text" ref="productCode" name="productCode" placeholder="รหัสสินค้า" />
          <input type="text" ref="productType" name="productType" placeholder="ชนิดแบบ" />
          <input type="text" ref="productSize" name="productSize" placeholder="กว้างxยาวxหนา(ซม.)" />
          <input type="number" ref="pricePerDay" name="pricePerDay" placeholder="ราคาเช่า/วัน" />
          <button className="button">Create Product</button>
        </form>
        <div>
          <FlipMove maintainContainerHeight={true}>
            {this.renderProducts()}
          </FlipMove>
        </div>
      </div>
    )
  }
}