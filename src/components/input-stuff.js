import React from 'react';
// import PropTypes from 'prop-types';
import DayPickerInput from 'react-day-picker/DayPickerInput';

import 'react-day-picker/lib/style.css';


const FancyInput = (props) => {
  return (
    <label className="input-label">
      {props.label}
      <input name={props.name} onChange={props.handleChange} value={props.value} type="text" />
    </label>
  );
};

const FancyDropdown = (props) => {
  return (
    <div>
      <label className="input-label">
        {props.label}
        <select name={props.name} onChange={props.handleChange}>
          {props.options.map(equip => (
            <option key={equip} value={equip}>
              {equip}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
};

const FancyButton = (props) => {
  return (
    <button name={props.name} type="submit" onClick={props.handleSubmit}>
      {props.buttonText}
    </button>
  );
};

const FancyDayPickerInput = (props) => {
  return (
    <label className="input-label"> {props.label}
      <DayPickerInput
        name={props.name}
        placeholder={props.brewDate}
        format="MM/DD/YYYY"
        onDayChange={props.handleDayChange}
        dayPickerProps={{
          enableOutsideDays: true,
        }}
      />
    </label>
  );
};

// FancyInput.propTypes = {
//   label: PropTypes.string,
//   name: PropTypes.string,
//   value: PropTypes.string,
//   handleChange: PropTypes.func,
// };

export {FancyInput, FancyDropdown, FancyButton, FancyDayPickerInput};
