import { Tracker } from 'meteor/tracker';
import { withRouter } from "react-router-dom";
import React from 'react';


const unauthenticatedPages = ['/', '/signup', '/login'];
const authenticatedPages = ['/ownerhub'];
// Need to be modified
const mainAuthenticatedPage = '/ownerhub';
const mainUnauthenticatedPage = '/';

class App extends React.Component {
    onAuthChange() {
        const isAuthenticated = !!Meteor.userId();
        console.log('isAuthenticated', isAuthenticated);
        console.log(this);
        const pathname = this.props.location.pathname;
        console.log(pathname);
        const isUnauthenticatedPages = unauthenticatedPages.includes(pathname);
        const isAuthenticatedPages = authenticatedPages.includes(pathname);
        // if on unauthenticated page and logged in, redirect to /ownerhub
        if (isAuthenticated && isUnauthenticatedPages) {
            this.props.history.replace(mainAuthenticatedPage);
        }  // if on authenticated page and not logged in, redirect to /
        else if (!isAuthenticated && isAuthenticatedPages) {
            this.props.history.replace(mainUnauthenticatedPage);
        }
        // No else.
    }
    componentWillMount() {
        Tracker.autorun(() => {
            this.onAuthChange();
        });

        console.log('componentWillMount', this.props.location.pathname);
    }
    render() {
        return null;
    }
}

export default withRouter(App);
