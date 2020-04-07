<template>
  <div class="ListComponent">
    <div class="boxes d-flex">
      <div class="box">{{list.name}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ListComponent",
  props: {
    list: { type: Object, required: true }
  },
  computed: {
    // profile() {
    //   return this.$store.state.profile;
    // },
    // board() {
    //   return this.$store.state.boardsStore.board;
    // }
  },
  methods: {}
};
</script>

<style scoped lang="scss">
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