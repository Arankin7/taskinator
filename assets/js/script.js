var formEl = document.querySelector('#task-form');
var taskToDoEl = document.querySelector("#tasks-to-do");

var createTaskHandler = function(event){
    // Prevents the window from refreshing the page.  
    event.preventDefault();

    var taskNameInput = document.querySelector("input[name='task-name']").value;
    var taskTypeInput = document.querySelector("select[name='task-type']").value;

    // Creates a list item with class of 'task-item'
    var listItemEl = document.createElement("li");
    listItemEl.className = "task-item";
    
    // Creates a div to hold task info and add to list item
    var taskInfoEl = document.createElement("div");
    taskInfoEl.className = "task-info";

    // Add HTML content to div
    taskInfoEl.innerHTML = "<h3 class = 'task-name'>" + taskNameInput + "</h3><span class = 'task-type'>" + taskTypeInput + "</span>";

    listItemEl.appendChild(taskInfoEl);

    // Add entire list item to list
    taskToDoEl.appendChild(listItemEl);
};

formEl.addEventListener("submit", createTaskHandler);