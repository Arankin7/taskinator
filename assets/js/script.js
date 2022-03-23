var formEl = document.querySelector('#task-form');
var taskToDoEl = document.querySelector("#tasks-to-do");
var taskIdCounter = 0;
var pageContentEl = document.querySelector('#page-content');
var tasksInProgressEl = document.querySelector('#tasks-in-progress');
var tasksCompletedE1 = document.querySelector('#tasks-completed');

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

    var isEdit = formEl.hasAttribute("data-task-id");

    // Has data attribute , so get task id and call function to complete edit process
    if(isEdit){
        var taskId = formEl.getAttribute("data-task-id");
        completeEditTask(taskNameInput, taskTypeInput, taskId);
    }
    // no data attribute, so create object as normal and pass to createTaskEl function
    else {
        var taskDataObj = {
            name: taskNameInput,
            type: taskTypeInput
        };
        createTaskEl(taskDataObj);
    }
};

var completeEditTask = function(taskName, taskType, taskId){
    // find the matching task list item
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    // sets new values
    taskSelected.querySelector("h3.task-name").textContent = taskName;
    taskSelected.querySelector("span.task-type").textContent = taskType;

    alert("Task Updated");

    // resets the form, otherwise we'd just be editing the same task over and over again
    formEl.removeAttribute("data-task-id");
    document.querySelector('#save-task').textContent = "Add Task";
};

var createTaskEl = function(taskDataObj){
     // Creates a list item with class of 'task-item'
     var listItemEl = document.createElement("li");
     listItemEl.className = "task-item";

    //  adds task id as a custom attribute
    listItemEl.setAttribute("data-task-id", taskIdCounter);

      // Creates a div to hold task info and add to list item
    var taskInfoEl = document.createElement("div");
    taskInfoEl.className = "task-info";

    // Add HTML content to div
    taskInfoEl.innerHTML = "<h3 class = 'task-name'>" + taskDataObj.name + "</h3><span class = 'task-type'>" + taskDataObj.type + "</span>";
    listItemEl.appendChild(taskInfoEl);

    var taskActionsEl = createTaskActions(taskIdCounter);
    listItemEl.appendChild(taskActionsEl);

    // Add entire list item to list
    taskToDoEl.appendChild(listItemEl);

    // increases the task counter for next unique id
    taskIdCounter++;
}

var createTaskActions = function(taskId){
    var actionContainerEl = document.createElement("div");
    actionContainerEl.className = "task-actions";    

    // create edit button
    var editButtonEl = document.createElement("button");
    editButtonEl.textContent = "Edit";
    editButtonEl.className = "btn edit-btn";
    editButtonEl.setAttribute("data-task-id", taskId);

    actionContainerEl.appendChild(editButtonEl);

    // creates delete button
    var deleteButtonEl = document.createElement("button");
    deleteButtonEl.textContent = "Delete";
    deleteButtonEl.className = "btn delete-btn";
    deleteButtonEl.setAttribute("data-task-id", taskId);

    actionContainerEl.appendChild(deleteButtonEl);

    var statusSelectEl = document.createElement("select");
    statusSelectEl.className = "select-status";
    statusSelectEl.setAttribute("name", "status-change");
    statusSelectEl.setAttribute("data-task-id", taskId);

    actionContainerEl.appendChild(statusSelectEl);

    var statusChoices = ["To Do", "In Progress", "Completed"];

    for (var i = 0; i < statusChoices.length; i++){
        // Create option element
        var statusOptionEl = document.createElement("option");
        statusOptionEl.textContent = statusChoices[i];
        statusOptionEl.setAttribute ("value", statusChoices[i]);

        // append to select
        statusSelectEl.appendChild(statusOptionEl);
    }

    return actionContainerEl;
}

var taskStatusChangeHandler = function(event) {
    // get the task item's id
    var taskId =- event.target.getAttribute("data-task-id");

    // get the currently selected option's value and convert to lowercase
    var statusValue = event.target.value.toLowerCase();

    // find the parent task item element based on the ID
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId +"']");

    if (statusValue === "to do"){
        taskToDoEl.appendChild(taskSelected);
    }
    else if (statusValue === "in progress"){
        tasksInProgressEl.appendChild(taskSelected);
    }
    else if (statusValue === "completed"){
        tasksCompletedE1.appendChild(taskSelected);
    }
};

var taskButtonHandler = function(event){

    // get target element from event
    var targetEl = event.target;

    if (targetEl.matches(".edit-btn")){
        var taskId = targetEl.getAttribute("data-task-id");
        editTask(taskId);
    }

    else if (targetEl.matches(".delete-btn")){
        // get the element's task-id
        var taskId = targetEl.getAttribute("data-task-id");
        deleteTask(taskId);
    }
};

var editTask = function(taskId){
    // get task list item element
    var taskSelected = document.querySelector(".task-item[data-task-id= '" + taskId + "']");

    // get content from task name and type
    var taskName = taskSelected.querySelector("h3.task-name").textContent;
    document.querySelector("input[name='task-name']").value = taskName;

    var taskType = taskSelected.querySelector("span.task-type").textContent;
    document.querySelector("select[name='task-type']").value = taskType;

    document.querySelector('#save-task').textContent = "Save Task";

    formEl.setAttribute("data-task-id", taskId);
}
var deleteTask = function(taskId){
    var taskSelected = document.querySelector(".task-item[data-task-id= '" + taskId + "']");
    taskSelected.remove();
}

pageContentEl.addEventListener("change", taskStatusChangeHandler);
pageContentEl.addEventListener("click", taskButtonHandler);
formEl.addEventListener("submit", taskFormHandler);