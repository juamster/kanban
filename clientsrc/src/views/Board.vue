<template>
  <div class="board">
    <div class="d-flex">
      <span>
        <button @click="createList">+ Add another list</button>
        <h1>{{board.name}}</h1>
      </span>
      <modal :open="open" @close="open = false" showFoot @save="save">
        <!-- <div slot="title">""</div> -->
        <div>
          <form>
            <div class="form-group">
              <label for="title">Title</label>
              <input class="form-control" type="text" v-model="editable.name" />
            </div>
          </form>
        </div>
      </modal>
    </div>

    <div class="boxes d-flex">
      <div class="m-1" v-for="list in lists" :key="list.id">
        <ListComponent class="my-1" :list="list" />
      </div>
    </div>
  </div>
</template>

<script>
// import { List } from "../models/List";
import ListComponent from "@/components/ListComponent.vue";
import modal from "@/components/Modal.vue";
import { List } from "../models/List";
export default {
  name: "Board",
  components: {
    ListComponent,
    modal
  },
  data() {
    return {
      open: false,
      editable: new List()
    };
  },
  /* Kick off request to get the board, use the route parameter */
  mounted() {
    this.$store.dispatch("getBoard", this.$route.params.boardId);
    this.$store.dispatch("getLists", this.$route.params.boardId);
  },
  computed: {
    board() {
      return this.$store.state.boardsStore.board;
    },
    lists() {
      return this.$store.state.listsStore.lists;
    }
  },
  methods: {
    createList() {
      console.log("Creating a list now");
      this.open = true;
    },
    save() {
      this.editable.board = this.$route.params.boardId;
      console.log("calling dispatch with: ", this.editable);
      this.$store.dispatch("createList", this.editable);
      this.editable = new List();
      this.open = false;
    }
  }
};
</script>

<style>
.boxes {
  max-width: 100vw;
  overflow-x: auto;
}
.box {
  min-height: calc(20%-80vh);
  width: 200px;
  background-color: var(--info);
}
</style>