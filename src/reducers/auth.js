// @flow

import type {Action} from '../actions/types';
import type {FirebaseUser, TwitterCredentials} from '../actions/auth';

type AuthState = {
  status: 'mystery' | 'logging in' | 'logged in' | 'logged out' | 'approved' | 'failed',
  user?: FirebaseUser,
  errors?: any, // TODO(marcos): fill this in once you know the shape,
  credential?: TwitterCredentials,
  provider?: 'twitter',
};

const defaultState = {
  status: 'mystery',
};

export default (state: AuthState = defaultState, action: Action) => {
  // TODO(marcos): fill these in
  switch(action.type) {
    case 'ATTEMPT_LOGIN':
      return {status: 'logging in', provider: action.meta.method};

    case 'AUTH_SUCCESS':
      const {user, credential} = action.payload;
      return {...state, errors: undefined, status: 'approved', user, credential};

    case 'AUTH_EXISTING':
      return {...state, status: 'logged in', user: action.payload}

    case 'LOGGED_OUT':
      return {status: 'logged out'};

    case 'AUTH_MYSTERY':
      return {...state, status: 'mystery'};

    case 'LOGIN_FAILURE':
      return {...state, status: 'failed', errors: action.errors}

    default:
      return state;
  }
}
