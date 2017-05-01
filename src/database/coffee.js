// @flow

import firebase from 'firebase';

type Coffee = {
  // I guess this is what you would call the coffee
  // although names can be funny things...
  // If left out, this will be generated (if possible)
  // as `${origin} ${varietal.join(' ')} (${roaster})`
  // otherwise it'll just be "coffee bought on DATE"
  // or "coffee roasted on DATE" etc. At _my_ current place,
  // they don't have names, they just do origin/varietal pairs
  // but many other places name their coffees.
  name: ?string,

  // THINGS ABOUT THE SPECIFIC BAG COFFEE
  // who roasted this
  roaster: ?string,
  // when do they claim it was roasted
  dateRoasted: ?string,
  // when did you buy this?
  datePurchased: ?string,
  // how much did this cost? 20.99 => 2099
  price: ?number,
  // have you finished this?
  done: boolean,
  // how much did you buy? 250g, 12oz, 1lb
  quantity: string,

  // THINGS ABOUT THE COFFEE, GENERALLY
  // This is generally a country
  origin: ?string,
  // i.e. red bourbon, caturra, typica, etc.
  varietal: string[],
  // tasting notes: fig, sunset, that cafe in paris, jean luc!
  tastingNotes: string[],
  // generic tags: process, ethics, etc
  tags: string[],

  // YOUR OWN FEELINGS
  // ARE VALID AND IMPORTANT!!
  // do you have random thoughts about the coffee now?
  notes: ?string,
  // did you take a photo of this coffee for some reason?
  photoURLs: string[],
};

export const addCoffee = (userid: string, coffee: Coffee) => {
  const db = firebase.database();

  // get a ref to all the coffees we have bought
  const coffeeList = db.ref(`/coffees/${userid}`);

  // a stub referencing this coffee we are about to add to the db
  const bagOfCoffee = coffeeList.push();

  // this ... spreads the objcet and allows us to add
  // dateCreated as a new property on the coffee object
  bagOfCoffee.set({
    ...coffee,

    dateCreated: firebase.database.ServerValue.TIMESTAMP,
  })
}
