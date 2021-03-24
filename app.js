//Selectors
const todoInput = document.querySelector(".todo-input"); /* find first element of 'todo-input */
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

//Event Listeners
document.addEventListener('DOMContentLoaded', getTodos); /* check if content on page is loaded. If so, call function getTodos */
todoButton.addEventListener("click", addTodo); /* attach event handeler to element */
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTodo);

//Functions

function addTodo(event){
    event.preventDefault(); /* stops form from submitting */
    
    //todo div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    //create li
    const newTodo = document.createElement("li");
    newTodo.innerText = todoInput.value;

    if(newTodo.innerText === ""){ /* if nothing is entered */
        todoInput.classList.add("error");
        setTimeout(function(){
            todoInput.classList.remove("error");
        }, 300);
        
    }else{
        newTodo.classList.add("todo-item");
        todoDiv.appendChild(newTodo);

        //add todo to local storage
        saveLocalTodos(todoInput.value);

        //Checked button from Font Awesome
        const finishedButton = document.createElement("button");
        finishedButton.innerHTML = '<i class="fas fa-check"></i>'; //adds the check mark icon
        finishedButton.classList.add("finished-button");
        todoDiv.appendChild(finishedButton);

        //Trash bin button from Font Awesome
        const trashButton = document.createElement("button");
        trashButton.innerHTML = '<i class="fas fa-trash"></i>'; // adds the trash bin icon
        trashButton.classList.add("trash-button");
        todoDiv.appendChild(trashButton);

        //append to list
        todoList.appendChild(todoDiv);
        //clear input value after each submission
        todoInput.value = "";
    }
}

function deleteCheck(e){
    const item = e.target;

    //delete the todo
    if(item.classList[0] === "trash-button"){ /* checks the first class */
        const todo = item.parentElement;
        //Animation
        todo.classList.add("fall");
        removeLocalTodos(todo);
        todo.addEventListener("transitionend", function(){ /* removes element after animation */
            todo.remove();
        });
    }

    //check item off
    if(item.classList[0] === "finished-button"){
        const todo = item.parentElement;
        todo.classList.toggle("finished");
    }
}

function filterTodo(e){
    const todos = todoList.childNodes;
    todos.forEach(function(todo){
        switch(e.target.value){
            case "all":
                todo.style.display = "flex";
                break;
            case "finished":
                if(todo.classList.contains("finished")){
                    todo.style.display = "flex";
                }else{
                    todo.style.display = "none";
                }
                break;
            case "unfinished":
                if(!todo.classList.contains("finished")){
                    todo.style.display = "flex";
                }else{
                    todo.style.display = "none";
                }
                break;
        }
    })
}

function saveLocalTodos(todo){
    let todos;

    if(localStorage.getItem("todos") === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos(){
    let todos;

    if(localStorage.getItem("todos") === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    todos.forEach(function(todo){
    //todo div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    //create li
    const newTodo = document.createElement("li");
    newTodo.innerText = todo;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);

    //Checked button fron Font Awesome
    const finishedButton = document.createElement("button");
    finishedButton.innerHTML = '<i class="fas fa-check"></i>'; //adds the check mark icon
    finishedButton.classList.add("finished-button");
    todoDiv.appendChild(finishedButton);

    //Trash bin button from Font Awesome
    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class="fas fa-trash"></i>'; // adds the trash bin icon
    trashButton.classList.add("trash-button");
    todoDiv.appendChild(trashButton);

    //append to list
    todoList.appendChild(todoDiv);
    })
}

function removeLocalTodos(todo){
    let todos;

    if(localStorage.getItem("todos") === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
}