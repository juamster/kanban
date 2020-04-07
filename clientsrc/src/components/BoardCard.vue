<template>
  <div class="boardcard d-flex align-itmes-center justify-content-between align-items-center">
    <!-- these are links to a vue called Board  -->
    <router-link :to="{name: 'Board', params: {boardId: board.id}}">{{board.name}}</router-link>
    <div v-if="$auth.isAuthenticated && $auth.user.email == board.creatorEmail">
      <i class="fa fa-trash text-muted mr-2" @click="deleteBoard"></i>
      <i class="fa fa-pencil text-muted mr-2" @click="editBoard"></i>
    </div>
  </div>
</template>

<script>
import { Board } from "../models/Board";
export default {
  name: "BoardCard",
  props: { board: { type: Object, required: true } },
  computed: {},
  methods: {
    async deleteBoard() {
      let yes = await this.$confirm(
        "Are you sure you want to delete the board?"
      );
      if (!yes) {
        return;
      } else {
        this.$store.dispatch("deleteBoard", this.board);
      }
    },
    async editBoard() {
      console.log("going to edit the board");
      // set the active board
      this.$store.dispatch("getBoard", this.board.id);
      this.$emit("edit", this.board);
    }
  }
};
</script>

<style scoped lang="scss">
</style>