// @flow

import React from 'react';
import connect from 'react-redux';


type LoginButtonProps = {
  onClick: () => void; // although the handler gets an Event as its first arg
                       // we don't use it, so we don't include it in the
                       // onClick annotation
  provider: 'twitter',
};

export const LoginButton = ({onClick, provider}: LoginButtonProps) => (
  <button onClick={onClick}>
    login with {provider}
  </button>
);


type LogoutButtonProps = {
  onClick: () => void,
};

export const LogoutButton = ({onClick}: LogoutButtonProps) => (
  <button onClick={onClick}>Logout</button>
)


type AuthButtonProps = {
  handleLogin: (method: string) => void,
  handleLogout: () => void,
  loggedIn: boolean,
};
export const AuthButtons = ({loggedIn, handleLogout, handleLogin}: AuthButtonProps) => {
  return loggedIn
    ? <LogoutButton onClick={handleLogout} />
    : <LoginButton provider="twitter" onClick={() => handleLogin('twitter')} />;
}
