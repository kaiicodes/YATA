const axios = require("axios");
function getAllTodos() {
  return axios.get("http://localhost:8000/todos/");
}

function createTodo(todo) {
  return axios.post("http://localhost:8000/todos/", todo);
}

function updateTodo(todo) {
  return axios.put(`http://localhost:8000/todos/${todo.id}/`, todo);
}

function deleteTodo(todoID) {
  return axios.delete(`http://localhost:8000/todos/${todoID}/`);
}

module.exports = { getAllTodos, updateTodo, deleteTodo, createTodo };
