import React from 'react';
import {connect} from 'react-redux';

import {addBrew} from '../database/brew';
import {FancyInput, FancyDropdown, FancyButton} from './input-stuff.js'


var testEquip = ["Chemex", "Clever", "French Press"];
// Eventually this would be stored elsewhere, yes?


const FirstPanel = (props) => {
  return (
    <div>
      <FancyInput label="Coffee Name " name="name" handleChange={props.handleChange}
        value={props.name}/>
      <FancyDropdown label="Brew Method " name="brewMethod" handleChange={props.handleChange}
        options={testEquip}
        />
      <FancyInput label="Brew Date" name="brewDate" handleChange={props.handleChange}
        value={props.brewDate} />
    </div>
  )
  ///option to set to today
}

const SecondPanel = (props) => {
  return (
    <div>
      <FancyInput label="Brew Time " name="time" handleChange={props.handleChange}
        value={props.brewTime} />
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
      <FancyButton name="brewButton" handleSubmit={props.handleSubmit}/>
    </div>
 )
}

class FancyCarouselForm extends React.Component {
  constructor (props){
    super(props);
    this.state = {page:1}
  }

  handleChange = (evt) => this.setState({[evt.target.name]: evt.target.value});

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

    if (this.props.userid) {
      console.log("adding");
      addBrew(this.props.userid, newBrew);
    }
  }

  goTo = (pageNumber) => {
    this.setState({
      page: pageNumber
    });
  }

render() {

  return <div className="brew-input">
    { this.state.page === 1 && <FirstPanel handleChange={this.handleChange}
      name={this.state.name} brewDate={this.state.brewDate}/>}
    { this.state.page === 2 && <SecondPanel handleChange={this.handleChange}
      brewTime={this.state.time} amount={this.state.amount}
      grindSetting={this.state.grindSetting} />}
    { this.state.page === 3 && <ThirdPanel handleChange={this.handleChange}
      handleSubmit={this.handleSubmit} notes={this.state.notes} />}


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
  })
)(FancyCarouselForm)

export default FancierCarouselBrewForm;
