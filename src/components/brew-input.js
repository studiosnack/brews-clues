import React from 'react';
import {connect} from 'react-redux';

import {addBrew} from '../database/brew';
import {FancyInput, FancyDropdown, FancyButton} from './input-stuff.js'


var testEquip = ["Chemex", "Clever", "French Press"];

const FancyForm = (props) => {

  function handleSubmit(event) {

    event.preventDefault();
    /// still missing: coffeeRef, rating, waterBrewAmount, waterSoakAmount

    const timeNow = new Date();

    const newBrew = {
      dateCreated: timeNow.getTime(),
      brewMethod: event.target.brewMethod.value,
      coffeeAmount: event.target.amount.value,
      brewDate: event.target.brewDate.value,
      grindSetting: event.target.grindSetting.value,
      name: event.target.name.value,
      brewTime: event.target.time.value,
      notes: event.target.notes.value
    };

    if (props.userid) {
      console.log("adding");
      addBrew(props.userid, newBrew);
    }
  }

  return (
    <div className="brew-input">
    <form onSubmit={handleSubmit}>
      <FancyInput label="Coffee Name" name="name" />
      <FancyDropdown label="Brew Method " name="brewMethod" options={testEquip} />
      <FancyInput label="Brew Date" name="brewDate" />
      <FancyInput label="Brew Time " name="time" />
      <FancyInput label="Amount (g) " name="amount" />
      <FancyInput label="Grind Setting " name="grindSetting" />
      <FancyInput label="Notes " name="notes" />
      <FancyButton name="brewButton" />
    </form>
    </div>
  )
}


const FancierBrewForm = connect(
  state => ({
    userid: state.auth && state.auth.user && state.auth.user.uid,
  })
)(FancyForm)

export default FancierBrewForm;
