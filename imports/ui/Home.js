import React from 'react';
import { Link } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import PublicHeader from './PublicHeader';

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
        <PublicHeader/>
        <div>
          <h1>Welcome to Supersrent Home page, We are coming soon!!</h1>
           <Link to="/ownerhub">Go to OwnerHub</Link>
        </div>
      </div>
    )
  }
}