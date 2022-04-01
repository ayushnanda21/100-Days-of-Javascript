//import logo from './logo.svg';
import './App.css';
import React, { Component } from 'react';
import Person from './Person/Person.js';


class App extends Component{
   state={
    persons : [
      { name: 'Max', age: 58},
      { name: 'Manu', age: 29},
      { name: 'Stephanie', age: 26}
    ],
    showPersons : false
  }

  //Event handler to manage switch
  switchNameHandler = () => {
    //console.log('Was clicked')
    //Dont do this to change state this.state.persons[0].name = 'Maximillian'
    this.setState({
      persons : [
        { name: 'Max', age: 58},
        { name: 'Manu', age: 29},
        { name: 'Stephanie', age: 27 }
      ]
     })
  }

  //on change Person.js // TWO_WAY BINDING
  nameChangedHandler = (event) =>{
    this.setState({
      persons : [
        { name: 'Max', age: 58},
        { name: event.target.value, age: 29},
        { name: 'Stephanie', age: 26 }
      ]
     })
  }

  //method for rendering some content conditionally
  togglePersonsHandler = () =>{
      const doesShow = this.state.showPersons;
      this.setState({showPersons: !doesShow});
  }


  render(){

    const style={
      backgroundColor : 'white',
      font: 'inherit',
      border: '1px solid blue',
      padding: '8px',
      cursor: 'pointer'
    };
  return (
    <div className="App">
      <h1> Hi, I'm a react Developer </h1>
      <button 
      style={style} 
      onClick={this.togglePersonsHandler}> Switch Name </button>
      
    {  this.state.showPersons ? 
     <div>
      <Person 
        name={this.state.persons[0].name} age={this.state.persons[0].age}>
      </Person> 
      <Person 
        name={this.state.persons[1].name} 
        age={this.state.persons[1].age}
        click ={this.switchNameHandler}
        changed={this.nameChangedHandler}>
      </Person>
      <Person 
        name={this.state.persons[2].name} age={this.state.persons[2].age}>
       </Person>
      </div>  

      : null }

    </div>
  ); 
  }
}


export default App;



