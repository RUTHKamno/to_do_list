// selecteurs
const todoInput = document.querySelector(".todo-input")
const todoButton = document.querySelector(".todobutton")
const todoList = document.querySelector(".todoList")
const filterOption = document.querySelector('.filter_todo')



// ecouteurs
document.addEventListener("DOMContentLoaded", getTodos);
 todoButton.addEventListener('click', addTodo);
 todoList.addEventListener('click', deleteCheck);
 filterOption.addEventListener("change", filterTodo)
// fonction


function addTodo(event)
{
    event.preventDefault(); // stop la propagation de l'évènement du bouton qui redirige automatiquement vers une autre page
    //console.log("Hello");
    // Todo Div

    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    // Créer le li
    const newTodo = document.createElement("li");
    newTodo.innerText = todoInput.value
    newTodo.classList.add("todo_Item");
    todoDiv.appendChild(newTodo);
    // Ajouter la todo au localStorage
    saveLocalTodo(todoInput.value)
    // Button Check
    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class = "fas fa-check"></i>';
    completedButton.classList.add("completedButton");
    todoDiv.appendChild(completedButton);
    // Button Delete
    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class = "fas fa-trash"></i>';
    trashButton.classList.add("trashButton");
    todoDiv.appendChild(trashButton);
    // AJOUTER NOTRE TODO A TODOLIST
    todoList.appendChild(todoDiv);
    todoInput.value = "" // après avoir entré la première tache, on reinitialise l'input
}

function deleteCheck(e){
    const item = e.target;
    //const todoDiv = document.querySelector(".todo");
   
    // DELETE TODO
    
        if(item.classList[0] === "trashButton"){
            item.parentElement.classList.add("fall");
            //item.parentElement.remove();
            item.parentElement.addEventListener("transitionend", function ( ) {
                item.parentElement.remove();
            })
        }


        // CHECK MARK
        if(item.classList[0] === "completedButton"){
            //item.parentElement.style = `text-decoration: line-through;`;
            item.parentElement.classList.toggle("completed");
        }
    
    
}
function filterTodo(e){
    const todos = todoList.children
    //console.log(todos)
    /*  je parcours ma todoListe, on applique la fonction
    ci dessus à chaque élement de todoList   */
    todos.forEach(function(todo) {
        switch(e.target.value)//la valeur de l'élement
        {
            case "all":
                todo.style.display = "flex"//le cas par défaut rien ne vas se passer
                break;
            case "completed":
                if(todo.classList.contains("completed")){
                    todo.style.display = "flex";
                    // si l'element todo contient la classe completed, affiche le
                }  
                else{
                    // sinon, cache le 
                    todo.style.display = "none";
                }
                break;
            case "uncompleted":
                if (!todo.classList.contains("completed")){
                    todo.style.display = "flex";
                    // si l'element todo contient la classe uncompleted, affiche le
                }  
                else{
                    // sinon, cache le 
                    todo.style.display = "none";
                }
                break;
            
        }
    })
}

function saveLocalTodo(todo){
    // Checker si il y'a des item existants
    let todos;
    if (localStorage.getItem("todos") === null){
        todos = [];
    }
    else{
        todos = JSON.parse(localStorage.getItem("todos"))
        // pour récupérer le localStorage qu'on a déja
    }
    todos.push = todo;
    localStorage.setItem("todos", JSON.stringify(todo));
}

function getTodos(){
    let todos;
    if (localStorage.getItem("todos") === null){
        todos = [];
    }
    else{
        todos = JSON.parse(localStorage.getItem("todos"))
        // pour récupérer le localStorage qu'on a déja
    }
    
    todos.forEach(function(todo){
        const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    // Créer le li
    const newTodo = document.createElement("li");
    newTodo.innerText = todo
    newTodo.classList.add("todo_Item");
    todoDiv.appendChild(newTodo);
    
    // Button Check
    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class = "fas fa-check"></i>';
    completedButton.classList.add("completedButton");
    todoDiv.appendChild(completedButton);
    // Button Delete
    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class = "fas fa-trash"></i>';
    trashButton.classList.add("trashButton");
    todoDiv.appendChild(trashButton);
    // AJOUTER NOTRE TODO A TODOLIST
    todoList.appendChild(todoDiv);
    todoInput.value = "" // après avoir entré la première tache, on reinitialise l'input
    })
}