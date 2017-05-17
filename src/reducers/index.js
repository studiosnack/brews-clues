// @flow

import {combineReducers} from 'redux';

import auth from './auth';
import coffee from './coffee';


export default combineReducers({
  auth,
  coffee,
});

