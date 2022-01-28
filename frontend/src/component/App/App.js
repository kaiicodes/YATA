import "./App.css";
import React from "react";
import _ from "lodash";
import Todo from "../Todo/Todo";
import AddTodo from "../AddTodo/AddTodo";
import { getAllTodos, deleteTodo, createTodo } from "../../api/todos";
import "bulma/css/bulma.min.css";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
    };
    this.onDeleteTodo = this.onDeleteTodo.bind(this);
    this.onAddTodo = this.onAddTodo.bind(this);
  }

  componentDidMount() {
    getAllTodos().then((res) => {
      const todos = res.data;
      this.setState({ todos });
    });
  }

  onAddTodo(todo) {
    createTodo(todo).then((res) => {
      const updateTodos = this.state.todos;
      updateTodos.push(res.data);
      this.setState({ todos: updateTodos });
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
            <AddTodo onAddTodo={this.onAddTodo} />
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
