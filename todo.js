const addTaskBtn = document.getElementById("addTaskBtn");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

addTaskBtn.addEventListener("click", function() {
  const task = taskInput.value.trim();

  if (task === "") {
    alert("Please enter a task before adding!");
    return;
  }

  const li = document.createElement("li");
  li.textContent = task;

  const removeBtn = document.createElement("button");
  removeBtn.textContent = "Remove";
  removeBtn.classList.add("remove-btn");

  removeBtn.addEventListener("click", function() {
    taskList.removeChild(li);
  });

  li.appendChild(removeBtn);
  taskList.appendChild(li);

  taskInput.value = "";
});

taskInput.addEventListener("keypress", function(e) {
  if (e.key === "Enter") {
    addTaskBtn.click();
  }
});
