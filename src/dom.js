import { saveApp } from "./storage";

export default function renderApp(app) {
  const root = document.getElementById("app");
  root.innerHTML = "";

  // ===== HEADER =====
  const header = document.createElement("div");
  header.classList.add("header");
  const titleEl = document.createElement("h1");
  titleEl.textContent = "Todo List";
  header.appendChild(titleEl);
  root.appendChild(header);

  // ===== FORM AREA =====
  const formContainer = document.createElement("div");
  formContainer.classList.add("form-container");

  const inputTitle = document.createElement("input");
  inputTitle.placeholder = "Title";

  const inputDate = document.createElement("input");
  inputDate.type = "date";

  const inputPriority = document.createElement("select");
  ["low", "medium", "high"].forEach(level => {
    const option = document.createElement("option");
    option.value = level;
    option.textContent = level;
    inputPriority.appendChild(option);
  });

  const addBtn = document.createElement("button");
  addBtn.textContent = "Add Todo";

  formContainer.appendChild(inputTitle);
  formContainer.appendChild(inputDate);
  formContainer.appendChild(inputPriority);
  formContainer.appendChild(addBtn);
  root.appendChild(formContainer);

  // ===== TODOS LIST AREA =====
  const todosContainer = document.createElement("div");
  todosContainer.classList.add("todos-container");
  root.appendChild(todosContainer);

  // ===== ADD TODO LOGIC =====
  addBtn.addEventListener("click", () => {
    const title = inputTitle.value;
    const date = inputDate.value;
    const priority = inputPriority.value;
    if (!title) return;

    app.addTodoToCurrentProject(title, "", date, priority);
    saveAndRender();
  });

  function saveAndRender() {
    saveApp(app);
    renderApp(app);
  }

  // ===== RENDER TODOS =====
  const project = app.getCurrentProject();

  project.todos.forEach((todo, index) => {
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo-item");
    todoDiv.classList.add(todo.priority);
    if (todo.completed) todoDiv.classList.add("completed");

    const text = document.createElement("span");
    text.textContent = `${todo.title} - ${todo.dueDate} (${todo.priority})`;

    const completeBtn = document.createElement("button");
    completeBtn.textContent = "✔";
    completeBtn.addEventListener("click", () => {
      todo.toggleComplete();
      saveAndRender();
    });

    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.addEventListener("click", () => {
      const newTitle = prompt("Edit title", todo.title);
      const newDate = prompt("Edit due date", todo.dueDate);
      const newPriority = prompt("Edit priority", todo.priority);

      if (newTitle) todo.title = newTitle;
      if (newDate) todo.dueDate = newDate;
      if (newPriority) todo.priority = newPriority;

      saveAndRender();
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "❌";
    deleteBtn.addEventListener("click", () => {
      app.removeTodoFromCurrentProject(index);
      saveAndRender();
    });

    todoDiv.appendChild(text);
    todoDiv.appendChild(completeBtn);
    todoDiv.appendChild(editBtn);
    todoDiv.appendChild(deleteBtn);

    todosContainer.appendChild(todoDiv);
  });
  
  // ===== PROJECT SELECTOR =====
const projectSelector = document.createElement("select");

app.projects.forEach((proj, i) => {
  const option = document.createElement("option");
  option.value = i; // the index of the project
  option.textContent = proj.name;
  if (i === app.currentProjectIndex) option.selected = true;
  projectSelector.appendChild(option);
});

projectSelector.addEventListener("change", () => {
  app.currentProjectIndex = Number(projectSelector.value);
  saveAndRender();
});

root.appendChild(projectSelector);
// ===== NEW PROJECT BUTTON =====
const newProjectBtn = document.createElement("button");
newProjectBtn.textContent = "New Project";

newProjectBtn.addEventListener("click", () => {
  const name = prompt("Enter project name");
  if (!name) return;
  app.createProject(name);
  app.currentProjectIndex = app.projects.length - 1; // switch to the new project
  saveAndRender();
});

root.appendChild(newProjectBtn);
}