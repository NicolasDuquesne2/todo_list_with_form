/* global variables */

let todoList = getToDoList();
let toDoId = "";
const input = document.getElementById("description");
const inputWrapper = document.getElementById("text-imput-wrap");
const submitButton = document.getElementById("tab-submit-button");
const formLabel = document.querySelector("label[for='description']");
const toDoListWrapper = document.querySelector(".tab-list");
let todoTaskHtml = "";

/* On loading page */

todoList.forEach(task => {
    const currId = task.id;
    buildTaskDom(currId)
});
 
/* getTodoList tests local storage json file
if there one, the json is cast into object
else todolist is a simple array */
function getToDoList() {
    const toDoObj = JSON.parse(localStorage.getItem("toDoList"));
    if (toDoObj !== null) {
        return toDoObj;
    } else {
        return [];
    }
}

function validate(event) {
    event.preventDefault();
    
    if(checkInputValue(input)) {
        commitEntry(input.value);
        inputWrapper.setAttribute("data-error-visible", "false");
        input.value = "";
    } else {
        inputWrapper.setAttribute("data-error-visible", "true");
    }
}

/* Extarct value attribute from the input and calls the regex function.
Returns a boolean according to regex test*/
function checkInputValue(input) {
    const valText = input.value;
    return regexTest(valText, "^[a-zA-Z]+[-_:,; ]?[a-zA-Z0-9-_:,; ]+$") //regex for 2 characters mini & no ending and starting space/number
}

//regex function

function regexTest(string, pattern) {
    const regex = new RegExp(pattern);
    return regex.test(string);
}

/*commitEntry checks the toDOId in order to modify/add a task
If an id exists then modification function is called. 
Else a new task is created */

function commitEntry(text) {
    if(toDoId.length > 0) {
        modifyTask(toDoId, text);
    } else {
        addTask(text);
    }
    register();
}

/* addTask adss a task in the objects list and launches the dom building */
function addTask(text) {
    const newId = getNewId();
    todoList.push({ id: newId, todo: text });
    buildTaskDom(newId);
}

/* getNewId returns a new id according the last id available among task */

function getNewId() {
    if (todoList.length > 0) {
        const idList = todoList.map(x => x.id);
        idList.sort();
        const newId = Number(idList[idList.length -1]) + 1;
        return String(newId);
    } else {
        return "0";
    }
    
}

function modifyTask(id, text) {
    modifyInArray(id, text);
    modifyElements(id, "modifyTask");
}


/* alterButtonAction */

function alterButtonAction(event) {
    const currButton = event.target;
    const currId = currButton.id;
    modifyElements(currId, "alterButtonAction");
}   

/* delButtonAction on del button click. 
gets the button id and launches the task deleting both in the list and the dom*/

function delButtonAction(event) {
    const currButton = event.target;
    const currId = currButton.id;
    delateInArray(currId);
    removeElements(currId);
    register();
}

/* modifyElements modifies some dom elements.
the form submit button displays Modifier
the form label displays Modifier une tâche 
the input text is filled with task text
id is needed to get back the task text*/

function modifyElements(id, mode) {
    const textContent = document.querySelector(".text-content[id='"+ id +"']");
    const task = todoList.find(todo => todo.id == id);

    if (mode == "alterButtonAction") {
        toDoId = id;
        input.value = task.todo;
        formLabel.innerText = "Modifier une tâche";
        submitButton.innerText = "Modifier";
        submitButton.value = "Modifier";
    } else if (mode == "modifyTask") {
        textContent.innerText = task.todo;
        formLabel.innerText = "Ajouter une tâche";
        submitButton.innerText = "Ajouter";
        submitButton.value = "Ajouter";
        toDoId = "";
    }
   
}

/* removeTask removes any dom Element by its id */

function removeElements(id) {
    const listContentWrapper = document.querySelector(".list-content[id='"+ id +"']");
    toDoListWrapper.removeChild(listContentWrapper);
}

/* modifyInArray modifies a task in the tasks list  according to its id*/

function modifyInArray(id, text) {
    const task = todoList.find(todo => todo.id == id);
    task.todo = text; 
}

/* delateInArray delate task in the tasks list according to its id*/

function delateInArray(id) {
    todoList = todoList.filter(toDo => toDo.id !== id);
}

/* buildTaskDom builds a task dom*/

function buildTaskDom(id) {
    const task = todoList.find(todo => todo.id == id);
    todoTaskHtml += ` <div class="list-content" id=${task.id}>
        <p class="text-content" id=${task.id}>${task.todo}</p>
        <div class="button-group">
            <button class="modify-button" id=${task.id}>Modifier</button>
            <button class="del-button" id=${task.id}>Supprimer</button>
        </div>
    </div>`;
    toDoListWrapper.innerHTML = todoTaskHtml;
}

/* register registers objects in a json file */

function register() {
    const jsonformat = JSON.stringify(todoList);
    localStorage.setItem("toDoList",jsonformat);
}