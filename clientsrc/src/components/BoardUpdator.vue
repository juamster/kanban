
<template>
  <div class="BoardUpdator">
    <form @submit.prevent="updateBoard">
      <!-- <div class="mb-3">
        <label for="name">Name:</label>
        <input class="form-control" type="text" v-model="board.name" />
      </div>
      <div class="mb-3">
        <label for="name">Description:</label>
        <input class="form-control" type="text" v-model="board.description" />
      </div>

      <div class="my-3">
        <button class="btn btn-success btn-block">Update Board</button>
      </div>-->
    </form>
  </div>
</template>

<script>
import { Board } from "../models/Board";
export default {
  name: "BoardUpdator",
  props: {
    board: { type: Object, required: true }
  },
  computed: {
    // profile() {
    //   return this.$store.state.profile;
    // },
    board() {
      return this.$store.state.boardsStore.board;
    }
  },
  // data() {
  //   return {
  //     editable: new Board()
  //   };
  // },
  methods: {
    updateBoard() {
      this.$store.dispatch("updateBoard", this.board);
      // this.editable = new Board();
    }
  }
};
</script>

<style scoped lang="scss">
</style>