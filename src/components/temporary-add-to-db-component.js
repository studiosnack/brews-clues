// @flow

import React from 'react';
import {connect} from 'react-redux';

import {addBrew} from '../database/brew';
import {addCoffee} from '../database/coffee';

import './temporary-add-to-db-component.css';

class SimpleAddForm extends React.Component {
  props: {
    userid: string | false,
  }

  // Oh look, we're using state finally. Why here and why not in redux?
  //
  // The short answer: this is all temporary so i don't care to put it in
  // redux, but also you can see how state is usually used: as a way of
  // passing data around *temporarily* within a family of components.
  //
  // That is: state is totally ephemeral and only used within the context
  // of this debugging widget
  state = {
    rawdata: '',
    isValid: true,
  }

  render() {
    const {isValid} = this.state;

    return <form className={isValid ? 'valid-data' : 'invalid-data'}>
      <textarea
        className="fancy-textarea-for-temporary-debugging-only"
        name="rawdata" onChange={this.handleInputChange}
      />
      <div>
        <button disabled={!isValid} onClick={this.addRawBrew}>add as brew</button>
        <button disabled={!isValid} onClick={this.addRawCoffee}>add as coffee</button>
      </div>
    </form>;
  }

  addRawBrew = evt => {
    evt.preventDefault();
    if (this.props.userid) {
      addBrew(this.props.userid, JSON.parse(this.state.rawdata));
    }
  };
  addRawCoffee = evt => {
    evt.preventDefault();
    if (this.props.userid) {
      addCoffee(this.props.userid, JSON.parse(this.state.rawdata));
    }
  };

  handleInputChange = evt => {
    // lots of folks use target, but currentTarget is probably the
    // safer "in the long run" property of the event to inspect since
    // it points to the thing that was actually firing the event, and
    // that is generally the thing you want to snag a `value` off of.
    const ct = evt.currentTarget;
    // you'd normally write a handler like this that inspects `name`
    // when you had multiple inputs each with a different name set.
    // but in this case there's just the textarea. still, this makes
    // it easy to add another json textarea if needed (probably won't).
    const name = ct.name
    // the value of the textarea
    const val = ct.value;

    let isValid = true;
    // this is dumb, but if a block of json'y looking stuff
    // fails to JSON.parse, it is just bad json, so all the time
    // we just check to see if it throws this SyntaxError and
    // if _not_ then we know that it's valid json.
    //
    // Then, isValid enables the add coffee/brew buttons.
    try {
      JSON.parse(val)
    } catch (e) {
      if (e instanceof SyntaxError) {
        isValid = false;
      }
    }

    // in our case, `name` is (for now) always `rawdata` so this could
    // also be written
    // this.setState({
    //   rawdata: var,
    //   invalid
    // })
    // also, where did the : go after invalid? this is a shorthand where
    // {invalid} === {'invalid': invalid}
    this.setState({
      [name]: val,
      isValid
    });
  }
}

const AddForm = connect(
  state => ({
    userid: state.auth && state.auth.user && state.auth.user.uid,
  })
)(SimpleAddForm)

export default AddForm;
