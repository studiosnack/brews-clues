// @flow

import firebase from 'firebase'

type Brew = {
  brewMethod?: string, // how you made the coffee
  brewDate: string, // timestamp for brew
  coffeeAmount: string, // how much you used i.e. "20g"
  coffeeRef: string, // the id for a specific coffee
  notes?: string, // did you like it?
  rating: -10 | 0 | 10, // thumbs down / neutral / up (default neutral)
  name?: string, // the name of the coffee
  brewTime?: string, // the amount of time it brewed for
  waterSoakAmount?: string, // how much you soaked the grounds with
  waterBrewAmount?: string, // how much water you added to the wet grounds
  brewTime?: string, // how long, from soak to finish this took
};

export const addBrew = (userid: string, brew: Brew) => {
  const db = firebase.database();
  // assumption: we model all our brews as a list of
  // user-owned brews. That is, they're not public by
  // default also you can query a user's brews easily
  const brewList = db.ref(`/brews/${userid}`);

  // this in the firebase docs would be called something
  // like `freshBrewRef` (all the previous db related
  // vars would be called ____ref)
  const freshBrew =  brewList.push();

  // if `brew` as input is exhaustive, we could pass it
  // directly, but we'll also add in our own stuff here
  // like dateCreated and others. If we're happy with the
  // fieldnames in `brew` we can change the .set call to
  // look like ({...brew, ...misc}) where
  // misc = {dateCreated} and other fields
  freshBrew.set({
    ...brew,

    dateCreated: firebase.database.ServerValue.TIMESTAMP,
  })
}
