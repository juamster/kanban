import { List } from "../models/List"
import { $resource } from "./resource";


export default {
  state: {
    lists: [],
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
    }

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
  }
};