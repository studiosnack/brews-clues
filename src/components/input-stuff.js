import React from 'react';


const FancyInput = (props) => {
  return (
  	<label className="input-label"> {props.label} 
  	<input name={props.name} type="text" />
  	</label> )
}

// const FancyDropdown = (props)


export default FancyInput;