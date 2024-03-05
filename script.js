document.addEventListener("DOMContentLoaded", function() {
    const inputEl = document.querySelector('#inp');
    const addButtonEl = document.querySelector('#addButton');
    const taskDivEl = document.querySelector('#list');

    // Load items from local storage when the page loads
    loadTasksFromLocalStorage();

    addButtonEl.addEventListener('click', addTask);

    function addTask() {
        if ( inputEl.value !== "") {
            const taskEl = document.createElement('li');

            taskEl.textContent = inputEl.value;
            taskDivEl.appendChild(taskEl);
            inputEl.value = "";
    
            flyItem(taskEl);
    
            // Attach click event to remove task when clicked
            taskEl.addEventListener("click", function() {
                eraseFromList(taskEl);
            });
    
        }
        // Save the updated list to local storage
        saveTasksToLocalStorage();
    }

    function flyItem(item) {
        // Function to get random position within viewport
        function getRandomPosition() {
            const x = Math.random() * (window.innerWidth - item.offsetWidth);
            const y = Math.random() * (window.innerHeight - item.offsetHeight);
            return { x, y };
        }

        // Function to update item position
        function updatePosition() {
            const maxX = window.innerWidth - item.offsetWidth;
            const maxY = window.innerHeight - item.offsetHeight;
            pos.x = Math.min(maxX, Math.max(0, pos.x));
            pos.y = Math.min(maxY, Math.max(0, pos.y));
            item.style.left = pos.x + 'px';
            item.style.top = pos.y + 'px';
        }

        // Initial random position
        let pos = getRandomPosition();
        item.style.position = 'absolute';
        item.style.left = pos.x + 'px';
        item.style.top = pos.y + 'px';

        // Animate the item periodically to keep it flying
        const flyInterval = setInterval(() => {
            pos = getRandomPosition();
            updatePosition();
        }, 1500); // Adjust the time interval as needed

        // Recalculate position when window is resized
        window.addEventListener('resize', updatePosition);
    }

    function saveTasksToLocalStorage() {
        const tasks = taskDivEl.innerHTML;
        localStorage.setItem('tasks', tasks);
    }

    function loadTasksFromLocalStorage() {
        const storedTasks = localStorage.getItem('tasks');
        if (storedTasks) {
            taskDivEl.innerHTML = storedTasks;
            const tasks = taskDivEl.querySelectorAll('li');
            tasks.forEach(task => {
                flyItem(task); // Reapply flying animation to loaded items
                task.addEventListener("click", function() {
                    eraseFromList(task);
                });
            });
        }
    }

    function eraseFromList(item) {
        item.remove(); 
        saveTasksToLocalStorage(); // Save the updated list to local storage after removing the task
    }
});
