const uuidGenerator = require('uuid/v4')
const fs = require('fs')

// const todos = []
// // the following line will instead load the todos from a json file when the app starts
const todos = require('../data.json')

// // The following function can be used to save the todos array to the json data file
function save () {
  const json = JSON.stringify(todos)
  console.log(json)
  fs.writeFileSync('data.json', json, 'utf8')
}

// CREATE - params should be an object with keys for name, description and completed
function create (params) {
  if (!params.name) return false
  if (params.name.length <= 4) return false

  params._id = uuidGenerator()
  if (!params.description) params.description = 'N/A'
  if (!params.completed) params.completed = false
  // console.log(params);
  todos.push(params)
  save()
  // set params key => _id = 123
}

// READ (list & show)
function list () {
  return todos
  // return list of all TODOs
}
function show (id) {
  for (i = 0; i < todos.length; i++) {
    if (todos[i]._id === id) return todos[i]
  }
  return null
  // find the TODO with this id
}

// UPDATE - params should be an object with KVPs for the fields to update
function update (id, params) {

  if (!params.name || params.name.length <= 4) return false
  for (i = 0; i < todos.length; i++) {
    if (todos[i]._id === id) {
      for (var key in params) {
        if (params[key]) todos[i][key] = params[key]
      }
      return true
      save()
    }
  }

  return false
}

// DESTROY (destroy & destroyAll)
function destroy (id) {
  for (i = 0; i < todos.length; i++) {
    if (todos[i]._id === id){
       todos.splice(i,1)
       return true
       save()
     }
  }
  return false
}

function destroyAll(){
  todos.splice(0, todos.length)
  save()
  return true
}

module.exports = {
  create,
  list,
  show,
  update,
  destroy,
  destroyAll,
  save
}
