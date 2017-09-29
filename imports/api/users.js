import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import SimpleSchema from 'simpl-schema';

Accounts.onCreateUser((options, user) => {

  return user;
});

Accounts.validateNewUser((user) => {
    console.log('New user going to be created', user);
    const email = user.emails[0].address;
    new SimpleSchema({
        email: {
            type: String,
            regEx: SimpleSchema.RegEx.Email
        }
    }).validate({ email });
    return true;
});