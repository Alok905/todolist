import { capitalizeString } from "./helper.mjs";

export function createCard(
  taskId,
  taskTitle,
  taskPriority,
  taskStatus,
  taskDate
) {
  function priorityClass() {
    return `card-priority-${taskPriority.toLowerCase()}`;
  }
  function statusClass() {
    return `card-status-${taskStatus.toLowerCase()}`;
  }
  return `<div
  class="todo-card-container todo-card-container-${taskId} col-12 col-md-6 col-lg-4 p-2 mx-auto m-md-0"
>
  <div
    class="todo-card h-100 w-100 rounded-3 px-3 py-4 p-md-3 d-flex flex-column justify-content-center gap-3 gap-md-3 gap-lg-4"
  >
    <h3 class="todo-card-title m-0 fw-normal">
            ${taskTitle}
    </h3>
    <div
      class="card-prioriy-status-container d-flex justify-content-between"
    >
      <span
        class="${priorityClass()} d-flex align-items-center justify-content-center p-1 px-2 px-sm-3 px-lg-2 border-0 rounded-5"
        >${capitalizeString(taskPriority)}</span
      >
      <span
        class="${statusClass()} ms-2 d-flex align-items-center justify-content-center p-1 px-2 px-sm-3 px-lg-2 border-0 rounded-5"
        >${capitalizeString(taskStatus)}</span
      >
      <div
        class="buttons-container h-100 ms-auto d-flex align-items-center justify-content-end gap-1"
      >
        <button
          class="btn-change-status btn-change-status-completed d-flex align-items-center justify-content-center rounded-2" data-id="${taskId}"
        >
          C
        </button>
        <button
          class="btn-change-status btn-change-status-hold d-flex align-items-center justify-content-center rounded-2" data-id="${taskId}"
        >
          H
        </button>
        <button
          class="btn-change-status btn-change-status-todo d-flex align-items-center justify-content-center rounded-2" data-id="${taskId}"
        >
          T
        </button>
        <button
          class="btn-change-status btn-change-status-review d-flex align-items-center justify-content-center rounded-2" data-id="${taskId}"
        >
          R
        </button>
      </div>
    </div>
    <div
      class="card-date-container d-flex align-content-center justify-content-between"
    >
      <div
        class="calender-date flex-grow-1 d-flex align-items-center gap-2"
      >
        <div class="calender-container"></div>
        <span class="card-date">${taskDate}</span>
      </div>
      <div
        class="card-buttons-container flex-grow-1 d-flex justify-content-end gap-2"
      >
        <button class="btn-update btn-update-${taskId} border-0" data-id="${taskId}" data-bs-toggle="modal" data-bs-target="#exampleModal"></button>
        <button class="btn-delete btn-delete-${taskId} border-0" data-id="${taskId}"></button>
      </div>
    </div>
  </div>
</div>`;
}
