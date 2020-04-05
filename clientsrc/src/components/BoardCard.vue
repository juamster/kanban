<template>
  <div class="boards">
    <div class="card p-2 my-2 elevation-4" v-for="board in boards" :key="board.id">
      <!-- these are links to a vue called Board  -->
      <router-link :to="{name: 'Board', params: {boardId: board.id}}">{{board.name}}</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "BoardCard",
  props: {},
  computed: {},
  methods: {}
};
</script>

<style scoped lang="scss">
</style>