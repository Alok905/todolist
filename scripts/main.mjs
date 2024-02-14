import {
  getLocalStorage,
  localStorageKeys,
  priority,
  renderCards,
  setLocalStorageAndRenderCards,
  status,
} from "./helpers/helper.mjs";

const modalForm = document.querySelector(".modal-form");
const inputTodoTitle = document.querySelector(".input-todo-title");
const inputTodoPriority = document.querySelector(".input-select-priority");
const btnCreateTodo = document.querySelector(".btn-create-todo");
const textCountStatus = document.querySelectorAll(".status-count");
const btnsQuery = document.querySelectorAll(".btn-query-todo");
const btnShowAll = document.querySelector(".btn-all");
const allTodoCardsContainer = document.querySelector(
  ".all-todo-cards-container"
);

let allTodos = getLocalStorage(localStorageKeys.TODOS) || [];
let displayTodos = { status: "ALL", todos: allTodos };
let prevActiveButton = btnShowAll;
let updatingTodoId = null;

function updateStatusCount() {
  // textCountStatus[0].innerText = allTodos.length;
  // textCountStatus[1].innerText = allTodos.filter(
  //   (todo) => (todo.status = status.COMPLETED)
  // ).length;
  // textCountStatus[5].innerText = allTodos.filter(
  //   (todo) => (todo.status = status.COMPLETED)
  // ).length;
  // textCountStatus[2].innerText = allTodos.filter(
  //   (todo) => todo.status === status.REVIEW
  // ).length;
  // textCountStatus[3].innerText = allTodos.filter(
  //   (todo) => todo.status === status.TODO
  // ).length;
  // textCountStatus[4].innerText = allTodos.filter(
  //   (todo) => todo.status === status.HOLD
  // ).length;
  // --------------------
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
  console.log(allTodos);
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
    const newTodo = {
      id: new Date().getTime(),
      title: todoTitle,
      priority: todoPriority,
      status: status.TODO,
      date: new Date().toString().split(" ").slice(1, 4).join(" "),
    };

    allTodos.unshift(newTodo);
  }
  $("#exampleModal").modal("hide");
  updateStatusCount();
  updateDisplayTodosAndSetLocalStorage();
});

btnsQuery.forEach((btn) => {
  btn.addEventListener("click", function () {
    prevActiveButton.classList.remove("btn-active");
    btn.classList.add("btn-active");
    prevActiveButton = btn;

    if (btn.classList.contains("btn-all")) {
      displayTodos.status = "ALL";
      updateDisplayTodosAndSetLocalStorage();
    } else if (btn.classList.contains("btn-complete")) {
      displayTodos.status = status.COMPLETED;
      updateDisplayTodosAndSetLocalStorage();
    } else if (btn.classList.contains("btn-review")) {
      displayTodos.status = status.REVIEW;
      updateDisplayTodosAndSetLocalStorage();
    } else if (btn.classList.contains("btn-todo")) {
      displayTodos.status = status.TODO;
      updateDisplayTodosAndSetLocalStorage();
    } else if (btn.classList.contains("btn-hold")) {
      displayTodos.status = status.HOLD;
      updateDisplayTodosAndSetLocalStorage();
    } else if (btn.classList.contains("btn-clear")) {
      displayTodos.status = status.COMPLETED;
      allTodos = allTodos.filter((todo) => todo.status !== status.COMPLETED);
      updateDisplayTodosAndSetLocalStorage();
    }
  });
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
