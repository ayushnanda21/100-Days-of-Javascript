//import logo from './logo.svg';
import './App.css';
import React, { Component } from 'react';
import Person from './Person/Person.js';


class App extends Component{
   state={
    persons : [
      { id: 'ergv', name: 'Max', age: 58},
      { id: '3rc', name: 'Manu', age: 29},
      { id: '42cac', name: 'Stephanie', age: 26}
    ],
    showPersons : false
  }

  //Event handler to manage switch
  // switchNameHandler = () => {
  //   //console.log('Was clicked')
  //   //Dont do this to change state this.state.persons[0].name = 'Maximillian'
  //   this.setState({
  //     persons : [
  //       { name: 'Max', age: 58},
  //       { name: 'Manu', age: 29},
  //       { name: 'Stephanie', age: 27 }
  //     ]
  //    })
  // }

  

  //on change Person.js // TWO_WAY BINDING
  nameChangedHandler = (event , id) =>{
    const personIndex  =this.state.persons.findIndex(p =>{
      return p.id === id;
    });

    const person  ={
      ...this.state.persons[personIndex]
    };

    person.name = event.target.value;

    const persons = [...this.state.persons];
    persons[personIndex]=  person;

    this.setState( { persons : persons} )
  }

  //method for rendering some content conditionally
  togglePersonsHandler = () =>{
      const doesShow = this.state.showPersons;
      this.setState({showPersons: !doesShow});
  }

  deletePersonHandler = (personIndex)=>{
    //const persons = this.state.persons.slice();
    const persons  = [...this.state.persons]  //spread operator
    persons.splice(personIndex , 1);
    this.setState({persons : persons })
  }

  render(){

    const style={
      backgroundColor : 'white',
      font: 'inherit',
      border: '1px solid blue',
      padding: '8px',
      cursor: 'pointer'
      
    };

    let persons = null; 
    if(this.state.showPersons){

      persons=(
       <div>

        {/* -----------Rendering lists dynamically, mapping js-arrays into js-arrays but as jsx-objects---------------- */}

        {this.state.persons.map( (person , index) =>{

          return <Person   
                          click={ ()=> this.deletePersonHandler(index)}
                          name={person.name}
                           age = {person.age}
                          
                           key ={person.id}
                           changed ={ (event)=> this.nameChangedHandler(event, person.id)}
                  />

        })}




        {/* -----------Tradtional method--------------------- */}
        {/* <Person 
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
         </Person> */}
        </div>  
      );
      }
    
  return (
    <div className="App">
      <h1> Hi, I'm a react Developer </h1>
      <button 
      style={style} 
      onClick={this.togglePersonsHandler}> Toogle Persons </button>
 
      {persons}
    </div>
  
  ); 
  }
}


export default App;



