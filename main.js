/*global localStorage: true, console: true, $: true , document: true, i: true, location: true;, alert: true setTimeout: true*/
var Todos = [];
var CompletedTodos = [];

function ListAllTodos() {
    var html = '<h2>Task to do...</h2><ul>';
    for (i = 0; i < Todos.length; i++){
      html += '<li><p>' + Todos[i] + '</p><button href="#" class="Completed btn">Completed</button>' + '<button href="#" class="deleteItem btn">Delete</button>' + '</li>';
    }
    html += '</ul>';

    document.getElementById('Todos').innerHTML = html;
  
    var html2 = '<h2>Completed Tasks!!</h2><ul>';
    for (i = 0; i < CompletedTodos.length; i++){
      html2 += '<li><p>' + CompletedTodos[i] + '</p><button href="#" class="deletecompleted btn">Delete</button>' + '</li>';
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
      var deletecompleted = document.getElementsByClassName('deletecompleted');
      for (i = 0; i < deletecompleted.length; i++){
      	deletecompleted[i].id = i;
        deletecompleted[i].addEventListener('click', removecomp);
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
    succesMessage("Task was removed!");
    return false;
}
function removecomp(event) {
    CompletedTodos.splice(event.target.id,1);
    ListAllTodos();
    saveTodosInLocalStorage();
    succesMessage("Task was removed!");
    return false;
}


function comp(compevent){
    var completedTask = Todos.splice(compevent.target.id, 1);
    CompletedTodos.push(completedTask);   
    ListAllTodos();
    saveTodosInLocalStorage();
    succesMessage("Task was completed!");
}



//add new todo
document.getElementById('add').addEventListener('click', addNewTodo);

function addNewTodo() {
  var task = document.getElementById('entry').value;
    if(task !== ''){
        var n = Todos.includes(task);
           if (n === true){
            errorMessage("this task already exists");
            return false;
           }
        else{
            Todos.push(task);
            ListAllTodos();
            saveTodosInLocalStorage();
            succesMessage("Task was created!");
            return false;
        }
    }
    errorMessage("Please fill in the inputfield!");
    return false;
}


function errorMessage(errortext){
    var error = document.getElementById('errormessage');
    error.style.display = 'block';
    error.classList.add('fadeIn');
    document.getElementById("errormessage").innerHTML = errortext;
    setTimeout(function(){
    error.classList.add('fadeOut');
        setTimeout(function(){
            error.style.display = 'none';
            error.classList.remove("fadeOut");
        }, 800);
    }, 2000);
}

function succesMessage(succestext){
    var succes = document.getElementById('succesmessage');
    succes.style.display = 'block';
    succes.classList.add('fadeIn');
    document.getElementById("succesmessage").innerHTML = succestext;
setTimeout(function(){
    succes.classList.add('fadeOut');
        setTimeout(function(){
            succes.style.display = 'none';
            succes.classList.remove("fadeOut");
        }, 800);
    }, 2000);
}


//clear local storage to remove all todos
document.getElementById('clear').addEventListener('click', clear);
function clear(){
    localStorage.clear();
    location.reload();
    succesMessage("All todos are deleted!!");
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