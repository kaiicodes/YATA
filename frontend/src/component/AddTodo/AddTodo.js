import React from "react";

export default class Todo extends React.Component {
  constructor(props) {
    super(props);
    this.state = { text: "" };

    this.handleTextChange = this.handleTextChange.bind(this);
    this.addTodo = this.addTodo.bind(this);
  }

  handleTextChange(event) {
    this.setState({ text: event.target.value });
  }

  addTodo() {
    const todo = {
      text: this.state.text,
      is_done: false,
      user: 1,
    };
    this.props.onAddTodo(todo);
    this.setState({ text: "" });
  }

  render() {
    return (
      <div className="box">
        <div className="columns is-vcentered">
          <div className="column is-offset-2 is-flex">
            <input
              className="input"
              type="text"
              value={this.state.text}
              placeholder="Gotta do something...?"
              onChange={this.handleTextChange}
            />
          </div>
          <div className="column is-4">
            <button className="button" onClick={this.addTodo}>
              Add
            </button>
          </div>
        </div>
      </div>
    );
  }
}
