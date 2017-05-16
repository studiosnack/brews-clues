import React from 'react';


const FancyInput = (props) => {
  return (
    <label className="input-label"> {props.label}
      <input name={props.name} onChange={props.handleChange} type="text" />
    </label>
  )
}
///
const FancyDropdown = (props) => {
  return (
    <div>
      <label className="input-label"> {props.label}
      <select name={props.name} onChange={props.handleChange}>
        {props.options.map(equip => <option>{equip}</option>)}
      </select>
      </label>
    </div>)
}

const FancyButton = (props) => {
  return (
    <button name={props.name} type="submit" onClick={props.handleSubmit}>
      Submit
    </button>
    )
}

export {FancyInput, FancyDropdown, FancyButton};
