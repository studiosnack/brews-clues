import React from 'react';
import {connect} from 'react-redux';

import {addBrew} from '../database/brew';
import {FancyInput, FancyDropdown, FancyButton} from './input-stuff.js'


var testEquip = ["Chemex", "Clever", "French Press"];
// Eventually this would be stored elsewhere, yes?


const FirstPanel = () => {
  return (
    <div>
      <FancyInput label="Coffee Name " name="name" handleChange={this.handleChange}/>
      <FancyDropdown label="Brew Method " name="brewMethod" options={testEquip}
        handleChange={this.handleChange}/>
      <FancyInput label="Brew Date" name="brewDate" handleChange={this.handleChange} />
    </div>
  )
}

const SecondPanel = () => {
  return (
    <div>
      <FancyInput label="Brew Time " name="time" />
      <FancyInput label="Amount (g) " name="amount" />
      <FancyInput label="Grind Setting " name="grindSetting" />
      <FancyInput label="Notes " name="notes" />
      <FancyButton name="brewButton" />
    </div>
 )
}

const ThirdPanel = (props) => {
  return <div> Component 3 </div>
}


class FancyCarouselForm extends React.Component {
  constructor (props){
    super(props);
    this.state = {page:1}
    //do I have to intialiaze form data? keep it separate?
  }

  ///handleChange = (evt) => this.setState({name: evt.target.value});
  handleChange = (evt) => console.log(name + evt.target.value);

  handleSubmit(event) {

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

    //if (props.userid) {
    //  console.log("adding");
    //  addBrew(props.userid, newBrew);
    //}
  }

  goTo = (pageNumber) => {
    console.log("before " + this.state.page);
    this.setState({
      page: pageNumber
    });
    console.log("after " + this.state.page);
  }

//  updateName = (evt) => this.setState({name: evt.target.value});
// <PageOneForm handleAChange={this.updateName} />


render() {

  return <div className="brew-input">
    { this.state.page === 1 && <FirstPanel />}
    { this.state.page === 2 && <SecondPanel />}
    { this.state.page === 3 && <ThirdPanel />}


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
