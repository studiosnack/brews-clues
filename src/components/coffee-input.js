import React from 'react';
import {connect} from 'react-redux';

import {addCoffee} from '../database/coffee';
import {FancyInput, FancyButton} from './input-stuff.js'


const FancyForm = (props) => {

  function handleSubmit(event) {

    event.preventDefault();

    const timeNow = new Date();

    const newCoffee = {
      dateCreated: timeNow.getTime(),
      roaster: event.target.roaster.value,
      dateRoasted: event.target.dateRoasted.value,
      origin: event.target.origin.value,
      price: event.target.price.value,
      quantity: event.target.quantity.value,
      tags: event.target.tags.value.split(',').map(str => str.trim()),
      tastingNotes: event.target.notes.value.split(',').map(str => str.trim())
    };

    if (props.userid) {
      console.log("coffee added to database");
      addCoffee(props.userid, newCoffee);
    }
  }

  // is "done" something a person can select? Or is it calculated?
  return (
    <div className="brew-input">
    <form onSubmit={handleSubmit}>
      <FancyInput label="Roaster " name="roaster" />
      <FancyInput label="Date Roasted " name="dateRoasted" />
      <FancyInput label="Origin" name="origin" />
      <FancyInput label="Price " name="price" />
      <FancyInput label="Quantity " name="quantity" />
      <FancyInput label="Tags " name="tags" />
      <FancyInput label="Tasting Notes " name="tastingNotes" />
      <FancyButton name="coffeeButton " />
    </form>
    </div>
  )
}


const FancierCoffeeForm = connect(
  state => ({
    userid: state.auth && state.auth.user && state.auth.user.uid,
  })
)(FancyForm)


export default FancierCoffeeForm;
