// @flow

import type {Dispatch} from 'react-redux';

import React from 'react';
import firebase from 'firebase';
import {connect} from 'react-redux'

import {handleLogin, handleLogout, authedWithProvider, loginFailed, logoutFailed} from '../actions/auth';

import {AuthButtons} from './auth-buttons.js';


type ConnectedAuthButtonProps = {
  loggedIn: boolean,
  dispatch: Dispatch,
}

class ConnectedAuthButtons extends React.Component {
  props: ConnectedAuthButtonProps;

  render() {
    return <AuthButtons
      loggedIn={this.props.loggedIn}
      handleTwitterLogin={this.handleTwitterLogin}
      handleLogout={this.handleAppLogout}
    />;
  }

  // this is a special shorthand which creates a bound
  // class method handleTwitterLogin without needing to use either
  // `that = this;`
  //                            or
  // this.handleTwitterLogin = this.handleTwitterLogin.bind(this);
  // in the class constructor.
  //
  // the only reason we need to bind these methods at all, btw, is
  // because they use `this.props.dispatch` which requires the methods
  // to be bound to the class instance correctly.
  handleTwitterLogin = () => {
    const {dispatch} = this.props;

    dispatch(handleLogin('twitter'));
    const provider = new firebase.auth.TwitterAuthProvider();

    firebase.auth().signInWithPopup(provider).then(result => {
      dispatch(authedWithProvider(result));
    }).catch(errors => {
      dispatch(loginFailed(errors));
    })
  };

  handleAppLogout = () => {
    const {dispatch} = this.props;

    firebase.auth().signOut()
      .then(() => dispatch(handleLogout()))
      .catch(() => dispatch(logoutFailed()));
  }
}

export default connect(
  // Previously all the imported auth action creators lived here as the second
  // argument to connect after mapStateToProps. That is a special feature of
  // connect() which allows those functions to get transformed like this:
  //
  //    handleLogout is an "action creator" and if you look at its definition, it
  //    only returns a javascript object that represents a redux action.
  //    nothing super fancy there. But in order for the redux reducer to _know_
  //    that action has been called, we need to dispatch it. To dispatch an action,
  //    you would write dispatch(handleLogout()).
  //
  //    passing in an abject here as the second argument like {handleLogout} would
  //    have the effect of injecting a prop to ConnectedAuthButtons like this:
  //
  //    props.handleLogout = () => this.props.dispatch(handleLogout())
  //
  //    which means every time previously i would call `this.props.handleLogout()`
  //    i was really calling a magically dispatch-wrapped version of handleLogout
  //
  // anyhow, point being that i think for now, it's best to take the path of
  // relying on this sort of magic less than we need to.
  //
  // But, the next question is: why do we use connect at all? We use it so that
  // we don't have to *explicitly* wire `dispatch` through. Dispatch is just one
  // of those things that almost every time, we should try to just get from
  // connect dircetly rather than passing it deeply through the application.
)(ConnectedAuthButtons);
