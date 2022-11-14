import { observable, action } from "mobx";

export default class TasksStore {
  @observable tasks = [];
  @observable filters = { status: "", search: "" };

  constructor(tasksService) {
    this.tasksService = tasksService;
  }

  updateFilters({ status, search, user }) {
    this.filters.status = status;
    this.filters.search = search;

    this.fetchTasks();
  }

  @action
  resetTasks() {
    this.filters.status = "";
    this.tasks = [];
  }

  @action
  async fetchTasks() {
    const result = await this.tasksService.fetchTasks(this.filters);

    if (result) {
      this.tasks = result.data;
    }
  }

  @action
  async createTask(naziv, proizvodjac) {
    const result = await this.tasksService.createTask(naziv, proizvodjac);

    if (result) {
      this.tasks.push(result.data);
    }
  }

  @action
  async deleteTask(id) {
    const idx = this.tasks.findIndex((task) => task.id === id);
    await this.tasksService.deleteTask(id);
    this.tasks.splice(idx, 1);
  }

  @action
  async updateTaskStatus(id, status) {
    const task = this.tasks.find((task) => task.id === id);
    await this.tasksService.updateTaskStatus(id, status);
    task.status = status;
  }
}
