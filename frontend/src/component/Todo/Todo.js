import React from "react";
import { updateTodo } from "../../api/todos";

export default class Todo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
      text: this.props.todo.text,
    };

    this.toggleEdit = this.toggleEdit.bind(this);
    this.cancelEdit = this.cancelEdit.bind(this);
    this.applyEdit = this.applyEdit.bind(this);
    this.deleteTodo = this.deleteTodo.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
  }

  handleTextChange(event) {
    this.setState({ text: event.target.value });
  }

  toggleEdit() {
    this.setState((prevState) => ({ isEditing: !prevState.isEditing }));
  }

  showEditingBox() {
    return (
      <input
        className="input"
        type="text"
        defaultValue={this.state.text}
        onChange={this.handleTextChange}
      />
    );
  }

  showText() {
    return this.props.todo.text;
  }

  applyEdit() {
    const payload = this.props.todo;
    payload.text = this.state.text;
    updateTodo(payload);
    this.toggleEdit();
  }

  cancelEdit() {
    this.setState({ text: this.props.todo.text });
    this.toggleEdit();
  }

  deleteTodo() {
    this.props.onDeleteTodo(this.props.todo.id);
  }

  showEditCancelButton() {
    return (
      <>
        <button className="button is-info is-light" onClick={this.toggleEdit}>
          Edit
        </button>
        <button className="button is-danger is-light" onClick={this.deleteTodo}>
          Delete
        </button>
      </>
    );
  }

  showApplyDeleteButton() {
    return (
      <>
        <button className="button is-info is-light" onClick={this.applyEdit}>
          Apply
        </button>
        <button className="button is-danger is-light" onClick={this.cancelEdit}>
          Cancel
        </button>
      </>
    );
  }

  render() {
    const isEditing = this.state.isEditing;

    return (
      <div className="box">
        <div className="columns is-vcentered">
          <div className="column is-2">
            <label className="checkbox">
              <input type="checkbox" />
            </label>
          </div>
          <div className="column is-flex">
            {isEditing ? this.showEditingBox() : this.showText()}
          </div>
          <div className="column is-4 is-flex is-justify-content-space-evenly">
            {isEditing
              ? this.showApplyDeleteButton()
              : this.showEditCancelButton()}
          </div>
        </div>
      </div>
    );
  }
}
