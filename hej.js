var todos = [];

function Todo (name){
    this.name = name;
    this.completed = false;
}
//add new todo
function addNewTodo (name){
    var t = new Todo(name);
    todos.push(t);
}
//remove todo
function removeTodo(index){
    todos.splice(index, 1);
}
//get todo
addNewTodo("eat Breakfast1");
addNewTodo("eat Breakfast2");
addNewTodo("eat Breakfast3");

console.log(todos);