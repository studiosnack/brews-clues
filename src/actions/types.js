// @flow

import type {FirebaseUser, AuthPayload} from '../actions/auth';

// This is the generic action type: all actions (by convention) have this
// kind of object shape. The only field that is "required" is the type one.
export type GenericAction = {
  type: string,
  payload?: any,
  meta?: any,
  errors?: any
};

// we will actually never use that more generic type in practice unless we
// have some weird code that is otherwise untypable. instead, we will use a
// more specific Union type like this

export type Action = | {type: 'AUTH_MYSTERY'}
 | {type: 'ATTEMPT_LOGIN', meta: {method: 'twitter' | 'foursquare'}}
 | {type: 'AUTH_SUCCESS', payload: AuthPayload}
 | {type: 'AUTH_EXISTING', payload: FirebaseUser}
 | {type: 'AUTH_FAILURE', errors: any}
 | {type: 'LOGGED_OUT'}
 | {type: 'LOGIN_FAILURE', errors: any};

// anyhow, for now we don't have any actions (yet!) but we will!! and that is how we
// will type them for our reducers
