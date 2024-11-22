document.addEventListener("DOMContentLoaded", function() {
    let taskList = document.getElementById("task-list");
    let addTaskButton = document.getElementById("add-task-btn");
    let clearButton = document.getElementById("clear-btn");
    let taskInput = document.getElementById("task-input");
    let prioritySelect = document.getElementById("priority");
    let totalTasks = document.getElementById("total-tasks");
    let completedTasks = document.getElementById("completed-tasks");

    let tasks = [];

    function updateTaskCount() {
        totalTasks.textContent = `Total: ${tasks.length}`;
        completedTasks.textContent = `Completed: ${tasks.filter(task => task.completed).length}`;
    }

    function createTaskElement(task) {
        let li = document.createElement("li");
        li.classList.add(task.priority);
        li.classList.toggle("completed", task.completed);

        li.innerHTML = `
            ${task.text}
            <div>
                <button class="complete">${task.completed ? 'Undo' : 'Complete'}</button>
                <button class="delete">Delete</button>
            </div>
        `;

        li.querySelector(".complete").addEventListener("click", () => {
            task.completed = !task.completed;
            li.classList.toggle("completed", task.completed);
            updateTaskCount();
        });

        li.querySelector(".delete").addEventListener("click", () => {
            tasks = tasks.filter(t => t !== task);
            li.remove();
            updateTaskCount();
        });

        return li;
    }

    addTaskButton.addEventListener("click", function() {
        if (taskInput.value.trim() !== "") {
            let task = {
                text: taskInput.value.trim(),
                priority: prioritySelect.value,
                completed: false
            };
            tasks.push(task);
            taskList.appendChild(createTaskElement(task));
            taskInput.value = "";
            updateTaskCount();
        }
    });

    clearButton.addEventListener("click", function() {
        tasks = tasks.filter(task => !task.completed);
        taskList.innerHTML = "";
        tasks.forEach(task => taskList.appendChild(createTaskElement(task)));
        updateTaskCount();
    });

    // Show toast message when a task is added
    function showToast() {
        let toast = document.getElementById("toast");
        toast.className = "show";
        setTimeout(function() {
            toast.className = toast.className.replace("show", "");
        }, 3000);
    }
});