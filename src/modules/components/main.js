import { format, parse } from 'date-fns';
import { modifyToDo, modifyProject, deleteProject, deleteToDo } from '../logic/projectManager.js';
import { createToDoForm } from './toDoForm.js';

function displayProjectInMain(project, projectIndex) {
  // Clean up before displaying project.
  cleanMain();

  // Display project.
  const projectContainer = renderProjectInMain(project, projectIndex);
  const main = document.querySelector("#main");

  // Display project's to-dos.
  const toDos = renderToDos(project, projectIndex, projectContainer);
  projectContainer.appendChild(toDos);

  main.appendChild(projectContainer);

  // Make title element editable by user.
  let titleElement = document.querySelector("#main > .project-container .project-title");
  let newTitleElement = titleElement.cloneNode(true);
  titleElement.parentNode.replaceChild(newTitleElement, titleElement);
  makeContentEditable(newTitleElement, true, projectIndex);
}

function renderProjectInMain(project, projectIndex) {
  const projectContainer = document.createElement("div");
  projectContainer.setAttribute("class", "project-container");
  projectContainer.setAttribute("data-index", projectIndex);

  const titleAndDeleteContainer = document.createElement("div");
  titleAndDeleteContainer.setAttribute("class", "title-and-delete-container");

  const projectTitle = document.createElement("h2");
  projectTitle.setAttribute("class", "project-title");
  projectTitle.setAttribute("data-property", "title");
  projectTitle.textContent = project.title;
  
  projectTitle.addEventListener("click", function() {
    displayProjectInMain(project, projectIndex);
  });

  titleAndDeleteContainer.appendChild(projectTitle);

  // Create & append add to do button.
  const addToDoButton = createAddToDoButton(projectIndex);
  titleAndDeleteContainer.appendChild(addToDoButton);

  // Create & append delete button.
  const deleteButton = document.createElement("i");
  deleteButton.classList.add("fas", "fa-trash");
  deleteButton.classList.add("class", "delete-project-button");
  deleteButton.addEventListener("click", function() {
    deleteProject(projectIndex);
    cleanMain();
  })
  titleAndDeleteContainer.appendChild(deleteButton);

  projectContainer.appendChild(titleAndDeleteContainer);

  return projectContainer;
}

function createAddToDoButton(projectIndex) {
  const addToDoButton = document.createElement("i");
  addToDoButton.classList.add("fas", "fa-plus-square");
  addToDoButton.setAttribute("id", "add-to-do-button");
  addToDoButton.addEventListener("click", function() {
    const toDoForm = createToDoForm(projectIndex);
    document.body.appendChild(toDoForm);
  });
  

  return addToDoButton;
}

function cleanMain() {
  const main = document.querySelector("#main");
  if(main.querySelector(".project-container")) {
    main.querySelector(".project-container").remove();
  }
}

function renderToDos(project, projectIndex, projectContainer) {
  let toDosContainer = document.createElement("div");
  toDosContainer.setAttribute("class", "to-dos-container");

  project.toDos.forEach((toDo, toDoIndex) => {
    const toDoPreviewContainer = renderToDoPreview(toDo, toDoIndex, projectIndex, projectContainer);
    toDosContainer.appendChild(toDoPreviewContainer);
  });

  return toDosContainer;
}

function displayToDoDueDate(dueDate) {
  const parsedDate = new Date(dueDate);
  const formattedDate = format(parsedDate, 'dd MMM yy');
  return formattedDate;
}

function renderToDoPreview(toDo, toDoIndex, projectIndex) {
  const toDoPreviewContainer = document.createElement("div");
  toDoPreviewContainer.setAttribute("class", "to-do-preview-container");
  toDoPreviewContainer.setAttribute("data-index", toDoIndex);

  let toDoHeaderContainer = document.createElement("div");
  toDoHeaderContainer.setAttribute("class", "to-do-header-container");

  const toDoStatus = document.createElement("input");
  toDoStatus.setAttribute("type", "checkbox");
  toDoStatus.setAttribute("class", "to-do-status");
  if (toDo.completed) {
    // Check checkbox
    toDoStatus.checked = true;
    toDoPreviewContainer.classList.add('completed-to-do');
  } else {
    toDoPreviewContainer.classList.remove('completed-to-do');
  }
  toDoStatus.addEventListener('change', function() {
    let newStatus = false;
    toDoPreviewContainer.classList.remove('completed-to-do');
    if (toDoStatus.checked === true) {
      newStatus = true;
      toDoPreviewContainer.classList.add('completed-to-do');
    }
    modifyToDo(projectIndex, toDoIndex, "completed", newStatus);
  });
  toDoHeaderContainer.appendChild(toDoStatus);

  const expandButton = document.createElement("button");
  expandButton.textContent = "↓";
  expandButton.setAttribute("class", "expand-button");
  expandButton.addEventListener("click", () => {
    if (expandButton.textContent === "↓") {
      expandButton.textContent = "↑";
    } else {
      expandButton.textContent = "↓";
    }
    toggleDisplay(toDoDescription);
  });
  toDoHeaderContainer.appendChild(expandButton);

  const titleAndPriorityContainer = document.createElement("div");
  titleAndPriorityContainer.setAttribute("class", "title-and-priority-container");

  const toDoTitle = document.createElement("h3");
  toDoTitle.setAttribute("class", "to-do-preview-title");
  toDoTitle.setAttribute("data-property", "title");
  toDoTitle.textContent = toDo.title;
  makeContentEditable(toDoTitle, false, projectIndex, toDoIndex,);
  titleAndPriorityContainer.appendChild(toDoTitle);

  const priorityAndDescriptionContainer = document.createElement("div");
  priorityAndDescriptionContainer.setAttribute("class", "priority-and-description-container");

  const toDoPriority = document.createElement("div");
  toDoPriority.setAttribute("class", "to-do-priority");
  toDoPriority.setAttribute("data-property", "priority");
  toDoPriority.textContent = `${toDo.priority}`;
  makePriorityEditable(toDoPriority, projectIndex, toDoIndex);
  priorityAndDescriptionContainer.appendChild(toDoPriority);

  // Create the div for the due date
  const toDoDueDate = document.createElement("div");
  toDoDueDate.setAttribute("class", "to-do-due-date");
  toDoDueDate.setAttribute("data-property", "dueDate");

  // Call function to make the date editable
  makeDateEditable(toDoDueDate, projectIndex, toDoIndex);

  // Get the formatted date string
  const formattedDate = displayToDoDueDate(toDo.dueDate);

  // Create the icon element
  const calendarIcon = document.createElement("i");
  calendarIcon.classList.add("far", "fa-calendar-check");

  // Create a text node for the formatted date
  const dateText = document.createElement("span");
  dateText.setAttribute("class", "date-text");
  dateText.textContent = (` ${formattedDate}`);

  // Append the icon and text to the div
  toDoDueDate.appendChild(calendarIcon);
  toDoDueDate.appendChild(dateText);

  // Append the div to the container
  priorityAndDescriptionContainer.appendChild(toDoDueDate);

  titleAndPriorityContainer.appendChild(priorityAndDescriptionContainer);
  toDoHeaderContainer.appendChild(titleAndPriorityContainer);

  // Delete button.
  const deleteButton = document.createElement("i");
  deleteButton.classList.add("fas", "fa-trash");
  deleteButton.classList.add("class", "delete-to-do-button");
  
  deleteButton.addEventListener("click", function() {
    deleteToDo(projectIndex, toDoIndex);
    toDoPreviewContainer.remove();
  })
  toDoHeaderContainer.appendChild(deleteButton);

  toDoPreviewContainer.appendChild(toDoHeaderContainer);

  const toDoDescription = document.createElement("div");
  toDoDescription.setAttribute("class", "to-do-description");
  toDoDescription.style.display = "none";
  toDoDescription.setAttribute("data-property", "description");
  makeContentEditable(toDoDescription, false, projectIndex, toDoIndex);
  const toDoText = document.createElement("div");
  toDoText.textContent = toDo.description;
  toDoDescription.appendChild(toDoText);
  toDoPreviewContainer.appendChild(toDoDescription);

  return toDoPreviewContainer;
}

function makePriorityEditable(elementToBeEdited, projectIndex, toDoIndex) {
  // Make element editable by clicking on it
  elementToBeEdited.addEventListener('click', () => {
    // Create the select element with priority options
    const select = document.createElement('select');

    // Create and append the options directly
    const highOption = document.createElement('option');
    highOption.value = 'high';
    highOption.textContent = 'high';

    const mediumOption = document.createElement('option');
    mediumOption.value = 'medium';
    mediumOption.textContent = 'medium';

    const lowOption = document.createElement('option');
    lowOption.value = 'low';
    lowOption.textContent = 'low';

    // Get the current value from elementToBeEdited
    const currentPriority = elementToBeEdited.textContent.trim();

    // Set the selected option based on the current priority
    if (currentPriority === 'Priority: high') {
      highOption.selected = true;
    } else if (currentPriority === 'Priority: medium') {
      mediumOption.selected = true;
    } else if (currentPriority === 'Priority: low') {
      lowOption.selected = true;
    }

    // Append the options to the select menu
    select.appendChild(highOption);
    select.appendChild(mediumOption);
    select.appendChild(lowOption);

    // Replace the current element with the select element
    elementToBeEdited.replaceWith(select);

    // Handle the blur event (when user clicks outside the select menu)
    select.addEventListener('blur', () => {
      const selectedValue = select.value;

      // Delay the replacement of the select element to avoid the error
      setTimeout(() => {
        // Replace select menu with the selected value text
        const newElement = document.createElement('span');
        newElement.textContent = `Priority: ${selectedValue}`;
        newElement.dataset.property = 'priority'; // Keep property for future edits
        makePriorityEditable(newElement, projectIndex, toDoIndex);
        select.replaceWith(newElement); // Replace select with the new element

        // Save the change.
        modifyToDo(projectIndex, toDoIndex, 'priority', selectedValue);
      }, 0); // This will push the replace operation to the next event loop
    });

    // Optionally handle the change event (for when the user manually selects an option)
    select.addEventListener('change', () => {
      const selectedValue = select.value;

      // Delay the replacement of the select element to avoid the error
      setTimeout(() => {
        // Replace select menu with the selected value text
        const newElement = document.createElement('span');
        newElement.textContent = `Priority: ${selectedValue}`;
        newElement.dataset.property = 'priority'; // Keep property for future edits
        makePriorityEditable(newElement, projectIndex, toDoIndex);
        select.replaceWith(newElement); // Replace select with the new element

        // Save the change.
        modifyToDo(projectIndex, toDoIndex, 'priority', selectedValue);
      }, 0); // This will push the replace operation to the next event loop
    });

    // Focus the select element so it can be interacted with
    select.focus();
  });
}

function makeContentEditable(elementToBeEdited, isProject, projectIndex, toDoIndex) {
  // Make element editable by clicking on it.
  elementToBeEdited.addEventListener('click', () => {
    elementToBeEdited.setAttribute('contenteditable', 'true');
    elementToBeEdited.focus();
  });

  elementToBeEdited.addEventListener('blur', () => {
    // Save the modified content & remove the `contenteditable` attribute.
    elementToBeEdited.removeAttribute('contenteditable');
    const newValue = elementToBeEdited.textContent.trim();

    // Get property name to modify property in stored object.
    let propertyToModify = elementToBeEdited.dataset.property;

    // Check if content belongs to project or to to-do.
    if (isProject) {
      modifyProject(projectIndex, propertyToModify, newValue);
    } else {
      modifyToDo(projectIndex, toDoIndex, propertyToModify, newValue);
    }
  });

  elementToBeEdited.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      elementToBeEdited.blur();
    }

    let maxLength; 
    debugger
    if (elementToBeEdited.getAttribute("class") === "project-title") {
      maxLength = 14;
    }
    else if (elementToBeEdited.getAttribute("class") === "to-do-preview-title") {
      maxLength = 25;
    } else if (elementToBeEdited.getAttribute("class") === "to-do-description") {
      maxLength = 100;
    }

    // Check for the character limit (maxLength).
    if (elementToBeEdited.textContent.length >= maxLength && e.key !== 'Backspace') {
      e.preventDefault();  // Stop adding characters once the max length is reached.
    }
  });
}

function makeDateEditable(dateElement, projectIndex, toDoIndex) {
  // Step 1: When the date element is clicked, replace it with an input field
  dateElement.addEventListener('click', function(event) {
    let currentDate = dateElement.textContent.trim();
    currentDate = currentDate.replace(/^.*?(\d{2} \w{3} \d{2})$/, '$1');

    if (!currentDate) return; // Exit if there's no date to edit

    // Create an input element with type="date"
    const inputDate = document.createElement('input');
    inputDate.type = 'date';

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
    inputDate.setAttribute("class", "input-date");

    // Replace the date element with the input field
    event.target.parentNode.firstChild.remove();
    dateElement.querySelector(".date-text").textContent = '';
    dateElement.appendChild(inputDate);

    // Step 2: When the user changes the date, replace the input with the formatted date
    inputDate.addEventListener('blur', function(event) {
      const toDoDueDate = event.target.parentNode;
      document.querySelector('.input-date').remove();
      const newDate = new Date(`${inputDate.value}T00:00:00`);
      if (!newDate) return; // If no new date selected, do nothing

      // Create the icon element
      const calendarIcon = document.createElement("i");
      calendarIcon.classList.add("far", "fa-calendar-check");
      toDoDueDate.appendChild(calendarIcon);

      // Convert the date back to 'dd MMM yyyy' format
      const formattedDate = displayToDoDueDate(newDate);
      toDoDueDate
      const oldDateText = toDoDueDate.querySelector(".date-text");
      oldDateText.remove();

      const newDateText = document.createElement("span");
      newDateText.setAttribute("class", "date-text");
      newDateText.textContent = ` ${formattedDate}`;
      toDoDueDate.appendChild(newDateText);

      makeDateEditable(toDoDueDate, projectIndex, toDoIndex);

      // Update the actual ToDo data
      modifyToDo(projectIndex, toDoIndex, "dueDate", formattedDate);
    });
  });
}

function toggleDisplay(toDoDescription) {
  // Check current visibility & change it accordingly.
  if (toDoDescription.style.display === "none") {
    toDoDescription.style.display = "grid";
  } else {
    toDoDescription.style.display = "none";
  }
}

export { displayProjectInMain, renderToDoPreview }