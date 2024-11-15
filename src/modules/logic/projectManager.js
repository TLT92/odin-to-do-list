import { populateSidebar } from '../components/sidebar.js';
import { displayProjectInMain } from '../components/main.js';
import { createToDo } from './todo.js';
import { createProject } from './project.js';

function saveProjectsToLocalStorage(projectsArray) {
  localStorage.setItem('projects', JSON.stringify(projectsArray));
}

function getProjectsFromLocalStorage() {
  // Retrieve the projects from local storage
  const storedProjects = localStorage.getItem('projects');
  
  // If there are no projects, return an empty array
  return storedProjects ? JSON.parse(storedProjects) : [];
}

function handleToDoCreationAndAssignment(title, description, dueDate, priority, projectIndex) {
  // Create to do & store it.
  const newToDo = createToDo(title, description, dueDate, priority);
  addToDo(projectIndex, newToDo);

  const projects = getProjectsFromLocalStorage();
  const currentProject = projects[projectIndex];
  displayProjectInMain(currentProject, projectIndex);
}

function addProject(projectToAdd) {
  // Get existing projects from local storage
  let projectsArray = getProjectsFromLocalStorage();
  // Add the new project to the array
  projectsArray.push(projectToAdd);
  // Save the updated array back to local storage
  saveProjectsToLocalStorage(projectsArray);
  // Display projects again to include new project.
  let projects = getProjectsFromLocalStorage();
  populateSidebar(projects);
  
}

function modifyProject(projectIndex, property, newValue) {
  const projects = getProjectsFromLocalStorage();
  projects[projectIndex][property] = newValue;
  saveProjectsToLocalStorage(projects);
  populateSidebar(projects);
}

function deleteProject(projectIndex = 0) {
  let projects = getProjectsFromLocalStorage();
  projects.splice(projectIndex, 1);
  saveProjectsToLocalStorage(projects);
  populateSidebar(projects);
}

function addToDo(projectIndex, newToDo) {
  let projects = getProjectsFromLocalStorage();
  projects[projectIndex]["toDos"].push(newToDo);
  saveProjectsToLocalStorage(projects);
}

// Modify single attribute at a time. It might make more sense to update several at once or just replace the existing to do?
function modifyToDo(projectIndex, toDoIndex, attribute, newValue) {
  let projects = getProjectsFromLocalStorage();
  projects[projectIndex]["toDos"][toDoIndex][attribute] = newValue;
  saveProjectsToLocalStorage(projects);
  populateSidebar(projects);
}

/* Alternative approaches for modifying a to-do:
function replaceToDo(projectIndex, toDoIndex, updatedAttributes) {
  const currentToDo = projectsArray[projectIndex]["toDos"][toDoIndex];
  Object.assign(currentToDo, updatedAttributes);
}
function replaceToDoAlternative(projectIndex, toDoIndex, modifiedToDo) {
  const currentToDo = projectsArray[projectIndex]["toDos"][toDoIndex];
  currentToDo = modifiedToDo;
}
*/

function deleteToDo(projectIndex, toDoIndex) {
  let projects = getProjectsFromLocalStorage();
  projects[projectIndex]["toDos"].splice(toDoIndex, 1);
  saveProjectsToLocalStorage(projects);
}

function initializeDefaultProject() {
  let projects = getProjectsFromLocalStorage();
  
  // Check if there are any projects in local storage
  if (projects.length === 0) {
    const newToDo = createToDo("Sample To-Do", "This is a sample task", "2024-11-08", "Medium");
    debugger
    const newToDoArray = [newToDo];
    const newProject = createProject("Default Project", newToDoArray);    
    projects.push(newProject);
    saveProjectsToLocalStorage(projects);
  }
}

initializeDefaultProject();

export { handleToDoCreationAndAssignment, getProjectsFromLocalStorage, addProject, modifyProject, deleteProject, addToDo, modifyToDo, deleteToDo };