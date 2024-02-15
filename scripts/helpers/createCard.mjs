import { capitalizeString } from "./helper.mjs";

function createCustomizedElement(tag, classes, attributes, text) {
  const elem = document.createElement(tag);
  classes && elem.classList.add(...classes);
  attributes &&
    attributes.forEach(([attName, attValue]) => {
      elem.setAttribute(attName, attValue);
    });
  text && (elem.textContent = text);

  return elem;
}

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

  const todoCardContainer = createCustomizedElement(
    "div",
    [
      "todo-card-container",
      `todo-card-container-${taskId}`,
      "col-12",
      "col-md-6",
      "col-lg-4",
      "p-2",
      "mx-auto",
      "m-md-0",
    ],
    null,
    null
  );

  const todoCard = createCustomizedElement(
    "div",
    [
      "todo-card",
      "h-100",
      "w-100",
      "rounded-3",
      "px-3",
      "py-4",
      "p-md-3",
      "d-flex",
      "flex-column",
      "justify-content-center",
      "gap-3",
      "gap-md-3",
      "gap-lg-4",
    ],
    null,
    null
  );

  const todoCardTitle = createCustomizedElement(
    "h3",
    ["todo-card-title", "m-0", "fw-normal"],
    null,
    taskTitle
  );

  const todoCardPriorityStatusContainer = createCustomizedElement(
    "div",
    ["card-prioriy-status-container", "d-flex", "justify-content-between"],
    null,
    null
  );

  const taskPrioritySpan = createCustomizedElement(
    "span",
    [
      priorityClass(),
      "d-flex",
      "align-items-center",
      "justify-content-center",
      "p-1",
      "px-2",
      "px-sm-3",
      "px-lg-2",
      "border-0",
      "rounded-5",
    ],
    null,
    capitalizeString(taskPriority)
  );

  const taskStatusSpan = createCustomizedElement(
    "span",
    [
      statusClass(),
      "d-flex",
      "align-items-center",
      "justify-content-center",
      "p-1",
      "px-2",
      "px-sm-3",
      "px-lg-2",
      "border-0",
      "rounded-5",
      "ms-1",
    ],
    null,
    capitalizeString(taskStatus)
  );

  const btnStatusChangeContainer = createCustomizedElement(
    "div",
    [
      "buttons-container",
      "h-100",
      "ms-auto",
      "d-flex",
      "align-items-center",
      "justify-content-end",
      "gap-1",
    ],
    null,
    null
  );

  const btnStatusChangeComplete = createCustomizedElement(
    "button",
    [
      "btn-change-status",
      "btn-change-status-completed",
      "d-flex",
      "align-items-center",
      "justify-content-center",
      "rounded-2",
    ],
    [["data-id", taskId]],
    "C"
  );
  const btnStatusChangeHold = createCustomizedElement(
    "button",
    [
      "btn-change-status",
      "btn-change-status-hold",
      "d-flex",
      "align-items-center",
      "justify-content-center",
      "rounded-2",
    ],
    [["data-id", taskId]],
    "H"
  );
  const btnStatusChangeTodo = createCustomizedElement(
    "button",
    [
      "btn-change-status",
      "btn-change-status-todo",
      "d-flex",
      "align-items-center",
      "justify-content-center",
      "rounded-2",
    ],
    [["data-id", taskId]],
    "T"
  );
  const btnStatusChangeReview = createCustomizedElement(
    "button",
    [
      "btn-change-status",
      "btn-change-status-review",
      "d-flex",
      "align-items-center",
      "justify-content-center",
      "rounded-2",
    ],
    [["data-id", taskId]],
    "R"
  );

  const cardDateContainer = createCustomizedElement(
    "div",
    [
      "card-date-container",
      "d-flex",
      "align-content-center",
      "justify-content-between",
    ],
    null,
    null
  );

  const calenderDateContainer = createCustomizedElement(
    "div",
    ["calender-date", "flex-grow-1", "d-flex", "align-items-center", "gap-2"],
    null,
    null
  );

  const calenderContainer = createCustomizedElement(
    "div",
    ["calender-container"],
    null,
    null
  );
  const dateSpan = createCustomizedElement(
    "span",
    ["card-date"],
    null,
    taskDate
  );

  const cardButtonsContainer = createCustomizedElement(
    "div",
    [
      "card-buttons-container",
      "flex-grow-1",
      "d-flex",
      "justify-content-end",
      "gap-2",
    ],
    null,
    null
  );

  const btnUpdate = createCustomizedElement(
    "button",
    ["btn-update", `btn-update-${taskId}`, "border-0"],
    [
      ["data-id", taskId],
      ["data-bs-toggle", "modal"],
      ["data-bs-target", "#exampleModal"],
    ],
    null
  );

  const btnDelete = createCustomizedElement(
    "button",
    ["btn-delete", `btn-delete-${taskId}`, `border-0`],
    [["data-id", taskId]],
    null
  );

  todoCardContainer.append(todoCard);
  todoCard.append(
    todoCardTitle,
    todoCardPriorityStatusContainer,
    cardDateContainer
  );
  todoCardPriorityStatusContainer.append(
    taskPrioritySpan,
    taskStatusSpan,
    btnStatusChangeContainer
  );
  btnStatusChangeContainer.append(
    btnStatusChangeComplete,
    btnStatusChangeHold,
    btnStatusChangeTodo,
    btnStatusChangeReview
  );
  cardDateContainer.append(calenderDateContainer, cardButtonsContainer);
  calenderDateContainer.append(calenderContainer, dateSpan);
  cardButtonsContainer.append(btnUpdate, btnDelete);

  return todoCardContainer;
}
