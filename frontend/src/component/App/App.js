import "./App.css";
import React from "react";
import _ from "lodash";
import Todo from "../Todo/Todo";
import { getAllTodos, deleteTodo } from "../../api/todos";
import "bulma/css/bulma.min.css";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
    };
    this.onDeleteTodo = this.onDeleteTodo.bind(this);
  }

  componentDidMount() {
    getAllTodos().then((res) => {
      const todos = res.data;
      this.setState({ todos });
    });
  }

  onDeleteTodo(todoID) {
    deleteTodo(todoID)
      .then((res) => {
        const updateTodos = this.state.todos;
        _.remove(updateTodos, (todo) => {
          return todo.id === todoID;
        });
        this.setState({ todos: updateTodos });
      })
      .catch((err) => console.log(err));
  }

  render() {
    return (
      <div className="App">
        <div className="columns">
          <div className="column is-half is-offset-one-quarter">
            {this.state.todos.map((todo, index) => {
              return (
                <Todo
                  key={index}
                  todo={todo}
                  onDeleteTodo={this.onDeleteTodo}
                />
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}
