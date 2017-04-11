// @flow

import React, {Component} from 'react';
import {connect} from 'react-redux';
import firebase from 'firebase';
import {handleLogin, handleLogout, authedWithProvider, loginFailed, logoutFailed} from '../actions/auth';

import {AuthButtons} from './auth-buttons';


const mapStateToProps = state => {
  const loggedIn = state.auth.status === 'logged in';
  const loggingIn = state.auth.status === 'logging in';
  const provider = state.auth.provider;

  const {user = {}} = state.auth;
  const {displayName, photoURL} = user;

  return {
    loggedIn,
    loggingIn,
    provider,
    displayName,
    photoURL
  }
}

type AppBodyProps = {
  loggingIn: boolean,
  loggedIn: boolean,
  provider: ?string,
  displayName: ?string,
  photoURL: ?string,

  handleLogout: () => void,
  handleLogin: (provider: 'twitter') => void,
  authedWithProvider: (payload: {}) => void,
  loginFailed: (errors: {}) => void,
  logoutFailed: (error: any) => void,
};

class SimpleAppBody extends Component {
  props: AppBodyProps;

  render() {
    const {loggingIn, loggedIn, provider} = this.props;
    const {photoURL, displayName} = this.props;

    return <div>
      <p className="App-intro">
        To get started, edit <code>src/App.js</code> and save to reload.
      </p>

      { loggedIn && <UserGreeting photoURL={photoURL} displayName={displayName} /> }

      { loggingIn
      ? <span>Opening a popup for {provider} to log in</span>
      : <AuthButtons loggedIn={loggedIn}
          handleTwitterLogin={this.handleTwitterLogin}
          handleLogout={this.handleLogout}
        />
      }
    </div>
  }

  handleTwitterLogin = () => {
    this.props.handleLogin('twitter');
    const provider = new firebase.auth.TwitterAuthProvider();

    firebase.auth().signInWithPopup(provider).then(result => {
      this.props.authedWithProvider(result);
    }).catch(errors => {
      this.props.loginFailed(errors);
    })
  }

  handleLogout = () => {
    firebase.auth().signOut()
      .then(this.props.handleLogout)
      .catch(this.props.logoutFailed);
  }
};

export default connect(
  mapStateToProps,
  {handleLogout, handleLogin, authedWithProvider, loginFailed, logoutFailed}
)(SimpleAppBody);


const UserGreeting = ({photoURL, displayName}) => (
  <div>
    <p>{displayName}, you logged in!</p>
    <div><img src={photoURL} /></div>
  </div>
);
