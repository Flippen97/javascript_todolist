/*global localStorage: true, console: true, $: true , document: true, i: true, location: true;, alert: true setTimeout: true*/
var Todos = [];
var CompletedTodos = [];

function ListAllTodos() {
    var html = '<h2>Task to do...</h2><ul>';
    for (i = 0; i < Todos.length; i++){
      html += '<li><p>' + Todos[i] + '</p><a href="#" class="Completed">Completed</a>' + '<a href="#" class="deleteItem">Delete</a>' + '</li>';
    }
    html += '</ul>';

    document.getElementById('Todos').innerHTML = html;
  
    var html2 = '<h2>Completed Tasks!!</h2><ul>';
    for (i = 0; i < CompletedTodos.length; i++){
      html2 += '<li><p>' + CompletedTodos[i] + '</p><a href="#" class="deletecomp">Delete</a>' + '</li>';
    }
    html2 += '</ul>';

    document.getElementById('CompletedTodos').innerHTML = html2;
    
    // Function to remove todo Todos if "x" is clicked
      var deleteTodos = document.getElementsByClassName('deleteItem');
      for (i = 0; i < deleteTodos.length; i++){
      	deleteTodos[i].id = i;
        deleteTodos[i].addEventListener('click', remove);
      }
    // Function to remove todo Todos if "x" is clicked
      var deletecomp = document.getElementsByClassName('deletecomp');
      for (i = 0; i < deletecomp.length; i++){
      	deletecomp[i].id = i;
        deletecomp[i].addEventListener('click', removecomp);
      }
    // Function to remove todo Todos if "x" is clicked
      var CompletedTodo = document.getElementsByClassName('Completed');
      for (i = 0; i < CompletedTodo.length; i++){
      	CompletedTodo[i].id = i;
        CompletedTodo[i].addEventListener('click', comp);
      }
    
}

function remove(event) {
    Todos.splice(event.target.id, 1);
    ListAllTodos();
    saveTodosInLocalStorage();
    return false;
}
function removecomp(event) {
    CompletedTodos.splice(event.target.id,1);
    ListAllTodos();
    saveTodosInLocalStorage();
    return false;
}


function comp(compevent){
    var completed = Todos.splice(compevent.target.id, 1);
    CompletedTodos.push(completed);   
    ListAllTodos();
    saveTodosInLocalStorage();
}



//add new todo
document.getElementById('add').addEventListener('click', add);

function add() {
  var task = document.getElementById('entry').value;
    if(task !== ''){
        var n = Todos.includes(task);
           if (n === true){
            errorMessage("This task..");
            return false;
           }
        else{
            Todos.push(task);
            ListAllTodos();
            saveTodosInLocalStorage();
            return false;
        }
    }
    return false;
}


function errorMessage(message){
    var error = document.getElementById('errormessage');
    error.style.display = 'block';
    document.getElementById("errormessage").innerHTML = message;
    setTimeout(function(){
        error.style.display = 'none';
    }, 4000);
}


//clear local storage to remove all todos
document.getElementById('clear').addEventListener('click', clear);
function clear(){
    localStorage.clear();
    location.reload();
    return false;
}


//function to save the todos array in local storage by converting them to a string 
function saveTodosInLocalStorage (){
    var str = JSON.stringify(Todos);
    localStorage.setItem("Todos", str);
    var strcomp = JSON.stringify(CompletedTodos);
    localStorage.setItem("CompletedTodos", strcomp);
}



//function to get all todos from local storage converting them into an array
function getTodoFromLocalStorage (){
    var str = localStorage.getItem("Todos");
    Todos = JSON.parse(str);
    if(!Todos){
        Todos = [];
    }
    var strcomp = localStorage.getItem("CompletedTodos");
    CompletedTodos = JSON.parse(strcomp);
    if(!CompletedTodos){
        CompletedTodos = [];
    }
}


//run the function to get todos from local storage and then run the function to list all todos
getTodoFromLocalStorage();
ListAllTodos();