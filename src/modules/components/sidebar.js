import { createProjectForm } from './projectForm.js';
import { displayProjectInMain } from './main.js';

function populateSidebar(projects) {
  const sidebar = document.querySelector("#sidebar");

  // Clean up before adding projects.
  if (document.querySelector("#projects-container")) {
    document.querySelector("#projects-container").remove();
  }

  // Create and append the header if it doesn't already exist.
  if (!document.querySelector("#sidebar-header")) {
    const headerElement = createSidebarHeader();
    sidebar.appendChild(headerElement);
  }

  // Create and append the list of projects.
  const projectsContainer = displayProjectsInSidebar(projects);
  sidebar.appendChild(projectsContainer);
}

function createSidebarHeader() {
  let sidebarHeader = document.createElement("div");
  sidebarHeader.setAttribute("id", "sidebar-header");
  let projectsHeadline = document.createElement("h2");
  projectsHeadline.textContent = "My projects";
  sidebarHeader.appendChild(projectsHeadline);

  return sidebarHeader;
}

function displayProjectsInSidebar(projectsToDisplay) {
  const projectsContainer = document.createElement("div");
  projectsContainer.setAttribute("id", "projects-container");

  // Create field for adding projects & display as first element in list.
  const addProjectContainer = document.createElement("div");
  addProjectContainer.setAttribute("class", "sidebar-add-project-container");
  addProjectContainer.addEventListener("click", function() {
    const projectForm = createProjectForm();
    document.querySelector("#main").appendChild(projectForm);
  });
  const addProjectButton = document.createElement("i");
  addProjectButton.classList.add("fas", "fa-plus-square");
  addProjectButton.classList.add("add-project-button");
  addProjectContainer.appendChild(addProjectButton);

  const addProjectText = document.createElement("span");
  addProjectText.setAttribute("class", "sidebar-project-title");
  addProjectText.textContent = "ADD PROJECT";
  addProjectContainer.appendChild(addProjectText);

  const projectContainer = document.createElement("div");
  projectContainer.setAttribute("class", "sidebar-project-title-container");
  projectContainer.appendChild(addProjectText);
  addProjectContainer.appendChild(projectContainer);

  projectsContainer.appendChild(addProjectContainer);

  // Display each project in list.
  projectsToDisplay.forEach((project, projectIndex) => {
    const projectContainer = document.createElement("div");
    projectContainer.setAttribute("class", "sidebar-project-container");
    const iconContainer = document.createElement("i");
    iconContainer.classList.add("fas", "fa-clipboard-list");
    projectContainer.appendChild(iconContainer);
    const projectElement = renderProject(project, projectIndex);
    projectContainer.appendChild(projectElement);
    projectsContainer.appendChild(projectContainer);
    projectContainer.addEventListener("click", function() {
      displayProjectInMain(project, projectIndex);
      // Highlight selected project & "unhighlight" project that was selected before.
      if (document.querySelector(".currently-selected-project")) {
        const highlightedProject = document.querySelector(".currently-selected-project");
        highlightedProject.classList.remove('currently-selected-project');
      }
      projectContainer.classList.add('currently-selected-project');
    });
  });

  return projectsContainer;
}


function renderProject(project, projectIndex) {
  const projectContainer = document.createElement("div");
  projectContainer.setAttribute("class", "sidebar-project-title-container");
  projectContainer.setAttribute("data-index", projectIndex);

  const projectTitle = document.createElement("span");
  projectTitle.setAttribute("class", "sidebar-project-title");
  projectTitle.setAttribute("data-property", "title");
  projectTitle.textContent = project.title;

  projectContainer.appendChild(projectTitle);

  return projectContainer;
}

export { populateSidebar, renderProject }