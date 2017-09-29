import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import shortid from 'shortid';

export const Links = new Mongo.Collection('links');

if (Meteor.isServer) {
    Meteor.publish('links', function () {
        return Links.find({ userId: this.userId });
    });
}

// resource.action
Meteor.methods({
    'links.insert'(url) {
        let userId = this.userId;
        if (!userId) {
            throw new Meteor.Error('not-authorized');
        }
        new SimpleSchema({
            url: {
                type: String,
                label: 'Your link',
                regEx: SimpleSchema.RegEx.Url
            }
        }).validate({ url });
        const _id = shortid.generate(),
            visible = true,
            visitedCount = 0,
            lastVisitedAt = null;
        console.log('New short id', _id);
        Links.insert({ _id, url, userId, visible, visitedCount, lastVisitedAt });
    },
    'links.setVisibility'(_id, visible) {
        let userId = this.userId;
        if (!userId) {
            throw new Meteor.Error('not-authorized');
        }
        new SimpleSchema({
            _id: {
                type: String,
                min: 1
            }
            , visible: {
                type: Boolean
            }
        }).validate({ _id, visible });
        Links.update({ _id, userId }, { $set: { visible } });
    },
    'links.trackVisit'(_id) {
        const currentDate = new Date();
        const lastVisitedAt = currentDate.getTime();
        Links.update(_id, { $set: { lastVisitedAt }, $inc: { visitedCount: 1 } });
    },
    'links.remove'(_id) {
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
        Links.remove({ _id, userId });
    }
    // addNumber(a, b) {
    //     console.log('Add Number is running');
    //     if (typeof a === 'number' && typeof b === 'number') {
    //         return a + b;
    //     }
    //     else {
    //         throw new Meteor.Error('invalid-arguments', 'Number is required');
    //     }
    // }
});