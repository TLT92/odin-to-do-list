import { addProject } from '../logic/projectManager.js';
import { createProject } from '../logic/project.js';

// Create project form & overlay element and return as a single element
function createProjectForm() {
  // Create container div for overlay and form
  const container = document.createElement('div');
  container.setAttribute('class', 'form-container');

  // Create overlay element
  const overlay = document.createElement('div');
  overlay.setAttribute('class', 'overlay');

  // Create form element
  const form = document.createElement('form');
  form.setAttribute('id', 'project-form');

  // Create label for input
  const label = document.createElement('label');
  label.setAttribute('for', 'project-name');
  label.setAttribute('id', 'project-form-name-label');
  label.textContent = 'Title';

  // Create input element
  const input = document.createElement('input');
  input.setAttribute('type', 'text');
  input.setAttribute('id', 'project-name');
  input.setAttribute('name', 'project-name');
  input.setAttribute("maxlength", 14);
  input.required = true;

  // Create cancel button
  const cancelButton = document.createElement('button');
  cancelButton.setAttribute('class', 'form-cancel-button');
  cancelButton.textContent = 'Cancel';
  cancelButton.addEventListener('click', () => overlay.remove()); // Close form on cancel

  // Create submit button
  const button = document.createElement('button');
  button.setAttribute('type', 'submit');
  button.setAttribute('class', 'form-submit-button');
  button.textContent = 'Add';

  // Append elements to the form
  form.appendChild(label);
  form.appendChild(input);
  form.appendChild(cancelButton);
  form.appendChild(button);

  // Add event listener to handle form submission
  form.addEventListener('submit', function(event) {
    handleProjectFormSubmission(event, input, container);
    overlay.remove();
  });

  // Append overlay and form to the container
  overlay.appendChild(form);

  return overlay;
}

function hideForm(container) {
  // Remove the overlay and form (container)
  container.remove();
}

function handleProjectFormSubmission(event, input, container) {
  event.preventDefault();
  const projectTitle = input.value.trim();

  if (projectTitle) {
    let newProject = createProject(projectTitle);
    // Save or add the new project (e.g., push to an array or save to local storage)
    addProject(newProject);
    // Clear the input field after submission
    input.value = '';

    // Remove form
    hideForm(container);
  } else {
    alert('Please enter a project name.');
  }
}

export { createProjectForm };