// @flow
import React from 'react';
import firebase from 'firebase';
import {connect} from 'react-redux';

import SimpleUserMenu from './user-menu.js';

import {handleLogin, handleLogout, authedWithProvider, loginFailed, logoutFailed} from '../actions/auth';

import logo from '../logo.svg';

export default () => {
  return <div className="App-header">
    <div className="header-top">
      <div className="header-left-box">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Welcome to Brews</h1>
      </div>

      <div className="header-right-box">
        <ConnectedUserMenu />
      </div>
    </div>
  </div>
}


class UserMenu extends React.Component {

  render() {
    return <SimpleUserMenu user={this.props.user} onLogin={this.handleTwitterLogin} onLogout={this.handleAppLogout} />
  }

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

const ConnectedUserMenu = connect(
  state => ({
    user: state.auth.user || null,
  })
)(UserMenu)
