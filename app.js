document.addEventListener('DOMContentLoaded', function() {
    loadTasks();

    document.getElementById('new-task').addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });
});

function loadTasks() {
    fetch('tasks.php')
        .then(response => response.json())
        .then(data => {
            const taskList = document.getElementById('task-list');
            taskList.innerHTML = '';

            data.forEach(task => {
                const li = document.createElement('li');
                li.textContent = task.description;

                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Eliminar';
                deleteButton.addEventListener('click', function() {
                    deleteTask(task.id);
                });

                li.appendChild(deleteButton);
                taskList.appendChild(li);
            });
        });
}

function addTask() {
    const newTaskInput = document.getElementById('new-task');
    const description = newTaskInput.value;

    if (description.trim() !== '') {
        fetch('tasks.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ description: description })
        })
        .then(response => response.json())
        .then(() => {
            newTaskInput.value = '';
            loadTasks();
        });
    }
}

function deleteTask(taskId) {
    fetch(`tasks.php?id=${taskId}`, {
        method: 'DELETE'
    })
    .then(() => {
        loadTasks();
    });
}
