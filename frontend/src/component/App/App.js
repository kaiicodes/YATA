import "./App.css";
import React from "react";
import Button from "../Button/Button";
import Todo from "../Todo/Todo";
import getAllTodos from "../../api/todos";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
    };
  }

  componentDidMount() {
    getAllTodos().then((res) => {
      const todos = res.data;
      this.setState({ todos });
      console.log(todos);
    });
  }

  render() {
    return (
      <div className="App">
        {this.state.todos.map((value, index) => {
          return <Todo key={index} value={value}/>;
        })}
      </div>
    );
    {
      /* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */
    }
  }
}
