<template>
  <div>
    <!-- Calls BoardEditor Component OR BoardUpdater -->
    <div>
      <BoardEditor />

      <!-- <div @edit="doEdit">
        <div v-if="doEdit === true">
          <BoardUpdator />
        </div>
        <div v-else>
          <BoardEditor />
        </div>
      </div>-->
    </div>

    <!-- Call all the  BoardCard Component s-->
    <div class="boards">
      <div class="card p-2 my-2 elevation-4" v-for="board in boards" :key="board.id">
        <div>
          <BoardCard :board="board" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Board } from "../models/Board";
import BoardCard from "@/components/BoardCard.vue";
import BoardEditor from "@/components/BoardEditor.vue";
import BoardUpdator from "@/components/BoardUpdator.vue";
export default {
  name: "Boards",
  components: {
    BoardCard,
    BoardEditor,
    BoardUpdator
  },
  computed: {
    profile() {
      return this.$store.state.profile;
    },
    boards() {
      return this.$store.state.boardsStore.boards;
    }
  },
  props: { doEdit: { type: Boolean, default: false } },
  data() {
    return {
      editable: new Board()
    };
  },
  methods: {
    createBoard() {
      this.$store.dispatch("createBoard", this.editable);
      this.editable = new Board();
    },
    openBoardDetails() {
      console.log(
        "How do I fill in details in the form, can I pass data to Board editor"
      );
    }
  }
};
</script>

<style>
</style>