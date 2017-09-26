
import React from 'react';
import { withRouter } from "react-router-dom";
import { BrowserRouter } from 'react-router-dom';
import { Route, Switch, Redirect } from 'react-router';

import NotFound from '../ui/NotFound';
import Signup from '../ui/Signup';
import Home from '../ui/Home';
import Login from '../ui/Login';
import App from '../ui/App';

const unauthenticatedPages = ['/', '/signup'];
const authenticatedPages = ['/link'];

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
                        <Route component={NotFound} />
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}

