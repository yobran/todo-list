import Project from "./project";
import Todo from "./todo";

// Save app state to localStorage
export function saveApp(app) {
  localStorage.setItem("todoApp", JSON.stringify(app));
}

// Load app state from localStorage
export function loadApp(AppClass) {
  const data = localStorage.getItem("todoApp");
  if (!data) return new AppClass();

  const parsed = JSON.parse(data);
  const app = new AppClass();

  // Rebuild projects & todos from parsed JSON
  app.projects = parsed.projects.map(p => {
    const project = new Project(p.name);
    project.todos = p.todos.map(t => Object.assign(new Todo(), t));
    return project;
  });

  app.currentProjectIndex = parsed.currentProjectIndex || 0;

  return app;
}