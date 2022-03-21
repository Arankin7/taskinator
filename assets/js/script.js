var formEl = document.querySelector('#task-form');
var taskToDoEl = document.querySelector("#tasks-to-do");

var taskFormHandler = function(event){
    // Prevents the window from refreshing the page.  
    event.preventDefault();

    var taskNameInput = document.querySelector("input[name='task-name']").value;
    var taskTypeInput = document.querySelector("select[name='task-type']").value;

    // Check if input values are empty strings
    if (!taskNameInput || !taskTypeInput) {
        alert("You need to fill out the task form!");
        return false;
    };

    formEl.reset();

    //  package up data as an object
    var taskDataObj = {
        name: taskNameInput,
        type: taskTypeInput
    };

    createTaskEl(taskDataObj);
};

var createTaskEl = function(taskDataObj){
     // Creates a list item with class of 'task-item'
     var listItemEl = document.createElement("li");
     listItemEl.className = "task-item";

      // Creates a div to hold task info and add to list item
    var taskInfoEl = document.createElement("div");
    taskInfoEl.className = "task-info";

    // Add HTML content to div
    taskInfoEl.innerHTML = "<h3 class = 'task-name'>" + taskDataObj.name + "</h3><span class = 'task-type'>" + taskDataObj.type + "</span>";
    listItemEl.appendChild(taskInfoEl);

    // Add entire list item to list
    taskToDoEl.appendChild(listItemEl);
    
}

formEl.addEventListener("submit", taskFormHandler);