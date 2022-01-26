const axios = require("axios");
function getAllTodos() {
      return axios.get('http://localhost:8000/todos/')
}

module.exports = getAllTodos;
