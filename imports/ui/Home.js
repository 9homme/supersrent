import React from 'react';
import { Link } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: ''
    };
  }

  render() {
    return (
      <div>
        <div>
          <h1>Welcome to Supersrent Home page</h1>
        </div>
      </div>
    )
  }
}