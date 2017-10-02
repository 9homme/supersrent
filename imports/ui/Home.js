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
        <PublicHeader />
        <div>
          {Meteor.userId ?
            <div><div><Link to="/ownerhub">Go to OwnerHub</Link></div>
              <div><Link to="/admin">Go to Admin</Link></div> </div>
            : <div><Link to="/login">Login</Link></div>}
        </div>
      </div>
    )
  }
}