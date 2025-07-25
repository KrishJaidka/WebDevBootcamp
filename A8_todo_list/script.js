const taskArray = [];

const input = document.querySelector('input');
const taskDiv = document.querySelector('#list');
const deleteButtonDiv = document.querySelector('#controls')

const createItemDiv = (taskText, taskIndex) => {
    return `<div class="list-item">
                <li>${taskText}</li>
                <button class="delete" onClick="deleteTask(${taskIndex})">Delete</button>
            </div>`
}

const add = () => {
    if (input.value.trim() !== "") {
        taskArray.push(input.value);
        const taskIndex = taskArray.length - 1;
        taskDiv.innerHTML += createItemDiv(input.value, taskIndex);
        input.value = "";
    }
}

const deleteTask = (index) => {
    taskArray.splice(index, 1);
    renderTasks();
}

const clearTask = () => {
    taskArray.splice(0,taskArray.length);
    renderTasks();
}

const renderTasks = () => {
    taskDiv.innerHTML = "";
    taskArray.forEach((task, index) => {
        taskDiv.innerHTML += createItemDiv(task, index);
    });
}