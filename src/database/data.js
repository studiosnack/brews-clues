// @flow

import React from 'react';

import firebase from 'firebase';

// this is a type that firebase exposes, for our purposes
// we only care about val() and key. there are more listed here:
// https://firebase.google.com/docs/reference/node/firebase.database.DataSnapshot
type DataSnapshot<T> = {
  val: () => T,
  key: string,
  ref: string,
};

type Props = {
  // the path in the db we are querying.
  location: string,
  // a callback to be executed for each snapshot added.
  // When this gets called the first time, it executes with _all_
  // the data at the location we asked for, so at some point we
  // would want to maybe filter this, but for now it's ok to just
  // get all of them.
  onChildAdded?: (snapshot: DataSnapshot<*>) => mixed,
  // Same diff with a child removed, it gives you the snapshot of
  // the data when it was removed. mostly this would be useful for
  // getting the key because then we could remove it from our redux
  // store.
  onChildRemoved?: (snapshot: DataSnapshot<*>) => mixed,
  onChildChanged?: (snapshot: DataSnapshot<*>) => mixed,
};

export default class DataConnection extends React.Component {
  props: Props;

  // Keep a firebase.reference to the db location as a class property.
  // Why as a class property and not as state? because every time you
  // change state, render gets called again. I haven't tried putting
  // this in state, i suspect it might cause problems unless we also
  // implemented `componentShouldUpdate`
  dbRef = null;

  componentWillMount() {
    this.startConnection();
  }

  // Part of what's neat about react is that you don't need to use it
  // to render web components. Here, i'm using it as a way to abstract
  // the data-gathering for the app.
  render() {
    // don't render anything: because the component is only responsible
    // for adding event handlers to the database.
    return null;
  }

  componentWillUpdate(nextProps: Props) {
    // If for some reason the database location is changed
    // then the component will update and we should nuke the
    // existing database connection
    if (nextProps.location !== this.props.location) {
      this.endConnection();
      this.startConnection();
    }
  }

  startConnection = () => {
    const {location, onChildRemoved, onChildAdded, onChildChanged} = this.props;
    this.dbRef = firebase.database().ref(location);

    if (onChildAdded) {
      this.dbRef.on('child_added', onChildAdded);
    }
    if (onChildRemoved) {
      this.dbRef.on('child_removed', onChildRemoved);
    }
    if (onChildChanged) {
      this.dbRef.on('child_changed', onChildChanged);
    }
  };

  endConnection = () => {
    // if a connection to firebase exists when the component
    // unmounts, stop listening for database changes by calling
    // .off() on the ref.
    if (this.dbRef != null) {
      this.dbRef.off();
      this.dbRef = null;
    }
  };

  componentWillUnmount() {
    this.endConnection();
  }
}
