import Project from "./project";
import Todo from "./todo";

export default class App {
  constructor() {
    this.projects = [];
    this.currentProjectIndex = 0;

    this.createProject("Default");
  }

  createProject(name) {
    const project = new Project(name);
    this.projects.push(project);
  }

  getCurrentProject() {
    return this.projects[this.currentProjectIndex];
  }

  addTodoToCurrentProject(title, desc, date, priority) {
    const todo = new Todo(title, desc, date, priority);
    const project = this.getCurrentProject();
    project.todos.push(todo); // ✅ works even after loading from JSON
  }

  removeTodoFromCurrentProject(index) {
    const project = this.getCurrentProject();
    project.todos.splice(index, 1);
  }
}