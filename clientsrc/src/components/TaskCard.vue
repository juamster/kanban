<template>
  <div
    class="taskcard"
    draggable="true"
    @dragstart.capture="moving"
    @dragend="dragEnd"
    @dragover.prevent
    ref="draggable"
  >
    <div class="box item">
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
  data() {
    return {
      isMoving: true
    };
  },
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
    },
    moving(event) {
      let from = this.listId;
      event.dataTransfer.setData("data", JSON.stringify(this.taskData));
      event.dataTransfer.setData("from", from);
      this.$refs.draggable.classList.add("dragging");
      event.dataTransfer.setDragImage(this.$refs.draggable, 20, 20);
    },
    dragEnd() {
      // reverts style when dropping into the same zone
      try {
        this.$refs.draggable.classList.remove("dragging");
      } catch (e) {}
    },
    dragging() {
      console.log("we are dragging the task", this.taskData);
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
.dragging {
  transform: scale(0.8);
  opacity: 0.3;
  outline: 1px dashed rgba(128, 128, 128, 0.507);
}
.item {
  cursor: pointer;
  transition: all 0.2s linear;
  padding: 1rem;
}
</style>