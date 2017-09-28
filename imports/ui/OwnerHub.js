import React from 'react';
import { Link } from 'react-router-dom';
import { Accounts } from 'meteor/accounts-base';
import SimpleSchema from 'simpl-schema';

export default class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: ''
    };
  }
  render() {
    return (
      <div className="boxed-view">
        <div className="boxed-view__box">
          <h1>Owner Hub</h1>
          <button className="button" onClick={() => Accounts.logout()}>Logout</button>
        </div>
      </div>
    )
  }
}