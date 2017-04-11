// @flow

import type {Action} from '../actions/types';

type AuthState = {
  state: 'mystery' | 'logged in' | 'logged out' | 'login failed',
  user?: {}, // TODO(marcos): fill this in once you know the shape,
  errors?: {}
};

const defaultState = {
  state: 'mystery',
};

export default (state: AuthState = defaultState, action: Action) => {
  // TODO(marcos): fill these in
  switch(action.type) {
    case 'AUTH_MYSTERY':
    case 'ATTEMPT_LOGIN':
    case 'LOGGED_IN':
    case 'LOGIN_FAILURE':
    case 'LOGGED_OUT':
      return state;
  }
  return state;
}
