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

  onSubmit(e) {
    e.preventDefault();

    let email = this.refs.email.value.trim();
    let password = this.refs.password.value.trim();
    try {
      new SimpleSchema({
        password: {
          type: String,
          min: 6
        }
      }).validate({ password });
      Accounts.createUser({ email, password }, (error) => {
        console.log('Signup callback', error);
        if (error) {
          this.setState({ error: error.reason });
        } else {
          this.setState({ error: '' });
        }
      });
    } catch (e) {
      console.log('password validation error', e);
      this.setState({ error: e.reason });
    }
  }
  render() {
    return (
      <div className="boxed-view">
        <div className="boxed-view__box">
          <h1>Join SupersRENT</h1>

          {this.state.error ? <p>{this.state.error}</p> : undefined}
          <form onSubmit={this.onSubmit.bind(this)} noValidate className="boxed-view__form">
            <input type="email" ref="email" name="email" placeholder="Email" />
            <input type="password" ref="password" name="password" placeholder="Password" />
            <button className="button">Create Account</button>
          </form>

          <Link to="/login">Already have an account?</Link>
        </div>
      </div>
    )
  }
}