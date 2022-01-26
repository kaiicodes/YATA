import React from "react";

export default class Todo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  render() {
    return <h1>{this.props.value.text}</h1>;
  }
}
