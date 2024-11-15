import { handleToDoCreationAndAssignment } from '../logic/projectManager.js';

// Create project form & append it to page.
function createToDoForm(projectIndex) {
  // Create overlay element
  const overlay = document.createElement('div');
  overlay.setAttribute('class', 'overlay');
  
  // Create form element
  const form = document.createElement('form');
  form.setAttribute('id', 'to-do-form');

  // Create label for input
  const titleLabel = document.createElement('label');
  titleLabel.setAttribute('for', 'to-do-title');
  titleLabel.textContent = 'Title';

  // Create input element
  const titleInput = document.createElement('input');
  titleInput.setAttribute('type', 'text');
  titleInput.setAttribute('id', 'to-do-title-input');
  titleInput.setAttribute('name', 'to-do-title-input');
  titleInput.setAttribute("maxlength", 20)
  titleInput.required = true;

  // Create label for input
  const descriptionLabel = document.createElement('label');
  descriptionLabel.setAttribute('for', 'to-do-description');
  descriptionLabel.textContent = 'Description';

  // Create input element
  const descriptionInput = document.createElement('textarea');
  descriptionInput.setAttribute('id', 'to-do-description-input');
  descriptionInput.setAttribute('name', 'to-do-description-input');
  descriptionInput.setAttribute('rows', '4');
  descriptionInput.setAttribute('cols', '50');
  descriptionInput.setAttribute("maxlength", 100);
  descriptionInput.required = true;

  // Create label for input
  const dueDateLabel = document.createElement('label');
  dueDateLabel.setAttribute('for', 'to-do-due-date');
  dueDateLabel.textContent = 'Due date';

  // Create input element
  const dueDateInput = document.createElement('input');
  dueDateInput.setAttribute('type', 'date');
  dueDateInput.setAttribute('id', 'to-do-due-date-input');
  dueDateInput.setAttribute('name', 'to-do-due-date-input');
  dueDateInput.required = true;

  // Create label for input
  const priorityLabel = document.createElement('label');
  priorityLabel.setAttribute('for', 'to-do-priority');
  priorityLabel.textContent = 'Priority';

  // Create select element for priority levels
  const prioritySelect = document.createElement('select');
  prioritySelect.setAttribute('id', 'to-do-priority-input');
  prioritySelect.setAttribute('name', 'to-do-priority-input');
  prioritySelect.required = true;

  // Create and append option elements
  const priorities = ['high', 'medium', 'low'];
  priorities.forEach((priority) => {
    const option = document.createElement('option');
    option.value = priority;
    option.textContent = priority.charAt(0).toUpperCase() + priority.slice(1);
    prioritySelect.appendChild(option);
  });

  // Create cancel button
  const cancelButton = document.createElement('button');
  cancelButton.setAttribute('type', 'button');
  cancelButton.setAttribute("class", "form-cancel-button");
  cancelButton.textContent = 'Cancel';
  cancelButton.addEventListener('click', () => overlay.remove());

  // Create submit button
  const submitButton = document.createElement('button');
  submitButton.setAttribute('class', 'form-submit-button');
  submitButton.textContent = 'Add';

  // Append elements to the form
  form.appendChild(titleLabel);
  form.appendChild(titleInput);
  form.appendChild(descriptionLabel);
  form.appendChild(descriptionInput);
  form.appendChild(dueDateLabel);
  form.appendChild(dueDateInput);
  form.appendChild(priorityLabel);
  form.appendChild(prioritySelect);
  form.appendChild(cancelButton);
  form.appendChild(submitButton);

  // Add event listener to handle form submission
  form.addEventListener('submit', (event) => {
    const formData = new FormData(form);
    handleToDoFormSubmission(event, projectIndex, formData, overlay, form);
  });

  overlay.appendChild(form)

  // Append overlay and form to the body
  return overlay;
}

function hideForm(overlay, form) {
  // Hide the overlay and remove the form
  overlay.remove();
  form.remove();
}

function handleToDoFormSubmission(event, projectIndex, formData, overlay, form) {
  event.preventDefault();
  const toDoTitle = formData.get('to-do-title-input').trim();
  const toDoDescription = formData.get('to-do-description-input').trim();
  const toDoDueDate = formData.get('to-do-due-date-input').trim();
  const toDoPriority = formData.get('to-do-priority-input').trim();

  handleToDoCreationAndAssignment(toDoTitle, toDoDescription, toDoDueDate, toDoPriority, projectIndex);

  // Remove form and overlay after submission
  hideForm(overlay, form);
}

export { createToDoForm };