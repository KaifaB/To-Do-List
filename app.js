const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

//Load all event listeners
loadEventListeners();

function loadEventListeners() {
    //DOM load event
    document.addEventListener('DOMContentLoaded', getTasks)
    //Add task element
    form.addEventListener('submit', addTask);
    //Remove task element
    taskList.addEventListener('click', removeTask);
    //Clear task event
    clearBtn.addEventListener('click', clearTasks);
    //Filter task events
    filter.addEventListener('keyup', filterTasks);
}

//Add Task
function addTask(e) {
    if(taskInput.value === '') {
        alert('Add a task');
    } else {
        //Create li element
        const li = document.createElement('li');
        //Add class
        li.className = 'collection-item';
        //Create text node and append to li
        li.appendChild(document.createTextNode(taskInput.value));
        //Create new link element
        const link = document.createElement('a');
        //Add class
        link.className = 'delete-item secondary-content';
        //Add icon html
        link.innerHTML = '<i style="cursor:pointer;" class="tiny material-icons">insert_close</i>'; 
        //Append the link to li
        li.appendChild(link);
        //Append li to ul
        taskList.appendChild(li);
        //Store in local storage
        storeTask(taskInput.value);
        //Clear input field
        taskInput.value = '';
    }
    e.preventDefault();
}

function getTasks() {
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));

    }
    tasks.forEach(function(task) {
        //Create li element
        const li = document.createElement('li');
        //Add class
        li.className = 'collection-item';
        //Create text node and append to li
        li.appendChild(document.createTextNode(task));
        //Create new link element
        const link = document.createElement('a');
        //Add class
        link.className = 'delete-item secondary-content';
        //Add icon html
        link.innerHTML = '<img src="https://icon-library.net//images/x-icon-white/x-icon-white-0.jpg" style="cursor:pointer" width="25" />';
        //Append the link to li
        li.appendChild(link);
        //Append li to ul
        taskList.appendChild(li);
    });
}

function storeTask(task){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));

    }

    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));
}
function removeTaskFromLS(taskItem){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
        console.log(tasks);
        console.log(taskItem.textContent);
    }
    tasks.forEach(function(task, index){
        if(taskItem.textContent === task){
            console.log(taskItem.textContent);
            tasks.splice(index, 1);
        }
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
function removeTask(e){
    if(e.target.parentElement.classList.contains('delete-item')){
        if(confirm('Are you sure?')){
            e.target.parentElement.parentElement.remove();

            //Remove from LS
            removeTaskFromLS(e.target.parentElement.parentElement);
        }
    }
    e.preventDefault();
}
function clearTasksFromLocalStorage(){
    localStorage.clear();
}
function clearTasks() {
    //east but slow
    //taskList.innerHTML = '';

    //Faster
    while(taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }

    clearTasksFromLocalStorage();
}

function filterTasks(e) {
    const text = e.target.value.toLowerCase();
    document.querySelectorAll('.collection-item').forEach(function(task){
        const items = task.firstChild.textContent;
        
        if(items.toLocaleLowerCase().indexOf(text) != -1) {
            task.style.display = 'block';
        }else {
            task.style.display = 'none';
        }
    });
}