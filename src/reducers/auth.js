// @flow

import type {Action} from '../actions/types';

type AuthState = {
  status: 'mystery' | 'logging in' | 'logged in' | 'logged out' | 'failed',
  user?: {}, // TODO(marcos): fill this in once you know the shape,
  errors?: {}
};

const defaultState = {
  status: 'mystery',
};

export default (state: AuthState = defaultState, action: Action) => {
  // TODO(marcos): fill these in
  switch(action.type) {
    case 'ATTEMPT_LOGIN':
    case 'LOGGED_IN':
    case 'AUTH_MYSTERY':
    case 'LOGIN_FAILURE':
    case 'LOGGED_OUT':
      return state;
  }
  return state;
}
