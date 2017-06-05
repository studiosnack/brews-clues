import React from 'react';
import DayPickerInput from "react-day-picker/DayPickerInput";

import "react-day-picker/lib/style.css"

const FancyInput = (props) => {
  return (
    <label className="input-label"> {props.label}
      <input name={props.name} onChange={props.handleChange} value={props.value} type="text" />
    </label>
  )
}
///
const FancyDropdown = (props) => {
  return (
    <div>
      <label className="input-label"> {props.label}
      <select name={props.name} onChange={props.handleChange}>
        {props.options.map(equip => <option value={equip}>{equip}</option>)}
      </select>
      </label>
    </div>)
}

const FancyButton = (props) => {
  return (
    <button name={props.name} type="submit" onClick={props.handleSubmit}>
      {props.buttonText}
    </button>
    )
}

class FancyDatePicker extends React.Component {
  handleBirthdayChange = day => {
    this.setState({
      birthday: day
    })
  }

  render() {
    return (
      <form>
        <DayPickerInput
          name="birthday"
          placeholder="DD/MM/YYYY"
          format="DD/MM/YYYY"
          onDayChange={ this.handleBirthdayChange }
          dayPickerProps={{
            enableOutsideDays: true,
          }}
        />
      </form>
    )
  }
}


export {FancyInput, FancyDropdown, FancyButton, FancyDatePicker};
