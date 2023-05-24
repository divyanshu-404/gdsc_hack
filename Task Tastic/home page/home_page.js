var pomodoro = {
  started: false,
  minutes: 0,
  seconds: 0,
  fillerHeight: 0,
  fillerIncrement: 0,
  interval: null,
  minutesDom: null,
  secondsDom: null,
  fillerDom: null,
  init: function () {
    var self = this;
    this.minutesDom = document.querySelector("#minutes");
    this.secondsDom = document.querySelector("#seconds");
    this.fillerDom = document.querySelector("#filler");
    this.interval = setInterval(function () {
      self.intervalCallback.apply(self);
    }, 1000);
    document.querySelector("#work").onclick = function () {
      self.startWork.apply(self);
    };
    document.querySelector("#shortBreak").onclick = function () {
      self.startShortBreak.apply(self);
    };
    document.querySelector("#longBreak").onclick = function () {
      self.startLongBreak.apply(self);
    };
    document.querySelector("#stop").onclick = function () {
      self.stopTimer.apply(self);
    };
  },
  resetVariables: function (mins, secs, started) {
    this.minutes = mins;
    this.seconds = secs;
    this.started = started;
    this.fillerIncrement = 200 / (this.minutes * 60);
    this.fillerHeight = 0;
  },
  startWork: function () {
    this.resetVariables(25, 0, true);
  },
  startShortBreak: function () {
    this.resetVariables(5, 0, true);
  },
  startLongBreak: function () {
    this.resetVariables(15, 0, true);
  },
  stopTimer: function () {
    this.resetVariables(25, 0, false);
    this.updateDom();
  },
  toDoubleDigit: function (num) {
    if (num < 10) {
      return "0" + parseInt(num, 10);
    }
    return num;
  },
  updateDom: function () {
    this.minutesDom.innerHTML = this.toDoubleDigit(this.minutes);
    this.secondsDom.innerHTML = this.toDoubleDigit(this.seconds);
    this.fillerHeight = this.fillerHeight + this.fillerIncrement;
    this.fillerDom.style.height = this.fillerHeight + "px";
  },
  intervalCallback: function () {
    if (!this.started) return false;
    if (this.seconds == 0) {
      if (this.minutes == 0) {
        this.timerComplete();
        return;
      }
      this.seconds = 59;
      this.minutes--;
    } else {
      this.seconds--;
    }
    this.updateDom();
  },
  timerComplete: function () {
    this.started = false;
    this.fillerHeight = 0;
  },
};
window.onload = function () {
  pomodoro.init();
};

document.addEventListener("DOMContentLoaded", function () {
  const usernameElement = document.getElementById("username");
  const completedTasksElement = document.getElementById("completed-tasks");
  const logoutButton = document.getElementById("logout-btn");
  const taskNameInput = document.getElementById("task-name");
  const categoryInput = document.getElementById("category");
  const priorityInput = document.getElementById("priority");
  const addTaskButton = document.getElementById("add-task-btn");
  const categoryFilter = document.getElementById("category-filter");
  const priorityFilter = document.getElementById("priority-filter");
  const filterButton = document.getElementById("filter-btn");
  const taskList = document.getElementById("task-list");

  let currentUser = null;
  let tasks = [];

  logoutButton.addEventListener("click", function () {
    currentUser = null;
    updateUserInfo();
    showLoginPage();
  });

  addTaskButton.addEventListener("click", function () {
    const taskName = taskNameInput.value;
    const category = categoryInput.value;
    const priority = priorityInput.value;

    if (taskName && category && priority) {
      const task = {
        name: taskName,
        category: category,
        priority: priority,
        completed: false,
      };

      tasks.push(task);
      updateTaskList();
      clearTaskInputs();
    }
  });

  filterButton.addEventListener("click", function () {
    const selectedCategory = categoryFilter.value;
    const selectedPriority = priorityFilter.value;

    const filteredTasks = tasks.filter((task) => {
      if (selectedCategory === "All" && selectedPriority === "All") {
        return true;
      } else if (selectedCategory === "All") {
        return task.priority === selectedPriority;
      } else if (selectedPriority === "All") {
        return task.category === selectedCategory;
      } else {
        return (
          task.category === selectedCategory &&
          task.priority === selectedPriority
        );
      }
    });

    updateTaskList(filteredTasks);
  });

  function updateUserInfo() {
    if (currentUser) {
      usernameElement.textContent = `Username: ${currentUser.username}`;
      completedTasksElement.textContent = `Tasks Completed: ${currentUser.completedTasks}`;
    } else {
      usernameElement.textContent = "Username";
      completedTasksElement.textContent = "Tasks Completed: 0";
    }
  }

  function showLoginPage() {
    // You can implement your logic to show the login page here
    // For simplicity, let's assume the login page is a separate HTML file
    window.location.href = "./../final/login/login.html";
  }

  function renderTaskList(filteredTasks) {
    taskList.innerHTML = "";

    const tasksToRender = filteredTasks || tasks;

    tasksToRender.forEach(function (task, index) {
      const taskItem = document.createElement("li");
      taskItem.classList.add("task-item");

      const taskName = document.createElement("span");
      taskName.textContent = task.name;
      taskName.classList.add("task-name");

      const taskCategory = document.createElement("span");
      taskCategory.textContent = task.category;
      taskCategory.classList.add("task-category");

      const taskPriority = document.createElement("span");
      taskPriority.textContent = task.priority;
      taskPriority.classList.add("task-priority");

      const taskActions = document.createElement("div");
      taskActions.classList.add("task-actions");

      const completeButton = document.createElement("button");
      completeButton.textContent = "Complete";
      completeButton.classList.add("complete-button");

      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";
      deleteButton.classList.add("delete-button");

      taskActions.appendChild(completeButton);
      taskActions.appendChild(deleteButton);

      taskItem.appendChild(taskName);
      taskItem.appendChild(taskCategory);
      taskItem.appendChild(taskPriority);
      taskItem.appendChild(taskActions);

      taskList.appendChild(taskItem);

      completeButton.addEventListener("click", function () {
        completeTask(index);
      });

      deleteButton.addEventListener("click", function () {
        deleteTask(index);
      });
    });
  }

  function updateTaskList(filteredTasks) {
    renderTaskList(filteredTasks);
    updateCompletedTaskCount();
  }

  function clearTaskInputs() {
    taskNameInput.value = "";
    categoryInput.value = "";
    priorityInput.value = "";
  }

  function completeTask(taskIndex) {
    tasks[taskIndex].completed = true;
    updateTaskList();
  }

  function deleteTask(taskIndex) {
    tasks.splice(taskIndex, 1);
    updateTaskList();
  }

  function updateCompletedTaskCount() {
    const completedTasks = tasks.filter((task) => task.completed).length;
    completedTasksElement.textContent = `Tasks Completed: ${completedTasks}`;
  }

  // Check if a user is logged in
  // You can implement your logic to retrieve the user from storage or session here
  // For simplicity, let's assume the user is logged in and stored in localStorage
  const storedUser = JSON.parse(localStorage.getItem("currentUser"));

  if (storedUser) {
    currentUser = storedUser;
    updateUserInfo();
  } else {
    showLoginPage();
  }

  updateTaskList();
});
