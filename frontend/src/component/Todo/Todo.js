import React from "react";
import { updateTodo } from "../../api/todos";

export default class Todo extends React.Component {
  constructor(props) {
    super(props);
    console.log(props.todo);
    this.state = {
      isEditing: false,
      text: this.props.todo.text,
      isDone: this.props.todo.is_done,
    };

    this.toggleEdit = this.toggleEdit.bind(this);
    this.cancelEdit = this.cancelEdit.bind(this);
    this.applyEdit = this.applyEdit.bind(this);
    this.deleteTodo = this.deleteTodo.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const name = target.name;
    const type = target.type;
    let value = "";

    if (type === "checkbox") {
      value = target.checked;
      this.toggleTodo(value);
    } else {
      value = target.value;
    }

    this.setState({ [name]: value });
  }

  toggleTodo(checked) {
    const payload = this.props.todo;
    payload.is_done = checked;
    updateTodo(payload);
  }

  toggleEdit() {
    this.setState((prevState) => ({ isEditing: !prevState.isEditing }));
  }

  showEditingBox() {
    return (
      <input
        name="text"
        className="input"
        type="text"
        defaultValue={this.state.text}
        onChange={this.handleInputChange}
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
              <input
                name="isDone"
                type="checkbox"
                checked={this.state.isDone}
                onChange={this.handleInputChange}
              />
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
