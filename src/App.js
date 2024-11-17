import logo from './logo.svg';
import './App.css';
import React, {Component} from 'react';

class App extends Component {

  constructor () {
    super()

    this.state = {
      isClicked: false,
      inputValue: "",
      listOfTodos: []
    }
  }

  handleChange = (event) => {
    this.setState({inputValue: event.target.value})
  }

  handleClick = (event) => {
    event.preventDefault(); // Prevent default form submission behavior.
  
    // Only add non-empty inputValue to the listOfTodos.
    if (this.state.inputValue.trim() !== "") {  // needed because when you delete a todo, the form is submitted, which would otherwise add an empty string (input is empty) to your listOfTodos
      this.setState((prevState) => ({
        listOfTodos: [...prevState.listOfTodos, prevState.inputValue],
        inputValue: "", // Clear the input after submission.
      }));
    } else {
      console.log("Input value is empty, not adding to the list.");
    }
  
    // Toggle `isClicked` state.
    this.setState((prevState) => ({
      isClicked: !prevState.isClicked,
    }));
  };
  

  handleDelete = (index) => {
    const objectCopy = [...this.state.listOfTodos]
    objectCopy.splice(index, 1)
    this.setState({listOfTodos: objectCopy})
  }

  render () {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <form onSubmit={this.handleClick}>
            <input
              type="text"
              value={this.state.inputValue}
              onChange={this.handleChange}
            ></input>
            <button type="submit">Submit form!</button>
            <ol>
              {this.state.listOfTodos.map((todo, index) => (
                <>
                  <li key={index}>{todo}</li>
                  <button
                    key={`button-${index}`}
                    onClick={() => this.handleDelete(index)}
                  >
                    Delete me!
                  </button>
                </>
              ))}
            </ol>
          </form>
          <p>
            {this.state.isClicked ? "true" : "false"}
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    )
  }
}

export default App;


{/* Using `value={this.state.inputValue}`: 
    Setting input value (i.e. what's in the textbox you see) equal to the state's inputValue makes the component a CONTROLLED component.
    Controlled component: React sets the input value, not the browser (DOM default behavior). Input field is controlled by React's state (i.e. React will manage what the input displays, not the browser).
    Uncontrolled component: Browser (DOM default behavior) sets the input value (regular HTML input), not React. Input field is not controlled by React's state. 
    
    In both cases:
    - The input changes as the user types (i.e. input value changes)
    - State changes when you update the input (due to handleChange method). 

    Implication of controlled components:
    - Whenever the state updates (due to typing in the input), React will re-render and update the value of the input to match this.state.inputValue.
    - This way, you can always access the current value of the input from this.state.inputValue and manipulate it as needed.
    - If you want more control over the input value, like validating or manipulating it (e.g., disabling the input based on certain conditions, formatting the text as the user types, etc.), use a controlled component.
    
    Implication of uncontrolled components:
    - The browser controls the input, and React just listens to the changes (via onChange) and updates the state.
*/}