import React from 'react';
import {connect} from 'react-redux';

import {addBrew} from '../database/brew';
import {FancyInput, FancyDropdown, FancyButton} from './input-stuff.js'


var testEquip = ["Chemex", "Clever", "French Press"];
// Eventually this would be stored elsewhere, yes?


const FirstPanel = (props) => {
  return (
    <div>
      <FancyInput label="Coffee Name " name="name" handleChange={props.handleChange}/>
      <FancyDropdown label="Brew Method " name="brewMethod" options={testEquip}
        handleChange={props.handleChange}/>
      <FancyInput label="Brew Date" name="brewDate" handleChange={props.handleChange} />
    </div>
  )
  ///option to set to today
}

const SecondPanel = (props) => {
  return (
    <div>
      <FancyInput label="Brew Time " name="time" handleChange={props.handleChange}/>
      <FancyInput label="Amount (g) " name="amount" handleChange={props.handleChange}/>
      <FancyInput label="Grind Setting " name="grindSetting" handleChange={props.handleChange}/>
    </div>
 )
}

const ThirdPanel = (props) => {
  return (
    <div>
      <FancyInput label="Notes " name="notes" handleChange={props.handleChange}/>
      <FancyButton name="brewButton" handleSubmit={props.handleSubmit}/>
    </div>
 )
}

class FancyCarouselForm extends React.Component {
  constructor (props){
    super(props);
    this.state = {page:1}
    ///do I have to intialize form data? keep it separate?
  }

  handleChange = (evt) => this.setState({[evt.target.name]: evt.target.value});
  ///handleChange = (evt) => console.log(evt.target.name + evt.target.value);

  handleSubmit = (event) => {
    console.log("submit fired");

    event.preventDefault();

    /// still missing: coffeeRef, rating, waterBrewAmount, waterSoakAmount

    const timeNow = new Date();

    const newBrew = {
      dateCreated: timeNow.getTime(),
      brewMethod: this.state.brewMethod,
      coffeeAmount: this.state.amount,
      brewDate: this.state.brewDate,
      grindSetting: this.state.grindSetting,
      name: this.state.name,
      brewTime: this.state.time,
      notes: this.state.notes
    };

    console.log(newBrew);

    if (props.userid) {
      console.log("adding");
      addBrew(props.userid, newBrew);
    }

  }

  goTo = (pageNumber) => {
    this.setState({
      page: pageNumber
    });
  }


render() {

  return <div className="brew-input">
    { this.state.page === 1 && <FirstPanel handleChange={this.handleChange}/>}
    { this.state.page === 2 && <SecondPanel handleChange={this.handleChange}/>}
    { this.state.page === 3 && <ThirdPanel handleChange={this.handleChange}
      handleSubmit={this.handleSubmit}/>}


    {this.state.page > 1 &&
      <button onClick={()=>this.goTo(this.state.page-1)}>
        <span> Prev </span>
      </button> }

    {this.state.page < 3 &&
      <button onClick={()=>this.goTo(this.state.page+1)}>
        <span> Next </span>
      </button> }
  </div>
  }

}


const FancierCarouselBrewForm = connect(
  state => ({
    userid: state.auth && state.auth.user && state.auth.user.uid,
  })
)(FancyCarouselForm)

export default FancierCarouselBrewForm;
