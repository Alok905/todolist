import { createCard } from "./createCard.mjs";

export const priority = {
  HIGH: "HIGH",
  MEDIUM: "MEDIUM",
  LOW: "LOW",
};

export const status = {
  COMPLETED: "COMPLETED",
  REVIEW: "REVIEW",
  HOLD: "HOLD",
  TODO: "TODO",
};

export const localStorageKeys = {
  TODOS: "TODOS",
};

export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
export function setLocalStorage(key, data) {
  return localStorage.setItem(key, JSON.stringify(data));
}
export function capitalizeString(str) {
  return str[0].toUpperCase() + str.slice(1).toLowerCase();
}
export function renderCards(displayTodos, container) {
  container.innerHTML = "";
  displayTodos.forEach(({ id, title, priority, status, date }) => {
    container.insertAdjacentHTML(
      "beforeend",
      createCard(id, title, priority, status, date)
    );
  });
}
export function setLocalStorageAndRenderCards(
  key,
  data,
  displayTodos,
  container
) {
  setLocalStorage(key, data);
  renderCards(displayTodos, container);
}
