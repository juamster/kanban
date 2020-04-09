<template>
  <!-- this code is not used  -->
  <div class="ListEditor">
    <modal :open="open" @close="open = false" showFoot showHeader @save="save">
      <div slot="title">"Create a new list"</div>
      <div>
        <form>
          <div class="form-group">
            <label for="title">Edit List Name</label>
            <input class="form-control" type="text" v-model="list.name" />
          </div>
        </form>
      </div>
    </modal>

    <form @submit.prevent="createList">
      <div class="mb-3">
        <label for="name">Name:</label>
        <input class="form-control" type="text" v-model="editable.name" />
      </div>
      <div class="mb-3">
        <label for="name">Description:</label>
        <input class="form-control" type="text" v-model="editable.description" />
      </div>

      <div class="my-3">
        <button class="btn btn-success btn-block">Create List</button>
      </div>
    </form>
  </div>
</template>

<script>
import { List } from "../models/List";
export default {
  name: "ListEditor",
  props: {
    // board: { type: Object, required: true }
  },
  computed: {},
  data() {
    return {
      editable: new List()
    };
  },
  methods: {
    createList() {
      this.$store.dispatch("createList", this.editable);
      this.editable = new List();
    }
  }
};
</script>

<style scoped lang="scss">
</style>