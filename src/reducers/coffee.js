// @flow

import type {Action} from '../actions/types';
import type {Coffee} from '../database/coffee';


// we store our coffee state much like firebase stores it:
// an object with keys that map to coffee objects.
type CoffeeState = {[key: string]: Coffee};


export default (state: CoffeeState = {}, action: Action) => {

  switch(action.type) {
    case 'RECEIVE_COFFEE':
      return {...state, [action.meta.id]: action.payload};
    case 'UPDATE_COFFEE':
      const updatedCoffee = {...state[action.meta.id], ...action.payload};
      return {...state, [action.meta.id]: updatedCoffee}
    case 'DELETE_COFFEE':
      const {[action.meta.id]: unused, ...restOfState} = state;
      return restOfState;
    default:
      return state;
  }
}
