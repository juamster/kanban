<template>
  <div class="boardcard">
    <!-- <div class="card p-2 my-2 elevation-4" v-for="board in boards" :key="board.id"> -->

    <!-- these are links to a vue called Board  -->
    <router-link :to="{name: 'Board', params: {boardId: board.id}}">{{board.name}}</router-link>
    <i class="fa fa-trash text-muted mr-2" @click="deleteBoard"></i>

    <!-- </div> -->
  </div>
</template>

<script>
import { Board } from "../models/Board";
export default {
  name: "BoardCard",
  props: { board: { type: Object, required: true } },
  computed: {
    profile() {
      return this.$store.state.profile;
    },
    boards() {
      return this.$store.state.boardsStore.boards;
    }
  },
  methods: {
    async deleteBoard() {
      let yes = await this.$confirm(
        "Are you sure you want to delete the board?"
      );

      if (!yes) {
        return;
      } else {
        console.log("calling the delete in the store");
        // this.$store.dispatch("deleteBoard", this.board);
      }
    }
  }
};
</script>

<style scoped lang="scss">
</style>