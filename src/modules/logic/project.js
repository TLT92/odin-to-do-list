// CRUD functionality WITHOUT "R" because this relates to DOM logic.
function createProject(projectTitle, toDoArray = []) {
  return { title: projectTitle, toDos: toDoArray, delete: function() {projectsArray.splice(projectsArray.indexOf(this), 1)}};
}

export { createProject };