import { List } from "../models/List";
import { Task } from "../models/Task";
import { $resource } from "./resource";


export default {
  state: {
    lists: [],
    tasks: [],
    list: new List()
  },
  mutations: {
    /* set a defaults lists = [] */
    setLists(state, lists = []) {
      state.lists = lists;
    },
    setList(state, list = new List()) {
      state.list = list;
    },
    addList(state, list) {
      state.lists.push(new List(list));
    },
    deleteList(state, list) {
      let i = state.lists.findIndex(l => l.id == list.id);
      if (i != -1) {
        state.lists.splice(i, 1);
      }
    },
    updateList(state, list) {
      let i = state.lists.findIndex(l => l.id == list.id);
      if (i != -1) {
        state.lists.splice(i, 1, list);
      }
    },
    setTasks(state, tasks = []) {
      state.tasks = tasks;
    },

    addTask(state, task) {
      state.tasks.push(new Task(task));
    },
    deleteTask(state, task) {
      let i = state.tasks.findIndex(t => t.id == task.id);
      if (i != -1) {
        state.tasks.splice(i, 1);
      }
    },
    updateTask(state, task) {
      let index = state.tasks.findIndex(i => i.id == task.id);
      state.tasks.splice(index, 1, task);
    },

  },
  actions: {
    async getLists({ commit }, boardId) {
      let lists = await $resource.get(`api/boards/${boardId}/lists`);
      commit("setLists", lists);
    },
    async getList({ commit }, id) {
      let list = await $resource.get("api/lists/" + id);
      /* sets the list as active list */
      commit("setList", list);
    },
    async createList({ commit }, listData) {
      let list = await $resource.post("api/lists", listData);
      commit("setList", list);
      // this does add the list to the list of lists
      commit("addList", list);
    },
    async deleteList({ commit }, listData) {
      let list = await $resource.delete("api/lists/" + listData.id);
      /* deletes the element of the array.   */
      commit("deleteList", list);
    },
    async updateList({ commit }, listData) {
      let list = await $resource.put("api/lists/" + listData.id, listData);
      /* sets the list as active list */
      commit("updateList", list);
    },
    /* TASKS */
    async getTasks({ commit }, boardId) {
      let tasks = await $resource.get("api/boards/" + boardId + "/tasks");
      commit("setTasks", tasks);
    },
    async createTask({ commit }, taskData) {
      let task = await $resource.post("api/tasks", taskData);
      commit("addTask", task);
    },
    async deleteTask({ commit }, taskData) {
      let task = await $resource.delete("api/tasks/" + taskData.id);
      /* deletes the element of the array.   */
      commit("deleteTask", task);
    },
    async updateTask({ commit }, taskData) {
      let task = await $resource.put("api/tasks/" + taskData.id, taskData);
      /* sets the list as active list */
      commit("updateTask", task);
    },
    async moveTask({ commit }, { taskData, to }) {

      taskData.list = to;
      let task = await $resource.put("api/tasks/" + taskData.id, taskData);
      // tell the server to update this task
      commit("updateTask", taskData);

    }

  },
  getters: {
    tasks(state) {
      let tasksDictionary = {}
      state.tasks.forEach(task => {
        if (!tasksDictionary[task.list]) {
          tasksDictionary[task.list] = []
        }
        tasksDictionary[task.list].push(task)
      })
      return tasksDictionary;
    }

  }
};