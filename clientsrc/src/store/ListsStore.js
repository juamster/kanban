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
      console.log("deleting from the store id:", list.id);
      let i = state.lists.findIndex(l => l.id == list.id);
      if (i != -1) {
        state.lists.splice(i, 1);
      }
    },
    updateList(state, list) {
      console.log("updating from the store id:", list.id);
      let i = state.lists.findIndex(l => l.id == list.id);
      if (i != -1) {
        state.lists.splice(i, 1, list);
      }
    },
    setTasks(state, tasks = []) {
      console.log("in store setTask: ", tasks);
      state.tasks = tasks;
    },

    addTask(state, task) {
      console.log("in store addTask: adding a task", task);
      state.tasks.push(new Task(task));
    },
    deleteTask(state, task) {
      console.log("deleting from the store Task id:", task.id);
      let i = state.tasks.findIndex(t => t.id == task.id);
      if (i != -1) {
        state.tasks.splice(i, 1);
      }
    },
    updateTask(state, task) {
      console.log("updating from the store task id:", task.id);
      let i = state.tasks.findIndex(l => l.id == task.id);
      if (i != -1) {
        state.tasks.splice(i, 1, task);
      }
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
      console.log("going to create a list", listData)
      let list = await $resource.post("api/lists", listData);
      // this.$route.params.boardId;  is this added to listData
      // REVIEW when creating a list this sets it as the active list
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
      console.log("back from update", list.id);
      /* sets the list as active list */
      commit("updateList", list);
    },
    /* TASKS */
    async getTasks({ commit }, boardId) {
      console.log("in store getTask: getting for boardId: ", boardId);
      let tasks = await $resource.get("api/boards/" + boardId + "/tasks");
      commit("setTasks", tasks);
    },
    async createTask({ commit }, taskData) {
      console.log("In the store going to create a task", taskData)
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
      console.log("back from update", task.id);
      /* sets the list as active list */
      commit("updateTask", task);
    },
  },
  getters: {

    tasks(state) {
      console.log("in the getter");
      let tasksDictionary = {}
      state.tasks.forEach(task => {
        if (!tasksDictionary[task.list]) {
          tasksDictionary[task.list] = []
        }
        tasksDictionary[task.list].push(task)
      })
      console.log("The tasksDictionary is: ", tasksDictionary)
      return tasksDictionary;
    }

  }
};