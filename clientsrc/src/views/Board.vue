<template>
  <div class="board">
    <div class="d-flex">
      <span>
        <button>+ Add another list</button>
        <h1>{{board.name}}</h1>
      </span>
    </div>
    <div class="boxes d-flex">
      <div class="m-1" v-for="list in lists" :key="list.id">
        <ListComponent class="my-1" :list="list" />
      </div>
    </div>
    <!-- <div class="boxes d-flex">
      <div class="m-1" v-for="n in 4" :key="n">
        <div class="box">box-{{n}}</div>
      </div>
    </div>-->
  </div>
</template>

<script>
// import { List } from "../models/List";
import ListComponent from "@/components/ListComponent.vue";
export default {
  name: "Board",
  components: {
    ListComponent
  },
  /* Kick off request to get the board, use the route parameter */
  mounted() {
    this.$store.dispatch("getBoard", this.$route.params.boardId);
    // this.$store.dispatch("getLists", this.$route.params.boardId);
  },
  computed: {
    board() {
      return this.$store.state.boardsStore.board;
    },
    lists() {
      return this.$store.state.listsStore.lists;
    }
  },
  methods: {}
};
</script>

<style>
.boxes {
  max-width: 100vw;
  overflow-x: auto;
}
.box {
  min-height: 80vh;
  width: 200px;
  background-color: var(--info);
}
</style>