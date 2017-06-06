import React from 'react';
import DayPickerInput from "react-day-picker/DayPickerInput";

import "react-day-picker/lib/style.css"



class FancyDatePicker extends React.Component {
  handleDayChange = day => {
    this.setState({
      brewDate: day
    })
  }

  render() {
    return (
      <form>
        <DayPickerInput
          name="brewDate"
          placeholder="DD/MM/YYYY"
          format="DD/MM/YYYY"
          onDayChange={ this.handleDayChange }
          dayPickerProps={{
            enableOutsideDays: true,
          }}
        />
      </form>
    )
  }
}

export default FancyDatePicker;