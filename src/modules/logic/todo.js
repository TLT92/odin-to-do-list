// CRUD functionality WITHOUT "R" because this relates to DOM logic.
const priorities = ["urgent", "high", "middle", "low"];

function createToDo(title, description, dueDate, priority) {
  return {
    title,
    description,
    dueDate,
    priority,
    completed: false,
    toggleCompleted() {
      this.completed = !this.completed;
    },
  };
}

export { createToDo };