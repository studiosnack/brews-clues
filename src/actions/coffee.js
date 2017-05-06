// @flow

import type {Coffee} from '../database/coffee';

// coffee actions
//
// for now these just gobble up the whole Coffee object rather than
// being more lean about the data it uses.

// because firebase doesn't attach the key that push() generates
// to the coffee object, we need to add the id separately.
export const receiveCoffee = (payload: Coffee, id: string) => ({
  type: 'RECEIVE_COFFEE',
  payload,
  meta: {
    id,
  },
});

export const updateCoffee = (payload: Coffee, id: string) => ({
  type: 'UPDATE_COFFEE',
  payload,
  meta: {
    id,
  },
});

// for delete, since we don't need any of the actual item data
// we can call delete with just the id
export const deleteCoffee = (id: string) => ({
  type: 'DELETE_COFFEE',
  meta: {
    id,
  },
});
