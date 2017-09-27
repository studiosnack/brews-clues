// @flow

import type {Brew} from '../database/brew';

// brew action
// so yes, this is just copying what actions/coffee.js is doing...

// Are there other things besides id that we need to add? 


export const receiveBrew = (payload: Brew, id: string) => ({
  type: 'RECEIVE_BREW',
  payload,
  meta: {
    id,
  },
});

export const updateBrew = (payload: Brew, id: string) => ({
  type: 'UPDATE_BREW',
  payload,
  meta: {
    id,
  },
});

// for delete, since we don't need any of the actual item data
// we can call delete with just the id
export const deleteBrew = (id: string) => ({
  type: 'DELETE_BREW',
  meta: {
    id,
  },
});
