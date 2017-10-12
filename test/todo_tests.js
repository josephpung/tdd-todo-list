const assert = require('assert')
const todos = require('../controllers/todos_controller.js')
const success = require('./helpers/success')

// // Use Assert to Test the functionality of all your CRUD methods e.g.

console.log("[ =============== Testing List Function =============== ]")
console.log(todos.list())
assert.strictEqual(todos.list().length, 0, 'List should return an array of all todos')
success()

console.log('[ =============== Testing create Parameters =============== ]');
var params = {
  name: 'get a milk',
  description: 'from cold storage',
  completed: false
}
todos.create(params)

var todoListNow = todos.list()
assert.strictEqual(todoListNow.length, 1, 'new todos not added to list')
success()
console.log('[ =============== Check if the todo items have property _id =============== ]')

var createdItem1 = todoListNow[0]
assert.notStrictEqual(createdItem1._id, undefined, 'ID was not created')
console.log('Created item has own property: -', createdItem1.hasOwnProperty('_id'))

var obj = Object.keys(createdItem1)
obj.forEach(keys=>{
  assert.strictEqual(createdItem1.hasOwnProperty(keys), true, `${keys} was not defined`)
})


success()

console.log("[ =============== Check if a new TODO item has different ID =============== ]")
todos.create(params)
var createdItem2 = todoListNow[1]
assert.notStrictEqual(createdItem2._id === createdItem1._id, false, "New item has same ID")
success()

console.log("[ =============== Check that name is not allowed to be left blank or be lesser than 5 characters =============== ]");
var params = {
  description: 'from cold storage',
  completed: false
}
assert.strictEqual(todos.create(params), false, "Empty name input was not rejected")
var params = {
  name : "tom",
  description: 'from cold storage',
  completed: false
}
assert.strictEqual(todos.create(params), false, "Invalid input was not rejected")
success()

console.log("[ =============== Check that default description & completed fields are added if left empty =============== ]");
var paramsNameOnly = {
  name : "get beer"
}
todos.create(paramsNameOnly)
var createdItem3 = todoListNow[2]
assert.strictEqual(createdItem3.description, "N/A", "Default descriptions was not provided" )
assert.strictEqual(createdItem3.completed, false, "Default completion was not provided" )
success()

console.log("[ =============== Check show function =============== ]");
var paramsIdTester = {
  name : "GET SHIT DONE BRUH",
  description: 'from cold storage',
  completed: false
}
todos.create(paramsIdTester)
var createdItem4 = todoListNow[3]
assert.strictEqual(todos.show(createdItem4._id), createdItem4, "ID search doesnt work" )
console.log(todos.show(createdItem4._id));
success()

console.log("[ =============== Check that wrong ID returns null  =============== ]");
assert.strictEqual(todos.show("19da88f1-823c-41c9-901a-"), null, "ID search did not return null for invalid search" )
console.log(todos.show("19da88f1-823c-41c9-901a-"));
success()

console.log("[ =============== Testing Update Function =============== ]")
var newParams = {
  name : "get A POTATO MAN",
  description: 'from taiwan',
  completed: false
}
todos.update(createdItem4._id, newParams)
assert.strictEqual(createdItem4.description, "from taiwan", "Single parameter update Description was not updated, check code")
console.log(createdItem4.description);
var newParams = {

  description: 'from taiwan',
  completed: false
}
assert.strictEqual(todos.update(createdItem4._id, newParams), false, "Blank name did not return false")
var newParams = {
  name: "seed",
  description: 'from taiwan',
  completed: false
}
assert.strictEqual(todos.update(createdItem4._id, newParams), false, "Short name did not return false")
success()


console.log("[ =============== testing Destroy function =============== ]");
assert.strictEqual(todos.destroy(createdItem4._id), true, "Destroy function error")
assert.strictEqual(todos.destroy(createdItem4._id), false, "Destroy false result function error")
console.log(todos.list());
success()

console.log("[ =============== Testing destroyAll function =============== ]");
assert.strictEqual(todos.destroyAll(), true, "DestroyAll did not return true")
console.log(todos.list());
success()
