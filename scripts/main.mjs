import {
  getLocalStorage,
  localStorageKeys,
  renderCards,
  setLocalStorageAndRenderCards,
  status,
} from "./helpers/helper.mjs";

const btnCreateNewTask = document.querySelector(".btn-create-new-task");
const modalForm = document.querySelector(".modal-form");
const inputTodoTitle = document.querySelector(".input-todo-title");
const inputTodoPriority = document.querySelector(".input-select-priority");
const btnCreateTodo = document.querySelector(".btn-create-todo");
const buttonStatusContainer = document.querySelector(
  ".buttons-section > .buttons-container"
);
const textCountStatus = document.querySelectorAll(".status-count");
const btnShowAll = document.querySelector(".btn-all");
const allTodoCardsContainer = document.querySelector(
  ".all-todo-cards-container"
);

let allTodos = getLocalStorage(localStorageKeys.TODOS) || [];
let displayTodos = { status: "ALL", todos: allTodos };
let prevActiveButton = btnShowAll;
let updatingTodoId = null;

function updateStatusCount() {
  textCountStatus[0].innerText = allTodos.reduce((sum, _) => sum + 1, 0);
  textCountStatus[1].innerText = textCountStatus[5].innerText = allTodos.reduce(
    (sum, curr) => (curr.status === status.COMPLETED ? sum + 1 : sum),
    0
  );
  textCountStatus[2].innerText = allTodos.reduce(
    (sum, curr) => (curr.status === status.REVIEW ? sum + 1 : sum),
    0
  );
  textCountStatus[3].innerText = allTodos.reduce(
    (sum, curr) => (curr.status === status.TODO ? sum + 1 : sum),
    0
  );
  textCountStatus[4].innerText = allTodos.reduce(
    (sum, curr) => (curr.status === status.HOLD ? sum + 1 : sum),
    0
  );
}

function updateDisplayTodosAndSetLocalStorage() {
  if (displayTodos.status === "ALL") {
    displayTodos.todos = allTodos;
  } else {
    displayTodos.todos = allTodos.filter(
      (todo) => todo.status === displayTodos.status
    );
  }

  updateStatusCount();
  setLocalStorageAndRenderCards(
    localStorageKeys.TODOS,
    allTodos,
    displayTodos.todos,
    allTodoCardsContainer
  );
}

window.addEventListener("load", function () {
  allTodoCardsContainer.innerHTML = "";
  renderCards(allTodos, allTodoCardsContainer);
  updateStatusCount();
});

btnCreateNewTask.addEventListener("click", function (e) {
  $("#navbarSupportedContent").collapse("hide");
});

modalForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const todoTitle = inputTodoTitle.value.trim();
  const todoPriority = inputTodoPriority.value;

  inputTodoTitle.value = "";
  inputTodoPriority.value = "";

  if (!todoTitle || !todoPriority) {
    alert("Task title or priority shouldn't be empty.");
    return;
  }

  if (!!updatingTodoId) {
    const updatingTodo = allTodos.find(
      (todo) => todo.id.toString() === updatingTodoId.toString()
    );
    updatingTodo.title = todoTitle;
    updatingTodo.priority = todoPriority;
    btnCreateTodo.innerText = "Create";
    updatingTodoId = null;
  } else {
    const index = allTodos.findIndex((todo) => todo.title === todoTitle);
    if (index !== -1) {
      alert("This task is already present.");
      return;
    }

    const currentDateTime = new Date().toString().split(" ").slice(1, 5);
    const currentDate = currentDateTime.slice(0, 3).join(" ");
    const currentTime = currentDateTime[3]
      .toString()
      .split(":")
      .slice(0, 2)
      .join(":");

    const newTodo = {
      id: new Date().getTime(),
      title: todoTitle,
      priority: todoPriority,
      status: status.TODO,
      date: `${currentTime}, ${currentDate}`,
    };

    allTodos.unshift(newTodo);
  }
  $("#exampleModal").modal("hide");
  updateStatusCount();
  updateDisplayTodosAndSetLocalStorage();
});

buttonStatusContainer.addEventListener("click", function (e) {
  const btn = e.target;
  if (btn.tagName !== "BUTTON") {
    return;
  }
  prevActiveButton.classList.remove("btn-active");
  btn.classList.add("btn-active");
  prevActiveButton = btn;

  if (btn.classList.contains("btn-all")) {
    displayTodos.status = "ALL";
  } else if (btn.classList.contains("btn-complete")) {
    displayTodos.status = status.COMPLETED;
  } else if (btn.classList.contains("btn-review")) {
    displayTodos.status = status.REVIEW;
  } else if (btn.classList.contains("btn-todo")) {
    displayTodos.status = status.TODO;
  } else if (btn.classList.contains("btn-hold")) {
    displayTodos.status = status.HOLD;
  } else if (btn.classList.contains("btn-clear")) {
    displayTodos.status = status.COMPLETED;
    allTodos = allTodos.filter((todo) => todo.status !== status.COMPLETED);
  }
  updateDisplayTodosAndSetLocalStorage();
});

allTodoCardsContainer.addEventListener("click", function (e) {
  const clickedElement = e.target;
  if (clickedElement.tagName !== "BUTTON") {
    return;
  }

  const currentTodoId = e.target.dataset.id;

  if (clickedElement.classList.contains("btn-update")) {
    btnCreateTodo.innerText = "Update";
    updatingTodoId = currentTodoId;
    const currentSelectedTodo = allTodos.find(
      (todo) => todo.id.toString() === currentTodoId.toString()
    );
    inputTodoTitle.value = currentSelectedTodo.title;
    inputTodoPriority.value = currentSelectedTodo.priority;
  } else if (clickedElement.classList.contains("btn-delete")) {
    allTodos = allTodos.filter(
      (todo) => todo.id.toString() !== currentTodoId.toString()
    );
    updateDisplayTodosAndSetLocalStorage();
  } else if (clickedElement.classList.contains("btn-change-status-completed")) {
    const currentTodo = allTodos.find(
      (todo) => todo.id.toString() === currentTodoId.toString()
    );
    currentTodo.status = status.COMPLETED;
    updateDisplayTodosAndSetLocalStorage();
  } else if (clickedElement.classList.contains("btn-change-status-hold")) {
    const currentTodo = allTodos.find(
      (todo) => todo.id.toString() === currentTodoId.toString()
    );
    currentTodo.status = status.HOLD;
    updateDisplayTodosAndSetLocalStorage();
  } else if (clickedElement.classList.contains("btn-change-status-todo")) {
    const currentTodo = allTodos.find(
      (todo) => todo.id.toString() === currentTodoId.toString()
    );
    currentTodo.status = status.TODO;
    updateDisplayTodosAndSetLocalStorage();
  } else if (clickedElement.classList.contains("btn-change-status-review")) {
    const currentTodo = allTodos.find(
      (todo) => todo.id.toString() === currentTodoId.toString()
    );
    currentTodo.status = status.REVIEW;
    updateDisplayTodosAndSetLocalStorage();
  }
});
