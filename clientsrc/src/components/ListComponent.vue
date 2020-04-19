<template>
  <div
    ref="droppable"
    class="listcomponent"
    droppable="true"
    @dragover.prevent
    @drop.capture="moveTask"
    @dragenter="dragEnter"
    @dragleave="dragLeave"
  >
    <div class="boxes d-flex align-items-top">
      <div class="box container">
        <div class="row justify-content-between">
          <div class="col">
            <h5>{{list.name}}</h5>
            <i
              class="fa fa-trash text-bold mr-2"
              data-toggle="tooltip"
              title="delete"
              @click="deleteList"
            ></i>
            <i
              class="fa fa-pencil text-bold mr-2"
              data-toggle="tooltip"
              title="edit"
              @click="editList"
            ></i>
            <i
              class="fa fa-clipboard text-bold mr-2"
              data-toggle="tooltip"
              title="add task"
              @click="createTask"
            ></i>
            <hr />
          </div>
        </div>

        <div>
          <div class="list-items">
            <TaskCard
              class="m-1"
              v-for="task in tasks"
              :key="task.id"
              :taskData="task"
              :listId="task.list"
              @edit="editTask"
            />
          </div>
        </div>
      </div>
    </div>
    <div>
      <modal :open="open" @close="open = false" show-foot @save="save">
        <div slot="title">Create a new Task</div>
        <div>
          <form>
            <div class="form-group">
              <label for="title">Task Name:</label>
              <input class="form-control" type="text" v-model.trim="editable.name" required />
              <label for="title">Description:</label>
              <input class="form-control" type="text" v-model.trim="editable.description" required />
            </div>
          </form>
        </div>
      </modal>
    </div>
  </div>
</template>

<script>
import TaskCard from "@/components/TaskCard.vue";
import modal from "@/components/Modal.vue";
import { Task } from "../models/Task";

export default {
  name: "ListComponent",
  components: {
    TaskCard,
    modal
  },
  data() {
    return {
      open: false,
      editable: new Task()
    };
  },
  props: {
    list: { type: Object, required: true }
  },
  computed: {
    tasks() {
      let res = this.$store.getters.tasks[this.list.id];
      return res;
    }
  },
  methods: {
    moveTask() {
      console.log("task dropped: going to move the item");
      this.$refs.droppable.classList.remove("droppable");
      // get the task off of the event storage
      let thisTask = JSON.parse(event.dataTransfer.getData("data"));
      // get the starting location off of the event storage
      let from = event.dataTransfer.getData("from");
      // don't allow drops in the same room
      console.log("this list id is: ", this.list.id);
      console.log("The from is: ", from);

      if (from == this.list.id) {
        return;
      }
      this.$store.dispatch("moveTask", {
        taskData: new Task(thisTask),
        to: this.list.id
      });
    },
    dragEnter() {
      this.$refs.droppable.classList.add("droppable");
    },
    dragLeave() {
      this.$refs.droppable.classList.remove("droppable");
    },
    async deleteList() {
      let yes = await this.$confirm(
        "Are you sure you want to delete the List?"
      );
      if (!yes) {
        return;
      } else {
        this.$store.dispatch("deleteList", this.list);
      }
    },

    async editList() {
      this.$emit("edit", this.list);
    },

    createTask() {
      console.log("Creating a Task now");
      this.open = true;
    },
    save() {
      if (this.editable.name == "") {
        return;
      }
      this.editable.list = this.list.id;
      this.editable.board = this.list.board;

      if (this.editable.id) {
        // edit this task
        this.$store.dispatch("updateTask", this.editable);
      } else {
        // create task
        this.$store.dispatch("createTask", this.editable);
      }
      this.editable = new Task();
      this.open = false;
    },
    editTask(taskData) {
      this.editable = taskData;
      // this opens my modal
      this.open = true;
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
  min-height: 80vh;
  width: 250px;
  background-color: var(--primary);
}
.droppable {
  border-style: dashed;
  border-color: grey;
  background: var(--warning);
}
.list-items {
  border-color: grey;
}
</style>