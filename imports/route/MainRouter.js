
import React from 'react';
import { withRouter } from "react-router-dom";
import { BrowserRouter } from 'react-router-dom';
import { Route, Switch, Redirect } from 'react-router';

import NotFound from '../ui/NotFound';
import Signup from '../ui/Signup';
import Home from '../ui/Home';
import Login from '../ui/Login';
import OwnerHub from '../ui/OwnerHub';
import Admin from '../ui/Admin';
import App from '../ui/App';


export default class MainRouter extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <div>
                    <App />
                    <Switch>
                        <Route exact path="/" render={() => (
                             <Home />
                        )} />
                        <Route exact path="/signup" render={() => (
                            Meteor.userId() ? (
                                <Redirect to="/ownerhub" />
                            ) : (
                                    <Signup />
                                )
                        )} />
                        <Route exact path="/login" render={() => (
                            Meteor.userId() ? (
                                <Redirect to="/ownerhub" />
                            ) : (
                                    <Login />
                                )
                        )} />
                        <Route exact path="/ownerhub" render={() => (
                            Meteor.userId() ? (
                                <OwnerHub />
                            ) : (
                                    <Redirect to="/login" />
                                )
                        )} />
                        <Route exact path="/admin" render={() => (
                            Meteor.userId() ? (
                                <Admin />
                            ) : (
                                    <Redirect to="/login" />
                                )
                        )} />
                        <Route component={NotFound} />
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}

