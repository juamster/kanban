<template>
  <div class="taskcard">
    <div class="box">
      <h6>{{taskData.name}}</h6>
      <i
        class="fa fa-trash text-bold mr-2"
        data-toggle="tooltip"
        title="delete"
        @click="deleteTask"
      ></i>
      <i class="fa fa-pencil text-bold mr-2" data-toggle="tooltip" title="edit" @click="editTask"></i>
      <hr />
      <p>{{taskData.description}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "TaskCard",
  components: {},
  props: ["taskData", "listId"],
  methods: {
    async deleteTask() {
      let yes = await this.$confirm(
        "Are you sure you want to delete this task?"
      );
      if (!yes) {
        return;
      } else {
        console.log("going to delete the task");
        this.$store.dispatch("deleteTask", this.taskData);
      }
    },

    async editTask() {
      this.$emit("edit", this.taskData);
    }
  }
};
</script>

<style scoped lang="scss">
.boxes {
  max-width: 100vw;
  overflow-x: auto;
}
.box {
  height: 120px;
  width: 210px;
  background-color: var(--secondary);
  border-color: black;
  overflow-x: auto;
}
</style>