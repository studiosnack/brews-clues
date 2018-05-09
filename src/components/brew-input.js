import React from 'react';
import {connect} from 'react-redux';
import moment from 'moment';

import {addBrew} from '../database/brew';
import {FancyInput, FancyDropdown, FancyButton, FancyDayPickerInput} from './input-stuff.js';


var testEquip = ["Chemex", "Clever", "French Press"];

const FirstPanel = (props) => {
  return (
    <div>
      <FancyDayPickerInput
          label="Brew Date "
          name="brewDate"
          placeholder={props.brewDate}
          onDayChange={props.handleDayChange}
        />
      <FancyDropdown label="Brew Method " name="brewMethod" handleChange={props.handleChange}
        options={testEquip}/>
      <FancyInput label="Brew Time " name="time" handleChange={props.handleChange}
        value={props.brewTime} />
    </div>
  )
}

const SecondPanel = (props) => {
  return (
    <div>
      <FancyDropdown label="Coffee Name " name="name" handleChange={props.handleChange}
        options={props.name}/>
      <FancyInput label="Amount (g) " name="amount" handleChange={props.handleChange}
        value={props.amount} />
      <FancyInput label="Grind Setting " name="grindSetting" handleChange={props.handleChange}
        value={props.grindSetting} />
    </div>
 )
}

const ThirdPanel = (props) => {
  return (
    <div>
      <FancyInput label="Notes " name="notes" handleChange={props.handleChange}
        value={props.notes} />
      <FancyButton name="brewButton" handleSubmit={props.handleSubmit} buttonText="Add Brew"/>
    </div>
 )
}


class FancyCarouselForm extends React.Component {
  constructor (props){
    super(props);
    this.state = {
      page:1,
      name: '',
      brewMethod: '',
      coffeeAmount: '',
      brewDate: '',
      grindSetting: '',
      brewTime: '',
      notes: '',
    }
  }

  handleChange = evt => {
    this.setState({[evt.target.name]: evt.target.value})
  }

  handleDayChange = day => {
    console.log('day ', day);
    this.setState({brewDate: moment(day).format("M/D/Y")});
  }

  setDateToday = () => {
    this.setState({brewDate: moment().format("M/D/Y")});
    //this.handleDayChange(today);
  };

  handleSubmit = (event) => {
    console.log("submit fired");

    event.preventDefault();

    /// still missing: coffeeRef, rating, waterBrewAmount, waterSoakAmount

    const timeNow = new Date();

    const newBrew = { 
      dateCreated: timeNow.getTime(), // required
      // coffeeUsed: this.state.coffeeUsed, //required, should be from the coffees on our shelf?
      brewMethod: this.state.brewMethod,
      coffeeAmount: this.state.amount,
      brewDate: this.state.brewDate,
      grindSetting: this.state.grindSetting,
      name: this.state.name,
      brewTime: this.state.time,
      notes: this.state.notes
    };

    console.log(newBrew);

    if (this.props.userid) { // if you aren't logged in, you can't add
      console.log("adding");
      addBrew(this.props.userid, newBrew);
    }
  } // end of handleSubmit

  goTo = (pageNumber) => {
    this.setState({
      page: pageNumber
    });
  }

render() {
  const coffeeName = this.props.coffee.map(a => a.roaster)
  // TODO: this needs to be linked up with the coffee id, so the db knows which coffee bag 
  // we are dipping into

  return <div className="brew-input">
    { this.state.page === 1 &&
      <FirstPanel
        handleChange={this.handleChange}
        brewDate={this.state.brewDate}
        brewTime={this.state.time}
        setDateToday={this.setDateToday}
        handleDayChange={this.handleDayChange} 
      />}
    { this.state.page === 2 &&
      <SecondPanel
        handleChange={this.handleChange}
        name={coffeeName}
        amount={this.state.amount}
        grindSetting={this.state.grindSetting}
      />}
    { this.state.page === 3 &&
      <ThirdPanel
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
        notes={this.state.notes} 
    />}


    {this.state.page > 1 &&
      <button className="carousel-btn" onClick={()=>this.goTo(this.state.page-1)}>
        <span> Prev </span>
      </button> }

    {this.state.page < 3 &&
      <button className="carousel-btn" onClick={()=>this.goTo(this.state.page+1)}>
        <span> Next </span>
      </button> }
  </div>
}

}


const FancierCarouselBrewForm = connect(
  state => ({
    userid: state.auth && state.auth.user && state.auth.user.uid,
    coffee: Object.keys(state.coffee).map(key => state.coffee[key]),
  })
)(FancyCarouselForm)

export default FancierCarouselBrewForm;
