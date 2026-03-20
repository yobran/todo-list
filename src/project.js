export default class Project {
  constructor(name) {
    this.name = name;
    this.todos = [];
  }

  // No methods that break on JSON load
  // We manipulate `todos` directly in App
}