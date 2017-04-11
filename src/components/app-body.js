// @flow

import React from 'react';
import {connect} from 'react-redux';

import {handleLogin, handleLogout} from '../actions/auth';

import {AuthButtons} from './auth-buttons';


const mapStateToProps = state => {
  const loggedIn = state.auth.status === 'logged in';
  const loggingIn = state.auth.status === 'logging in';

  return {
    loggedIn,
    loggingIn,
  }
}

type AppBodyProps = {
  loggingIn: boolean,
  loggedIn: boolean,
  handleLogout: () => void,
  handleLogin: (method: string) => void,
};

const SimpleAppBody = (props: AppBodyProps) => {
  const {loggingIn, loggedIn} = props;
  return <div>
    <p className="App-intro">
      To get started, edit <code>src/App.js</code> and save to reload.
    </p>
    {loggingIn
    ? <span></span>
    : <AuthButtons loggedIn={loggedIn}
        handleLogin={handleLogin}
        handleLogout={handleLogout} />
    }
  </div>
};
export default connect(
  mapStateToProps,
  {handleLogout, handleLogin}
)(SimpleAppBody);
