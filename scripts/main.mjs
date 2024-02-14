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
const textCountStatus = document.querySelectorAll(".status-count");
const btnsQuery = document.querySelectorAll(".btn-query-todo");
const btnShowAll = document.querySelector(".btn-all");
const allTodoCardsContainer = document.querySelector(
  ".all-todo-cards-container"
);

let allTodos = getLocalStorage(localStorageKeys.TODOS) || [];
let displayTodos = { status: "ALL", todos: allTodos };
let prevActiveButton = btnShowAll;

function updateDisplayTodosAndSetLocalStorage() {
  if (displayTodos.status === "ALL") {
    displayTodos.todos = allTodos;
  } else {
    displayTodos.todos = allTodos.filter(
      (todo) => todo.status === displayTodos.status
    );
  }

  setLocalStorageAndRenderCards(
    localStorageKeys.TODOS,
    allTodos,
    displayTodos.todos,
    allTodoCardsContainer
  );
}

function updateStatusCount() {
  textCountStatus[0].innerText = textCountStatus[5].innerText = allTodos.reduce(
    (sum, _) => sum + 1,
    0
  );
  textCountStatus[1].innerText = allTodos.reduce(
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

window.addEventListener("load", function () {
  console.log(displayTodos);
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
  updateDisplayTodosAndSetLocalStorage();
});

btnsQuery.forEach((btn) => {
  btn.addEventListener("click", function () {
    prevActiveButton.classList.remove("btn-active");
    btn.classList.add("btn-active");
    prevActiveButton = btn;

    if (btn.classList.contains("btn-all")) {
      displayTodos = { status: "ALL", todos: allTodos };
      setLocalStorageAndRenderCards(
        localStorageKeys.TODOS,
        allTodos,
        displayTodos.todos,
        allTodoCardsContainer
      );
    } else if (btn.classList.contains("btn-complete")) {
      displayTodos = {
        status: status.COMPLETED,
        todos: allTodos.filter((todo) => todo.status === status.COMPLETED),
      };
      setLocalStorageAndRenderCards(
        localStorageKeys.TODOS,
        allTodos,
        displayTodos.todos,
        allTodoCardsContainer
      );
    } else if (btn.classList.contains("btn-review")) {
      displayTodos = {
        status: status.REVIEW,
        todos: allTodos.filter((todo) => todo.status === status.REVIEW),
      };
      setLocalStorageAndRenderCards(
        localStorageKeys.TODOS,
        allTodos,
        displayTodos.todos,
        allTodoCardsContainer
      );
    } else if (btn.classList.contains("btn-todo")) {
      displayTodos = {
        status: status.TODO,
        todos: allTodos.filter((todo) => todo.status === status.TODO),
      };
      setLocalStorageAndRenderCards(
        localStorageKeys.TODOS,
        allTodos,
        displayTodos.todos,
        allTodoCardsContainer
      );
    } else if (btn.classList.contains("btn-hold")) {
      displayTodos = {
        status: status.HOLD,
        todos: allTodos.filter((todo) => todo.status === status.HOLD),
      };
      setLocalStorageAndRenderCards(
        localStorageKeys.TODOS,
        allTodos,
        displayTodos.todos,
        allTodoCardsContainer
      );
    } else if (btn.classList.contains("btn-clear")) {
      allTodos = allTodos.filter((todo) => todo.status !== status.COMPLETED);
      displayTodos = { status: "ALL", todos: allTodos };
      setLocalStorageAndRenderCards(
        localStorageKeys.TODOS,
        allTodos,
        displayTodos.todos,
        allTodoCardsContainer
      );
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
  } else if (clickedElement.classList.contains("btn-delete")) {
    allTodos = allTodos.filter(
      (todo) => todo.id.toString() !== currentTodoId.toString()
    );
    updateDisplayTodosAndSetLocalStorage();
    updateStatusCount();
  } else if (clickedElement.classList.contains("btn-change-status-completed")) {
    const currentTodo = allTodos.find(
      (todo) => todo.id.toString() === currentTodoId.toString()
    );
    currentTodo.status = status.COMPLETED;
    updateDisplayTodosAndSetLocalStorage();
    updateStatusCount();
  } else if (clickedElement.classList.contains("btn-change-status-hold")) {
    const currentTodo = allTodos.find(
      (todo) => todo.id.toString() === currentTodoId.toString()
    );
    currentTodo.status = status.HOLD;
    updateDisplayTodosAndSetLocalStorage();
    updateStatusCount();
  } else if (clickedElement.classList.contains("btn-change-status-todo")) {
    const currentTodo = allTodos.find(
      (todo) => todo.id.toString() === currentTodoId.toString()
    );
    currentTodo.status = status.TODO;
    updateDisplayTodosAndSetLocalStorage();
    updateStatusCount();
  } else if (clickedElement.classList.contains("btn-change-status-review")) {
    const currentTodo = allTodos.find(
      (todo) => todo.id.toString() === currentTodoId.toString()
    );
    currentTodo.status = status.REVIEW;
    updateDisplayTodosAndSetLocalStorage();
    updateStatusCount();
  }
});
