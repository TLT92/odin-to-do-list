import { format, parseISO, parse } from 'date-fns';
import { deleteToDo } from '../logic/projectManager.js';

function displayToDoDueDate(dueDate) {
  const parsedDate = parseISO(dueDate);
  const formattedDate = format(parsedDate, 'dd MMM yy');
  return formattedDate;
}

function displayToDoPreview(toDo, toDoIndex, makeContentEditable) {
  const toDosContainer = document.querySelector('.to-dos-container');
  const projectIndex = toDosContainer.parentElement.getAttribute("data-index");

  const toDoPreviewContainer = document.createElement("div");
  toDoPreviewContainer.setAttribute("class", "to-do-preview-container");
  toDoPreviewContainer.setAttribute("data-index", toDoIndex);

  let toDoTitle = document.createElement("h3");
  toDoTitle.setAttribute("class", "to-do-preview-title");
  toDoTitle.setAttribute("data-property", "title");

  toDoTitle.addEventListener("click", () => {
    toggleToDoDetails(toDoDescription, toDoPriority, toDoStatus, deleteButton);
  });

  toDoTitle.textContent = toDo.title;
  toDoPreviewContainer.appendChild(toDoTitle);

  let toDoDescription = document.createElement("p");
  toDoDescription.setAttribute("class", "to-do-description");
  toDoDescription.style.display = "none";
  toDoDescription.setAttribute("data-property", "description");
  makeContentEditable(toDoDescription, false, projectIndex, toDoIndex);
  toDoDescription.textContent = toDo.description;
  toDoPreviewContainer.appendChild(toDoDescription);

  const toDoDueDate = document.createElement("p");
  toDoDueDate.setAttribute("class", "to-do-preview-due-date");
  toDoDueDate.setAttribute("data-property", "dueDate");
  const formattedDate = displayToDoDueDate(toDo.dueDate);
  toDoDueDate.textContent = formattedDate;
  toDoPreviewContainer.appendChild(toDoDueDate);

  let toDoPriority = document.createElement("p");
  toDoPriority.setAttribute("class", "to-do-priority");
  toDoPriority.setAttribute("data-property", "priority");
  toDoPriority.style.display = "none";
  makeContentEditable(toDoPriority, false, projectIndex, toDoIndex);
  toDoPriority.textContent = toDo.priority;
  toDoPreviewContainer.appendChild(toDoPriority);

  const toDoStatus = document.createElement("input");
  toDoStatus.setAttribute("type", "checkbox");
  toDoStatus.setAttribute("class", "to-do-status");
  toDoStatus.style.display = "none";
  if(toDo.completed) {
    // Check checkbox
    toDoStatus.checked = true;
  }
  toDoPreviewContainer.appendChild(toDoStatus);

  // Delete button.
  const deleteButton = document.createElement("button");
  deleteButton.setAttribute("class", "delete-to-do-button");
  deleteButton.style.display = "none";
  deleteButton.textContent = "Delete To-do";
  deleteButton.addEventListener("click", function() {
    deleteToDo(projectIndex, toDoIndex);
    toDoPreviewContainer.remove();
  })
  toDoPreviewContainer.appendChild(deleteButton);

  toDosContainer.appendChild(toDoPreviewContainer);
}

function displayToDo(toDo, toDoIndex, projectIndex, toDosContainer, makeContentEditable) {
  let toDoContainer = document.createElement("div");
  toDoContainer.setAttribute("class", "to-do-container");
  toDoContainer.setAttribute("data-index", toDoIndex);

  let toDoTitle = document.createElement("h3");
  toDoTitle.setAttribute("class", "to-do-title");
  toDoTitle.setAttribute("data-property", "title");
  toDoTitle.addEventListener("click", () => {
    toDoContainer.remove();
    displayToDoPreview(toDo, toDoIndex, makeContentEditable);
  });

  makeContentEditable(toDoTitle, false, projectIndex, toDoIndex);
  toDoTitle.textContent = toDo.title;
  toDoContainer.appendChild(toDoTitle);

  let toDoDescription = document.createElement("p");
  toDoDescription.setAttribute("class", "to-do-description");
  toDoDescription.setAttribute("data-property", "description");
  makeContentEditable(toDoDescription, false, projectIndex, toDoIndex);
  toDoDescription.textContent = toDo.description;
  toDoContainer.appendChild(toDoDescription);

  const toDoDueDate = document.createElement("p");
  toDoDueDate.setAttribute("class", "to-do-due-date");
  toDoDueDate.setAttribute("data-property", "dueDate");
  makeDateEditable(toDoDueDate, projectIndex, toDoIndex);
  const formattedDate = displayToDoDueDate(toDo.dueDate);
  toDoDueDate.textContent = formattedDate;
  toDoContainer.appendChild(toDoDueDate);

  let toDoPriority = document.createElement("p");
  toDoPriority.setAttribute("class", "to-do-priority");
  toDoPriority.setAttribute("data-property", "priority");
  makeContentEditable(toDoPriority, false, projectIndex, toDoIndex);
  toDoPriority.textContent = toDo.priority;
  toDoContainer.appendChild(toDoPriority);

  const toDoStatus = document.createElement("input");
  toDoStatus.setAttribute("type", "checkbox");
  toDoStatus.setAttribute("class", "to-do-status");
  if(toDo.completed) {
    // Check checkbox
    toDoStatus.checked = true;
  }
  toDoContainer.appendChild(toDoStatus);

  // Delete button.
  const deleteButton = document.createElement("button");
  deleteButton.setAttribute("class", "delete-to-do-button");
  deleteButton.textContent = "Delete To-do";
  deleteButton.addEventListener("click", function() {
    deleteToDo(projectIndex, toDoIndex);
    toDoContainer.remove();
  })
  toDoContainer.appendChild(deleteButton);

  toDosContainer.appendChild(toDoContainer);
}

function displayToDos(project, makeContentEditable) {
  let toDosContainer = document.createElement("div");
  toDosContainer.setAttribute("class", "to-dos-container");
  const main = document.querySelector("#main");
  const projectContainer = main.querySelector(".project-container");
  projectContainer.appendChild(toDosContainer);

  project.toDos.forEach((toDo, toDoIndex) => {
    let toDoContainer = document.createElement("div");
    toDoContainer.setAttribute("class", "to-do-container");
    toDoContainer.setAttribute("data-index", toDoIndex);

    let toDoTitle = document.createElement("h3");
    toDoTitle.setAttribute("class", "to-do-title");
    toDoTitle.setAttribute("data-property", "title");
    // makeContentEditable(toDoTitle, false, projectIndex, toDoIndex);
    toDoTitle.textContent = toDo.title;
    toDoContainer.appendChild(toDoTitle);

    let toDoDescription = document.createElement("p");
    toDoDescription.setAttribute("class", "to-do-description");
    toDoDescription.setAttribute("data-property", "description");
    // makeContentEditable(toDoDescription, false, projectIndex, toDoIndex);
    toDoDescription.textContent = toDo.description;
    toDoContainer.appendChild(toDoDescription);

    const toDoDueDate = document.createElement("p");
    toDoDueDate.setAttribute("class", "to-do-due-date");
    toDoDueDate.setAttribute("data-property", "dueDate");
    // makeDateEditable(toDoDueDate, projectIndex, toDoIndex);
    const formattedDate = displayToDoDueDate(toDo.dueDate);
    toDoDueDate.textContent = formattedDate;
    toDoContainer.appendChild(toDoDueDate);

    let toDoPriority = document.createElement("p");
    toDoPriority.setAttribute("class", "to-do-priority");
    toDoPriority.setAttribute("data-property", "priority");
    // makeContentEditable(toDoPriority, false, projectIndex, toDoIndex);
    toDoPriority.textContent = toDo.priority;
    toDoContainer.appendChild(toDoPriority);

    const toDoStatus = document.createElement("input");
    toDoStatus.setAttribute("type", "checkbox");
    toDoStatus.setAttribute("class", "to-do-status");
    if(toDo.completed) {
      // Check checkbox
      toDoStatus.checked = true;
    }
    toDoContainer.appendChild(toDoStatus);

    // Delete button.
    const deleteButton = document.createElement("button");
    deleteButton.setAttribute("class", "delete-to-do-button");
    deleteButton.textContent = "Delete To-do";
    deleteButton.addEventListener("click", function() {
      deleteToDo(projectIndex, toDoIndex);
      toDoContainer.remove();
    })
    toDoContainer.appendChild(deleteButton);

    toDosContainer.appendChild(toDoContainer);
  });
}

function makeDateEditable(dateElement, projectIndex, toDoIndex) {
  // Step 1: When the date element is clicked, replace it with an input field
  dateElement.addEventListener('click', function() {
    const currentDate = dateElement.textContent.trim();
    if (!currentDate) return; // Exit if there's no date to edit

    // Create an input element with type="date"
    const inputDate = document.createElement('input');
    inputDate.type = 'date';

    // Add an event listener for the 'input' event to update in real-time
    inputDate.addEventListener('input', function() {
      const newDate = new Date(inputDate.value);
      if (!isNaN(newDate)) {
        // Format the date back to 'dd MMM yyyy' for display.
        const options = { day: '2-digit', month: 'short', year: 'numeric' };
        const formattedNewDate = newDate.toLocaleDateString('en-GB', options).replace(',', '');
        dateElement.textContent = formattedNewDate;
      }
    });

    // Parse the current date (format: 'dd MMM yy')
    const parsedDate = parse(currentDate, 'dd MMM yy', new Date());

    if (isNaN(parsedDate)) {
      console.error('Invalid date format');
      return;
    }

    // Set the value of the input field to the current date in 'yyyy-mm-dd' format
    const year = parsedDate.getFullYear();
    const month = String(parsedDate.getMonth() + 1).padStart(2, '0'); // months are 0-indexed
    const day = String(parsedDate.getDate()).padStart(2, '0');
    inputDate.value = `${year}-${month}-${day}`;

    // Replace the date element with the input field
    dateElement.innerHTML = '';
    dateElement.appendChild(inputDate);

    // Step 2: When the user changes the date, replace the input with the formatted date
    inputDate.addEventListener('blur', function() {
      const newDate = new Date(`${inputDate.value}T00:00:00`);
      if (!newDate) return; // If no new date selected, do nothing

      // Convert the date back to 'dd MMM yyyy' format
      const formattedDate = format(newDate, 'dd MMM yyyy');

      // Replace the input with the formatted date text
      dateElement.innerHTML = formattedDate;

      // Update the actual ToDo data
      modifyToDo(projectIndex, toDoIndex, "dueDate", formattedDate);
    });
  });
}

function toggleToDoDetails(toDoDescription, toDoPriority, toDoStatus, deleteButton) {
  // Check current visibility & change it accordingly.
  if (toDoDescription.style.display === 'none') {
    toDoDescription.style.display = 'block';
    toDoPriority.style.display = 'block';
    toDoStatus.style.display = 'block';
    deleteButton.style.display = 'block';
  } else {
    toDoDescription.style.display = 'none';
    toDoPriority.style.display = 'none';
    toDoStatus.style.display = 'none';
    deleteButton.style.display = 'none';
  }
}

export { displayToDoPreview, displayToDo, displayToDos }