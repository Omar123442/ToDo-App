let todos = JSON.parse(localStorage.getItem('todos')) || [];

function saveUsersToLocalStorage() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

function displaytodos() {
    let todoListElement = document.getElementById("todolist");
    todoListElement.innerHTML = "";

    for (let i = 0; i < todos.length; i++) {
        let todo = todos[i];
        let listitem = document.createElement("li");
        listitem.textContent = todo.name;

        let removebtn = document.createElement("button");
        removebtn.style.border = "none";
        removebtn.className = "remove-btn";
        removebtn.style.alignItems = "center";
        removebtn.innerHTML = "<i class='far fa-trash-alt'></i>";

        removebtn.onclick = () => {
            removeTodos(todo);
        }

        let checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = todo.checked;
        checkbox.addEventListener("change", () => {
            todo.checked = checkbox.checked;
            if (checkbox.checked) {
                listitem.style.textDecoration = "line-through";
            } else {
                listitem.style.textDecoration = "none";
            }
            saveUsersToLocalStorage();
        });

        if (todo.checked) {
            listitem.style.textDecoration = "line-through";
        }

        let editbtn = document.createElement("button");
        editbtn.style.border = "none";
        editbtn.innerHTML = "<i class='far fa-edit'></i>";
        editbtn.className = "edit-btn";
        editbtn.style.right = "-100px";  
        editbtn.onclick = () => {
            editTodos(todo);
        }

        listitem.appendChild(editbtn);
        listitem.appendChild(removebtn);
        listitem.appendChild(checkbox);
        todoListElement.appendChild(listitem);
    }
}

function removeTodos(todoToRemove) {
    let index = todos.indexOf(todoToRemove);
    todos.splice(index, 1);
    displaytodos();
    saveUsersToLocalStorage();
}

function addtodo() {
    let newtodo = document.getElementById("todoinput").value;
    todos.push({ name: newtodo, checked: false });
    document.getElementById("todoinput").value = "";
    displaytodos();
    saveUsersToLocalStorage();
}

let input = document.getElementById("todoinput");

input.addEventListener("keydown", function(event) {
    if (event.key === "Enter" && input.value.trim() !== "") {
        addtodo();
    }
});

function editTodos(todoedit) {
    let index = todos.indexOf(todoedit);
    let edit = prompt("Edit your To DO", todos[index].name);

    if (edit !== null && edit.trim() !== "") {
        todos[index].name = edit;
        displaytodos();
        saveUsersToLocalStorage();
    }
}

displaytodos();
