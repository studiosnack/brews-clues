// @flow

import type {Action} from '../actions/types';
import type {Brew} from '../database/brew';


type BrewState = {[key: string]: Brew};


export default (state: BrewState = {}, action: Action) => {

  switch(action.type) {
    case 'RECEIVE_BREW':
      return {...state, [action.meta.id]: action.payload};
    case 'UPDATE_BREW':
      const updatedBrew = {...state[action.meta.id], ...action.payload};
      return {...state, [action.meta.id]: updatedCoffee}
    case 'DELETE_BREW':
      const {[action.meta.id]: unused, ...restOfState} = state; 
      return restOfState;
    default:
      return state;
  }
}
