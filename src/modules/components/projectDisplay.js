import { addToDo, modifyProject, deleteProject, modifyToDo, deleteToDo} from '../logic/projectManager.js';
import { displayToDoPreview } from './toDoDisplay.js';
import { createToDoForm } from './toDoForm.js';
import { createProjectForm } from './projectForm.js';

function displayProject(project, projectIndex, projectsContainer) {
  let projectContainer = document.createElement("div");
  projectContainer.setAttribute("class", "project-container");
  projectContainer.setAttribute("data-index", projectIndex);

  let projectTitle = document.createElement("h2");
  projectTitle.setAttribute("class", "project-title");
  projectTitle.setAttribute("data-property", "title");
  projectTitle.textContent = project.title;
  
  projectTitle.addEventListener("click", function() {
    displayProjectDetails(project, projectIndex);
  });

  projectContainer.appendChild(projectTitle);

  projectsContainer.appendChild(projectContainer);
}

function displayAllProjects(projectsArray) {
  // Clean up before adding projects.
  if (document.querySelector(".projects-container")) {
    document.querySelector(".projects-container").remove();
  }

  let projectsContainer = document.createElement("div");
  projectsContainer.setAttribute("id", "projects-container");

  let headerContainer = document.createElement("div");
  headerContainer.setAttribute("id", "header-container");
  let projectsHeadline = document.createElement("h2");
  projectsHeadline.textContent = "My projects";
  headerContainer.appendChild(projectsHeadline);

  let addProjectButton = document.createElement("button");
  addProjectButton.setAttribute("id", "add-project-button");
  addProjectButton.textContent = "+";
  addProjectButton.addEventListener("click", createProjectForm);
  headerContainer.appendChild(addProjectButton);

  projectsContainer.appendChild(headerContainer);

  projectsArray.forEach((project, projectIndex) => {
    displayProject(project, projectIndex, projectsContainer);
  });

  document.querySelector("#sidebar").appendChild(projectsContainer);
}




function displayProjectDetails(project, projectIndex) {
  let projectDetailsContainer = document.createElement("div");
  projectDetailsContainer.setAttribute("id", "project-details-container");

  const mainContainer = document.querySelector("#main")
  mainContainer.appendChild(projectDetailsContainer);

  displayProject(project, projectIndex, projectDetailsContainer);
  // Delete button
  let deleteButton = document.createElement("button");
  deleteButton.setAttribute("class", "delete-project-button");
  deleteButton.textContent = "Delete Project";
  deleteButton.addEventListener("click", function() {
    deleteProject(projectIndex);
    mainContainer.removeChild(projectDetailsContainer);
  })
  projectDetailsContainer.appendChild(deleteButton);

  const isNotExpanded = projectDetailsContainer.classList.toggle('not-expanded');
  if (isNotExpanded) {
    const toDosContainer = document.createElement("div");
    toDosContainer.setAttribute("class", "to-dos-container");

    // Create button to add more to dos.
    let addToDoButton = document.createElement("button");
    addToDoButton.setAttribute("class", "add-to-do-button");
    addToDoButton.textContent = "Add to do";
    addToDoButton.addEventListener("click", function() {
      createToDoForm(projectIndex);
    });

    projectDetailsContainer.appendChild(toDosContainer);
    project.toDos.forEach((toDo, toDoIndex) => {
      displayToDoPreview(toDo, toDoIndex, makeContentEditable);
    });
    
    toDosContainer.appendChild(addToDoButton);
  }
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
      /* Instead of passing everything as an argument, we could retrieve the data we need via dataset attributes?
      // Get project index to to modify actual stored project & not just DOM element.
      let projectIndex = elementToBeEdited.parentElement.dataset.index;
      */
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
  });
}

export { displayAllProjects, makeContentEditable }