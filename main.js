/*global localStorage: true, console: true, $: true , document: true, i: true, location: true;, alert: true setTimeout: true*/



//Two arrays where the todos gets stored
var Todos = [];
var CompletedTodos = [];

function ListAllTodos() {
    /*loop out all Todos that is not completed from Todos array and add two buttons delete and completed.
    This loop works really well with witing html and then ju print it with innnerhtml*/
    var html = '<h2>Task to do...</h2><ul>';
    for (i = 0; i < Todos.length; i++) {
        html += '<li><p>' + Todos[i] + '</p><button href="#" class="Completed btn">Completed</button>' + '<button href="#" class="deleteItem btn">Delete</button>' + '</li>';
    }
    html += '</ul>';

    document.getElementById('Todos').innerHTML = html;

    //Loop out all completed todos from CompletedTodos array and add one delete button
    var html2 = '<h2>Completed Tasks!!</h2><ul>';
    for (i = 0; i < CompletedTodos.length; i++) {
        html2 += '<li><p>' + CompletedTodos[i] + '</p><button href="#" class="deletecompleted btn">Delete</button>' + '</li>';
    }
    html2 += '</ul>';

    document.getElementById('CompletedTodos').innerHTML = html2;

    /* locating all the delete buttons in todos and add an id and evenlistern by looping threw them all
    so when we click on them we run the deletefunction */
    var deleteTodos = document.getElementsByClassName('deleteItem');
    for (i = 0; i < deleteTodos.length; i++) {
        deleteTodos[i].id = i;
        deleteTodos[i].addEventListener('click', remove);
    }

    /*locating all the delete buttons in completedtodos and add an id and evenlistern by looping threw them all
    so when we click on them we run the deletefunction*/
    var deletecompleted = document.getElementsByClassName('deletecompleted');
    for (i = 0; i < deletecompleted.length; i++) {
        deletecompleted[i].id = i;
        deletecompleted[i].addEventListener('click', removecompleted);
    }
    /*locating all Complete buttons and giving them an id so we easy can locate them and
    allso add an eventlistener.*/
    var CompletedTodo = document.getElementsByClassName('Completed');
    for (i = 0; i < CompletedTodo.length; i++) {
        CompletedTodo[i].id = i;
        CompletedTodo[i].addEventListener('click', complete);
    }

}

/*This function delete the todo from the array when we press the delete button 
because the eventlister. after deleting it run the ListAllTodos function and
save the array to local storage*/
function remove(event) {
    Todos.splice(event.target.id, 1);
    ListAllTodos();
    saveTodosInLocalStorage();
    succesMessage("Task was removed!");
    return false;
}

//Same as above but this is for the completedTodos delete function
function removecompleted(event) {
    CompletedTodos.splice(event.target.id, 1);
    ListAllTodos();
    saveTodosInLocalStorage();
    succesMessage("Task was removed!");
    return false;
}

/*This function delete the todo from the array when we press the complete button 
but save it a verible that we push into a new array called CompletedTodos. 
After Pushing into the array it run the ListAllTodos function and
save the array to local storage function*/
function complete(compevent) {
    var completedTask = Todos.splice(compevent.target.id, 1);
    CompletedTodos.push(completedTask);
    ListAllTodos();
    saveTodosInLocalStorage();
    succesMessage("Task was completed!");
}



//Add eventlisterner to check if "add button" is clicked if that happen it runs addNewTodo function.
document.getElementById('add').addEventListener('click', addNewTodo);

/* This function get triggered when we press the add button that we have an eventlister on.
Then it takes the value from inputfield and save it in a verible then check if it empty or allready
exist. If that is true it push it into the array. if not you get an error message*/
function addNewTodo() {
    var task = document.getElementById('entry').value;
    if (task !== '') {
        var n = Todos.includes(task);
        if (n === true) {
            errorMessage("this task already exists");
            return false;
        } else {
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

/*This function is for all errormessage that the user can see what going on.
first it get it element which is a div that has display none from start
then we display and add a class called fadeIn which trigger an css animation.
then print the errormessage inside the div. Then we set and timeout so it stay
for a while before it fades out and later the class get removed*/
function errorMessage(errortext) {
    var error = document.getElementById('errormessage');
    error.style.display = 'block';
    error.classList.add('fadeIn');
    document.getElementById("errormessage").innerHTML = errortext;
    setTimeout(function () {
        error.classList.add('fadeOut');
        setTimeout(function () {
            error.style.display = 'none';
            error.classList.remove("fadeOut");
        }, 800);
    }, 2000);
}
/*This function is for all succesmessage that the user can see what going on.
first it get it element which is a div that has display none from start
then we display and add a class called fadeIn which trigger an css animation.
then print the succesmessage inside the div. Then we set and timeout so it stay
for a while before it fades out and later the class get removed*/
function succesMessage(succestext) {
    var succes = document.getElementById('succesmessage');
    succes.style.display = 'block';
    succes.classList.add('fadeIn');
    document.getElementById("succesmessage").innerHTML = succestext;
    setTimeout(function () {
        succes.classList.add('fadeOut');
        setTimeout(function () {
            succes.style.display = 'none';
            succes.classList.remove("fadeOut");
        }, 800);
    }, 2000);
}


/*If we click the clear all link it that has en eventlistener it triggers the clear function that clear the
localstorage deleting all todos. Then reload location*/
document.getElementById('clear').addEventListener('click', clear);

function clear() {
    localStorage.clear();
    location.reload();
    return false;
}


//function to save the todos array in local storage by converting them to a string using JSON.
function saveTodosInLocalStorage() {
    var str = JSON.stringify(Todos);
    localStorage.setItem("Todos", str);
    var strcomp = JSON.stringify(CompletedTodos);
    localStorage.setItem("CompletedTodos", strcomp);
}



/*function to get all todos from local storage converting them into an array 
and if they are empty it's creating new arrays.'*/
function getTodoFromLocalStorage() {
    var str = localStorage.getItem("Todos");
    Todos = JSON.parse(str);
    if (!Todos) {
        Todos = [];
    }
    var strcomp = localStorage.getItem("CompletedTodos");
    CompletedTodos = JSON.parse(strcomp);
    if (!CompletedTodos) {
        CompletedTodos = [];
    }
}


//run the function to get todos from local storage and then run the function to list all todos
getTodoFromLocalStorage();
ListAllTodos();
