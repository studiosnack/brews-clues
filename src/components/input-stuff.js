import React from 'react';
import moment from 'moment';


var testEquip = ["Chemex", "Clever", "French Press"];

const FancyInput = (props) => {
  return (
 	    <label className="input-label"> {props.label} 
      <input name={props.name} type="text" />
      </label> 
  )
}

const FancyDropdown = (props) => {
  return (
    <div>
      <label className="input-label"> {props.label}
      <select name={props.name}>
        {props.options.map(equip => <option>{equip}</option>)}
      </select>
      </label>
    </div>)
}


const FancyButton = (props) => {
  return (
    <button name={props.name} type="submit" onClick={evt => console.log("")}>
      Submit
    </button>
    )
}

const FancyForm = () => {

  // So I started out trying to make this generalizable, a FancyForm that can be 
  // used in other places. But now I've noticed that I'm making it very specific to
  /// just adding a brew. Should I be handling this submit in BrewInput instead?

  function isValidJSON(formdata) {
    let isValid = true;
    try {
      JSON.parse(formdata)
    } catch (e) {
      if (e instanceof SyntaxError) {
        isValid = false;
      }
    }
    return isValid;
  }

  function handleSubmit(event) {
    event.preventDefault();
    /// coffeeRef, dateCreated [set to now?],
    // notes, rating, waterBrewAmount, waterSoakAmount
    const newBrew = {};
    timeNow = moment();

    newBrew['brewMethod'] = event.target.brewMethod.value;
    newBrew['coffeeAmount'] = event.target.amount.value;
    newBrew['brewDate'] = event.target.brewDate.value;
    newBrew['grindSetting'] = event.target.grindSetting.value;
    newBrew['name'] = event.target.name.value;
    newBrew['brewTime'] = event.target.time.value;
    newBrew['dateCreated'] = timeNow.unix;
    console.log(isValidJSON(newBrew));
  }

  return (
    <form onSubmit={handleSubmit}>
      <FancyInput label="Coffee Name" name="name" />
      <FancyDropdown label="Brew Method " name="brewMethod" options={testEquip} />
      <FancyInput label="Brew Date" name="brewDate" />
      <FancyInput label="Time " name="time" />
      <FancyInput label="Amount (g) " name="amount" /> 
      <FancyInput label="Grind Setting " name="grindSetting" />
      <FancyInput label="Notes " name="notes" /> 
      <FancyButton name="brewButton" />
    </form>
  )
}

const BrewInput = () => {
  return (
	<div className="brew-input">
    <FancyForm />
	</div>)
}

export default BrewInput;
