import Project from "./project";
import Todo from "./todo";

export default class App {
  constructor() {
    this.projects = [];
    this.currentProjectIndex = 0;

    this.createProject("Default");

    // 🔹 fetch sample todo when app starts
    this.loadSampleTodo();
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

  // 🔹 new async function
  async loadSampleTodo() {
    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/todos/1");
      const data = await response.json();

      // add fetched todo to current project
      this.addTodoToCurrentProject(data.title, "", "", "low"); // fill desc/date/priority as needed
      console.log("Fetched Todo added:", data);
    } catch (err) {
      console.error("Error fetching sample todo:", err);
    }
  }
}