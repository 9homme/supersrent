import { Meteor } from 'meteor/meteor';
import '../imports/startup/cloudinary-server-configuration'
import '../imports/startup/simple-schema-configuration'
import '../imports/api/products';
Meteor.startup(() => {
  // code to run on server at startup
});
