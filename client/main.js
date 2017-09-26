import React from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import MainRouter from '../imports/route/MainRouter';
import '../imports/startup/simple-schema-configuration'

Meteor.startup(() => {
  ReactDOM.render((
    <MainRouter />
  ), document.getElementById('app'));
});

