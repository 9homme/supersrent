import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';

export const Products = new Mongo.Collection('products');

if (Meteor.isServer) {
    Meteor.publish('products', function () {
        return Products.find({});
    });
}

Meteor.methods({
    'products.insert'(product) {
        let userId = this.userId;
        if (!userId) {
            throw new Meteor.Error('not-authorized');
        }
        new SimpleSchema({
            productCode: {
                type: String
            },
            productType:{
                type: String
            },
            productSize:{
                type: String
            },
            pricePerDay:{
                type: Number
            }
        }).validate(product);
        product.images = [];
        Products.insert(product);
    },
    'products.updateImages'(_id, images){
        let userId = this.userId;
        if (!userId) {
            throw new Meteor.Error('not-authorized');
        }
        Products.update({_id},{$set:{images}});
    },
    'products.remove'(_id) {
        let userId = this.userId;
        if (!userId) {
            throw new Meteor.Error('not-authorized');
        }
        new SimpleSchema({
            _id: {
                type: String,
                min: 1
            }
        }).validate({ _id });
        Products.remove({ _id });
    }
});