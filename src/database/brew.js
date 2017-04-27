// @flow

import firebase from 'firebase'

type Brew = {
  name: string, // the name of the coffee
  time: string, // the amount of time it brewed for
  notes: string, // did you like it?
  rating: -10 | 0 | 10, // thumbs down / neutral / up
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
